//Packages
import React from 'react';
// import uuid from 'uuid';

// Material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function PriceMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);  
    const handleClick = (evt) => setAnchorEl(evt.currentTarget);
    const handleClose = (evt) => {
        setAnchorEl(null);
        if (evt.target.value === 'All Prices') return;
        props.handlePriceChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Price Range
            </Button>               
            <Menu
                id="size-select"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                name='Price Menu'
            >
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Prices'
                >All Prices</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='$30,000 plus'
                >$30,000 plus</MenuItem>      
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$20,000-$29,999'
                >$20,000-$29,999</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$10,000-$19,999'
                >$10,000-$19,999</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$5,000-$9,999'
                >$5,000-$9,999</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$2,000-$4,999'
                >$2,000-$4,999</MenuItem>
                <MenuItem 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Less than $2000'
                >Less than $2000</MenuItem>          
            </Menu>     
        </div>
    );
}
