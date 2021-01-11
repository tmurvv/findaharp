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
    // useEffect(()=>setStringBrand(defaultStringBrand))
    return (
        <>
            <div className="menu-wrapper menu-gold">
                    <ul className="menu">
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
                </div>



            {/* <div className="dropdown">           
                <button type="button" className="dropbtn">String Type<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                <div className="dropdown-content">
                    <div className="dropdown">
                        <button type="button" className="dropbtn">Gut<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                        <div className="dropdown-content">
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Bow Brand Pedal Natural Gut'>Bow Brand Pedal Natural Gut</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Bow Brand Lever Natural Gut'>Bow Brand Lever Natural Gut</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Concedo Gut'>Concedo Gut</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Burgundy Gut'>Burgundy Gut</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='SilkGut'>Silkgut</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Saverez KF Composite (synthetic)'>Saverez KF Composite (synthetic)</button>
                        </div>
                    </div>
                    <div className="dropdown"> 
                        <button type="button" className="dropbtn">Nylon<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                        <div className="dropdown-content">
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Bow Brand Pedal Nylon'>Bow Brand Pedal Nylon</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Bow Brand Lever Nylon'>Bow Brand Lever Nylon</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Artist Nylon'>Artist Nylon</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Nylon Monofilament'>Nylon Monofilament</button>
                        </div>
                    </div>
                    <div className="dropdown"> 
                        <button type="button" className="dropbtn">Wires<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                        <div className="dropdown-content">
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Silver-Plated Pedal Bass Wire'>Silver-Plated Pedal Bass Wire</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Pedal Bass Wire (Tarnish-Resistant)'>Pedal Bass Wire (Tarnish-Resistant)</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Bow Brand Lever Bass Wire'>Bow Brand Lever Bass Wire</button>
                            <button type="button" onClick={(e)=>setStringBrand(e.target.name)} name='Professional Lever Bass Wire'>Professional Lever Bass Wire</button>
                        </div>
                    </div>
                    <div className="dropdown"> 
                        <button type="button" className="dropbtn">Not Sure<span style={{fontSize: '12px', color: '#6b6756'}}>&nbsp;&nbsp;&#9654;</span></button>
                        <div className="dropdown-content">
                            <button type="button" onClick={()=>alert('Under Construction. Expected March 2021')}>String suggestions by harp make and model</button>
                            <button type="button" href="mailto: tisha@findaharp.com">Send us an email for advice on string types and brands</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <SelectStringCss />
        </>
    )
}

export default SelectString;
