// packages
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router'
import Head from 'next/head';
import axios from 'axios';
import uuid from 'uuid';

// internal
import IndexCss from '../src/styles/index.css.js';
import ProductSearch from '../src/components/ProductSearch';
import PageTitle from '../src/components/PageTitle';
import LoginSignupCSS from '../src/styles/LoginSignup.css';
import { UserContext } from '../src/contexts/UserContext';

// local test data
import testData from '../src/utils/testData';
import testMakesModels from '../src/utils/testMakesModels';
import { activeWindowReducer, resultInfoReducer } from "../src/reducers/reducers.js";

const Index = (props) => {
    //#region reset functionality
    const { user, setUser} = useContext(UserContext);
    // const Router = useRouter();
    //     let email; 
    //     if (Router.query.useremail) email = Router.query.useremail.substr(0,Router.query.useremail.length-1);
    //     console.log('router', Router.query)
    //     if (email) console.log('email', email)
    //     console.log(props);

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
        document.querySelector('#loadingLogin').style.display='none';
        document.querySelector('#loadingLoginText').innerText='';
        document.querySelector('#loadingLoginOk').style.display='none';
        document.querySelector('#loadingLoginTryAgain').style.display='none';
        document.querySelector('#loadingLoginImg').style.display='none';
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resultContainer = document.querySelector('#loadingLogin');
        const resultText = document.querySelector('#loadingLoginText');
        const resultButton = document.querySelector('#loadingLoginOk');
        const resultButtonTryAgain = document.querySelector('#loadingLoginTryAgain');
        const resultImg = document.querySelector('#loadingLoginImg');
        
        console.log(userLogin, 'resetpass')
        console.log('iminsubmit')
        resultContainer.style.display='block';
        if (userLogin.newpassword.length<8) {
            resultImg.style.display='none';
            resultButtonTryAgain.style.display='block';
            resultButtonTryAgain.style.marginLeft=0;
            resultText.innerText=`Passwords must be at least 8 characters long.`;
            return
        }
        // passwords match 
        if (userLogin.newpassword !== userLogin.confirmpassword) {
            resultContainer.style.display='block';
            resultImg.style.display='none';
            resultButtonTryAgain.style.display='block';
            resultButtonTryAgain.style.marginLeft=0;
            resultText.innerText=`Passwords do not match.`;
            return
        }
        resultText.innerText='Loading...';
        resultImg.style.display='block';
        console.log('imhere')
        try {
            /* LOCAL */
            const res = await axios.patch(`${process.env.backend}/api/v1/users/updatepassword/${Router.query.resetpasswordemail}`, {resetpassword: userLogin.newpassword});
            /* TESTING */
            // const res = await axios.patch(`https://findaharp-api-testing.herokuapp.com/api/v1/users/updatepassword/${Router.query}`, {resetpassword: userLogin.newpassword});
            /* STAGING */
            // const res = await axios.patch(`https://findaharp-api-staging.herokuapp.com/api/v1/users/updatepassword/${Router.query}`, {resetpassword: userLogin.newpassword});
            /* PRODUCTION */
            // const res = await axios.patch(`https://findaharp-api.herokuapp.com/api/v1/users/updatepassword/${Router.query}`, {resetpassword: userLogin.newpassword});
            console.log('res', res)
            resultText.innerText=`Password change successful.`;
            resultImg.style.display='none';
            resultButton.style.display= 'block';
            // Router.push('/LoginSignup'); //BREAKING
        } catch(e) {
            console.dir(e)
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
        Router.push('/');
    }


    //#endregion

    const [clientLat, setClientLat] = useState();
    const [clientLong, setClientLong] = useState();
    const [router, setRouter] = useState();
    const verifying = true;
    const found = true;
    const Router = useRouter();
    useEffect(() => {
        if (navigator&&navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) { // courtesy Gaurav Singhal, PluralSight
                setClientLat(position.coords.latitude.toFixed(4));
                setClientLong(position.coords.longitude.toFixed(4));
            });
        }
       }, []);
    useEffect(() => {

        if (navigator&&navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) { // courtesy Gaurav Singhal, PluralSight
                setClientLat(position.coords.latitude.toFixed(4));
                setClientLong(position.coords.longitude.toFixed(4));
            });
        }
       }, []);
    return (
        <>
        <Head>
            <title>Find a Harp Pre-owned, Used</title>
            <meta name="Description" content="Pre-owned or used Harps of all types -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities from harp stores around the US and Canada" key="title" />
        </Head>
        <div className='login-signup-container' style={{padding: '40px'}} hidden={!props.verifying}>
                {props.verifying && !found ? 
                <div id="loadingLogin" style={{display: 'block', top: '25%'}}>
                    <img id='loadingLoginImg' src='/img/spinner.gif' style={{display: 'block'}} alt='loading spinner' />
                    <p id="loadingLoginText">VERIFYING EMAIL and Logging In</p>
                    <div className='flex-sb'>
                        <button id='loadingLoginOk' type='button' style={{display: 'none'}} className='submit-btn'>OK</button>
                        {/* <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button> */}
                    </div>
                </div>
                :   
                    <div id="loadingLogin" style={{display: 'block'}}>
                        {props.found?
                        <>
                        <img id='loadingLoginImg' src='/img/spinner.gif' style={{display: 'none'}} alt='loading spinner' />
                        <p id="loadingLoginText">Thank you for verifying your email.</p>
                        <div className='flex-sb'>
                            <button id='loadingLoginOk' type='button' style={{display: 'block'}} className='submit-btn' onClick={()=>Router.push('/')}>OK</button>
                            {/* <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button> */}
                        </div>
                        </>
                        : <>
                            <img id='loadingLoginImg' src='/img/spinner.gif' style={{display: 'none'}} alt='loading spinner' />
                            <p id="loadingLoginText">Unable to verify email. Logging in as guest.</p>
                            <div className='flex-sb'>
                                <button id='loadingLoginOk' type='button' style={{display: 'block'}} className='submit-btn' onClick={()=>Router.push('/')}>OK</button>
                                {/* <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button> */}
                            </div>
                        </>
                    }
                    </div>              
                }
            <LoginSignupCSS />
        </div>
        {props.reset?
        <>
            <div className='login-signup-container'>
                <PageTitle maintitle='User Profile' subtitle='Change Password / Edit Profile' />
                <div id="loadingLogin">
                    <img id='loadingLoginImg' src='/img/spinner.gif' alt='loading spinner' />
                    <p id="loadingLoginText"></p>
                    <div className='flex-sb'>
                        <button id='loadingLoginOk' type='button' className='submit-btn' onClick={loginGuest}>OK</button>
                        <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
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
                                placeholder={Router.query.resetpasswordemail.substr(0,Router.query.resetpasswordemail.length-1)}
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
        :''
        }
        {!props.verifying && !props.reset?
        <>
        <div className="index">  
            <PageTitle maintitle='Find a Harp' subtitle='Pre-owned harp listings from around the US and Canada' />
            <ProductSearch 
                makesmodels={props.makesModels}
                products={props.products}
                clientlat={clientLat}
                clientlong={clientLong}
            />                 
        </div>
        <IndexCss />
        </>
        :''}
        </>
    );
}

