// import App from 'next/app'
// css
import "../src/css/projectStyles.css";
import "../src/css/App.css";
import '../src/css/Loader.css';
import "../src/css/Home.css";
import "../src/css/Footer.css";
import 'react-phone-input-2/lib/style.css'

// internal
import NavBar from '../src/components/NavBar';
import Footer from '../src/components/Footer';

function MyApp({ Component, pageProps }) {
    return(
        <>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
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
