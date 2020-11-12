import React from 'react';
import uuid from 'react-uuid';

export default function OctavesMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All String Octaves') return;
        props.handleOctavesChange(evt.target.getAttribute('name')); 
    };

    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='String Octaves' 
                onClick={(e)=>{props.handleclick(e);}}
                style={{color: '#000000'}}
            >Octaves</button>
            <ul
                id="Octaves-select"
                onClose={handleClose}
                hidden={!props.open}
                name='String Octaves Menu'
                className='plainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Octaves'       
                >All Octaves</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='1st Octave'
                >1st Octave</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='2nd Octave'
                >2nd Octave</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='3rd Octave'
                >3rd Octave</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='4th Octave'
                >4th Octave</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='5th Octave'
                >5th Octave</li> 
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Individual Wires'
                >Individual Wires</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='1st Octave Set'
                >1st Octave Set</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='2nd Octave Set'
                >2nd Octave Set</li>               
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='3rd Octave Set'
                >3rd Octave Set</li>         
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='4th Octave Set'
                >4th Octave Set</li>         
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='5th Octave Set'
                >5th Octave Set</li>         
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Wire Sets'
                >Wire Sets</li>         
            </ul>
        </div>
    );
}
