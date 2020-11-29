// packages
import React, { useContext } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';

export default function PublicationTypeMenu(props) {
    
    const handleClose = (evt) => {
        if (evt.target.value === 'All Publication Types') return;
        props.handlePublicationTypeChange(evt.target.getAttribute('name')); 
    };
    // get currency conversions
    async function getCurrency() {
        const multiplier = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=33d9a2db5c4410feb3f2');
        setCurrencyMultiplier(multiplier.data.USD_CAD);  
    }   
    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='publicationtype' 
                onClick={(e)=>{
                    props.handleclick(e); 
                }}
            >
                Publication Type
            </button>               
            <ul
                id="publicationtype-select"
                onClose={handleClose}
                hidden={!props.open}
                name='PublicationType Menu'
                className='plainTextSelectLine1'
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Publication Types'
                >All Publication Types</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Digital Downloads'
                >Digital Downloads</li>    
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Pop'
                >Pop</li> 
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Collections'
                >Collections</li>      
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Exercise Books'
                >Exercise Books</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Method Books'
                >Method Books</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Instructional Books'
                >Instructional Books</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='Scores'
                >Score</li>
            </ul>     
        </div>
    );
}
