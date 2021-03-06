
import parseNum from 'parse-num';
import { useContext, useState } from 'react';
import CartItemCss from '../../styles/CartItem.css';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import { UserContext } from '../../../main/contexts/UserContext';
import { CurrencyContext } from '../../../main/contexts/CurrencyContext';

import {
    incQty,
    decQty,
    deleteItem
} from '../../utils/storeHelpers';

function CartItem(props) {
    const { item } = props;
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { user } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    return (
        <div className='subCart_item'>
            <div className='subCart_item-image'>
                {/* <img src={item.product_image} alt={item.title}/> */}
                {item&&item.product_image
                    ?<img src={item.product_image} alt={item.title}/>
                    :<img src='/img/golden_harp_full.png' />
                }
            </div>
            <div className='subCart_item-text'>
                <div className='description'>
                    <p><span style={{fontSize: '18px', fontWeight: "600"}}>{item.title}{item.artist?',':''} {item.artist}</span></p>
                </div>
                {user.currency==="USD"?<div className='price'>${parseNum(item.price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}> {item.newused==='used'?'USED':'EACH'}</span></div>
                :<div className='price'>${(parseNum(item.price)*currencyMultiplier).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}> {item.newused==='used'?'USED':'EACH'}</span></div>}
                <div className='product_quantity'>
                    <button 
                        onClick={() => deleteItem(cart, setCart, item.id, cartSubtotals, setCartSubtotals, user, currencyMultiplier)} 
                        style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <img style={{height:'20px', width:'20px', color: 'cadetblue'}} src='img/trashCanRed.png' alt="red trash can" />
                        <p style={{fontSize:'14px', color:'#556f82', marginLeft:'7px'}}>Remove</p>
                    </button>
                    
                    <div className='quantity_button'>
                        {item.newused==='new'
                        ?<><div className='add' onClick={() => decQty(cart, setCart, item.id, cartSubtotals, setCartSubtotals, user, currencyMultiplier)} data-item-name={item.description}><img src='img/circleMinus.png' alt='decrease quantity' /></div>
                        <div className='how_many'>{item.product_quantity}</div>
                        <div className='sub' onClick={() => incQty(cart, setCart, item.id, cartSubtotals, setCartSubtotals,user, currencyMultiplier)} data-item-name={item.description}><img src='img/circlePlus.png' alt='increase quantity' /></div></>
                        :<p style={{fontSize:'14px', color:'#556f82', marginLeft:'7px'}}>Only 1 in stock</p>}
                    </div>
                </div>
                <div style={{fontWeight: 'bold'}} className='flex-sb'>
                    <p>Product Total:</p>
                    {user.currency==="USD"?<p>${(parseNum(item.price)*item.product_quantity).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD</span></p>
                    :<p>${(parseNum(item.price)*item.product_quantity*currencyMultiplier).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD</span></p>}
                </div>
            </div>
            <CartItemCss />
        </div>
    )
}

export default CartItem;
