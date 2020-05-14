// packages
import React, { useState, useReducer, useEffect, useRef } from 'react';

// internal
import ProductSearchCss from '../styles/ProductSearch.css';
import ProductContainer from './ProductContainer';
import TestGrid from './TestGrid';
import MakerMenu from './searchMenus/MakerMenu';
import ModelMenu from './searchMenus/ModelMenu';
import SizeMenu from './searchMenus/SizeMenu';
import FinishMenu from './searchMenus/FinishMenu';
import PriceMenu from './searchMenus/PriceMenu';
import LocationMenu from './searchMenus/LocationMenu';
import { 
    getFilteredProducts, 
    getSearchInfo,
    triggerLazy
} from '../utils/helpers';
import { searchReducer } from '../utils/reducers'

const initialState = {
    sizeOpen: false,
    finishOpen: false
}
function ProductSearch(props) {
    const [openMenu] = useReducer(searchReducer, initialState);
    const [allState, setAllState] = useState({
        selectionType: '',
        maker: 'All Makers',
        model: 'All Models',
        size: 'All Sizes',
        finish: 'All Finishes',
        price: 'All Prices',
        location: 'All Locations',
        searchInfo: 'All Harps'
    });   
    function handleMakerSelection(maker) {
        setAllState({...allState, 
            maker,
            model: "All Models",
            searchInfo: getSearchInfo(allState.searchInfo, allState.maker, maker)
        });
    }
    function handleModelSelection(model) {
        //catches when user selects all models from maker
        if (model.toUpperCase() === 'ALL MODELS') {
            setAllState({...allState, 
                model: "All Models",
                searchInfo: getSearchInfo(allState.searchInfo, allState.model, model)
            });
            return;
        }
        setAllState({...allState, 
            model,
            searchInfo: getSearchInfo(allState.searchInfo, allState.model, model)
        });
    }
    function handleSizeSelection(size) {
        setAllState({...allState, 
            size,
            searchInfo: getSearchInfo(allState.searchInfo, allState.size, size)
        });
    }
    function handleFinishSelection(finish) {
        setAllState({...allState, 
            finish: finish==='All Finishes'?'All Finishes':finish,
            productType: 'all',
            searchInfo: getSearchInfo(allState.searchInfo, allState.finish, finish)
        });
    }
    function handlePriceSelection(price) {
        setAllState({...allState, 
            price,
            searchInfo: getSearchInfo(allState.searchInfo, allState.price, price)
        });
    }
    function handleLocationSelection(location) {
        setAllState({...allState, 
            location,
            searchInfo: getSearchInfo(allState.searchInfo, allState.location, location)
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
            model: "All Models",
            searchInfo: 'All Harps'
        });
    }
    useEffect(() => {
        triggerLazy();
    });

    const filteredProducts = getFilteredProducts(props.products, allState);
    
    return (
        <>       
        <h3 className='searchTitle'>Use the filters below to narrow your results.</h3>
        <div className='productSearchOuter'>
            <div className='mobileSearchLine1'> 
            <div className='searchLine1'>  
                <div className={`arrow rightArrow line1RightArrow`}></div>
                <SizeMenu 
                    handleSizeChange = {handleSizeSelection}
                    onClick={() => dispatch({type: 'size'})}
                    open={openMenu.sizeOpen}
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
                </div>
                <div id="selectedMaker" className={`search-grid-item`} value={allState.maker}>
                    {allState.maker}
                </div>
                <div id="selectedModel" className={`search-grid-item`} value={allState.model}>
                    {allState.model}
                </div>
                <div className='arrow leftArrow line1SubLeftArrow'></div>
            </div>
            </div>
            <h3 className='searchTitle'>Further refine your search.</h3>
            <div className='mobileSearchLine2'>
            <div className='searchLine2'>
                <div className='arrow rightArrow line2RightArrow'></div>
                    <FinishMenu 
                        handleFinishChange = {handleFinishSelection} 
                        products={props.products}
                        makesmodels={props.makesmodels}
                        currentselected={allState.finish?allState.finish:'Harp Finish'}
                        onClick={() => dispatch({type: 'finish'})}
                        open={openMenu.finishOpen}
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
            <h3>Searching {allState.searchInfo.trim().substr(allState.searchInfo.trim().length-1)===','?allState.searchInfo.trim().substr(0,allState.searchInfo.trim().length-1):allState.searchInfo}</h3>
            <ProductSearchCss />
            {/* <TestGrid 
                data-test="component-ProductContainer" 
                filteredproducts={filteredProducts} 
                searchInfo={allState.searchInfo}
                // searchInfo={allState.searchInfo}
            />               */}
            <ProductContainer 
                data-test="component-ProductContainer" 
                filteredproducts={filteredProducts} 
                searchInfo={allState.searchInfo}
                // searchInfo={allState.searchInfo}
            />              
        </div>
        </>
    );
}

export default ProductSearch;
