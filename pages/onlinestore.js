// packages
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import axios from 'axios';
import uuid from 'react-uuid';
import Router from 'next/router';

// internal
import { FINDAHARP_PRODUCTS } from '../src/constants/FindaharpProducts'
import StoreProduct from '../src/components/onlineStore/StoreProduct';
import InfiniteProducts from '../src/components/onlineStore/InfiniteProducts';
import ProductScroll from '../src/components/onlineStore/ProductScroll';
import StoreProductContainer from '../src/components/onlineStore/StoreProductContainer';
import StoreItemsHighlight from '../src/components/onlineStore/StoreItemsHighlight';
import PageTitle from '../src/components/PageTitle';
import IndexCss from '../src/styles/index.css';
import OnlineStoreCss from '../src/styles/onlinestore/onlinestores/FindaharpOnlineStore.css';
import StoreProductSearch from '../src/components/onlineStore/StoreProductSearch';
import GlobalStoreSearch from '../src/components/onlineStore/GlobalStoreSearch';
import StoreProductContainerCss from '../src/styles/onlinestore/StoreProductContainer.css';
import { UserContext } from '../src/contexts/UserContext';

const OnlineStore = (props) => {
    // const [ filteredProducts, setFilteredProducts ] = useState(props.filteredProducts);
    const [ searchResults, setSearchResults ] = useState();
    const [ featuredProducts, setFeaturedProducts ] = useState(props.featuredProducts);
    const [ strings, setStrings ] = useState(props.strings);
    const [ music, setMusic ] = useState(props.music);
    const { user } = useContext(UserContext);
    // display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    // sort products
    useEffect(()=>{
        // setFilteredProducts(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
        setSearchResults(props.filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
    },[]);
    return (
        <>
            <div className='index' style={{height: 'fit-content', padding: '15px', paddingTop: '70px'}}>
                <PageTitle maintitle="Online Store" subtitle='Thousands more items coming in November' /> 
                <GlobalStoreSearch filteredProducts={props.filteredProducts} setSearchResults={setSearchResults}/>
                <h3 style={{width: '80%', textAlign: 'left', margin:'auto', marginBottom: '-65px', marginTop: '50px', fontFamily: "Metropolis Extra Bold"}}>HOLIDAY/GIFTS</h3>
                {/* <StoreItemsHighlight filteredProducts={featuredProducts}/> */}
                <br />
                <br />
                <h3 style={{width: '80%', textAlign: 'left', margin:'auto', marginBottom: '-65px', marginTop: '50px', fontFamily: "Metropolis Extra Bold"}}>STRINGS</h3>
                {/* <StoreItemsHighlight filteredProducts={strings} heading={'STRINGS'}/> */}
                {/* <h3 style={{width: '80%', textAlign: 'left', margin:'auto', marginBottom: '-110px', fontFamily: "Metropolis Extra Bold"}}>MUSIC</h3> */}
                {/* <StoreItemsHighlight filteredProducts={music} heading={'MUSIC'}/> */}
                <br />
                <br />
                <hr />
                <br />
                <br />
                <h3 style={{width: '80%', textAlign: 'left', margin:'auto', fontFamily: "Metropolis Extra Bold"}}>SEARCH RESULTS SHOWING: All products</h3>
                
                {/* <ProductScroll /> */}
                
                
                {/* <StoreProductContainer filteredproductscontainer={props.filteredProducts}/> */}
                <br />
                {/* <h1>{searchResults&&searchResults[2].title} {searchResults&&searchResults.length}</h1> */}
                
                {/* {searchResults&&searchResults.length>0?<InfiniteProducts searchResults={searchResults}/>:''} */}
                
                <ProductScroll filteredproductscontainer={props.filteredProducts}/>
            </div>
            <IndexCss />
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
    // const res = await axios.get(`https://findaharp-api.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-staging.herokuapp.com/api/v1/storeitems`);
    // const res = await axios.get(`https://findaharp-api-testing.herokuapp.com/api/v1/storeitems`);
    const res = await axios.get(`http://localhost:3000/api/v1/storeitems`);
    return {
        filteredProducts: res.data.storeitems, 
        featuredProducts: res.data.storeitems.filter(product => product.title.toUpperCase().includes("CHRISTMAS")||product.category==='gifts'), 
        strings: res.data.storeitems.filter(product => product.title.toUpperCase().startsWith("3RD OCTAVE C")), 
        music: res.data.storeitems.filter(product => product.category==="music")
    };
    



    // console.log(res.data)
    // API DATA Populate variables
    // const products = res.data.harpData;
    // const makesModels = res.data.harpMakesModels;
    // products.map(product => {
    //     product.productImageUrl.indexOf('genericHarp.png')>-1?product.productModel=`zz${product.productModel}`:'';
    // });
    // products.sort((a,b) => (a.productModel > b.productModel) ? 1 : ((b.productModel > a.productModel) ? -1 : 0));
    // products.map(product => {
    //     product.productModel.startsWith('zz')?product.productModel=`${product.productModel.substr(2)}`:'';
    // });
    // return { products, makesModels, verifying: false, found: false };
    
}
export default OnlineStore;
