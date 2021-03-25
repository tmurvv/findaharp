// packages
import React from 'react';
import { useRouter } from 'next/router';

// internal
import ResultsCSS from '../styles/Results.css';

function UploadListingResult(props) {
    const Router = useRouter();
    return (
       <>
            <div className='login-signup-container' style={{padding: '40px'}}>   
                <div id="loadingLogin" style={{display: 'block', top: '25%'}}>
                    <p id="loadingLoginText">{Router.query.uploadlisting.indexOf('yes')<0?'Something went wrong uploading listing. Please check your connection.':'Thank you for uploading a harp listing.'}</p>
                    <div className='flex-sb'>
                        <button 
                            id='loadingLoginOk'
                            style={{display: "block"}} 
                            type='button' 
                            className='submit-btn' 
                            onClick={()=>Router.push('/')}
                        >Home Page</button>
                        <button 
                            id='loadingLoginTryAgain'
                            style={{display: "block"}}
                            type='button' 
                            className='submit-btn submit-btn-tryAgain' 
                            onClick={()=>Router.push('/userprofile')}
                        >Upload Another</button>
                    </div>
                </div>
            </div>
            <ResultsCSS />
        </>
    )
}

export default UploadListingResult;
