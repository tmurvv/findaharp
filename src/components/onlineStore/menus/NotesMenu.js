
// packages
import React, { useContext } from 'react';
import uuid from 'react-uuid';

export default function NotesMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Notes') return;
        props.handleNotesChange(evt.target.getAttribute('name')); 
    };
      
    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='notes' 
                onClick={(e)=>{
                    props.handleclick(e); 
                }}
                style={{color: '#000000'}}
            >
                Notes
            </button>               
            <ul
                id="Notes-select"
                onClose={handleClose}
                hidden={!props.open}
                name='notes'
                className='storePlainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Notes'
                >All Notes</li>      
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='E'
                >E</li>      
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='D'
                >D</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='C'
                >C</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='B'
                >B</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='A'
                >A</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='G'
                >G</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='F'
                >F</li>
            </ul>     
        </div>
    );
}
