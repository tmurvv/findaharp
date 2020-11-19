import { useState, useContext, useEffect, useReducer } from 'react';
import uuid from 'react-uuid';
import Router, { withRouter } from 'next/router';

import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import { UserContext } from '../../contexts/UserContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import CartItem from '../../components/onlineStore/CartItem';
import OrderSummary from '../../components/onlineStore/OrderSummary';
import Subtotal from '../../components/onlineStore/Subtotal';
import { branding } from '../../constants/branding';
import { cssVariables } from '../../constants/cssVariables';
import CartCss from '../../styles/onlineStore/cart.css'; 
import IndexCss from '../../styles/index.css'; 
import { resultInfoReducer } from '../../reducers/reducers';
import Results from '../../components/Results';
import { RESULTS_INITIAL_STATE } from '../../constants/constants';
import {
    getNumItems,
    getSubTotal,
    getStores
} from '../../utils/storeHelpers';
import { getTotal } from '../../utils/checkoutHelpers';
import GetZipPostal from '../../components/onlineStore/GetZipPostal';
import PageTitle from '../../components/PageTitle';
import { StoresOrderedFromContext } from '../../contexts/StoresOrderedFromContext';


function SubCart(props) {
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { user, setUser } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { storesOrderedFrom } = useContext(StoresOrderedFromContext);
    const [screenWidth, setScreenWidth] = useState();
    const [update, setUpdate] = useState(false);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    
    console.log(getStores(cart));
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
    
    useEffect(()=> {
        setScreenWidth(window.innerWidth);
        
    }, []);
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    }, []);
    return (
        <>
            <div className='index' style={{width: '100%', border: '1px solid lightgrey'}}>
                <Results 
                    resultInfo={resultInfo} 
                    loginGuest={loginGuest}
                    resetResults={resetResults} 
                />
                <div className="cartContainer">  
                    <div id='cart'>
                        <div className='cartBody'>
                            <h3>Items Shipped from {props.store}</h3>
                        </div>
                        <div className='flex-sb'>
                            <div className='itemsContainer' style={{flex: '2'}}>
                                <div className='items'>                       
                                    <ul>
                                        {props.subCart.length===0?
                                            <li className='noItem' key={uuid()}>No Items in Cart</li>
                                        :props.subCart.map(item => 
                                            <li key={uuid()}>
                                                <CartItem item={item} setUpdate={setUpdate}/>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div style={{flex: '1'}}>
                                <h5>Choose a delivery option:</h5>
                                {/* <h1>Here: {cartSubtotals.shipping}</h1>
                                <h3>here: {storesOrderedFrom&&storesOrderedFrom[0].store}</h3> */}
                                <input type="radio" name='shippingoption' value='USPS' checked/>
                                <label htmlFor="USPS">&nbsp;&nbsp;{cartSubtotals.shipping>0?`${cartSubtotals.shipping.toFixed(2)} USPS`:'Enter shipping country.'}</label>
                            </div>
                        </div>
                    </div>           
                </div>
                <CartCss />
                <IndexCss />
            </div>
        </>
    )       
}

export default SubCart;

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