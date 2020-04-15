//Packages
import React from 'react';
// import uuid from 'uuid';

// Material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SizeMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);  
    const handleClick = (evt) => setAnchorEl(evt.currentTarget);
    const handleClose = (evt) => {
        setAnchorEl(null);
        if (evt.target.value === 'All Sizes') return;
        props.handleSizeChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Harp Size
            </Button>               
            <Menu
                id="size-select"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                name='Size Menu'
            >
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Sizes'
                >All Sizes</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='All Lever'
                >All Lever</MenuItem>      
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='All Pedal'
                >All Pedal</MenuItem>      
                <MenuItem 
                    onClick={handleClose}
                    // key={uuid()}
                    name='Large Lever'
                >Large Lever (35+ strings)</MenuItem>      
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Medium Lever'
                >Medium Lever (29-34 strings)</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Small Lever'
                >Small Lever (22-28 strings)</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Lever-Free/Lap'
                >Lever-Free/Lap</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Concert Grand Pedal'
                >Concert Grand Pedal</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Semi-Grand Pedal'
                >Semi-Grand Pedal</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Small Pedal'
                >Small Pedal</MenuItem>               
            </Menu>     
        </div>
    );
}
