import React, { useContext, useEffect, useState } from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
import parseNum from 'parse-num';
import { StringFormContext } from '../../contexts/StringFormContext';
import { STRING_NUMBER } from '../../constants/constants';

function SelectString({strings, note, octave, octaveBrand, setOctaveBrand}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ stringBrand, setStringBrand ] = useState();

    function handleClick(e) {

        const clickOctave = parseInt(note.substr(0,1));
        const clickNote = note.substr(1);
        // create new object
        // const newObject = [...stringForm];
        // get string id (temporarily title)
        // console.log(stringForm[0]["G"])
        // console.log(octave)
        if (stringForm[clickOctave].octave===0) {
            alert('iminif')
            console.log(clickOctave, clickNote, e.target.name)
            const newObject = [...stringForm, stringForm[clickOctave][clickNote].id = e.target.name];
            console.log(newObject);
            setStringForm(newObject);
            document.querySelector(`stringType${note}`).innerText='e.target.name';
        } else if (stringForm[clickOctave].octave===1){
            alert('iminelseif')
            let newObject;
            if (clickOctave===0) newObject =  [...stringForm,
                stringForm[clickOctave]["G"].id = e.target.name,
                stringForm[clickOctave]["F"].id = e.target.name
            ];
            if (clickOctave>0&&clickOctave<7) newObject = [...stringForm,
                stringForm[clickOctave]["E"].id = e.target.name,
                stringForm[clickOctave]["D"].id = e.target.name,
                stringForm[clickOctave]["C"].id = e.target.name,
                stringForm[clickOctave]["B"].id = e.target.name,
                stringForm[clickOctave]["A"].id = e.target.name,
                stringForm[clickOctave]["G"].id = e.target.name,
                stringForm[clickOctave]["F"].id = e.target.name
            ];;
            if (clickOctave===7) newObject = [...stringForm,
                stringForm[clickOctave]["E"].id = e.target.name,
                stringForm[clickOctave]["D"].id = e.target.name,
                stringForm[clickOctave]["C"].id = e.target.name,
            ];
            // console.log(newObject[0])
            // console.log(stringForm[0]["G"].id)
            // console.log(stringForm[clickOctave]["G"].id)
            // console.log(stringForm[2]["G"].id)
            // console.log(newObject[clickOctave]["G"].id)
            setStringForm(newObject);
            // setOctaveBrand(e.target.name);
        }
        
        setStringBrand(e.target.name);
        // console.log(newObject)
        // find price in strings object
        console.log(stringForm[clickOctave].octave)

        const stringObject = strings.map(string=>
            {
                // console.log(string.order, "|", STRING_NUMBER[note], "|", string.title)
                if (string.order===STRING_NUMBER[note]&&string.title.includes(e.target.name)&&stringForm[clickOctave].octave===1) {console.log(string.title); console.log(parseNum(string.price).toFixed(2)); setOctaveBrand([string.title, parseNum(string.price).toFixed(2)])}
            });
        
        // setOctaveBrand(stringObject.title, parseNum(stringObject.price).toFixed(2))
        // console.log(stringObject);

        // console.log(newObject);
           
        // update form
        // setStringBrand(e.target.name);
    }
    function handleSelect(e) {
        console.log(e.target.value)
        document.querySelector(`#${e.target.value}`).style.display='block';
    }
    // useEffect(()=>setStringBrand(defaultStringBrand))
    return (
        <>
            <div className="menu-wrapper menu-gold">
                <div style={{display: 'flex'}}>            
                    <select onChange={(e)=>{handleSelect(e)}} style={{width: 'fit-content'}}>
                        <option value={`stringType${note}`}>String Type</option>
                        <option value={`notSureMenu${note}`}>Not Sure</option>
                        <option value={`gutMenu${note}`}>Gut</option>
                        <option value={`nylonMenu${note}`}>Nylon</option>
                        <option value={`wireMenu${note}`}>Wires</option>
                        <option value={`syntheticMenu${note}`}>Synthetic</option>
                    </select>
                    <select id={`notSureMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option>Not</option>
                        <option>Sure</option>
                    </select>
                    <select id={`gutMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option>Select Brand</option>
                        <option>Bow Brand Pedal Natural Gut</option>
                        <option>Bow Brand Lever Natural Gut</option>
                        <option>Concedo Gut</option>
                        <option>Burgundy Gut</option>
                        <option>Silkgut</option>
                        <option>Saverez KF Composite (synthetic)</option>
                    </select>
                    <select id={`nylonMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option>Select Brand</option>
                        <option>Bow Brand Pedal Nylon</option>
                        <option>Bow Brand Lever Nylon</option>
                        <option>Artist Nylon</option>
                        <option>Nylon Monofilament</option>
                    </select>
                    <select id={`wireMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option>Select Brand</option>
                        <option>Silver-Plated Pedal Bass Wire</option>
                        <option>Pedal Bass Wire (Tarnish-Resistant)</option>
                        <option>Bow Brand Lever Bass Wire</option>
                        <option>Professional Lever Bass Wire</option>
                    </select>
                    <select id={`syntheticMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option>Select Brand</option>
                        <option>Saverez KF Composite (synthetic)</option>
                    </select>
                </div>



                    {/* <ul className="menu">
                        <li>
                            <button type="button" style={note&&{width: '285%'}}>{stringBrand?stringBrand:octaveBrand&&octaveBrand[0]?octaveBrand[0]:'String Type'}{!note&&`  >>`}</button>
                            <ul>
                                {!note&&<li>
                                    <button type="button" style={note&&{width: '285%'}} href=""><i className="fab fa-connectdevelop"></i> Not Sure</button>
                                    <ul className='menuLevel2' style={note&&{width: '285%', left: '-325%'}}>
                                        <li><button type="button" href="mailto: tisha@findaharp.com" style={{width: '275px'}}>Send us an email for advice on string types and brands</button></li>
                                        <li><button type="button" onClick={()=>alert('Under Construction. Expected March 2021')} style={{width: '275px'}}>View string charts by harp make and model</button></li>
                                    </ul>
                                </li>}
                                <li>
                                    <button type="button" style={note&&{width: '285%'}} href=""><i className="fab fa-connectdevelop"></i> Gut</button>
                                    <ul className='menuLevel2' style={note&&{width: '400px', left: '-325%'}}>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Bow Brand Pedal Natural Gut' style={{width: '275px'}}>Bow Brand Pedal Natural Gut</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Bow Brand Lever Natural Gut' style={{width: '275px'}}>Bow Brand Lever Natural Gut</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Concedo Gut' style={{width: '275px'}}>Concedo Gut</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Burgundy Gut' style={{width: '275px'}}>Burgundy Gut</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='SilkGut' style={{width: '275px'}}>Silkgut</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Saverez KF Composite (synthetic)' style={{width: '275px'}}>Saverez KF Composite (synthetic)</button></li>
                                    </ul>
                                </li>
                                <li>
                                    <button type="button" style={note&&{width: '285%'}} href=""><i className="fab fa-connectdevelop"></i> Nylon</button>
                                    <ul className='menuLevel2' style={note&&{left: '-250%'}}>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Bow Brand Pedal Nylon' style={{width: '275px'}}>Bow Brand Pedal Nylon</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Bow Brand Lever Nylon' style={{width: '275px'}}>Bow Brand Lever Nylon</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Artist Nylon' style={{width: '275px'}}>Artist Nylon</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Nylon Monofilament' style={{width: '275px'}}>Nylon Monofilament</button></li>
                                    </ul>
                                </li>
                                <li>
                                    <button type="button" style={note&&{width: '285%'}} href=""><i className="fab fa-connectdevelop"></i> Wires</button>
                                    <ul className='menuLevel2' style={note&&{width: '285%', left: '-325%'}}>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Silver-Plated Pedal Bass Wire' style={{width: '275px'}}>Silver-Plated Pedal Bass Wire</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Tarnish' style={{width: '275px'}}>Pedal Bass Wire (Tarnish-Resistant)</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Bow Brand Lever Bass Wire' style={{width: '275px'}}>Bow Brand Lever Bass Wire</button></li>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Professional Lever Bass Wire' style={{width: '275px'}}>Professional Lever Bass Wire</button></li>
                                    </ul>
                                </li>
                                <li>
                                    <button type="button" style={note&&{width: '285%'}}><i className="fab fa-connectdevelop"></i> Synthetic</button>
                                    <ul className='menuLevel2' style={note&&{width: '285%', left: '-325%'}}>
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Saverez KF Composite (synthetic)' style={{width: '275px'}}>Saverez KF Composite (synthetic)</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div> */}
            </div>
            <SelectStringCss />
        </>
    )
}

export default SelectString;
