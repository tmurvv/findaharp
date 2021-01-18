import React, { useContext, useEffect, useState } from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
import parseNum from 'parse-num';
import { StringFormContext } from '../../contexts/StringFormContext';
import { STRING_NUMBER, NOTES_IN_OCTAVE } from '../../constants/constants';

function SelectString({strings, note, setTotal, octave, octaveBrand, setOctaveBrand}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ stringBrand, setStringBrand ] = useState();

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
        if (stringType==='email') {location.href = "mailto: tisha@findaharp.com?subject=Harp String Questions"; return;}
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
                // string["E"]&&string["E"].qty>0?newTotal += parseNum(string.E.qty)*parseNum(string.E.price):'';
                // string["D"]&&string["D"].qty>0?newTotal += parseNum(string.D.qty)*parseNum(string.D.price):'';
                // string["C"]&&string["C"].qty>0?newTotal += parseNum(string.C.qty)*parseNum(string.C.price):'';
                // string["B"]&&string["B"].qty>0?newTotal += parseNum(string.B.qty)*parseNum(string.B.price):'';
                // string["A"]&&string["A"].qty>0?newTotal += parseNum(string.A.qty)*parseNum(string.A.price):'';
                // string["G"]&&string["G"].qty>0?newTotal += parseNum(string.G.qty)*parseNum(string.G.price):'';
                // string["F"]&&string["F"].qty>0?newTotal += parseNum(string.F.qty)*parseNum(string.F.price):'';
            }) 
            console.log('outloop', newTotal)
            setTotal(newTotal.toFixed(2));
        // set stringForm id and price for all strings in octave
        } else if (stringForm[clickOctave].applytooctave===1){
            console.log('topstring',stringForm)
            let newObject=[...stringForm];
            console.log('top', newObject);
            if (clickOctave===0) {
                newObject[clickOctave]["G"].brand = stringType;
                newObject[clickOctave]["G"].id = stringObject.id;
                newObject[clickOctave]["G"].price = stringObject.price;
                newObject[clickOctave]["F"].brand = stringType;
                newObject[clickOctave]["F"].id = stringObject.id;
                newObject[clickOctave]["F"].price = stringObject.price;
            }
            if (clickOctave>0&&clickOctave<7) {
                newObject[clickOctave]["E"].brand = stringType;
                newObject[clickOctave]["E"].price = stringObject.price;
                newObject[clickOctave]["E"].id = stringObject.id;
                newObject[clickOctave]["D"].brand = stringType;
                newObject[clickOctave]["D"].price = stringObject.price;
                newObject[clickOctave]["D"].id = stringObject.id;
                newObject[clickOctave]["C"].brand = stringType;
                newObject[clickOctave]["C"].price = stringObject.price;
                newObject[clickOctave]["C"].id = stringObject.id;
                newObject[clickOctave]["B"].brand = stringType;
                newObject[clickOctave]["B"].price = stringObject.price;
                newObject[clickOctave]["B"].id = stringObject.id;
                newObject[clickOctave]["A"].brand = stringType;
                newObject[clickOctave]["A"].price = stringObject.price;
                newObject[clickOctave]["A"].id = stringObject.id;
                newObject[clickOctave]["G"].brand = stringType;
                newObject[clickOctave]["G"].price = stringObject.price;
                newObject[clickOctave]["G"].id = stringObject.id;
                newObject[clickOctave]["F"].brand = stringType;
                newObject[clickOctave]["F"].price = stringObject.price;
                newObject[clickOctave]["F"].id = stringObject.id;
            }
            if (clickOctave===7) {
                newObject[clickOctave]["E"].brand = stringType;
                newObject[clickOctave]["E"].price = stringObject.price;
                newObject[clickOctave]["E"].id = stringObject.id;
                newObject[clickOctave]["D"].brand = stringType;
                newObject[clickOctave]["D"].price = stringObject.price;
                newObject[clickOctave]["D"].id = stringObject.id;
                newObject[clickOctave]["C"].brand = stringType;
                newObject[clickOctave]["C"].price = stringObject.price;
                newObject[clickOctave]["C"].id = stringObject.id;
            }
            setStringForm(newObject);
            // set total
            let newTotal = 0;
            console.log(newObject)
            newObject.map((string,idx)=>{
                string["E"]&&string["E"].qty>0?newTotal += parseNum(string.E.qty)*parseNum(string.E.price):'';
                string["D"]&&string["D"].qty>0?newTotal += parseNum(string.D.qty)*parseNum(string.D.price):'';
                string["C"]&&string["C"].qty>0?newTotal += parseNum(string.C.qty)*parseNum(string.C.price):'';
                string["B"]&&string["B"].qty>0?newTotal += parseNum(string.B.qty)*parseNum(string.B.price):'';
                string["A"]&&string["A"].qty>0?newTotal += parseNum(string.A.qty)*parseNum(string.A.price):'';
                string["G"]&&string["G"].qty>0?newTotal += parseNum(string.G.qty)*parseNum(string.G.price):'';
                string["F"]&&string["F"].qty>0?newTotal += parseNum(string.F.qty)*parseNum(string.F.price):'';
            }) 
            console.log('outloop', newTotal)
            setTotal(newTotal.toFixed(2));
        }
        
        document.querySelector(`#stringTypeText${note}`).innerText=stringType;
        setStringBrand(stringType);
    }
    function handleSelect(e) {
        // clear all brand menus
        Array.from(document.querySelectorAll(`.clear${note}`)).map(menu=>menu.style.display='none');
        // show selected brand menu
        document.querySelector(`#${e.target.value}`).style.display='block';
        document.querySelector(`#stringTypeText${note}`).style.opacity='0';
    }
    return (
        <>
            <div className="menu-wrapper">
                <div style={{display: 'flex'}}>            
                    <select 
                        id={`typeMenu${note}`} 
                        onChange={(e)=>{handleSelect(e)}} 
                        style={{width: 'fit-content', opacity: '.5'}} 
                        onMouseOver={(e)=>e.target.style.opacity='1'} 
                        onMouseOut={(e)=>e.target.style.opacity='.5'}
                    >
                        <option value={`stringMenu${note}`}>Change Type</option>
                        <option value={`notSureMenu${note}`}>Not Sure</option>
                        <option value={`gutMenu${note}`}>Gut</option>
                        <option value={`nylonMenu${note}`}>Nylon</option>
                        <option value={`wireMenu${note}`}>Wires</option>
                        <option value={`syntheticMenu${note}`}>Synthetic</option>
                    </select>
                    <select className={`clear${note}`} name='helpMenu' id={`notSureMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option value={`Let us help`}>Let us help</option>
                        <option value='email'>Send us an email for advice on string types and brands</option>
                        <option value='charts'>View string charts by harp make and model</option>
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
