//Packages
import React, {useState} from 'react';

export default function LocationMenu(props) {
    const [activateDriving, setActivateDriving] = useState(false)
    const handleClose = async (evt) => {
        if (evt.target.value === 'All Locations') return;
        if (evt.target.getAttribute('name')==='ltActivate') evt.target.setAttribute('name', 'All Locations');
        console.log(evt.target.getAttribute('name'))
        props.handleLocationChange(evt.target.getAttribute('name'));
    };
    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='location' 
                onClick={(e)=>{props.handleclick(e);}}
                style={{color: '#000000'}}
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
                    onClick={(e) => {setActivateDriving(!activateDriving); handleClose(e);}}
                    // key={uuid()}
                    name='ltActivate'
                    style={{color: '#6A75AA', textDecoration: 'underline'}}
                >{activateDriving?'by Region':'by Driving Distance'}</li>      
                <li 
                    onClick={handleClose}
                    hidden={!activateDriving} 
                    // key={uuid()}
                    name='Less than 500'
                >Less than 500</li>      
                <li 
                    onClick={handleClose} 
                    
                    hidden={!activateDriving} 
                    // key={uuid()}
                    name='Less than 300'
                >Less than 300</li>      
                <li 
                    onClick={handleClose} 
                    
                    hidden={!activateDriving} 
                    // key={uuid()}
                    name='Less than 100'
                >Less than 100</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    // key={uuid()}
                    name='North-East'
                >US-NorthEastern</li>    
                <li 
                    onClick={handleClose}
                    hidden={activateDriving} 
                    // key={uuid()} 
                    name='Eastern'
                >US-Eastern</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    // key={uuid()} 
                    name='South'
                >US-South</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    // key={uuid()} 
                    name='Mid-West'
                >US-MidWest</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    // key={uuid()} 
                    name='West'
                >US-West</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    // key={uuid()} 
                    name='Pacific'
                >Pacific</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    // key={uuid()} 
                    name='Canada-East'
                >Canada-East</li>              
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    // key={uuid()} 
                    name='Canada'
                >Canada</li>              
            </ul>     
        </div>
    );
}
