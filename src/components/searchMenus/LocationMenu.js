//Packages
import React from 'react';

export default function LocationMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Locations') return;
        props.handleLocationChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <button 
                className="menuButton" 
                name='location' 
                onClick={(e)=>{console.log('click');props.handleclick(e);}}
            >
                LOCATION
            </button>                
            <ul
                id="location-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Location Menu'
                className='plainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Locations'
                >All Locations</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='North-East'
                >US-NorthEastern</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Eastern'
                >Eastern</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='South'
                >US-South</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Mid-West'
                >US-MidWest</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='West'
                >US-West</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Pacific'
                >US-Pacific</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Canada'
                >Canada</li>              
            </ul>     
        </div>
    );
}
