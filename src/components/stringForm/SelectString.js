import React, { useContext, useEffect, useState } from 'react';
import SelectStringCss from '../../styles/stringForm/SelectString.css';
import parseNum from 'parse-num';
import { StringFormContext } from '../../contexts/StringFormContext';
import { STRING_NUMBER, STRING_BRANDS } from '../../constants/constants';

function SelectString({strings, note, octave, octaveBrand, setOctaveBrand}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ stringBrand, setStringBrand ] = useState();

    function handleClick(menu) {
        Array.from(document.querySelectorAll(`.clear${note}`)).map(menu=>menu.style.display='none');
        
        console.log(menu.target.id)
        console.log(`stringMenu${menu.target.id.substr(menu.target.id.length-2)}`)
        const stringType = document.querySelector(`#${menu.target.id}`).value;
        document.querySelector(`#stringMenu${menu.target.id.substr(menu.target.id.length-2)}`).value=`stringMenu${note}`;
        const clickOctave = parseInt(note.substr(0,1));
        const clickNote = note.substr(1);
        
        if (stringForm[clickOctave].octave===0) {
            const newObject = [...stringForm, stringForm[clickOctave][clickNote].id = stringType];
            setStringForm(newObject);
            setOctaveBrand([stringType, octaveBrand[1]]);
        } else if (stringForm[clickOctave].octave===1){
            let newObject;
            if (clickOctave===0) newObject =  [...stringForm,
                stringForm[clickOctave]["G"].id = stringType,
                stringForm[clickOctave]["F"].id = stringType
            ];
            if (clickOctave>0&&clickOctave<7) newObject = [...stringForm,
                stringForm[clickOctave]["E"].id = stringType,
                stringForm[clickOctave]["D"].id = stringType,
                stringForm[clickOctave]["C"].id = stringType,
                stringForm[clickOctave]["B"].id = stringType,
                stringForm[clickOctave]["A"].id = stringType,
                stringForm[clickOctave]["G"].id = stringType,
                stringForm[clickOctave]["F"].id = stringType
            ];;
            if (clickOctave===7) newObject = [...stringForm,
                stringForm[clickOctave]["E"].id = stringType,
                stringForm[clickOctave]["D"].id = stringType,
                stringForm[clickOctave]["C"].id = stringType,
            ];
            setStringForm(newObject);
            setOctaveBrand([stringType, octaveBrand[1]]);
        }
        
        setStringBrand(stringType);
        setOctaveBrand([stringType, octaveBrand[1]]);
        // console.log(newObject)
        // find price in strings object
        // console.log(stringForm[clickOctave].octave)

        const stringObject = strings.map(string=>
            {
                // console.log(string.order, "|", STRING_NUMBER[note], "|", string.title)
                if (string.order===STRING_NUMBER[note]&&string.title.includes(stringType)&&stringForm[clickOctave].octave===1) {console.log(string.title); console.log(parseNum(string.price).toFixed(2)); setOctaveBrand([stringType, parseNum(string.price).toFixed(2)])}
            });
        
        // setOctaveBrand(stringObject.title, parseNum(stringObject.price).toFixed(2))
        // console.log(stringObject);

        // console.log(newObject);
           
        // update form
        // setStringBrand(e.target.name);
    }
    function handleSelect(e) {
        // console.log(e.target.value)
        // console.log('hee', document.querySelectorAll('.clear'))
        Array.from(document.querySelectorAll(`.clear${note}`)).map(menu=>menu.style.display='none');
        
        document.querySelector(`#${e.target.value}`).style.display='block';
    }
    // useEffect(()=>setStringBrand(defaultStringBrand))
    return (
        <>
            <div className="menu-wrapper">
                <div style={{display: 'flex'}}>            
                    <select id={`stringMenu${note}`} onChange={(e)=>{handleSelect(e)}} style={{width: 'fit-content'}}>
                        <option value={`stringMenu${note}`}>Change Type</option>
                        <option value={`notSureMenu${note}`}>Not Sure</option>
                        <option value={`gutMenu${note}`}>Gut</option>
                        <option value={`nylonMenu${note}`}>Nylon</option>
                        <option value={`wireMenu${note}`}>Wires</option>
                        <option value={`syntheticMenu${note}`}>Synthetic</option>
                    </select>
                    <select className={`clear${note}`} id={`notSureMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
                        <option value='email'>Send us an email for advice on string types and brands</option>
                        <option onClick={()=>alert('Under Construction. Expected March 2021')}>View string charts by harp make and model</option>
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
                        <option>Select Brand</option>
                        <option>Silver-Plated Pedal Bass Wire</option>
                        <option>Pedal Bass Wire (Tarnish-Resistant)</option>
                        <option>Bow Brand Lever Bass Wire</option>
                        <option>Professional Lever Bass Wire</option>
                    </select>
                    <select className={`clear${note}`} id={`syntheticMenu${note}`} onChange={(e)=>handleClick(e)} style={{display: 'none'}}>
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
