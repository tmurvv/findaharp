import React, {useContext, useEffect, useState} from 'react';
import NoteCss from '../../styles/stringForm/Note.css';
import { StringOrderContext } from '../../contexts/StringOrderContext';
import SelectString from '../../components/stringForm/SelectString';
import Quantity from '../../components/stringForm/Quantity';

function Note({note, octave, defaultStringBrand, setStringBrand}) {
    const { stringOrder, setStringOrder } = useContext(StringOrderContext);
    const { applyToOctave, setApplyToOctave } = useState();
    const { localStringBrand, setLocalStringBrand } = useState(defaultStringBrand);
    
    useEffect(()=>setStringBrand&&setStringBrand(defaultStringBrand?defaultStringBrand:'String Type'));
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
                            <input type='checkbox' onClick={()=>setApplyToOctave(!applyToOctave)} defaultChecked/>
                            <label style={{fontSize: '16px'}}>Apply to Octave?</label>
                        </div>
                    </div>
                </div>
                <div className="item5 colHeader" style={{border: '2px solid'}}>Price</div>
                <div className="item6 colHeader" style={{border: '2px solid'}}>Total</div>
                </> 
                // :<><input data-id={`${octave}${note}`} className="item4" placeholder='0' />
                :<><div><input class='qty-input' type='number' note={`${note}`}/></div>
                <div className="note" id='note'>{note}</div>
                <div className="stringtype"><SelectString defaultStringBrand={defaultStringBrand} setStringBrand={setStringBrand}/></div>
                <div className="item6">$0.00</div>
                <div className="item7">$0.00</div>
                
                </>
                }
            </div>
            {note!=='Header'&&<div id={`lineStringMenu${octave}${note}`} style={{position: 'absolute', right: '70px', bottom: '20px', display: 'none'}}><SelectString octave={octave} note={note} defaultStringBrand={defaultStringBrand} setStringBrand={setStringBrand}/></div>} 
            
            <NoteCss />
        </div>
    )
}

export default Note;
