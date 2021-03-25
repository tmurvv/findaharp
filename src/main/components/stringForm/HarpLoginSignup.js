// packages
import React, { useState, useContext, useReducer, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

// contexts
import { UserContext } from '../../contexts/UserContext';
import { StringFormContext } from '../../contexts/StringFormContext';
// components
import HarpLoginSignupCSS from '../../styles/onlineStore/HarpLoginSignup.css';
import PageTitle from '../PageTitle';
import Results from '../Results';
import NewsletterSignup from '../NewsletterSignup';
import FastNEasyStringForm from '../onlineStore/FastNEasyStringForm';
// other internal
import { RESULTS_INITIAL_STATE, RESULTSWINDOW_INITIAL_STATE, NOTES_IN_OCTAVE  } from '../../constants/constants';
import { STRING_FORM_INIT } from '../../constants/inits';
import { resultInfoReducer, harpactiveWindowReducer } from '../../reducers/reducers';
import { zeroQuantities } from '../../utils/storeHelpers';

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
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [harpactiveWindow, dispatchharpactiveWindow] = useReducer(harpactiveWindowReducer, harpactiveWindowInitialState);
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
    const [ loginFail, setLoginFail ] = useState(false)
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
        
        console.log('active wind', harpactiveWindow.active)
        console.log('signup', stringForm)
        document.querySelector('#spinner').style.display="block";
        evt.preventDefault();
        const resultText = document.querySelector('#loadingLoginText');
        if (harpactiveWindow.active==='harpsignup') {
            // create signup harp object
            console.log('harpsingupstringform', stringForm)
            // zero quantities for stringform object 
            let newObject = JSON.parse(JSON.stringify(stringForm));
            newObject.map((string)=>{
                console.log('instring', string);
                NOTES_IN_OCTAVE.map(noteio=>{
                    if (string[noteio]) {string[noteio].qty='0';} else {return;}
                });
            });
            const newHarp = {
                oldemail: harpSignup.harpsignupemail,
                // oldemail: "6test@test.com",
                // oldharpname: '6mytest',
                oldharpname: harpSignup.harpsignuppassword,
                stringform: JSON.stringify(newObject), 
                newsletter: harpSignup.newsletter
            };
            console.log('newharp', newHarp)
            // signup harp
            try {
                const res = await axios.post(`${process.env.backend}/api/v1/userharps/createuserharp`, newHarp);
                if (res.status===201 || res.status===200) {                   
                    // set harpContext to added harp
                    const returnedHarp = res.data.userharp;
                    console.log(res.data)
                    
                    setUser({
                        firstname: user.firstname||'login',
                        lastname: user.lastname||'',
                        email: user.email||'',
                        newsletter: user.newsletter||'',
                        distanceunit: user.distanceunit||'miles',
                        currency: user.currency||"usd",
                        _id: user._id||'',
                        role: user.role||'',
                        agreementStatus: user.agreementStatus||'',
                        _idCurrentHarp: returnedHarp._id,
                        emailCurrentHarp: returnedHarp.email,
                        currentHarpname: returnedHarp.harpname,
                        harplist: returnedHarp.harplist
                    });
                    resultText.innerText=`Signup Successful. Welcome harp ${harpSignup.harpsignuppassword.toUpperCase()}`;
                    dispatchResultInfo({type: 'OK'});  
                }
            // Error on signup
            } catch (e) {
                document.querySelector('#spinner').style.display='none';
                console.log('signup error', e.message)
                // email not valid
                if (e.response&&e.response.data&&e.response.data.data&&e.response.data.data.message.includes('not valid')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.response.data.data.message:'Please enter a valid email address.'}`;
                    dispatchResultInfo({type: 'tryAgain'});
                // other error
                } else {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on signup. Please check your network connection.'}`;
                    dispatchResultInfo({type: 'tryAgain'});
                }
            }
        }       
        if (harpactiveWindow.active==='harplogin') { 
            console.log('active wind', harpactiveWindow.active)
            // set loading image
            document.querySelector('#spinner').style.display="block";
            dispatchResultInfo({type:'loadingImage'});    
            console.log(harpLogin);
            if (!harpLogin.harploginemail) return alert('Please enter an email.')
            const sendHarpname = harpLogin.harploginpassword || 'get list';
            try {
                // login harp
                let res = await axios.get(encodeURI(`${process.env.backend}/api/v1/userharps/loginuserharp/?oldemail=${harpLogin.harploginemail}&oldharpname=${sendHarpname}`));
                console.log('imhere')
                const returnedHarp = res.data.userharp;
                const jwt = res.data.token;
                console.log('returned', returnedHarp)
                let parseStringForm;
                try {
                    if (returnedHarp.stringform) parseStringForm = await JSON.parse(returnedHarp.stringform);
                } catch(e) {
                    parseStringForm = JSON.parse(JSON.stringify(STRING_FORM_INIT));
                }
                
                console.log('parse from login', parseStringForm);
                // purge quantities
                if (parseStringForm&&parseStringForm.length>0) {
                    parseStringForm=zeroQuantities(parseStringForm);
                } else {
                    parseStringForm = JSON.parse(JSON.stringify(STRING_FORM_INIT));
                }
                
                console.log('loginharplist', returnedHarp.harplist)
                
                // set harp context to login harp
                setUser({
                    firstname: user.firstname||'login',
                    lastname: user.lastname||'',
                    email: user.email||'',
                    newsletter: user.newsletter||'',
                    distanceunit: user.distanceunit||'miles',
                    currency: user.currency||"usd",
                    _id: user._id||'',
                    role: user.role||'',
                    agreementStatus: user.agreementStatus||'',
                    _idCurrentHarp: returnedHarp._id,
                    emailCurrentHarp: returnedHarp.email,
                    currentHarpname: returnedHarp.harpname,
                    stringform: parseStringForm,
                    harplist: returnedHarp.harplist
                });
                setStringForm(parseStringForm);
                // set JWT cookie
                 document.cookie = `JWT=${jwt}`
                // display result window
                resultText.innerText=`Login Successful: Welcome Harp ${returnedHarp.harpname.toUpperCase()}`;
                dispatchResultInfo({type: 'OK'});
            } catch(e) {
                document.querySelector('#spinner').style.display='none';
                // console log the error
                if (e.response&&e.response.data&&e.response.data.message) console.log('loginerror', e.response.data.message)
                // email not found #1
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message==="Harpname or email not found.") {
                    resultText.innerText=`Harp not found. Select Harp Signup window to add harp.`;
                    dispatchResultInfo({type: 'tryAgain'});
                // email not found #2
                } else if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('Email')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Email not found.'}`;
                    dispatchResultInfo({type: 'tryAgain'});
                // other error
                } else {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on login. Please check your network connection.'}`;
                    dispatchResultInfo({type: 'tryAgain'});
                }
                setLoginFail(true);
            }
        }
        resetSignupForm();
    }
    // // handle forgotPassword click
    // async function handleForgot() {
    //     const resultText = document.querySelector('#loadingLoginText');
    //     // shortcut no email entered
    //     if (!harpLogin.loginemail) {
    //         resultText.innerText='Please enter your account email.';
    //         dispatchResultInfo({type: 'tryAgain'});
    //         return;
    //     }
    //     try {
    //         // send forgot password email
    //         const res = await axios.get(`${process.env.backend}/api/v1/harps/sendresetemail/${harpLogin.loginemail}`);
    //         // display results
    //         if (res.status===200) {
    //             resultText.innerText=`Please check your inbox for an email with instructions to reset your password.`;
    //             dispatchResultInfo({type: 'OK'});
    //         }
    //     } catch (e) {
    //         // display error
    //         resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong with password reset. Please check your netword connection.'} Log in as guest harp?`
    //         dispatchResultInfo({type: 'okTryAgain'});
    //     }
    // }
    async function getHarpList(e) {
        document.querySelector('#spinner').style.display='block';
        // Not sure why I added this setUser
        // setUser({
        //     ...user, 
        //     harplist: null})
        const resultText = document.querySelector('#loadingLoginText');
        console.log('e', e.target.value)
        try {
            // get list
            // const res = await axios.post(`${process.env.backend}/api/v1/userharps/loginuserharp`, {oldemail: e.target.value, oldharpname: "get list"});
            let res = await axios.get(encodeURI(`${process.env.backend}/api/v1/userharps/loginuserharp/?oldemail=${e.target.value}&oldharpname=get list`));
                
            const returnedHarp = res.data.userharp;
            const jwt = res.data.token;
            console.log('returned', returnedHarp)
            document.querySelector('#spinner').style.display='none';
            if (returnedHarp.length===0) {
                setLoginFail(true);
                resultText.innerText=`No harps found for this email. Select signup window to add a harp.`;
                dispatchResultInfo({type: 'OK'});
            }
            console.log('above set')
            // set harp context to login harp
            setUser({
                firstname: user.firstname||'login',
                lastname: user.lastname||'',
                email: user.email||'',
                newsletter: user.newsletter||'',
                distanceunit: user.distanceunit||'miles',
                currency: user.currency||"usd",
                _id: user._id||'',
                role: user.role||'',
                agreementStatus: user.agreementStatus||'',
                emailCurrentHarp: user.emailCurrentHarp||'',
                currentHarpname: user.currentHarpname||'',
                stringform: stringForm||STRING_FORM_INIT,
                _idCurrentHarp: user._idCurrentHarp||'',
                harplist: returnedHarp
            });
            console.log('bel set')
            // set JWT cookie
            //  document.cookie = `JWT=${jwt}`
            // display result window
            // resultText.innerText=`Login Successful: Welcome Harp ${returnedHarp.harpname}`;
            // dispatchResultInfo({type: 'OK'});
        } catch(e) {
            document.querySelector('#spinner').style.display='none';
            if (e.response&&e.response.data&&e.response.data.message) console.log('loginerror', e.response.data.message)
            // harp not found #1
            if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message==="Harpname or email not found.") {
                resultText.innerText=`Harp not found. Select signup window to add harp.`;
                dispatchResultInfo({type: 'OK'});
            
            // email not found #2
            } else if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('Email')) {
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Email not found.'}`;
                dispatchResultInfo({type: 'OK'});
            // other error
            } else {
                resultText.innerText=`${process.env.next_env==='development'?e.message:'Something went wrong on login. Please check your network connection.'}`;
                dispatchResultInfo({type: 'OK'});
            }
            setLoginFail(true);
        }

    }
    async function loginGuest(evt) {
        document.querySelector('#spinner').style.display="none";
        resetResults();
        if (!loginFail) props.setstringformstatus('stringform');
        setLoginFail(false)
        // go to main window
        // Router.push('/');
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    return ( 
       <div style={{position: 'relative'}}>
       <img id='spinner' style={{
                display: 'none', 
                position: 'fixed', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%,-50%)',
                zIndex: '9000',
                height: '75px'
            }} 
            src='/img/spinner.gif' 
            alt='spinner' 
        />
        <div style={{position: 'absolute', top: '15px', left: '15px', zIndex: '2000'}}>
            <FastNEasyStringForm setstringformstatus={props.setstringformstatus}/>
        </div>
        <div className='harplogin-signup-container'>
            <PageTitle maintitle='Harp Login/Signup' subtitle='Keep track of one or many harp string brands!' />
            <button onClick={()=>props.setstringformstatus('explained')} style={{margin: '-40px auto 40px', border: 'none', display: 'flex', justifyContent: 'center', fontSize: '14px', color: '#6A75AA', textDecoration: 'underline', textAlign:'center', backgroundColor: 'transparent'}}>How does it work?</button>
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
            <div className={harpactiveWindow.harploginClasses} style={process.browser&&window.innerWidth<550?{transform: 'translateY(-97%)'}:{transform: 'translate(10%, -97%)'}} id="harplogin" onClick={handleLoginClick}>
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
                                onBlur={(e)=>getHarpList(e)}
                                required={harpactiveWindow.active==='harplogin'}
                                disabled={harpactiveWindow.active==='harpsignup'}
                            />
                            <div className="input-name input-margin">
                                <h3>Harp Name</h3>
                            </div>
                            <select 
                                style={{padding: '7px 10px', width: '100%'}}
                                value={harpLogin.harploginpassword}
                                onChange={handleChange}
                                name='harploginpassword'
                                required={harpactiveWindow.active==='harplogin'}
                                disabled={harpactiveWindow.active==='harpsignup'}
                            >
                                <option key={uuid()}>select harp</option>
                                {user.harplist&&user.harplist.map(harp => <option key={uuid()} value={harp.harpname}>{harp.harpname}</option>)}
                            </select>
                            
                            {/* <input 
                                className="field-input"
                                type='text'
                                id={uuid()}
                                value={harpLogin.harploginpassword}
                                onChange={handleChange}
                                name='harploginpassword'
                                required={harpactiveWindow.active==='harplogin'}
                                disabled={harpactiveWindow.active==='harpsignup'}
                            /> */}
                            
                            
                        </div>
                        <button type='submit' className="submit-btn login-signup-title">
                            Submit
                        </button>
                        {/* <div className="forgot-pass" onClick={handleForgot}>
                            <a href="#">Forgot Harp Name?</a>
                        </div> */}
                    </>
                </form>
            </div>
            <HarpLoginSignupCSS />
        </div>
        </div>
    )
}

export default HarpLoginSignup;

