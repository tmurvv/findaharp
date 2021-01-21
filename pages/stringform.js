// packages
import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import uuid from 'uuid';
import parseNum from 'parse-num';
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

const StringForm = (props) => {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const { cart, setCart } = useContext(CartContext);
    const [ applyToOctaves, setApplyToOctaves ] = useState([1,1,1,1,1,0,1,1]);
    const [ total, setTotal ] = useState('0.00');
    const [ rememberModal, setRememberModal ] = useState(false);

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
                    title: foundString.title,
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
    function handleSubmit(e) {
        e.preventDefault();
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
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    return (
        <>
        <div className="stringForm" >
            {rememberModal&&
                <RememberHarp setRememberModal={setRememberModal}/>  
            }
            <PageTitle maintitle='EZ String Order Form' subtitle='We can remember your harp(s) for next time!!' />
            <div 
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
                        backgroundColor: '#6A75AA'
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
            <form onSubmit={handleSubmit}>
                {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <button 
                        className='submit-btn' 
                        style={{
                            fontSize: '16px', 
                            width: '200px', 
                            backgroundColor: '#e0e0e0'
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
                <Octave octave='0' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} />                 
                <Octave octave='1' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} />                 
                <Octave octave='2' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} />                 
                <Octave octave='3' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} />                 
                <Octave octave='4' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} />                 
                <Octave octave='5' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} />                 
                <Octave octave='6' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} />                 
                <Octave octave='7' strings={props.strings} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} />   
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <button 
                        className='submit-btn' 
                        style={{
                            fontSize: '16px',
                            width: '200px',
                            backgroundColor: '#e0e0e0',
                            marginTop: '20px'
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
    const res = await axios.get(`https://findaharp-api.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-staging.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-testing.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`http://localhost:3000/api/v1/storeitems`); //BREAKIN
    // filteredProducts.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 

    return {
        strings: res.data.storeitems.filter(product => product.category==="strings"&&product.newused!=='used')
    };
}

export default StringForm;
