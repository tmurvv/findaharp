// packages
import React, {useState, useEffect} from 'react';
import parse from 'url-parse';
import axios from 'axios';
import btoa from 'btoa';

// internal
import LoginSignupCSS from '../src/styles/LoginSignup.css';

function ActivateEmail(props) {
    const [verifying, setVerifying] = useState(false);
    const [found, setFound] = useState(props.emailFound);
    
    // useEffect(() => {
    //     async function verifyEmail() {
    //         const emailRoute = props.router;
    //         if (emailRoute) {
    //             const idx = (emailRoute.asPath).indexOf('?');
    //             const myEmail = JSON.parse(JSON.stringify(emailRoute.asPath.substr(idx+7)));
    //             console.log(myEmail);
    //             // const myEmail = "tmurvv@gmail.com";
    //             const res = await axios.post('https://findaharp-api-testing.herokuapp.com/api/v1/emailverify', {"email": myEmail});
    //             if(res.status===200) return true
    //             return false;
    //         }
    //         if (verifyEmail()) {
    //             setVerifying(false);
    //             setFound(true);
    //         } else {
    //             setVerifying(false);
    //             setFound(false);
    //         }
    //     };
        

    // }, []);
    
   return (
       <>
         <div className='login-signup-container' style={{padding: '40px'}}>
            
             {verifying ? 
                    <div className="login-signup l-attop" style={{ transform: 'translate(0,0)'}} id="login" onClick={()=>handleLoginClick()}>
                        <div className="login-signup-title">
                            VERIFYING EMAIL and Logging In
                        </div>
                        <div style={{display:'flex',justifyContent:"center"}}>
                            <img src='./img/spinner.gif' alt="loading spinner" />
                        </div>
                    </div>
                :
                    <div className="login-signup" style={{ transform: 'translate(0,0)'}} id="login">
                        <div className="login-signup-title">
                            {found?<p>Email Verified, Login Successful</p>:<p>Email not found, please try signing up again.</p>}
                        </div>
                        <div className="login-signup-content">
                            <div style={{padding: '20px 20px 40px', height: '250px', display:'flex', flexDirection: 'column', alignItems:"center"}}>
                                <img height='35px' src='./img/logo_findaharp_black.png' alt='text logo' />
                                {found?
                                    <img height='100%' src='./img/golden_harp_full.png' alt='golden harp' />
                                    :<img height='100%' src='./img/not_found.png' alt='golden harp' />}
                            </div>
                            <div>
                                {found?
                                    <a href='http://localhost:3006'><button className='submit-btn'>Go to Harp Listings</button></a>
                                    :<a href='http://localhost:3006/LoginSignup'><button className='submit-btn'>Go to Login/Signup</button></a>
                                }
                            </div>
                        </div>
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
        const res = await axios.post('http://localhost:3000/api/v1/emailverify', { email: activateEmail});
        if (res) return {emailFound: true};
    } catch (error) {
        console.log('error', error);
        return {emailFound: false};
    }        
    return {emailFound: false};
}

export default ActivateEmail;