Index.getInitialProps = async (props) => {
    // console.log('getinit', props);
    if (props.query.activateemail) {
        try {
            const res = await axios.post('https://findaharp-api-staging.herokuapp.com/api/v1/emailverify', { email: activateEmail});
            if (res) return { verifying: true, found: true };
        } catch (error ) {
            console.error('error', error);
            return { verifying: true, found: false };
        }        
        return { verifying: true, found: false };
    } else if (props.query.resetpasswordemail) {
        return { verifying: false, reset: true }
    } else {

    
        /******************
         * LOCAL DATA
         ******************/
        //LOCAL DATA Populate variables
        // const products = testData;
        // const makesModels = testMakesModels;

        /*******************
         * API DATA
         *******************/
        // PRODUCTION API
        // const res = await axios.get('https://findaharp-api.herokuapp.com/');
        // STAGING API
        // const res = await axios.get('https://findaharp-api-staging.herokuapp.com/');
        // TESTING API
        // const res = await axios.get('https://findaharp-api-testing.herokuapp.com/');
        // LOCAL API
        const res = await axios.get(`${process.env.backend}`);
        
        // API DATA Populate variables
        const products = res.data.harpData;
        const makesModels = res.data.harpMakesModels;
        products.sort((a,b) => (a.productModel > b.productModel) ? 1 : ((b.productModel > a.productModel) ? -1 : 0));
        
        return { products, makesModels, verifying: false, found: false };
    }
    
    /******************
     * LOCAL DATA
     ******************/
    //LOCAL DATA Populate variables
    // const products = testData;
    // const makesModels = testMakesModels;

    /*******************
     * API DATA
     *******************/
    // PRODUCTION API
    // const res = await axios.get('https://findaharp-api.herokuapp.com/');
    // STAGING API
    // const res = await axios.get('https://findaharp-api-staging.herokuapp.com/');
    // TESTING API
    // const res = await axios.get('https://findaharp-api-testing.herokuapp.com/');
    // LOCAL API
    const res = await axios.get(`${process.env.backend}`);
    
    // API DATA Populate variables
    const products = res.data.harpData;
    const makesModels = res.data.harpMakesModels;
    products.sort((a,b) => (a.productModel > b.productModel) ? 1 : ((b.productModel > a.productModel) ? -1 : 0));
     
    return { products, makesModels };
}

export default Index;
