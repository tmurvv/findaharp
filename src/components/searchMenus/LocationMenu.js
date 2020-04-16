//Packages
import React from 'react';

export default function LocationMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);  
    const handleClose = (evt) => {
        setAnchorEl(null);
        if (evt.target.value === 'All Locations') return;
        props.handleLocationChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <div className="menuButton" onClick={() => setAnchorEl(!anchorEl)}>
                LOCATION
            </div>                
            <ul
                id="location-select"
                onClose={handleClose}
                hidden={!anchorEl}
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
                >West Canada</li>               
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Mexico'
                >Mexico</li>               
            </ul>     
        </div>
    );
}
