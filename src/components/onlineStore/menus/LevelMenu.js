// packages
import React, { useContext } from 'react';
import uuid from 'react-uuid';

export default function LevelMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Levels') return;
        props.handleLevelChange(evt.target.getAttribute('name')); 
    };
      
    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='level' 
                onClick={(e)=>{
                    props.handleclick(e); 
                }}
            >
                Level
            </button>               
            <ul
                id="level-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Level Menu'
                className='storePlainTextSelectLine1'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Levels'
                >All Levels</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Beginning'
                >Beginning</li>      
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Beg-Int'
                >Beg-Int</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Intermediate'
                >Intermediate</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Int-Adv'
                >Int-Adv</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Advanced'
                >Advanced</li>
            </ul>     
        </div>
    );
}
