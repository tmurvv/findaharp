// packages
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// internal
import LoginSignupCSS from '../styles/LoginSignup.css';
import { UserContext } from '../contexts/UserContext';

function ActivateEmail(props) {
    const user = useContext(UserContext);
    const [verifying] = useState(false);
    const [found] = useState(props.emailFound);
    const Router = useRouter();
    
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
                }
            <LoginSignupCSS />
        </div>
        </>
    )
}
ActivateEmail.getInitialProps = async (props) => {
    const activateEmail = props.query.email; 
    try {
        const res = await axios.post(`{process.env.backend}/api/v1/emailverify`, { email: activateEmail});
        if (res) return {emailFound: true};
    } catch (error ) {
        console.error('error', error);
        return {emailFound: false};
    }        
    return {emailFound: false};
}

export default ActivateEmail;
