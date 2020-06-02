// packages
import React, { useEffect, useState } from "react";
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
    const res = await axios.get('https://findaharp-api-staging.herokuapp.com/');
    // TESTING API
    // const res = await axios.get('https://findaharp-api-testing.herokuapp.com/');
    
    // API DATA Populate variables
    const products = res.data.harpData;
    const makesModels = res.data.harpMakesModels;
    products.sort((a,b) => (a.productModel > b.productModel) ? 1 : ((b.productModel > a.productModel) ? -1 : 0));
    return { products, makesModels };
}

export default Index;
