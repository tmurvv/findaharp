import { useState, useContext, useEffect, useReducer } from 'react';
import uuid from 'react-uuid';
import Router, { withRouter } from 'next/router';

import { CartContext } from '../src/store/contexts/CartContext';
import { CartSubtotalsContext } from '../src/store/contexts/CartSubtotalsContext';
import { UserContext } from '../src/main/contexts/UserContext';
import { CurrencyContext } from '../src/main/contexts/CurrencyContext';
import CartItem from '../src/store/components/main/CartItem';
import OrderSummary from '../src/store/components/main/OrderSummary';
import Subtotal from '../src/store/components/main/Subtotal';
import { branding } from '../src/main/constants/branding';
import { cssVariables } from '../src/main/constants/cssVariables';
import CartCss from '../src/store/styles/cart.css'; 
import IndexCss from '../src/main/styles/index.css'; 
import { resultInfoReducer } from '../src/main/reducers/reducers';
import Results from '../src/main/components/main/Results';
import { RESULTS_INITIAL_STATE } from '../src/main/constants/constants';
import {
    getNumItems,
    getStores,
    getSubTotal
} from '../src/store/utils/storeHelpers';
import { getTotal, deletelocalCart } from '../src/store/utils/checkoutHelpers';
import GetZipPostal from '../src/store/components/main/GetZipPostal';
import PageTitle from '../src/main/components/main/PageTitle';
import Spinner from '../src/main/components/main/Spinner';
import SubCart from '../src/store/components/main/SubCart';
import { CART_ITEMS_INIT } from '../src/main/constants/inits';
import FastNEasyStringForm from '../src/store/components/main/FastNEasyStringForm';


function Cart(props) {
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { user, setUser } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const [screenWidth, setScreenWidth] = useState();
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    
    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    
    }
    function handleClick() {
        const resultText = document.querySelector('#loadingLoginText');
        if (getNumItems(cart)===0) {
            resultText.innerText=`Cart is Empty`;
            dispatchResultInfo({type: 'OK'});
        } else {
            Router.push('/shipping')
        }
    }
    function loginGuest(evt) {
        resetResults();
    }
    function deleteCart() {
        deletelocalCart('fah-cart');
        setCart([]);
        setCartSubtotals([]);
    }
    useEffect(()=> {
        setScreenWidth(window.innerWidth);
    }, []);
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    }, []);
    return (
        <>
            <Spinner />
            <div className='index' style={{width: '100%'}}>
                <PageTitle maintitle="Your Cart" subtitle="Shipping and Taxes calculated at checkout"/>
                <Results 
                    resultInfo={resultInfo} 
                    loginGuest={loginGuest}
                    resetResults={resetResults} 
                />
            <div className="cartContainer"> 
            <div onClick={()=>document.querySelector('#spinner').style.display='block'} style={{position: 'absolute', top: '15px', right: '15px'}}>
                    <FastNEasyStringForm />
            </div>
                
                <div id='cart'>
                    {cart.length===0?<h3 style={{paddingLeft: '15px'}}>No Items in Cart</h3>:''}
                    {/* <h1>shippingArray: {cartSubtotals.shippingarray&&String(cartSubtotals.shippingarray)}</h1> */}
                    {getStores(cart).map(store => {
                        const subCart = cart.filter(cartItem=>cartItem.store===store)
                        return <SubCart store={store} subCart={subCart} />
                    })}
                    {/* <div className='cartBody'>
                        {screenWidth<=715
                        ?<div className='subTotal'>
                            <Subtotal type="subtotal"/>
                            <div style={{display: 'flex'}}>
                                <button className='submit-btn' style={{
                                    marginRight: '2.5px', 
                                    marginLeft: '15px', 
                                    fontSize:'15px',
                                    padding:'15px'
                                    }} 
                                    onClick={()=>Router.push('onlinestore')}
                                >Continue Shopping</button>
                                <button 
                                    className='submit-btn'
                                    onClick={()=>handleClick()}
                                    style={{
                                        marginLeft: '2.5px',
                                        marginRight: '15px', 
                                        backgroundColor: '#000', 
                                        color: '#fff', 
                                        fontSize:'15px', 
                                        padding:'15px'
                                    }}
                                >Continue to Checkout</button>
                            </div>
                        </div>
                        :''}
                    </div> */}
                    {/* <div className='itemsContainer'>
                    <div className='items'>                       
                        <ul>
                            {cart.length===0?
                                <li className='noItem' key={uuid()}>No Items in Cart</li>
                            :cart.map(item => 
                                <li key={uuid()}>
                                    <CartItem item={item} setUpdate={setUpdate}/>
                                </li>
                            )}
                        </ul>
                    </div>
                    </div> */}
                </div>
                <div>
                    <GetZipPostal/>
                    <OrderSummary/>
                    <div style={{display: 'flex'}}>
                        <button className='submit-btn' style={{
                            marginRight: '2.5px',
                            fontSize:'14px', 
                            padding:'15px'
                            }} 
                            onClick={()=>Router.push('onlinestore')}
                        >Continue Shopping</button>
                        <button 
                            className='submit-btn'
                            onClick={()=>handleClick()}
                            style={{
                                marginLeft: '2.5px',
                                backgroundColor: '#000', 
                                color: '#fff', 
                                fontSize:'14px',
                                outlineColor: '#fff'
                            }}
                        >Continue to Checkout</button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>    
                        <button 
                            style={{
                                color: '#6A75AA',
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                                marginTop: '15px',
                                width: 'fit-content',
                                fontSize: '16px',
                                cursor: 'pointer'
                            }}
                            onClick={()=>{if (confirm("This will remove all items from your cart without purchasing them. Continue?")) deleteCart()}}
                        >
                            <img style={{height:'20px', width:'20px', color: '#6A75AA', transform: 'translate(-4px, 4px)'}} src='/img/trashCanRed.png' alt='garbage can' />
                            Empty Cart
                        </button>
                    </div>
                </div>            
            </div>
            <CartCss />
            <IndexCss />
            </div>
        </>
    )       
}

export default Cart;
