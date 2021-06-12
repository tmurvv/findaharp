// packages
import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from 'axios';
import uuid from 'uuid';
import parseNum from 'parse-num';
import Router from 'next/router';
// contexts
import { StringFormContext } from '../src/store/contexts/StringFormContext';
import { StringFormInfoContext } from '../src/store/contexts/StringFormInfoContext';
import { CartContext } from '../src/store/contexts/CartContext';
import { UserContext } from '../src/main/contexts/UserContext';
// components
import Octave from '../src/store/components/stringForm/Octave';
import RememberHarpLogin from '../src/store/components/stringForm/RememberHarpLogin';
import PageTitle from '../src/main/components/main/PageTitle';
import Spinner from '../src/main/components/main/Spinner';
import HarpLoginSignup from '../src/store/components/stringForm/HarpLoginSignup';
import UserHarpProfile from '../src/store/components/stringForm/UserHarpProfile';
import RememberExplained from '../src/store/components/stringForm/RememberExplained';
// other internal
import StringFormCss from '../src/store/styles/stringForm/StringForm.css';
import { setlocalCart } from '../src/store/utils/checkoutHelpers';
import { zeroQuantities } from '../src/store/utils/storeHelpers';
import { STRING_FORM_INIT, STRING_FORM_INFO_INIT } from '../src/main/constants/inits';
import ResultsWindow from '../src/main/components/main/ResultsWindow';
import { RESULTSWINDOW_INITIAL_STATE } from '../src/main/constants/constants';
import { STRING_BRANDS } from '../src/store/constants/stringBrands';
import { resultsWindowReducer } from '../src/main/reducers/ResultsWindowReducer';

