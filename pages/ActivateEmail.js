// packages
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// internal
import LoginSignupCSS from '../src/styles/LoginSignup.css';
import { UserContext } from '../src/contexts/UserContext';

function ActivateEmail(props) {
    const user = useContext(UserContext);
    const [verifying] = useState(false);
    const [found] = useState(props.emailFound);
    const Router = useRouter();
    console.log(props)
   return (
       <>
         <div className='login-signup-container' style={{padding: '40px'}} hidden={Router.route!=='/ActivateEmail'}>
            
             {verifying ? 
                <div id="loadingLogin" style={{display: 'block', top: '25%'}}>
                    <img id='loadingLoginImg' src='/img/spinner.gif' style={{display: 'block'}} alt='loading spinner' />
                    <p id="loadingLoginText">VERIFYING EMAIL and Logging In</p>
                    <div className='flex-sb'>
                        <button id='loadingLoginOk' type='button' style={{display: 'none'}} className='submit-btn' onClick={()=>Router.push('/')}>OK</button>
                        {/* <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button> */}
                    </div>
                </div>
                :   
                    <div id="loadingLogin" style={{display: 'block'}}>
                        {found?
                        <>
                        <img id='loadingLoginImg' src='/img/spinner.gif' style={{display: 'none'}} alt='loading spinner' />
                        <p id="loadingLoginText">Thank you for verifying your email.</p>
                        <div className='flex-sb'>
                            <button id='loadingLoginOk' type='button' style={{display: 'block'}} className='submit-btn' onClick={()=>Router.push('/LoginSignup')}>OK</button>
                            {/* <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button> */}
                        </div>
                        </>
                        : <>
                            <img id='loadingLoginImg' src='/img/spinner.gif' style={{display: 'none'}} alt='loading spinner' />
                            <p id="loadingLoginText">Unable to verify email. Logging in as guest.</p>
                            <div className='flex-sb'>
                                <button id='loadingLoginOk' type='button' style={{display: 'block'}} className='submit-btn' onClick={()=>Router.push('/')}>OK</button>
                                {/* <button id='loadingLoginTryAgain' type='button' className='submit-btn submit-btn-tryAgain' onClick={resetResults}>Try Again</button> */}
                            </div>
                        </>
                    }
                    </div>
                    // <div className="login-signup" style={{ transform: 'translate(0,0)'}} id="login">
                    //     <div className="login-signup-title">
                    //         {found?<p>Email Verified, Login Successful</p>:<p>Email not found, please try signing up again.</p>}
                    //     </div>
                    //     <div className="login-signup-content">
                    //         <div style={{padding: '20px 20px 40px', height: '250px', display:'flex', flexDirection: 'column', alignItems:"center"}}>
                    //             <img height='35px' src='./img/logo_findaharp_black.png' alt='text logo' />
                    //             {found?
                    //                 <img height='100%' src='./img/golden_harp_full.png' alt='golden harp' />
                    //                 :<img height='100%' src='./img/not_found.png' alt='golden harp' />}
                    //         </div>
                    //         <div>
                    //             {found?
                    //                 <a href='https://findaharp.com'><button className='submit-btn'>Go to Harp Listings</button></a>
                    //                 :<a href='https://findaharp.com/LoginSignup'><button className='submit-btn'>Go to Login/Signup</button></a>
                    //             }
                    //         </div>
                    //     </div>
                    // </div>
                    
                
                }
            <LoginSignupCSS />
        </div>
        </>
    )
}
ActivateEmail.getInitialProps = async (props) => {
    const activateEmail = props.query.email;    
    try {
        const res = await axios.post('https://findaharp-api.herokuapp.com/api/v1/emailverify', { email: activateEmail});
        if (res) return {emailFound: true};
    } catch (error ) {
        console.log('error', error);
        return {emailFound: false};
    }        
    return {emailFound: false};
}

export default ActivateEmail;
