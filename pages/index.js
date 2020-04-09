// packages
import React from "react";
import axios from 'axios';

// internal
import HarpSearch from '../src/components/HarpSearch';

const Index = (props) => {
    return (
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
    );
}
Index.getInitialProps = async () => {
    // const res = await axios.get('https://findaharp-api.herokuapp.com/');
    const res = await axios.get('https://findaharp-api-testing.herokuapp.com/');
    // const res = await axios.get('https://onestop-api-staging.herokuapp.com/');
    console.log(res.data.harpMakesModels)
    const products = res.data.harpData;
    const makesModels = res.data.harpMakesModels;
    
    return { products, makesModels };
}

export default Index;
