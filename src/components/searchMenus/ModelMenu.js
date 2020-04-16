// Package
import React from 'react';
import uuid from 'react-uuid';

// Internal
import { getModelList, itemsSortByDisabled } from '../../utils/helpers';

export default function ModelMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    let maker; 
    if (props.productMaker !== "Harp Maker" && props.productMaker !== "All Makers") maker = props.makesmodels.find(maker => maker.sellerName === props.productMaker);
    
    const currentModels = props.products.map(product => product.productModel).sort(); 
    let models;
    if (maker) maker = [maker];
    if (maker && maker.length > 0) {
        models = Array.from(getModelList(maker))
    } else {
        models = Array.from(getModelList(props.makesmodels));
    }
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
                    <li 
                        key={uuid()} 
                        onClick={handleClose}                                   
                        disabled={!currentModels.find(currentModel => currentModel === model.props.name)}
                        style={!currentModels.find(currentModel => currentModel === model.props.name)?{color: "#d3d3d3"}:{color:"#fafbfc"}}
                        >{model}
                    </li>
                )}
            </ul>     
        </div>
    );
}
