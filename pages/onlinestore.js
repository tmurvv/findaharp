// packages
import { useEffect, useState } from 'react';
import axios from 'axios';

// internal
import PageTitle from '../src/components/PageTitle';
import GlobalStoreSearch from '../src/components/onlineStore/GlobalStoreSearch';
import StoreIndexCss from '../src/styles/onlineStore/StoreIndex.css';
import OnlineStoreCss from '../src/styles/onlineStore/onlinestores/FindaharpOnlineStore.css';

const OnlineStore = (props) => {
    const [ searchResults, setSearchResults ] = useState();
    // display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    // sort products
    useEffect(()=>{
        // setFilteredProducts(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
        setSearchResults(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
    },[]);
    return (
        <>
            <div className='storeIndex'>
                <PageTitle maintitle="Online Store" subtitle='Featuring products sold by our store partners' /> 
                <GlobalStoreSearch 
                    filteredProducts={props.filteredProducts} 
                    featuredProducts={props.featuredProducts} 
                    music={props.music} 
                    strings={props.strings} 
                    setSearchResults={setSearchResults}
                />     
            </div>
            
            <StoreIndexCss />
            <OnlineStoreCss />
        </>
    )
}
OnlineStore.getInitialProps = async (props) => {
    /******************
     * LOCAL DATA
     ******************/
    //LOCAL DATA Populate variables
    // const products = testData;
    // const makesModels = testMakesModels;
    // return {filteredProducts: FINDAHARP_PRODUCTS}
    /*******************
     * API DATA
     *******************/
    // API
    const res = await axios.get(`https://findaharp-api.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-staging.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-testing.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`http://localhost:3000/api/v1/storeitems`); //BREAKINk
    const filteredProducts = res.data.storeitems;
    const featuredProducts = res.data.storeitems.filter(product => product.title.toUpperCase().includes("CHRISTMAS")||product.category==='gifts').sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    // filteredProducts.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)); 
    
    filteredProducts.sort((a,b) => (a.subcategory > b.subcategory) ? 1 : ((b.subcategory < a.subcategory) ? -1 : 0)  || (a.subsubcategory > b.subsubcategory) ? 1 : ((b.subsubcategory > a.subsubcategory) ? -1 : 0)  || a.order - b.order);   
    return {
        filteredProducts,
        featuredProducts,
        strings: res.data.storeitems.filter(product => product.title.toUpperCase().startsWith("3RD OCTAVE C")),
        music: res.data.storeitems.filter(product => product.category==="music")
    };
}
export default OnlineStore;
