// packages
import React, { useState, useContext, useReducer, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// internal
import HarpLoginSignupCSS from '../src/styles/onlineStore/HarpLoginSignup.css';
import PageTitle from '../src/components/PageTitle';
import Results from '../src/components/Results';
import NewsletterSignup from '../src/components/NewsletterSignup';
import { RESULTS_INITIAL_STATE } from '../src/constants/constants';
import { UserContext } from '../src/contexts/UserContext';
import { StringFormContext } from '../src/contexts/StringFormContext';
import { resultInfoReducer, harpactiveWindowReducer } from '../src/reducers/reducers';
import { STRING_FORM_INFO_INIT, STRING_FORM_INIT } from '../src/constants/inits';

// initialize reducer object
const harpactiveWindowInitialState = {
    harpactiveWindow: 'harplogin',
    harploginClasses: 'harplogin-signup l-attop',
    harpsignupClasses: 'harplogin-signup s-atbottom'
}
function HarpLoginSignup(props) {
    // declare variables
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const { user, setUser } = useContext(UserContext);
    // const [ harp, setHarp ] = useState();
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [harpactiveWindow, dispatchharpactiveWindow] = useReducer(harpactiveWindowReducer, harpactiveWindowInitialState);
    const [needVerify, setNeedVerify] = useState(false);
    const [harpSignup, setHarpSignup] = useState({
        firstname: '',
        lastname: '',
        harpsignupemail: '',
        harpsignuppassword: '',
        confirmpassword: '',
        newsletter: false,
        distanceunit: 'miles',
        signupchange: false,
        currency: 'USD'
    });
    const [harpLogin, setHarpLogin] = useState({
        harploginemail: '',
        harploginpassword: '',
        harploginchange: false
    });
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'firstname': 
                setHarpSignup({...harpSignup, firstname: evt.target.value, harpsignupchange: true});
                break
            case 'lastname': 
                setHarpSignup({...harpSignup, lastname: evt.target.value, harpsignupchange: true});
                break
            case 'harpsignupemail': 
                setHarpSignup({...harpSignup, harpsignupemail: evt.target.value, harpsignupchange: true});
                break
            case 'harploginemail': 
                setHarpLogin({...harpLogin, harploginemail: evt.target.value, harploginchange: true});
                break
            case 'harpsignuppassword': 
                setHarpSignup({...harpSignup, harpsignuppassword: evt.target.value, harpsignupchange: true});
                break
            case 'harploginpassword': 
                setHarpLogin({...harpLogin, harploginpassword: evt.target.value, harploginchange: true});
                break
            case 'confirmpassword': 
                setHarpSignup({...harpSignup, confirmpassword: evt.target.value, harpsignupchange: true});
                break
            case 'newsletter': 
                setHarpSignup({...harpSignup, newsletter: !harpSignup.newsletter, harpsignupchange: true});
                break
            case 'distanceunit': 
                setHarpSignup({...harpSignup, distanceunit: evt.target.value, harpsignupchange: true});
                break
            case 'currency': 
                setHarpSignup({...harpSignup, currency: evt.target.value, harpsignupchange: true});
                break
            default :
        }
    }
    function resetSignupForm() {
        setHarpSignup({
            firstname: '',
            lastname: '',
            harpsignupemail: '',
            harpsignuppassword: '',
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
        setHarpLogin({
            loginemail: '',
            loginpassword: '',
            loginchange: false
        });
    }
    function handleSignupClick(evt) {
        resetLoginForm();
        dispatchharpactiveWindow({type: 'signup'});
    }
    function handleLoginClick(evt) {
        if (harpSignup.harpsignupchange===true) {if (!confirm('changes will be lost')) return};
        resetSignupForm();
        dispatchharpactiveWindow({type: 'harplogin'});
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultText = document.querySelector('#loadingLoginText');
        if (harpactiveWindow.active==='harpsignup') {
            // create signup harp object
            console.log('harpsingup', harpSignup)
            const newHarp = {
                oldemail: harpSignup.harpsignupemail,
                // oldemail: "6test@test.com",
                // oldharpname: '6mytest',
                oldharpname: harpSignup.harpsignuppassword,
                stringform: JSON.stringify(stringForm),
                newsletter: harpSignup.newsletter
            };
            // signup harp
            try {
                const res = await axios.post(`${process.env.backend}/api/v1/userharps/createuserharp`, newHarp);
                if (res.status===201 || res.status===200) {                   
                    // set harpContext to added harp
                    const returnedHarp = res.data.userharp;
                    console.log(res.data)
                    setUser({
                        _idCurrentHarp: returnedHarp._id,
                        emailCurrentHarp: returnedHarp.email,
                        currentHarpname: returnedHarp.harpname
                    });
                    resultText.innerText=`Signup Successful. Please check your inbox to verify your email.`;
                    resultText.innerText=`Signup Successful. Welcome harp ${harpSignup.harpsignuppassword}`;
                    dispatchResultInfo({type: 'OK'});  
                }
            // Error on signup
            } catch (e) {
                console.log('signup error', e.message)
                // duplicate email
                if (e.response&&e.response.data&&e.response.data.data&&e.response.data.data.message.includes('duplicate')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'We already have that email in our records. Please try to login and/or select "forgot password" in the login box.'}`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // email not valid
                } else if (e.response&&e.response.data&&e.response.data.data&&e.response.data.data.message.includes('not valid')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Please enter a valid email address. Log in as guest harp?'}`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // other error
                } else {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on signup. Please check your network connection. Log in as guest harp?'}`;
                    dispatchResultInfo({type: 'okTryAgain'});
                }
            }
        }       
        if (harpactiveWindow.active==='harplogin') {   
            // set loading image
            dispatchResultInfo({type:'loadingImage'});    
            console.log(harpLogin)    
            try {
                // login harp
                const res = await axios.post(`${process.env.backend}/api/v1/userharps/loginuserharp`, {oldemail: harpLogin.harploginemail, oldharpname: harpLogin.harploginpassword});
                const returnedHarp = res.data.userharp;
                const jwt = res.data.token;
                let parseStringForm = await JSON.parse(returnedHarp.stringform);
                
                // purge quantities
                if (parseStringForm&&parseStringForm.length>0) {
                    for (var i = 0; i<parseStringForm.length; i++) {
                        if (i===0) {
                            parseStringForm[0].G.qty=0; 
                            parseStringForm[0].G.qty=0; 
                            break;
                        }
                        if (i===7) {
                            parseStringForm[0].E.qty=0; 
                            parseStringForm[0].D.qty=0; 
                            parseStringForm[0].C.qty=0; 
                            break;
                        }
                        parseStringForm[0].E.qty=0; 
                        parseStringForm[0].D.qty=0; 
                        parseStringForm[0].C.qty=0;
                        parseStringForm[0].B.qty=0;
                        parseStringForm[0].A.qty=0;
                        parseStringForm[0].G.qty=0;
                        parseStringForm[0].F.qty=0;
                    }
                } else {
                    parseStringForm = {...STRING_FORM_INIT}
                }
                
                // set harp context to login harp
                setUser({
                    _idCurrentHarp: returnedHarp._id,
                    emailCurrentHarp: returnedHarp.email,
                    currentHarpname: returnedHarp.harpname,
                    stringform: parseStringForm
                });
                setStringForm(parseStringForm);
                // set JWT cookie
                 document.cookie = `JWT=${jwt}`
                // display result window
                resultText.innerText=`Login Successful: Welcome Harp ${returnedHarp.harpname}`;
                dispatchResultInfo({type: 'OK'});
            } catch(e) {
                console.log('error', e.message)
                // email not found #1
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message==="Cannot read property 'emailverified' of null") {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Email not found.'} Login as guest?`;
                    dispatchResultInfo({type: 'okTryAgain'});
                // email not verified
                } else if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('verified')) {
                    setNeedVerify(true);                
                    await setHarpLogin({...harpLogin, loginemail: e.response.data.harpemail})
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
        if (!harpLogin.loginemail) {
            resultText.innerText='Please enter your account email.';
            dispatchResultInfo({type: 'tryAgain'});
            return;
        }
        try {
            // send forgot password email
            const res = await axios.get(`${process.env.backend}/api/v1/harps/sendresetemail/${harpLogin.loginemail}`);
            // display results
            if (res.status===200) {
                resultText.innerText=`Please check your inbox for an email with instructions to reset your password.`;
                dispatchResultInfo({type: 'OK'});
            }
        } catch (e) {
            // display error
            resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong with password reset. Please check your netword connection.'} Log in as guest harp?`
            dispatchResultInfo({type: 'okTryAgain'});
        }
    }
    async function loginGuest(evt) {
        if (needVerify) {
            // display loader
            const resultText = document.querySelector('#loadingLoginText');
            dispatchResultInfo({ type: 'loadingImage' });  
            //create harp object
            const forgotPasswordHarp = {
                firstname: 'findaharp.com',
                lastname: 'harp',
                email: harpLogin.loginemail
            }
            try {
                // this is a hack because program not returning for axios post, needs to be debugged and next three lines put below axios call
                // display result
                resultText.innerText=`Verify email sent.`;
                dispatchResultInfo({type: 'OK'});
                setNeedVerify(false);
                // send forgot password email
                await axios.post(`${process.env.backend}/api/v1/resendverify`, forgotPasswordHarp);
            } catch (e) {
                // display error
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong sending verification email. Please check your network connection.'} Log in as guest harp?`;
                dispatchResultInfo({type: 'okTryAgain'});
            }
        }
        resetResults();
        Router.push('/stringform');
        // go to main window
        // Router.push('/');
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    return ( 
       <>
        <div className='harplogin-signup-container'>
            <PageTitle maintitle='Harp Login/Signup' subtitle='Keep track of one or many harp string brands!' />
            <a href='/rememberdetails' style={{display: 'flex', justifyContent: 'center', fontSize: '14px', color: '#6A75AA', textDecoration: 'underline', width: '100%', textAlign:'center', marginTop: '-40px', marginBottom: '40px'}}>How does it work?</a>
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
            />
            <div className={harpactiveWindow.harpsignupClasses} id="harpsignup" onClick={()=>handleSignupClick()}>
                <div className="harplogin-signup-title">
                    HARP SIGNUP
                </div>
                <form onSubmit={handleSubmit}>
                    <>
                        <div style={{padding: '25px'}}>   
                            <div className="input-name" id='harploginEmail'>
                                <h3>Email<span style={{fontSize: '80%', fontStyle: 'italic', fontWeight: 'normal'}}>&nbsp;more than one harp may use the same email</span></h3>
                            </div>
                            <input
                                className="field-input"
                                type='email'
                                id={uuid()}
                                value={harpSignup.harpsignupemail}
                                onChange={handleChange}
                                name='harpsignupemail'
                                required={harpactiveWindow.active==='harpsignup'}
                                disabled={harpactiveWindow.active==='harplogin'}
                            />
                            <div className="input-name input-margin">
                                <h3>Harp Name</h3>
                            </div>
                            <input 
                                className="field-input"
                                type='text'
                                id={uuid()}
                                value={harpSignup.harpsignuppassword}
                                onChange={handleChange}
                                name='harpsignuppassword'
                                required={harpactiveWindow.active==='harpsignup'}
                                disabled={harpactiveWindow.active==='harplogin'}
                            />
                        </div>
                        <div style={{padding: '0 25px 20px'}}>
                            <NewsletterSignup />
                        </div>
                        <button type='submit' className="submit-btn login-signup-title">
                            Submit
                        </button>
                    </>
                </form>
            </div>
            <div className={harpactiveWindow.harploginClasses} id="harplogin" onClick={handleLoginClick}>
                <div className="harplogin-signup-title">
                    HARP LOGIN
                </div>
                <form onSubmit={handleSubmit}>
                    <>
                        <div style={{padding: '25px'}}>   
                            <div className="input-name" id='harploginEmail'>
                                <h3>Email</h3>
                            </div>
                            <input
                                className="field-input"
                                type='email'
                                id={uuid()}
                                value={harpLogin.harploginemail}
                                onChange={handleChange}
                                name='harploginemail'
                                required={harpactiveWindow.active==='harplogin'}
                                disabled={harpactiveWindow.active==='harpsignup'}
                            />
                            <div className="input-name input-margin">
                                <h3>Harp Name</h3>
                            </div>
                            <input 
                                className="field-input"
                                type='text'
                                id={uuid()}
                                value={harpLogin.harploginpassword}
                                onChange={handleChange}
                                name='harploginpassword'
                                required={harpactiveWindow.active==='harplogin'}
                                disabled={harpactiveWindow.active==='harpsignup'}
                            />
                        </div>
                        <button type='submit' className="submit-btn login-signup-title">
                            Submit
                        </button>
                        <div className="forgot-pass" onClick={handleForgot}>
                            <a href="#">Forgot Harp Name?</a>
                        </div>
                    </>
                </form>
            </div>
            <HarpLoginSignupCSS />
        </div>
        </>
    )
}

export default HarpLoginSignup;

{/* <form onSubmit={()=>handleSubmit()}>
                    <div className="harplogin-signup-title">
                        SIGN UP
                    </div>
                    <div className='harplogin-form'>
                        <div className="input-name">
                            <h3>First Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={harpSignup.firstname}
                            onChange={handleChange}
                            name='firstname'
                            placeholder="optional"
                            disabled={harpactiveWindow.active==='harplogin'}
                        />
                        <div className="input-name">
                            <h3>Last Name</h3>
                        </div>
                        <input 
                            className="field-input"
                            id={uuid()}
                            value={harpSignup.lastname}
                            onChange={handleChange}
                            name='lastname'
                            placeholder="optional"
                            disabled={harpactiveWindow.active==='harplogin'}
                        />
                        <div className="input-name input-margin">
                            <h3>E-Mail</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='email'
                            id={uuid()}
                            value={harpSignup.harpsignupemail}
                            onChange={handleChange}
                            name='harpsignupemail'
                            required={harpactiveWindow.active==='harpsignup'}
                            disabled={harpactiveWindow.active==='harplogin'}
                        />
                        <div className="input-name input-margin">
                            <h3>Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            id={uuid()}
                            value={harpSignup.harpsignuppassword}
                            onChange={handleChange}
                            name='harpsignuppassword'
                            required={harpactiveWindow.active==='harpsignup'}
                            disabled={harpactiveWindow.active==='harplogin'}
                        />
                        <div className="input-name input-margin">
                            <h3>Confirm Password</h3>
                        </div>
                        <input 
                            className="field-input"
                            type='password'
                            id={uuid()}
                            value={harpSignup.confirmpassword}
                            onChange={handleChange}
                            name='confirmpassword'
                            required={harpactiveWindow.active==='harpsignup'}
                            disabled={harpactiveWindow.active==='harplogin'}
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
                                    // checked={harpSignup.newsletter} 
                                    // onChange={handleChange} 
                                    className="checkme"
                                />
                                
                            {/* </div> */}
                //             <div className="rememberme">
                //                 <label htmlFor="remember-me-2" style={{marginLeft: '7px'}}>Signup for newsletter? Fun talk about harps every other month.</label>
                //             </div>
                //         </div>
                //         <div className="input-name input-margin">
                //             <h3>I prefer distances in</h3>
                //         </div>
                //         <div className='flex'>
                //             <input 
                //                 className="field-input"
                //                 type='radio'
                //                 id={uuid()}
                //                 value='miles'
                //                 onChange={handleChange}
                //                 name='distanceunit'
                //                 disabled={harpactiveWindow.active==='harplogin'}
                //                 style={{marginRight: '10px', width: 'fit-content'}}
                //                 defaultChecked
                //             />
                //             <label style={{marginRight: '30px'}} htmlFor="miles">Miles</label>
                //             <input 
                //                 className="field-input"
                //                 type='radio'
                //                 id={uuid()}
                //                 value='kms'
                //                 onChange={handleChange}
                //                 name='distanceunit'
                //                 disabled={harpactiveWindow.active==='harplogin'}
                //                 style={{marginRight: '10px', width: 'fit-content'}}
                //             />
                //             <label htmlFor="Kms">Kms</label>
                //         </div>   
                //         <div className="input-name input-margin">
                //             <h3>I prefer prices in</h3>
                //         </div>
                //         <div className='flex'>
                //             <input 
                //                 className="field-input"
                //                 type='radio'
                //                 id={uuid()}
                //                 value='USD'
                //                 onChange={handleChange}
                //                 name='currency'
                //                 disabled={harpactiveWindow.active==='harplogin'}
                //                 style={{marginRight: '10px', width: 'fit-content'}}
                //                 defaultChecked
                //             />
                //             <label style={{marginRight: '30px'}} htmlFor="miles">USD</label>
                //             <input 
                //                 className="field-input"
                //                 type='radio'
                //                 id={uuid()}
                //                 value='CAD'
                //                 onChange={handleChange}
                //                 name='currency'
                //                 disabled={harpactiveWindow.active==='harplogin'}
                //                 style={{marginRight: '10px', width: 'fit-content'}}
                //             />
                //             <label htmlFor="Kms">CAD</label>
                //         </div>   
                //     </div>
                //     <button type='submit' className="submit-btn login-signup-title" onClick={handleSubmit}>
                //         Submit
                //     </button>
                // </form> */}