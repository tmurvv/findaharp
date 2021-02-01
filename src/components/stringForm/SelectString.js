import React, { useContext, useEffect, useState } from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
import parseNum from 'parse-num';
import { StringFormContext } from '../../contexts/StringFormContext';
import { STRING_NUMBER, NOTES_IN_OCTAVE } from '../../constants/constants';
import { STRING_BRANDS } from '../../constants/stringBrands';

function SelectString({strings, note, setTotal, octave, octaveBrand, setOctaveBrand}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ notAvailable, setNotAvailable ] = useState(false);

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
        if (stringType==='charts') {alert('This feature is under construction. Expected March 2021. In the meantime, feel free to email us for advice on string types or brands. harps@findaharp.com'); return;}
        
        const brandObject = STRING_BRANDS.find(brand =>brand.name===stringType);
        if (!brandObject) return alert(`Something went wrong. Feel free to let us know. Copy and paste this error message and email harps@findaharp.com. Error: Brand Object not found, string type: ${stringType}`)
        
        // get string object for price  
        strings.map(string=>{if(string.order===STRING_NUMBER[note]&&string.title.includes(stringType)) {stringObject=string}});
        if (!stringObject) {alert(`This string brand, ${stringType}, not found for string ${note}.`); return}
        // set stringForm id and price for this string only
        
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
        if (stringForm[clickOctave].applytooctave===1){
            let newObject=[...stringForm];
            // NYI create object with all the string ranges, only fill in correct ranges
            if (clickOctave===0) {
                    const Notes = [ "G", "F" ];
                    Notes.map(noteinmap=>{
                        if ((!newObject[clickOctave][noteinmap].brand)
                            &&parseInt(newObject[clickOctave][noteinmap].order)<=parseInt(brandObject.low)
                            &&parseInt(newObject[clickOctave][noteinmap].order)>=parseInt(brandObject.high)) {
                            newObject[clickOctave][noteinmap].brand = stringType;
                            newObject[clickOctave][noteinmap].price = stringObject.price;
                            newObject[clickOctave][noteinmap].id = stringObject.id;
                        } else {
                            setNotAvailable(true);
                        }
                    }); 
            }
            if (clickOctave>0&&clickOctave<7) {
                console.log('brand', brandObject);
                NOTES_IN_OCTAVE.map(noteinmap=>{
                    if ((!newObject[clickOctave][noteinmap].brand)
                        &&parseInt(newObject[clickOctave][noteinmap].order)<=parseInt(brandObject.low)
                        &&parseInt(newObject[clickOctave][noteinmap].order)>=parseInt(brandObject.high)) {
                        
                        newObject[clickOctave][noteinmap].brand = stringType;
                        newObject[clickOctave][noteinmap].price = stringObject.price;
                        newObject[clickOctave][noteinmap].id = stringObject.id;
                    } else {
                        console.log('hereelse')
                        setNotAvailable(true);
                    }
                });
                if (notAvailable) alert(`${stringType} not available in all notes in this octave.`);
            }
            if (clickOctave===7) {
                NOTES_IN_OCTAVE.map(noteinmap=>{
                    if ((!newObject[clickOctave][noteinmap].brand)
                        &&parseInt(newObject[clickOctave][noteinmap].order)<=parseInt(brandObject.low)
                        &&parseInt(newObject[clickOctave][noteinmap].order)>=parseInt(brandObject.high)) {
                        const Notes = [ "E", "D", "C"];
                        Notes.map(noteinmap=>{
                            newObject[clickOctave][noteinmap].brand = stringType;
                            newObject[clickOctave][noteinmap].price = stringObject.price;
                            newObject[clickOctave][noteinmap].id = stringObject.id;
                        });
                    } else {
                        setNotAvailable(true);
                    }
                });
                if (notAvailable) alert(`${stringType} not available in all notes in this octave.`);
            } 
            
            setStringForm(newObject);
            // set total
            let newTotal = 0;
            newObject.map((string,idx)=>{
                NOTES_IN_OCTAVE.map(noteio=>{
                    string[noteio]&&string[noteio].qty>0?newTotal += parseNum(string[noteio].qty)*parseNum(string[noteio].price):'';
                });
            });
            setTotal(newTotal.toFixed(2));
            
        }
        // reset string type menu 
        if (document.querySelector(`#stringTypeText${note}`)) document.querySelector(`#stringTypeText${note}`).innerText=stringType;    
    }
    function handleSelect(e) {
        // clear all brand menus
        if (document.querySelectorAll(`.clear${note}`).length>0) document.querySelectorAll(`.clear${note}`).length>0&&Array.from(document.querySelectorAll(`.clear${note}`)).map(menu=>menu.style.display='none');
        // show selected brand menu
        if (document.querySelector(`#${e.target.value}`)) document.querySelector(`#${e.target.value}`).style.display='block';
        if (document.querySelector(`#stringTypeText${note}`)) document.querySelector(`#stringTypeText${note}`).style.opacity='0';
    }
    return (
        <>
            <div className="menu-wrapper" style={{width: '33%', minWidth: '33%', position: 'relative'}}>
                <div id={`spinner${note}`} style={{position: 'fixed', top: '50%', left: '50%', zIndex: '6000', display: 'none', position: 'absolute', left: '100%'}}>
                    <img src="img/spinner.gif" alt="spinner" />
                </div>
                <div style={{display: 'flex'}}>
                    {/* <h3 style={{color: 'black'}}>here{stringForm[note.substr(0,1)][note.substr(1)].brand} </h3>      */}
                    <select 
                        placeholder={stringForm[note.substr(0,1)][note.substr(1)].brand}
                        id={`typeMenu${note}`} 
                        onChange={(e)=>{handleSelect(e)}} 
                        style={{width: '100%', border:'none', fontSize: '16px', padding: '10px 0'}} 
                        // onMouseOver={(e)=>e.target.style.opacity='1'} 
                        // onMouseOut={(e)=>e.target.style.opacity='.5'}
                    >
                        <option value={`stringMenu${note}`}>{stringForm[note.substr(0,1)][note.substr(1)].brand===''?'String Type': 'Change Type'}</option>
                        <option value={`notSureMenu${note}`}>Not Sure</option>
                        <option value={`gutMenu${note}`} hidden={note.substr(0,1)>5||note==="5F"||note==="5G"}>Gut</option>
                        <option value={`nylonMenu${note}`} hidden={note.substr(0,1)>5||note==="5F"||note==="5G"}>Nylon</option>
                        <option value={`wireMenu${note}`} hidden={Number(note.substr(0,1))<5}>Wires</option>
                        <option value={`syntheticMenu${note}`} hidden={
                            note.substr(0,1)<1 
                            ||note.substr(0,1)>5
                            ||note==="5C"
                            ||note==="5B"
                            ||note==="5A"
                            ||note==="5G"
                            ||note==="5F"
                        }>Synthetic</option>
                    </select>
                    <select className={`clear${note} selectStringBrand`} name='helpMenu' id={`notSureMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none', position: 'absolute', left: '100%', padding: '10px', width: '100%', fontSize: '14px'}}>
                        <option value={`Let us help`}>Let us help...</option>
                        <option value='email'>Send us an email for advice on string types and brands.</option>
                        <option value='charts'>Tell us harp make and model to view string chart.</option>
                    </select>
                    <select className={`clear${note}`} name='gutMenu' id={`gutMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none', position: 'absolute', left: '100%', padding: '10px', width: '100%', fontSize: '14px'}}>
                        <option value={`Select Brand`}>Brand</option>
                        <option value={`Bow Brand Pedal Natural Gut`}>Bow Brand Pedal Natural Gut</option>
                        <option value={`Bow Brand Lever Natural Gut`} hidden={note.substr(0,1)<1}>Bow Brand Lever Natural Gut</option>
                        <option value={`Concedo Gut`}>Concedo Gut</option>
                        <option value={`Burgundy Gut`}>Burgundy Gut</option>
                    </select>
                    <select className={`clear${note}`} id={`nylonMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none', position: 'absolute', left: '100%', padding: '10px', width: '100%', fontSize: '14px'}}>
                        <option value={`Select Brand`}>Brand</option>
                        <option value={`Bow Brand Pedal Nylon`}>Bow Brand Pedal Nylon</option>
                        <option value={`Bow Brand Lever Nylon`} hidden={note.substr(0,1)<1}>Bow Brand Lever Nylon</option>
                        <option value={`Artist Nylon`}>Artist Nylon</option>
                        {/* <option value={`Nylon Monofilament`}>Nylon Monofilament</option> */}
                    </select>
                    <select className={`clear${note}`} id={`wireMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none', position: 'absolute', left: '100%', padding: '10px', width: '100%', fontSize: '14px'}}>
                        <option value={`Select Brand`}>Brand</option>
                        <option value={`Silver-Plated Pedal Bass Wire`} hidden={note.substr(0,1)==5&&note!=="5G"&&note!=="5F"}>Silver-Plated Pedal Bass Wire</option>
                        <option value={`Pedal Bass Wire (Tarnish-Resistant)`} hidden={note.substr(0,1)==5&&note!=="5G"&&note!=="5F"}>Pedal Bass Wire (Tarnish-Resistant)</option>
                        <option value={`Bow Brand Lever Bass Wire`} hidden={note==="6G"||note==="6F"||note.substr(0,1)==7}>Bow Brand Lever Bass Wire</option>
                        <option value={`Professional Lever Bass Wire`} hidden={note==="6G"||note==="6F"||note.substr(0,1)==7}>Professional Lever Bass Wire</option>
                    </select>
                    <select className={`clear${note}`} id={`syntheticMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none', position: 'absolute', left: '100%', padding: '10px', width: '100%', fontSize: '14px'}}>
                        <option value={`Select Brand`}>Brand</option>
                        <option value={`Silkgut`} hidden={
                            note.substr(0,1)<1
                            ||note.substr(0,1)>5
                            ||note==="5C"
                            ||note==="5B"
                            ||note==="5A"
                            ||note==="5G"
                            ||note==="5F"
                            }>Silkgut by Bow Brand</option>
                        <option value={`KF Composite Synthetic`} hidden={
                            note.substr(0,1)<1
                            ||note.substr(0,1)>5
                            ||note==="1B"
                            ||note==="1C"
                            ||note==="1D"
                            ||note==="1E"
                            ||note==="5G"
                            ||note==="5F"
                            }>Saverez KF Composite (synthetic)</option>
                    </select>
                </div>
            </div>
            <SelectStringCss />
        </>
    )
}

export default SelectString;
