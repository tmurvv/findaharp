// import App from 'next/app'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Router from 'next/router';
import Head from 'next/head';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as gtag from '../lib/gtag';

// css
import 'react-phone-input-2/lib/style.css'

// internal
import {CartContext} from "../src/contexts/CartContext";
import {CartSubtotalsContext} from "../src/contexts/CartSubtotalsContext";
import {CartOpenContext} from "../src/contexts/CartOpenContext";
import {UserContext} from "../src/contexts/UserContext";
import {CurrencyContext} from "../src/contexts/CurrencyContext";
import {StatusContext} from "../src/contexts/StatusContext";
import AppCss from '../src/styles/app.css.js';
import Banner from '../src/components/Banner';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
import CartButton from '../src/components/onlineStore/CartButton';
import ActivateEmail from '../src/components/ActivateEmail';
import ResetPassword from '../src/components/ResetPassword';
import UploadListingResult from '../src/components/UploadListingResult';
import SellerAgreement from '../src/components/SellerAgreement';
import UploadStoreItem from '../src/components/onlineStore/uploadstoreitem';
import { parseJwt } from '../src/utils/helpers';
import { getNumItems } from '../src/utils/storeHelpers'

const promise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
const cartOpenInit = false;
const cartItemsInit = [];
const cartSubtotalsInit = {
    shipping: 0,
    taxes: 0,
    shippingarray: []
}

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
        role: 'not set',
        agreementStatus: ''
    }); // firstname, lastname, email, distanceunit
    const [cart, setCart] = useState(cartItemsInit);
    const [shipping, setShipping] = useState('working');
    const [cartSubtotals, setCartSubtotals] = useState(cartSubtotalsInit);
    const [cartOpen, setCartOpen] = useState(cartOpenInit);
    const [status, setStatus] = useState('idle');
    const [currency, setCurrency] = useState('USD');
    const [currencyMultiplier, setCurrencyMultiplier] = useState(1.30);
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
    }, []);

    // reset window width on window resize
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) }
    }, []);
    
    const handleWindowClose = (e) => {
        if (isDirty) {
          e.preventDefault();
          return e.returnValue = 'You have unsaved changes - are you sure you wish to close?';
        }   
      };
    //get currency multiplier
    useEffect(() => {
        // const response = axios.get('https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=f99db690b27b4653acc2');
    });
    // if no user, check for JWT cookie in browser
    useEffect(() => {
        if (typeof window !== 'undefined' && !user._id) {
            let jwtToken;
            try {
                jwtToken = document.cookie.split('; ').find(row => row.startsWith('JWT')).split('=')[1];
            } catch(e) {
                // if JWT not found, just continue
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
                            role: returnedUser.role,
                            agreementStatus: returnUser.agreementStatus
                        });
                    } catch (e) {
                        console.log('Something went wrong retrieving user with JWT cookie:', e.message)
                    }       
                })();
            }
        }   
    }, []);
    // check for cart in local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let localCart;
            try {
                localCart = localStorage.getItem("fah-cart");
            } catch(e) {
                // if localStorage not found, just continue
            }
            if (localCart) {
                try {
                    let localCartJson = JSON.parse(localCart);
                    localCartJson = [...localCartJson]
                    localCartJson.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
                    setCart(localCartJson);
                } catch (e) {
                    console.log('error parsing local cart') // needs logging
                }
            }
        }   
    }, []);

    function handleNavOpen() {
        if (navOpen===undefined) {setNavOpen(true); return;};
        setNavOpen(!navOpen);
    }
    useEffect(()=>{
        // if (props.router&&props.router.query&&props.router.query.upload&&props.router.query.upload==='yes') Router.push('/uploadstoreitem');
    },[]);
    if (props.router.query.upload==='yes') {
        return( 
            <>  
                <Head>
                    <title>Find a Harp Pre-owned, Used</title>
                    <meta name="Description" content="Pre-owned or used Harps of all types -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities from harp stores around the US and Canada" key="title" />
                    <link rel="shortcut icon" href="./favicon.ico?v=5.0" sizes="16x16" type="image/png"/>
                    <script src="https://js.stripe.com/v3/" />
                </Head>
                <Banner />
                <UserContext.Provider value={{user, setUser}}>
                <StatusContext.Provider value={{status, setStatus}}>
                    <CartOpenContext.Provider value={{cartOpen, setCartOpen}}>
                        <CartContext.Provider value={{cart, setCart}}>
                        <CartSubtotalsContext.Provider value={{cartSubtotals, setCartSubtotals}}>
                            <CurrencyContext.Provider value={{currencyMultiplier, setCurrencyMultiplier}}>
                                <>
                                    <NavBar mobile={windowWidth<=550} open={navOpen} handleNavOpen={handleNavOpen}/>
                                    <CartButton />
                                    <UploadStoreItem />
                                    <Footer />
                                </>
                            </CurrencyContext.Provider>
                        </CartSubtotalsContext.Provider>
                        </CartContext.Provider>
                    </CartOpenContext.Provider>
                </StatusContext.Provider>
                </UserContext.Provider>
                
                <AppCss />
            </>
        )
    }
    if (props.router.query.agreement==='yes') {
        return( 
            <>  
                <Head>
                    <title>Find a Harp Pre-owned, Used</title>
                    <meta name="Description" content="Pre-owned or used Harps of all types -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities from harp stores around the US and Canada" key="title" />
                    <link rel="shortcut icon" href="./favicon.ico?v=5.0" sizes="16x16" type="image/png"/>
                    <script src="https://js.stripe.com/v3/" />
                </Head>
                <Banner />
                <UserContext.Provider value={{user, setUser}}>
                <StatusContext.Provider value={{status, setStatus}}>
                    <CartOpenContext.Provider value={{cartOpen, setCartOpen}}>
                        <CartContext.Provider value={{cart, setCart}}>
                        <CartSubtotalsContext.Provider value={{cartSubtotals, setCartSubtotals}}>
                            <CurrencyContext.Provider value={{currencyMultiplier, setCurrencyMultiplier}}>
                                <>
                                                <NavBar mobile={windowWidth<=550} open={navOpen} handleNavOpen={handleNavOpen}/>
                                                <CartButton />
                                                <SellerAgreement />
                                                <Footer />
                                            </>
                                
                            </CurrencyContext.Provider>
                        </CartSubtotalsContext.Provider>
                        </CartContext.Provider>
                    </CartOpenContext.Provider>
                </StatusContext.Provider>
                </UserContext.Provider>
                
                <AppCss />
            </>
        )
    }








    return( 
        <>  
            <Head>
                <title>Find a Harp Pre-owned, Used</title>
                <meta name="Description" content="Pre-owned or used Harps of all types -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities from harp stores around the US and Canada" key="title" />
                <link rel="shortcut icon" href="./favicon.ico?v=5.0" sizes="16x16" type="image/png"/>
                <script src="https://js.stripe.com/v3/" />
            </Head>
            <Banner />
            <UserContext.Provider value={{user, setUser}}>
            <StatusContext.Provider value={{status, setStatus}}>
                <CartOpenContext.Provider value={{cartOpen, setCartOpen}}>
                    <CartContext.Provider value={{cart, setCart}}>
                    <CartSubtotalsContext.Provider value={{cartSubtotals, setCartSubtotals}}>
                        <CurrencyContext.Provider value={{currencyMultiplier, setCurrencyMultiplier}}>
                            {props.router.query.upload
                                ?<UploadStoreItem />
                                :props.router.query.agreement
                                ?<SellerAgreement />
                                :props.router.query.reset
                                ?<ResetPassword />
                                :props.router.query.activateemail
                                    ?<ActivateEmail found={true}/>
                                    :props.router.query.uploadlisting
                                        ?<UploadListingResult success={true}/>
                                        :<>
                                            <NavBar mobile={windowWidth<=550} open={navOpen} handleNavOpen={handleNavOpen}/>
                                            <CartButton />
                                            <Elements stripe={promise}>
                                                <Component {...pageProps} />
                                            </Elements>
                                            <Footer />
                                        </>
                            }
                        </CurrencyContext.Provider>
                    </CartSubtotalsContext.Provider>
                    </CartContext.Provider>
                </CartOpenContext.Provider>
            </StatusContext.Provider>
            </UserContext.Provider>
            
            <AppCss />
        </>
    )
}
export function getServerSideProps(context) {
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