const StringForm = (props) => {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    // const { stringFormInfo, setStringFormInfo } = useContext(StringFormInfoContext);
    const { cart, setCart } = useContext(CartContext);
    const { user, setUser } = useContext(UserContext);
    const [ applyToOctaves, setApplyToOctaves ] = useState([1,1,1,1,1,0,1,1]);
    const [ total, setTotal ] = useState('0.00');
    const [ stringformStatus, setStringformStatus ] = useState('stringform');  //stringform, login, profile, explained
    const [ rememberModal, setRememberModal ] = useState(false);
    const [ changes, setChanges ] = useState(false);
    const [ step, setStep ] = useState('');
    const [ resultInfo, dispatchResultInfo ] = useReducer(resultsWindowReducer, RESULTSWINDOW_INITIAL_STATE);
    
    async function updateBrands(results) {
        // alert('update brands under construction')
        const harpObject = {
            oldharpname: user.currentHarpname,
            oldemail: user.emailCurrentHarp,
            harpname: user.currentHarpname,
            email: user.emailCurrentHarp,
            stringform: JSON.stringify(zeroQuantities(stringForm))
            // newsletter: localNews
        }
        try {
            const res = await axios.patch(`${process.env.backend}/api/v1/userharps/updateuserharp`, harpObject);
            if (results) dispatchResultInfo({type: 'OK', payload: `Update brands for harp ${user.currentHarpname.toUpperCase()} was successful.`});
        } catch(e) {
            console.log(e.message);
            dispatchResultInfo({type: 'tryAgain', payload: `Something went wrong on harp update. Please contact tisha@findaharp.com for futher assistance.`});
        }
    }
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
        //zero quantities on string form
        let zeroQty = JSON.parse(JSON.stringify(stringForm));
        zeroQty = zeroQuantities(zeroQty)
        console.log("zero from update cart.", zeroQty)
        setStringForm(zeroQty);
        setChanges(false);
    }
    async function handleSubmit(e) {
        e.preventDefault();
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
        console.log('update JSON stringfomr', JSON.stringify(stringForm))
        // update cart
        updateCart(addArray);
        if (user.currentHarpname) {
            updateBrands();
        }
        if ((!user.currentHarpname)&&confirm(`Would you like us to remember these brands for next time? If so, choose 'Ok' and then Harp Signup.`)) setStringformStatus('login')              
        const harpObject = {
            oldharpname: user.currentHarpname,
            oldemail: user.emailCurrentHarp,
            harpname: user.currentHarpname,
            email: user.emailCurrentHarp,
            stringform: JSON.stringify(stringForm)
            // newsletter: localNews
        }
        try {
            const res = await axios.patch(`${process.env.backend}/api/v1/userharps/updateuserharp`, harpObject);
            // dispatchResultInfo({type: 'OK', payload: res&&res.data&&res.data.login?`Remember My Harp update successful for ${harpObject.harpname}.`:`Remember My Harp update successful for ${harpObject.harpname}.`});    
        } catch(e) {
            console.log(e.message);
            dispatchResultInfo({type: 'tryAgain', payload: `Something went wrong on harp update. Please contact tisha@findaharp.com for futher assistance.`});
        }
        // document.querySelector('#spinnerRemember').style.display='none';
        dispatchResultInfo({type: 'OK', payload: user.currentHarpname?`Strings added to cart. Harp ${user.currentHarpname.toUpperCase()} brands updated.`:`Strings added to cart.`});
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
        if (document.querySelector('#spinner')) document.querySelector('#spinner').style.display = 'none';
    });
    
    // display cart??
    useEffect(()=>{
        // console.log('stringformeffect', Array.from(stringForm))
        // console.log('stringformeffectUser', user)
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
        return () => {
            console.log('unmount', stringForm)
          }
    },[]);
    // if (stringformStatus) console.log('stats', stringformStatus)
    if (stringformStatus==='login') {
        return (
            <HarpLoginSignup setstringformstatus={setStringformStatus}/>
        );
    } else if (stringformStatus==='profile') {
        return (
            <UserHarpProfile setstringformstatus={setStringformStatus}/>
        );
    } else if (stringformStatus==='explained') {
        return (
            <RememberExplained setstringformstatus={setStringformStatus}/>
        );
    } else {
        return (
            <>
            <div className="stringForm" >
                <Spinner />
                {/* <h1>stringform: {stringForm[0]}</h1> */}
    
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
                        {user.emailCurrentHarp
                            ?<>
                            <li 
                                className="rememberLi" 
                                style={{
                                    display: 'flex', 
                                    justifyContent: 'flex-start', 
                                    paddingLeft: '0'
                                }}
                            >
                                <img 
                                    style={{height: '15px', transform: 'translateY(15%)'}} 
                                    src="img/golden_harp_full.png" 
                                    alt="golden harp" 
                                />
                                <div style={{textIndent: '-8px', paddingLeft: '12px'}}>&nbsp;&nbsp;Showing Brands for harp {String(user.currentHarpname).toUpperCase()}.
                                    <button 
                                    type='button'
                                        onClick={()=>setStringformStatus('profile')}
                                        style={{
                                            fontStyle: 'italic', 
                                            color: '#6A75AA',
                                            backgroundColor: '#fff',
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Click here
                                    </button>
                                    to edit or switch harp.
                                </div>
                            </li>
                            <li 
                                className="rememberLi" 
                                style={{
                                    display: 'flex', 
                                    justifyContent: 'flex-start', 
                                    paddingLeft: '0'
                                }}
                            >
                                <img 
                                    style={{height: '15px', transform: 'translateY(15%)'}} 
                                    src="img/golden_harp_full.png" 
                                    alt="golden harp" 
                                />
                                <div style={{textIndent: '-8px', paddingLeft: '12px'}}>
                                    
                                    <button
                                        type='button' 
                                        onClick={()=>updateBrands(true)}
                                        style={{
                                            fontStyle: 'italic', 
                                            color: '#6A75AA',
                                            backgroundColor: '#fff',
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Click here
                                    </button>
                                    to update brands for {String(user.currentHarpname).toUpperCase()}.
                                </div>
                            </li>
                            </>
                            :<li className="rememberLi">
                                <img 
                                    style={{height: '15px', transform: 'translateY(15%)'}} 
                                    src="img/golden_harp_full.png" 
                                    alt="golden harp" 
                                />
                                &nbsp;&nbsp;
                                <button 
                                    onClick={()=>setStringformStatus('login')}
                                    style={{
                                        color: '#6A75AA',
                                        backgroundColor: '#fff',
                                        fontStyle: 'normal', 
                                        fontSize: '14px',
                                        cursor: 'pointer', 
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Remember My Harp Login
                                </button>
                                <button     
                                    onClick={()=>setStringformStatus('explained')} 
                                    style={{
                                        color: '#6A75AA',
                                        backgroundColor: '#fff',
                                        fontStyle: 'italic', 
                                        fontSize: '14px',
                                        cursor: 'pointer', 
                                        textDecoration: 'underline'
                                    }}
                                >What's this?</button>
                            </li>
                        }
                        <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;This form for new strings labelled by octave.</li>
                        <li><img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />&nbsp;&nbsp;For numbered strings, please use "Music, Strings & Things", Makes/Models menu.</li>
                        <li style={{display: 'flex', width: 'fit-content', paddingLeft: '0', textIndent: '0', overflow: 'hidden'}}>
                            <img style={{height: '15px', transform: 'translateY(15%)'}} src="img/golden_harp_full.png" alt="golden harp" />
                            <div  className='shipsTo shipsToLeft' style={{whiteSpace: 'nowrap'}}>&nbsp;&nbsp;Ships from: USA</div>
                                <img className='shipsToImg' style={{transform: 'translate(10px, 5px)', maxHeight: '15px'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                            <div  className='shipsTo' style={{width:'fit-content', whiteSpace: 'nowrap', marginLeft: '15px'}}>&nbsp;To: US and Canada</div>
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
                            width: '175px',
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
    const res = await axios.get(`${process.env.backend}/api/v1/storeitems`);
    // filteredProducts.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 

    return {
        strings: res.data.storeitems.filter(product => product.category==="strings"&&product.newused!=='used')
    };
}

export default StringForm;
