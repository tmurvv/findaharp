import React, {useContext, useEffect, useState} from 'react';
import parseNum from 'parse-num';
import NoteCss from '../../styles/stringForm/Note.css';
import { StringFormContext } from '../../contexts/StringFormContext';
import { STRING_NUMBER } from '../../constants/constants';
import SelectString from '../../components/stringForm/SelectString';
import Quantity from '../../utils/codestorage/onlinestores/Quantity';

function Note({strings, note, octave, octaveBrand, setOctaveBrand, applyToOctaves, setApplyToOctaves}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ price, setPrice ] = useState('0.00');
    const [ qty, setQty ] = useState(0);
    
    function handleChange(e) {
        console.log('qty', e.target.value)
        console.log('qty', e.target.value)
        setQty(e.target.value)
    }
    function getPrice(e, myStrings) {
        const stringOctave = parseInt(note.substr(0,1));
        const stringNote = note.substr(1);
        const stringType = stringForm[stringOctave][stringNote].id;
        console.log('price')
        console.log(stringOctave, stringNote, stringType)
        // find price in strings object
        strings.map(string=>
            {
                // console.log(string.order, "|", STRING_NUMBER[note], "|", string.title)
                if (string.order===STRING_NUMBER[note]&&string.title.includes(stringType)&&stringForm[stringOctave].octave===1) {
                    console.log(string.title); 
                    
                    setOctaveBrand([stringType, parseNum(string.price).toFixed(2)])
                    setPrice(parseNum(string.price).toFixed(2)); 
                }

            });
            setPrice('0.00')
    }
    return (
        
        <div style={{position: 'relative'}}>
            {note==='Header'&&<br/>}
            <div className="noteGridContainer">
                {note==='Header'
                ?<><div className="item3 colHeader" style={{border: '2px solid'}}>Qty</div>
                <div className="item4colHeader" style={{border: '2px solid'}}>Note</div>
                <div className="item6 colHeader" style={{border: '2px solid'}}>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <div>String Type</div>
                        <div>
                            <input 
                                type='checkbox'
                                onClick={()=>{
                                    const newObject = [...stringForm, stringForm[octave].octave=stringForm[octave].octave===0?1:0]
                                    setStringForm(newObject)
                                }} 
                                defaultChecked={applyToOctaves[octave]===0?'':`true`}
                            />
                            <label style={{fontSize: '16px'}}>Apply to Octave?</label>
                        </div>
                    </div>
                </div>
                <div className="item5 colHeader" style={{border: '2px solid'}}>Price</div>
                <div className="item6 colHeader" style={{border: '2px solid'}}>Total</div>
                </> 
                // :<><input data-id={`${octave}${note}`} className="item4" placeholder='0' />
                :<><div><input className='qty-input' type='number' value={qty} onChange={(e)=>handleChange(e)} note={`${note}`}/></div>
                <div className="note" id='note'>{note}</div>
                <div 
                    className="stringtype" 
                    id={`stringType${note}`} 
                    style={{textAlign: 'left',display: 'flex'}}
                >
                    <SelectString 
                        octaveBrand={octaveBrand} 
                        setOctaveBrand={setOctaveBrand} 
                        getPrice={getPrice} 
                        strings={strings}
                        note={note}
                    />
                    &nbsp;&nbsp;{stringForm&&note&&stringForm[note.substr(0,1)][note.substr(1)].id}
                </div>

                {/* <div className="stringtype" id={`stringType${note}`}>{octaveBrand&&octaveBrand[0]&&octaveBrand[0]!=='String Type'?<><button onClick={()=>setOctaveBrand(['String Type', "0.00"])}>change</button>{octaveBrand[0]}</>:<SelectString octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} getPrice={getPrice} strings={strings} localBrand={applyToOctaves?octaveBrand:localBrand} note={note}/>}</div> */}
                <div className="item6">{stringForm[note.substr(0,1)][note.substr(1)].price}</div>
                <div className="item7">${octaveBrand&&octaveBrand[1]&&qty>0?(parseNum(octaveBrand[1])*qty).toFixed(2):"0.00"}</div>
                
                </>
                }
            </div>  
            <NoteCss />
        </div>
    )
}

export default Note;
