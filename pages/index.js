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
        {/* <div className='loginVerify-signup-container' style={{padding: '40px'}} hidden={!props.verifying}>
                {props.verifying && !found ? 
                <div id="loadingVerifyLogin" style={{display: 'block', top: '25%'}}>
                    <img id='loadingVerifyLoginImg' src='/img/spinner.gif' style={{display: 'block'}} alt='loading spinner' />
                    <p id="loadingVerifyLoginText">VERIFYING EMAIL and Logging In</p>
                    <div className='flex-sb'>
                        <button id='loadingVerifyLoginOk' type='button' style={{display: 'none'}} className='submit-btn'>OK</button>
                        <button id='loadingVerifyLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                    </div>
                </div>
                :   
                    <div id="loadingVerifyLogin" style={{display: 'block'}}>
                        {props.found?
                        <>
                        <img id='loadingVerifyLoginImg' src='/img/spinner.gif' style={{display: 'none'}} alt='loading spinner' />
                        <p id="loadingVerifyLoginText">Thank you for verifying your email.</p>
                        <div className='flex-sb'>
                            <button id='loadingVerifyLoginOk' type='button' style={{display: 'block'}} className='submit-btn' onClick={()=>Router.push('/')}>OK</button>
                            <button id='loadingVerifyLoginTryAgain' type='button' style={{display: 'none'}} className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                        </div>
                        </>
                        : <>
                            <img id='loadingVerifyLoginImg' src='/img/spinner.gif' style={{display: 'none'}} alt='loading spinner' />
                            <p id="loadingVerifyLoginText">Unable to verify email. Logging in as guest.</p>
                            <div className='flex-sb'>
                                <button id='loadingVerifyLoginOk' type='button' style={{display: 'block'}} className='submit-btn' onClick={()=>Router.push('/')}>OK</button>
                                <button id='loadingVerifyLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
                            </div>
                        </>
                    }
                    </div>              
                }
            <LoginSignupCSS />
        </div>
        {props.reset?
        <>
            <div className='loginReset-signup-container'>
                <PageTitle maintitle='User Profile' subtitle='Change Password / Edit Profile' />
                <div id="loadingResetLogin">
                    <img id='loadingResetLoginImg' src='/img/spinner.gif' alt='loading spinner' />
                    <p id="loadingResetLoginText"></p>
                    <div className='flex-sb'>
                        <button id='loadingResetLoginOk' type='button' className='submit-btn' onClick={loginGuest}>OK</button>
                        <button id='loadingResetLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button>
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
                        <button type='button' onClick={handleSubmit} className="submit-btn login-signup-title">
                            Submit
                        </button>
                    </form>
                </div>
                <LoginSignupCSS />
            </div>
        </>
        :''
        }
        {!props.verifying && !props.reset? */}
        {/* <> */}
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
        {/* </> */}
        {/* :''} */}
        </>
    );
}

Index.getInitialProps = async (props) => {
        /******************
         * LOCAL DATA
         ******************/
        //LOCAL DATA Populate variables
        // const products = testData;
        // const makesModels = testMakesModels;

        /*******************
         * API DATA
         *******************/
        // API
        const res = await axios.get(`https://findaharp-api.herokuapp.com`);
        // const res = await axios.get(`https://findaharp-api-staging.herokuapp.com`);
        // const res = await axios.get(`http://localhost:3000`);
        // API DATA Populate variables
        const products = res.data.harpData;
        const makesModels = res.data.harpMakesModels;
        products.sort((a,b) => (a.productModel > b.productModel) ? 1 : ((b.productModel > a.productModel) ? -1 : 0));
        return { products, makesModels, verifying: false, found: false };
}

export default Index;
