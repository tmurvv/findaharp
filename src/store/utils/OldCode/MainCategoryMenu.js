//Packages
import React from 'react';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

export default function MainCategoryMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Categories') return;
        props.handleCategoryChange(evt.target.getAttribute('name')); 
    };

    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='category' 
                onClick={(e)=>{props.handleclick(e);}}
            >
                What are you looking for?
            </button>              
            <ul
                id="category-select"
                onClose={handleClose}
                name='Category Menu'
                className='plainTextSelectLine1'
                style={{zIndex: 6000}}
                hidden={!props.open}
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Lever and Pedal Harp Music'
                >All Harp Music</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='Lever Harp Music Only'
                >Lever Harp Music Only</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='Pedal Harp Music Only'
                >Pedal Harp Music Only</li>      
                <li 
                    onClick={handleClose}
                    // key={uuid()}
                    name='Strings'
                >Strings</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Accessories'
                >Accessories</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='CDs'
                >CDs</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Gifts'
                >Gifts</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Other'
                >Other</li>             
            </ul>     
        </div>
    );
}
