//Packages
import React from 'react';

export default function PriceMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);  
    const handleClose = (evt) => {
        setAnchorEl(null);
        console.log('balh', evt.target.getAttribute('name'));
        if (evt.target.value === 'All Prices') return;
        props.handlePriceChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <div className="menuButton" onClick={() => setAnchorEl(!anchorEl)}>
                PRICE RANGE
            </div>               
            <ul
                id="price-select"
                onClose={handleClose}
                hidden={!anchorEl}
                name='Price Menu'
                className='plainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Prices'
                >All Prices</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='$30,000 plus'
                >$30,000 plus</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$20,000-29,999'
                >$20,000-29,999</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$10,000-19,999'
                >$10,000-19,999</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$5,000-9,999'
                >$5,000-9,999</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='$2,000-4,999'
                >$2,000-4,999</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Less than $2000'
                >Less than $2000</li>          
            </ul>     
        </div>
    );
}
