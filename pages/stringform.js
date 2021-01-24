// packages
import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from 'axios';
import uuid from 'uuid';
import parseNum from 'parse-num';
import Router from 'next/router';
// contexts
import { StringFormContext } from '../src/contexts/StringFormContext';
import { CartContext } from '../src/contexts/CartContext';
// components
import Octave from '../src/components/stringForm/Octave';
import RememberHarp from '../src/components/stringForm/RememberHarp';
import PageTitle from '../src/components/PageTitle';
// other internal
import StringFormCss from '../src/styles/stringForm/StringForm.css';
import { setlocalCart } from '../src/utils/checkoutHelpers';
import { STRING_FORM_INIT } from '../src/constants/inits';
import Results from '../src/components/Results';
import { RESULTS_INITIAL_STATE } from '../src/constants/constants';
import { resultInfoReducer } from '../src/reducers/reducers';

const StringForm = (props) => {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const { cart, setCart } = useContext(CartContext);
    const [ applyToOctaves, setApplyToOctaves ] = useState([1,1,1,1,1,0,1,1]);
    const [ total, setTotal ] = useState('0.00');
    const [ rememberModal, setRememberModal ] = useState(false);
    const [ changes, setChanges ] = useState(false);
    const [ userharp, setUserharp ] = useState({harpname:'', email: ''});
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    
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
        // update cart
        updateCart(addArray);
        setStringForm(JSON.parse(JSON.stringify(STRING_FORM_INIT)));
        let stringFormCopy = JSON.parse(JSON.stringify({...stringForm}));
        Array.from(stringFormCopy).map((octave,idx)=>{
            if(idx<8&&octave.E&&octave.E.qty>0) octave.E.qty=0;
            if(idx<8&&octave.D&&octave.D.qty>0) octave.D.qty=0;
            if(idx<8&&octave.C&&octave.C.qty>0) octave.C.qty=0;
            if(idx<8&&octave.B&&octave.B.qty>0) octave.B.qty=0;
            if(idx<8&&octave.A&&octave.A.qty>0) octave.A.qty=0;
            if(idx<8&&octave.G&&octave.G.qty>0) octave.G.qty=0;
            if(idx<8&&octave.F&&octave.F.qty>0) octave.F.qty=0;
        });
        if (confirm(`Update remembered harp ${userharp.harpname} with these string brands?`)) {
            
            // document.querySelector('#spinnerRemember').style.display='block';
            const harpObject = {
                harpname: userharp.harpname,
                email: userharp.email,
                stringform: stringFormCopy
                // newsletter: localNews
            }
            try {
                const res = await axios.patch('http://localhost:3000/api/v1/userharps/updateuserharp', harpObject);
                // setStringForm(res.data.userharp.stringform);
                resultText.innerText=res&&res.data&&res.data.login?`Remember My Harp update successful for ${harpObject.harpname}.`:`Remember My Harp update successful for ${harpObject.harpname}.`;
                dispatchResultInfo({type: 'OK'});    
            } catch(e) {
                console.log(e.message);
                resultText.innerText=`Something went wrong on harp update. Please contact tisha@findaharp.com for futher assistance.`;
                dispatchResultInfo({type: 'tryAgain'});
            }
            // document.querySelector('#spinnerRemember').style.display='none';
        }
        setStringForm(JSON.parse(JSON.stringify(STRING_FORM_INIT)));
        setUserharp({harpname:'', email: ''});
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
    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    async function loginGuest(evt) {   
        resetResults();
    }
    useEffect(() => {
        window.addEventListener('beforeunload', function (e) {
            // Cancel the event
            e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
            // Chrome requires returnValue to be set
            e.returnValue = '';
            // Cancel the before unload event
            window.onbeforeunload = function () {
                // blank function do nothing
            }
        });
    });
    
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    
    useEffect(()=>{
        if (document.querySelector('#navLinks')) document.querySelector('#navLinks').style.display = 'none';
    },[]);
    return (
        <>
        <div className="stringForm" >
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
            />
            <div style={{display: 'flex', position:'absolute', top: '0', left: '0'}} id='stringFormNav'>
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
            </div>  
            {rememberModal&&
                <RememberHarp setRememberModal={setRememberModal} userharp={userharp} setUserharp={setUserharp}/>  
            }
            <PageTitle maintitle='EZ String Order Form' subtitle='We can remember your harp(s) for next time!!' />
            
            {userharp.harpname
            ?<div 
                style={{
                    margin: '-10px auto 30px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems:'center',
                }}  
            >
                <img 
                    src='./img/store/speedy_harp.png' 
                    alt='speedy harpist pushing harp on dolly' 
                    style={{height: '40px'}}
                /> 
                <div style={{
                        marginRight: '7px',
                        marginLeft: '7px', 
                        padding: '5px 10px', 
                        color: '#FFF', 
                        backgroundColor: '#6A75AA',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <div>Showing brands for</div>
                    <div>harp: {userharp.harpname}</div>
                </div>
                <a 
                    href='./rememberdetails' 
                    style={{
                        flex: 'none', 
                        fontStyle: 'italic', 
                        fontSize: '14px',
                        textDecoration: 'underline'
                    }}
                >Edit harp<br/>profile</a>
            </div>
            :<div 
                style={{
                    margin: '-10px auto 30px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems:'center',
                }}  
            >
                <img 
                    src='./img/store/speedy_harp.png' 
                    alt='speedy harpist pushing harp on dolly' 
                    style={{height: '40px'}}
                /> 
                <button 
                    style={{
                        marginRight: '7px',
                        marginLeft: '7px', 
                        padding: '5px 10px', 
                        color: '#FFF', 
                        backgroundColor: '#6A75AA',
                        cursor: 'pointer'
                    }} 
                    onClick={()=>setRememberModal(true)}
                >Remember My Harp<br/>Login/Signup</button>
                <a 
                    href='./rememberdetails' 
                    style={{
                        flex: 'none', 
                        fontStyle: 'italic', 
                        fontSize: '14px'
                    }}
                >What's this?</a>
            </div>
            }
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
                <Octave octave='0' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='1' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='2' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='3' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='4' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='5' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='6' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>                 
                <Octave octave='7' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>   
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <button 
                        className='submit-btn' 
                        style={{
                            fontSize: '16px',
                            width: '200px',
                            backgroundColor: '#e0e0e0',
                            marginTop: '20px',
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
                >Form Subtotal:&nbsp;&nbsp;${total}</div>
            </form>               
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
