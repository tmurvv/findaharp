// packages
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// internal
import LoginSignupCSS from '../src/styles/LoginSignup.css';
import { UserContext } from '../src/contexts/UserContext';

function ActivateEmail(props) {
    const user = useContext(UserContext);
    const [verifying, setVerifying] = useState(props.emailFound);
    const [found, setFound] = useState(props.emailFound);
    const Router = useRouter();

    function resetResults() {
        document.querySelector('#loadingLogin').style.display='block';
        document.querySelector('#loadingLoginText').innerText='Verifying and Logging In';
        document.querySelector('#loadingLoginOk').style.display='block';
        document.querySelector('#loadingLoginTryAgain').style.display='none';
        document.querySelector('#loadingLoginImg').style.display='none';
    }
    // useEffect(async () => {
    //     console.log('query', Router.query)
        // document.querySelector('#loadingLogin').style.display='block';
        // document.querySelector('#loadingLoginText').innerText='Verifying and Logging In';
        // document.querySelector('#loadingLoginOk').style.display='none';
        // document.querySelector('#loadingLoginImg').style.display='block';
    //     console.log(props)
    //     // const activateEmail = props.query.email;    
    //     try {
    //         const res = await axios.post('https://findaharp-api.herokuapp.com/api/v1/emailverify', { email: Router.query});
    //         if (res) return setFound(true);
    //     } catch (error) {
    //         console.log('error', error);
    //         return setFound(false);
    //     }        
    //     return {emailFound: false};
    // }, []);
   return (
       <>
         <div className='login-signup-container' style={{padding: '40px'}} hidden={Router.route!=='/ActivateEmail'}>
            
             {/* {verifying ?  */}
                <div id="loadingLogin">
                    <img id='loadingLoginImg' src='/img/spinner.gif' alt='loading spinner' />
                    <p id="loadingLoginText"></p>
                    <div className='flex-sb'>
                        <button id='loadingLoginOk' type='button' className='submit-btn' onClick={()=>Router.push('/')}>OK</button>
                        {/* <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button> */}
                    </div>
                </div>
                {/* //     <div className="login-signup l-attop" style={{ transform: 'translate(0,0)'}} id="login" onClick={()=>handleLoginClick()}>
                //         <div className="login-signup-title">
                //             email verified.
                //             <button className='button' type='ok'>OK</button>
                //         </div>
                //         <div style={{display:'flex',justifyContent:"center"}}>
                //             <img src='./img/spinner.gif' alt="loading spinner" />
                //         </div>
                //     </div>
                // :
                //     <div className="login-signup" style={{ transform: 'translate(0,0)'}} id="login">
                //         <div className="login-signup-title">
                //             {found?<p>Email Verified, Login Successful</p>:<p>Email not found, please try signing up again.</p>}
                //         </div>
                //         <div className="login-signup-content">
                //             <div style={{padding: '20px 20px 40px', height: '250px', display:'flex', flexDirection: 'column', alignItems:"center"}}>
                //                 <img height='35px' src='./img/logo_findaharp_black.png' alt='text logo' />
                //                 {found?
                //                     <img height='100%' src='./img/golden_harp_full.png' alt='golden harp' />
                //                     :<img height='100%' src='./img/not_found.png' alt='golden harp' />}
                //             </div>
                //             <div>
                //                 {found?
                //                     <a href='https://findaharp.com'><button className='submit-btn'>Go to Harp Listings</button></a>
                //                     :<a href='https://findaharp.com/LoginSignup'><button className='submit-btn'>Go to Login/Signup</button></a>
                //                 }
                //             </div>
                //         </div>
                //     </div>
                // } */}
            <LoginSignupCSS />
        </div>
        </>
    )
}

ActivateEmail.getInitialProps(async (props)=> {
    console.log(props.query.email);
    return props.query.email;
})

export default ActivateEmail;
