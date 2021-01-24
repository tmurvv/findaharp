import React, {useEffect, useState} from 'react';
import MobileNote from '../../components/stringForm/MobileNote';
import Note from '../../components/stringForm/Note';
import SelectString from '../../components/stringForm/SelectString';
import OctaveCss from '../../styles/stringForm/Octave.css';

const CARDINALS = ['zero', '1st','2nd', '3rd', '4th', '5th', '6th', '7th']
function Octave({setChanges, strings, octave, applyToOctaves, setApplyToOctaves, setTotal}) {
    const [ octaveBrand, setOctaveBrand] = useState(["String Type", "0.00"]);
    const [ mobile, setMobile] = useState(false);
    
    useEffect(() => {
        if (window.innerWidth&&window.innerWidth<556) setMobile(true)
    });
    return (
        <>
            <p style={{color: 'grey', fontStyle: 'italic', textAlign: 'center'}}>{CARDINALS[octave]} Octave</p>
            {mobile
            ?<><MobileNote note={`Header`} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                {octave==='0'
                ?<div>
                    <MobileNote note={`${octave}G`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    <MobileNote note={`${octave}F`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                </div>
                :<>
                    <MobileNote note={`${octave}E`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    <MobileNote note={`${octave}D`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    <MobileNote note={`${octave}C`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    {octave!=='7'
                    &&<>
                        <MobileNote note={`${octave}B`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                        <MobileNote note={`${octave}A`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                        <MobileNote note={`${octave}G`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                        <MobileNote note={`${octave}F`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    </>} 
                </>}
                </>
            :<>
                <Note note={`Header`} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                {octave==='0'
                ?<div>
                    <Note note={`${octave}G`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    <Note note={`${octave}F`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                </div>
                :<>
                    <Note note={`${octave}E`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    <Note note={`${octave}D`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    <Note note={`${octave}C`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    {octave!=='7'
                    &&<>
                        <Note note={`${octave}B`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                        <Note note={`${octave}A`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                        <Note note={`${octave}G`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                        <Note note={`${octave}F`} strings={strings} octave={octave} octaveBrand={octaveBrand} setOctaveBrand={setOctaveBrand} setTotal={setTotal} applyToOctaves={applyToOctaves} setApplyToOctaves={setApplyToOctaves} setChanges={setChanges}/>
                    </>} 
                </>}
            </>}           
            <OctaveCss />
        </>
    )
}

export default Octave;
