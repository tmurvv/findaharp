// packages
import React, { useState} from 'react';

// design
// internal
import HarpSearchCss from '../styles/harpSearch.css';
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
        console.log('prodsize', newProductSize)
        resetDropDowns('size');
        setAllState({...allState, 
            size: newProductSize==='All Sizes'?'Select Harp Size':newProductSize,
            selectionType: newProductSize==='All Sizes'?'':'size',
            productType: 'all',
            maker: 'Select Harp Maker',
            model: 'Select Harp Model'
        });
    }
    const filteredProducts = getFilteredProducts(props.products, allState);
    return (
        <>       
        
        <h3 className='searchTitle'>Narrow your results with one, some, or all of these filters.</h3>
        <div className='harpSearchOuter'>    
            <div className='searchLine1'>
                <div className='flexSE'>
                    <MakerMenu 
                        handleModelChange = {handleModelSelection} 
                        products={props.products}
                        makesmodels={props.makesmodels}
                        currentselected={allState.maker?allState.maker:'Harp Maker'}
                    />
                    <ModelMenu 
                        handleModelChange = {handleModelSelection}
                        products={props.products}
                        producttype={allState.productType}
                        makesmodels={props.makesmodels}
                        currentselected={allState.model?allState.model:'Harp Model'}/>
                    <SizeMenu 
                        handleSizeChange = {handleSizeSelection}
                        currentselected={allState.size?allState.size:'Harp Size'}
                    />
                </div>   
            </div> 
            <div className="searchLine1Sub">
                <div className='arrow rightArrow'></div>
                <div id="selectedMaker" value={allState.maker}>
                    {allState.maker.startsWith("Harp")?"Not Selected":allState.maker}
                </div>
                <div id="selectedModel" value={allState.model}>
                    {allState.maker.startsWith("Harp")?"Not Selected":allState.model}
                </div>
                <div id="selectedSize" value={allState.size}>
                    {allState.maker.startsWith("Harp")?"Not Selected":allState.size}
                </div>
                <div className='arrow leftArrow'></div>
            </div>
            <div className='searchLine2'>
                <div className='flexSE'>
                    <MakerMenu 
                        handleModelChange = {handleModelSelection} 
                        products={props.products}
                        makesmodels={props.makesmodels}
                        // currentselected={allState.maker?allState.maker:'Harp Finish'}
                        currentselected='Harp Finish'
                    />
                    <ModelMenu 
                        handleModelChange = {handleModelSelection}
                        products={props.products}
                        producttype={allState.productType}
                        makesmodels={props.makesmodels}
                        currentselected='Harp Price'/>
                        {/* currentselected={allState.model?allState.model:'Harp Price'}/> */}
                    <SizeMenu 
                        handleSizeChange = {handleSizeSelection}
                        currentselected='Harp Location'
                        // currentselected={allState.size?allState.size:'Harp Location'}
                    />
                </div>   
            </div> 
            <div className="searchLine2Sub">
                <div className='arrow rightArrow'></div>
                <div id="selectedMaker" value={allState.maker}>
                    {allState.maker.startsWith("Harp")?"Selected":allState.maker}
                </div>
                <div id="selectedModel" value={allState.model}>
                    {allState.maker.startsWith("Harp")?"Selected":allState.model}
                </div>
                <div id="selectedSize" value={allState.size}>
                    {allState.maker.startsWith("Harp")?"Selected":allState.size}
                </div>
                <div className='arrow leftArrow'></div>
            </div>
            <HarpSearchCss />    
            <HarpsContainer data-test="component-harpscontainer" filteredproducts={filteredProducts}/>              
        </div>
        </>
    );
}

export default HarpSearch;
