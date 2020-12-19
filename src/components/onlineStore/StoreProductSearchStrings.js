// packages
import React, { 
    useState, 
    useContext, 
    useEffect, 
    useRef } from 'react';
import useOutsideClick from "../../hooks/hooks";
import axios from 'axios';

// internal
import StoreProductSearchCss from '../../styles/onlinestore/StoreProductSearch.css';
import StoreProductContainer from './StoreProductContainer';
import ArtistMenu from './menus/ArtistMenu';
import TitleMenu from './menus/TitleMenu';
import MainCategoryMenu from './menus/MainCategoryMenu';
import OctavesMenu from './menus/OctavesMenu';
import BrandsMenu from './menus/BrandsMenu';
import TypesMenu from './menus/TypesMenu';
import { UserContext } from '../../contexts/UserContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { FINDAHARP_PRODUCTS } from '../../constants/FindaharpProducts'
import {
    getFilteredProducts,
    getSearchInfo,
    triggerLazy
} from '../../utils/helpers';
import {
    getFilteredStoreProducts,
} from '../../utils/searchProductsHelpers';

const initialState = {
    category: false,
    title: false,
    artist: false,
    octaves: false, 
    brands: false, 
    types: false
}
const initialStateText = {
    selectionType: '',
    artist: 'All Artists',
    title: 'All Titles',
    category: 'All Categories',
    octaves: 'All Octaves',
    brands: 'All Brands',
    types: 'All Types',
    searchInfo: 'All Harps'
}

