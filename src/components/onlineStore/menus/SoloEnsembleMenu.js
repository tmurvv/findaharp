import React from 'react';

export default function SoloEnsembleMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Solo/Ensembles') return;
        props.handleSoloEnsembleChange(evt.target.getAttribute('name')); 
    };

    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='soloensemble' 
                onClick={(e)=>{props.handleclick(e);}}
                style={{color: '#000000'}}
            >Solo/Ensemble</button>
            <ul
                id="soloensemble-select"
                onClose={handleClose}
                hidden={!props.open}
                name='SoloEnsemble Menu'
                className='plainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Solo/Ensemble'       
                >All Solo/Ensemble</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='Harp Solo'
                >Harp Solo</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Method Books'
                >Method Books</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Exercise Books'
                >Exercise Books</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Instructional Books'
                >Instructional Books</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Harp Ensemble'
                >Harp Ensemble</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Flute/Harp'
                >Flute/Harp</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Violin/Harp'
                >Violin/Harp</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Voice/Harp'
                >Voice/Harp</li>               
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Other Ensembles'
                >Other Ensembles</li>         
            </ul>
        </div>
    );
}
