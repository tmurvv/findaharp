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

    function handleChange(soloensemble, level, publicationtype) {
        let productListCopy = [...FINDAHARP_PRODUCTS];
        let levelProductList=[];
        let soloensembleProductList=[];
        let publicationProductList=[];
        let categoryProductList=[];
        let searchProductList=[];
        let finalProductList=[];
        let categoryFilter;
        let searchTerm;

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
                if (product.subcategories) {
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
    useEffect(()=>{
        if(props.filteredProducts&&props.filteredProducts.length===0) {
            document.querySelector('#searchInput').focus();
        }
    })
    
    return (
        <>
            <div style={{width: '100%', maxWidth: '650px', margin: 'auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', border: '1px solid #ffe58a', backgroundColor: '#fff'}}>
                <select onChange={()=>handleChange(ensembleSearch,levelSearch,publicationSearch)} style={{flex: '2'}} id='categoryfilter'>
                  <option>All</option>
                  <option disabled>Strings</option>
                  <option>Music</option>
                  <option>Accessories</option>
                  <option>Books</option>
                  <option disabled>Gifts</option>
                  <option>CDs</option>
                  <option>Digital Downloads</option>
                  <option disabled>Other</option>
                </select>
                <input style={{flex: '8',height: '100%'}} type="text" id="searchInput" onChange={()=>handleChange()} placeholder="Search" title="Type in a name" />
                <img style={{color: 'lightgrey',padding: '5px', opacity: '.25'}} height='40px' src='/img/searchicon.png' alt='search icon' />
            </div>
            <StoreProductSearch handleChange={handleChange} setEnsembleSearch={setEnsembleSearch} setLevelSearch={setLevelSearch} setPublicationSearch={setPublicationSearch}/>
            <StoreProductSearchCss />
            <GlobalStoreSearchCss />
        </>
    )
}

export default GlobalStoreSearch;
