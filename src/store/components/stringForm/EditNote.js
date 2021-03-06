import React, {useContext, useEffect, useState} from 'react';
import parseNum from 'parse-num';
import EditNoteCss from '../../styles/stringForm/EditNote.css';
import { StringFormContext } from '../../contexts/StringFormContext';
import { NOTES_IN_OCTAVE } from '../../../main/constants/constants';
import SelectString from '../stringForm/SelectString';

function EditNote({setChanges, strings, note, octave, octaveBrand, setOctaveBrand, applyToOctaves, setTotal, setApplyToOctaves}) {
    const { stringForm, setStringForm } = useContext(StringFormContext);
    const [ getTip, setGetTip ] = useState('here');
    
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
    useEffect(()=> {
        let setIt;
        if (parseInt(octave)===0) setIt = 'Zero Octave-usually only pedal harps';
        if (parseInt(octave)===1) setIt = 'Lever harps-highest note usually in 1st oct';
        if (parseInt(octave)>1&&parseInt(octave)<4) setIt = 'Gut, Nylon, or Synthetic';
        if (parseInt(octave)===4) setIt = '"Middle C" is in the 4th octave';
        if (parseInt(octave)===5) setIt = 'Wires start somewhere in the 5th Oct';
        if (parseInt(octave)===6) setIt = 'Wires';
        if (parseInt(octave)===7) setIt = '7th Octave-usually pedal harps only';
        setGetTip(setIt);
    })
    return (
        
        <div style={{position: 'relative'}}>
            <div className="editNoteGridContainer">
                {note==='Header'
                ?<>
                <div className="item4 colHeader editNote" style={{border: '2px solid'}}>Note</div>
                <div className="item6 colHeader" style={{border: '2px solid'}}>
                    <div className='editNotegridDiv' style={{width: '90%'}}>
                    <div className='editNotegridDiv' style={{display:'flex', justifyContent: 'space-between'}}>
                        <div className='editNotegridDiv' style={{color: '#6A75AA', fontSize: '14px', fontStyle: 'italic'}}>{getTip}</div>
                        <div className='editNotegridDiv' style={{width: '50%', textAlign: 'right'}}>
                            <input 
                                type='checkbox'
                                onClick={()=>{
                                    const newObject = [...stringForm, stringForm[octave].applytooctave=stringForm[octave].applytooctave===0?1:0]
                                    setStringForm(newObject)
                                }} 
                                defaultChecked={true}
                            />
                            <label style={{fontSize: '14px'}}>Apply to Octave?</label>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="item5 colHeader editNotegridDiv" style={{border: '2px solid'}}>Price</div>
                </> 
                :<>
                <div className="editNote editNotegridDiv" id='editNote'>{note}</div>
                <div 
                    className="stringtype editNotegridDiv" 
                    id={`stringType${note}`} 
                    style={{
                        textAlign: 'left',
                        display: 'flex', 
                        color: '#6A75AA',
                        fontSize: '16px',
                        fontStyle: 'italic',
                        letterSpacing: '.8px',
                        justifyContent: 'left'
                    }}
                >
                    <SelectString 
                        octaveBrand={octaveBrand} 
                        setOctaveBrand={setOctaveBrand} 
                        strings={strings}
                        note={note}
                        setTotal={setTotal}
                    />
                    <div className='editNotegridDiv' id={`stringTypeText${note}`} style={{paddingLeft: '15px'}}>{stringForm&&note&&stringForm[note.substr(0,1)][note.substr(1)].brand}</div>
                </div>
                <div className="item6 editNotegridDiv">{parseNum(stringForm[note.substr(0,1)][note.substr(1)].price)>0&&"$"+parseNum(stringForm[note.substr(0,1)][note.substr(1)].price).toFixed(2)}</div>
                </>
                }
            </div>  
            <EditNoteCss />
        </div>
    )
}

export default EditNote;



    // function getPrice(e, myStrings) {
    //     const stringOctave = parseInt(note.substr(0,1));
    //     const stringEditNote = note.substr(1);
    //     const stringType = stringForm[stringOctave][stringEditNote].id;
    //     console.log('price')
    //     console.log(stringOctave, stringNote, stringType)
    //     // find price in strings object
    //     strings.map(string=>
    //         {
    //             // console.log(string.order, "|", STRING_NUMBER[note], "|", string.title)
    //             if (string.order===STRING_NUMBER[note]&&string.title.includes(stringType)&&stringForm[stringOctave].applytooctave===1) {
    //                 console.log(string.title); 
                    
    //                 setOctaveBrand([stringType, parseNum(string.price).toFixed(2)])
    //                 setPrice(parseNum(string.price).toFixed(2)); 
    //             }

    //         });
    //         setPrice('0.00')
    // }