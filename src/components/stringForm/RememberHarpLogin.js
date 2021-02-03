// packages
import React, { useState, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Router from 'next/router';
import uuid from 'uuid';
import parseNum from 'parse-num';
// contexts
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { StringFormContext } from '../../contexts/StringFormContext';
import { StringFormInfoContext } from '../../contexts/StringFormInfoContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
// other internal
import NewsletterSignup from '../NewsletterSignup';
import RememberHarpModalCSS from '../../styles/stringForm/RememberHarpModal.css';
import { STORE_PARTNERS } from '../../constants/storeDirectory';
import { incQty } from '../../utils/storeHelpers';
import { setlocalCart } from '../../utils/checkoutHelpers';
import ResultsWindow from '../../components/ResultsWindow';
import { RESULTSWINDOW_INITIAL_STATE } from '../../constants/constants';
import { resultsWindowReducer } from '../../reducers/ResultsWindowReducer';
import { AirlineSeatLegroomReducedSharp, SettingsEthernetSharp } from '@material-ui/icons';

function RememberHarpLogin(props) {
    const [ localHarpname, setLocalHarpname] = useState();
    const [ localEmail, setLocalEmail] = useState();
    const [ localNews, setLocalNews] = useState();
    const [ change, setChange ] = useState(false);
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const { stringFormInfo, setStringFormInfo } = useContext(StringFormInfoContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultsWindowReducer, RESULTSWINDOW_INITIAL_STATE);
    const [ showAddNew, setShowAddNew ] = useState(props.step&&props.step.startsWith('add'));
    function handleClose() {
        if (change&&!confirm('Changes will be lost. Continue?')) return;
        props.setRememberModal(false);
    }
    async function handleSubmit() {
        // const resultText = document.querySelector('#loadingLoginText');
        let submitHarpname = localHarpname || stringFormInfo.harpname;
        let submitEmail = localEmail || stringFormInfo.email;
        if (!submitHarpname) {
            // resultText.innerText=`Harp name is required.`;
            dispatchResultInfo({type: 'tryAgain', payload: `Harp name is required.`});
            return;
        }
        if (!submitEmail) {
            // resultText.innerText=`Email is required.`;
            dispatchResultInfo({type: 'tryAgain', payload: `Email is required.`});
            return;
        }
        document.querySelector('#spinnerRemember').style.display='block';
        const harpObject = {
            oldharpname: submitHarpname,
            oldemail: submitEmail,
            stringform: JSON.stringify(stringForm)
            // newsletter: localNews
        }
        try {
            let res;
            if (props.step.includes('add')) {res = await axios.post('http://localhost:3000/api/v1/userharps/createuserharp', harpObject);
                setChange(false);
                props.setStep&&props.setStep('getBrands-edit');
                const parseStringForm = await JSON.parse(res.data.userharp.stringform)
                setStringForm(parseStringForm);
                setStringFormInfo({
                    harpname: harpObject.oldharpname, 
                    email: harpObject.oldemail, 
                    oldharpname: harpObject.oldharpname, 
                    oldemail: harpObject.oldemail
                });
                props.setStep('')
                alert('Harp profile added.');
                return Router.push('/stringform');
            } else {
                res = await axios.post('http://localhost:3000/api/v1/userharps/loginuserharp', harpObject);
                setChange(false);
                props.setStep&&props.setStep('getBrands-edit');
                const parseStringForm = await JSON.parse(res.data.userharp.stringform)
                setStringForm(parseStringForm);
            }
            setStringFormInfo({
                harpname: harpObject.oldharpname, 
                email: harpObject.oldemail, 
                oldharpname: harpObject.oldharpname, 
                oldemail: harpObject.oldemail
            });
            dispatchResultInfo({type: 'OK', payload: props.step.includes('add')?`Remember My Harp signup successful for ${harpObject.oldharpname}.`:`Remember My Harp login successful for ${harpObject.oldharpname}.`});    
        } catch(e) {
            setChange(false);
            if (e.response) {
                dispatchResultInfo({type: 'tryAgain', payload: e.response.data.message.includes('combination')?`This email and harp name combination already in use.`:`Something went wrong on harp ${props.step&&props.step.startsWith('add')?'signup':'login'}. If problem persists, please contact tisha@findaharp.com.`});
            } else {
                dispatchResultInfo({type: 'tryAgain', payload: `${e.message}Something went wrong on harp ${props.step&&props.step.includes('add')?'signup':'login'}. If problem persists, please contact tisha@findaharp.com.`});
            }
        }
        document.querySelector('#spinnerRemember').style.display='none';
    }    
    const handleChange = (e) => {
        setChange(true);
        // handle newsletter change
        if (e===true||e===false) {
            setLocalNews(e);
            return;
        }
        // handle other change
        if (e.target.name==='harpname') setLocalHarpname(e.target.value);
        if (e.target.name==='email') setLocalEmail(e.target.value);
    }
    function resetResultsWindow() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    async function loginGuest(evt) {   
        resetResultsWindow();
        handleClose();
    }
    useEffect(()=>{
        if (setShowAddNew&&stringFormInfo.harpname) setShowAddNew(true);
    });
    return (
        <>
        <ResultsWindow 
            resultInfo={resultInfo} 
            loginGuest={loginGuest}
            resetResultsWindow={resetResultsWindow} 
        />
        <div className='rememberdetailContainer' style={{display: 'block'}}>
            <div 
                id={`spinnerRemember`} 
                style={{
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    zIndex: '6000',
                    display: 'none', 
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <img src="img/spinner.gif" alt="spinner" />
            </div>
            <div onClick={() => {props.setStep&&props.setStep('preselect');handleClose();}} className='rememberclearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div> 
            <div style={{fontSize: '24px', marginBottom: '25px'}}>Remember My Harp(s)</div>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden divider line" />
            <div className='rememberdetailInfo' style={{marginTop: '25px'}}>
                <div className={`rememberdetailImg`}><img src= './img/store/speedy_harp.png' alt='speedy harpist pushing harp on dolly' /></div>
                <div className={`rememberdetailText`}> 
                    <div style={{textAlign: 'center', fontSize: '22px', marginBottom: '10px', fontWeight: 'bold'}}>Save valuable time!! </div>
                    <div style={{
                        textAlign: 'center',  
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        marginBottom: '25px'}}
                    >{props.step.includes('add')?'Add harp name and email':'Login to Load Harp Profile'}</div>
                    <div className='rememberInput' style={{marginTop: '0'}}>
                        <div style={{textAlign: 'right', flex: '4'}}>
                            <label htmlFor="harpname"><span style={{color: 'red'}}>*</span>&nbsp;Harp Name:</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                name='harpname' 
                                value={localHarpname}
                                defaultValue={props.step.includes('add')?'':stringFormInfo.harpname}
                            />
                        </div>
                        <div style={{textAlign: 'right', flex: '6'}}>
                            <label><span style={{color: 'red'}}>*</span>&nbsp;Email:</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                type='email' 
                                name='email' 
                                value={localEmail}
                                defaultValue={props.step.includes('add')?'':stringFormInfo.email}
                            />
                        </div>
                    </div>
                    <NewsletterSignup handleChange={handleChange}/>
                    <div style={{
                        margin: '25px auto -20px', 
                        width: '100%', 
                        textAlign: 'center'}}
                    >
                        <button 
                            className='submit-btn'
                            type="button"
                            style={{width: '45%', margin: '1%', cursor: 'pointer'}}
                            onClick={()=>handleSubmit()}
                        >
                            {props.step.includes('add')?'Add Harp Profile':'Login Harp Profile'}
                        </button>
                        <button 
                            className='submit-btn'
                            type="button"
                            style={{width: '45%', margin: '1%', cursor: 'pointer'}}
                            onClick={() => {props.setStep&&props.setStep('preselect');handleClose();}}
                        >
                            Cancel
                        </button>
                    </div>
                    {/* <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ul> Instructions:
                            <li>Enter a name and email for your harp</li>
                            <li>Signup as many harps as you like</li>
                            <li>We will remember your string brands</li>
                            <li>Teachers, you can enter your students' harps!</li>
                            <li>Rentors, you can enter your rental harps!</li>
                            <li>What a great idea!</li>
                        </ul>
                    </div> */}
                </div> 
            </div>
        </div>
        <RememberHarpModalCSS />
        </>
    )
}

export default RememberHarpLogin;
