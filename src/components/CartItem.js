import { useContext } from 'react';
import CartItemCss from '../styles/CartItem.css';
import { CartContext } from '../contexts/CartContext';

import {
    getNumItems,
    getSubTotal,
    incQty,
    decQty,
    deleteItem
} from '../utils/storeHelpers';

function CartItem(props) {
    const { item } = props;
    const { cart, setCart } = useContext(CartContext);
    
    return (
        <>
            <div className='item mobileItem'>
                <div className='product_image'>
                    <img src={item.product_image} />
                </div>   
                <div className='description'>
                    <h1>{item.description}</h1>
                </div>
                <div className='price'>${(item.price*item.product_quantity).toFixed(2)}</div>
                <div className='product_quantity'>
                    <button 
                        onClick={e => deleteItem(e, cart, setCart)} 
                        dataid={item.id}
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
                        <div className='add' onClick={(e) => incQty(e, cart, setCart)} data-item-name={item.description}><img src='img/circleMinus.png' alt='decrease quantity' /></div>
                        <div className='how_many'>{item.product_quantity}</div>
                        <div className='sub' onClick={(e) => decQty(e, cart, setCart)} data-item-name={item.description}><img src='img/circlePlus.png' alt='decrease quantity' /></div>
                    </div>
                </div>
                   
            </div>
            <CartItemCss />
        </>
    )
}

export default CartItem;
