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

    function handleChange(level, soloensemble, publicationtype) {
        let productListCopy = [...FINDAHARP_PRODUCTS];
        console.log('start length', productListCopy.length);
        let levelProductList=[];
        let soloensembleProductList=[];
        let publicationProductList=[];
        let finalProductList=[];
        let categoryFilter;
        console.log('top', soloensemble, level, publicationtype);

        // check level
        if (level.toUpperCase()!=='ALL LEVELS') {
            productListCopy.map(product=> {
                // console.log(String(product.level).toUpperCase(),level.toUpperCase())
                if (String(product.level).toUpperCase()===level.toUpperCase()) levelProductList.push(product);
            })
            
            console.log('Level',levelProductList.length)
        } else {
            levelProductList=productListCopy;
        }
        finalProductList=[...levelProductList];
        // console.log('final', finalProductList)
        
        // check soloensemble
        console.log('here', soloensemble.toUpperCase())
        console.log(soloensemble.toUpperCase()==="ALL Solo/Ensembles")
        console.log(soloensemble.toUpperCase()!=="ALL Solo/Ensembles")
        if (soloensemble.toUpperCase()!=="ALL SOLO/ENSEMBLES") {
            console.log('in0')
            levelProductList.map(product=> {
                // console.log('in1')
                if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        console.log('imin',subcategory.toUpperCase())
                        if (subcategory.toUpperCase()===soloensemble.toUpperCase()) soloensembleProductList.push(product);
                    })
                }
            })
            finalProductList=[...soloensembleProductList]
            console.log('soloEnsemble', soloensembleProductList.length)
        } else {
            soloensembleProductList=[...levelProductList];
        }
        finalProductList=[...soloensembleProductList];
        // check publication
        if (publicationtype.toUpperCase()!=="ALL PUBLICATION TYPES") {
            console.log('inpub', soloensembleProductList.length)
            soloensembleProductList.map(product=> {
                // console.log('in1')
                if (product.subcategories) {
                    product.subcategories.map(subcategory=>{
                        console.log('imin',subcategory.toUpperCase())
                        if (subcategory.toUpperCase()===publicationtype.toUpperCase()) publicationProductList.push(product);
                    })
                    // product.subcategories.map(subcategory=>{if (subcategory.toUpperCase()===String(fromSearch.publicationType).toUpperCase()) categoryProductList.push(product)})
                }
            })
            finalProductList=[...publicationProductList]
            console.log('publication', publicationProductList.length)
        }else {
            publicationProductList=[...soloensembleProductList];
        }
        finalProductList=[...publicationProductList];

        // category


        //search term


        



        // //apply category filter
        // if (document.querySelector('#categoryfilter')&&document.querySelector('#categoryfilter').value.toUpperCase()!=='ALL') {
        //     categoryFilter = document.querySelector('#categoryfilter').value;
        // } else {
        //     categoryFilter="All";
        //     currentProductList = [...FINDAHARP_PRODUCTS]
        // }
        // if(categoryFilter&&categoryFilter.toUpperCase()!=="ALL"||1==1) {
        //     console.log('42')
        //     currentProductList = FINDAHARP_PRODUCTS.map(product=>{
        //         // console.log('45')
        //         if (String(product.category).toUpperCase()===categoryFilter.toUpperCase()) {
        //             categoryProductList.push(product);
        //         } 
                // if (product.subcategories) {
                //     // console.log('imin')
                //     product.subcategories.map(subcategory=>{
                //         if (subcategory.toUpperCase()===categoryFilter.toUpperCase()) categoryProductList.push(product);
                //         if (fromSearch.soloensemble&&subcategory.toUpperCase()===String(fromSearch.soloensemble).toUpperCase()) categoryProductList.push(product);
                //         if (fromSearch.publicationtype&&subcategory.toUpperCase()===String(fromSearch.publicationtype).toUpperCase()) categoryProductList.push(product);
                //     })
                //     product.subcategories.map(subcategory=>{if (subcategory.toUpperCase()===String(fromSearch.publicationType).toUpperCase()) categoryProductList.push(product)})
                // }
        //     });
        // } else {
        //     categoryProductList = [...currentProductList]
        // }
        // console.log('58', categoryProductList)
        // categoryProductList.map(product=>{
        //     if (String(product.soloensemble).toUpperCase()==="FLUTE/HARP") finalProductList.push(product);
        // });
        
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
            <StoreProductSearch handleChange={handleChange} setEnsembleSearch={setEnsembleSearch} setLevelSearch={setLevelSearch} setPublicationSearch={setPublicationSearch}/>
            <StoreProductSearchCss />
            <GlobalStoreSearchCss />
        </>
    )
}

export default GlobalStoreSearch;
