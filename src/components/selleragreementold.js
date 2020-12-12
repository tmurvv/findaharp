import { useState, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Router } from 'next/router';

import { UserContext } from '../contexts/UserContext';
import { resultInfoReducer } from '../reducers/reducers';
import Results from './Results';
import { RESULTS_INITIAL_STATE, TERMS_CONDITIONS } from '../constants/constants';


function SellerAgreement(props) {
    const [ openTerms, setOpenTerms ] = useState(false);
    const { user } = useContext(UserContext);
    const [ error, setError ] = useState(false);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    
    function resetResults() {
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});   
    }
    async function handleClick() {
        const resultText = document.querySelector('#loadingLoginText');
        if (document.querySelector('#agreeTerms').checked&&document.querySelector('#agreeSchedule').checked) {
            //update user
            const updatedUser = { 
                ...user, 
                agreements: ['agreed'],
                // agreements: ['agreed', Date.now(), String(TERMS_CONDITIONS), String("<p style={{borderBottom: '1px solid lightgrey', paddingBottom: '20px'}}><input type='checkbox' id='agreeTerms'/> I, a representative of Harp and Heart, agree to the Findaharp.com <span  style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}onClick={()=>setOpenTerms(true)}>Terms and Conditions</span>.</p><h4 style={{textAlign: 'center'}}>Findaharp.com On-line Fee Schedule <br/>for Harp and Heart, harp sales only <br /> Effective October 22, 2020 </h4><p>As a party listing a harp for sale, using the Services of Findaharp.com, if I sell a harp to a buyer introduced to me during the term of this agreement because of exposure on Findaharp.com, I will forthwith pay to Findaharp.com fees in an amount equivalent to 3% of the Gross sale price of the item, subject to a minimum of $25.00USD. </p><p><input type='checkbox' id='agreeSchedule'/> I, a representative of Harp and Heart, agree to the above Findaharp.com fee schedule.</p>")
                // ], 
                password: `${document.querySelector('#password').value}`
            };
            try {
                setError(false);
                const res = await axios.patch(`https://findaharp-api.herokuapp.com/api/v1/users/updateuser/${user._id}`, {...updatedUser});
                dispatchResultInfo({type: 'OK'});
                const resultText = document.querySelector('#loadingLoginText');
                resultText.innerText='Thank you for agreeing to "Fee Schedule" and "Terms and Conditions".';
            } catch(e) {
                setError(true);
                if (e.message) console.log('error message:',e.message);
                if (e.response&&e.response.data) console.log('response data:', e.response.data);
                if (e.response&&e.response.data&&e.response.data.message) console.log('response data message:', e.response.data.message);
                
                if (e.response&&e.response.data&&e.response.data.message&&e.response.data.message.includes('incorrect')) {
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Password does not match our records.'}`;
                    dispatchResultInfo({type: 'tryAgain'});
                } else {
                    dispatchResultInfo({type: 'tryAgain'});
                    resultText.innerText=`${process.env.next_env==='development'?e.message:'Error signing agreement. Please check your network connection and let Find a Harp know if problem persists.'}`
                }
            }
        } else {
            setError(true);
            dispatchResultInfo({type: 'OK'});
            const resultText = document.querySelector('#loadingLoginText');
            resultText.innerText='Please agree to both "Fee Schedule" and "Terms and Conditions" or choose "cancel" to exit.';
        }
    }
    function loginGuest(evt) {
        resetResults();
        if (!error) props.setOpenAgreement(false);
    }
    
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    },[]);
    
    return (
        <>
        <div style={{boxSizing: 'border-box', width: '100%', padding:'70px'}}>
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
            />
            <div style={{textAlign: 'center'}}>
                <h1>Harp Seller Agreement</h1>
                <h4>Findaharp.com Online Terms and Conditions</h4>
            </div>
            <div dangerouslySetInnerHTML={{__html: TERMS_CONDITIONS}} hidden={!openTerms}></div>
            <div onClick={()=>setOpenTerms(false)} hidden={!openTerms} style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Close Terms and Conditions</div>
            <p style={{borderBottom: '1px solid lightgrey', paddingBottom: '20px'}}><input type='checkbox' id='agreeTerms'/> I, a representative of Harp and Heart, agree to the Findaharp.com <span  style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}onClick={()=>setOpenTerms(true)}>Terms and Conditions</span>.</p>
                <h4 style={{textAlign: 'center'}}>Findaharp.com On-line Fee Schedule <br/>
                    for Harp and Heart, harp sales only <br />
                    Effective October 22, 2020 </h4>
            <p>As a party listing a harp for sale, using the Services of Findaharp.com, if I sell a harp to a buyer introduced to me during the term of this agreement because of exposure on Findaharp.com, I will forthwith pay to Findaharp.com fees in an amount equivalent to 3% of the Gross sale price of the item, subject to a minimum of $25.00USD. </p>
            <p><input type='checkbox' id='agreeSchedule'/> I, a representative of Harp and Heart, agree to the above Findaharp.com fee schedule.</p>
            <div className="input-name input-margin">
                <h3 style={{textAlign: 'center'}}>Please re-enter Password</h3>
            </div>
            <input 
                className="field-input"
                type='password'
                name='editpassword'
                id='password'
                required
                style={{display: 'block', margin: 'auto'}}
            />
            <div style={{width: 'fit-content', margin: 'auto'}}>
                <button type='button' className='btn submit-btn' style={{width: '100px', textAlign: 'center', marginRight: '20px', marginTop: '50px'}} onClick={()=>handleClick()}>Submit</button>
                <button type='button' className='btn submit-btn' style={{width: '100px', textAlign: 'center', marginLeft: '20px', marginTop: '50px'}} onClick={()=>props.setOpenAgreement(false)}>Cancel</button>
            </div>
        </div>
        </>
    )
}

export default SellerAgreement;
