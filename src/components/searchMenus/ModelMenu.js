// Package
import React from 'react';
import uuid from 'react-uuid';

// Internal
import { getModelList, itemsSortByDisabled } from '../../utils/helpers';

export default function ModelMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    let maker; 
    if (props.productMaker !== "Harp Maker" && props.productMaker !== "All Makers") maker = [props.makesmodels.find(maker => maker.sellerName === props.productMaker)];
    const currentModels = props.products.map(product => product.productModel).sort(); 
    
    let models;
    if (maker) console.log('below', maker);
    if (maker?.length > 0) {models = Array.from(getModelList(Array.from(maker)))} else {models = Array.from(getModelList(props.makesmodels));}
    models=itemsSortByDisabled(models, currentModels).map(model => <option 
            name={model}
        >{model.trim()}</option>);

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
                    key={uuid()} 
                    name='All Models'
                >
                    All Models
                </li>  
                {models.map(model =>
                    <li key={uuid()} onClick={handleClose}                                   
                            disabled={!currentModels.find(currentModel => currentModel === model.props.name)}
                        >{model}
                    </li>
                )}
            </ul>     
        </div>
    );
}
