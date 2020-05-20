// import App from 'next/app'
import React, {useState, useEffect, useContext} from 'react';
import { useRouter } from 'next/router';
// css
import 'react-phone-input-2/lib/style.css'

// internal
import {UserContext} from "../src/contexts/UserContext";
import AppCss from '../src/styles/app.css.js';
import Banner from '../src/components/Banner';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
import Head from '../src/components/Head';
import ActivateEmail from './ActivateEmail.js';

// let user = {
//     name: 'guest user',
//     email: '',
//     changeUser: (newUser) => {
//         console.log('imin', newUser)
//         console.log('userabove', user)
//         console.log('below', user)
//         return user = {name: newUser.name, email: newUser.email};
//     }
// };
function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState('Login');
    const [windowWidth, setWindowWidth] = useState(0);
    const [navOpen, setNavOpen] = useState(false);
    const router = useRouter();
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
            <Head/>
            <Banner />
            <UserContext.Provider value={{user, setUser}}>
                <NavBar mobile={windowWidth<=550} open={navOpen} handleNavOpen={handleNavOpen}/>
                {/* <ActivateEmail router={router} /> */}
                <Component {...pageProps} />
            </UserContext.Provider>
            <Footer />
            <AppCss />
        </>
    )
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
