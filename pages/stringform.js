// packages
import React, { useEffect, useState } from "react";
import axios from 'axios';

// internal
import StringFormCss from '../src/styles/stringForm/StringForm.css';
import Octave from '../src/components/stringForm/Octave';
import PageTitle from '../src/components/PageTitle';

const StringForm = (props) => {
    const [ applyToOctaves, setApplyToOctaves ] = useState([1,1,1,1,1,1,1,1])
    function handleSubmit(e) {
        e.preventDefault();
        console.log('imin handle submit', e.target.name)
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    return (
        <>
        <div className="stringForm" >  
            <PageTitle maintitle='EZ String Order Form' subtitle='We can remember your harp(s) for next time!!' />
            <form>
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
        strings: res.data.storeitems.filter(product => product.category==="strings")
    };
}

export default StringForm;
