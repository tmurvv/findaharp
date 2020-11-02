// packages
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import axios from 'axios';
import uuid from 'react-uuid';
import Router from 'next/router';

// internal
import { FINDAHARP_PRODUCTS } from '../src/constants/FindaharpProducts'
import StoreProduct from '../src/components/onlineStore/StoreProduct';
import StoreProductContainer from '../src/components/onlineStore/StoreProductContainer';
import StoreItemHighlight from '../src/components/onlineStore/StoreItemHighlight';
import PageTitle from '../src/components/PageTitle';
import IndexCss from '../src/styles/index.css';
import OnlineStoreCss from '../src/styles/onlinestore/onlinestores/FindaharpOnlineStore.css';
import StoreProductSearch from '../src/components/onlineStore/StoreProductSearch';
import GlobalStoreSearch from '../src/components/onlineStore/GlobalStoreSearch';
import StoreProductContainerCss from '../src/styles/onlinestore/StoreProductContainer.css';
import { UserContext } from '../src/contexts/UserContext';

const OnlineStore = (props) => {
    console.log(props);
    const [ filteredProducts, setFilteredProducts ] = useState(FINDAHARP_PRODUCTS);
    const { user } = useContext(UserContext);
    // display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    // sort products
    useEffect(()=>{
        setFilteredProducts(filteredProducts.sort((a,b) => (a.artist_last > b.artist_last) ? 1 : ((b.artist_last > a.artist_last) ? -1 : 0)));
    },[]);
    return (
        <>
            <div className='index' style={{height: 'fit-content', padding: '15px', paddingTop: '70px'}}>
                <PageTitle maintitle="Online Store" subtitle='Thousands more items coming in November' /> 
                <GlobalStoreSearch filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts}/>
                {/* <StoreItemHighlight filteredProducts={filteredProducts}/> */}
                {/* <StoreProductContainer filteredproductscontainer={filteredProducts}/> */}
                <StoreProductContainer filteredproductscontainer={props.filteredProducts}/>
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

    /*******************
     * API DATA
     *******************/
    // API
    // const res = await axios.get(`https://findaharp-api.herokuapp.com`); // BREAKING
    // const res = await axios.get(`https://findaharp-api-staging.herokuapp.com`);
    // const res = await axios.get(`https://findaharp-api-testing.herokuapp.com`);
    const res = await axios.get(`http://localhost:3000/api/v1/storeitems`);
    
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
    return {filteredProducts: res.data.storeitems};
}
export default OnlineStore;
