// import App from 'next/app'
import React, {useState, useEffect} from 'react';
import Head from 'next/head';
// css
import 'react-phone-input-2/lib/style.css'

// internal
import {UserContext} from "../src/contexts/UserContext";
import AppCss from '../src/styles/app.css.js';
import Banner from '../src/components/Banner';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
import ActivateEmail from '../src/components/ActivateEmail';
import ResetPassword from '../src/components/ResetPassword';

function MyApp(props) {
    const { Component, pageProps } = props;
    const [user, setUser] = useState(['Login', '', '', 'miles']); // firstname, lastname, email, distanceunit
    const [windowWidth, setWindowWidth] = useState(0);
    const [navOpen, setNavOpen] = useState(false);
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) }
    }, []);
    function handleNavOpen() {
        if (navOpen===undefined) {setNavOpen(true); return;};
        setNavOpen(!navOpen);
    }
    return( 
        <>  
            <Head>
                <title>Find a Harp Pre-owned, Used</title>
                <meta name="Description" content="Pre-owned or used Harps of all types -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities from harp stores around the US and Canada" key="title" />
                <link rel="shortcut icon" href="./favicon.ico?v=5.0" sizes="16x16" type="image/png"/>
            </Head>
            <Banner />
            <UserContext.Provider value={{user, setUser}}>
            {props.router.query.resetpasswordemail
                ?<ResetPassword found={true} />
                :props.router.query.activateemail
                    ?<ActivateEmail found={true}/>
                    :
                        <>
                            <NavBar mobile={windowWidth<=550} open={navOpen} handleNavOpen={handleNavOpen}/>
                            <Component {...pageProps} />
                            <Footer />
                        </>
            }
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
