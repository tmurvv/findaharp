// packages
import React from 'react';
import { useRouter } from 'next/router';

// internal
import LoginSignupCSS from '../../styles/LoginSignup.css';

function ActivateEmail(props) {
    const Router = useRouter();
    return (
       <>
            <div className='login-signup-container' style={{padding: '40px'}}>   
                <div id="loadingLogin" style={{display: 'block', top: '25%', width: '60%', margin:'auto'}}>
                    <p style={{textAlign: 'center'}} id="loadingLoginText">{Router.query.activateemail&&Router.query.activateemail.indexOf('notfound')>-1?'Email not found. Logging in as guest.':'Thank you for verifying your email.'}</p>
                    <div className='flex-sb'>
                        <button id='loadingLoginOk' style={{display: 'block', padding: '7px'}} type='button' className='submit-btn' onClick={()=>Router.push(Router.query.uploadlisting?'/uploadlisting':'/loginsignup')}>OK</button>
                        {/* <button id='loadingLoginOk' style={{display: 'block', padding: '7px'}} type='button' className='submit-btn' onClick={()=>Router.push('/')}>OK</button> */}
                        <button id='loadingLoginTryAgain' style={{display: 'none', width:'fit-content'}} type='button' className='submit-btn submit-btn-tryAgain'>Try Again</button>
                    </div>
                </div>
            </div>
            <LoginSignupCSS />
        </>
    )
}

export default ActivateEmail;
