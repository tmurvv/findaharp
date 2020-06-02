//Packages
import React, {useState} from 'react';

export default function LocationMenu(props) {
    const [miles, setMiles] = useState(true)
    const handleClose = (evt) => {
        console.log(evt.target.innerText)
        if (evt.target.value === 'All Locations') return;
        if (evt.target.innerText === 'Change to kms') return alert('Coming soon... change to kms.');
        if (evt.target.innerText.startsWith('Less than')) return alert('Coming soon... select harp by how far away it is. For now, please select by region.');
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
                    onClick={()=>setMiles(!miles)} 
                    // key={uuid()}
                    name='changeUnit'
                >{miles?'Change to kms':'Change to miles'}</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='lt500'
                >{miles?'Less than 500 miles':'Less than 700kms'}</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='lt300'
                >{miles?'Less than 300 miles':'Less than 400kms'}</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='lt100'
                >{miles?'Less than 100 miles':'Less than 150kms'}</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='North-East'
                >US-NorthEastern</li>    
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Eastern'
                >US-Eastern</li>
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
                >Canada-East</li>              
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Canada'
                >Canada-West</li>              
            </ul>     
        </div>
    );
}
