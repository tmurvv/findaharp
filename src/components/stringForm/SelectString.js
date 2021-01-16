import React, { useContext, useEffect, useState } from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
import parseNum from 'parse-num';
import { StringFormContext } from '../../contexts/StringFormContext';
import { STRING_NUMBER, STRING_BRANDS } from '../../constants/constants';
import { FindInPageSharp } from '@material-ui/icons';

function SelectString({strings, note, octave, octaveBrand, setOctaveBrand}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ stringBrand, setStringBrand ] = useState();

    function handleClick(menu) {
        // clear all brand menus
        Array.from(document.querySelectorAll(`.clear${note}`)).map(menu=>menu.style.display='none');
        // vars for brand selection, octave, note
        const stringType = document.querySelector(`#${menu.target.id}`).value;
        const clickOctave = parseInt(note.substr(0,1));
        const clickNote = note.substr(1);
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
        if (stringForm[clickOctave].octave===0) {
            let newObject = {...stringForm[clickOctave]};
            newObject[clickNote].brand=stringType;
            newObject[clickNote].id=stringObject.id;
            newObject[clickNote].price=stringObject.price;
            setStringForm([...stringForm, stringForm[clickOctave]=newObject]);
        // set stringForm id and price for all strings in octave
        } else if (stringForm[clickOctave].octave===1){
            let newObject;
            if (clickOctave===0) newObject =  [...stringForm,
                stringForm[clickOctave]["G"].brand = stringType,
                stringForm[clickOctave]["G"].id = stringObject.id,
                stringForm[clickOctave]["G"].price = stringObject.price,
                stringForm[clickOctave]["F"].brand = stringType,
                stringForm[clickOctave]["F"].id = stringObject.id,
                stringForm[clickOctave]["F"].price = stringObject.price,
            ];
            if (clickOctave>0&&clickOctave<7) newObject = [...stringForm,
                stringForm[clickOctave]["E"].brand = stringType,
                stringForm[clickOctave]["E"].price = stringObject.price,
                stringForm[clickOctave]["E"].id = stringObject.id,
                stringForm[clickOctave]["D"].brand = stringType,
                stringForm[clickOctave]["D"].price = stringObject.price,
                stringForm[clickOctave]["D"].id = stringObject.id,
                stringForm[clickOctave]["C"].brand = stringType,
                stringForm[clickOctave]["C"].price = stringObject.price,
                stringForm[clickOctave]["C"].id = stringObject.id,
                stringForm[clickOctave]["B"].brand = stringType,
                stringForm[clickOctave]["B"].price = stringObject.price,
                stringForm[clickOctave]["B"].id = stringObject.id,
                stringForm[clickOctave]["A"].brand = stringType,
                stringForm[clickOctave]["A"].price = stringObject.price,
                stringForm[clickOctave]["A"].id = stringObject.id,
                stringForm[clickOctave]["G"].brand = stringType,
                stringForm[clickOctave]["G"].price = stringObject.price,
                stringForm[clickOctave]["G"].id = stringObject.id,
                stringForm[clickOctave]["F"].brand = stringType,
                stringForm[clickOctave]["F"].price = stringObject.price,
                stringForm[clickOctave]["F"].id = stringObject.id
            ];;
            if (clickOctave===7) newObject = [...stringForm,
                stringForm[clickOctave]["E"].brand = stringType,
                stringForm[clickOctave]["E"].price = stringObject.price,
                stringForm[clickOctave]["E"].id = stringObject.id,
                stringForm[clickOctave]["D"].brand = stringType,
                stringForm[clickOctave]["D"].price = stringObject.price,
                stringForm[clickOctave]["D"].id = stringObject.id,
                stringForm[clickOctave]["C"].brand = stringType,
                stringForm[clickOctave]["C"].price = stringObject.price,
                stringForm[clickOctave]["C"].id = stringObject.id
                
            ];
            setStringForm(newObject);
        }
        setStringBrand(stringType);
    }
    function handleSelect(e) {
        // clear all brand menus
        Array.from(document.querySelectorAll(`.clear${note}`)).map(menu=>menu.style.display='none');
        // show selected brand menu
        document.querySelector(`#${e.target.value}`).style.display='block';
    }
    return (
        <>
            <div className="menu-wrapper">
                <div style={{display: 'flex'}}>            
                    <select id={`typeMenu${note}`} onChange={(e)=>{handleSelect(e)}} style={{width: 'fit-content'}}>
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
                        <option value={`Pedal Bass Wire (Tarnish-Resistant)`}>Pedal Bass Wire (Tarnish-Resistant)</option>
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
