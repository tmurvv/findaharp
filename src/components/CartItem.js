import { useContext } from 'react';
import CartItemCss from '../styles/CartItem.css';
import { CartContext } from '../contexts/CartContext';
import { CurrencyContext } from '../contexts/CurrencyContext';

import {
    incQty,
    decQty,
    deleteItem
} from '../utils/storeHelpers';

function CartItem(props) {
    const { item } = props;
    const { cart, setCart } = useContext(CartContext);
    const { currency } = useContext(CurrencyContext);
    return (
        <>
            <div className='item'>
                <div className='product_image'>
                    <img src={item.product_image} />
                </div>   
                <div className='description'>
                    <p><span style={{fontWeight: "600"}}>{item.title}{item.artist?',':''} {item.artist}</span> - {item.description}</p>
                </div>
                <div className='price'>${Number(item.price).toFixed(2)} each</div>
                <div style={{borderBottom:"1px solid lightgrey"}} className='product_quantity'>
                    <button 
                        onClick={() => deleteItem(cart, setCart, item.id)} 
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
                        <div className='add' onClick={() => decQty(cart, setCart, item.id)} data-item-name={item.description}><img src='img/circleMinus.png' alt='decrease quantity' /></div>
                        <div className='how_many'>{item.product_quantity}</div>
                        <div className='sub' onClick={() => incQty(cart, setCart, item.id)} data-item-name={item.description}><img src='img/circlePlus.png' alt='increase quantity' /></div>
                    </div>
                </div>
                <div style={{fontWeight: 'bold'}} className='flex-sb'>
                    <p>Product Total:</p>
                    <p>${(item.price*item.product_quantity).toFixed(2)}{currency}</p>
                </div>
            </div>
            <CartItemCss />
        </>
    )
}

export default CartItem;
