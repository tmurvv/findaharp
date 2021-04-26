import React from 'react';

export default function FinishMenu(props) {
    const handleClose = (evt) => {
        if (evt.target.value === 'All Finishes') return;
        props.handleFinishChange(evt.target.getAttribute('name')); 
    };

    return (
        <div className='relative'>
            <button 
                className="menuButton" 
                name='finish' 
                onClick={(e)=>{props.handleclick(e);}}
                style={{color: '#000000'}}
            >FINISH</button>
            <ul
                id="finish-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Finish Menu'
                className='plainTextSelectLine2 builderplainTextSelectLine2'
            >
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Finishes'       
                >All Finishes</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()}
                    name='Mahogany'
                >Mahogany</li>      
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Natural'
                >Natural</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Gold'
                >Gold</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Ebony'
                >Ebony</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Maple'
                >Maple</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Walnut'
                >Walnut</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Cherry'
                >Cherry</li>
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Bubinga'
                >Bubinga</li>               
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Zebrawood'
                >Zebrawood</li>               
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Blue'
                >Blue</li>              
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='Sapele'
                >Sapele</li>              
            </ul>
        </div>
    );
}
