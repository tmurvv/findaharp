// packages
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import axios from 'axios';

// internal
import IndexCss from '../src/main/styles/index.css.js';
import ProductSearch from '../src/main/components/main/ProductSearch';
import PageTitle from '../src/main/components/main/PageTitle';
import Spinner from '../src/main/components/main/Spinner';

// // local test data
// import testData from '../src/main/utils/testData';
// import testMakesModels from '../src/main/utils/testMakesModels';

const Index = (props) => {
    const [clientLat, setClientLat] = useState();
    const [clientLong, setClientLong] = useState();

    // get client lat/long
    useEffect(() => {
        if (navigator&&navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) { // courtesy Gaurav Singhal, PluralSight
                setClientLat(position.coords.latitude.toFixed(4));
                setClientLong(position.coords.longitude.toFixed(4));
            });
        }
    }, []);
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
        
    },[]);
    return (
        <>
        <Head>
            <title>Find a Harp Pre-owned, Used</title>
            <meta name="Description" content="Pre-owned or used Harps of all types -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities from harp stores around the US and Canada" key="title" />
        </Head>
        
        <div className="index" >
            <Spinner />
            {/* <div onClick={()=>document.querySelector('#spinner').style.display='block'} style={{position: 'absolute', top: '15px', right: '15px', overflow: 'hidden'}}>
                    <FastNEasyStringForm />
            </div> */}
            <PageTitle maintitle='Find a Used Harp' subtitle='Used harp listings from around the US and Canada' />
            <ProductSearch 
                makesmodels={props.makesModels}
                products={props.products}
                clientlat={clientLat}
                clientlong={clientLong}
            />
        </div>
        <IndexCss />
        </>
    );
}

Index.getInitialProps = async (props) => {
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
        const res = await axios.get(`https://findaharp-api.herokuapp.com`);
        // const res = await axios.get(`https://findaharp-api-staging.herokuapp.com`);
        // const res = await axios.get(`https://findaharp-api-testing.herokuapp.com`);
        // const res = await axios.get(`http://localhost:3000`); // BREAKINk
        // API DATA Populate variables
        const products = res.data.harpData;
        const makesModels = res.data.harpMakesModels;
        products.map(product => {
            product.productImageUrl.indexOf('genericHarp.png')>-1?product.productModel=`zz${product.productModel}`:'';
        });
        products.sort((a,b) => (a.productModel > b.productModel) ? 1 : ((b.productModel > a.productModel) ? -1 : 0));
        products.map(product => {
            product.productModel.startsWith('zz')?product.productModel=`${product.productModel.substr(2)}`:'';
        });
        return { products, makesModels, verifying: false, found: false };
}

export default Index;
