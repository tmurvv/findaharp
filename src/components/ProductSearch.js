// packages
import React, { useState} from 'react';

// design
// internal
import ProductSearchCss from '../styles/ProductSearch.css';
import ProductContainer from './ProductContainer';
import MakerMenu from './searchMenus/MakerMenu';
import ModelMenu from './searchMenus/ModelMenu';
import SizeMenu from './searchMenus/SizeMenu';
import FinishMenu from './searchMenus/FinishMenu';
import PriceMenu from './searchMenus/PriceMenu';
import LocationMenu from './searchMenus/LocationMenu';
import { getFilteredProducts } from '../utils/helpers'

function ProductSearch(props) {
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
    
    function handleMakerSelection(maker) {
        //modelName.endsWith('Models:') catches when user selects all models from maker
        setAllState({...allState, 
            maker,
            selectionType: 'maker'
        });
    }
    function handleModelSelection(model) {
        //modelName.endsWith('Models:') catches when user selects all models from maker
        setAllState({...allState, 
            model,
            selectionType: 'maker'
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
    console.log(allState)
    const filteredProducts = getFilteredProducts(props.products, allState);
    return (
        <>       
        <h3 className='searchTitle'>Use the filters below to narrow your results.</h3>
        <div className='ProductSearchOuter'>    
            <div className='searchLine1'>
               
                <div className={`arrow rightArrow line1RightArrow`}></div>
                <SizeMenu 
                    handleSizeChange = {handleSizeSelection}
                />
                <MakerMenu 
                    handleMakerChange = {handleMakerSelection} 
                    products={props.products}
                    makesmodels={props.makesmodels}
                />
                <ModelMenu 
                    handleModelChange = {handleModelSelection}
                    products={props.products}
                    producttype={allState.productType}
                    makesmodels={props.makesmodels}
                />
                
                <div className='arrow leftArrow line1LeftArrow'></div>
            </div>
             
            <div className="searchLine1Sub">
                <div className='arrow rightArrow line1SubRightArrow'></div>
                <div id="selectedSize" className={`search-grid-item`} value={allState.size}>
                    {allState.size==='Harp Size'?'':allState.size}
                </div>
                <div id="selectedMaker" className={`search-grid-item`} value={allState.maker}>
                    {allState.maker==='Harp Maker'?'':allState.maker}
                </div>
                <div id="selectedModel" className={`search-grid-item`} value={allState.model}>
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
                <div id="selectedFinish" className={`search-grid-item`} value={allState.finish}>
                    {allState.finish==='Finish'?'':allState.finish}
                </div>
                <div id="selectedPrice" className={`search-grid-item`} value={allState.price}>
                    {allState.price==='Price Range'?'':allState.price}
                </div>
                <div id="selectedLocation" className={`search-grid-item`} value={allState.location}>
                {allState.location==='Location'?'':allState.location}
                </div>
                <div className={`arrow leftArrow line2SubLeftArrow`}></div>
            </div>
            <ProductSearchCss />    
            <ProductContainer data-test="component-ProductContainer" filteredproducts={filteredProducts}/>              
        </div>
        </>
    );
}

export default ProductSearch;
