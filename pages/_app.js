// import App from 'next/app'
import react, {useState, useEffect} from 'react';
// css
import 'react-phone-input-2/lib/style.css'

// internal
import AppCss from '../src/styles/app.css.js';
import Banner from '../src/components/Banner';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';
import Head from '../src/components/Head';

function MyApp({ Component, pageProps }) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [navOpen, setNavOpen] = useState(false);
    useEffect(() => {
        setWindowWidth.innerWidth;
        const handleResize = () => {
          setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize) }
    }, []);

    function handleNavOpen() {
        console.log('imin')
        if (navOpen===undefined) {setNavOpen(true); return;};
        setNavOpen(!navOpen);
    }
    
    return(
        <>  
            <Head/>
            <Banner />
            <NavBar mobile={windowWidth<500} open={navOpen} handleNavOpen={handleNavOpen}/>
            <Component {...pageProps} />
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
