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
                console.log('inif',string.id);
                foundString=string;}
            });
            // prepare new cart object
            if (foundString) {
                console.log('found', foundString)
                const thisItem = {
                    id: uuid(), 
                    store: foundString.store,
                    title: `From string from ${foundString.title}`,
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
        e.preventDefault();
        const resultText = document.querySelector('#loadingLoginText');
        const addArray = [];
        // check for qty and additem to update cart list
        stringForm.map((octave,idx)=>{
            if(idx<8&&octave.E&&octave.E.qty>0) {const addObject = [octave.E.id,octave.E.qty,octave.E.price]; addArray.push(addObject)};
            if(idx<8&&octave.D&&octave.D.qty>0) {const addObject = [octave.D.id,octave.D.qty,octave.D.price]; addArray.push(addObject)};
            if(idx<8&&octave.C&&octave.C.qty>0) {const addObject = [octave.C.id,octave.C.qty,octave.C.price]; addArray.push(addObject)};
            if(idx<8&&octave.B&&octave.B.qty>0) {const addObject = [octave.B.id,octave.B.qty,octave.B.price]; addArray.push(addObject)};
            if(idx<8&&octave.A&&octave.A.qty>0) {const addObject = [octave.A.id,octave.A.qty,octave.A.price]; addArray.push(addObject)};
            if(idx<8&&octave.G&&octave.G.qty>0) {const addObject = [octave.G.id,octave.G.qty,octave.G.price]; addArray.push(addObject)};
            if(idx<8&&octave.F&&octave.F.qty>0) {const addObject = [octave.F.id,octave.F.qty,octave.F.price]; addArray.push(addObject)};
        });
        if (addArray.length===0) {
            dispatchResultInfo({type: 'OK', payload: 'No quantities were found. Please enter the quantity of each string you would like to order.'}); 
            return;
        }
        // update cart
        updateCart(addArray);
        
        let stringFormCopy = JSON.stringify(stringForm);
        setStringForm(JSON.parse(JSON.stringify(STRING_FORM_INIT)));
        
        if (stringFormInfo.harpname&&confirm(`Update remembered harp ${stringFormInfo.harpname} with these string brands?`)) {          
            // // for (var idx = 0; idx<8; idx++) {
            // //     if(idx<8&&stringFormCopy[idx].E&&stringFormCopy[idx].E.qty>0) stringFormCopy[idx].E.qty=0;
            // //     if(idx<8&&stringFormCopy[idx].D&&stringFormCopy[idx].D.qty>0) stringFormCopy[idx].D.qty=0;
            // //     if(idx<8&&stringFormCopy[idx].C&&stringFormCopy[idx].C.qty>0) stringFormCopy[idx].C.qty=0;
            // //     if(idx<8&&stringFormCopy[idx].B&&stringFormCopy[idx].B.qty>0) stringFormCopy[idx].B.qty=0;
            // //     if(idx<8&&stringFormCopy[idx].A&&stringFormCopy[idx].A.qty>0) stringFormCopy[idx].A.qty=0;
            // //     if(idx<8&&stringFormCopy[idx].G&&stringFormCopy[idx].G.qty>0) stringFormCopy[idx].G.qty=0;
            // //     if(idx<8&&stringFormCopy[idx].F&&stringFormCopy[idx].F.qty>0) stringFormCopy[idx].F.qty=0;
            // // }
            // // check for qty and additem to update cart list
            // stringFormCopy.map((octave,idx)=>{
            //     if(idx<8&&octave.E&&octave.E.qty>0) {const addObject = [octave.E.id,octave.E.qty,octave.E.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.D&&octave.D.qty>0) {const addObject = [octave.D.id,octave.D.qty,octave.D.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.C&&octave.C.qty>0) {const addObject = [octave.C.id,octave.C.qty,octave.C.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.B&&octave.B.qty>0) {const addObject = [octave.B.id,octave.B.qty,octave.B.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.A&&octave.A.qty>0) {const addObject = [octave.A.id,octave.A.qty,octave.A.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.G&&octave.G.qty>0) {const addObject = [octave.G.id,octave.G.qty,octave.G.price]; addArray.push(addObject)};
            //     if(idx<8&&octave.F&&octave.F.qty>0) {const addObject = [octave.F.id,octave.F.qty,octave.F.price]; addArray.push(addObject)};
            // });
            // document.querySelector('#spinnerRemember').style.display='block';
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
    function handleNavOpen(e) {
        // alert('imin')
        if (!changes||(changes&&confirm('Changes may not be saved. Continue?'))) {
            // Cancel the before unload event
            window.onbeforeunload = function () {
                // blank function do nothing
            }
            if (document.querySelector('#stringFormNav')) document.querySelector('#stringFormNav').style.display = 'none';
            if (document.querySelector('#navLinks')) document.querySelector('#navLinks').style.display = 'flex';
            Router.push(e.target.getAttribute('route'));
        }
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
        // console.log('useeffect', stringForm)
        // window.addEventListener('beforeunload', function (e) {
        //     // Cancel the event
        //     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        //     // Chrome requires returnValue to be set
        //     e.returnValue = '';
        //     // Cancel the before unload event
        //     window.onbeforeunload = function () {
        //         // blank function do nothing
        //     }
        // });
    });
    
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    // // remove navlinks
    // useEffect(()=>{
    //     if (document.querySelector('#navLinks')) document.querySelector('#navLinks').style.display = 'none';
    // },[]);
    return (
        <>
        <div className="stringForm" >
            <ResultsWindow 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResultsWindow={resetResultsWindow} 
            />
            {/* <div style={{display: 'flex', position:'absolute', top: '0', left: '0'}} id='stringFormNav'>
                <div href='/'>
                    <button 
                        style={{
                            backgroundColor: 
                            'transparent', 
                            outline: 'none', 
                            transform: 'translate(0,-30px)', 
                            marginRight: '5x',
                            cursor: 'pointer'
                        }} 
                        onClick={handleNavOpen} 
                        route='/'
                    >Find a Harp</button>
                </div>
                <div href='/onlinestore' as='/onlinestore'>
                    <button 
                        style={{
                            backgroundColor: 
                            'transparent', 
                            outline: 'none', 
                            transform: 'translate(0,-30px)', 
                            marginLeft: '5x',
                            cursor: 'pointer'
                        }} 
                        onClick={handleNavOpen} 
                        route='/onlinestore'
                    >Online Store</button>
                </div>
            </div>   */}
            {rememberModal&&
                <RememberHarpLogin setRememberModal={setRememberModal} step={step} setStep={setStep} />  
            }
            <div style={{width: '100%', margin: 'auto'}}>
                <PageTitle maintitle='EZ String Order Form' subtitle="" />
            </div>
            <div style={{
                    opacity: '.8', 
                    margin: '-40px auto 25px', 
                    textAlign: 'center', 
                    fontStyle: 'italic', 
                    width: '60%', 
                    fontSize: '16px'
                }}
            >
                This form is for new strings labelled by octave (Lyon Healy/Salvi lever harps, all pedal harps, etc). If your harp uses numbered strings, (Dusty Strings, Triplett, etc), please use the online store menu above.
            </div>
            changes: {stringForm.changes}
            {/* harpname: {stringFormInfo.harpname} <br />
            email: {stringFormInfo.email} <br />
            oldharpname: {stringFormInfo.oldharpname} <br />
            oldemail: {stringFormInfo.oldemail} <br /> */}
            <div style={{
                border: '1px solid #868686',
                width: 'fit-content',
                alignItems: 'center',
                padding: '3px 0px 3px 5px',
                fontSize: '14px',
                fontWeight: '400',
                color: '#6A75AA',
                margin: 'auto',
                zIndex: '1000'
            }}>optional Remember My Harp(s) Login/Signup &nbsp;&nbsp;
                <button id='remember' style={{transform: 'scaleY(1.3)'}} onClick={()=>{
                    if (document.querySelector('#remember').innerText ==='🞀') {
                        document.querySelector('#remember').innerText ='🞃';
                        document.querySelector('#addHarp').style.opacity = '1';
                        document.querySelector('#addHarp').style.visibility = 'visible';
                        document.querySelector('#addHarp').style.marginTop = '0px';

                        // document.querySelector('#addHarp').style.display = 'flex';
                    } else {
                        document.querySelector('#remember').innerText ='🞀';
                        document.querySelector('#addHarp').style.opacity = '0';
                        document.querySelector('#addHarp').style.visibility = 'none';
                        // document.querySelector('#addHarp').style.display = 'none';
                    }
                }}> 🞀</button>
                
                {/* <div style={{opacity: '.8', color: '#6A75AA', fontSize:'14px', fontStyle: 'italic'}}>{stringFormInfo&&stringFormInfo.harpname?`Using ${stringFormInfo.harpname} profile`:'Scroll down to skip'}</div> */}
            </div>
            <div id='addHarp' style={{
                // // border: '7px double #6A75AA', 
                // borderBottom: '1px solid #6A75AA', 
                display: 'flex', 
                justifyContent: 'space-evenly',
                padding: '15px 5px 0',
                width: '60%',
                midWidth: '360px',
                margin: 'auto',
                marginTop: '-50px',
                // display: 'none',
                opacity: '0',
                visibility: 'hidden',
                transition: 'opacity 600ms, visibility 600ms, marginTop 600ms',
                zIndex: '0'
            }}>
                <button style={{transform: 'none'}} className='stringForm-btn' onClick={()=>setRememberModal(true)}>{stringFormInfo.harpname?'Switch Harp Profile':'Load Harp Profile'}</button>
                <button style={{transform: 'none'}} className='stringForm-btn' onClick={()=>Router.push('/harpprofile')}>Add/Edit Harp Profile</button>
            </div>
            
            {/* <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}> */}
               
            {/* </div> */}
            <form onSubmit={handleSubmit} style={{position: 'relative', marginTop: '15px'}}>
            {stringForm.changes?
            <div style={{justifyContent: 'center', display: 'flex'}}>
                    <button 
                        className='submit-btn' 
                        style={{
                            // fontSize: '14px',
                            // width: '200px',
                            // color: '#fff',
                            // backgroundColor: '#6A75AA',
                            // cursor: 'pointer', 
                            // margin: 'auto',
                            // marginBottom: '-50px',
                            // marginTop: '20px',
                            // textAlign: 'center',
                            // display: `${changes?'flex':'none'}`
                            padding: '5px 0',
                            fontSize: '16px',
                            width: '200px',
                            backgroundColor: '#f6f6f6',
                            color: '#000000',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            marginTop: '20px',
                            position: 'absolute',
                            // top: '-28px',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} 
                        type='submit'
                    >Add String Order to Cart</button>
                </div>
                :
                <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '10px 5px 0',
                        fontSize: '22px',
                        fontWeight: '600',
                        margin: 'auto',
                        width: '60%',
                        marginBottom: '-50px'
                        // color: '#6A75AA'
                    }}
                >
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: '300', fontStyle: 'italic', lineHeight: '1.5', fontSize: '12px', margin: '15px auto 0'}}>
                        <div style={{marginRight: '15px'}}>Ships from: USA</div>
                        <img style={{maxHeight: '20px'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                        <div style={{width:'fit-content', whiteSpace: 'nowrap', marginLeft: '15px'}}>To: US and Canada</div>
                    </div>   
                </div> 
                }
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
                <div style={{
                        padding: '5px 0',
                        fontSize: '16px',
                        width: '200px',
                        backgroundColor: '#f6f6f6',
                        color: '#000000',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        marginTop: '20px',
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
                <div style={{
                        padding: '5px 0',
                        fontSize: '16px',
                        width: '200px',
                        backgroundColor: '#f6f6f6',
                        color: '#000000',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        marginTop: '20px',
                        position: 'absolute',
                        bottom: '40px',
                        right: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >Form Subtotal:&nbsp;&nbsp;${total}</div>
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
                            marginTop: '30px',
                            textAlign: 'center'
                        }} 
                        type='submit'
                    >Add String Order to Cart</button>
                </div>
            </form> 
            <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 5px 0',
                    fontSize: '22px',
                    fontWeight: '600',
                    margin: 'auto',
                    marginBottom: '25px',
                    width: '60%'
                    // color: '#6A75AA'
                }}
            >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: '300', fontStyle: 'italic', lineHeight: '1.5', fontSize: '12px', margin: '15px auto 0'}}>
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
    // const res = await axios.get(`https://findaharp-api.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-staging.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-testing.herokuapp.com/api/v1/storeitems`);
    const res = await axios.get(`http://localhost:3000/api/v1/storeitems`); //BREAKING
    // filteredProducts.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 

    return {
        strings: res.data.storeitems.filter(product => product.category==="strings"&&product.newused!=='used')
    };
}

export default StringForm;



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
