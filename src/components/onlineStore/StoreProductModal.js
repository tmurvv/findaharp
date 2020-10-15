import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import uuid from 'uuid';
// import parseNum from 'parse-num';
// // internal
import StoreProductModalCSS from '../../styles/onlineStore/StoreProductModal.css';
// import { removeDashOE, getGeoDistance } from '../utils/helpers';
// import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import {
    incQty
} from '../../utils/storeHelpers';


function StoreProductModal(props) {
    // const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { currency } = useContext(CurrencyContext);
    
    const {
        id,
        category, 
        subcategories, 
        title, 
        artist_first,
        artist_last,
        price, 
        newprice,
        condition,
        level,
        harptype,
        notes,
        image, 
        description
    } = props.product;
    // // let productLongDescMine = "hilo <br /> here we are"
    // if (props.product===undefined||!props.product) return props.handleCloseDetail();
    function handleClick(evt, product, openContact) {
        props.handleCloseDetail(evt, product, openContact);
    }

    const updateCart = (e) => {
        
        // update cart
        if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
            const targetItem = cart.find(item=>item.title===e.target.getAttribute('data-item-title'));
            if (targetItem&&targetItem.newused&&targetItem.newused==='used') {
                alert('Only 1 in stock. This item already in cart.')
            } else {
                incQty(cart, setCart, e.target.getAttribute('data-item-title'));
            }
        } else {
            const cartCopy = [...cart];
            const thisItem = {
                id: uuid(),
                store: e.target.getAttribute('data-item-store'),
                title: e.target.getAttribute('data-item-title'),
                artist: e.target.getAttribute('data-item-artist_first'),
                artist: e.target.getAttribute('data-item-artist_last'),
                description: e.target.getAttribute('data-item-description'), 
                price: e.target.getAttribute('data-item-price'), 
                condition: e.target.getAttribute('data-item-condition'),
                level: e.target.getAttribute('data-item-level'),
                harptype: e.target.getAttribute('data-item-harptype'),
                newprice: e.target.getAttribute('data-item-newprice'),
                notes: e.target.getAttribute('data-item-notes'),
                product_image: e.target.getAttribute('data-item-url'),
                newused: e.target.getAttribute('newused'),
                product_quantity: '1'    
            }
            cartCopy.push(thisItem);
            setCart(cartCopy);
        }
    }
    function handleAdd(e) {   
        // a trick to restart animation courtesy Chris Coyier. Does not work in strict mode
        
        e.target.addEventListener("webkitAnimationend", updateCart(e));
        e.target.addEventListener("animationend", updateCart(e));
        e.target.classList.add("storeflyToCart");
        
    }
    // async function getDistances(lat1, long1, lat2, long2) {
    //     // Driving Distance
    //     const resultDist = await getDrivingDistance(lat1, long1, lat2, long2);
    //     if (resultDist===NaN) {
    //         alert("Something went wrong. Check network connection and be sure location settings are enabled.");
    //         setDrivingDistance(0);
    //     }
    //     miles?setDrivingDistance((resultDist*0.000621).toFixed(0)):setDrivingDistance((resultDist/1000).toFixed(0));
    //     // Geographical Distance
    //     const geoDist = getGeoDistance(lat1, long1, lat2, long2).toFixed(0);
    //     miles?setGeoDistance(geoDist):setGeoDistance((geoDist*1.609).toFixed(0));
    // }
    // function checkprice(price) {
    //     const checkIt = ['1','2','3','4','5','6','7','8','9','0','.',',','$']
    //     let endIndex = price.length;
    //     let stop = false;
    //     price=[...price];
    //     price.map((digit,idx) => {
    //         if (checkIt.indexOf(digit)<0) {
    //             if(!stop){
    //                 endIndex=idx; 
    //                 stop=true
    //             }
    //         };
    //     })
    //     return endIndex;
    // }
    // const convertPrice = (price) => {
    //     if (user.currency.toUpperCase()==="CAD") price = `$${(parseNum(price)*currencyMultiplier).toFixed(2)}`;
    //     return price;
    // }
    // // get currency conversions, if necessary
    // useEffect(() => {
    //     async function getMultiplier() {
    //         const multiplier = await axios.get('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=33d9a2db5c4410feb3f2');
    //         setCurrencyMultiplier(multiplier.data.USD_CAD);
    //     }
        
    //     if (user.currency.toUpperCase()==="CAD"&&!currencyMultiplier) getMultiplier();
    //   }, []);
    return (
        <>
        <div className='storedetailContainer'>
            <div onClick={(evt) => handleClick(evt, props.product, false)} className='storeclearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div> 
            <div style={{fontSize: '18px'}}>{title}</div>
            <div style={{fontSize: '14px', fontStyle: 'italic', marginBottom: '15px'}}>{artist_first||artist_last?artist_first+'   '+artist_last:"_"}</div>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden divider line" />
            <div className='storedetailInfo' style={{marginTop: '15px'}}>
                <div className={`storedetailImg`}><img src= {image} alt={title} /></div>
                <div className={`storedetailText`}>
                    <div>
                        <p>{description} <br/><br/>
                            <span>Level:</span> {level}<br/>
                            <span>Harp Type:</span> {harptype}<br/>
                            <span>Condition (1-10):</span> {condition}<br/>
                            <span>Notes:</span> {notes}
                        </p>
                    </div>
                    
                    <div>
                        <div className="fahproduct__price" style={{textAlign:'center',marginBottom:'10px', marginTop: '30px'}}>${Number(price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>{!currency||currency===1?'USD':'CAD'}</span></div>
                        <button 
                            className='submit-btn'
                            style={{marginTop: '0px', marginBottom: '25px'}}
                            onClick={(e)=>handleAdd(e)}
                            data-item-id={id}
                            data-item-title={title}
                            data-item-artist={artist_first}
                            data-item-artist={artist_last}
                            data-item-description={description}
                            data-item-price={price}
                            data-item-url={image}
                            data-item-image={image}
                            data-item-level={level}
                            data-item-harptype={harptype}
                        >
                            Add to Cart
                        </button>
                    </div>
                    {/* <span>Price</span> {productPrice
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
                    >Change Currency</button>        <br /> */}
                    
                    {/* <span>Finish</span> {productFinish?productFinish:'unavailable'} */}
                    
                    {/* <br />
                    <p><span>Location</span> {sellerCountry?sellerCountry:'unavailable'}<br></br>
                    <span>Distance</span> 
                    <span>Seller</span> {sellerName?removeDashOE(sellerName):'unavailable'}<br></br></p>
                    <button className='storedetailButton' onClick={(evt) => handleClick(evt, props.product, true)}>Contact Seller</button>         */}
                </div> 
            </div>
        </div>
        <StoreProductModalCSS />
        </>
    )
}

export default StoreProductModal;
