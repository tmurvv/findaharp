//Packages
import React from 'react';

export default function PriceMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Prices') return;
        props.handlePriceChange(evt.target.getAttribute('name')); 
    };

    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='price' 
                onClick={(e)=>{props.handleclick(e);}}
                style={{color: '#000000'}}
            >
                PRICE RANGE
            </button>               
            <ul
                id="price-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Price Menu'
                className='plainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Prices'
                >All Prices</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='$30,000 plus'
                >$30,000 plus</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$20,000-29,999'
                >$20,000-29,999</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$10,000-19,999'
                >$10,000-19,999</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$5,000-9,999'
                >$5,000-9,999</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$2,000-4,999'
                >$2,000-4,999</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Less than $2,000'
                >Less than $2,000</li>          
            </ul>     
        </div>
    );
}
