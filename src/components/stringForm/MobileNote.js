import React, {useContext, useEffect, useState} from 'react';
import parseNum from 'parse-num';
import MobileNoteCss from '../../styles/stringForm/MobileNote.css';
import { StringFormContext } from '../../contexts/StringFormContext';
import { NOTES_IN_OCTAVE } from '../../constants/constants';
import SelectString from '../../components/stringForm/SelectString';

function MobileNote({strings, note, octave, octaveBrand, setOctaveBrand, applyToOctaves, setTotal, setApplyToOctaves}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    
    function handleChange(e) {
        let newObject = [...stringForm];
        newObject[note.substr(0,1)][note.substr(1)].qty=e.target.value;
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
    return (
        <div style={{position: 'relative'}}>
            <div className="mobilenoteContainer">
                {note==='Header'
                ?<>
                <div>
                    <div className="item6 mobilestringtype mobilecolHeader">
                        <div style={{width: '100%', padding: '5px 7px'}}>
                        <div style={{display:'flex', justifyContent: 'space-between'}}>
                            <div style={{whiteSpace: 'nowrap'}}>String Type</div>
                            <div style={{width: '90%', textAlign: 'right'}}>
                                <input 
                                    type='checkbox'
                                    onClick={()=>{
                                        const newObject = [...stringForm, stringForm[octave].applytooctave=stringForm[octave].applytooctave===0?1:0]
                                        setStringForm(newObject)
                                    }} 
                                    defaultChecked={applyToOctaves[octave]===0?'':`true`}
                                />
                                <label style={{fontSize: '16px'}}>Apply to Octave?</label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='mobileline2' style={{padding: '7px'}}>
                    <div className="item3 mobileqty mobilecolHeader">Qty</div>
                    <div className="item4 mobilenote mobilecolHeader">Note</div>
                    <div className="item5 mobilepriceper mobilecolHeader">Price</div>
                    <div className="item6 mobilelinetotal mobilecolHeader">Total</div>
                </div>
                </> 
                :<>
                <div 
                    className="mobilestringtype" 
                    id={`stringType${note}`} 
                    style={{
                        textAlign: 'left',
                        display: 'flex', 
                        color: '#6A75AA',
                        fontSize: '16px',
                        fontStyle: 'italic',
                        letterSpacing: '.8px',
                        justifyContent: 'left',
                        alignItems: 'center'
                    }}
                >
                    <SelectString 
                        octaveBrand={octaveBrand} 
                        setOctaveBrand={setOctaveBrand} 
                        strings={strings}
                        note={note}
                        setTotal={setTotal}
                    />
                    <div className='mobilestringBrand' id={`stringTypeText${note}`} style={{paddingLeft: '15px'}}>{stringForm&&note?stringForm[note.substr(0,1)][note.substr(1)].brand:"Select String Type"}</div>
                </div>
                <div className='mobileline2'>
                    <div className="mobileqty">
                        <div>&nbsp;Qty:&nbsp;</div>
                        <input 
                            className='mobileqty-input' 
                            type='number'
                            min='0'
                            value={stringForm[note.substr(0,1)][note.substr(1)].qty} 
                            onChange={(e)=>handleChange(e)} note={`${note}`}
                        />
                    </div>
                    <div className="mobilenote" id='note'>{note}</div>
                    <div className="mobilepriceper">
                        {parseNum(stringForm[note.substr(0,1)][note.substr(1)].price)>0
                        ?"$"+parseNum(stringForm[note.substr(0,1)][note.substr(1)].price).toFixed(2)
                        :"$0.00"}
                    </div>
                    <div className="mobilelinetotal">
                        {stringForm[note.substr(0,1)][note.substr(1)].qty>0
                        ?"$"+(parseNum(stringForm[note.substr(0,1)][note.substr(1)].price)
                            *stringForm[note.substr(0,1)][note.substr(1)].qty).toFixed(2)
                        :"$0.00"}
                    </div>
                </div>
                </>
                }
            </div>  
            <MobileNoteCss />
        </div>
    )
}

export default MobileNote;
