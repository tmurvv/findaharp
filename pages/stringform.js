// packages
import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import uuid from 'uuid';
import parseNum from 'parse-num';
// internal
import StringFormCss from '../src/styles/stringForm/StringForm.css';
import Octave from '../src/components/stringForm/Octave';
import PageTitle from '../src/components/PageTitle';
import { StringFormContext } from '../src/contexts/StringFormContext';
import { CartContext } from '../src/contexts/CartContext';
import { setlocalCart } from '../src/utils/checkoutHelpers';

const StringForm = (props) => {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const { cart, setCart } = useContext(CartContext);
    const [ applyToOctaves, setApplyToOctaves ] = useState([1,1,1,1,1,1,1,1]);
    function updateCart(addArray) {
        // console.log(addArray[0])
        const cartCopy = [...cart];
        addArray.map(addItem=>{
            let foundString;
            props.strings.map(string=>{if (String(string.id).trim()===String(addItem[0]).trim()){
                console.log('inif',string.id);
                foundString=string;}
            });
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
        
        // console.log('cartItem', thisItem);
        // cartCopy.push(thisItem);
        cartCopy.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
        const tempCartJson = JSON.stringify(cartCopy);
        setlocalCart('fah-cart', tempCartJson);
        setCart(cartCopy);
    
    }
    function handleSubmit(e) {
        const addArray = [];
        e.preventDefault();
        console.log('imin handle submit', e.target.name)
        stringForm.map((octave,idx)=>{
            // if(idx<8&&octave.E&&octave.E.qty>0) {const addObject = {[`${idx}E`]: [octave.E.id,octave.E.qty,octave.E.price]}; addArray.push(addObject)};
            if(idx<8&&octave.E&&octave.E.qty>0) {const addObject = [octave.E.id,octave.E.qty,octave.E.price]; addArray.push(addObject)};
            if(idx<8&&octave.D&&octave.D.qty>0) {const addObject = [octave.D.id,octave.D.qty,octave.D.price]; addArray.push(addObject)};
            if(idx<8&&octave.C&&octave.C.qty>0) {const addObject = [octave.C.id,octave.C.qty,octave.C.price]; addArray.push(addObject)};
            if(idx<8&&octave.B&&octave.B.qty>0) {const addObject = [octave.B.id,octave.B.qty,octave.B.price]; addArray.push(addObject)};
            if(idx<8&&octave.A&&octave.A.qty>0) {const addObject = [octave.A.id,octave.A.qty,octave.A.price]; addArray.push(addObject)};
            if(idx<8&&octave.G&&octave.G.qty>0) {const addObject = [octave.G.id,octave.G.qty,octave.G.price]; addArray.push(addObject)};
            if(idx<8&&octave.F&&octave.F.qty>0) {const addObject = [octave.F.id,octave.F.qty,octave.F.price]; addArray.push(addObject)};
        });
        updateCart(addArray);
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    return (
        <>
        <div className="stringForm" >  
            <PageTitle maintitle='EZ String Order Form' subtitle='We can remember your harp(s) for next time!!' />
            <form onSubmit={handleSubmit}>
                <button name='stringForm' className='submit-btn' style={{fontSize: '16px'}} type='submit'>Submit String Order</button>
                <Octave octave='0' strings={props.strings} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>                 
                <Octave octave='1' strings={props.strings} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>                 
                <Octave octave='2' strings={props.strings} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>                 
                <Octave octave='3' strings={props.strings} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>                 
                <Octave octave='4' strings={props.strings} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>                 
                <Octave octave='5' strings={props.strings} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>                 
                <Octave octave='6' strings={props.strings} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>                 
                <Octave octave='7' strings={props.strings} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>  
                <button className='submit-btn' style={{fontSize: '16px', marginTop: '15px'}} type='submit'>Submit String Order</button>
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
