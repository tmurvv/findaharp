// packages
import React, {useState, useContext, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import PageTitle from '../src/components/PageTitle';
import { UserContext } from '../src/contexts/UserContext';
import LoginSignupCSS from '../src/styles/LoginSignup.css';

function ResetPassword(props) {
    const { user, setUser} = useContext(UserContext);
    const Router = useRouter();
        let email; 
        if (Router.query.useremail) email = Router.query.useremail.substr(0,Router.query.useremail.length-1);

    const [userSignup, setUserSignup] = useState({
        firstname: '',
        lastname: '',
        signupemail: '',
        signuppassword: '',
        confirmpassword: '',
        distanceunit: '',
        signupchange: false
    });
    const [userLogin, setUserLogin] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
        loginchange: false
    });
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstname': 
                setUserSignup({...userSignup, firstname: evt.target.value, signupchange: true});
                break
            case 'lastname': 
                setUserSignup({...userSignup, lastname: evt.target.value, signupchange: true});
                break
            case 'signupemail': 
                setUserSignup({...userSignup, signupemail: evt.target.value, signupchange: true});
                break
            case 'distanceunit': 
                setUserSignup({...userSignup, distanceunit: evt.target.value, signupchange: true});
                break
            case 'oldpassword': 
                setUserLogin({...userLogin, oldpassword: evt.target.value, loginchange: true});
                break
            case 'newpassword': 
                setUserLogin({...userLogin, newpassword: evt.target.value, loginchange: true});
                break
            case 'confirmpassword': 
                setUserLogin({...userLogin, confirmpassword: evt.target.value, loginchange: true});
                break
            default :
        }
    }
    function resetSignupForm() {
        setUserSignup({
            firstname: '',
            lastname: '',
            signupemail: '',
            signuppassword: '',
            confirmpassword: '',
            distanceUnit: 'miles',
            signupchange: false
        });
    }
    function resetLoginForm() { 
        setUserLogin({
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',
            loginchange: false
        });
    }
    function resetResults() {
        document.querySelector('#loadingloginReset').style.display='none';
        document.querySelector('#loadingloginResetText').innerText='';
        document.querySelector('#loadingloginResetOk').style.display='none';
        document.querySelector('#loadingloginResetTryAgain').style.display='none';
        document.querySelector('#loadingloginResetImg').style.display='none';
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultContainerReset = document.querySelector('#loadingloginReset');
        const resultText = document.querySelector('#loadingloginResetText');
        const resultButton = document.querySelector('#loadingloginResetOk');
        const resultButtonTryAgain = document.querySelector('#loadingloginResetTryAgain');
        const resultImg = document.querySelector('#loadingloginResetImg');
               
        resultContainerReset.style.display='block';
        if (userLogin.newpassword.length<8) {
            resultImg.style.display='none';
            resultButtonTryAgain.style.display='block';
            resultButtonTryAgain.style.marginLeft=0;
            resultText.innerText=`Passwords must be at least 8 characters long.`;
            return
        }
        // passwords match 
        if (userLogin.newpassword !== userLogin.confirmpassword) {
            resultContainerReset.style.display='block';
            resultImg.style.display='none';
            resultButtonTryAgain.style.display='block';
            resultButtonTryAgain.style.marginLeft=0;
            resultText.innerText=`Passwords do not match.`;
            return
        }
        resultText.innerText='Loading...';
        resultImg.style.display='block';
        try {
            /* LOCAL */
            const res = await axios.patch(`${process.env.backend}/api/v1/users/updatepassword/${email}`, {resetpassword: userLogin.newpassword});
            
            resultText.innerText=`Password change successful.`;
            resultImg.style.display='none';
            resultButton.style.display= 'block';
            
        } catch(e) {
            if (e.response&&e.response.data&&e.response.data.data.message&&e.response.data.data.message.includes('verified')) {
                resultImg.style.display='none';
                resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Something went wrong resetting password.'} Login as guest?`;
                resultButton.style.display='block';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft='30px';
            } else {
                resultImg.style.display='none';
                resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Something went wrong resetting password.'} Login as guest?`;
                resultButton.style.display='block';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft='30px';
            }
        }
        resetSignupForm();
        resetLoginForm();
    }
    function loginGuest() {
        resetResults();
        // Router.push('/LoginSignup');
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    });
    return (
       <>
        <div className='loginReset-signupReset-container'>
            <PageTitle maintitle='User Profile' subtitle='Change Password / Edit Profile' />
            <div id="loadingloginReset">
                <img id='loadingloginResetImg' src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingloginResetText"></p>
                <div className='flex-sb'>
                    <button id='loadingloginResetOk' type='button' className='submit-btn' onClick={loginGuest}>OK</button>
                    <button id='loadingloginResetTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                </div>
            </div>
            
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
                            id={uuid()}
                            placeholder={email}
                            name='email'
                            disabled={true}
                        />
                        <div className="input-name input-margin">
                            <h3>New Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            id={uuid()}
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
                            id={uuid()}
                            value={userLogin.confirmpassword}
                            onChange={handleChange}
                            name='confirmpassword'
                            required={true}
                        />
                    </div>
                    <button type='submit' className="submit-btn login-signup-title">
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
