// packages
import React, { useContext } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

export default function TypesMenu(props) {
    
    const handleClose = (evt) => {
        if (evt.target.value === 'All Types') return;
        props.handleTypesChange(evt.target.getAttribute('name')); 
    };
    // get currency conversions
    async function getCurrency() {
        const multiplier = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=33d9a2db5c4410feb3f2');
        setCurrencyMultiplier(multiplier.data.USD_CAD);  
    }   
    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='types' 
                onClick={(e)=>{
                    props.handleclick(e); 
                }}
                style={{color: '#000000'}}
            >
                Types
            </button>               
            <ul
                id="types-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Types Menu'
                className='plainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Types'
                >All Types</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Gut Strings'
                >Gut Strings</li>    
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Nylon Strings'
                >Nylon Strings</li> 
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Wire Strings'
                >Wire Strings</li>      
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Strings for Pedal Harp'
                >Strings for Pedal Harp</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Strings for Lever Harps'
                >Strings for Lever Harps</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Dusty Strings Harp Strings'
                >Dusty Strings Harp Strings</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Wound Harp Strings'
                >Wound Harp Strings</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bronze and Copper Rolls for Wire Harps'
                >String Rolls for Wire Harps</li>
            </ul>     
        </div>
    );
}
