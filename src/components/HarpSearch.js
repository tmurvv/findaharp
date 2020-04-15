// packages
import React, { useState} from 'react';

// design
// internal
import HarpSearchCss from '../styles/harpSearch.css';
import HarpsContainer from './HarpsContainer';
import MakerMenu from './MakerMenu';
import ModelMenu from './ModelMenu';
import SizeMenu from './SizeMenu';
import FinishMenu from './FinishMenu';
import PriceMenu from './PriceMenu';
import LocationMenu from './LocationMenu';
import { getFilteredProducts } from '../utils/helpers'

function HarpSearch(props) {
    const [allState, setAllState] = useState({
        selectionType: '',
        maker: 'Harp Maker',
        model: 'Harp Model',
        size: 'Harp Size',
        finish: 'Finish',
        price: 'Price Range',
        location: 'Location'
    });
    function resetDropDowns(exceptions) {
        if (!exceptions.includes('maker')) setAllState({...allState, maker: 'Harp Maker'});     
        if (!exceptions.includes('model')) setAllState({...allState, model: 'Harp Model'});
        if (!exceptions.includes('size')) setAllState({...allState, size: 'Harp Size'});
        if (!exceptions.includes('finish')) setAllState({...allState, size: 'Finish'});
        if (!exceptions.includes('price')) setAllState({...allState, size: 'Price Range'});
        if (!exceptions.includes('location')) setAllState({...allState, size: 'Location'});
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
        // resetDropDowns('size');
        setAllState({...allState, 
            size: newProductSize,
            selectionType: 'size'
        });
    }
    function handleFinishSelection(newProductFinish) {
        console.log('prodfinish', newProductFinish);
        resetDropDowns('finish');
        setAllState({...allState, 
            finish: newProductFinish==='All Finish'?'Finish':newProductFinish,
            selectionType: newProductFinish==='All Finish'?'':'finish',
            productType: 'all',
        });
    }
    function handlePriceSelection(newProductPrice) {
        console.log('prodprice', newProductPrice)
        setAllState({...allState, 
            price: newProductPrice,
            selectionType: newProductPrice==='All Prices'?'':'price'
        });
    }
    function handleLocationSelection(newProductLocation) {
        console.log('prodlocation', newProductLocation)
        setAllState({...allState, 
            location: newProductLocation,
            selectionType: newProductLocation==='All Locations'?'':'location'
        });
    }
    const filteredProducts = getFilteredProducts(props.products, allState);
    return (
        <>       
        <h3 className='searchTitle'>Use the filters below to narrow your results.</h3>
        <div className='harpSearchOuter'>    
            <div className='searchLine1'>
                {/* <div className='flexSB'> */}
                    <div className={`arrow rightArrow line1RightArrow`}></div>
                    <SizeMenu 
                        handleSizeChange = {handleSizeSelection}
                        currentselected={allState.size?allState.size:'Harp Size'}
                    />
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
                    
                    <div className='arrow leftArrow line1LeftArrow'></div>
                {/* </div>    */}
            </div>
             
            <div className="searchLine1Sub">
                <div className='arrow rightArrow line1SubRightArrow'></div>
                <div id="selectedSize" value={allState.size}>
                    {allState.size==='Harp Size'?'':allState.size}
                </div>
                <div id="selectedMaker" value={allState.maker}>
                    {allState.maker==='Harp Maker'?'':allState.maker}
                </div>
                <div id="selectedModel" value={allState.model}>
                    {allState.model==='Harp Model'?'':allState.model}
                </div>
                
                <div className='arrow leftArrow line1SubLeftArrow'></div>
            </div>
            <h3 className='searchTitle'>Further refine your search.</h3>
            <div className='searchLine2'>
                <div className='arrow rightArrow line2RightArrow'></div>
                {/* <div className='flexSB'> */}
                    <FinishMenu 
                        handleFinishChange = {handleFinishSelection} 
                        products={props.products}
                        makesmodels={props.makesmodels}
                        currentselected={allState.finish?allState.finish:'Harp Finish'}
                    />
                    <PriceMenu 
                        handlePriceChange = {handlePriceSelection}
                        products={props.products}
                        producttype={allState.productType}
                        makesmodels={props.makesmodels}
                        currentselected={allState.price?allState.price:'Harp Price'}
                    />
                    <LocationMenu 
                        handleLocationChange = {handleLocationSelection}
                        currentselected={allState.location?allState.location:'Harp Location'}
                    /> 
                    <div className='arrow leftArrow line2LeftArrow'></div>
                {/* </div>    */}
            </div> 
            <div className="searchLine2Sub">
                <div className={`arrow rightArrow line2SubRightArrow`}></div>
                <div id="selectedFinish" value={allState.finish}>
                    {allState.finish==='Finish'?'':allState.finish}
                </div>
                <div id="selectedPrice" value={allState.price}>
                    {allState.price==='Price Range'?'':allState.price}
                </div>
                <div id="selectedLocation" value={allState.location}>
                {allState.location==='Location'?'':allState.location}
                </div>
                <div className={`arrow leftArrow line2SubLeftArrow`}></div>
            </div>
            <HarpSearchCss />    
            <HarpsContainer data-test="component-harpscontainer" filteredproducts={filteredProducts}/>              
        </div>
        </>
    );
}

export default HarpSearch;
