// import App from 'next/app'

// css
import "../css/projectStyles.css";
import "../css/App.css";
import '../css/Loader.css';
import "../css/Home.css";
import "../css/Footer.css";

// internal
import NavBar from '../components/NavBar';
import { ProductsProvider } from '../contexts/ProductsContext';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
    return(
        <>
            <NavBar />
            <ProductsProvider>
                <Component {...pageProps} />
            </ProductsProvider>          
            <Footer />
        </>
    )
}

export default MyApp

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