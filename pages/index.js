// packages
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Head from 'next/head';
import axios from 'axios';

// internal
import IndexCss from '../src/styles/index.css.js';
import ProductSearch from '../src/components/ProductSearch';
import PageTitle from '../src/components/PageTitle';

// local test data
import testData from '../src/utils/testData';
import testMakesModels from '../src/utils/testMakesModels';

const Index = (props) => {
    const [clientLat, setClientLat] = useState();
    const [clientLong, setClientLong] = useState();
    const [router, setRouter] = useState();
    
    const Router = useRouter();
    // console.log('Index', Router.query);
    useEffect(() => {
        if (navigator&&navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) { // courtesy Gaurav Singhal, PluralSight
                setClientLat(position.coords.latitude.toFixed(4));
                setClientLong(position.coords.longitude.toFixed(4));
            });
        }
       }, []);
    return (
        <>
        <Head>
            <title>Find a Harp Pre-owned, Used</title>
            <meta name="Description" content="Pre-owned or used Harps of all types -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps -- great search capabilities from harp stores around the US and Canada" key="title" />
        </Head>
        <div className="index">  
            <PageTitle maintitle='Find a Harp' subtitle='Pre-owned harp listings from around the US and Canada' />
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

Index.getInitialProps = async () => {
    /******************
     * LOCAL DATA
     ******************/
    //LOCAL DATA Populate variables
    // const products = testData;
    // const makesModels = testMakesModels;

    /*******************
     * API DATA
     *******************/
    // PRODUCTION API
    // const res = await axios.get('https://findaharp-api.herokuapp.com/');
    // STAGING API
    // const res = await axios.get('https://findaharp-api-staging.herokuapp.com/');
    // TESTING API
    // const res = await axios.get('https://findaharp-api-testing.herokuapp.com/');
    // LOCAL API
    const res = await axios.get('http://localhost:3000');
    
    // API DATA Populate variables
    const products = res.data.harpData;
    const makesModels = res.data.harpMakesModels;
    products.sort((a,b) => (a.productModel > b.productModel) ? 1 : ((b.productModel > a.productModel) ? -1 : 0));
     
    return { products, makesModels };
}

export default Index;