function StoreProductSearchStrings(props) {
    const { user } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const ref = useRef();

    const [menus, setMenus] = useState(initialState);
    
    // useOutsideClick(ref, () => {
    //     setMenus({
    //         category: false,
    //         artist: false,
    //         title: false,
    //         octaves: false,
    //         brands: false,
    //         types: false
    //     });
    // });
    
    function handleOctavesSelection(octaves) {
        props.setTypeOfSearch("strings");
        const newState = {...props.allState, 
            octaves: octaves,
            productType: 'all'
        }
        props.setOctavesSearch(octaves);
        props.handleChange('strings', 'octaves', octaves, props.allState.brands, props.allState.types);
        props.setAllState({...props.allState, 
            octaves,
            productType: 'all',
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleBrandsSelection(brands) {
        props.setTypeOfSearch("strings");
        const newState = {...props.allState, 
            brands,
            productType: 'all',
        }
        props.setBrandsSearch(brands);
        props.handleChange('strings', 'brands', props.allState.octaves, brands, props.allState.types);
        props.setAllState({...props.allState, 
            brands,
            productType: 'all',
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);      
    }
    function handleTypesSelection(types) {
        props.setTypeOfSearch("strings");
        const newState = {...props.allState, 
            types,
            productType: 'all'
        }
        props.setTypesSearch(types);
        props.handleChange('strings', 'types', props.allState.octaves, props.allState.brands, types);
        props.setAllState({...props.allState, 
            types,
            productType: 'all',
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleClick(e) {
        switch(e.target.name) {
            case 'category':
                setMenus({
                    category: !menus.category,
                    artist: false,
                    title: false,
                    octaves: false,
                    brands: false,
                    types: false
                });
                break;
            case 'artist':
                setMenus({
                    category: false,
                    artist: !menus.artist,
                    title: false,
                    octaves: false,
                    brands: false,
                    types: false
                });
                break;
            case 'title':   
                setMenus({
                    category: false,
                    artist: false,
                    title: !menus.title,
                    octaves: false,
                    brands: false,
                    types: false
                });               
                break;
            case 'octaves':
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    octaves: !menus.octaves,
                    brands: false,
                    types: false
                });
                break;
            case 'brands':
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    octaves: false,
                    brands: !menus.brands,
                    types: false
                });
                break;
            case 'types':
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    octaves: false,
                    brands: false,
                    types: !menus.types
                });
                break;
            default:
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    octaves: false,
                    brands: false,
                    types: false
                });
        }
    }
    function handleClear() {
        // setMenus(initialState);
        // props.setAllState(initialStateText);
        document.querySelector('#clearSearch').style.display='none';
        props.handleClear();
    }
   function clearOneFilter(e) {
       let menuClick = e.target.name;
        if (e.target.name==='octaves') {props.setOctavesSearch("All Octaves"); props.handleChange("","","All Octaves", props.allState.brands, props.allState.types);}
        if (e.target.name==='brands') {props.setBrandsSearch("All Brands"); props.handleChange("","",props.allState.octaves, "All Brands", props.allState.types);}
        if (e.target.name==='types') {props.setTypesSearch("All Types"); props.handleChange("","",props.allState.octaves, props.allState.brands, "All Types");}
        menuClick==="octaves"?menuClick="Octave":''; // hack change e.target.name to 'Octaves'
        menuClick==="brands"?menuClick="Brand":''; // hack change e.target.name to 'Brands'
        menuClick==="types"?menuClick="Type":''; // hack change e.target.name to 'Types'
        const newState = {...props.allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo}
        const newSearchInfo = getSearchInfo(newState);
        props.setAllState({...props.allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo});
        
        //props.handleChange(allState.octaves, allState.brands, allState.types);
    }
    useEffect(() => {
        triggerLazy();
    },[]);
    return (
        <>       
        <div className='storeproductSearchOuter'>
            <h3 className='storesearchTitle'>Searching for STRINGS? Refine your search here.<br /><img src='img/store/fastTruck.png' alt='fast truck' style={{width: '23px', transform: 'translate(-6px, 5px)'}}/><span style={{fontStyle: 'normal', fontWeight: 'bold'}}>Fast and Easy</span> string order form coming soon!!</h3>
            <div className='storemobileSearchLine2'>
                <div ref={ref} className='storesearchLine2'>
                    <img src='./img/ribbon_gold_full.png' alt="golden background ribbon"/> 
                    <OctavesMenu 
                        id="octavesmenu"
                        handleOctavesChange={handleOctavesSelection} 
                        products={props.products}
                        makestitles={props.makestitles}
                        currentselected={props.allState.octaves?props.allState.octaves:'All Octaves'}
                        handleclick={handleClick}
                        open={menus.octaves}
                        clearMenu={props.clearMenus}
                    />
                    <BrandsMenu 
                        id="brandsmenu"
                        handleBrandsChange = {handleBrandsSelection}
                        products={props.products}
                        // producttype={allState.productType}
                        makestitles={props.makestitles}
                        currentselected={props.allState.brands?props.allState.brands:'All Brands'}
                        open={menus.brands}
                        handleclick={handleClick}
                    />
                    <TypesMenu 
                        id='typesmenu'
                        handleTypesChange = {handleTypesSelection}
                        currentselected={props.allState.types?props.allState.types:'All Types'}
                        open={menus.types}
                        handleclick={handleClick}
                    /> 
                </div>
                <div className="storesearchLine2Sub">
                        <div 
                            id="selectedOctaves" 
                            className={`storesearch-grid-item`} 
                            value={props.allState&&props.allState.octaves}
                            onClick={()=>handleClick({target: {name: 'octaves'}})}
                            style={{cursor: 'pointer'}}
                        >
                            {props.allState&&props.allState.octaves}
                            {props.allState&&props.allState.octaves!=="All Octaves"
                                ?<img 
                                    name='octaves'
                                    onClick={
                                        (e)=>{
                                            e.stopPropagation(); 
                                            clearOneFilter({target:{name:'octaves'}});
                                        }
                                    }
                                    src='/img/clear_search.png' 
                                    alt='clear filters'
                                />
                                :''
                            }
                        </div>
                        <div 
                            id="selectedBrands" 
                            className={`storesearch-grid-item`} 
                            value={props.allState&&props.allState.brands}
                            onClick={()=>handleClick({target: {name: 'brands'}})}
                            style={{cursor: 'pointer'}}
                        >
                            {props.allState&&props.allState.brands}
                            {props.allState&&props.allState.brands!=="All Brands"
                                ?<img 
                                    name='brands'
                                    onClick={
                                        (e)=>{
                                            e.stopPropagation(); 
                                            clearOneFilter({target:{name:'brands'}});
                                        }
                                    }
                                    src='/img/clear_search.png' 
                                    alt='clear filters'
                                />
                                :''
                            }
                            
                        </div>
                        <div 
                            id="selectedAll Types" 
                            className={`storesearch-grid-item`} 
                            value={props.allState&&props.allState.types}
                            // onClick={()=>alert('String "Types" menu under construction. Check back soon!')}
                            onClick={()=>handleClick({target: {name: 'types'}})}
                            style={{cursor: 'pointer'}}
                        >
                            {props.allState&&props.allState.types}
                            {props.allState&&props.allState.types!=="All Types"
                                ?<img 
                                    name='typess'
                                    onClick={
                                        (e)=>{
                                            e.stopPropagation(); 
                                            clearOneFilter({target:{name:'types'}});
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
            <StoreProductSearchCss />             
        </div>
        </>
    );
}

export default StoreProductSearchStrings;
