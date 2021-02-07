// packages
import React, { useContext } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

export default function DustyetcMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'Dusty, Triplett, etc') return;
        props.handleDustyetcChange(evt.target.getAttribute('name')); 
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
                name='dustyetc' 
                onClick={(e)=>{
                    // alert('String "Dustyetc" menu under construction. Check back soon!')
                    props.handleclick(e); 
                }}
                style={{color: '#000000'}}
            >
                By String Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>               
            <ul
                id="dustyetc-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Dusty, Triplett, etc'
                className='storePlainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Dusty, Triplett, etc'
                >Dusty, Triplett, etc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>   
                {/* <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Delta'
                >Delta</li>  */}
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
