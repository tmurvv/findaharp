// Package
import React from 'react';
import uuid from 'react-uuid';
// Material-ui
import Button from '@material-ui/core/Button';
// Internal
import { getModelList, itemsSortByDisabled } from '../../utils/helpers';


export default function ModelMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentModels = props.products.map(product => product.productModel).sort();
    let models = Array.from(getModelList(props.makesmodels))
    
    models=itemsSortByDisabled(models, currentModels).map(model => <option 
            name={model}
        >{model.trim()}</option>);
        
    const handleClick = (evt) => {
        setAnchorEl(evt.currentTarget);
    };

    const handleClose = (evt) => {
        props.handleModelChange(evt.target.getAttribute('name'));
        setAnchorEl(null);
    };

    return (
        <div>
            <div className="menuButton" onClick={() => setAnchorEl(!anchorEl)}>
                HARP MODEL
            </div>               
            <ul
                id="model-select"
                anchorElPrice={anchorEl}
                onClose={handleClose}
                hidden={!anchorEl}
                name='Model Menu'
                className='plainTextSelectLine1'
            >
                
                <li 
                    onClick={handleClose} 
                    // key={uuid()} 
                    name='All Models'
                >All Models</li>
                
                {models.map(model =>
                    <li key={uuid()} onClick={handleClose}        
                            
                            disabled={!currentModels.find(currentModel => currentModel === model.props.name)}
                        >{model}         
                        {/* <Button
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            disabled={!currentModels.find(currentModel => currentModel === model.props.name)}
                        >{model}</Button>          */}
                    </li>
                )}
            </ul>     
        </div>
    );
}
