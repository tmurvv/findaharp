import React, {useEffect, useState} from 'react';
import Note from '../../components/stringForm/Note';
import SelectString from '../../components/stringForm/SelectString';
import OctaveCss from '../../styles/stringForm/Octave.css';

const CARDINALS = ['zero', '1st','2nd', '3rd', '4th', '5th', '6th', '7th']
function Octave({octave}) {
    const [ stringBrand, setStringBrand] = useState("String Type");

    return (
        <>
            <p style={{color: 'grey', fontStyle: 'italic', textAlign: 'center', paddingTop: '40px'}}>{CARDINALS[octave]} Octave {octave==='0'&&' (pedal harp only)'}</p>
            {/* <div style={{display: 'flex'}}>
                <SelectString octave={octave}/>
            </div> */}
            <Note note={`Header`} />
            {octave==='0'
            ?<div>
                <Note note={`0G`} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
                <Note note={`0F`} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
            </div>
            :<>
                <Note note={`${octave}E`} octave={octave} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
                <Note note={`${octave}D`} octave={octave} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
                <Note note={`${octave}C`} octave={octave} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
                {octave!=='7'
                &&<>
                    <Note note={`${octave}B`} octave={octave} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
                    <Note note={`${octave}A`} octave={octave} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
                    <Note note={`${octave}G`} octave={octave} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
                    <Note note={`${octave}F`} octave={octave} defaultStringBrand={stringBrand} setStringBrand={setStringBrand}/>
                </>} 
            </>}
            <OctaveCss />
        </>
    )
}

export default Octave;
