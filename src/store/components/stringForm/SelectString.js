import React, { useContext, useEffect, useState } from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
import parseNum from 'parse-num';
import { StringFormContext } from '../../contexts/StringFormContext';
import { STRING_NUMBER, NOTES_IN_OCTAVE } from '../../../main/constants/constants';
import { STRING_BRANDS } from '../../constants/stringBrands';

function SelectString({strings, note, setTotal, octave, octaveBrand, setOctaveBrand}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ notAvailable, setNotAvailable ] = useState(false);
    const [ stringTypes, setStringTypes ] = useState([]);
    const [ leverGutHidden, setLeverGutHidden ] = useState();
    const [ leverNylonHidden, setLeverNylonHidden ] = useState();
    const [ silvWiresHidden, setSilvWiresHidden ] = useState();
    const [ tarnWiresHidden, setTarnWiresHidden ] = useState();
    const [ leverWiresHidden, setLeverWiresHidden ] = useState();
    const [ profLeverWiresHidden, setProfLeverWiresHidden ] = useState();
    const [ savSynHidden, setSavSynHidden ] = useState();
    const [ silkSynHidden, setSilkSynHidden ] = useState();

    function handleClick(menu) {  
        // short circuit
        if (stringType==='brand') return;
        // add before unload
        // window.addEventListener('beforeunload', (event) => {
        //     console.log('changes', changes)
        //     event.returnValue = 'You have unfinished changes!';
        // });
        // clear all brand menus and restore menu text to selected menu
        document.querySelector(`#stringTypeText${note}`).style.display='block';
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
        if (stringType==='charts') {alert('This feature is under construction. Expected June 2021. In the meantime, feel free to email us for advice on string types or brands. harps@findaharp.com'); return;}
        
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
        let stringOctaveObject=[];
        // set stringForm id and price for all strings in octave
        if (stringForm[clickOctave].applytooctave===1){
            let newObject=[...stringForm];
            if (clickOctave===0) {
                strings.map(string=>{
                    if(Math.abs(Math.ceil(parseInt(string.order)/7))===clickOctave&&string.title.toUpperCase().includes(String(brandObject.name).toUpperCase())&&!(String(string.title).toUpperCase().includes('SET'))) {
                        stringOctaveObject.push(string)
                        // get string note name from order
                        const noteName=Number(string.order)===-0.5?"G":"F";
                        newObject[0][noteName].brand = brandObject.name;
                        newObject[0][noteName].id = string.id;
                        newObject[0][noteName].price = string.price;
                    }
                });
            }
            if (clickOctave>0&&clickOctave<7) {
                strings.map(string=>{ 
                    let noteName;
                    if (Number.isInteger((Number(string.order)+6)/7)) noteName='E';
                    if (Number.isInteger((Number(string.order)+5)/7)) noteName='D';
                    if (Number.isInteger((Number(string.order)+4)/7)) noteName='C';
                    if (Number.isInteger((Number(string.order)+3)/7)) noteName='B';
                    if (Number.isInteger((Number(string.order)+2)/7)) noteName='A';
                    if (Number.isInteger((Number(string.order)+1)/7)) noteName='G';
                    if (Number.isInteger((Number(string.order)+0)/7)) noteName='F';
                    
                    if(Math.abs(Math.ceil(parseInt(string.order)/7))===clickOctave&&string.title.toUpperCase().includes(String(brandObject.name).toUpperCase())&&!(String(string.title).toUpperCase().includes('SET'))) {
                        if (parseInt(newObject[clickOctave][noteName].order)<=parseInt(brandObject.low)
                        &&parseInt(newObject[clickOctave][noteName].order)>=parseInt(brandObject.high)) {
                            newObject[clickOctave][noteName].brand = brandObject.name;
                            newObject[clickOctave][noteName].id = string.id;
                            newObject[clickOctave][noteName].price = string.price;
                        }
                    } else {
                        setNotAvailable(true);
                    }
                });
                if (notAvailable) alert(`${stringType} not available in all notes in this octave.`);
                setNotAvailable(false);
            }
            if (clickOctave===7) {
                strings.map(string=>{ 
                    if(Math.abs(Math.ceil(parseInt(string.order)/7))===clickOctave&&string.title.toUpperCase().includes(String(brandObject.name).toUpperCase())&&!(String(string.title).toUpperCase().includes('SET'))) {
                        // get string note name from order
                        let noteName;
                        if (Number.isInteger((Number(string.order)+6)/7)) noteName='E';
                        if (Number.isInteger((Number(string.order)+5)/7)) noteName='D';
                        if (Number.isInteger((Number(string.order)+4)/7)) noteName='C';
                        if (noteName) {
                            newObject[7][noteName].brand = brandObject.name;
                            newObject[7][noteName].id = string.id;
                            newObject[7][noteName].price = string.price;
                        }
                    }
                });

                // NOTES_IN_OCTAVE.map(noteinmap=>{
                //     if ((newObject[clickOctave][noteinmap]&&!newObject[clickOctave][noteinmap].brand)
                //         &&parseInt(newObject[clickOctave][noteinmap].order)<=parseInt(brandObject.low)
                //         &&parseInt(newObject[clickOctave][noteinmap].order)>=parseInt(brandObject.high)) {
                //         const Notes = [ "E", "D", "C"];
                //         Notes.map(noteinmap=>{
                //             newObject[clickOctave][noteinmap].brand = stringType;
                //             newObject[clickOctave][noteinmap].price = stringObject.price;
                //             newObject[clickOctave][noteinmap].id = stringObject.id;
                //         });
                //     } else {
                //         setNotAvailable(true);
                //     }
                // });
                if (notAvailable) alert(`${stringType} not available in all notes in this octave.`);
            } 
            newObject.changes="true";
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
        if (document.querySelector(`#stringTypeText${note}`)) document.querySelector(`#stringTypeText${note}`).style.display='none';
    }
    useEffect(()=> {
        console.log('imin selectstr useeffect');
        // string types
        const optionArr = [];
        const option1 = React.createElement(
            "option",
            {value: `notSureMenu${note}`},
            'Not Sure'
          )
        optionArr.push(option1)
        if (!(note.substr(0,1)>5||note==="5F"||note==="5G")) {
            const option = React.createElement(
                "option",
                {value: `gutMenu${note}`},
                'Gut'
            )
            const optionA = React.createElement(
                "option",
                {value: `nylonMenu${note}`},
                'Nylon'
            )
            optionArr.push(option)
            optionArr.push(optionA)
        }
        if (!(note.substr(0,1)<1 
            ||note.substr(0,1)>5
            ||note==="5C"
            ||note==="5B"
            ||note==="5A"
            ||note==="5G"
            ||note==="5F")
        ) {
            const option = React.createElement(
                "option",
                {value: `syntheticMenu${note}`},
                'Synthetic'
            )
            optionArr.push(option)
        }
        if (!(note.substr(0,1)<5)) {
            const option = React.createElement(
                "option",
                {value: `wireMenu${note}`},
                'Wires'
            )
            optionArr.push(option)
        }
        setStringTypes(optionArr);
        // lever gut
        if (!(note.substr(0,1)<1)) {
            setLeverGutHidden(React.createElement(
                "option",
                {value: `Bow Brand Lever Natural Gut`},
                'Bow Brand Lever Natural Gut'
            ));
        }
        // lever nylon
        if (!(note.substr(0,1)<1)) { 
            setLeverNylonHidden(React.createElement(
                "option",
                {value: `Bow Brand Lever Nylon`},
                'Bow Brand Lever Nylon'
            ));
        }
       // wires
       if (!(note.substr(0,1)==5&&note!=="5G"&&note!=="5F")) { 
            setSilvWiresHidden(React.createElement(
                "option",
                {value: `Silver-Plated Pedal Bass Wire`},
                'Silver-Plated Pedal Bass Wire'
            ));
        }
        
       if (!(note.substr(0,1)==5&&note!=="5G"&&note!=="5F")) { 
            setTarnWiresHidden(React.createElement(
                "option",
                {value: `Pedal Bass Wire (Tarnish-Resistant)`},
                'Pedal Bass Wire (Tarnish-Resistant)'
            ));
        }
       if (!(note==="6G"||note==="6F"||note.substr(0,1)==7)) { 
            setLeverWiresHidden(React.createElement(
                "option",
                {value: `Bow Brand Lever Bass Wire`},
                'Bow Brand Lever Bass Wire'
            ));
        }
       if (!(note==="6G"||note==="6F"||note.substr(0,1)==7)) { 
            setProfLeverWiresHidden(React.createElement(
                "option",
                {value: `Professional Lever Bass Wire`},
                'Professional Lever Bass Wire'
            ));
        }
        // Synthetic
        if (!( note.substr(0,1)<1
            ||note.substr(0,1)>5
            ||note==="1B"
            ||note==="1C"
            ||note==="1D"
            ||note==="1E"
            ||note==="5G"
            ||note==="5F")
        ) { 
            setSavSynHidden(React.createElement(
                "option",
                {value: `KF Composite Synthetic`},
                'KF Composite Synthetic'
            ));
        }
        if (!(note.substr(0,1)<1
            ||note.substr(0,1)>5
            ||note==="5C"
            ||note==="5B"
            ||note==="5A"
            ||note==="5G"
            ||note==="5F")
        ) { 
            setSilkSynHidden(React.createElement(
                "option",
                {value: `Silkgut`},
                'Silkgut'
            ));
        }


        // <option value={`Silkgut`} hidden={
            // note.substr(0,1)<1
            // ||note.substr(0,1)>5
            // ||note==="5C"
            // ||note==="5B"
            // ||note==="5A"
            // ||note==="5G"
            // ||note==="5F"
        //     }>Silkgut by Bow Brand</option>
        // <option value={`KF Composite Synthetic`} hidden={
            // note.substr(0,1)<1
            // ||note.substr(0,1)>5
            // ||note==="1B"
            // ||note==="1C"
            // ||note==="1D"
            // ||note==="1E"
            // ||note==="5G"
            // ||note==="5F"
        //     }>Saverez KF Composite (synthetic)</option>
    }, []);
    return (
        <>
            <div className="menu-wrapper" style={{width: '33%', minWidth: '33%', position: 'relative'}}>
                <div id={`spinner${note}`} style={{position: 'fixed', top: '50%', left: '50%', zIndex: '6000', display: 'none', position: 'absolute', left: '87%'}}>
                    <img src="img/spinner.gif" alt="spinner" />
                </div>
                <div style={{display: 'flex'}}>
                    {/* <h3 style={{color: 'black'}}>here{stringForm[note.substr(0,1)][note.substr(1)].brand} </h3>      */}
                    <select 
                        placeholder={stringForm[note.substr(0,1)][note.substr(1)].brand}
                        id={`typeMenu${note}`} 
                        onChange={(e)=>{handleSelect(e)}} 
                        style={{WebkitAppearance: 'none', MozAppearance:'none', appearance: 'none', width: '86%', border:'none', fontSize: '16px', padding: '10px 10px'}} 
                    >
                        <option value={`stringMenu${note}`}>{stringForm[note.substr(0,1)][note.substr(1)].brand===''?'String Type': 'Change Type'}</option>
                        {stringTypes.map(item=>item)}
                    </select>
                    
                    <span>&#711;</span>
                    <select className={`clear${note} selectStringBrand`} name='helpMenu' id={`notSureMenu${note}`} onChange={(e)=>handleClick(e)} style={{WebkitAppearance: 'none', MozAppearance:'none', appearance: 'none', display: 'none', position: 'absolute', left: '87%', padding: '10px', width: '100%', fontSize: '14px', border: 'none'}}>
                        <option value={`Let us help`}>Let us help...</option>
                        <option value='email'>Send us an email for advice on string types and brands.</option>
                        <option value='charts'>Tell us harp make and model to view string chart.</option>
                    </select>
                    <select className={`clear${note}`} name='gutMenu' id={`gutMenu${note}`} onChange={(e)=>handleClick(e)} style={{WebkitAppearance: 'none', MozAppearance:'none', appearance: 'none', display: 'none', position: 'absolute', left: '87%', padding: '10px', width: '100%', fontSize: '14px', border: 'none'}}>
                        <option value={`Select Brand`}>Brand</option>
                        <option value={`Bow Brand Pedal Natural Gut`}>Bow Brand Pedal Natural Gut</option>
                        {leverGutHidden&&leverGutHidden}
                        <option value={`Concedo Gut`}>Concedo Gut</option>
                        <option value={`Burgundy Gut`}>Burgundy Gut</option>
                    </select>
                    <select className={`clear${note}`} id={`nylonMenu${note}`} onChange={(e)=>handleClick(e)} style={{WebkitAppearance: 'none', MozAppearance:'none', appearance: 'none', display: 'none', position: 'absolute', left: '87%', padding: '10px', width: '100%', fontSize: '14px', border: 'none'}}>
                        <option value={`Select Brand`}>Brand</option>
                        <option value={`Bow Brand Pedal Nylon`}>Bow Brand Pedal Nylon</option>
                        {leverNylonHidden&&leverNylonHidden}
                        <option value={`Artist Nylon`}>Artist Nylon</option>
                    </select>
                    <select className={`clear${note}`} id={`wireMenu${note}`} onChange={(e)=>handleClick(e)} style={{WebkitAppearance: 'none', MozAppearance:'none', appearance: 'none', display: 'none', position: 'absolute', left: '87%', padding: '10px', width: '100%', fontSize: '14px', border: 'none'}}>
                        <option value={`Select Brand`}>Brand</option>
                        {silvWiresHidden&&silvWiresHidden}
                        {tarnWiresHidden&&tarnWiresHidden}
                        {leverWiresHidden&&leverWiresHidden}
                        {profLeverWiresHidden&&profLeverWiresHidden}
                    </select>
                    <select className={`clear${note}`} id={`syntheticMenu${note}`} onChange={(e)=>handleClick(e)} style={{WebkitAppearance: 'none', MozAppearance:'none', appearance: 'none', display: 'none', position: 'absolute', left: '87%', padding: '10px', width: '100%', fontSize: '14px', border: 'none'}}>
                        <option value={`Select Brand`}>Brand</option>
                        {savSynHidden&&savSynHidden}
                        {silkSynHidden&&silkSynHidden}
                    </select>
                </div>
            </div>
            <SelectStringCss />
        </>
    )
}

export default SelectString;
