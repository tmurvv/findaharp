import React from 'react';
import uuid from 'react-uuid';

export default function SoloEnsembleMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Lever/Pedal/Ens') return;
        props.handleSoloEnsembleChange(evt.target.getAttribute('name')); 
    };

    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='Lever/Pedal/Ens' 
                onClick={(e)=>{props.handleclick(e);}}
            >Lever/Pedal/Ens</button>
            <ul
                id="soloensemble-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Lever/Pedal/Ens Menu'
                className='storePlainTextSelectLine1'
            >
                <li
                    onClick={handleClose}
                    // key={uuid()} 
                    name='All Lever/Pedal/Ens'       
                >All Lever/Pedal/Ens</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='Lever Harp'
                >Lever Harp</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='Pedal Harp'
                >Pedal Harp</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='Harp Solo'
                >Harp Solo</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Harp Ensemble'
                >Harp Ensemble</li>
                <li 
                    onClick={handleClose} 
                    key={uuid()}
                    name='Pop'
                >Pop</li> 
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Flute/Harp'
                >Flute/Harp</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Concertos'
                >Concertos</li>
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
