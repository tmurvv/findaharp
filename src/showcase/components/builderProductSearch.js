// packages
import React, { 
    useState, 
    useContext, 
    useEffect, 
    useRef } from 'react';
import Router from 'next/router';
import axios from 'axios';

// internal
import BuilderProductSearchCss from '../styles/builderProductSearch.css';
import ProductContainer from './builderProductContainer';
import BuilderMakerMenu from './menus/BuilderMakerMenu';
import BuilderModelMenu from './menus/BuilderModelMenu';
import SizeMenu from './menus/BuilderSizeMenu';
import FinishMenu from './menus/BuilderFinishMenu';
import PriceMenu from './menus/BuilderPriceMenu';
import LocationMenu from './menus/BuilderLocationMenu';
import { UserContext } from '../../main/contexts/UserContext';
import { CurrencyContext } from '../../main/contexts/CurrencyContext';
import { MenuOverlayContext } from '../../main/contexts/MenuOverlayContext';
import { BUILDER_PARTNERS } from '../constants/builderDirectory';
import {
    getFilteredProducts,
    getSearchInfo,
    triggerLazy,
    shuffleStorePartners
} from '../utils/helpers';
async function getDrivingDistance(lat1, long1, lat2, long2) {
    try {
        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long1}%2C${lat1}%3B${long2}%2C${lat2}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidG11cnZ2IiwiYSI6ImNrMHUxcTg5ZTBpN3gzbm4wN2MxYnNyaTgifQ.7p5zmmb6577ofkAIGVUcwA`);
        return response.data.routes[0].distance;
    } catch (error) {
        console.error(error);
    }
}

const initialState = {
    size: false,
    model: false,
    maker: false,
    finish: false, 
    price: false, 
    location: false
}
function BuilderProductSearch(props) {
    const { user } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { menuOverlay, setMenuOverlay } = useContext(MenuOverlayContext);

    const ref = useRef();
    // randomize products
    let shuffledProducts=[...props.products];
    // remove listings without photos (they go at the bottom of the list)
    const tempGeneric = shuffledProducts.filter(product=> product&&product.productImageUrl&&product.productImageUrl.indexOf('genericHarp')>-1)
    shuffledProducts = shuffledProducts.filter(product=> product&&product.productImageUrl&&product.productImageUrl.indexOf('genericHarp')===-1)
    // randomize
    shuffledProducts = shuffleStorePartners(shuffledProducts);
    // add back in listings without photos
    tempGeneric.map(product=>shuffledProducts.push(product));

    const [menus, setMenus] = useState(initialState);
    const [allState, setAllState] = useState({
        selectionType: '',
        maker: 'All Builders',
        model: 'All Models',
        size: 'All Sizes',
        finish: 'All Finishes',
        price: 'All Prices',
        location: 'All Locations',
        searchInfo: 'All Harps'
    }); 
    // useOutsideClick(ref, () => {
    //     setMenus({
    //         size: false,
    //         maker: false,
    //         model: false,
    //         finish: false,
    //         price: false,
    //         location: false
    //     });
    // });
    function handleMakerSelection(maker) {
        const newState = {...allState, 
            maker,
            model: "All Models"
        }
        const builderInfo = BUILDER_PARTNERS.find(builder=>maker===builder.productTitle);
        console.log('builderInfo', builderInfo);
        console.log(maker)
        console.log(BUILDER_PARTNERS[0])
        setAllState({...allState, 
            maker,
            model: "All Models",
            searchInfo: getSearchInfo(newState),
            builderInfo
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
        //comment out when menu implemented
        alert("Finish menu for builders under construction.");
        const newState = {...allState, 
            finish: 'All Finishes',
            productType: 'all'
        }
        setAllState({...allState, 
            finish: 'All Finishes',
            productType: 'all',
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
        
        // // Orig harp finish code from used harps
        // const newState = {...allState, 
        //     finish: finish==='All Finishes'?'All Finishes':finish,
        //     productType: 'all',
        // }
        // setAllState({...allState, 
        //     finish: finish==='All Finishes'?'All Finishes':finish,
        //     productType: 'all',
        //     searchInfo: getSearchInfo(newState)
        // });
        // setMenus(initialState);
    }
    function handlePriceSelection(price) {
        console.log('price:', price)
        const newState = {...allState, 
            price
        }
        setAllState({...allState, 
            price,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    async function handleLocationSelection(location) {
        // if (location==='ltActivate') location = 'All Locations';
        function updateState() {
            const newState = {...allState, 
                location
            }
            setAllState({...allState, 
                location,
                searchInfo: getSearchInfo(newState)
            });
            if (location!=='ltActivate') setMenus(initialState);
            location='All Locations';
        }
        const addDistances = () => {
            shuffledProducts.map(async product => {
                let distance = await getDrivingDistance(props.clientlat, props.clientlong, product.sellerLat, product.sellerLong);
                product.distance = user.distanceunit==='miles'?(distance*0.000621).toFixed(0):(distance/1000).toFixed(0);
            });
        }
        if (location==='ltActivate') {
            await addDistances();
            updateState();
        } else {
            updateState();
        }
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
            maker: "All Builders",
            model: "All Models",
            searchInfo: 'All Harps'
        });
    }
    function clearOneFilter(e) {
        let menuClick = e.target.name;
        menuClick==='maker'?menuClick="builder":'';
        const newState = {...allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo}
        const newSearchInfo = getSearchInfo(newState);
        if (menuClick==='finish') menuClick = 'finishe';
        setAllState({...allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo});
    }
    useEffect(() => {
        triggerLazy();
        if (Router?.query?.builder) {
            handleMakerSelection(Router.query.builder);
        }   
    },[]);
    const filteredProducts = getFilteredProducts(shuffledProducts, allState, user, currencyMultiplier);
    const showing = allState.location!=='ltActivate'?`SHOWING  ${allState.searchInfo.trim().substr(allState.searchInfo.trim().length-1)==='|'?`${allState.searchInfo.trim().substr(0,allState.searchInfo.trim().length-1)}`:`${allState.searchInfo}`}`:"";
    return (
        <>       
        <h3 className='builder buildersearchTitle'>Use the filters below to narrow your results.</h3>
        <div className='builderproductSearchOuter'>
            <div className='mobilebuilderSearchLine1'>
            <div  ref={ref} className='buildersearchLine1'>  
                <img src='./img/ribbon_blue_curtains.png' alt="blue background ribbon with fancy curtains"/>     
                <SizeMenu 
                    handleSizeChange={handleSizeSelection} 
                    products={shuffledProducts}
                    makesmodels={props.makesmodels}
                    currentselected={allState.size?allState.size:'Harp Size'}
                    handleclick={handleClick}
                    open={menus.size}
                />
                <BuilderMakerMenu 
                    handleMakerChange = {handleMakerSelection}
                    open={!menus.maker} 
                    products={shuffledProducts}
                    makesmodels={props.products}
                    handleclick={handleClick}
                />
                <BuilderModelMenu 
                    handleModelChange={handleModelSelection}
                    products={shuffledProducts}
                    productMaker={allState.maker}
                    productSize={allState.size}
                    makesmodels={props.makesmodels}
                    open={menus.model}
                    handleclick={handleClick}
                />
            </div>
            <div className="buildersearchLine1Sub">
                <div 
                    id="selectedSize" 
                    className={`buildersearch-grid-item`} 
                    value={allState.size}
                    onClick={()=>handleClick({target: {name: 'size'}})}
                    style={{transform: 'translateY(-1.5px'}}
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
                    className={`buildersearch-grid-item`} 
                    value={allState.maker}
                    onClick={()=>handleClick({target: {name: 'maker'}})}
                    style={{transform: 'translateY(-1.5px'}}
                >
                    {allState.maker}
                    {allState.maker!=="All Builders"
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
                    className={`buildersearch-grid-item`} 
                    value={allState.model}
                    onClick={()=>handleClick({target: {name: 'model'}})}
                    style={{transform: 'translateY(-1.5px'}}
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
            </div>
            </div>
            <h3 className='builder buildersearchTitle'>Further refine your search.</h3>
            <div className='mobilebuilderSearchLine2'>
                <div ref={ref} className='buildersearchLine2'>
                    <img src='./img/ribbon_ltblue_full.png' alt="golden background ribbon"/> 
                    <FinishMenu 
                        handleFinishChange = {handleFinishSelection} 
                        products={shuffledProducts}
                        makesmodels={props.makesmodels}
                        currentselected={allState.finish?allState.finish:'Harp Finish'}
                        handleclick={handleClick}
                        open={menus.finish}
                    />
                    <PriceMenu 
                        handlePriceChange = {handlePriceSelection}
                        products={shuffledProducts}
                        // producttype={allState.productType}
                        makesmodels={props.makesmodels}
                        // currentselected={allState.price?allState.price:'Harp Price'}
                        open={menus.price}
                        handleclick={handleClick}
                    />
                    <LocationMenu 
                        handleLocationChange = {handleLocationSelection}
                        currentselected={allState.location?allState.location:'Harp All Locations'}
                        open={menus.location}
                        handleclick={handleClick}
                    /> 
                </div>
                <div className="buildersearchLine2Sub">
                        <div 
                            id="selectedFinish" 
                            className={`buildersearch-grid-item`} 
                            value={allState.finish}
                            onClick={()=>handleClick({target: {name: 'finish'}})}
                            style={{transform: 'translateY(-1.5px'}}
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
                            className={`buildersearch-grid-item`} 
                            value={allState.price}
                            onClick={()=>handleClick({target: {name: 'price'}})}
                            style={{transform: 'translateY(-1.5px'}}
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
                            className={`buildersearch-grid-item`} 
                            value={allState.location}
                            onClick={()=>handleClick({target: {name: 'location'}})}
                            style={{transform: 'translateY(-1.5px'}}
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
                </div>
            </div>
            <div className='selected'>
                <p>
                    {showing}
                </p>
                <div onClick={handleClear} style={{display: 'none'}} className='clearAll clearSearch'>
                    <img onClick={handleClear} src='/img/clear_search.png' alt='clear filters'/>
                    <p>Clear</p> 
                </div>
            </div>
            
            
            
            <ProductContainer 
                data-test="component-ProductContainer" 
                filteredproductscontainer={filteredProducts} 
                searchInfo={allState.searchInfo}
                allstate={allState}
                clientlat={props.clientlat}
                clientlong={props.clientlong}
            />    
            <BuilderProductSearchCss />             
        </div>
        </>
    );
}

export default BuilderProductSearch;
