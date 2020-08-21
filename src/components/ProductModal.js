import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import parseNum from 'parse-num';
// internal
import ProductModalCSS from '../styles/ProductModal.css';
import { removeDashOE, getGeoDistance } from '../utils/helpers';
import { UserContext } from '../contexts/UserContext';
import { CurrencyContext } from '../contexts/CurrencyContext';

async function getDrivingDistance(lat1, long1, lat2, long2) {
    try {
        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long1}%2C${lat1}%3B${long2}%2C${lat2}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1IjoidG11cnZ2IiwiYSI6ImNrMHUxcTg5ZTBpN3gzbm4wN2MxYnNyaTgifQ.7p5zmmb6577ofkAIGVUcwA`);
        return response.data.routes[0].distance;
    } catch (error) {
        console.error(error);
    }
}

function ProductModal(props) {
    const { user } = useContext(UserContext);
    const { currencyMultiplier, setCurrencyMultiplier } = useContext(CurrencyContext);
    const [longDesc, setLongDesc] = useState(true);
    const [miles] = useState(user.distanceunit==='miles');
    const [geoDistance, setGeoDistance] = useState(0); //miles
    const [drivingDistance, setDrivingDistance] = useState(0); //miles
    const {productTitle, productMaker, productModel, productSize, productPrice, productType, productFinish, productLongDesc, productImageUrl, sellerCountry, sellerName, sellerLat, sellerLong} = props.product;
    // let productLongDescMine = "hilo <br /> here we are"
    if (props.product===undefined||!props.product) return props.handleCloseDetail();
    function handleClick(evt, product, openContact) {
        setLongDesc(true);
        props.handleCloseDetail(evt, product, openContact);
    }
    async function getDistances(lat1, long1, lat2, long2) {
        // Driving Distance
        const resultDist = await getDrivingDistance(lat1, long1, lat2, long2);
        miles?setDrivingDistance((resultDist*0.000621).toFixed(0)):setDrivingDistance((resultDist/1000).toFixed(0));
        // Geographical Distance
        const geoDist = getGeoDistance(lat1, long1, lat2, long2).toFixed(0);
        miles?setGeoDistance(geoDist):setGeoDistance((geoDist*1.609).toFixed(0));
    }
    function checkprice(price) {
        const checkIt = ['1','2','3','4','5','6','7','8','9','0','.',',','$']
        let endIndex = price.length;
        let stop = false;
        price=[...price];
        price.map((digit,idx) => {
            if (checkIt.indexOf(digit)<0) {
                if(!stop){
                    endIndex=idx; 
                    stop=true
                }
            };
        })
        return endIndex;
    }
    const convertPrice = (price) => {
        if (user.currency.toUpperCase()==="CAD") price = `$${(parseNum(price)*currencyMultiplier).toFixed(2)}`;
        return price;
    }
    useEffect(() => {
        document.querySelector('.longDesc').innerHTML = `<span>Description</span> ${productLongDesc}`;
    }, []);
    useEffect(() => {
        
    }, []);
    // get currency conversions, if necessary
    useEffect(() => {
        async function getMultiplier() {
            const multiplier = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=33d9a2db5c4410feb3f2');
            setCurrencyMultiplier(multiplier.data.USD_CAD);
        }
        
        if (user.currency.toUpperCase()==="CAD"&&!currencyMultiplier) getMultiplier();
      }, []);
    return (
        <>
        <div className='detailContainer'>
            <div onClick={(evt) => handleClick(evt, props.product, false)} className='clearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div> 
            <h1>{productModel.indexOf(productMaker)>-1?'':productMaker} {productModel}</h1>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden diveder line" />
            <div className='detailInfo'>
            <div className={`detailImg`}><img src= {productImageUrl} alt={productTitle} /></div>
            <div className={`detailText`}>
                <p><span>Maker</span> {productMaker}<br></br>
                <span>Model</span> {productModel}<br></br>
                <span>Size</span> {productSize?productSize:'?'} Strings / {productType}<br></br>
                <span>Price</span> {productPrice
                    ?`${convertPrice(productPrice.substring(0, checkprice(productPrice)))} ${productPrice.substring(0, checkprice(productPrice)).indexOf('usd')>-1||productPrice==='contact seller'?'contact seller':user.currency.toUpperCase()==="USD"?"US dollars":"Canadian Dollars"}`
                    :'contact seller'} <button
                    onClick={()=>alert('Currency preference is located in your profile. Please login or signup to change your currency preference.')}
                    style={{
                        color: '#6A75AA', 
                        textDecoration: 'underline', 
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        outline: 'none', 
                        fontSize: '12px', 
                        cursor: 'pointer'
                    }}
                    // key={uuid()}
                    name='Preference'
                >I prefer {user.currency.toUpperCase()==='USD'?'Canadian Dollars':'US Dollars'}</button>        <br />
                
                <span>Finish</span> {productFinish?productFinish:'unavailable'}</p>
                <br></br>
                <div className='longDesc'></div>
                {/* <div className='longDesc'><span>Description</span><br></br>{longDesc?productLongDesc:''}</div> */}
                
                <br></br>
                <p><span>Location</span> {sellerCountry?sellerCountry:'unavailable'}<br></br>
                <span>Distance</span> {drivingDistance===0
                    ?<button 
                        type='button'
                        className='blueFontButton'
                        onClick={()=>
                            navigator.geolocation
                            ?getDistances(props.clientlat, props.clientlong, sellerLat, sellerLong)
                            :alert('Location is not enabled on this device or computer. Please check location settings.')
                        }
                        style={{backgroundColor: 'white', outline: 'none', color:'#6A75AA', textDecoration:'none', border: 'none', fontSize: '14px'}}
                    >
                        Click here
                    </button>
                    :`Driving: ${drivingDistance}${miles?'Mi':'Kms'} / Straight Line: ${geoDistance}${miles?'Mi':'Kms'}`
                    }<br />
                <span>Seller</span> {sellerName?removeDashOE(sellerName):'unavailable'}<br></br></p>
                <button className='detailButton' onClick={(evt) => handleClick(evt, props.product, true)}>Contact Seller</button>        
            </div>          
        </div>
        </div>
        <ProductModalCSS />
        </>
    )
}

export default ProductModal;
