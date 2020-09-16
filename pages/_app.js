// import App from 'next/app'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Router from 'next/router'
import * as gtag from '../lib/gtag'

// css
import 'react-phone-input-2/lib/style.css'

// internal
import {UserContext} from "../src/contexts/UserContext";
import {CurrencyContext} from "../src/contexts/CurrencyContext";
import AppCss from '../src/styles/app.css.js';
import Banner from '../src/components/Banner';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
import ActivateEmail from '../src/components/ActivateEmail';
import ResetPassword from '../src/components/ResetPassword';
import UploadListingResult from '../src/components/UploadListingResult';
import { parseJwt } from '../src/utils/helpers';

function MyApp(props) {
    const { Component, pageProps } = props;
    const [user, setUser] = useState({
        firstname: '', 
        lastname: '', 
        email: '', 
        distanceunit: 'mi', 
        _id: '',
        newsletter: '',
        currency: 'USD',
        role: 'not set'
    }); // firstname, lastname, email, distanceunit
    const [currencyMultiplier, setCurrencyMultiplier] = useState();
    const [windowWidth, setWindowWidth] = useState(0);
    const [navOpen, setNavOpen] = useState(false);
    
    // Google Analytics
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        Router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])

    // reset window width on window resize
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) }
    }, []);
    
    // if no user, check for JWT cookie in browser
    useEffect(() => {
        if (typeof window !== 'undefined' && !user._id) {
            let jwtToken;
            try {
                jwtToken = document.cookie.split('; ').find(row => row.startsWith('JWT')).split('=')[1];
            } catch(e) {
                // JWT not found
            }
            if (jwtToken) {
                const userId = parseJwt(jwtToken).id;
                (async () => {
                    try {
                        const res = await axios.post(`${process.env.backend}/api/v1/users/loginuser`, {cookieId: userId});
                        const returnedUser = res.data.user;
                        const jwt = res.data.token;
                        document.cookie = `JWT=${jwt}`
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
                    } catch (e) {
                        console.log('Something went wrong retrieving user with JWT cookie:', e.message)
                    }       
                })();
            }
        }   
    }, []);

    function handleNavOpen() {
        if (navOpen===undefined) {setNavOpen(true); return;};
        setNavOpen(!navOpen);
    }
    return( 
        <>  
            <title>Find a Harp Pre-owned, Used</title>
            <meta name="Description" content="Pre-owned or used Harps of all types -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities from harp stores around the US and Canada" key="title" />
            <link rel="shortcut icon" href="./favicon.ico?v=5.0" sizes="16x16" type="image/png"/>
            <Banner />
            <UserContext.Provider value={{user, setUser}}>
                <CurrencyContext.Provider value={{currencyMultiplier, setCurrencyMultiplier}}>
                    {props.router.query.reset
                        ?<ResetPassword />
                        :props.router.query.activateemail
                            ?<ActivateEmail found={true}/>
                            :props.router.query.uploadlisting
                                ?<UploadListingResult success={true}/>
                                :<>
                                    <NavBar mobile={windowWidth<=550} open={navOpen} handleNavOpen={handleNavOpen}/>
                                    <Component {...pageProps} />
                                    <Footer />
                                </>
                    }
                </CurrencyContext.Provider>
            </UserContext.Provider>
            <AppCss />
        </>
    )
}
export async function getServerSideProps(context) {
    return {
      props: {query: context.query}, // will be passed to the page component as props
    }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
