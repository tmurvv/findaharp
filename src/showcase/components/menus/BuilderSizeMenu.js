//Packages
import React from 'react';

export default function SizeMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Sizes') return;
        props.handleSizeChange(evt.target.getAttribute('name')); 
    };

    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='size' 
                onClick={(e)=>{props.handleclick(e);}}
            >
                HARP SIZE
            </button>              
            <ul
                id="size-select"
                onClose={handleClose}
                name='Size Menu'
                className='plainTextSelectLine1'
                style={{zIndex: 6000}}
                hidden={!props.open}
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Sizes'
                >All Sizes</li>      
                <li 
                    onClick={handleClose}
                    // key={uuid()}
                    name='Large Lever'
                >Large (35+ strings)</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Medium Lever'
                >Medium (29-34 strings)</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Small Lever'
                >Small (22-28 strings)</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Lever-Free/Lap'
                >Lap (Under 22 Strings)</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Wire'
                >Wire</li>
                
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Cross'
                >Cross</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Double'
                >Double</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Triple'
                >Triple</li>               
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Carbon Fiber'
                >Carbon Fiber</li>               
            </ul>     
        </div>
    );
}
