import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';

import { CartContext } from '../../contexts/CartContext';
import CartCss from '../../styles/onlineStore/cart.css';
import {
    getNumItems
} from '../../utils/storeHelpers';

function CartButton() {
    const { cart } = useContext(CartContext);
    
    return (
        <>
            <div 
                className='cartButton' 
                onClick={()=>Router.push('/cart')} 
            >
                <p>{getNumItems(cart)<10?`0${getNumItems(cart)}`:getNumItems(cart)}</p>
                <img 
                    src='../../../img/shoppingCart.png'
                    alt='shopping cart'
                />
            </div>
            <CartCss />
        </>
    )
}

export default CartButton;
