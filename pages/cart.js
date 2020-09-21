import { useState, useContext, useEffect } from 'react';
import uuid from 'react-uuid';
import Router, { withRouter } from 'next/router';

import { CartContext } from '../src/contexts/CartContext';
import PageTitle from '../src/components/PageTitle';
import CartItem from '../src/components/CartItem';
import { branding } from '../src/constants/branding';
import { cssVariables } from '../src/constants/cssVariables';
import CartCss from '../src/styles/cart.css'; 
import IndexCss from '../src/styles/index.css'; 
import {
    getNumItems,
    getSubTotal
} from '../src/utils/storeHelpers';


function Cart(props) {
    const { cart, setCart } = useContext(CartContext);
    const [screenWidth, setScreenWidth] = useState();
    useEffect(()=> {
        setScreenWidth(window.innerWidth);
    });
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    });
    return (
        <>
            <div className="index" style={{backgroundColor:'#fff'}}>  
                <div id='cart'>
                    <div className='cartBody'>
                        <h1>Your Cart</h1>
                        <div className='subTotal'>
                            <div className='flexSB'>
                                <h3>SubTotal:</h3>
                                <h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${getSubTotal(cart).toFixed(2)}</h3>
                            </div>
                            <button 
                                className='submit-btn'
                                onClick={()=>Router.push('/checkout')}
                                style={{fontSize:'15px', fontWeight:'600', padding:'15px'}}
                            >
                                Continue to Checkout
                            </button>
                        </div>
                    </div>
                    <div className='itemsContainer'>
                        <h4>Shipping and Tax <br/> calculated at checkout. </h4>
                    <div className='items'>                       
                        <ul>
                            {cart.length===0?
                                <li className='noItem' key={uuid()}>No Items in Cart</li>
                            :cart.map(item => 
                                <li key={uuid()}>
                                    <CartItem item={item}/>
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
                                </li>
                            )}
                        </ul>
                    </div>
                    </div>
                </div>              
            </div>
            <CartCss />
            <IndexCss />
        </>
    )       
}

export default Cart;

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