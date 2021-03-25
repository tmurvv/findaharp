
// packages
import React, { useContext } from 'react';
import uuid from 'react-uuid';

export default function BrandsMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Brands') return;
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
                className='storePlainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Brands'
                >All Brands</li>      
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Bow Brand Pedal Natural Gut'
                >Bow Brand Pedal Natural Gut</li>      
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Lever Natural Gut'
                >Bow Brand Lever Natural Gut</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Concedo Gut'
                >Concedo Gut</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Burgundy Gut'
                >Burgundy Gut</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Pedal Nylon'
                >Bow Brand Pedal Nylon</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Lever Nylon'
                >Bow Brand Lever Nylon</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Artist Nylon'
                >Artist Nylon</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Silver-Plated Pedal Bass Wire'
                >Silver-Plated Pedal Bass Wire</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Pedal Bass Wire (Tarnish-Resistant)'
                >Pedal Bass Wire (Tarnish-Resistant)</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Lever Bass Wire'
                >Bow Brand Lever Bass Wire</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Professional Lever Bass Wire'
                >Professional Lever Bass Wire</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='KF Composite'
                >Saverez KF Composite</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Nylon Monofilament'
                >Nylon Monofilament</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Silkgut'
                >Silkgut</li>
                               
            </ul>     
        </div>
    );
}
