import React, { useEffect } from 'react';
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
                onClick={(e)=>{props.handleclick(e);}}
                style={{color: '#000000'}}
            >Brands</button>               
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
                    name='Bow Brand Nylon'
                >Bow Brand Nylon</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Artist Nylon'
                >Artist Nylon</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Silver-Plated Pedal Bass Wires'
                >Silver-Plated Pedal Bass Wire</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Tarnish-Resistant Pedal Bass Wires'
                >Tarnish-Resistant Pedal Bass Wires</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Bow Brand Lever Bass Wires'
                >Bow Brand Lever Bass Wires</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Professional Lever Bass Wires'
                >Professional Lever Bass Wires</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Savarez KF Composite'
                >Savarez KF Composite</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Nylon Monofilament'
                >Nylon Monofilament</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Silkgut (synthetic)'
                >Silkgut (synthetic)</li>    
            </ul>     
        </div>
    );
}
