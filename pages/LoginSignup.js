// packages
import React, { useState, useContext, useReducer, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import LoginSignupCSS from '../src/styles/LoginSignup.css';
import PageTitle from '../src/components/PageTitle';
import Results from '../src/components/Results';
import { RESULTS_INITIAL_STATE } from '../src/constants/constants';
import { UserContext } from '../src/contexts/UserContext';
import { resultInfoReducer, activeWindowReducer } from '../src/reducers/reducers';
import { parseJwt } from '../src/utils/helpers';

// initialize reducer object
const activeWindowInitialState = {
    activeWindow: 'login',
    loginClasses: 'login-signup l-attop',
    signupClasses: 'login-signup s-atbottom'
}
function LoginSignup(props) {
    // declare variables
    const { setUser } = useContext(UserContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [activeWindow, dispatchActiveWindow] = useReducer(activeWindowReducer, activeWindowInitialState);
    const [needVerify, setNeedVerify] = useState(false);
    const [userSignup, setUserSignup] = useState({
        firstname: '',
        lastname: '',
        signupemail: '',
        signuppassword: '',
        confirmpassword: '',
        newsletter: false,
        distanceunit: 'miles',
        signupchange: false,
        currency: 'USD'
    });
    const [userLogin, setUserLogin] = useState({
        loginemail: '',
        loginpassword: '',
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
            case 'loginemail': 
                setUserLogin({...userLogin, loginemail: evt.target.value, loginchange: true});
                break
            case 'signuppassword': 
                setUserSignup({...userSignup, signuppassword: evt.target.value, signupchange: true});
                break
            case 'loginpassword': 
                setUserLogin({...userLogin, loginpassword: evt.target.value, loginchange: true});
                break
            case 'confirmpassword': 
                setUserSignup({...userSignup, confirmpassword: evt.target.value, signupchange: true});
                break
            case 'newsletter': 
                setUserSignup({...userSignup, newsletter: !userSignup.newsletter, signupchange: true});
                break
            case 'distanceunit': 
                setUserSignup({...userSignup, distanceunit: evt.target.value, signupchange: true});
                break
            case 'currency': 
                setUserSignup({...userSignup, currency: evt.target.value, signupchange: true});
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
            newsletter: false,
            distanceunit: 'miles',
            signupchange: false,
            currency: 'USD'
        });
    }
    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    
    }
    function resetLoginForm() { 
        setUserLogin({
            loginemail: '',
            loginpassword: '',
            loginchange: false
        });
    }
    function handleSignupClick(evt) {
        resetLoginForm();
        dispatchActiveWindow({type: 'signup'});
    }
    function handleLoginClick(evt) {
        if (userSignup.signupchange===true) {if (!confirm('changes will be lost')) return};
        resetSignupForm();
        dispatchActiveWindow({type: 'login'});
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultText = document.querySelector('#loadingLoginText');
        if (activeWindow.active==='signup') {
            // shortcut - password not long enough
            if ((!userSignup.signuppassword)||userSignup.signuppassword.length<8) {
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                dispatchResultInfo({type: 'tryAgain'});
                return
            }
            // shortcut - passwords not matching
            if (userSignup.signuppassword !== userSignup.confirmpassword) {
                resultText.innerText=`Passwords do not match.`;
                dispatchResultInfo({type: 'tryAgain'});
                return
            } 
            // create signup user object
            const newUser = {
                firstname: userSignup.firstname,
                lastname: userSignup.lastname,
                email: userSignup.signupemail,
                password: userSignup.signuppassword,
                newsletter: userSignup.newsletter,
                distanceunit: userSignup.distanceunit,
                currency: userSignup.currency
            };
            // signup user
            try {
                const res = await axios.post(`${process.env.backend}/api/v1/users/createuser`, newUser);
                if (res.status===201 || res.status===200) {                   
                    // set userContext to added user
                    const addeduser = res.data.user;
                    setUser({
                        firstname: addeduser.firstname, 
                        lastname: addeduser.lastname, 
                        email: addeduser.email,
                        distanceunit: addeduser.distanceunit,
                        _id: addeduser._id,
                        newsletter: addeduser.newsletter,
                        currency: addeduser.currency,
                        role: 'not set'
                    });
                    resultText.innerText=`Signup Successful. Please check your inbox to verify your email.`;
                    dispatchResultInfo({type: 'OK'});  
                }
            // Error on signup
            } catch (e) {
                // duplicate email
                if (e.response&&e.response.data&&e.response.data.data&&e.response.data.data.message.includes('duplicate')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'We already have that email in our records. Please try to login and/or select "forgot password" in the login box.'}`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // email not valid
                } else if (e.response&&e.response.data&&e.response.data.data&&e.response.data.data.message.includes('not valid')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Please enter a valid email address. Log in as guest user?'}`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // other error
                } else {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on signup. Please check your network connection. Log in as guest user?'}`;
                    dispatchResultInfo({type: 'okTryAgain'});
                }
            }
        }       
        if (activeWindow.active==='login') {   
            // shortcut - password not long enough
            if (userLogin.loginpassword.length<8) {
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                dispatchResultInfo({type: 'tryAgain'});
                return
            }
            // set loading image
            dispatchResultInfo({type:'loadingImage'});        
            try {
                // login user
                const res = await axios.post(`${process.env.backend}/api/v1/users/loginuser`, {email: userLogin.loginemail, password: userLogin.loginpassword});
                
                const returnedUser = res.data.user;
                const jwt = res.data.token;

                // set user context to login user
                await setUser({
                    firstname: returnedUser.firstname, 
                    lastname: returnedUser.lastname, 
                    email: returnedUser.email, 
                    distanceunit: returnedUser.distanceunit, 
                    _id: returnedUser._id,
                    newsletter: returnedUser.newsletter,
                    currency: returnedUser.currency,
                    role: returnedUser.role
                });
                // set JWT cookie
                 document.cookie = `JWT=${jwt}`
                // display result window
                resultText.innerText=`Login Successful: Welcome ${returnedUser.firstname}`;
                dispatchResultInfo({type: 'OK'});
            } catch(e) {
                // email not found #1
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message==="Cannot read property 'emailverified' of null") {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Email not found.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // email not verified
                } else if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('verified')) {
                    setNeedVerify(true);                
                    await setUserLogin({...userLogin, loginemail: e.response.data.useremail})
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Email not yet verified. Please see your inbox for verification email.'} Resend verification email?`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // passwords don't match
                } else if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('incorrect')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Password does not match our records.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // email not found #2
                } else if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('Email')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Email not found.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // other error
                } else {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on login. Please check your network connection.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain'});
                }
            }
        }
        resetSignupForm();
    }
    // handle forgotPassword click
    async function handleForgot() {
        const resultText = document.querySelector('#loadingLoginText');
        // shortcut no email entered
        if (!userLogin.loginemail) {
            resultText.innerText='Please enter your account email.';
            dispatchResultInfo({type: 'tryAgain'});
            return;
        }
        try {
            // send forgot password email
            const res = await axios.get(`${process.env.backend}/api/v1/users/sendresetemail/${userLogin.loginemail}`);
            // display results
            if (res.status===200) {
                resultText.innerText=`Please check your inbox for an email with instructions to reset your password.`;
                dispatchResultInfo({type: 'OK'});
            }
        } catch (e) {
            // display error
            resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong with password reset. Please check your netword connection.'} Log in as guest user?`
            dispatchResultInfo({type: 'okTryAgain'});
        }
    }
    async function loginGuest(evt) {
        if (needVerify) {
            // display loader
            const resultText = document.querySelector('#loadingLoginText');
            dispatchResultInfo({ type: 'loadingImage' });  
            //create user object
            const forgotPasswordUser = {
                firstname: 'findaharp.com',
                lastname: 'user',
                email: userLogin.loginemail
            }
            try {
                // this is a hack because program not returning for axios post, needs to be debugged and next three lines put below axios call
                // display result
                resultText.innerText=`Verify email sent.`;
                dispatchResultInfo({type: 'OK'});
                setNeedVerify(false);
                // send forgot password email
                await axios.post(`${process.env.backend}/api/v1/resendverify`, forgotPasswordUser);
            } catch (e) {
                // display error
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong sending verification email. Please check your network connection.'} Log in as guest user?`;
                dispatchResultInfo({type: 'okTryAgain'});
            }
        }
        resetResults();
        // go to main window
        Router.push('/');
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    return ( 
       <>
        <div className='login-signup-container'>
            <PageTitle maintitle='Login/Signup' subtitle='Welcome to our community!' />
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
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
            <div className={activeWindow.signupClasses} id="signup" onClick={()=>handleSignupClick()}>
                <form onSubmit={()=>handleSubmit()}>
                    <div className="login-signup-title">
                        SIGN UP
                    </div>
                    <div className='login-form'>
                        <div className="input-name">
                            <h3>First Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={userSignup.firstname}
                            onChange={handleChange}
                            name='firstname'
                            placeholder="optional"
                            disabled={activeWindow.active==='login'}
                        />
                        <div className="input-name">
                            <h3>Last Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={userSignup.lastname}
                            onChange={handleChange}
                            name='lastname'
                            placeholder="optional"
                            disabled={activeWindow.active==='login'}
                        />
                        <div className="input-name input-margin">
                            <h3>E-Mail</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='email'
                            id={uuid()}
                            value={userSignup.signupemail}
                            onChange={handleChange}
                            name='signupemail'
                            required={activeWindow.active==='signup'}
                            disabled={activeWindow.active==='login'}
                        />
                        <div className="input-name input-margin">
                            <h3>Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            id={uuid()}
                            value={userSignup.signuppassword}
                            onChange={handleChange}
                            name='signuppassword'
                            required={activeWindow.active==='signup'}
                            disabled={activeWindow.active==='login'}
                        />
                        <div className="input-name input-margin">
                            <h3>Confirm Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            id={uuid()}
                            value={userSignup.confirmpassword}
                            onChange={handleChange}
                            name='confirmpassword'
                            required={activeWindow.active==='signup'}
                            disabled={activeWindow.active==='login'}
                        />
                        <div className="input-r">
                            <input 
                                type='checkbox'
                                name='newsletter'
                                onChange={handleChange}
                                style={{marginLeft: '0'}}
                            />
                            {/* <div className="check-input">
                                <input 
                                    type="checkbox" 
                                    id="newsletter" 
                                    name="newsletter" 
                                    // checked={userSignup.newsletter} 
                                    // onChange={handleChange} 
                                    className="checkme"
                                />
                                {/* <label className="rememberme-blue" htmlFor="newsletter"></label> */}
                            {/* </div> */}
                            <div className="rememberme">
                                <label htmlFor="remember-me-2" style={{marginLeft: '7px'}}>Signup for newsletter? Fun talk about harps every other month.</label>
                            </div>
                        </div>
                        <div className="input-name input-margin">
                            <h3>I prefer distances in</h3>
                        </div>
                        <div className='flex'>
                            <input 
                                className="field-input"
                                type='radio'
                                id={uuid()}
                                value='miles'
                                onChange={handleChange}
                                name='distanceunit'
                                disabled={activeWindow.active==='login'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                                defaultChecked
                            />
                            <label style={{marginRight: '30px'}} htmlFor="miles">Miles</label>
                            <input 
                                className="field-input"
                                type='radio'
                                id={uuid()}
                                value='kms'
                                onChange={handleChange}
                                name='distanceunit'
                                disabled={activeWindow.active==='login'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                            />
                            <label htmlFor="Kms">Kms</label>
                        </div>   
                        <div className="input-name input-margin">
                            <h3>I prefer prices in</h3>
                        </div>
                        <div className='flex'>
                            <input 
                                className="field-input"
                                type='radio'
                                id={uuid()}
                                value='USD'
                                onChange={handleChange}
                                name='currency'
                                disabled={activeWindow.active==='login'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                                defaultChecked
                            />
                            <label style={{marginRight: '30px'}} htmlFor="miles">USD</label>
                            <input 
                                className="field-input"
                                type='radio'
                                id={uuid()}
                                value='CAD'
                                onChange={handleChange}
                                name='currency'
                                disabled={activeWindow.active==='login'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                            />
                            <label htmlFor="Kms">CAD</label>
                        </div>   
                    </div>
                    <button type='submit' className="submit-btn login-signup-title" onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
            <div className={activeWindow.loginClasses} id="login" onClick={handleLoginClick}>
                <div className="login-signup-title">
                    LOG IN
                </div>
                <form onSubmit={handleSubmit}>
                    <>
                        <div style={{padding: '25px'}}>   
                            <div className="input-name" id='loginEmail'>
                                <h3>Email</h3>
                            </div>
                            <input
                                className="field-input"
                                type='email'
                                id={uuid()}
                                value={userLogin.loginemail}
                                onChange={handleChange}
                                name='loginemail'
                                required={activeWindow.active==='login'}
                                disabled={activeWindow.active==='signup'}
                            />
                            <div className="input-name input-margin">
                                <h3>Password</h3>
                            </div>
                            <input 
                                className="field-input"
                                type='password'
                                id={uuid()}
                                value={userLogin.loginpassword}
                                onChange={handleChange}
                                name='loginpassword'
                                required={activeWindow.active==='login'}
                                disabled={activeWindow.active==='signup'}
                            />
                            {/* <div className="input-r" onClick={()=>alert('remember me under construction')}>
                                <div className="check-input">
                                    <input type="checkbox" id="remember-me-2" name="rememberme" value="" className="checkme"/>
                                    <label className="rememberme-blue" htmlFor="remember-me-2"></label>
                                </div>
                                <div className="rememberme">
                                    <label htmlFor="remember-me-2">Remember Me</label>
                                </div>
                            </div> */}
                        </div>
                        <button type='submit' className="submit-btn login-signup-title">
                            Submit
                        </button>
                        <div className="forgot-pass" onClick={handleForgot}>
                            <a href="#">Forgot Password?</a>
                        </div>
                    </>
                    
                </form>
            </div>
            <LoginSignupCSS />
        </div>
        </>
    )
}

export default LoginSignup;
