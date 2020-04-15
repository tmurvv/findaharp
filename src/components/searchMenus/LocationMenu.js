//Packages
import React from 'react';

export default function LocationMenu(props) {
    const [anchorElLocation, setAnchorElLocation] = React.useState(null);  
    const handleClick = (evt) => setAnchorElLocation(evt.currentTarget);
    const handleClose = (evt) => {
        setAnchorElLocation(null);
        if (evt.target.value === 'All Locations') return;
        props.handleLocationChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <div className="menuButton" onClick={() => setAnchorElLocation(!anchorElLocation)}>
                LOCATION
            </div>                
            <ul
                id="location-select"
                anchorElLocation={anchorElLocation}
                onClose={handleClose}
                hidden={!anchorElLocation}
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
                    name='US-NorthEastern'
                >US-NorthEastern</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-SouthEastern'
                >US-SouthEastern</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-South'
                >US-South</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-MidWest'
                >US-MidWest</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-West'
                >US-West</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-Pacific'
                >US-Pacific</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Canada'
                >Canada</li>               
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Mexico'
                >Mexico</li>               
            </ul>     
        </div>
    );
}
