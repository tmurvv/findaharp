import { useState, useContext, useEffect } from 'react';
import uuid from 'react-uuid';
import Router, { withRouter } from 'next/router';

import { CartContext } from '../src/contexts/CartContext';
import { CartSubtotalsContext } from '../src/contexts/CartSubtotalsContext';
import { UserContext } from '../src/contexts/UserContext';
import { CurrencyContext } from '../src/contexts/CurrencyContext';
import CartItem from '../src/components/onlinestore/CartItem';
import OrderSummary from '../src/components/onlinestore/OrderSummary';
import Subtotal from '../src/components/onlinestore/Subtotal';
import { branding } from '../src/constants/branding';
import { cssVariables } from '../src/constants/cssVariables';
import CartCss from '../src/styles/onlineStore/cart.css'; 
import IndexCss from '../src/styles/index.css'; 
import {
    getNumItems,
    getSubTotal
} from '../src/utils/storeHelpers';
import { getTotal } from '../src/utils/checkoutHelpers';
import GetZipPostal from '../src/components/onlinestore/GetZipPostal';
import PageTitle from '../src/components/PageTitle';


function Cart(props) {
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { user, setUser } = useContext(UserContext);
    const { currency } = useContext(CurrencyContext);
    const [screenWidth, setScreenWidth] = useState();
    useEffect(()=> {
        setScreenWidth(window.innerWidth);
    }, []);
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    }, []);
    return (
        <>
            <div className='index' style={{width: '100%', backgroundColor: '#fffeee'}}>
                <PageTitle maintitle="Your Cart" subtitle="Shipping and Taxes calculated at checkout"/>
            <div className="cartContainer">  
                <div id='cart'>
                    <div className='cartBody'>
                        {/* <h1>Your Cart</h1> */}
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
                                    onClick={()=>getNumItems(cart)===0?alert('Cart is Empty'):Router.push('/shipping')}
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
                    </div>
                    <div className='itemsContainer'>
                        {/* <h4>Shipping and Tax <br/> calculated at checkout. </h4> */}
                    <div className='items'>                       
                        <ul>
                            {cart.length===0?
                                <li className='noItem' key={uuid()}>No Items in Cart</li>
                            :cart.map(item => 
                                <li key={uuid()}>
                                    <CartItem item={item}/>
                                </li>
                            )}
                        </ul>
                    </div>
                    </div>
                </div>
                <div>
                    <GetZipPostal />
                    <OrderSummary />
                    {screenWidth>=715
                    ?
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
                                    onClick={()=>getNumItems(cart)===0?alert('Cart is Empty'):Router.push('/shipping')}
                                    style={{
                                        marginLeft: '2.5px',
                                        backgroundColor: '#000', 
                                        color: '#fff', 
                                        fontSize:'14px',
                                        outlineColor: '#fff'
                                    }}
                                >Continue to Checkout</button>
                            </div>
                     :''}
                    
                    
                    {/*<button 
                        className='submit-btn'
                        onClick={()=>getNumItems(cart)===0?alert('Cart is Empty'):Router.push('/shipping')}
                        style={{fontSize:'15px', fontWeight:'600', padding:'15px'}}
                    >
                        Continue to Checkout
                    </button>*/}
                   
                </div>            
            </div>
            <CartCss />
            <IndexCss />
            </div>
        </>
    )       
}

export default Cart;

{/* <div className='item mobileItem'>
                                        <div className='itemLine1'>
                                            <div className='product_image'><img src={item.product_image} /></div>
                                            <div className='product_quantity'>
                                                <div className='quantity_button'>
                                                    <div className='how_many'>{item.product_quantity}</div>
                                                    <div className='add_sub'>
                                                        <div className='add' onClick={(e) => incQty(e, cart, setCart)} data-item-name={item.description}>+</div>
                                                        <div className='sub' onClick={(e) => decQty(e, cart, setCart)} data-item-name={item.description}>-</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='price'>${(item.price*item.product_quantity).toFixed(2)}</div>	
                                        </div>
                                    
                                        <div className='description'>
                                            <h1>{item.description}</h1>
                                            <h2>In Stock - Ships Immediately</h2>
                                            <button 
                                                onClick={e => deleteItem(e, cart, setCart)} 
                                                dataid={item.id}
                                                style={{
                                                    background: 'tomato',
                                                    padding: '3px 7px',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                delete
                                            </button>
                                        </div>    
                                    </div> */}



// {screenWidth>=1000?
//     <div className='item'>
//         <div className='product_image'><img src={item.product_image} /></div>
//         <div className='description'>
//             <h1>{item.description}</h1>
//             <h2>In Stock - Ships Immediately</h2>
//             <button 
//                 onClick={e => deleteItem(e, cart, setCart)} 
//                 dataid={item.id}
//                 style={{
//                     background: 'tomato',
//                     padding: '3px 7px',
//                     fontSize: '12px'
//                 }}
//             >
//                 delete
//             </button>
//         </div>
//         <div className='product_quantity'>
//             <div className='quantity_button'>
//                 <div className='how_many'>{item.product_quantity}</div>
//                 <div className='add_sub'>
//                     <div className='add' onClick={(e) => incQty(e, cart, setCart)} data-item-name={item.description}>+</div>
//                     <div className='sub' onClick={(e) => decQty(e, cart, setCart)} data-item-name={item.description}>-</div>
//                 </div>
//             </div>
//         </div>
//         <div className='price'>${(item.price*item.product_quantity).toFixed(2)}</div>	
//     </div>
//     :
// }






// if (cartOpen) {   
        // } else {
        //     return (
        //         <>
        //         <div className='cartButton' onClick={()=>setCartOpen(true)}>
        //                 <p>{getNumItems(cart)}</p>
        //             <img 
        //                 src='img/shoppingCart.png' 
        //                 onClick={()=>setCartOpen(true)} 
        //                 alt='shopping cart'
        //             />
        //         </div>
                
        //         <CartCss />
        //         </>
        //         )
        // } 

        {/* {screenWidth<600?  */}
        {/* :
            <div className='subTotal'>
                <h1>Subtotal#2</h1>
                <h2>{getNumItems(cart)} Items</h2>
                <h3>${getSubTotal(cart).toFixed(2)}</h3>
                <h4>Shipping and Tax <br/> calculated at checkout. </h4>
                
                <button 
                    className='.submit-btn'
                    onClick={()=>{setCartOpen(false);Router.push('/Checkout');}}
                >
                    Continue to Checkout
                </button>
                <form style={{
                    width: 'fit-content',
                    paddingTop: '20px',
                    margin: 'auto',
                    boxShadow: 'none',
                    borderRadius: 'none'
                }}>
                    <input type='checkbox' style={{margin: '0'}}/>This is a Gift
                </form>
            </div>
    } */}