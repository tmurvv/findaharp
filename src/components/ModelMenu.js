// Package
import React from 'react';
import uuid from 'react-uuid';
// Material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// Internal
import { getModelList, itemsSortByDisabled } from '../utils/helpers';


export default function ModelMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentModels = props.products.map(product => product.productModel).sort();
    let models = Array.from(getModelList(props.makesmodels, props.producttype))
    // console.log(models)
    
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
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Harp Model
            </Button>               
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                name='Maker Menu'
            >
                <MenuItem onClick={handleClose}>
                    <Button                      
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        name='AllSelect Harp Model'
                    >All Models</Button>
                </MenuItem>
                {models.map(model =>
                    <MenuItem key={uuid()} onClick={handleClose}>        
                        <Button
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            disabled={!currentModels.find(currentModel => currentModel === model.props.name)}
                        >{model}</Button>         
                    </MenuItem>
                )}
            </Menu>     
        </div>
    );
}
