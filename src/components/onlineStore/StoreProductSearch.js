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
import SoloEnsembleMenu from './menus/SoloEnsembleMenu';
import LevelMenu from './menus/LevelMenu';
import PublicationTypeMenu from './menus/PublicationTypeMenu';
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
    soloensemble: false, 
    level: false, 
    publicationtype: false
}
function StoreProductSearch(props) {
    const { user } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const ref = useRef();

    const [menus, setMenus] = useState(initialState);
    const [allState, setAllState] = useState({
        selectionType: '',
        artist: 'All Artists',
        title: 'All Titles',
        category: 'All Categories',
        soloensemble: 'All Solo/Ensembles',
        level: 'All Levels',
        publicationtype: 'All PublicationTypes',
        searchInfo: 'All Harps'
    }); 
    // useOutsideClick(ref, () => {
    //     setMenus({
    //         category: false,
    //         artist: false,
    //         title: false,
    //         soloensemble: false,
    //         level: false,
    //         publicationtype: false
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
    function handleSoloEnsembleSelection(soloensemble) {
        const newState = {...allState, 
            soloensemble: soloensemble==='All Solo/Ensembles'?'All Solo/Ensembles':soloensemble,
            productType: 'all',
        }
        setAllState({...allState, 
            soloensemble: soloensemble==='All Solo/Ensembles'?'All Solo/Ensembles':soloensemble,
            productType: 'all',
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleLevelSelection(level) {
        const newState = {...allState, 
            level
        }
        setAllState({...allState, 
            level,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    async function handlePublicationTypeSelection(publicationtype) {
        // if (publicationtype==='ltActivate') publicationtype = 'All PublicationTypes';
        function updateState() {
            const newState = {...allState, 
                publicationtype
            }
            setAllState({...allState, 
                publicationtype,
                searchInfo: getSearchInfo(newState)
            });
            if (publicationtype!=='ltActivate') setMenus(initialState);
            publicationtype='All PublicationTypes';
        }
        const addDistances = () => {
            props.products.map(async product => {
                let distance = await getDrivingDistance(props.clientlat, props.clientlong, product.sellerLat, product.sellerLong);
                product.distance = user.distanceunit==='miles'?(distance*0.000621).toFixed(0):(distance/1000).toFixed(0);
            });
        }
        if (publicationtype==='ltActivate') {
            await addDistances();
            updateState();
        } else {
            updateState();
        }
    }
    function handleClick(e) {
        switch(e.target.name) {
            case 'category':
                setMenus({
                    category: !menus.category,
                    artist: false,
                    title: false,
                    soloensemble: false,
                    level: false,
                    publicationtype: false
                });
                break;
            case 'artist':
                setMenus({
                    category: false,
                    artist: !menus.artist,
                    title: false,
                    soloensemble: false,
                    level: false,
                    publicationtype: false
                });
                break;
            case 'title':   
                setMenus({
                    category: false,
                    artist: false,
                    title: !menus.title,
                    soloensemble: false,
                    level: false,
                    publicationtype: false
                });               
                break;
            case 'soloensemble':
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    soloensemble: !menus.soloensemble,
                    level: false,
                    publicationtype: false
                });
                break;
            case 'level':
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    soloensemble: false,
                    level: !menus.level,
                    publicationtype: false
                });
                break;
            case 'publicationtype':
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    soloensemble: false,
                    level: false,
                    publicationtype: !menus.publicationtype
                });
                break;
            default:
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    soloensemble: false,
                    level: false,
                    publicationtype: false
                });
        }
    }
    function handleClear(evt) {
        document.querySelector('.clearAll').style.display='none';
        setAllState({
            ...allState,
            soloensemble: 'All Solo/Ensembles',
            level: 'All Levels',
            publicationtype: 'All PublicationTypes',
            category: "All Categories",
            artist: "All Artists",
            title: "All Titles",
            searchInfo: 'All Harps'
        });
    }
    function clearOneFilter(e) {
        let menuClick = e.target.name;
        const newState = {...allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo}
        const newSearchInfo = getSearchInfo(newState);
        if (menuClick==='soloensemble') menuClick = 'soloensemblee';
        setAllState({...allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo});
    }
    useEffect(() => {
        triggerLazy();
    },[]);
    console.log('search', FINDAHARP_PRODUCTS.length)
    // const filteredProducts = getFilteredProducts(props.products, allState, user, currencyMultiplier);
    const filteredProducts = getFilteredStoreProducts(FINDAHARP_PRODUCTS, allState, user, currencyMultiplier);
    // const showing = allState.publicationtype!=='ltActivate'?`SHOWING  ${allState.searchInfo.trim().substr(allState.searchInfo.trim().length-1)==='|'?`${allState.searchInfo.trim().substr(0,allState.searchInfo.trim().length-1)}`:`${allState.searchInfo}`}`:"";
    const showing = "Not Yet Implemented"
    return (
        <>       
        <h3 className='storesearchTitle'>Use the filters below to narrow your results.</h3>
        <div className='storeproductSearchOuter'>
            <div className='storemobileSearchLine1'>
            <div  ref={ref} className='storesearchLine1'>  
                <img src='./img/ribbon_black_full.png' alt="black background ribbon"/> 
                
                <MainCategoryMenu 
                    handleCategoryChange={handleCategorySelection} 
                    products={props.products}
                    makestitles={props.makestitles}
                    currentselected={allState.category?allState.category:'Category'}
                    handleclick={handleClick}
                    open={menus.category}
                />
                <ArtistMenu
                    handleArtistChange = {handleArtistSelection}
                    open={!menus.artist} 
                    products={props.products}
                    makestitles={props.makestitles}
                    handleclick={handleClick}
                />
                <TitleMenu
                    handleTitleChange={handleTitleSelection}
                    products={props.products}
                    productArtist={allState.artist}
                    productCategory={allState.category}
                    makestitles={props.makestitles}
                    open={menus.title}
                    handleclick={handleClick}
                />
            </div>
            <div className="storesearchLine1Sub">
                <div 
                    id="selectedCategory" 
                    className={`storesearch-grid-item`} 
                    value={allState.category}
                    onClick={()=>handleClick({target: {name: 'category'}})}
                >
                    {allState.category}
                    {allState.category!=="All Categories"
                        ?<img 
                            name='category'
                            onClick={
                                (e)=>{
                                    e.stopPropagation(); 
                                    clearOneFilter({target:{name:'category'}});
                                }
                            } 
                            src='/img/clear_search.png' 
                            alt='clear filters'
                        />
                        :''
                    }
                </div>
                <div 
                    id="selectedArtist" 
                    className={`storesearch-grid-item`} 
                    value={allState.artist}
                    onClick={()=>handleClick({target: {name: 'artist'}})}
                >
                    {allState.artist}
                    {allState.artist!=="All Artists"
                        ?<img 
                            name='artist'
                            onClick={
                                (e)=>{
                                    e.stopPropagation(); 
                                    clearOneFilter({target:{name:'artist'}});
                                }
                            }
                            src='/img/clear_search.png' 
                            alt='clear filters'
                        />
                        :''
                    }
                </div>
                <div 
                    id="selectedTitle" 
                    className={`storesearch-grid-item`} 
                    value={allState.title}
                    onClick={()=>handleClick({target: {name: 'title'}})}
                >
                    {allState.title}
                    {allState.title!=="All Titles"
                        ?<img 
                        onClick={
                            (e)=>{
                                e.stopPropagation(); 
                                clearOneFilter({target:{name:'title'}});
                            }
                        }
                            src='/img/clear_search.png'
                            name='title' 
                            alt='clear title filters'
                        />
                        :''
                    }
                </div>
            </div>
            </div>
            <h3 className='storesearchTitle'>Further refine your search.</h3>
            <div className='storemobileSearchLine2'>
                <div ref={ref} className='storesearchLine2'>
                    <img src='./img/ribbon_gold_full.png' alt="golden background ribbon"/> 
                    <SoloEnsembleMenu 
                        handleSoloEnsembleChange = {handleSoloEnsembleSelection} 
                        products={props.products}
                        makestitles={props.makestitles}
                        currentselected={allState.soloensemble?allState.soloensemble:'Harp SoloEnsemble'}
                        handleclick={handleClick}
                        open={menus.soloensemble}
                    />
                    <LevelMenu 
                        handleLevelChange = {handleLevelSelection}
                        products={props.products}
                        // producttype={allState.productType}
                        makestitles={props.makestitles}
                        // currentselected={allState.level?allState.level:'Harp Level'}
                        open={menus.level}
                        handleclick={handleClick}
                    />
                    <PublicationTypeMenu 
                        handlePublicationTypeChange = {handlePublicationTypeSelection}
                        currentselected={allState.publicationtype?allState.publicationtype:'Harp All PublicationTypes'}
                        open={menus.publicationtype}
                        handleclick={handleClick}
                    /> 
                </div>
                <div className="storesearchLine2Sub">
                        <div 
                            id="selectedSoloEnsemble" 
                            className={`storesearch-grid-item`} 
                            value={allState.soloensemble}
                            onClick={()=>handleClick({target: {name: 'soloensemble'}})}
                        >
                            {allState.soloensemble}
                            {allState.soloensemble!=="All Solo/Ensembles"
                                ?<img 
                                    name='soloensemble'
                                    onClick={
                                        (e)=>{
                                            e.stopPropagation(); 
                                            clearOneFilter({target:{name:'soloensemble'}});
                                        }
                                    }
                                    src='/img/clear_search.png' 
                                    alt='clear filters'
                                />
                                :''
                            }
                        </div>
                        <div 
                            id="selectedLevel" 
                            className={`storesearch-grid-item`} 
                            value={allState.level}
                            onClick={()=>handleClick({target: {name: 'level'}})}
                        >
                            {allState.level}
                            {allState.level!=="All Levels"
                                ?<img 
                                    name='level'
                                    onClick={
                                        (e)=>{
                                            e.stopPropagation(); 
                                            clearOneFilter({target:{name:'level'}});
                                        }
                                    }
                                    src='/img/clear_search.png' 
                                    alt='clear filters'
                                />
                                :''
                            }
                            
                        </div>
                        <div 
                            id="selectedAll PublicationTypes" 
                            className={`storesearch-grid-item`} 
                            value={allState.publicationtype}
                            onClick={()=>handleClick({target: {name: 'publicationtype'}})}
                        >
                            {allState.publicationtype}
                            {allState.publicationtype!=="All PublicationTypes"
                                ?<img 
                                    name='publicationtypes'
                                    onClick={
                                        (e)=>{
                                            e.stopPropagation(); 
                                            clearOneFilter({target:{name:'publicationtype'}});
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
            <div className='storeselected'>
                <p>
                    {showing}
                </p>
                <div onClick={handleClear} style={{display: 'none'}} className='clearAll clearSearch'>
                    <img onClick={handleClear} src='/img/clear_search.png' alt='clear filters'/>
                    <p>Clear</p> 
                </div>
            </div>
            <StoreProductContainer 
                data-test="component-ProductContainer" 
                filteredproductscontainer={filteredProducts} 
                searchInfo={allState.searchInfo}
                allstate={allState}
                clientlat={props.clientlat}
                clientlong={props.clientlong}
            />    
            <StoreProductSearchCss />             
        </div>
        </>
    );
}

export default StoreProductSearch;
