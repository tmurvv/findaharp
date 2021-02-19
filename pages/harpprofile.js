// packages
import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from 'axios';
import uuid from 'uuid';
import parseNum from 'parse-num';
import Router from 'next/router';
// contexts
// import { HarpProfileContext } from '../src/contexts/HarpProfileContext';
import { CartContext } from '../src/contexts/CartContext';
import { StringFormContext } from '../src/contexts/StringFormContext';
import { StringFormInfoContext } from '../src/contexts/StringFormInfoContext';
// components
import Octave from '../src/components/stringForm/Octave';
import RememberHarpLogin from '../src/components/stringForm/RememberHarpLogin';
import NewsletterSignup from '../src/components/NewsletterSignup';
import Note from '../src/components/stringForm/Note';
import PageTitle from '../src/components/PageTitle';
// other internal
import HarpProfileCss from '../src/styles/stringForm/HarpProfile.css';
import { setlocalCart } from '../src/utils/checkoutHelpers';
import { STRING_FORM_INIT } from '../src/constants/inits';
import ResultsWindow from '../src/components/ResultsWindow';
import { RESULTSWINDOW_INITIAL_STATE } from '../src/constants/constants';
import { resultsWindowReducer } from '../src/reducers/ResultsWindowReducer';

const HarpProfile = (props) => {
    const [ localHarpname, setLocalHarpname] = useState();
    const [ localEmail, setLocalEmail] = useState();
    const [ localNews, setLocalNews] = useState();
    const [ change, setChange ] = useState(false);
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const { stringFormInfo, setStringFormInfo } = useContext(StringFormInfoContext);
    const [ showAddNew, setShowAddNew ] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const [ applyToOctaves, setApplyToOctaves ] = useState([1,1,1,1,1,0,1,1]);
    const [ total, setTotal ] = useState('0.00');
    const [ editModal, setEditModal ] = useState('add');
    const [ step, setStep ] = useState('preselect');
    const [ rememberModal, setRememberModal ] = useState(false);
    const [ changes, setChanges ] = useState(false);
    const [ harpnameEdit, setHarpnameEdit ] = useState(false);
    const [ emailEdit, setEmailEdit ] = useState(false);
    const [resultInfo, dispatchResultInfo] = useReducer(resultsWindowReducer, RESULTSWINDOW_INITIAL_STATE);
    
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
    async function handleSubmit(e) {
        e.preventDefault();
        // UPDATE HARP
        if (step==='add-getInfo') {
            // alert('inadd')
            console.log('here', localHarpname, localEmail)
            document.querySelector('#spinnerRemember').style.display='block';
            const harpObject = {
                oldharpname: localHarpname,
                oldemail: localEmail,
                stringform: JSON.stringify(stringForm)
                // newsletter: localNews
            }
            try {
                const res = await axios.post('http://localhost:3000/api/v1/userharps/createuserharp', harpObject);
                dispatchResultInfo({type: 'OK', payload: `Add a Harp Profile successful for ${harpObject.oldharpname}.`});    
            } catch(e) {
                console.log(e.message);
                dispatchResultInfo({type: 'tryAgain', payload: `Something went wrong on harp update. Please contact tisha@findaharp.com for futher assistance.`});
            }
            document.querySelector('#spinnerRemember').style.display='none';

            setStep('getBrands-add');
            // alert('stringform update NYI');
        }
        if (step==='edit-getInfo') {
            // alert('get harp profile');

            document.querySelector('#harpnameInput')&&setHarpnameEdit(!document.querySelector('#harpnameInput').disabled); 
            document.querySelector('#spinnerRemember').style.display='block';
            const harpObject = {
                email: localEmail,
                harpname: localHarpname,
                // oldemail: oldEmail||localEmail,
                // oldharpname: oldHarpname||localHarpname,
                // stringform: JSON.stringify(stringForm)
            }
            try {
                const res = await axios.post('http://localhost:3000/api/v1/userharps', harpObject);
                setStringFormInfo({
                    harpname: harpObject.harpname, 
                    email: harpObject.email, 
                    oldharpname: harpObject.harpname, 
                    oldemail: harpObject.oldemail
                });
                //set stringForm here
                console.log('data', res.data) 
                const parseStringBrands = await JSON.parse(res.data.userharp.stringform);
                setStringForm(parseStringBrands)
                
            } catch(e) {
                console.log(e.message);
                dispatchResultInfo({type: 'tryAgain', payload: `Something went wrong on harp update. Please contact tisha@findaharp.com for futher assistance.`});
            }
            document.querySelector('#spinnerRemember').style.display='none';
            setStep('getBrands-edit');
            setEmailEdit(false);
            setHarpnameEdit(false);
        }
    }
    // UPDATE HARPNAME / EMAIL
    async function updateInfo(type) {
        // alert(type)
        if (type==='harpname') {
            // alert('update harpname NYI')
            document.querySelector('#harpnameInput').disabled=!document.querySelector('#harpnameInput').disabled; 
            setHarpnameEdit(!document.querySelector('#harpnameInput').disabled);
            
            document.querySelector('#spinnerRemember').style.display='block';
            const harpObject = {
                oldemail: stringFormInfo.oldemail,
                oldharpname: stringFormInfo.oldharpname,
                email: localEmail,
                harpname: localHarpname,
                stringform: JSON.stringify(stringForm)
            }
            try {
                const res = await axios.patch('http://localhost:3000/api/v1/userharps/updateuserharp', harpObject);
                console.log('whtasehre', harpObject)
                setStringFormInfo({
                    harpname: harpObject.harpname, 
                    email: harpObject.email, 
                    oldharpname: harpObject.harpname, 
                    oldemail: harpObject.oldemail
                });
                dispatchResultInfo({type: 'OK', payload: res&&res.data&&res.data.login?`Remember My Harp update successful for ${harpObject.harpname}.`:`Remember My Harp update successful for ${localHarpname}.`});  
            } catch(e) {
                console.log(e.message);
                dispatchResultInfo({type: 'tryAgain', payload: `Something went wrong on harp update. Please contact tisha@findaharp.com for futher assistance.`});
            }
            document.querySelector('#spinnerRemember').style.display='none';
            setEmailEdit(false);
            setHarpnameEdit(false);
        }
        if (type==='email') {
            document.querySelector('#spinnerRemember').style.display='block';
            const harpObject = {
                oldemail: stringFormInfo.oldemail,
                oldharpname: stringFormInfo.oldharpname,
                email: localEmail,
                harpname: localHarpname,
                stringform: JSON.stringify(stringForm)
            }
            try {
                const res = await axios.patch('http://localhost:3000/api/v1/userharps/updateuserharp', harpObject);
                dispatchResultInfo({type: 'OK', payload: res&&res.data&&res.data.login?`Remember My Harp update successful for ${harpObject.harpname}.`:`Remember My Harp update successful for ${harpObject.harpname}.`}); 
                setStringFormInfo({
                    harpname: harpObject.harpname, 
                    email: harpObject.email, 
                    oldharpname: harpObject.harpname, 
                    oldemail: harpObject.oldemail
                });
            } catch(e) {
                console.log(e.message);
                dispatchResultInfo({type: 'tryAgain', payload: `Something went wrong on harp update. Please contact tisha@findaharp.com for futher assistance.`});
                console.log('hereee', resultInfo)
            }
            document.querySelector('#spinnerRemember').style.display='none';
            
            // alert('update email NYI')
            if (document.querySelector('#emailInput')) document.querySelector('#emailInput').disabled=true; 
            if (document.querySelector('#emailInput')) setEmailEdit(false); 
            // if (document.querySelector('#emailInput')) setEmailEdit(!document.querySelector('#emailInput').disabled); 
        }                                
    }
    function handleNavOpen(e) {
        // alert('imin')
        // if (!changes||(changes&&confirm('Changes may not be saved. Continue?'))) {
        //     // Cancel the before unload event
        //     window.onbeforeunload = function () {
        //         // blank function do nothing
        //     }
        //     if (document.querySelector('#harpProfileNav')) document.querySelector('#harpProfileNav').style.display = 'none';
        //     if (document.querySelector('#navLinks')) document.querySelector('#navLinks').style.display = 'flex';
        //     Router.push(e.target.getAttribute('route'));
        // }
    }
    function resetResultsWindow() {
        dispatchResultInfo({type: 'initial'});
    }
    async function loginGuest(evt) {   
        resetResultsWindow();
    }
    // useEffect(() => {
    //     window.addEventListener('beforeunload', function (e) {
    //         // Cancel the event
    //         e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    //         // Chrome requires returnValue to be set
    //         e.returnValue = '';
    //         // Cancel the before unload event
    //         window.onbeforeunload = function () {
    //             // blank function do nothing
    //         }
    //     });
    // });
    function handleClose() {
        if (change&&!confirm('Changes will be lost. Continue?')) return;
        // alert('handle cancel-NYI')
    }
    
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    
    useEffect(()=>{
        setLocalEmail&&setLocalEmail(stringFormInfo.oldemail);
        setLocalHarpname&&setLocalHarpname(stringFormInfo.oldharpname);
        setEmailEdit(false);
        setHarpnameEdit(false);
    },[]);
    return (  
        <>
        <div className="harpProfile" style={{maxWidth: '600px', margin: 'auto'}} >
            <ResultsWindow 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResultsWindow={resetResultsWindow} 
            />
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
            <div style={{position:'absolute', top: '12px', left: '5px'}}>
                <a 
                    onClick={()=>Router.push('/stringform')} 
                    style={{
                        color: '#6A75AA',
                        cursor: 'pointer', 
                        fontSize: '11px', 
                        fontFamily: 'Metropolis Extra Bold', 
                        fontStyle: 'italic', 
                        fontWeight: '600', 
                        textDecoration: 'underline'}}
                >Back to String Order Form</a>
            </div>            
            {rememberModal&&
                <RememberHarpLogin setRememberModal={setRememberModal} step={step} setStep={setStep} />  
            }
            <PageTitle maintitle='Harp Profiles' subtitle='Add/Edit harp profiles on this page.' />
            {/* <div>stringform: {stringFormInfo.harpname}
                old: {stringFormInfo.oldharpname}
                step: {step}</div> */}
            {step==='preselect'&&
            <div style={{
                display: 'flex', 
                justifyContent: 'space-evenly',
                padding: '15px 5px'
            }}>
                <button className='harpProfileButton' onClick={()=>{setStep("add-getInfo");setRememberModal(true);}}>Add Harp Profile</button>
                <button className='harpProfileButton' onClick={()=>{setStep("getBrands-edit"); if (!stringFormInfo.harpname||stringFormInfo.harpname==='') setRememberModal(true);}}>Edit Harp Profile</button>
                {/* here{stringFormInfo.harpname} */}
            </div>
            }
            
            {(step==='preselect'||step==='add-getInfo'||step==='edit-getInfo')&&
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <h4>How does it work?</h4> 
                    <ul style={{padding: '0 30px', marginLeft: '0', width: 'auto'}}>
                        <li>Enter a name and email for your harp</li>
                        <li>We will remember your harp's string brands when you place an order</li>
                        <li>Next time, simply load your profile and enter the quantities for the strings you would like to order</li>
                        <li>Signup as many harps as you like</li>
                        <li>Teachers, you can signup your students' harps</li>
                        <li>Rentors, you can signup your rental harps</li>
                        <li>What a great idea!</li>
                    </ul>
                </div>
            }
            {step&&step.startsWith('getBrands')&&
            <form onSubmit={handleSubmit}>
                {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <button 
                        className='submit-btn' 
                        style={{
                            fontSize: '16px', 
                            width: '200px', 
                            backgroundColor: '#e0e0e0',
                            cursor: 'pointer'
                        }} 
                        type='submit'
                    >Submit String Order</button>
                </div>
                <div style={{
                        width: '200px',
                        padding: '5px 0',
                        backgroundColor: '#f6f6f6',
                        margin: 'auto',
                        color: '#000',
                        textAlign: 'center'
                    }}
                >Form Subtotal:&nbsp;&nbsp;${total}</div> */}
                {/* check it: {step}
                includes: {step.includes('edit')} */}
                {step.includes('edit')&&<div className='harpProfileInput'>
                        <div style={{textAlign: 'center', flex: '4', display: 'flex'}}>
                            <label htmlFor="harpname"><span style={{color: 'tomato'}}>*</span>&nbsp;Harp Name:</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                name='harpname' 
                                value={localHarpname}
                                placeholder={stringFormInfo.oldharpname}
                                onFocus={()=>{setLocalHarpname(stringFormInfo.oldharpname);setLocalEmail(stringFormInfo.email);}}
                                id='harpnameInput'
                                disabled
                            />
                            {/* <button 
                                type='button' 
                                onClick={()=>{document.querySelector('#harpnameInput').disabled=!document.querySelector('#harpnameInput').disabled; setHarpnameEdit(!document.querySelector('#harpnameInput').disabled)}} 
                                style={{backgroundColor: 'transparent',transform: 'translate(0,12px)', opacity: '.6'}}
                            > */}
                                {!harpnameEdit
                                    ?<button 
                                        onClick={()=>{if (document.querySelector('#emailInput').disabled) {document.querySelector('#harpnameInput').disabled=!document.querySelector('#harpnameInput').disabled; setHarpnameEdit(!document.querySelector('#harpnameInput').disabled)}}} 
                                        style={{cursor: 'pointer', opacity: '.6', transform: 'translate(0px, 6px)', marginLeft: '3px', backgroundColor: 'transparent'}}
                                    >
                                        <img src='/img/editItemIcon.png' style={{width: '25px'}} alt='edit pencil'/>
                                    </button>
                                    :<button name='submitHarpname' style={{
                                        padding: '5px 10px', 
                                        color: '#FFF', 
                                        backgroundColor: '#6A75AA',
                                        cursor: 'pointer',
                                        opacity: '1',
                                        marginLeft: '3px'
                                    }} onClick={()=>updateInfo("harpname")}>Submit
                                    </button>
                                }
                            {/* </button> */}
                        </div>

                        <div style={{textAlign: 'center', flex: '6', marginLeft: '20px'}}>
                            <label><span style={{color: 'tomato'}}>*</span>&nbsp;Email:</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                id='emailInput'
                                type='email' 
                                name='email' 
                                value={localEmail}
                                placeholder={stringFormInfo.oldemail}
                                onFocus={()=>{setLocalHarpname(stringFormInfo.oldharpname);setLocalEmail(stringFormInfo.oldemail);}}
                                disabled
                                // defaultValue={props.userharp.email}
                            />
                            {/* <button 
                                type='button' 
                                onClick={()=>{document.querySelector('#emailInput').disabled=!document.querySelector('#emailInput').disabled; setEmailEdit(!document.querySelector('#emailInput').disabled)}} 
                                style={{
                                    opacity: '.6', 
                                    backgroundColor: 'transparent', 
                                    // transform: 'translate(0,6px)'
                                }}
                            > */}
                                {!emailEdit
                                    ?<button 
                                        onClick={()=>{if (document.querySelector('#harpnameInput').disabled) {document.querySelector('#emailInput').disabled=!document.querySelector('#emailInput').disabled; 
                                        setEmailEdit(!document.querySelector('#emailInput').disabled)
                                    }}} 
                                        style={{cursor: 'pointer', opacity: '.6', transform: 'translate(0,6px)', marginLeft: '3px', backgroundColor: 'transparent'}}
                                    >
                                            <img src='/img/editItemIcon.png' style={{width: '25px'}} alt='edit pencil'/>
                                    </button>
                                    :<button name='submitEmail' style={{
                                        padding: '5px 10px', 
                                        color: '#FFF', 
                                        backgroundColor: '#6A75AA',
                                        cursor: 'pointer',
                                        marginLeft: '3px'
                                    }} onClick={()=>updateInfo('email')}>Submit
                                    </button>
                                }
                            {/* </button> */}
                        </div>
                    </div>}
                <p>{step==='getBrands-add'?`Welcome ${localHarpname}! You may enter string brands below or place an order and Find a Harp will remember your string brands.`:`Edit String Brands below or place an order and Find a Harp will remember any changed brands.`} <a href='/stringform' style={{textDecoration: 'underline', color: '#6A75AA'}}> Back to order form</a></p>
                <h3 style={{textAlign: 'center'}}>{step==='getBrands-add'?'Add':'Edit'} Brands for {stringFormInfo.oldharpname}</h3>
                <Octave octave='0' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges} addedit={editModal}/>                 
                <Octave octave='1' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges} addedit={editModal}/>                 
                <Octave octave='2' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges} addedit={editModal}/>                 
                <Octave octave='3' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges} addedit={editModal}/>                 
                <Octave octave='4' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges} addedit={editModal}/>                 
                <Octave octave='5' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges} addedit={editModal}/>                 
                <Octave octave='6' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges} addedit={editModal}/>                 
                <Octave octave='7' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges} addedit={editModal}/>   
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <button 
                        className='submit-btn' 
                        style={{
                            fontSize: '16px',
                            width: '200px',
                            color: '#fff',
                            backgroundColor: '#6A75AA',
                            marginTop: '20px',
                            cursor: 'pointer'
                        }} 
                        onClick={()=>updateInfo('email')}
                    >Save Harp Profile</button>
                </div>   
            </form> 
            }              
        </div>
        <HarpProfileCss />
        </>
    );
}

