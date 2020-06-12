// packages
import React, {useState, useContext} from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import PageTitle from '../src/components/PageTitle';
import { UserContext } from '../src/contexts/UserContext';
import LoginSignupCSS from '../src/styles/LoginSignup.css';

function LoginSignup(props) {
    // const userContext = useContext(UserContext);
    const { user, setUser} = useContext(UserContext);
    const [active, setActive] = useState('login');
    const [needVerify, setNeedVerify] = useState(false);
    const [userSignup, setUserSignup] = useState({
        firstname: '',
        lastname: '',
        signupemail: '',
        signuppassword: '',
        confirmpassword: '',
        distanceunit: 'miles',
        signupchange: false
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
            case 'distanceunit': 
                setUserSignup({...userSignup, distanceunit: evt.target.value, signupchange: true});
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
    function resetResults() {
        document.querySelector('#loadingLogin').style.display='none';
        document.querySelector('#loadingLoginText').innerText='';
        document.querySelector('#loadingLoginOk').style.display='none';
        document.querySelector('#loadingLoginTryAgain').style.display='none';
        document.querySelector('#loadingLoginImg').style.display='none';
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
        setActive('signup');
        const signup = document.querySelector('#signup');
        const login = document.querySelector('#login');
        signup.classList.remove("s-atbottom");
        signup.classList.add("s-attop");
        login.classList.remove("l-attop");
        login.classList.add("l-atbottom");
    }
    function handleLoginClick(evt) {
        if (userSignup.signupchange===true) {if (!confirm('changes will be lost')) return};
        resetSignupForm();
        setActive('login');
        const signup = document.querySelector('#signup');
        const login = document.querySelector('#login');
        signup.classList.add("s-atbottom");
        signup.classList.remove("s-attop");
        login.classList.add("l-attop");
        login.classList.remove("l-atbottom");
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultContainer = document.querySelector('#loadingLogin');
        const resultText = document.querySelector('#loadingLoginText');
        const resultButton = document.querySelector('#loadingLoginOk');
        const resultButtonTryAgain = document.querySelector('#loadingLoginTryAgain');
        const resultImg = document.querySelector('#loadingLoginImg');
        
        if (active==='signup') {
            // shortcut
            if ((!userSignup.signuppassword)||userSignup.signuppassword.length<8) {
                resultContainer.style.display='block';
                resultImg.style.display='none';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft=0;
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                return
            }
            
            // shortcut two
            if (userSignup.signuppassword !== userSignup.confirmpassword) {
                resultContainer.style.display='block';
                resultImg.style.display='none';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft=0;
                resultText.innerText=`Passwords do not match.`;
                return
            }
            resultContainer.style.display='block';
            resultImg.style.display='block';
            const newUser = {
                firstname: userSignup.firstname,
                lastname: userSignup.lastname,
                email: userSignup.signupemail,
                password: userSignup.signuppassword,
                distanceunit: userSignup.distanceunit
            };
            try {
                /* LOCAL */
                const res = await axios.post('http://localhost:3000/api/v1/users/createuser', newUser);
                /* TESTING */
                // const res = await axios.post('https://findaharp-api-testing.herokuapp.com/api/v1/users/createuser', newUser);
                /* PRODUCTION */
                // const res = await axios.post('https://findaharp-api.herokuapp.com/api/v1/users/createuser', newUser);
                if (res.status===200) {
                    resultImg.style.display='none';
                    resultButton.style.display='block';
                    resultText.innerText=`Signup Successful. Please check your inbox to verify your email.`;
                    console.log(res)
                    const {addeduser} = res.data;
                    setNeedVerify(true);
                    setUser([
                        addeduser.firstname, 
                        addeduser.lastname, 
                        addeduser.email, 
                        addeduser.distanceunit,
                        addeduser._id
                    ]);
                }
            } catch (e) {
                console.dir(e);
                resultImg.style.display='none';
                resultButton.style.display='block';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft='30px';
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on signup.'} Log in as guest user?`
                // resultText.innerText=`Something went wrong on signup. Log in as guest user?`
            }
        }
        
        if (active==='login') {   
            resultContainer.style.display='block';
            if (userLogin.loginpassword.length<8) {
                resultImg.style.display='none';
                resultButtonTryAgain.style.display='block';
                resultButtonTryAgain.style.marginLeft=0;
                resultText.innerText=`Passwords must be at least 8 characters long.`;
                return
            }
            resultText.innerText='Loading...';
            resultImg.style.display='block';
            try {
                /* LOCAL */
                // const res = await axios.post('http://localhost:3000/api/v1/users/loginuser', {email: userLogin.loginemail, password: userLogin.loginpassword});
                /* TESTING */
                // const res = await axios.post('https://findaharp-api-testing.herokuapp.com/api/v1/users/loginuser', {email: userLogin.loginemail, password: userLogin.loginpassword});
                /* PRODUCTION */
                const res = await axios.post('https://findaharp-api.herokuapp.com/api/v1/users/loginuser', {email: userLogin.loginemail, password: userLogin.loginpassword});
                const returnedUser = res.data.user;
               
                await setUser([
                    returnedUser.firstname, 
                    returnedUser.lastname, 
                    returnedUser.email, 
                    returnedUser.distanceunit, 
                    returnedUser._id
                ]);
                resultText.innerText=`Login Successful: Welcome ${returnedUser.firstname}`;
                resultImg.style.display='none';
                resultButton.style.display= 'block';
            } catch(e) {
                if (e.response&&e.response.data&&e.response.data.data&&e.response.data.data.message&&e.response.data.data.message.includes('verified')) {
                    resultImg.style.display='none';
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Something went wrong on login.'} Login as guest?`;
                    resultButton.style.display='block';
                    resultButtonTryAgain.style.display='block';
                    resultButtonTryAgain.style.marginLeft='30px';
                } else {
                    resultImg.style.display='none';
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on login.'} Login as guest?`;
                    resultButton.style.display='block';
                    resultButtonTryAgain.style.display='block';
                    resultButtonTryAgain.style.marginLeft='30px';
                }
            }
        }
        resetSignupForm();
        resetLoginForm();
    }
    async function handleForgot() {
        const resultContainer = document.querySelector('#loadingLogin');
        const resultText = document.querySelector('#loadingLoginText');
        const resultButton = document.querySelector('#loadingLoginOk');
        const resultButtonTryAgain = document.querySelector('#loadingLoginTryAgain');
        const resultImg = document.querySelector('#loadingLoginImg');
        
        console.log(userLogin)
        try {
            /* LOCAL */
            const res = await axios.get(`http://localhost:3000/api/v1/users/resetpassword/${userLogin.loginemail}`);
            /* TESTING */
            // const res = await axios.get(`https://findaharp-api-testing.herokuapp.com/api/v1/users/resetpassword/${userLogin.loginemail}`);
            /* PRODUCTION */
            // const res = await axios.get(`https://findaharp-api.herokuapp.com/api/v1/users/resetpassword/${userLogin.loginemail}`);
            if (res.status===200) {
                resultContainer.style.display='block';
                resultImg.style.display='none';
                resultButton.style.display='block';
                resultText.innerText=`Please check your inbox for an email with instuctions to reset your password.`;
            }
        } catch (e) {
            console.dir(e);
            resultContainer.style.display='block';
            resultImg.style.display='none';
            resultButton.style.display='block';
            resultButtonTryAgain.style.display='block';
            resultButtonTryAgain.style.marginLeft='30px';
            resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong with password reset.'} Log in as guest user?`
            // resultText.innerText=`Something went wrong on signup. Log in as guest user?`
        }
        // resetResults();
        // Router.push('/');
    }
    function loginGuest() {
        resetResults();
        Router.push('/');
    }
    return (
       <>
        <div className='login-signup-container'>
            <PageTitle maintitle='Login/Signup' subtitle='Welcome to our community!' />
            <div id="loadingLogin">
                <img id='loadingLoginImg' src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginText"></p>
                <div className='flex-sb'>
                    <button id='loadingLoginOk' type='button' className='submit-btn' onClick={loginGuest}>OK</button>
                    <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                </div>
            </div>
            <div className="login-signup s-atbottom" id="signup" onClick={()=>handleSignupClick()}>
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
                            disabled={active==='login'}
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
                            disabled={active==='login'}
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
                            required={active==='signup'}
                            disabled={active==='login'}
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
                            required={active==='signup'}
                            disabled={active==='login'}
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
                            required={active==='signup'}
                            disabled={active==='login'}
                        />
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
                                disabled={active==='login'}
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
                                disabled={active==='login'}
                                style={{marginRight: '10px', width: 'fit-content'}}
                            />
                            <label htmlFor="Kms">Kms</label>
                        </div>   
                    </div>
                    <button type='submit' className="submit-btn login-signup-title" onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
            <div className="login-signup l-attop" id="login" onClick={handleLoginClick}>
                <div className="login-signup-title">
                    {needVerify&&active==='login'?"Email not verified. Please check inbox for verification email from Findaharp.com.": "LOG IN"}
                </div>
                <form onSubmit={handleSubmit}>
                        {needVerify&&active==='login'
                        ?
                            <div style={{padding: '20px 20px 40px', height: '250px', display:'flex', flexDirection: 'column', alignItems:"center"}}>
                                <img height='35px' src='./img/logo_findaharp_black.png' alt='text logo' />
                                <img height='100%' src='./img/not_found.png' alt='golden harp' />}
                            </div>
                        :
                        <>
                            <div style={{padding: '25px'}}>   
                                <div className="input-name">
                                    <h3>Email</h3>
                                </div>
                                <input
                                    className="field-input"
                                    type='email'
                                    id={uuid()}
                                    value={userLogin.loginemail}
                                    onChange={handleChange}
                                    name='loginemail'
                                    required = {active==='login'}
                                    disabled={active==='signup'}
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
                                    required = {active==='login'}
                                    disabled={active==='signup'}
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
                    }
                </form>
            </div>
            <LoginSignupCSS />
        </div>
        </>
    )
}

export default LoginSignup;
