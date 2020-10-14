import { useEffect, useState} from 'react';

import StoreProductSearch from '../../components/onlineStore/StoreProductSearch'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import GlobalStoreSearchCss from '../../styles/onlinestore/GlobalStoreSearch.css';
import StoreProductSearchCss from '../../styles/onlinestore/StoreProductSearch.css';
import { SHIPPING_CALCULATIONS } from '../../constants/constants';
import { FINDAHARP_PRODUCTS } from '../../constants/FindaharpProducts'
import {
    getFilteredProducts,
    getSearchInfo,
    triggerLazy
} from '../../utils/helpers';
import { 
    selectRegion,
    tax
} from '../../utils/checkoutHelpers';
import { 
    findNested
} from '../../utils/searchProductsHelpers';
import { PublicTwoTone } from '@material-ui/icons';


function GlobalStoreSearch(props) {
    const [ ensembleSearch, setEnsembleSearch ] = useState();
    const [ levelSearch, setLevelSearch ] = useState();
    const [ publicationSearch, setPublicationSearch ] = useState();

    function handleChange(soloensemble, level, publicationtype, reset) {
        console.log('top', soloensemble, level, publicationtype, reset)
        // initialize variables
        let productListCopy = [...FINDAHARP_PRODUCTS];
        let levelProductList=[];
        let soloensembleProductList=[];
        let publicationProductList=[];
        let categoryProductList=[];
        let searchProductList=[];
        let finalProductList=[];
        let categoryFilter;
        let searchTerm;
        // add clear searches button
        if (document&&document.querySelector('#clearSearch')) document.querySelector('#clearSearch').style.display=reset?"none":"flex";
        // check level
        if (level&&level.toUpperCase()!=='ALL LEVELS') {
            productListCopy.map(product=> {
                if (String(product.level).toUpperCase()===level.toUpperCase()) levelProductList.push(product);
            })
        } else {
            levelProductList=[...productListCopy];
        }
        finalProductList=[...levelProductList];
        // check soloensemble
        if (soloensemble&&soloensemble.toUpperCase()!=="ALL SOLO/ENSEMBLES") {
            levelProductList.map(product=> {
                if (String(soloensemble).toUpperCase()==="LEVER HARP") {
                    if (product.harptype) {
                        if (String(product.harptype).toUpperCase()===soloensemble.toUpperCase()) soloensembleProductList.push(product);
                    }
                } else if (String(soloensemble).toUpperCase()==="PEDAL HARP") {
                    if (product.harptype) {
                        if (String(product.harptype).toUpperCase()===soloensemble.toUpperCase()) soloensembleProductList.push(product);
                    }
                } else if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        if (subcategory.toUpperCase()===soloensemble.toUpperCase()) soloensembleProductList.push(product);
                    })
                }
            });
        } else {
            soloensembleProductList=[...levelProductList];
        }
        finalProductList=[...soloensembleProductList];
        // check publication
        if (publicationtype&&publicationtype.toUpperCase()!=="ALL PUBLICATION TYPES") {
            console.log('inpub', soloensembleProductList.length)
            soloensembleProductList.map(product=> {
                if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        console.log('imin',subcategory.toUpperCase())
                        if (subcategory.toUpperCase()===publicationtype.toUpperCase()) publicationProductList.push(product);
                    })
                }
            });
        }else {
            publicationProductList=[...soloensembleProductList];
        }
        finalProductList=[...publicationProductList];
        // category
        if (document.querySelector('#categoryfilter')&&document.querySelector('#categoryfilter').value.toUpperCase()!=='ALL') {
            categoryFilter = document.querySelector('#categoryfilter').value;
        }
        if (reset) categoryFilter="All";
        if(categoryFilter&&categoryFilter.toUpperCase()!=="ALL") {
            publicationProductList.map(product=>{
                if (String(product.category).toUpperCase()===categoryFilter.toUpperCase()) {
                    categoryProductList.push(product);
                } 
                if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        if (subcategory.toUpperCase()===categoryFilter.toUpperCase()) categoryProductList.push(product);
                    })
                }
            });
        } else {
            categoryProductList = [...publicationProductList]
        }
        finalProductList=[...categoryProductList];
        //search term
        if (document.querySelector('#searchInput').value) searchTerm = document.querySelector('#searchInput').value;
        if(searchTerm) {
            categoryProductList.map(product=> {
                const keyList = Object.keys(product);
                keyList.every(key=>{
                    if (findNested(product, key, searchTerm)) {searchProductList.push(product); return false;}
                    return true;
                })
            });
        } else {
            searchProductList=[...categoryProductList]
        }
        finalProductList=[...searchProductList];
        props.setFilteredProducts(finalProductList)
    }
    function handleClear(evt) {
        document.querySelector('#categoryfilter').value='All';
        console.log('her',document.querySelector('#categoryfilter').value)
        document.querySelector('#searchInput').value='';
        
        setEnsembleSearch('All Lever/Pedal/Ens');
        setLevelSearch('All Levels');
        setPublicationSearch('All Publication Types');
        handleChange('All Lever/Pedal/Ens', 'All Levels', 'All Publication Types', true)
    }
    useEffect(()=>{
        if(props.filteredProducts&&props.filteredProducts.length===0) {
            document.querySelector('#searchInput').focus();
        }
    })
    
    return (
        <>
            <div style={{width: '100%', maxWidth: '650px', margin: 'auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', border: '1px solid #ffe58a', backgroundColor: '#fff'}}>
                <select onChange={()=>handleChange(ensembleSearch,levelSearch,publicationSearch)} style={{flex: '2'}} id='categoryfilter'>
                  <option name='All'>All</option>
                  <option name='Strings'>Strings</option>
                  <option name='Music'>Music</option>
                  <option name='Accessories'>Accessories</option>
                  <option name='Books'>Books</option>
                  <option name='Gifts'>Gifts</option>
                  <option name='CDs'>CDs</option>
                  <option name='Digital Downloads'>Digital Downloads</option>
                </select>
                <input style={{flex: '8'}} type="text" id="searchInput" onChange={()=>handleChange(ensembleSearch,levelSearch,publicationSearch, false)} placeholder="Search" />
                <img style={{padding: '5px', backgroundColor: '#f9bf1e', height: '43px'}} src='/img/searchicon.png' alt='search icon' />
            </div>
            <StoreProductSearch handleClear={handleClear} handleChange={handleChange} setEnsembleSearch={setEnsembleSearch} setLevelSearch={setLevelSearch} setPublicationSearch={setPublicationSearch}/>
            <StoreProductSearchCss />
            <GlobalStoreSearchCss />
        </>
    )
}

export default GlobalStoreSearch;