HarpProfile.getInitialProps = async (props) => {
    /******************
     * LOCAL DATA
     ******************/
    //LOCAL DATA Populate variables
    // const products = testData;
    // const makesModels = testMakesModels;
    // return {filteredProducts: FINDAHARP_PRODUCTS}
    /*******************
     * API DATA
     *******************/
    // API
    const res = await axios.get(`https://findaharp-api.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-staging.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-testing.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`http://localhost:3000/api/v1/storeitems`); //BREAKINk
    // filteredProducts.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 

    return {
        strings: res.data.storeitems.filter(product => product.category==="strings"&&product.newused!=='used')
    };
}

export default HarpProfile;

// {(step==='add-getInfo'||step==='edit-getInfo')&&
//             <div className='harpProfileInfo' style={{
//                 marginTop: '25px', display: 'flex', marginBottom: '50px'}}>
//                 <div className={`harpProfileText`}>  
//                     {/* <div style={{
//                         textAlign: 'center', 
//                         fontSize: '22px', 
//                         marginBottom: '10px', 
//                         fontWeight: 'bold'}}>Save valuable time!! </div> */}
//                     <div style={{
//                         textAlign: 'center',  
//                         fontSize: '16px', 
//                         fontWeight: 'bold',}}
//                     >{step==='add-getInfo'?'Add Harp Profile':'Edit which profile?'}</div>
//                     <div className='harpProfileInput'>
//                         <div style={{textAlign: 'center', flex: '4', marginRight: '10px'}}>
//                             <label htmlFor="harpname"><span style={{color: 'tomato'}}>*</span>&nbsp;Harp Name:</label>
//                             <input 
//                                 onChange={(e)=>handleChange(e)} 
//                                 name='harpname' 
//                                 value={localHarpname}
//                                 // defaultValue={props.userharp.harpname}
//                             />
//                         </div>
//                         <div style={{textAlign: 'center', flex: '6', marginLeft: '20px'}}>
//                             <label><span style={{color: 'tomato'}}>*</span>&nbsp;Email:</label>
//                             <input 
//                                 onChange={(e)=>handleChange(e)} 
//                                 type='email' 
//                                 name='email' 
//                                 value={localEmail}
//                                 // defaultValue={props.userharp.email}
//                             />
//                         </div>
//                     </div>
//                     {step==='add-getInfo'&&<NewsletterSignup handleChange={handleChange}/>}
//                     <div style={{
//                         margin: '25px auto -20px', 
//                         width: '100%', 
//                         textAlign: 'center'}}
//                     >
//                         <button 
//                             style={{
//                                 padding: '10px 20px', 
//                                 color: '#FFF', 
//                                 backgroundColor: '#6A75AA',
//                                 cursor: 'pointer',
//                                 fontSize: '18px',
//                                 outline: 'none',
//                                 border: 'none',
//                                 width: '45%', 
//                                 margin: '1%'
//                             }}
//                             type="button"
//                             onClick={(e)=>handleSubmit(e)}
//                         >
//                             {step==='add-getInfo'?'Add Harp Profile':'Edit Harp Profile'}
//                         </button>
//                         <button 
//                             className='submit-btn'
//                             type="button"
//                             style={{
//                                 padding: '10px 20px', 
//                                 color: '#FFF', 
//                                 backgroundColor: '#6A75AA',
//                                 cursor: 'pointer',
//                                 fontSize: '18px',
//                                 outline: 'none',
//                                 border: 'none',
//                                 width: '45%', 
//                                 margin: '1%'
//                             }}
//                             onClick={(e) => handleClose(e)}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div> 
//             </div>
//             }

// // for (var idx = 0; idx<8; idx++) {
            // //     if(idx<8&&harpProfileCopy[idx].E&&harpProfileCopy[idx].E.qty>0) harpProfileCopy[idx].E.qty=0;
            // //     if(idx<8&&harpProfileCopy[idx].D&&harpProfileCopy[idx].D.qty>0) harpProfileCopy[idx].D.qty=0;
            // //     if(idx<8&&harpProfileCopy[idx].C&&harpProfileCopy[idx].C.qty>0) harpProfileCopy[idx].C.qty=0;
            // //     if(idx<8&&harpProfileCopy[idx].B&&harpProfileCopy[idx].B.qty>0) harpProfileCopy[idx].B.qty=0;
            // //     if(idx<8&&harpProfileCopy[idx].A&&harpProfileCopy[idx].A.qty>0) harpProfileCopy[idx].A.qty=0;
            // //     if(idx<8&&harpProfileCopy[idx].G&&harpProfileCopy[idx].G.qty>0) harpProfileCopy[idx].G.qty=0;
            // //     if(idx<8&&harpProfileCopy[idx].F&&harpProfileCopy[idx].F.qty>0) harpProfileCopy[idx].F.qty=0;
            // // }
            // // check for qty and additem to update cart list
            // harpProfileCopy.map((octave,idx)=>{
            //     if(idx<8&&octave.E&&octave.E.qty>0) {const addObject = [octave.E.id,octave.E.qty,octave.E.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.D&&octave.D.qty>0) {const addObject = [octave.D.id,octave.D.qty,octave.D.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.C&&octave.C.qty>0) {const addObject = [octave.C.id,octave.C.qty,octave.C.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.B&&octave.B.qty>0) {const addObject = [octave.B.id,octave.B.qty,octave.B.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.A&&octave.A.qty>0) {const addObject = [octave.A.id,octave.A.qty,octave.A.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.G&&octave.G.qty>0) {const addObject = [octave.G.id,octave.G.qty,octave.G.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.F&&octave.F.qty>0) {const addObject = [octave.F.id,octave.F.qty,octave.F.price]; addArray.push(addObject)};
            // });
            // 
            // {/* {userharp.harpname
            // ?<div 
            //     style={{
            //         margin: '-10px auto 30px', 
            //         display: 'flex', 
            //         justifyContent: 'center', 
            //         alignItems:'center',
            //     }}  
            // >
            //     <img 
            //         src='./img/store/speedy_harp.png' 
            //         alt='speedy harpist pushing harp on dolly' 
            //         style={{height: '40px'}}
            //     /> 
            //     <button 
            //         style={{
            //             marginRight: '7px',
            //             marginLeft: '7px', 
            //             padding: '5px 10px', 
            //             color: '#FFF', 
            //             backgroundColor: '#6A75AA',
            //             cursor: 'pointer'
            //         }} 
            //         onClick={()=>setEditModal(true)}
            //     >
            //         <div>Showing brands for</div>
            //         <div>harp: {userharp.harpname}</div>
            //     </button>
            //     <a 
            //         href='./rememberdetails' 
            //         style={{
            //             flex: 'none', 
            //             fontStyle: 'italic', 
            //             fontSize: '14px',
            //             textDecoration: 'underline'
            //         }}
            //     >Add/Edit harp<br/>profiles</a>
            // </div>
            // :<div 
            //     style={{
            //         margin: '-10px auto 30px', 
            //         display: 'flex', 
            //         justifyContent: 'center', 
            //         alignItems:'center',
            //     }}  
            // >
            //     <img 
            //         src='./img/store/speedy_harp.png' 
            //         alt='speedy harpist pushing harp on dolly' 
            //         style={{height: '40px'}}
            //     /> 
            //     <button 
            //         style={{
            //             marginRight: '7px',
            //             marginLeft: '7px', 
            //             padding: '5px 10px', 
            //             color: '#FFF', 
            //             backgroundColor: '#6A75AA',
            //             cursor: 'pointer'
            //         }} 
            //         onClick={()=>setEditModal(true)}
            //     >Remember My Harp<br/>Login/Signup</button>
            //     <a 
            //         href='./rememberdetails' 
            //         style={{
            //             flex: 'none', 
            //             fontStyle: 'italic', 
            //             fontSize: '14px'
            //         }}
            //     >What's this?</a>
            // </div>
            // } */}