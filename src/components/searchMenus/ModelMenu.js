// Package
import React from 'react';
import uuid from 'react-uuid';

// Internal
import { getModelList, itemsSortByDisabled } from '../../utils/helpers';

export default function ModelMenu(props) {
    let maker; 
    if (props.productMaker !== "Harp Maker" && props.productMaker !== "All Makers") maker = props.makesmodels.find(maker => maker.sellerName === props.productMaker);
    
    const currentModels = props.products.map(product => product.productModel).sort(); 
    let models;
    
    if (maker) maker = [maker];
    if (maker && maker.length > 0) {
        models = Array.from(getModelList(maker))
    } else {
        models = Array.from(getModelList(props.makesmodels, props.productSize));
    }
    // BREAKING
    // models = itemsSortByDisabled(models, currentModels);
    models=itemsSortByDisabled(models, currentModels).map(model => <p 
            name={model}
        >{model.trim()}</p>);

    const handleClose = (evt) => {
        props.handleModelChange(evt.target.getAttribute('name'));
    };
    return (
        <div>
            <button 
                className="menuButton" 
                name='model' 
                onClick={(e)=>{console.log('click');props.handleclick(e);}}
            >
                HARP MODEL
            </button>
            <ul
                id="model-select"
                onClose={handleClose}
                hidden={!props.open}
                name='Model Menu'
                className='plainTextSelectLine1'
                style={{zIndex: 6000}}
            >
                <li 
                    onClick={handleClose} 
                    key={uuid()} 
                    name='All Models'
                >
                    {props&&props.productSize&&props.productSize.toUpperCase()!=='ALL SIZES'&&props.productSize.toUpperCase!=='HARP SIZE'?props.productSize:"All Models"}
                </li>  
                {models.map(model =>
                    <li 
                        key={uuid()} 
                        name={model}
                        onClick={currentModels.find(currentModel => currentModel === model.props.name)?handleClose:()=>alert(`No listings for ${model.props.name}.`)}                                   
                        style={!currentModels.find(currentModel => currentModel === model.props.name)?{color: "#c3c3c3"}:{color:"#fafbfc"}} // BREAKING
                        >{model}
                    </li>
                )}
            </ul>  
        </div>
    );
}

ModelMenu.getInitialProps = (props) => {
    console.log('inminin', props);
    return props;
}