// packages
import React from "react";
import axios from 'axios';

// internal
import IndexCss from '../src/styles/index.css.js'
import ProductSearch from '../src/components/ProductSearch';

const Index = (props) => {
    return (
        <>
        <div className="index">  
            <div className='mainTitle'>
                <h2>Find a Harp</h2>
                <h3 className="subTitle">Harp listings gathered from North American harp stores and private sellers.</h3>
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
    // Get product ads from api
    // PRODUCTION API
    const res = await axios.get('https://findaharp-api.herokuapp.com/');
    // STAGING API
    // const res = await axios.get('https://findaharp-api-testing.herokuapp.com/');
    // TESTING API
    // const res = await axios.get('https://findaharp-api-staging.herokuapp.com/');
    
    const products = res.data.harpData;
    const makesModels = res.data.harpMakesModels;
    console.log(products.length)
    return { products, makesModels };
}

export default Index;
