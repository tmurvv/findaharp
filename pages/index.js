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
                <h5>This website is under construction and none of the design is implemented.<br></br>
                It will be beautiful! But right now, it is only functional.</h5>
                <h1>Find A Harp <span style={{fontStyle: 'italic', fontSize: '80%'}}>.com</span></h1>
                <p className='subTitle'>Save valuable time! Pre-owned harps from reputable harp stores and private sellers all in one place.</p>
            </div>
            <HarpSearch 
                makesmodels={props.makesModels}
                products={props.products}
            />
                        
        </div>
        <style jsx>{`
        .mainTitle {
            text-align: center;
            margin: auto;
            margin-bottom: 30px;
            
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
    const res = await axios.get('https://findaharp-api-testing.herokuapp.com/');
    // TESTING API
    // const res = await axios.get('https://findaharp-api-staging.herokuapp.com/');
    
    const products = res.data.harpData;
    const makesModels = res.data.harpMakesModels;
    
    return { products, makesModels };
}

export default Index;
