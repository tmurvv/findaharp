import { useEffect } from 'react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import GlobalStoreSearchCss from '../../styles/onlinestore/GlobalStoreSearch.css';
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


function GlobalStoreSearch(props) {
    
    function handleChange(e) {
        let currentProductList;
        let finalProductList=[];
        let categoryFilter;
        let searchTerm;

        //apply category filter
        if (document.querySelector('#categoryfilter')&&document.querySelector('#categoryfilter').value.toUpperCase()!=='ALL') {
            categoryFilter = document.querySelector('#categoryfilter').value;
        } else {
            currentProductList = [...FINDAHARP_PRODUCTS]
        }
        if(categoryFilter&&categoryFilter.toUpperCase()!=="ALL") {
            currentProductList = FINDAHARP_PRODUCTS.map(product=>{
                if (String(product.category).toUpperCase()===categoryFilter.toUpperCase()) {
                    finalProductList.push(product);
                } 
                else if (product.subcategories) {
                    product.subcategories.map(subcategory=>{if (subcategory.toUpperCase()===categoryFilter.toUpperCase()) finalProductList.push(product)})
                }
            });
        }
            
        //apply search filter
        if (document.querySelector('#searchInput').value) searchTerm = document.querySelector('#searchInput').value;
        if(searchTerm) {
            currentProductList.map(product=> {
                const keyList = Object.keys(product);
                keyList.every(key=>{
                  if (findNested(product, key, searchTerm)) {finalProductList.push(product); return false;}
                  return true;
                })
            });
        }
        // return result
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
                <select onChange={handleChange} style={{flex: '2'}} id='categoryfilter'>
                  <option>All</option>
                  <option disabled>Strings</option>
                  <option>Music</option>
                  <option>Accessories</option>
                  <option>Books</option>
                  <option disabled>Gifts</option>
                  <option>CDs</option>
                  <option disabled>Digital Downloads</option>
                  <option disabled>Other</option>
                </select>
                <input style={{flex: '8',height: '100%'}} type="text" id="searchInput" onChange={()=>handleChange()} placeholder="Search" title="Type in a name" />
                <img style={{color: 'lightgrey',padding: '5px', opacity: '.25'}} height='40px' src='/img/searchicon.png' alt='search icon' />
            </div>

            <GlobalStoreSearchCss />
        </>
    )
}

export default GlobalStoreSearch;
