// packages
import React, { useState, useEffect } from 'react';
// components
import OctavesMenu from './menus/OctavesMenu';
import NotesMenu from './menus/NotesMenu';
import BrandsMenu from './menus/BrandsMenu';
import TypesMenu from './menus/TypesMenu';
// other internal
import StoreProductSearchCss from '../../styles/onlineStore/StoreProductSearch.css';
import { getSearchInfo, triggerLazy } from '../../utils/helpers';

const initialState = {
    category: false,
    title: false,
    artist: false,
    octaves: false,
    notes: false,
    brands: false, 
    types: false
}
function StoreProductSearchStrings(props) {
    const [menus, setMenus] = useState(initialState);
    
    function handleOctavesSelection(octaves) {
        props.setTypeOfSearch("strings");
        const newState = {...props.allState, 
            octaves: octaves,
            productType: 'all'
        }
        props.setOctavesSearch(octaves);
        props.handleChange('strings', 'octaves', octaves, props.allState.notes, props.allState.brands, props.allState.types);
        props.setAllState({...props.allState, 
            octaves,
            productType: 'all',
            searchInfo: getSearchInfo(newState)
        });
        setMenus(initialState);
    }
    function handleNotesSelection(notes) {
        props.setTypeOfSearch("strings");
        const newState = {...props.allState, 
            notes,
            productType: 'all'
        }
        props.setNotesSearch(notes);
        props.handleChange('strings', 'notes', props.allState.octaves, notes, props.allState.brands, props.allState.types);
        props.setAllState({...props.allState, 
            notes,
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
        props.handleChange('strings', 'brands', props.allState.octaves, props.allState.notes, brands, props.allState.types);
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
        props.handleChange('strings', 'types', props.allState.octaves, props.allState.notes, props.allState.brands, types);
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
                    notes: false,
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
                    notes: false,
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
                    notes: false,
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
                    notes: false,
                    brands: false,
                    types: false
                });
                break;
            case 'notes':
                setMenus({
                    category: false,
                    artist: false,
                    title: false,
                    octaves: false,
                    notes: !menus.notes,
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
                    notes: false,
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
                    notes: false,
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
                    notes: false,
                    brands: false,
                    types: false
                });
        }
    }
   function clearOneFilter(e) {
        let menuClick = e.target.name;
        if (menuClick==='octaves') {props.setOctavesSearch("All Octaves"); props.handleChange("strings","octaves","All Octaves", props.allState.notes, props.allState.brands, props.allState.types);}
        if (menuClick==='notes') {props.setNotesSearch("All Notes"); props.handleChange("strings","notes",props.allState.Octaves, "All Notes", props.allState.brands, props.allState.types);}
        if (menuClick==='brands') {props.setBrandsSearch("All Brands"); props.handleChange("strings","brands",props.allState.octaves, props.allState.notes, "All Brands", props.allState.types);}
        if (menuClick==='types') {props.setTypesSearch("All Types"); props.handleChange("strings","types",props.allState.octaves, props.allState.notes, props.allState.brands, "All Types");}
        const newState = {...props.allState, [e.target.name]: `All ${menuClick.charAt(0).toUpperCase()}${menuClick.slice(1)}`, searchInfo: newSearchInfo}
        const newSearchInfo = getSearchInfo(newState);
        props.setAllState({...newState, searchInfo: newSearchInfo});
    }
    useEffect(() => {
        triggerLazy();
    },[]);
    return (
        <>       
        <div className='storeproductSearchOuter'>
            <h3 className='storesearchTitle'>
                Searching for STRINGS? Refine your search here.<br />
                {/* <img 
                    src='img/store/icon-fast-0.jpg' 
                    alt='fast cart' 
                    style={{
                        width: '35px', 
                        height: '20px', 
                        transform: 'translate(0px, 5px)', 
                        opacity: '.4'
                    }}
                />
                    &nbsp;&nbsp;<span style={{fontStyle: 'normal', fontWeight: 'bold'}}>
                        Fast and Easy
                    </span> string order form coming soon!! */}
            </h3>
            <div className='storemobileSearchLine2'>
                <div className='storesearchLine2'>
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
                    <NotesMenu 
                        id="notesmenu"
                        handleNotesChange={handleNotesSelection} 
                        products={props.products}
                        makestitles={props.makestitles}
                        currentselected={props.allState.notes?props.allState.notes:'All Notes'}
                        handleclick={handleClick}
                        open={menus.notes}
                        clearMenu={props.clearMenus}
                    />
                    <BrandsMenu 
                        id="brandsmenu"
                        handleBrandsChange = {handleBrandsSelection}
                        products={props.products}
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
                            id="selectedNotes" 
                            className={`storesearch-grid-item`} 
                            value={props.allState&&props.allState.notes}
                            onClick={()=>handleClick({target: {name: 'notes'}})}
                            style={{cursor: 'pointer'}}
                        >
                            {props.allState&&props.allState.notes}
                            {props.allState&&props.allState.notes!=="All Notes"
                                ?<img 
                                    name='notes'
                                    onClick={
                                        (e)=>{
                                            e.stopPropagation(); 
                                            clearOneFilter({target:{name:'notes'}});
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
