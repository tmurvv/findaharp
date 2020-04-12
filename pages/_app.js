// import App from 'next/app'

// css
// import '../src/css/Loader.css';
import "../src/css/HarpSearch.css";
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
            <style jsx="true">{`
                :root {
                    --dark-text-color: #333333; /* dark text */
                    --secondary-color:#faf8ed; /*secondary */
                    --primary-color: #8c8a7d; /*primary */
                }
                * {
                    margin-block-start: 0;
                    margin-block-end: 0;
                    text-align: center; 
                }         
                .marginL {
                    margin: 50px;
                }
                .marginM {
                    margin: 20px;
                }
                .marginS {
                    margin: 8px;
                }
                .flex {
                    display: flex;
                }
                .flexSB {
                    display: flex;
                    justify-content: space-between;
                }
                .flexSE {
                    display: flex;
                    justify-content: space-evenly;
                }
                .searchTitle {
                    width: 100%;
                    text-align: center;
                    margin-bottom: 25px;
                    margin-top: 40px;
                }
                .harpSearchInner {
                    width: 100%;
                    text-align: center;
                    margin-bottom: 25px;
                    margin-top: 40px;
                }
            `}</style>
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
