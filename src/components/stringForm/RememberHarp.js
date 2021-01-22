// packages
import React, { useState, useContext, useEffect } from 'react';
import uuid from 'uuid';
import parseNum from 'parse-num';
// contexts
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
// other internal
import NewsletterSignup from '../NewletterSignup';
import RememberHarpModalCSS from '../../styles/stringForm/RememberHarpModal.css';
import { STORE_PARTNERS } from '../../constants/storeDirectory';
import { incQty } from '../../utils/storeHelpers';
import { setlocalCart } from '../../utils/checkoutHelpers';

function RememberHarpModal(props) {
    const { user } = useContext(UserContext);
    
    function handleClick(evt, product, openContact) {
        props.setRememberModal(false);
    }
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'harpname': 
                console.log('nyi-harpname', evt.target.name)
                // setUserContact({...userContact, firstname: evt.target.value, change: true});
                break           
            case 'email': 
                console.log('nyi-email', evt.target.name)
                // setUserContact({...userContact, contactemail: evt.target.value, change: true});
                break     
            case 'newsletter': 
                setUserContact({...userContact, newsletter: !user.newsletter, change: true});
                break     
            default :
        }
    }
    // async function updateCart(e) {
    //     if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
    //         const targetItem = cart.find(item=>item.title===e.target.getAttribute('data-item-title'));
    //         if (targetItem&&targetItem.newused&&targetItem.newused==='used') {
    //             props.handleResults('Only 1 in stock. Item already in cart.'); 
    //         } else {
    //             incQty(cart, setCart, e.target.getAttribute('data-item-title'), cartSubtotals, setCartSubtotals, user, currencyMultiplier);
    //             props.handleResults('Item added to cart.');
    //         }   
    //     } else {
    //         const cartCopy = [...cart];
    //         const thisItem = {
    //             id: uuid(), 
    //             store: e.target.getAttribute('data-item-store'),
    //             title: e.target.getAttribute('data-item-title'),
    //             artist_first: e.target.getAttribute('data-item-artist_first'),
    //             artist_last: e.target.getAttribute('data-item-artist_last'),
    //             description: e.target.getAttribute('data-item-description'), 
    //             price: e.target.getAttribute('data-item-price'), 
    //             condition: e.target.getAttribute('data-item-condition'),
    //             level: e.target.getAttribute('data-item-level'),
    //             harptype: e.target.getAttribute('data-item-harptype'),
    //             newprice: e.target.getAttribute('data-item-newprice'),
    //             notes: e.target.getAttribute('data-item-notes'),
    //             newused: e.target.getAttribute('data-item-newused'),
    //             product_image: e.target.getAttribute('data-item-url'),
    //             product_quantity: '1'    
    //         }
    //         cartCopy.push(thisItem);
    //         cartCopy.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
    //         const tempCartJson = await JSON.stringify(cartCopy);
    //         props.handleResults('Item added to cart.');
    //         setlocalCart('fah-cart', tempCartJson);
    //         setCart(cartCopy);
    //         // handleClick(e,props.product,false);
    //     }
    // }
    // function handleAdd(e) {
    //     updateCart(e);
    //     e.target.classList.add("storeflyToCart");
    // }
    // useEffect(() => {
    //     Array.from(STORE_PARTNERS).filter(seller => {
    //         if (seller.id===props.product.store) setSellerInfo(seller);
    //     });
    // });
    return (
        <>
        <div className='rememberdetailContainer' style={{display: 'block'}}>
            <div onClick={(evt) => handleClick(evt, props.product, false)} className='rememberclearModal'>
                <img src='/img/clear_search.png' alt='clear filters'/>
            </div> 
            <div style={{fontSize: '24px'}}>Remember My Harp(s)</div>
            <img className={`divider`} src="./img/golden_tapered_line.png" alt="fancy golden divider line" />
            <div className='rememberdetailInfo' style={{marginTop: '25px'}}>
                <div className={`rememberdetailImg`}><img src= './img/store/speedy_harp.png' alt='speedy harpist pushing harp on dolly' /></div>
                <div className={`rememberdetailText`}>  
                    <div style={{textAlign: 'center', fontSize: '22px', marginBottom: '10px', fontWeight: 'bold'}}>Save valuable time!! </div>
                    <div style={{textAlign: 'center',  fontSize: '16px', fontWeight: 'bold', marginBottom: '25px'}}>Signup / Login</div>
                    <div className='rememberInput'>
                        <div style={{textAlign: 'right', flex: '4'}}>
                            <label htmlFor="harpname">Harp Name:</label>
                            <input name='harpname'/>
                        </div>
                        <div style={{textAlign: 'right', flex: '6'}}>
                            <label>Email:</label>
                            <input type='email' name='email'/>
                        </div>
                    </div>
                    
                    <NewsletterSignup />
                    
                    <div style={{margin: '25px auto -20px', width: '100%', textAlign: 'center'}}>
                        <button 
                            className='submit-btn'
                            type="button"
                            style={{width: '45%', margin: '1%'}}

                        >
                            Remember My Harp
                        </button>
                        <button 
                            className='submit-btn'
                            type="button"
                            style={{width: '45%', margin: '1%'}}
                            onClick={(evt) => handleClick(evt, props.product, false)}
                        >
                            No Thank You
                        </button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ul> Instructions:
                            <li>Enter a name and email for your harp</li>
                            <li>Signup as many harps as you like</li>
                            <li>We will remember your string brands</li>
                            <li>Teachers, you can enter your students' harps!</li>
                            <li>Rentors, you can enter your rental harps!</li>
                            <li>What a great idea!</li>
                        </ul>
                    </div>
                </div> 
            </div>
        </div>
        <RememberHarpModalCSS />
        </>
    )
}

export default RememberHarpModal;
