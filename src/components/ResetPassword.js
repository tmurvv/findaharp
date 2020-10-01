// packages
import React, { useState, useReducer } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import uuid from 'uuid';
import atob from 'atob';

// internal
import LoginSignupCSS from '../styles/LoginSignup.css';
import PageTitle from '../components/PageTitle';
import Results from './Results';
import { RESULTS_INITIAL_STATE } from '../constants/constants';
import { resultInfoReducer } from '../reducers/reducers';

function ResetPassword(props) {
    // const { user, setUser} = useContext(UserContext);
    const Router = useRouter();
    const decodeEmail = atob(Router.query.reset);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [userLogin, setUserLogin] = useState({
        newpassword: '',
        confirmpassword: '',
        loginchange: false
    });
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'newpassword': 
                setUserLogin({...userLogin, newpassword: evt.target.value, loginchange: true});
                break
            case 'confirmpassword': 
                setUserLogin({...userLogin, confirmpassword: evt.target.value, loginchange: true});
                break
            default :
        }
    }
    function clearForm() { 
        setUserLogin({
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',
            loginchange: false
        });
    }
    // reset result window
    function resetResults() {
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function loginGuest() {
        resetResults();
        Router.push('/loginsignup');
    }  
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // start loading Image
        const resultText = document.querySelector('#loadingLoginText');
        resultText.innerText='Loading...';
        dispatchResultInfo({type: 'loadingImage'});
        // check password length
        if (userLogin.newpassword.length<8) {
            resultText.innerText=`Passwords must be at least 8 characters long.`;
            dispatchResultInfo({type: 'tryAgain'});
            return
        }
        // do passwords match 
        if (userLogin.newpassword !== userLogin.confirmpassword) {
            resultText.innerText=`Passwords do not match.`;
            dispatchResultInfo({type: 'tryAgain'});
            return
        }
        // update password
        try {
            const res = await axios.patch(`${process.env.backend}/api/v1/users/updatepassword/${decodeEmail}`, {resetpassword: userLogin.newpassword});
            resultText.innerText=`Password change successful.`;
            dispatchResultInfo({type: 'OK'});
            clearForm()
        } catch(e) {
            if (e.response&&e.response.data&&e.response.data.data.message&&e.response.data.data.message.includes('verified')) {
                resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Something went wrong resetting password.'} Login as guest?`;
                dispatchResultInfo({type: 'okTryAgain'});
            } else {
                resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Something went wrong resetting password.'} Login as guest?`;
                dispatchResultInfo({type: 'okTryAgain'});
            }
        }
    }
    return (
        <>
        <div className='login-signup-container'>
            <PageTitle maintitle='User Profile' subtitle='Reset Password' />
            <Results 
                resultInfo={resultInfo} 
                resetResults={resetResults}
                loginGuest={loginGuest}
            />
            {/* <div id="loadingLogin" style={{display: resultInfo.resultContainer}}>
                <img id='loadingLoginImg' style={{display: resultInfo.resultImg}} src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginText"></p>
                <div className='flex-sb'>
                    <button 
                        id='loadingLoginOk'
                        type='button' 
                        className='submit-btn' 
                        onClick={loginGuest}
                        style={{display: resultInfo.resultOkButton}} 
                    >
                        OK
                    </button>
                    <button 
                        id='loadingLoginTryAgain' 
                        type='button' 
                        className='submit-btn submit-btn-tryAgain' 
                        onClick={resetResults}
                        style={{display: resultInfo.resultTryAgainButton, marginLeft: resultInfo.tryAgainMarginLeft}} 
                    >
                        Try Again
                    </button>
                </div>
            </div> */}
            
            <div style={{transform: 'none'}} className="login-signup l-attop" id="login">
                <div className="login-signup-title">
                    Reset Password
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{padding: '25px'}}>   
                        <div className="input-name input-margin">
                            <h3>Account</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='email'
                            placeholder={decodeEmail}
                            name='email'
                            disabled={true}
                        />
                        <div className="input-name input-margin">
                            <h3>New Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            value={userLogin.newpassword}
                            onChange={handleChange}
                            name='newpassword'
                            required={true}
                        />
                        <div className="input-name input-margin">
                            <h3>Confirm New Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            value={userLogin.confirmpassword}
                            onChange={handleChange}
                            name='confirmpassword'
                            required={true}
                        />
                    </div>
                    <button type='button' onClick={handleSubmit} className="submit-btn login-signup-title">
                        Submit
                    </button>
                </form>
            </div>
            <LoginSignupCSS />
        </div>
    </>
    )
}

export default ResetPassword;
