// packages
import React, { useState, useEffect } from 'react';
// context
import { UserContext } from '../../contexts/UserContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
// components
import StoreProductSearchCss from '../../styles/onlineStore/StoreProductSearch.css';
import SoloEnsembleMenu from './menus/SoloEnsembleMenu';
import LevelMenu from './menus/LevelMenu';
import PublicationTypeMenu from './menus/PublicationTypeMenu';
// other internal
import {
    getSearchInfo,
    triggerLazy
} from '../../utils/helpers';

const initialState = {
    category: false,
    title: false,
    artist: false,
    soloensemble: false, 
    level: false, 
    publicationtype: false
}
function StoreProductSearch(props) {
    const [menus, setMenus] = useState(initialState);
    
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
            level: level==='All Levels'?'All Levels':level,
            productType: 'all'
        }
        props.handleChange("music", 'level', props.allState?props.allState&&props.allState.soloensemble:'', level, props.allState?props.allState&&props.allState.publicationtype:'');
        props.setAllState({...props.allState, 
            level,
            productType: 'all',
            searchInfo: getSearchInfo(newState, 'music')
        });
        setMenus(initialState);
    }
    async function handlePublicationTypeSelection(publicationtype) {
        props.setTypeOfSearch("music");
        const newState = {...props.allState, 
            publicationtype: publicationtype==='All Publication Types'?'All Publication Types':publicationtype,
            productType: 'all',
        }
        props.handleChange('music', 'publicationtype', props.allState?props.allState&&props.allState.soloensemble:'', props.allState?props.allState&&props.allState.level:'', publicationtype);
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
    }
    useEffect(() => {
        triggerLazy();
    },[]);
    return (
        <>       
        <div className='storeproductSearchOuter'>
            <h3 className='storesearchTitle'>Searching for MUSIC? Refine your search here.</h3>
            <div className='storemobileSearchLine1'>
                <div className='storesearchLine1'>
                    <img src='./img/ribbon_black_full.png' alt="black background ribbon"/> 
                    <SoloEnsembleMenu 
                        id="soloensemblemenu"
                        handleSoloEnsembleChange={handleSoloEnsembleSelection} 
                        products={props.products}
                        // producttype={props.allState&&props.allState.productType}
                        currentselected={props.allState&&props.allState.soloensemble?props.allState.soloensemble:'Harp SoloEnsemble'}
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
                            onClick={()=>handleClick({target: {name: 'Lever/Pedal/Ens'}})}
                            style={{cursor: 'pointer'}}
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
                            style={{cursor: 'pointer'}}
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
                            style={{cursor: 'pointer'}}
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
