// packages
import React from "react";
import axios from 'axios';

// internal
import HarpSearch from '../src/components/HarpSearch';

const Index = (props) => {
    return (
        <>
        <div className="App">  
            <div className='mainTitle'>
                <h2>Find a Harp</h2>
            </div>
            <HarpSearch 
                makesmodels={props.makesModels}
                products={props.products}
            />                 
        </div>
        <style jsx>{`
        .App {
            background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
            margin: 0;
            padding-top: 20px;
            
        }
        .App h2 {
            margin-block-end:0;
            margin-block-start:0;
        }
        .mainTitle {
            text-align: center;
            margin: auto;
        }
        .subTitle {
            margin-top: 10px;
            font-size: 16px;
            font-style: italic;
        }
    `}
    </style>
        </>
    );
}
Index.getInitialProps = async () => {
    // Get product ads from api
    // PRODUCTION API
    // const res = await axios.get('https://findaharp-api.herokuapp.com/');
    // STAGING API
    // const res = await axios.get('https://findaharp-api-testing.herokuapp.com/');
    // TESTING API
    const res = await axios.get('https://findaharp-api-staging.herokuapp.com/');
    
    const products = res.data.harpData;
    const makesModels = res.data.harpMakesModels;
    
    return { products, makesModels };
}

export default Index;
