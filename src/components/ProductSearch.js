// packages
import React, { useState, useReducer, useEffect } from 'react';

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
    getSearchInfo,
    triggerLazy
} from '../utils/helpers';
import { searchReducer } from '../utils/reducers'

const initialState = {
    size: false,
    model: false,
    maker: false,
    finish: false, 
    price: false, 
    location: false
}
function ProductSearch(props) {
    const [menus, setMenus] = useState(initialState);
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
        const newState = {...allState, 
            maker,
            model: "All Models"
        }       
        setAllState({...allState, 
            maker,
            model: "All Models",
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleModelSelection(model) {
        // shortcut when user clicks on line between model listings
        if (model==='[object Object]') return;
        //catches when user selects all models from maker
        const newStateAllModels = {...allState, 
            model: "All Models"
        } 
        if (model.toUpperCase() === 'ALL MODELS') {
            setAllState({...allState, 
                model: "All Models",
                searchInfo: getSearchInfo(newStateAllModels)
            });
            setMenus(initialState);
            return;
        }
        const newState = {...allState, 
            model
        }
        setAllState({...allState, 
            model,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleSizeSelection(size) {
        const newState = {...allState, 
            size
        }
        setAllState({...allState, 
            size,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleFinishSelection(finish) {
        const newState = {...allState, 
            finish: finish==='All Finishes'?'All Finishes':finish,
            productType: 'all',
        }
        setAllState({...allState, 
            finish: finish==='All Finishes'?'All Finishes':finish,
            productType: 'all',
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handlePriceSelection(price) {
        const newState = {...allState, 
            price
        }
        setAllState({...allState, 
            price,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleLocationSelection(location) {
        const newState = {...allState, 
            location
        }
        setAllState({...allState, 
            location,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleClick(e) {
        switch(e.target.name) {
            case 'size':
                setMenus({
                    size: !menus.size,
                    maker: false,
                    model: false,
                    finish: false,
                    price: false,
                    location: false
                });
                break;
            case 'maker':
                setMenus({
                    size: false,
                    maker: !menus.maker,
                    model: false,
                    finish: false,
                    price: false,
                    location: false
                });
                break;
            case 'model':
                setMenus({
                    size: false,
                    maker: false,
                    model: !menus.model,
                    finish: false,
                    price: false,
                    location: false
                });
                break;
            case 'finish':
                setMenus({
                    size: false,
                    maker: false,
                    model: false,
                    finish: !menus.finish,
                    price: false,
                    location: false
                });
                break;
            case 'price':
                setMenus({
                    size: false,
                    maker: false,
                    model: false,
                    finish: false,
                    price: !menus.price,
                    location: false
                });
                break;
            case 'location':
                setMenus({
                    size: false,
                    maker: false,
                    model: false,
                    finish: false,
                    price: false,
                    location: !menus.location
                });
                break;
            default:
                setMenus({
                    size: false,
                    maker: false,
                    model: false,
                    finish: false,
                    price: false,
                    location: false
                });
          }
    }
    function handleClear(evt) {
        document.querySelector('.clearAll').style.display='none';
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
    function clearOneFilter(e) {
        let menuClick = e.target.name;
        const newState = {...allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo}
        const newSearchInfo = getSearchInfo(newState);
        if (menuClick==='finish') menuClick = 'finishe';
        setAllState({...allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo});
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
                {/* <div className={`arrow rightArrow line1RightArrow`}></div> */}
                <img src='./img/ribbon_black_full.png' alt="black background ribbon"/> 
                <SizeMenu 
                    handleSizeChange={handleSizeSelection} 
                    products={props.products}
                    makesmodels={props.makesmodels}
                    currentselected={allState.size?allState.size:'Harp Size'}
                    handleclick={handleClick}
                    open={menus.size}
                />
                <MakerMenu 
                    handleMakerChange = {handleMakerSelection}
                    open={!menus.maker} 
                    products={props.products}
                    makesmodels={props.makesmodels}
                    handleclick={handleClick}
                />
                <ModelMenu 
                    handleModelChange={handleModelSelection}
                    products={props.products}
                    productMaker={allState.maker}
                    productSize={allState.size}
                    makesmodels={props.makesmodels}
                    open={menus.model}
                    handleclick={handleClick}
                />
                {/* <div className='arrow leftArrow line1LeftArrow'></div> */}
            </div>
            <div className="searchLine1Sub">
                {/* <div className='arrow rightArrow line1SubRightArrow'></div> */}
                <div 
                    id="selectedSize" 
                    className={`search-grid-item`} 
                    value={allState.size}
                    onClick={()=>handleClick({target: {name: 'size'}})}
                >
                    {allState.size}
                    {allState.size!=="All Sizes"
                        ?<img 
                            name='size'
                            onClick={
                                (e)=>{
                                    e.stopPropagation(); 
                                    clearOneFilter({target:{name:'size'}});
                                }
                            } 
                            src='/img/clear_search.png' 
                            alt='clear filters'
                        />
                        :''
                    }
                </div>
                <div 
                    id="selectedMaker" 
                    className={`search-grid-item`} 
                    value={allState.maker}
                    onClick={()=>handleClick({target: {name: 'maker'}})}
                >
                    {allState.maker}
                    {allState.maker!=="All Makers"
                        ?<img 
                            name='maker'
                            onClick={
                                (e)=>{
                                    e.stopPropagation(); 
                                    clearOneFilter({target:{name:'maker'}});
                                }
                            }
                            src='/img/clear_search.png' 
                            alt='clear filters'
                        />
                        :''
                    }
                </div>
                <div 
                    id="selectedModel" 
                    className={`search-grid-item`} 
                    value={allState.model}
                    onClick={()=>handleClick({target: {name: 'model'}})}
                >
                    {allState.model}
                    {allState.model!=="All Models"
                        ?<img 
                        onClick={
                            (e)=>{
                                e.stopPropagation(); 
                                clearOneFilter({target:{name:'model'}});
                            }
                        }
                            src='/img/clear_search.png'
                            name='model' 
                            alt='clear model filters'
                        />
                        :''
                    }
                </div>
                {/* <div className='arrow leftArrow line1SubLeftArrow'></div> */}
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
                        handleclick={handleClick}
                        open={menus.finish}
                    />
                    <PriceMenu 
                        handlePriceChange = {handlePriceSelection}
                        products={props.products}
                        producttype={allState.productType}
                        makesmodels={props.makesmodels}
                        currentselected={allState.price?allState.price:'Harp Price'}
                        open={menus.price}
                        handleclick={handleClick}
                    />
                    <LocationMenu 
                        handleLocationChange = {handleLocationSelection}
                        currentselected={allState.location?allState.location:'Harp All Locations'}
                        open={menus.location}
                        handleclick={handleClick}
                    /> 
                    <div className='arrow leftArrow line2LeftArrow'></div>
                </div>
                <div className="searchLine2Sub">
                    <div className={`arrow rightArrow line2SubRightArrow`}></div>
                    <div 
                        id="selectedFinish" 
                        className={`search-grid-item`} 
                        value={allState.finish}
                        onClick={()=>handleClick({target: {name: 'finish'}})}
                    >
                        {allState.finish}
                        {allState.finish!=="All Finishes"
                            ?<img 
                                name='finish'
                                onClick={
                                    (e)=>{
                                        e.stopPropagation(); 
                                        clearOneFilter({target:{name:'finish'}});
                                    }
                                }
                                src='/img/clear_search.png' 
                                alt='clear filters'
                            />
                            :''
                        }
                    </div>
                    <div 
                        id="selectedPrice" 
                        className={`search-grid-item`} 
                        value={allState.price}
                        onClick={()=>handleClick({target: {name: 'price'}})}
                    >
                        {allState.price}
                        {allState.price!=="All Prices"
                            ?<img 
                                name='price'
                                onClick={
                                    (e)=>{
                                        e.stopPropagation(); 
                                        clearOneFilter({target:{name:'price'}});
                                    }
                                }
                                src='/img/clear_search.png' 
                                alt='clear filters'
                            />
                            :''
                        }
                        
                    </div>
                    <div 
                        id="selectedAll Locations" 
                        className={`search-grid-item`} 
                        value={allState.location}
                        onClick={()=>handleClick({target: {name: 'location'}})}
                    >
                        {allState.location}
                        {allState.location!=="All Locations"
                            ?<img 
                                name='locations'
                                onClick={
                                    (e)=>{
                                        e.stopPropagation(); 
                                        clearOneFilter({target:{name:'location'}});
                                    }
                                }
                                src='/img/clear_search.png' 
                                alt='clear filters'
                            />
                            :''
                        }
                    </div>
                    <div className={`arrow leftArrow line2SubLeftArrow`}></div>
                </div>
            </div>
            {/* <h5 style={{textAlign: 'center', marginBlockEnd:'0', marginTop: '5px', marginBottom:'-10px'}}>Website Under Construction-Sample Listings</h5> */}
            <div className='selected'>
                <p>
                    SHOWING&nbsp;&nbsp;{allState.searchInfo.trim().substr(allState.searchInfo.trim().length-1)==='|'?allState.searchInfo.trim().substr(0,allState.searchInfo.trim().length-1):allState.searchInfo}
                </p>
                <div onClick={handleClear} style={{display: 'none'}} className='clearAll clearSearch'>
                    <img onClick={handleClear} src='/img/clear_search.png' alt='clear filters'/>
                    <p>Clear</p> 
                </div>
            </div>
            <h3 className='searchTitle'>Website Under Construction-Sample Listings</h3>
            <ProductSearchCss />
            <ProductContainer 
                data-test="component-ProductContainer" 
                filteredproductscontainer={filteredProducts} 
                searchInfo={allState.searchInfo}
                allstate={allState}
            />              
        </div>
        </>
    );
}

export default ProductSearch;
