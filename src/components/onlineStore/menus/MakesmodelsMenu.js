// packages
import React, { useContext } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

export default function MakesmodelsMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'Makes/Models') return;
        props.handleMakesmodelsChange(evt.target.getAttribute('name')); 
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
                name='makesmodels' 

                onClick={(e)=>{
                    // alert('Make/Model menu under construction. For now, please search for your harp model name in the text field above.')
                    props.handleclick(e); 
                }}
                style={{color: '#000000'}}
            >
                By Make/Model
            </button>               
            <ul
                id="makesmodels-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Makes/Models'
                className='storePlainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Makes/Models'
                >All Makes/Models</li>   
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Delta'
                >Delta</li> 
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Dusty Strings'
                >Dusty Strings</li>    
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Rees'
                >Rees</li>  
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Stoney End'
                >Stoney End</li>    
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Triplett'
                >Triplett</li>       
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
