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
                    // alert('String "Types" menu under construction. Check back soon!')
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
                className='storePlainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Types'
                >All Types</li>    
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Gut'
                >Gut Strings</li>    
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Nylon'
                >Nylon Strings</li> 
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Wire'
                >Wire Strings</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bronze Wire Monofilament'
                >Bronze Wire Monofilament</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Nylon Wire Monofilament'
                >Nylon Wire Monofilament</li>
            </ul>     
        </div>
    );
}
