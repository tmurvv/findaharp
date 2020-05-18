// packages
import React, {useState, useContext} from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import { UserContext } from '../src/contexts/UserContext';
import LoginSignupCSS from '../src/styles/LoginSignup.css';

function LoginSignup(props) {
    const user = useContext(UserContext);
    const [active, setActive] = useState('login');
    const [needVerify, setNeedVerify] = useState(false);
    const [userSignup, setUserSignup] = useState({
        firstname: '',
        lastname: '',
        signupemail: '',
        signuppassword: '',
        confirmpassword: '',
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
        if (active==='signup') {
            if (userSignup.signuppassword.length<8) return alert('Passwords must be at least 8 characters long.');
            if (userSignup.signuppassword !== userSignup.confirmpassword) return alert('Passwords must match.');
            
            const newUser = {
                firstname: userSignup.firstname,
                lastname: userSignup.lastname,
                email: userSignup.signupemail,
                password: userSignup.signuppassword
            };

            try {
                const res = await axios.post('https://findaharp-api.herokuapp.com/api/v1/users/createuser', newUser);
                if (res.status===200) {alert('Signup Successful. Please check your inbox to verify your email.'); setNeedVerify(true)}
            } catch (e) {
                alert(`Something went wrong on signup: ${e.message}`)
            }
        }
        if (active==='login') {
            const resultContainer = document.querySelector('#loadingLogin');
            const resultText = document.querySelector('#loadingLoginText');
            const resultButton = document.querySelector('#loadingLoginOk');
            const resultButtonTryAgain = document.querySelector('#loadingLoginTryAgain');
            const resultImg = document.querySelector('#loadingLoginImg');
            
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
                const res = await axios.post('https://fikndaharp-api.herokuapp.com/api/v1/users/loginuser', {email: userLogin.loginemail, password: userLogin.loginpassword});
                user.changeUser({name: res.data.user.firstname, email: 'Changed'});
                document.querySelector('#userName').innerText=user.name;
                resultText.innerText=`Login Successful: Welcome ${user.name}`;
                resultImg.style.display='none';
                resultButton.style.display= 'block';
            } catch(e) {
                resultImg.style.display='none';
                resultText.innerText=`Unable to login ${userLogin.loginemail}. Logging in as guest.`;
                resultButton.style.display='block';
                resultButtonTryAgain.style.display='block'
            }
        }
        
        console.log('user', user)
        resetSignupForm();
        resetLoginForm();
        // const contact = {
        //     firstname: userSignup.firstname,
        //     lastname: userSignup.lastname,
        //     email: userSignup.contactemail,
        //     sellername: product.sellerName,
        //     productmaker: userSignup.contactmaker,
        //     productmodel: userSignup.contactmodel,
        //     comments: userSignup.contactcomments
        // }
        // try {
        //     const res = await axios.post(
        //         `https://findaharp-api-testing.herokuapp.com/api/v1/contactform`, 
        //         contact
        //     );
        //     alert("Email sent.")
        // } catch(e) {
        //     alert("Something went wrong. Please try again or contact the webmaster.", e.message)
        // }
        
        // props.handleCloseContact();
    }
    
   return (
       <>
        <div className='login-signup-container'>
            <div id="loadingLogin">
                <img id='loadingLoginImg' src='/img/spinner.gif' alt='loading spinner' />
                <p id="loadingLoginText"></p>
                <div className='flex-sb'>
                    <button id='loadingLoginOk' type='button' className='submit-btn' onClick={()=>user!=='guest user'?Router.push('/'):resetResults()}>OK</button>
                    <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={()=>resetResults()}>Try Again</button>
                </div>
            </div>
            <div className="login-signup l-attop" id="login" onClick={handleLoginClick}>
                <div className="login-signup-title">
                    {needVerify?"Email not verified. Please check inbox for verification email from Findaharp.com.": "LOG IN"}
                </div>
                <form>
                    {needVerify
                    ?
                        <div style={{padding: '20px 20px 40px', height: '250px', display:'flex', flexDirection: 'column', alignItems:"center"}}>
                            <img height='35px' src='./img/logo_findaharp_black.png' alt='text logo' />
                            <img height='100%' src='./img/not_found.png' alt='golden harp' />}
                        </div>
                    :
                        <>
                        <div className="input-name">
                            <h2>Email</h2>
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
                            <h2>Password</h2>
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
                        <div className="input-r">
                            <div className="check-input">
                                <input type="checkbox" id="remember-me-2" name="rememberme" value="" className="checkme"/>
                                <label className="rememberme-blue" htmlFor="remember-me-2"></label>
                            </div>
                            <div className="rememberme">
                                <label htmlFor="remember-me-2">Remember Me</label>
                            </div>
                        </div>
            
                        <button className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                        <div className="forgot-pass">
                            <a href="#">Forgot Password?</a>
                        </div>
                        </>
                    }
                </form>
            </div>
            <div className="login-signup s-atbottom" id="signup" onClick={()=>handleSignupClick()}>
                <form className="login-signup-title" onSubmit={()=>handleSubmit()}>
                    SIGN UP
                    <div >
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
                        <button className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <LoginSignupCSS />
        </div>
        </>
    )
}

export default LoginSignup;
