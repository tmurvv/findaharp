import React, {useEffect, useState} from 'react';
import Note from '../../components/stringForm/Note';
import SelectString from '../../components/stringForm/SelectString';
import OctaveCss from '../../styles/stringForm/Octave.css';

const CARDINALS = ['zero', '1st','2nd', '3rd', '4th', '5th', '6th', '7th']
function Octave({strings, octave, applyToOctaves, setApplyToOctaves, setTotal}) {
    const [ octaveBrand, setOctaveBrand] = useState(["String Type", "0.00"]);
    
    return (
        <>
            <p style={{color: 'grey', fontStyle: 'italic', textAlign: 'center', paddingTop: '40px'}}>{CARDINALS[octave]} Octave {octave==='0'&&' (pedal harp only)'}{octaveBrand[0]}</p>
            {/* <div style={{display: 'flex'}}>
                <SelectString octave={octave}/>
            </div> */}
            <Note note={`Header`} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
            {octave==='0'
            ?<div>
                <Note note={`${octave}G`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
                <Note note={`${octave}F`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
            </div>
            :<>
                <Note note={`${octave}E`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
                <Note note={`${octave}D`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
                <Note note={`${octave}C`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
                {octave!=='7'
                &&<>
                    <Note note={`${octave}B`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
                    <Note note={`${octave}A`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
                    <Note note={`${octave}G`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
                    <Note note={`${octave}F`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves}/>
                </>} 
            </>}
            <OctaveCss />
        </>
    )
}

export default Octave;
