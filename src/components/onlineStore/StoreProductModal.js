import React, { useState, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid';
// import parseNum from 'parse-num';
// // internal
import StoreProductModalCSS from '../../styles/onlineStore/StoreProductModal.css';
// import { removeDashOE, getGeoDistance } from '../utils/helpers';
// import { UserContext } from '../contexts/UserContext';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { resultInfoReducer } from '../../reducers/reducers';
import Results from '../Results';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../../constants/constants';
import {
    incQty
} from '../../utils/storeHelpers';


function StoreProductModal(props) {
    // const { user } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const {
        id,
        store,
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
        description,
        newused
    } = props.product;
    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function handleResults(msg) {
        dispatchResultInfo({type: 'OK'});
        const resultText = document.querySelector('#loadingLoginText');
        resultText.innerText=msg;
    }
    function loginGuest(evt) {
        // if (evt) evt.preventDefault();  
        resetResults();
    }
    
    function handleClick(evt, product, openContact) {
        props.handleCloseDetail(evt, product, openContact);
    }

    function updateCart(e) {
        if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
            const targetItem = cart.find(item=>item.title===e.target.getAttribute('data-item-title'));
            if (targetItem&&targetItem.newused&&targetItem.newused==='used') {
                handleResults('Only 1 in stock. Item already in cart.');
            } else {
                incQty(cart, setCart, e.target.getAttribute('data-item-title'));
            }   
        } else {
            const cartCopy = [...cart];
            const thisItem = {
                id: uuid(), 
                store: e.target.getAttribute('data-item-store'),
                title: e.target.getAttribute('data-item-title'),
                artist_first: e.target.getAttribute('data-item-artist_first'),
                artist_last: e.target.getAttribute('data-item-artist_last'),
                description: e.target.getAttribute('data-item-description'), 
                price: e.target.getAttribute('data-item-price'), 
                condition: e.target.getAttribute('data-item-condition'),
                level: e.target.getAttribute('data-item-level'),
                harptype: e.target.getAttribute('data-item-harptype'),
                newprice: e.target.getAttribute('data-item-newprice'),
                notes: e.target.getAttribute('data-item-notes'),
                newused: e.target.getAttribute('data-item-newused'),
                product_image: e.target.getAttribute('data-item-url'),
                product_quantity: '1'    
            }
            cartCopy.push(thisItem);
            setCart(cartCopy);
            alert('Item added to cart.')
            handleClick(e,props.product,false);
        }
    }
    function handleAdd(e) { 
        e.target.addEventListener("webkitAnimationend", (e)=>updateCart(e));
        e.target.addEventListener("animationend", (e)=>updateCart(e))
        e.target.classList.add("storeflyToCart"); 

        window.removeEventListener('beforeunload', function (e) {
            // Cancel the event
            e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
            // Chrome requires returnValue to be set
            e.returnValue = '';
        }); 
        window.addEventListener('beforeunload', function (e) {
            // Cancel the event
            e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
            // Chrome requires returnValue to be set
            e.returnValue = '';
        }); 
    }
    return (
        <>
        <div className='storedetailContainer'>
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
                zipMsg='Only 1 in stock. Item already in cart.'
            />
            <div onClick={(evt) => handleClick(evt, props.product, false)} className='storeclearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div> 
            <div style={{fontSize: '24px'}}>{title}</div>
            <div style={{fontSize: '14px', fontStyle: 'italic', marginBottom: '15px'}}>{artist_first||artist_last?artist_first+'   '+artist_last:"_"}</div>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden divider line" />
            <div className='storedetailInfo' style={{marginTop: '15px'}}>
                <div className={`storedetailImg`}><img src= {image} alt={title} /></div>
                <div className={`storedetailText`}>
                    <div>
                        <p>{description}</p> <br/>
                        <div style={category==='music'?{display: 'block'}:{display: 'none'}}>
                            <span>Level:</span> {level}<br/>
                            <span>Harp Type:</span> {harptype}<br/>
                            <span>Condition (1-10):</span> {condition}<br/>
                            <span>Notes:</span> 
                            {user&&user.currency==="USD"?    
                            ` ${newprice?`Find new from: $${Number(newprice).toFixed(2)} / `:''}${notes}`
                            :` ${newprice?`Find new from: $${Number(newprice*currencyMultiplier).toFixed(2)} / `:''}${notes}`
                            }  
                        </div>
                    </div>
                    <div>
                        {user&&user.currency==="USD"?    
                        <div className="storeproduct__price">${Number(price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD</span></div>
                        :<div className="storeproduct__price">${(Number(price)*currencyMultiplier).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD</span></div>
                        }
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                            <div style={{width:'fit-content'}}>Ships From: Canada</div>
                            <img style={{width: '25px', maxHeight: '20pxy'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                            <div style={{width:'fit-content'}}>To: Anywhere</div>
                        </div>
                        <button 
                            className='submit-btn'
                            type="button"
                            style={{marginTop: '0px'}}
                            onClick={(e)=>handleAdd(e)}
                            data-item-id={id}
                            data-item-store={store}
                            data-item-title={title}
                            data-item-artist={artist_first}
                            data-item-artist={artist_last}
                            data-item-description={description}
                            data-item-price={price}
                            data-item-url={image}
                            data-item-image={image}
                            data-item-level={level}
                            data-item-harptype={harptype}
                            data-item-newused={newused}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div> 
            </div>
        </div>
        <StoreProductModalCSS />
        </>
    )
}

export default StoreProductModal;
