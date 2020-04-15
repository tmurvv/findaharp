//Packages
import React from 'react';

export default function FinishMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);  
    const handleClick = (evt) => setAnchorEl(evt.currentTarget);
    const handleClose = (evt) => {
        setAnchorEl(null);
        if (evt.target.value === 'All Finishes') return;
        props.handleFinishChange(evt.target.getAttribute('name')); 
    };

    return (
        <div>
            <div className="menuButton" onClick={() => setAnchorEl(!anchorEl)}
            >FINISH</div>            
            <ul
                id="finish-select"
                anchorEl={anchorEl}
                onClose={handleClose}
                hidden={!anchorEl}
                name='Finish Menu'
                className='plainTextSelectLine2'
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
                    name='Other'
                >Other</li>               
            </ul>
        </div>
    );



    // return (
    //     <div>             
    //         <select
    //             id="size-select"
    //             anchorEl={anchorEl}
    //             onClose={handleClose}
    //             name='Finish Menu'
    //             className='plainTextSelect'
    //         >
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()} 
    //                 name='All Finishes'       
    //             >FINISH</option>
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()}
    //                 name='Mahogany'
    //                 selected={props.currentselected.startsWith('Large')}
    //             >Mahogany</option>      
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()} 
    //                 name='Natural'
    //                 selected={props.currentselected.startsWith('Medium')}
    //             >Natural</option>
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()} 
    //                 name='Ebony'
    //             >Ebony</option>
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()} 
    //                 name='Maple'
    //                 selected={props.currentselected.startsWith('Lever')}
    //             >Maple</option>
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()} 
    //                 name='Walnut'
    //                 selected={props.currentselected.startsWith('Concert')}
    //             >Walnut</option>
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()} 
    //                 name='Cherry'
    //                 selected={props.currentselected.startsWith('Semi')}
    //             >Cherry</option>
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()} 
    //                 name='Bubinga'
    //                 selected={props.currentselected.startsWith('Small Pedal')}
    //             >Bubinga</option>               
    //             <option 
    //                 onClick={handleClose} 
    //                 // key={uuid()} 
    //                 name='Other'
    //                 selected={props.currentselected.startsWith('Small Pedal')}
    //             >Other</option>               
    //         </select>   
    //     </div>
    // );
}
