//Packages
import React from 'react';
// import uuid from 'uuid';

// Material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function LocationMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);  
    const handleClick = (evt) => setAnchorEl(evt.currentTarget);
    const handleClose = (evt) => {
        setAnchorEl(null);
        if (evt.target.value === 'All Sizes') return;
        props.handleLocationChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Location
            </Button>               
            <Menu
                id="size-select"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                name='Location Menu'
            >
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Locations'
                >All Locations</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='US-NorthEastern'
                >US-NorthEastern</MenuItem>      
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-SouthEastern'
                    selected={props.currentselected.startsWith('Medium')}
                >US-SouthEastern</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-South'
                >US-South</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-MidWest'
                    selected={props.currentselected.startsWith('Lever')}
                >US-MidWest</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-West'
                    selected={props.currentselected.startsWith('Concert')}
                >US-West</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='US-Pacific'
                    selected={props.currentselected.startsWith('Semi')}
                >US-Pacific</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Canada'
                    selected={props.currentselected.startsWith('Small Pedal')}
                >Canada</MenuItem>               
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Mexico'
                    selected={props.currentselected.startsWith('Small Pedal')}
                >Mexico</MenuItem>               
            </Menu>     
        </div>
    );
}
