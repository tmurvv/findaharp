import React, { useState, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import parseNum from 'parse-num';
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
import { STORE_PARTNERS } from '../../constants/storeDirectory';
import {
    incQty
} from '../../utils/storeHelpers';
import {
    setlocalCart
} from '../../utils/checkoutHelpers';


function StoreProductModal(props) {
    // const { user } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const [ sellerInfo, setSellerInfo ] = useState();
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const {
        id,
        store,
        category, 
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
        const resultText = document.querySelector('#loadingLoginText');
        resultText.innerText=msg;
        dispatchResultInfo({type: 'OK'});
    }
    function loginGuest(evt) {
        // if (evt) evt.preventDefault();
        resetResults();
    }
    
    function handleClick(evt, product, openContact) {
        props.handleCloseDetail(evt, product, openContact);
    }

    async function updateCart(e) {
        if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
            const targetItem = cart.find(item=>item.title===e.target.getAttribute('data-item-title'));
            if (targetItem&&targetItem.newused&&targetItem.newused==='used') {
                alert('Only 1 in stock. Item already in cart.');
                
            } else {
                incQty(cart, setCart, e.target.getAttribute('data-item-title'));
                alert('Item added to cart.');
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
            cartCopy.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
            const tempCartJson = await JSON.stringify(cartCopy);
            alert('Item added to cart.');
            setlocalCart('fah-cart', tempCartJson);
            setCart(cartCopy);
            handleClick(e,props.product,false);
            
        }
    }
    function handleAdd(e) {
        updateCart(e);
        // e.target.addEventListener("webkitAnimationend", (e)=>updateCart(e));
        // e.target.addEventListener("animationend", (e)=>updateCart(e))
        e.target.classList.add("storeflyToCart");
    }
    useEffect(() => {
        const result = Array.from(STORE_PARTNERS).filter(seller => {
            if (seller.id===props.product.store) setSellerInfo(seller);
        });
    });
    return (
        <>
        <div className='storedetailContainer' style={{display: 'block'}}>
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
                <div className={`storedetailImg`}><img src= {image&&image!==undefined&&image!==''?image:'/img/golden_harp_full.png'} alt={title} /></div>
                <div className={`storedetailText`}>
                    <div>
                    <div className='longDesc productSmallDisplay-LongDesc' dangerouslySetInnerHTML={{__html: description}} />
                        <br/>
                        
                        <div style={category==='music'?{display: 'block'}:{display: 'none'}}>
                            <span>Level:</span> {level?level:'unknown'}<br/>
                            <span>Harp Type:</span> {harptype}<br/>
                            {newused&&newused==='used'?<span>Condition (1-10):</span>:''} {condition}<br/>
                            {newused&&newused==='used'?<span>Notes:</span>:''} {notes&&notes}
                            {/* {newused&&newused==='used'&&user&&user.currency==="USD"?    
                            ` ${newprice?`Find new from: $${parseNum(newprice).toFixed(2)} / `:''}${notes}`
                            :` ${newprice?`Find new from: $${parseNum(newprice*currencyMultiplier).toFixed(2)} / `:''}${notes}`
                            }   */}
                        </div>
                        <span>Sold By:</span> {sellerInfo?sellerInfo.productTitle:''}<br/>
                    </div>
                    <div>
                        {user&&user.currency==="USD"?    
                        <div className="storeproduct__price" style={{textAlign: 'center'}}>${parseNum(price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD ({newused})</span></div>
                        :<div className="storeproduct__price" style={{textAlign: 'center'}}>${(parseNum(price)*currencyMultiplier).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD ({newused})</span></div>
                        }
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                            <div style={{width:'fit-content'}}>Ships From: {sellerInfo&&sellerInfo.sellerCountry}</div>
                            <img style={{width: '25px', maxHeight: '20px'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                            <div style={{width:'fit-content'}}>To: {sellerInfo&&sellerInfo.shipsTo}</div>
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
