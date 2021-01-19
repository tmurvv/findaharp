import React, { useContext, useEffect, useState } from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
import parseNum from 'parse-num';
import { StringFormContext } from '../../contexts/StringFormContext';
import { STRING_NUMBER, NOTES_IN_OCTAVE } from '../../constants/constants';
import { setIn } from 'formik';

function SelectString({strings, note, setTotal, octave, octaveBrand, setOctaveBrand}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);

    function handleClick(menu) {  
        // clear all brand menus and restore menu text to selected menu
        document.querySelector(`#stringTypeText${note}`).style.opacity='1';
        Array.from(document.querySelectorAll(`.clear${note}`)).map(menu=>menu.style.display='none');
        // vars for brand selection, octave, note
        const stringType = document.querySelector(`#${menu.target.id}`).value;
        const clickOctave = parseInt(note.substr(0,1));
        const clickNote = note.substr(1);
        // console.log(stringType)
        let stringObject;
        // reset string type menu to "Change Type"
        document.querySelector(`#typeMenu${note}`).value=`stringMenu${note}`;
        // if selection is from 'not sure' or help menu
        if (stringType==='email') {
            document.querySelector(`#spinner${note}`).style.display='block';
            setTimeout(()=>{document.querySelector(`#spinner${note}`).style.display='none';},1800);
            location.href = "mailto: tisha@findaharp.com?subject=Harp String Questions"; 
            document.querySelector(`#spinner${note}`).style.display='block';
            return;
        }
        if (stringType==='charts') {alert('View string charts under construction. Expected March 2021.'); return;}
        // get string object for price       
        strings.map(string=>{if(string.order===STRING_NUMBER[note]&&string.title.includes(stringType))stringObject=string});
        if (!stringObject) {alert(`This string brand, ${stringType}, not found for string ${note}.`); return}
        // set stringForm id and price for this string only
        if (stringForm[clickOctave].applytooctave===0) {
            let newObject = [...stringForm];
            newObject[clickOctave][clickNote].brand=stringType;
            newObject[clickOctave][clickNote].id=stringObject.id;
            newObject[clickOctave][clickNote].price=stringObject.price;
            setStringForm(newObject);
            // set total
            let newTotal = 0;
            console.log(newObject)
            newObject.map((string)=>{
                NOTES_IN_OCTAVE.map(noteio=>{
                    string[noteio]&&string[noteio].qty>0?newTotal += parseNum(string[noteio].qty)*parseNum(string[noteio].price):'';
                });
            });
            setTotal(newTotal.toFixed(2));
        // set stringForm id and price for all strings in octave
        } else if (stringForm[clickOctave].applytooctave===1){
            let newObject=[...stringForm];
            if (clickOctave===0) {
                const Notes = [ "G", "F" ];
                Notes.map(noteinmap=>{
                    newObject[clickOctave][noteinmap].brand = stringType;
                    newObject[clickOctave][noteinmap].price = stringObject.price;
                    newObject[clickOctave][noteinmap].id = stringObject.id;
                });
            }
            if (clickOctave>0&&clickOctave<7) {
                NOTES_IN_OCTAVE.map(noteinmap=>{
                    newObject[clickOctave][noteinmap].brand = stringType;
                    newObject[clickOctave][noteinmap].price = stringObject.price;
                    newObject[clickOctave][noteinmap].id = stringObject.id;
                });
            }
            if (clickOctave===7) {
                const Notes = [ "E", "D", "C"];
                Notes.map(noteinmap=>{
                    newObject[clickOctave][noteinmap].brand = stringType;
                    newObject[clickOctave][noteinmap].price = stringObject.price;
                    newObject[clickOctave][noteinmap].id = stringObject.id;
                });
            }
            setStringForm(newObject);
            // set total
            let newTotal = 0;
            console.log(newObject)
            newObject.map((string,idx)=>{
                NOTES_IN_OCTAVE.map(noteio=>{
                    string[noteio]&&string[noteio].qty>0?newTotal += parseNum(string[noteio].qty)*parseNum(string[noteio].price):'';
                });
            });
            setTotal(newTotal.toFixed(2));
        }
        // reset string type menu 
        document.querySelector(`#stringTypeText${note}`).innerText=stringType;
    }
    function handleSelect(e) {
        // clear all brand menus
        document.querySelectorAll(`.clear${note}`).length>0&&Array.from(document.querySelectorAll(`.clear${note}`)).map(menu=>menu.style.display='none');
        // show selected brand menu
        document.querySelector(`#${e.target.value}`).style.display='block';
        document.querySelector(`#stringTypeText${note}`).style.opacity='0';
    }
    return (
        <>
            <div className="menu-wrapper">
                <div id={`spinner${note}`} style={{position: 'fixed', top: '50%', left: '50%', zIndex: '6000', display: 'none'}}>
                    <img src="img/spinner.gif" alt="spinner" />
                </div>
                <div style={{display: 'flex'}}>  
                
                          
                    <select 
                        id={`typeMenu${note}`} 
                        onChange={(e)=>{handleSelect(e)}} 
                        style={{width: 'fit-content', border:'none', fontSize: '16px'}} 
                        // onMouseOver={(e)=>e.target.style.opacity='1'} 
                        // onMouseOut={(e)=>e.target.style.opacity='.5'}
                    >
                        <option value={`stringMenu${note}`}>{
                                                    stringForm[note.substr(0,1)][note.substr(1)].brand===''
                                                    ||stringForm[note.substr(0,1)][note.substr(1)].brand.toUpperCase()==='THIS IS "MIDDLE C"'
                                                    ||stringForm[note.substr(0,1)][note.substr(1)].brand.toUpperCase().startsWith('LEVER HARPS-')
                                                    ||stringForm[note.substr(0,1)][note.substr(1)].brand.toUpperCase().startsWith('PEDAL HARPS-')?'Select String Type':'Change'}</option>
                        <option value={`notSureMenu${note}`}>Not Sure</option>
                        <option value={`gutMenu${note}`}>Gut</option>
                        <option value={`nylonMenu${note}`}>Nylon</option>
                        <option value={`wireMenu${note}`}>Wires</option>
                        <option value={`syntheticMenu${note}`}>Synthetic</option>
                    </select>
                    <select className={`clear${note}`} name='helpMenu' id={`notSureMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option value={`Let us help`}>Let us help...</option>
                        <option value='email'>Send us an email for advice on string types and brands.</option>
                        <option value='charts'>Tell us harp make and model to view string chart.</option>
                    </select>
                    <select className={`clear${note}`} name='gutMenu' id={`gutMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option value={`Select Brand`}>Select Brand</option>
                        <option value={`Bow Brand Pedal Natural Gut`}>Bow Brand Pedal Natural Gut</option>
                        <option value={`Bow Brand Lever Natural Gut`}>Bow Brand Lever Natural Gut</option>
                        <option value={`Concedo Gut`}>Concedo Gut</option>
                        <option value={`Burgundy Gut`}>Burgundy Gut</option>
                        <option value={`Silkgut`}>Silkgut</option>
                    </select>
                    <select className={`clear${note}`} id={`nylonMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option value={`Select Brand`}>Select Brand</option>
                        <option value={`Bow Brand Pedal Nylon`}>Bow Brand Pedal Nylon</option>
                        <option value={`Bow Brand Lever Nylon`}>Bow Brand Lever Nylon</option>
                        <option value={`Artist Nylon`}>Artist Nylon</option>
                        <option value={`Nylon Monofilament`}>Nylon Monofilament</option>
                    </select>
                    <select className={`clear${note}`} id={`wireMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option value={`Select Brand`}>Select Brand</option>
                        <option value={`Silver-Plated Pedal Bass Wire`}>Silver-Plated Pedal Bass Wire</option>
                        <option value={`Pedal Bass Wire (Tarnish-Resistant Nickle-Plated)`}>Pedal Bass Wire (Tarnish-Resistant)</option>
                        <option value={`Bow Brand Lever Bass Wire`}>Bow Brand Lever Bass Wire</option>
                        <option value={`Professional Lever Bass Wire`}>Professional Lever Bass Wire</option>
                    </select>
                    <select className={`clear${note}`} id={`syntheticMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option value={`Select Brand`}>Select Brand</option>
                        <option value={`Saverez KF Composite (synthetic)`}>Saverez KF Composite (synthetic)</option>
                    </select>
                </div>
            </div>
            <SelectStringCss />
        </>
    )
}

export default SelectString;
