// packages
import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from 'axios';
import uuid from 'uuid';
import parseNum from 'parse-num';
import Router from 'next/router';
// contexts
import { StringFormContext } from '../src/contexts/StringFormContext';
import { StringFormInfoContext } from '../src/contexts/StringFormInfoContext';
import { CartContext } from '../src/contexts/CartContext';
// components
import Octave from '../src/components/stringForm/Octave';
import RememberHarpLogin from '../src/components/stringForm/RememberHarpLogin';
import Note from '../src/components/stringForm/Note';
import PageTitle from '../src/components/PageTitle';
// other internal
import StringFormCss from '../src/styles/stringForm/StringForm.css';
import { setlocalCart } from '../src/utils/checkoutHelpers';
import { STRING_FORM_INIT, STRING_FORM_INFO_INIT } from '../src/constants/inits';
import ResultsWindow from '../src/components/ResultsWindow';
import { RESULTSWINDOW_INITIAL_STATE } from '../src/constants/constants';
import { STRING_BRANDS } from '../src/constants/stringBrands';
import { resultsWindowReducer } from '../src/reducers/ResultsWindowReducer';

const StringForm = (props) => {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const { stringFormInfo, setStringFormInfo } = useContext(StringFormInfoContext);
    const { cart, setCart } = useContext(CartContext);
    const [ applyToOctaves, setApplyToOctaves ] = useState([1,1,1,1,1,0,1,1]);
    const [ total, setTotal ] = useState('0.00');
    const [ rememberModal, setRememberModal ] = useState(false);
    const [ changes, setChanges ] = useState(false);
    const [ step, setStep ] = useState('');
    const [ resultInfo, dispatchResultInfo ] = useReducer(resultsWindowReducer, RESULTSWINDOW_INITIAL_STATE);
    
    function updateCart(addArray) {
        const cartCopy = [...cart];
        // find item in items object
        addArray.map(addItem=>{
            let foundString;
            props.strings.map(string=>{if (String(string.id).trim()===String(addItem[0]).trim()){
                foundString=string;}
            });
            // prepare new cart object
            if (foundString) {
                console.log('found', foundString)
                const thisItem = {
                    id: uuid(), 
                    store: foundString.store,
                    title: `From string form ${foundString.title}`,
                    description: foundString.description, 
                    price: parseNum(addItem[2]), 
                    newprice: parseNum(foundString.newprice),
                    notes: foundString.notes,
                    newused: foundString.newused,
                    product_image: foundString.image,
                    product_quantity: addItem[1]    
                }
                cartCopy.push(thisItem);
            }
        });
        // update cart and local cart
        cartCopy.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
        const tempCartJson = JSON.stringify(cartCopy);
        setlocalCart('fah-cart', tempCartJson);
        setCart(cartCopy);
    }
    async function handleSubmit(e) {
        const addArray = [];
        // check for qty and additem to update cart list
        stringForm.map((octave,idx)=>{
            if(idx<8&&octave.E&&octave.E.qty>0&&octave.E.brand) {const addObject = [octave.E.id,octave.E.qty,octave.E.price]; addArray.push(addObject)};
            if(idx<8&&octave.D&&octave.D.qty>0&&octave.D.brand) {const addObject = [octave.D.id,octave.D.qty,octave.D.price]; addArray.push(addObject)};
            if(idx<8&&octave.C&&octave.C.qty>0&&octave.C.brand) {const addObject = [octave.C.id,octave.C.qty,octave.C.price]; addArray.push(addObject)};
            if(idx<8&&octave.B&&octave.B.qty>0&&octave.B.brand) {const addObject = [octave.B.id,octave.B.qty,octave.B.price]; addArray.push(addObject)};
            if(idx<8&&octave.A&&octave.A.qty>0&&octave.A.brand) {const addObject = [octave.A.id,octave.A.qty,octave.A.price]; addArray.push(addObject)};
            if(idx<8&&octave.G&&octave.G.qty>0&&octave.G.brand) {const addObject = [octave.G.id,octave.G.qty,octave.G.price]; addArray.push(addObject)};
            if(idx<8&&octave.F&&octave.F.qty>0&&octave.F.brand) {const addObject = [octave.F.id,octave.F.qty,octave.F.price]; addArray.push(addObject)};
        });
        if (addArray.length===0) {
            dispatchResultInfo({type: 'OK', payload: 'Please enter both quantities and string types for the notes you would like to purchase.'}); 
            return;
        }
        // update cart
        updateCart(addArray);
        
        let stringFormCopy = JSON.stringify(stringForm);
        setStringForm(JSON.parse(JSON.stringify(STRING_FORM_INIT)));
        setChanges(false);
        // Cancel the before unload event
        // window.addEventListener('beforeunload', (event) => {
        //     // empty function to cancel beforeunload
        // });
        
        if (stringFormInfo.harpname&&confirm(`Update remembered harp ${stringFormInfo.harpname} with these string brands?`)) {          
            const harpObject = {
                oldharpname: stringFormInfo.harpname,
                oldemail: stringFormInfo.email,
                harpname: stringFormInfo.harpname,
                email: stringFormInfo.email,
                stringform: stringFormCopy
                // newsletter: localNews
            }
            try {
                const res = await axios.patch('http://localhost:3000/api/v1/userharps/updateuserharp', harpObject);
                // setStringForm(res.data.userharp.stringform);
                dispatchResultInfo({type: 'OK', payload: res&&res.data&&res.data.login?`Remember My Harp update successful for ${harpObject.harpname}.`:`Remember My Harp update successful for ${harpObject.harpname}.`});    
            } catch(e) {
                console.log(e.message);
                dispatchResultInfo({type: 'tryAgain', payload: `Something went wrong on harp update. Please contact tisha@findaharp.com for futher assistance.`});
            }
            // document.querySelector('#spinnerRemember').style.display='none';
        }
        setStringForm(JSON.parse(JSON.stringify(STRING_FORM_INIT)));
        setStringFormInfo(STRING_FORM_INFO_INIT);
        dispatchResultInfo({type: 'OK', payload: `Strings added to cart.`});
    }
    
    function resetResultsWindow() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    async function loginGuest(evt) {   
        resetResultsWindow();
    }
    useEffect(() => {
        // window.addEventListener('beforeunload', function (e) {
        //     if (changes) {
        //         // Cancel the event
        //         e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        //         // Chrome requires returnValue to be set
        //         e.returnValue = '';
        //     }
        //     // Cancel the before unload event
        //     window.onbeforeunload = function () {
        //         // blank function do nothing
        //     }
        // });
        // setChanges&&setChanges(false)
        // document&&document.querySelector('#stringForm').addEventListener('change', () => formChanged = true);
        
    });
    
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    
    return (
        <>
        <div className="stringForm" >
            <ResultsWindow 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResultsWindow={resetResultsWindow} 
            />
            {rememberModal&&
                <RememberHarpLogin setRememberModal={setRememberModal} step={step} setStep={setStep} />  
            }
            <div style={{width: '100%', margin: 'auto'}}>
                <PageTitle maintitle='EZ String Order Form' subtitle="" />
            </div>
            <div style={{marginTop: '-20px'}}>
                <img style={{width: '80%', margin: '0 10%', maxHeight: '5px'}}src="img/golden_tapered_line.png" alt='golden tapered divider line' />
            </div>
            <div className="stringForm-subheader"
            >
                <ul style={{listStyleType: "none", lineHeight: '27.5px'}}> 
                    <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;new strings</li>
                    <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;strings labelled by octave</li>
                    <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;For numbered strings, please use Online Store, Makes/Models</li>
                    <li style={{display: 'flex', width: 'fit-content'}}>
                        <img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />
                        <div style={{marginRight: '15px'}}>&nbsp;&nbsp;Ships from: USA</div>
                            <img style={{maxHeight: '20px', transform: 'translateY(5px)'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                        <div style={{width:'fit-content', whiteSpace: 'nowrap', marginLeft: '15px'}}>To: US and Canada</div>
                    </li>
                    <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;If you prefer, we also welcome your string order by email <a style={{color: '#6A75AA', fontSize: '15px'}} href="mailto: orders@findaharp.com">orders@findaharp.com</a>.</li> 
                </ul>
            </div>
            {/* {changes&& */}
            <div style={{justifyContent: 'center', display: 'flex'}}>
                    <button 
                        className='submit-btn' 
                        style={{
                            fontSize: '16px',
                            width: '200px',
                            color: '#fff',
                            backgroundColor: '#6A75AA',
                            cursor: 'pointer', 
                            margin: 'auto',
                            // marginTop: '50px',
                            textAlign: 'center'
                        }} 
                        onClick={handleSubmit}
                    >Add String Order to Cart</button>
                </div>
                
            <form id='stringForm' onSubmit={handleSubmit} style={{position: 'relative', marginTop: '-10px'}}>
            {/* changes: {changes} */}
            
                
                <div style={{
                        padding: '5px 0',
                        fontSize: '16px',
                        width: '200px',
                        backgroundColor: '#f6f6f6',
                        color: '#000000',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        marginTop: '-10px',
                        position: 'absolute',
                        right: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >Form Subtotal:&nbsp;&nbsp;${total}</div>
                <Octave octave='0' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='1' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='2' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='3' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='4' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='5' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='6' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='7' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>   
                {/* <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}> */}
                <div className='formSubtotal formSubtotal-btm'>
                    Form Subtotal:&nbsp;&nbsp;${total}
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button 
                        className='submit-btn' 
                        style={{
                            fontSize: '16px',
                            width: '200px',
                            color: '#fff',
                            backgroundColor: '#6A75AA',
                            cursor: 'pointer', 
                            margin: 'auto',
                            marginTop: '50px',
                            textAlign: 'center'
                        }} 
                        type='submit'
                    >Add String Order to Cart</button>
                </div>
            </form> 
            <div className='shipsTo-container'>
                <div className='shipsTo'>
                    <div style={{marginRight: '15px'}}>Ships from: USA</div>
                    <img style={{maxHeight: '20px'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                    <div style={{width:'fit-content', whiteSpace: 'nowrap', marginLeft: '15px'}}>To: US and Canada</div>
                </div>   
            </div>     
        </div>
        <StringFormCss />
        </>
    );
}

StringForm.getInitialProps = async (props) => {
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

export default StringForm;


//             {/* harpname: {stringFormInfo.harpname} <br />
//             email: {stringFormInfo.email} <br />
//             oldharpname: {stringFormInfo.oldharpname} <br />
//             oldemail: {stringFormInfo.oldemail} <br /> */}
//             <div style={{
//                 border: '1px solid #868686',
//                 width: 'fit-content',
//                 alignItems: 'center',
//                 padding: '3px 0px 3px 5px',
//                 fontSize: '14px',
//                 fontWeight: '400',
//                 color: '#6A75AA',
//                 margin: 'auto',
//                 zIndex: '1000'
//             }}>optional Remember My Harp(s) Login/Signup &nbsp;&nbsp;
//                 {/* <button id='remember' style={{transform: 'scaleY(1.3)'}} onClick={()=>{
//                     if (document.querySelector('#remember').innerText ==='🞀') {
//                         document.querySelector('#remember').innerText ='🞃';
//                         document.querySelector('#addHarp').style.opacity = '1';
//                         document.querySelector('#addHarp').style.visibility = 'visible';
//                         document.querySelector('#addHarp').style.marginTop = '0px';

//                         // document.querySelector('#addHarp').style.display = 'flex';
//                     } else {
//                         document.querySelector('#remember').innerText ='🞀';
//                         document.querySelector('#addHarp').style.opacity = '0';
//                         document.querySelector('#addHarp').style.visibility = 'none';
//                         // document.querySelector('#addHarp').style.display = 'none';
//                     }
//                 }}> 🞀</button> */}
                
//                 {/* <div style={{opacity: '.8', color: '#6A75AA', fontSize:'14px', fontStyle: 'italic'}}>{stringFormInfo&&stringFormInfo.harpname?`Using ${stringFormInfo.harpname} profile`:'Scroll down to skip'}</div> */}
//             </div>
//             <div id='addHarp'>
//                 <button style={{transform: 'none'}} className='stringForm-btn' onClick={()=>setRememberModal(true)}>{stringFormInfo.harpname?'Switch Harp Profile':'Load Harp Profile'}</button>
//                 <button style={{transform: 'none'}} className='stringForm-btn' onClick={()=>Router.push('/harpprofile')}>Add/Edit Harp Profile</button>
//             </div>
            
//             {/* <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}> */}
               
//             {/* </div> */}

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
            //         onClick={()=>setRememberModal(true)}
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
            //         onClick={()=>setRememberModal(true)}
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
