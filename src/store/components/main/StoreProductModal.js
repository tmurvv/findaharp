// packages
import React, { useState, useContext, useEffect } from 'react';
import uuid from 'uuid';
import parseNum from 'parse-num';
// contexts
import { UserContext } from '../../../main/contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../../main/contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
// other internal
import StoreProductModalCSS from '../../styles/StoreProductModal.css';
import { STORE_PARTNERS } from '../../../main/constants/storeDirectory';
import { incQty } from '../../utils/storeHelpers';
import { setlocalCart } from '../../utils/checkoutHelpers';

function StoreProductModal(props) {
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const [ sellerInfo, setSellerInfo ] = useState();
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
        descriptiontext,
        newused
    } = props.product;
    function handleClick(evt, product, openContact) {
        props.handleCloseDetail(evt, product, openContact);
    }
    async function updateCart(e) {
        if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
            const targetItem = cart.find(item=>item.title===e.target.getAttribute('data-item-title'));
            if (targetItem&&targetItem.newused&&targetItem.newused==='used') {
                props.handleResults('Only 1 in stock. Item already in cart.'); 
            } else {
                incQty(cart, setCart, e.target.getAttribute('data-item-title'), cartSubtotals, setCartSubtotals, user, currencyMultiplier);
                props.handleResults('Item added to cart.');
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
            props.handleResults('Item added to cart.');
            setlocalCart('fah-cart', tempCartJson);
            setCart(cartCopy);
            // handleClick(e,props.product,false);
        }
    }
    function handleAdd(e) {
        updateCart(e);
        e.target.classList.add("storeflyToCart");
    }
    useEffect(() => {
        Array.from(STORE_PARTNERS).filter(seller => {
            if (seller.id===props.product.store) setSellerInfo(seller);
        });
    });
    return (
        <>
        <div className='storedetailContainer' style={{display: 'block'}}>
            <div onClick={(evt) => handleClick(evt, props.product, false)} className='storeclearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div> 
            <div style={{fontSize: '24px'}}>{title}</div>
            <div style={{fontSize: '14px', fontStyle: 'italic', marginBottom: '15px'}}>{artist_first&&String(artist_first)!=='undefined'||artist_last&&String(artist_last)!=='undefined'?artist_first+'   '+artist_last:"_"}</div>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden divider line" />
            <div className='storedetailInfo' style={{marginTop: '15px'}}>
                <div className={`storedetailImg`}><img src= {image&&image!==undefined&&image!==''?image:'/img/golden_harp_full_grey_not_found.png'} alt={title} /></div>
                <div className={`storedetailText`}>
                    <div>
                    <div className='storelongDesc' dangerouslySetInnerHTML={{__html: description}} />
                        <div>{description?'':descriptiontext}</div>
                        <br/>
                        <div style={category==='music'?{display: 'block'}:{display: 'none'}}>
                            {level&&level!==''?<span>Level: </span>:''}{level&&level!==''?level:''}{level&&level!==''?<br />:''}
                            {harptype&&harptype!==''?<span>Harp Type: </span>:''}{harptype&&harptype!==''?harptype:''}{harptype&&harptype!==''?<br />:''}
                            {condition&&condition!==''?<span>Condition: </span>:''}{condition&&condition!==''?condition:''}{condition&&condition!==''?<br />:''}
                            {notes&&notes!==''?<span>Harp Type: </span>:''}{notes&&notes!==''?notes:''}{notes&&notes!==''?<br />:''}
                        </div>
                        <span>Sold By:</span> {sellerInfo?sellerInfo.productTitle:''}<br/>
                    </div>
                    <div>
                        {user&&user.currency==="USD"?    
                        <div className="storeproduct__price" style={{textAlign: 'center'}}>${parseNum(price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD ({newused})</span></div>
                        :<div className="storeproduct__price" style={{textAlign: 'center'}}>${(parseNum(price)*currencyMultiplier).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD ({newused})</span></div>
                        }
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                            <div style={{width:'fit-content'}}>From: {sellerInfo&&sellerInfo.sellerCountry}</div>
                            <img style={{width: '25px', maxHeight: '20px'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                            <div style={{width:'fit-content'}}>{sellerInfo&&sellerInfo.shipsTo}</div>
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
