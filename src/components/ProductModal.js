import React, { useState } from 'react';
import axios from 'axios';
// internal
import ProductModalCSS from '../styles/ProductModal.css';
import { removeDashOE, geoDistance } from '../utils/helpers';

async function getDrivingDistance(lat1, long1, lat2, long2) {
    try {
        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long1}%2C${lat1}%3B${long2}%2C${lat2}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidG11cnZ2IiwiYSI6ImNrMHUxcTg5ZTBpN3gzbm4wN2MxYnNyaTgifQ.7p5zmmb6577ofkAIGVUcwA`);
        console.log(response.data.routes[0].distance)
        return response.data.routes[0].distance;
    } catch (error) {
        console.error(error);
    }
}

function ProductModal(props) {
    const [longDesc, setLongDesc] = useState(true);
    const [miles, setMiles] = useState(true);
    const [distanceM, setDistanceM] = useState(0); //miles
    const [distanceK, setDistanceK] = useState(0); //km
    const [drivingDistanceM, setDrivingDistanceM] = useState(0); //miles
    const [drivingDistanceK, setDrivingDistanceK] = useState(0); //miles
    const {productTitle, productMaker, productModel, productSize, productPrice, productType, productFinish, productLongDesc, productImageUrl, sellerRegion, sellerName, sellerLat, sellerLong} = props.product;
    if (props.product===undefined||!props.product) return props.handleCloseDetail();
    
    function handleClick(evt, product, openContact) {
        setLongDesc(true);
        props.handleCloseDetail(evt, product, openContact);
    }
    async function getDistances(lat1, long1, lat2, long2) {
        const resultDist = await getDrivingDistance(lat1, long1, lat2, long2);
        setDrivingDistanceM((resultDist*0.000621).toFixed(0));
        setDrivingDistanceK((resultDist/1000).toFixed(0));
        const geoDist = geoDistance(lat1, long1, lat2, long2).toFixed(0);
        setDistanceM(geoDist);
        setDistanceK((geoDist*1.609).toFixed(0));
    }

    return (
        <>
        <div className='detailContainer'>
            <h1>{productMaker} {productModel}</h1>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden diveder line" />
            <div className='detailInfo'>
            <div className={`detailImg`}><img src= {productImageUrl} alt={productTitle} /></div>
            <div className={`detailText`}>
                <p><span>Maker</span> {productMaker}<br></br>
                <span>Model</span> {productModel}<br></br>
                <span>Size</span> {productSize?productSize:'unavailable'} Strings / {productType}<br></br>
                <span>Price</span> {productPrice?productPrice:'unavailable'}<br></br>
                <span>Finish</span> {productFinish?productFinish:'unavailable'}</p>
                <span>Distance</span> {drivingDistanceM===0
                    ?<button 
                        type='button'
                        className='blueFontButton'
                        onClick={()=>getDistances(props.clientlat, props.clientlong, sellerLat, sellerLong)}
                        style={{backgroundColor: 'white', outline: 'none', color:'#6A75AA', textDecoration:'none', border: 'none', fontSize: '14px'}}
                    >
                    Click here
                    </button>
                    :miles?`Driving: ${drivingDistanceM}Mi / Straight Line: ${distanceM}Mi`:`Driving: ${drivingDistanceK}Km / Straight Line: ${distanceK}Km`}
                    {distanceM===0?'':<button 
                        type='button'
                        onClick={()=>{setMiles(!miles);}}
                        style={{float: 'right', backgroundColor: 'white', outline: 'none', color:'#6A75AA', textDecoration:'none', border: 'none', fontSize: '12px'}}
                    >
                    {miles?'to Kms':'to Miles'}
                    </button>
                    }
                <br></br>
                <div className='longDesc'><span>Description</span><br></br>{longDesc?productLongDesc:''}</div>
                <br></br>
                <p><span>Location</span> {sellerRegion?sellerRegion:'unavailable'}<br></br>
                <span>Seller</span> {sellerName?removeDashOE(sellerName):'unavailable'}<br></br></p>
                <button className='detailButton' onClick={(evt) => handleClick(evt, props.product, true)}>Contact Seller</button>        
            </div>

            <div onClick={(evt) => handleClick(evt, props.product, false)} className='clearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div>  
        </div>
        </div>
        <ProductModalCSS />
        </>
    )
}

export default ProductModal;
