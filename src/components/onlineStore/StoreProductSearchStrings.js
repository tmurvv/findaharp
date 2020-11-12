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
    octaves: 'All String Octaves',
    brands: 'All Brands',
    types: 'All Types',
    searchInfo: 'All Harps'
}

function StoreProductSearchStrings(props) {
    const { user } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const ref = useRef();

    const [menus, setMenus] = useState(initialState);
    const [allState, setAllState] = useState(initialStateText); 
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
    function handleArtistSelection(artist) {
        const newState = {...allState, 
            artist,
            title: "All Titles"
        }       
        setAllState({...allState, 
            artist,
            title: "All Titles",
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleTitleSelection(title) {
        // shortcut when user clicks on line between title listings
        if (title==='[object Object]') return;
        //catches when user selects all titles from artist
        const newStateAllTitles = {...allState, 
            title: "All Titles"
        } 
        if (title.toUpperCase() === 'ALL TITLES') {
            setAllState({...allState, 
                title: "All Titles",
                searchInfo: getSearchInfo(newStateAllTitles)
            });
            setMenus(initialState);
            return;
        }
        const newState = {...allState, 
            title
        }
        setAllState({...allState, 
            title,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleCategorySelection(category) {
        const newState = {...allState, 
            category
        }
        setAllState({...allState, 
            category,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleOctavesSelection(octaves) {
        const newState = {...allState, 
            octaves: octaves==='All String Octaves'?'All String Octaves':octaves,
            productType: 'all',
        }
        props.setOctavesSearch(octaves);
        props.handleChange(octaves, allState.brands, allState.types);
        setAllState({...allState, 
            octaves: octaves==='All String Octaves'?'All String Octaves':octaves,
            productType: 'all',
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleBrandsSelection(brands) {
        const newState = {...allState, 
            brands
        }
        setAllState({...allState, 
            brands,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
        props.setBrandsSearch(brands);
        props.handleChange(allState.octaves, brands, allState.types);
    }
    async function handleTypesSelection(types) {
        const newState = {...allState, 
            types: types==='All Types'?'All Types':types,
            productType: 'all',
        }
        props.setTypesSearch(types);
        props.handleChange(allState.octaves, allState.brands, types);
        setAllState({...allState, 
            types: types==='All Types'?'All Types':types,
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
            case 'String Octaves':
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
        setMenus(initialState);
        setAllState(initialStateText);
        document.querySelector('#clearSearch').style.display='none';
        props.handleClear();
    }
   function clearOneFilter(e) {
       let menuClick = e.target.name;
        if (e.target.name==='octaves') {props.setOctavesSearch("All String Octaves"); props.handleChange("All String Octaves", allState.brands, allState.types);}
        if (e.target.name==='brands') {props.setBrandsSearch("All Brands"); props.handleChange(allState.octaves, "All Brandss", allState.types);}
        if (e.target.name==='types') {props.setTypesSearch("All Types"); props.handleChange(allState.octaves, allState.brands, "All Types");}
        menuClick==="octaves"?menuClick="String Octave":''; // hack change e.target.name to 'String Octaves'
        menuClick==="brands"?menuClick="Brand":''; // hack change e.target.name to 'String Octaves'
        menuClick==="types"?menuClick="Type":''; // hack change e.target.name to 'String Octaves'
        const newState = {...allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo}
        const newSearchInfo = getSearchInfo(newState);
        setAllState({...allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo});
        
        //props.handleChange(allState.octaves, allState.brands, allState.types);
    }
    useEffect(() => {
        triggerLazy();
    },[]);
    return (
        <>       
        <div className='storeproductSearchOuter'>
            <h3 className='storesearchTitle'>Searching for STRINGS? Refine your search here.</h3>
            <div className='storemobileSearchLine2'>
                <div ref={ref} className='storesearchLine2'>
                    <img src='./img/ribbon_gold_full.png' alt="golden background ribbon"/> 
                    <OctavesMenu 
                        id="octavesmenu"
                        handleOctavesChange={handleOctavesSelection} 
                        products={props.products}
                        makestitles={props.makestitles}
                        // currentselected={allState.octaves?allState.octaves:'Harp Octaves'}
                        handleclick={handleClick}
                        open={menus.octaves}
                    />
                    <BrandsMenu 
                        id="brandsmenu"
                        handleBrandsChange = {handleBrandsSelection}
                        products={props.products}
                        // producttype={allState.productType}
                        makestitles={props.makestitles}
                        // currentselected={allState.brands?allState.brands:'Harp Brands'}
                        open={menus.brands}
                        handleclick={handleClick}
                    />
                    <TypesMenu 
                        id='typesmenu'
                        handleTypesChange = {handleTypesSelection}
                        currentselected={allState.types?allState.types:'Harp All Types'}
                        open={menus.types}
                        handleclick={handleClick}
                    /> 
                </div>
                <div className="storesearchLine2Sub">
                        <div 
                            id="selectedOctaves" 
                            className={`storesearch-grid-item`} 
                            value={allState.octaves}
                            onClick={()=>handleClick({target: {name: 'octaves'}})}
                        >
                            {allState.octaves}
                            {allState.octaves!=="All String Octaves"
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
                            value={allState.brands}
                            onClick={()=>handleClick({target: {name: 'brands'}})}
                        >
                            {allState.brands}
                            {allState.brands!=="All Brandss"
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
                            value={allState.types}
                            onClick={()=>handleClick({target: {name: 'types'}})}
                        >
                            {allState.types}
                            {allState.types!=="All Types"
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
            <div className='storeselected' id='clearSearch' style={{display:'none'}}>
                {/* <p>
                    {showing}
                </p> */}
                <div onClick={handleClear} className='clearAll clearSearch'>
                    <img onClick={handleClear} src='/img/clear_search.png' alt='clear filters'/>
                    <p>Clear All Search</p> 
                </div>
            </div>
            <StoreProductSearchCss />             
        </div>
        </>
    );
}

export default StoreProductSearchStrings;
