// packages
import React, { useState, useEffect } from 'react';

// internal
import ProductSearchCss from '../styles/ProductSearch.css';
import ProductContainer from './ProductContainer';
import MakerMenu from './searchMenus/MakerMenu';
import ModelMenu from './searchMenus/ModelMenu';
import SizeMenu from './searchMenus/SizeMenu';
import FinishMenu from './searchMenus/FinishMenu';
import PriceMenu from './searchMenus/PriceMenu';
import LocationMenu from './searchMenus/LocationMenu';
import { 
    getFilteredProducts, 
    getMakerFromModel, 
    getSizeFromModel,
    findSizeWords,
    findProductType 
} from '../utils/helpers'

function ProductSearch(props) {
    const [allState, setAllState] = useState({
        selectionType: '',
        maker: 'All Makers',
        model: 'All Models',
        size: 'All Sizes',
        finish: 'All Finishes',
        price: 'All Prices',
        location: 'All Locations'
    });
    function resetDropDowns(exceptions) {
        if (!exceptions.includes('maker')) setAllState({...allState, maker: 'All Makers'});     
        if (!exceptions.includes('model')) setAllState({...allState, model: 'All Models'});
        if (!exceptions.includes('size')) setAllState({...allState, size: 'All Sizes'});
        if (!exceptions.includes('finish')) setAllState({...allState, size: 'All Finishes'});
        if (!exceptions.includes('price')) setAllState({...allState, size: 'All Prices'});
        if (!exceptions.includes('location')) setAllState({...allState, size: 'All Locations'});
    }
    
    function handleMakerSelection(maker) {
        //modelName.endsWith('Models:') catches when user selects all models from maker
        setAllState({...allState, 
            maker,
            model: "All Models",
            // selectionType: 'maker'
        });
    }
    function handleModelSelection(model) {
        //catches when user selects all models from maker
        if (model.toUpperCase() === 'ALL MODELS') {
            setAllState({...allState, 
                model: "All Models"
            });
            return;
        }

        setAllState({...allState, 
            model,
            // maker: getMakerFromModel(props.makesmodels, model),
            // size: findSizeWords(getSizeFromModel(props.makesmodels, model), findProductType(props.makesmodels, getMakerFromModel(props.makesmodels, model), model))
            // size: `${getSizeFromModel(props.makesmodels, model)} Strings`
        });
    }
    function handleSizeSelection(newProductSize) {
        // resetDropDowns('size');
        setAllState({...allState, 
            size: newProductSize
        });
    }
    function handleFinishSelection(newProductFinish) {
        resetDropDowns('finish');
        setAllState({...allState, 
            finish: newProductFinish==='All Finishes'?'All Finishes':newProductFinish,
            productType: 'all',
        });
    }
    function handlePriceSelection(newProductPrice) {
        setAllState({...allState, 
            price: newProductPrice
        });
    }
    function handleLocationSelection(newProductLocations) {
        setAllState({...allState, 
            location: newProductLocations
        });
    }

    function handleClear(evt) {
        setAllState({
            ...allState,
            finish: 'All Finishes',
            price: 'All Prices',
            location: 'All Locations',
            size: "All Sizes",
            maker: "All Makers",
            model: "All Models"
        });
    }
    const filteredProducts = getFilteredProducts(props.products, allState);
    
    return (
        <>       
        <h3 className='searchTitle'>Use the filters below to narrow your results.</h3>
        <div className='ProductSearchOuter'>
            <div className='mobileSearchLine1'> 
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
                    productMaker={allState.maker}
                    productSize={allState.size}
                    makesmodels={props.makesmodels}
                />
                
                <div className='arrow leftArrow line1LeftArrow'></div>
            </div>
            
            <div className="searchLine1Sub">
                <div className='arrow rightArrow line1SubRightArrow'></div>
                <div id="selectedSize" className={`search-grid-item`} value={allState.size}>
                    {allState.size}
                    {/* {allState.size==='All Sizes'?'':allState.size} */}
                </div>
                <div id="selectedMaker" className={`search-grid-item`} value={allState.maker}>
                    {allState.maker}
                    {/* {allState.maker==='All Makers'?'':allState.maker} */}
                </div>
                <div id="selectedModel" className={`search-grid-item`} value={allState.model}>
                    {allState.model}
                    {/* {allState.model==='All Models'?'':allState.model} */}
                </div>
                
                <div className='arrow leftArrow line1SubLeftArrow'></div>
            </div>
            </div>
            <h3 className='searchTitle'>Further refine your search.</h3>
            <div className='mobileSearchLine2'>
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
                        currentselected={allState.location?allState.location:'Harp All Locations'}
                    /> 
                    <div className='arrow leftArrow line2LeftArrow'></div>
                {/* </div>    */}       
            </div>
            <div className="searchLine2Sub">
                <div className={`arrow rightArrow line2SubRightArrow`}></div>
                <div id="selectedFinish" className={`search-grid-item`} value={allState.finish}>
                    {allState.finish}
                    {/* {allState.finish==='All Finishes'?'':allState.finish} */}
                </div>
                <div id="selectedPrice" className={`search-grid-item`} value={allState.price}>
                    {allState.price}
                    {/* {allState.price==='All Prices'?'':allState.price} */}
                </div>
                <div id="selectedAll Locations" className={`search-grid-item`} value={allState.location}>
                    {allState.location}
                    {/* {allState.location==='All Locations'?'':allState.location} */}
                </div>
                <div className={`arrow leftArrow line2SubLeftArrow`}></div>
                <div onClick={handleClear} className='clearSearch'>
                    <img onClick={handleClear} src='/img/clear_search.png' alt='clear filters'/>
                    <p>Clear All</p>
                </div>
            </div>
            </div>
            <ProductSearchCss />    
            <ProductContainer data-test="component-ProductContainer" filteredproducts={filteredProducts}/>              
        </div>
        </>
    );
}

export default ProductSearch;
