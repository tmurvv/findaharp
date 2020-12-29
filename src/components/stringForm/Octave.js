import React from 'react';
import Note from '../../components/stringForm/Note';
import SelectString from '../../components/stringForm/SelectString';
import OctaveCss from '../../styles/stringForm/Octave.css';

const CARDINALS = ['zero', '1st','2nd', '3rd', '4th', '5th', '6th', '7th']
function Octave({octave}) {
    return (
        <>
            <h3 style={{color: 'grey', fontStyle: 'italic', width: '100%', textAlign: 'center'}}>{CARDINALS[octave]} Octave {octave==='0'&&' (pedal harp only)'}</h3>
            <SelectString />
            <Note note={`Header`} />
            {octave==='0'?<div><Note note={`0G`} /><Note note={`0F`} /></div>:<>
            <Note note={`${octave}E`} />
            <Note note={`${octave}D`} />
            <Note note={`${octave}C`} />
            {octave!=='7'&&<><Note note={`${octave}B`} />
            <Note note={`${octave}A`} />
            <Note note={`${octave}G`} />
            <Note note={`${octave}F`} /></>} </>
            }
            <OctaveCss />
        </>
    )
}

export default Octave;
