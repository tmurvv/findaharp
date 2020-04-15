//Packages
import React from 'react';
// import uuid from 'uuid';

// Material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function FinishMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);  
    const handleClick = (evt) => setAnchorEl(evt.currentTarget);
    const handleClose = (evt) => {
        setAnchorEl(null);
        if (evt.target.value === 'All Sizes') return;
        props.handleFinishChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                FINISH
            </Button>               
            <Menu
                id="size-select"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                name='Finish Menu'
            >
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Sizes'
                >All Finishes</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='Mahogany'
                    selected={props.currentselected.startsWith('Large')}
                >Mahogany</MenuItem>      
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Natural'
                    selected={props.currentselected.startsWith('Medium')}
                >Natural</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Ebony'
                >Ebony</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Maple'
                    selected={props.currentselected.startsWith('Lever')}
                >Maple</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Walnut'
                    selected={props.currentselected.startsWith('Concert')}
                >Walnut</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Cherry'
                    selected={props.currentselected.startsWith('Semi')}
                >Cherry</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Bubinga'
                    selected={props.currentselected.startsWith('Small Pedal')}
                >Bubinga</MenuItem>               
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Other'
                    selected={props.currentselected.startsWith('Small Pedal')}
                >Other</MenuItem>               
            </Menu>     
        </div>
    );
}
