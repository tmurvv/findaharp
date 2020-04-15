//Packages
import React from 'react';

export default function PriceMenu(props) {
    const [anchorElPrice, setAnchorElPrice] = React.useState(null);  
    const handleClick = (evt) => setAnchorElPrice(evt.currentTarget);
    const handleClose = (evt) => {
        setAnchorElPrice(null);
        if (evt.target.value === 'All Prices') return;
        props.handlePriceChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <div className="menuButton" onClick={() => setAnchorElPrice(!anchorElPrice)}>
                PRICE RANGE
            </div>               
            <ul
                id="price-select"
                anchorElPrice={anchorElPrice}
                onClose={handleClose}
                hidden={!anchorElPrice}
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
