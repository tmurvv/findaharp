//Packages
import React, { useState, useContext } from 'react';
import uuid from 'react-uuid';
//internal
import { UserContext } from '../../contexts/UserContext';

export default function LocationMenu(props) {
    const [activateDriving, setActivateDriving] = useState(false);
    const { user } = useContext(UserContext);
    const distanceUnit = user.distanceunit;
    const handleClose = async (evt) => {
        if (evt.target.value === 'All Locations') return;
        props.handleLocationChange(evt.target.getAttribute('name'));
    };
    const locationEnabled = (e) => {
        if(!activateDriving) {
            if (!navigator.geolocation) {
                alert('Location is not enabled on this device or computer. Please check your location settings.'); 
                return;
            }
        }
        setActivateDriving(!activateDriving); 
        handleClose(e);
    }
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
                    key={uuid()} 
                    name='All Locations'
                >All Locations</li>
                <li 
                    onClick={(e)=>locationEnabled(e)}
                    key={uuid()}
                    name='ltActivate'
                    style={{color: '#6A75AA', textDecoration: 'underline'}}
                >{activateDriving?'by Region':'by Driving Distance'}</li>            
                <li 
                    onClick={handleClose}
                    hidden={!activateDriving} 
                    key={uuid()}
                    name='Less than 500'
                >Less than 500 {distanceUnit}</li>      
                <li 
                    onClick={handleClose} 
                    hidden={!activateDriving} 
                    key={uuid()}
                    name='Less than 300'
                >Less than 300 {distanceUnit}</li>      
                <li 
                    onClick={handleClose} 
                    hidden={!activateDriving} 
                    key={uuid()}
                    name='Less than 100'
                >Less than 100 {distanceUnit}</li>
                <li 
                    onClick={()=>alert('Km/Miles preference is located in your profile. Please login or signup to change your distance unit preference.')}
                    hidden={!activateDriving}
                    style={{color: '#6A75AA', textDecoration: 'underline'}}
                    key={uuid()}
                    name='Preference'
                >Change to {distanceUnit==='miles'?'kms':'miles'}</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    key={uuid()}
                    name='Northeast'
                >US-Northeast</li>    
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    key={uuid()} 
                    name='South'
                >US-South</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    key={uuid()} 
                    name='Mid-West'
                >US-MidWest</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    key={uuid()} 
                    name='West'
                >US-West</li>
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    key={uuid()} 
                    name='Pacific'
                >US-Pacific</li>
                <li 
                    onClick={handleClose}  
                    hidden={activateDriving}
                    key={uuid()} 
                    name='Canada-East'
                >Canada-East</li>              
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    key={uuid()} 
                    name='Canada-West'
                >Canada-West</li>              
                <li 
                    onClick={handleClose}
                    hidden={activateDriving}
                    key={uuid()} 
                    name='Canada-Pacific'
                >Canada-Pacific</li>              
            </ul>     
        </div>
    );
}
