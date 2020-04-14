// import App from 'next/app'

// css
import 'react-phone-input-2/lib/style.css'

// internal
import AppCss from '../src/styles/app.css.js';
import Banner from '../src/components/Banner';
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';

function MyApp({ Component, pageProps }) {
    return(
        <>
            <Banner />
            <NavBar />
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
