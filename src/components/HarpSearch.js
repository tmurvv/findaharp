// packages
import React, { useState} from 'react';

// internal
import HarpsContainer from './HarpsContainer';
import MakerMenu from './MakerMenu';
import ModelMenu from './ModelMenu';
import SizeMenu from './SizeMenu';
import { getFilteredProducts } from '../utils/helpers'

function HarpSearch(props) {
    const [allState, setAllState] = useState({
        productType: 'all',
        selectionType: '',
        maker: 'Select Harp Maker',
        model: 'Select Harp Model',
        size: 'Select Harp Size'
    });
    function resetDropDowns(exceptions) {
        if (!exceptions.includes('maker')) setAllState({...allState, maker: 'Select Harp Maker'});     
        if (!exceptions.includes('model')) setAllState({...allState, model: 'Select Harp Model'});
        if (!exceptions.includes('size')) setAllState({...allState, size: 'Select Harp Size'});
    }
    function handlePedalLeverChange(e) {
        // get text for menu buttons
        let text;
        if (e.target.value && e.target.value === 'all') text = 'Select Harp Model';       
        if (e.target.value && e.target.value === 'pedal') text ='Select Pedal Model';
        if (e.target.value && e.target.value === 'lever') text = 'Select Lever Model';      
        // update state
        setAllState({...allState, 
            productType: e.target.value,
            selectionType: '',
            size: 'Select Harp Size',
            maker: 'Select Harp Maker',
            model: text
        }); 
    }
    
    function handleModelSelection(modelName, maker) {
        //modelName.endsWith('Models:') catches when user selects all models from maker
        setAllState({...allState, 
            maker: modelName&&modelName.endsWith('Models:')?modelName.substr(4,(modelName.length-12)):maker,
            model: modelName&&modelName.endsWith('Models:')?'':modelName,
            selectionType: modelName&&modelName.endsWith('Models:')?'maker':'model',
            productType: 'all'
        });
    }
    function handleSizeSelection(newProductSize) {
        resetDropDowns('size');
        setAllState({...allState, 
            size: newProductSize==='All Sizes'?'Select Harp Size':newProductSize,
            selectionType: newProductSize==='All Sizes'?'':'size',
            productType: 'all'
        });
    }
    const filteredProducts = getFilteredProducts(props.products, allState);
    return (       
        <div className='harpSearchOuter'>
            <hr></hr>
            <h3>What harp will you discover? Search here...</h3>
            <div className='harpSearchInner'>
                <div className = 'harpLeverRadio marginM'>
                    <input 
                        type="radio" 
                        name="harpLever"
                        value="all"
                        onChange= {handlePedalLeverChange}
                        checked={allState.productType==='all'}
                    /> All Harps
                    <input 
                        type="radio" 
                        name="harpLever"
                        value="lever"
                        onChange={handlePedalLeverChange}
                        checked={allState.productType==='lever'}
                    /> Lever Harps
                    <input 
                        type="radio" 
                        name="harpLever"
                        value="pedal"
                        onChange={handlePedalLeverChange}
                        checked={allState.productType==='pedal'}
                    /> Pedal Harps
                </div>
                <div className='marginM flexSE'>
                    <MakerMenu 
                        handleModelChange = {handleModelSelection} 
                        products={props.products}
                        makesmodels={props.makesmodels}
                        currentselected={allState.maker?allState.maker:'Select Harp Maker'}
                    />
                    <ModelMenu 
                        handleModelChange = {handleModelSelection}
                        products={props.products}
                        makesmodels={props.makesmodels}
                        currentselected={allState.model?allState.model:'Select Harp Model'}/>
                    <SizeMenu 
                        handleSizeChange = {handleSizeSelection}
                        currentselected={allState.size?allState.size:'Select Harp Size'}
                    />
                </div>           
                <HarpsContainer data-test="component-harpscontainer" filteredproducts={filteredProducts}/>               
            </div>                   
        </div>
    );
}

export default HarpSearch;
