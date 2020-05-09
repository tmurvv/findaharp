// packages
import React from "react";
import axios from 'axios';

// internal
import IndexCss from '../src/styles/index.css.js'
import ProductSearch from '../src/components/ProductSearch';

// local test data
import testData from '../src/utils/testData';
import testMakesModels from '../src/utils/testMakesModels';

const Index = (props) => {
    return (
        <>
        <div className="index">  
            <div className='mainTitle'>
                <h2>Find a Harp</h2>
                <h3 className="subTitle">pre-owned harp listings from around the US and Canada</h3>
            </div>
            <ProductSearch 
                makesmodels={props.makesModels}
                products={props.products}
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
    const products = testData;
    const makesModels = testMakesModels;

    /*******************
     * API DATA
     *******************/
    // PRODUCTION API
    // const res = await axios.get('https://findaharp-api.herokuapp.com/');
    // STAGING API
    // const res = await axios.get('https://findaharp-api-staging.herokuapp.com/');
    // TESTING API
    // const res = await axios.get('https://findaharp-api.herokuapp.com/');
    
    // API DATA Populate variables
    // const products = res.data.harpData;
    // const makesModels = res.data.harpMakesModels;
    
    products.sort((a,b) => (a.productModel > b.productModel) ? 1 : ((b.productModel > a.productModel) ? -1 : 0)); 
    return { products, makesModels };
}

export default Index;
