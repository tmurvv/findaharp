// packages
import React, { useEffect } from "react";

// internal
import StringFormCss from '../src/styles/stringForm/StringForm.css';
import Octave from '../src/components/stringForm/Octave';
import PageTitle from '../src/components/PageTitle';

const StringForm = () => {
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    return (
        <>
        <div className="stringForm" >  
            <PageTitle maintitle='EZ String Order Form' subtitle='We can remember your harp(s) for next time!!' />
            <Octave octave='0'/>                 
            <Octave octave='1'/>                 
            <Octave octave='2'/>                 
            <Octave octave='3'/>                 
            <Octave octave='4'/>                 
            <Octave octave='5'/>                 
            <Octave octave='6'/>                 
            <Octave octave='7'/>                 
        </div>
        <StringFormCss />
        </>
    );
}

export default StringForm;
