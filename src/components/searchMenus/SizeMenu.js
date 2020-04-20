//Packages
import React from 'react';

export default function SizeMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);  
    const handleClose = (evt) => {
        setAnchorEl(null);
        if (evt.target.value === 'All Sizes') return;
        props.handleSizeChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
             <div className="plainTextSelectLine1" onClick={() => setAnchorEl(!anchorEl)}>
                HARP SIZE
            </div>              
            <ul
                id="size-select"
                onClose={handleClose}
                hidden={!anchorEl}
                name='Size Menu'
                className='plainTextSelectLine1'
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Sizes'
                >All Sizes</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='All Lever'
                >All Lever</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='All Pedal'
                >All Pedal</li>      
                <li 
                    onClick={handleClose}
                    // key={uuid()}
                    name='Large Lever'
                >Large Lever (35+ strings)</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Medium Lever'
                >Medium Lever (29-34 strings)</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Small Lever'
                >Small Lever (22-28 strings)</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Lever-Free/Lap'
                >Lever-Free/Lap</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Concert Grand Pedal'
                >Concert Grand Pedal</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Semi-Grand Pedal'
                >Semi-Grand Pedal</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Small Pedal'
                >Small Pedal</li>               
            </ul>     
        </div>
    );
}
