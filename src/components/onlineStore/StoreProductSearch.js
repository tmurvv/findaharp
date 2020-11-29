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
import { PublicTwoTone } from '@material-ui/icons';

const initialState = {
    category: false,
    title: false,
    artist: false,
    soloensemble: false, 
    level: false, 
    publicationtype: false
}
const initialStateText = {
    selectionType: '',
    artist: 'All Artists',
    title: 'All Titles',
    category: 'All Categories',
    soloensemble: 'All Lever/Pedal/Ens',
    level: 'All Levels',
    publicationtype: 'All Publication Types',
    searchInfo: 'All Harps'
}

function StoreProductSearch(props) {
    const { user } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const ref = useRef();

    const [menus, setMenus] = useState(initialState);
    // const [props.allState, setAllState] = useState(initialStateText); 
    // const [props.allState, setAllState] = useState({
    //     soloensemble: props.ensembleSearch,
    //     level: 'All Levels',
    //     publicationtype: 'All Publication Types',
    // }); 

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
    // function handleArtistSelection(artist) {
    //     const newState = {...props.allState, 
    //         artist,
    //         title: "All Titles"
    //     }       
    //     setAllState({...props.allState, 
    //         artist,
    //         title: "All Titles",
    //         searchInfo: getSearchInfo(newState)
    //     });
    //     setMenus(initialState);
    // }
    // function handleTitleSelection(title) {
    //     // shortcut when user clicks on line between title listings
    //     if (title==='[object Object]') return;
    //     //catches when user selects all titles from artist
    //     const newStateAllTitles = {...props.allState, 
    //         title: "All Titles"
    //     } 
    //     if (title.toUpperCase() === 'ALL TITLES') {
    //         setAllState({...props.allState, 
    //             title: "All Titles",
    //             searchInfo: getSearchInfo(newStateAllTitles)
    //         });
    //         setMenus(initialState);
    //         return;
    //     }
    //     const newState = {...props.allState, 
    //         title
    //     }
    //     setAllState({...props.allState, 
    //         title,
    //         searchInfo: getSearchInfo(newState)
    //     });
    //     setMenus(initialState);
    // }
    function handleCategorySelection(category) {
        const newState = {...props.allState, 
            category
        }
        props.setAllState({...props.allState, 
            category,
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleSoloEnsembleSelection(soloensemble) {
        const newState = {...props.allState, 
            soloensemble: soloensemble==='All Lever/Pedal/Ens'?'All Lever/Pedal/Ens':soloensemble,
            productType: 'all',
        }
        
        props.handleChange("music", 'soloensemble', soloensemble, props.allState&&props.allState.level, props.allState&&props.allState.publicationtype);
        props.setAllState({...props.allState, 
            soloensemble,
            productType: 'all',
            searchInfo: getSearchInfo(newState, 'music')
        });
        setMenus(initialState);
    }
    function handleLevelSelection(level) {
        props.setTypeOfSearch("music");
        const newState = {...props.allState, 
            level
        }
        props.setAllState({...props.allState, 
            level,
            searchInfo: getSearchInfo(newState, 'music')
        });
        setMenus(initialState);
        console.log('handle level', level);
        props.handleChange("music", 'level', props.allState?props.allState.soloensemble:'', level, props.allState?props.allState.publicationtype:'');
    }
    async function handlePublicationTypeSelection(publicationtype) {
        props.setTypeOfSearch("music");
        const newState = {...props.allState, 
            publicationtype: publicationtype==='All Publication Types'?'All Publication Types':publicationtype,
            productType: 'all',
        }
        props.handleChange('music', 'publicationtype', props.allState?props.allState.soloensemble:'', props.allState?props.allState.level:'', publicationtype);
        props.setAllState({...props.allState, 
            publicationtype: publicationtype==='All Publication Types'?'All Publication Types':publicationtype,
            productType: 'all',
            searchInfo: getSearchInfo(newState, 'music')
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
            case 'Lever/Pedal/Ens':
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
    function handleClear() {
        // setMenus(initialState);
        // setAllState(initialStateText);
        // document.querySelector('#clearSearch').style.display='none';
        // props.handleClear();
    }
   function clearOneFilter(e) {
       let menuClick = e.target.name;
        if (e.target.name==='soloensemble') {props.handleChange("music","soloensemble","All Lever/Pedal/Ens",props.allState?props.allState.level:'', props.allState?props.allState.publicationtype:'');}
        if (e.target.name==='level') {props.handleChange("music", "level", props.allState?props.allState.soloensemble:'', "All Levels", props.allState?props.allState.publicationtype:'');}
        if (e.target.name==='publicationtype') {props.handleChange("music", "level", props.allState?props.allState.soloensemble:'', props.allState?props.allState.level:'', "All Publication Types");}
        menuClick==="soloensemble"?menuClick="Lever/Pedal/En":''; // hack change e.target.name to 'Lever/Pedal/Ens'
        menuClick==="publicationtype"?menuClick="Publication Type":''; // hack change e.target.name to 'Lever/Pedal/Ens'
        const newState = {...props.allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo}
        const newSearchInfo = getSearchInfo(newState);
        props.setAllState({...props.allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}s`, searchInfo: newSearchInfo});
        
        //(props.allState.soloensemble, props.allState.level, props.allState.publicationtype);
    }
    useEffect(() => {
        triggerLazy();
    },[]);
    return (
        <>       
        <div className='storeproductSearchOuter'>
            <h3 className='storesearchTitle'>Searching for MUSIC? Refine your search here.</h3>
            <div className='storemobileSearchLine1'>
                <div ref={ref} className='storesearchLine1'>
                    <img src='./img/ribbon_black_full.png' alt="black background ribbon"/> 
                    <SoloEnsembleMenu 
                        id="soloensemblemenu"
                        handleSoloEnsembleChange={handleSoloEnsembleSelection} 
                        products={props.products}
                        // producttype={props.allState&&props.allState.productType}
                        currentselected={props.allState.soloensemble?props.allState.soloensemble:'Harp SoloEnsemble'}
                        handleclick={handleClick}
                        open={menus.soloensemble}
                    />            
                    <LevelMenu 
                        id="levelmenu"
                        handleLevelChange = {handleLevelSelection}
                        products={props.products}
                        currentselected={props.allState&&props.allState.level?props.allState.level:'All Levels'}
                        open={menus.level}
                        handleclick={handleClick}
                    />
                    <PublicationTypeMenu 
                        id='publicationtypemenu'
                        handlePublicationTypeChange = {handlePublicationTypeSelection}
                        currentselected={props.allState?props.allState.publicationtype:'All Publication Types'}
                        open={menus.publicationtype}
                        handleclick={handleClick}
                    /> 
                </div>
                <div className="storesearchLine1Sub">
                        <div 
                            id="selectedSoloEnsemble" 
                            className={`storesearch-grid-item`} 
                            value={props.allState&&props.allState.soloensemble}
                            onClick={()=>handleClick({target: {name: 'soloensemble'}})}
                        >
                            {props.allState&&props.allState.soloensemble}
                            {props.allState&&props.allState.soloensemble!=="All Lever/Pedal/Ens"
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
                            value={props.allState&&props.allState.level}
                            onClick={()=>handleClick({target: {name: 'level'}})}
                        >
                            {props.allState&&props.allState.level}
                            {props.allState&&props.allState.level!=="All Levels"
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
                            id="selectedAll Publication Types" 
                            className={`storesearch-grid-item`} 
                            value={props.allState&&props.allState.publicationtype}
                            onClick={()=>handleClick({target: {name: 'publicationtype'}})}
                        >
                            {props.allState&&props.allState.publicationtype}
                            {props.allState&&props.allState.publicationtype!=="All Publication Types"
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
            
            <StoreProductSearchCss />             
        </div>
        </>
    );
}

export default StoreProductSearch;
