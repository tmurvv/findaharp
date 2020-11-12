
// packages
import React, { useContext } from 'react';
import uuid from 'react-uuid';

export default function BrandsMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Brandss') return;
        props.handleBrandsChange(evt.target.getAttribute('name')); 
    };
      
    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='brands' 
                onClick={(e)=>{
                    props.handleclick(e); 
                }}
                style={{color: '#000000'}}
            >
                Brands
            </button>               
            <ul
                id="brands-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Brands Menu'
                className='plainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Brands'
                >All Brands</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Bow Brand Pedal Gut'
                >Bow Brand Pedal Gut</li>      
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Lever Gut'
                >Bow Brand Lever Gut</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Concedo Gut'
                >Bow Brand Concedo Gut</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Burgundy Gut'
                >Bow Brand Burgundy Gut</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Pedal Nylon'
                >Bow Brand Pedal Nylon</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Pedal Bass Wire (silver-plated)'
                >Bow Brand Pedal Bass Wire (silver-plated)</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Pedal Bass Wire (tarnish-resistant)'
                >Bow Brand Pedal Bass Wire (tarnish-resistant)</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Lever Bass Wire'
                >Bow Brand Lever Bass Wire</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Professional Lever Wire'
                >Bow Brand Professional Lever Wire</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Lever Nylon'
                >Bow Brand Lever Nylon</li>
            </ul>     
        </div>
    );
}
