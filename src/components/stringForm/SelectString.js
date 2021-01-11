import React, { useContext, useEffect, useState } from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
import { StringFormContext } from '../../contexts/StringFormContext';

function SelectString({strings, getPrice, octave, note}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ stringBrand, setStringBrand ] = useState();

    function handleClick(e) {

        const clickOctave = parseInt(note.substr(0,1));
        const clickNote = note.substr(1);
        // create new object
        // const newObject = [...stringForm];
        // get string id (temporarily title)
        console.log(stringForm[0]["G"])
        console.log(octave)
        if (stringForm[clickOctave].octave===0) {
            const newObject = [...stringForm, stringForm[clickOctave][clickNote].id = e.target.name];
            setStringForm(newObject);
        } else if (stringForm[clickOctave].octave===1){
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
            setStringForm(newObject);
        }
        
        setStringBrand(e.target.name);
        // console.log(newObject)
        // find price in strings object
        const stringObject = strings.find(string=>string.id===e.target.name);
        console.log(stringObject);

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
                            <button type="button" style={note&&{width: '285%'}}>{stringBrand?stringBrand:'String Type'}{!note&&`  >>`}</button>
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
                                        <li><button type="button" onClick={(e)=>handleClick(e)} name='Pedal Bass Wire (Tarnish-Resistant)' style={{width: '275px'}}>Pedal Bass Wire (Tarnish-Resistant)</button></li>
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
