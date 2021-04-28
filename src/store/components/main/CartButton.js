// packages
import { useContext } from 'react';
import Router from 'next/router';
// internal
import { CartContext } from '../../contexts/CartContext';
import { MenuOverlayContext } from '../../../main/contexts/MenuOverlayContext'; 
import CartCss from '../../styles/cart.css';
import { getNumItems } from '../../utils/storeHelpers';

function CartButton() {
    const { cart } = useContext(CartContext);
    const { setMenuOverlay } = useContext(MenuOverlayContext);
    function restoreOverlay() {
        document.querySelector('#tiles').style.animation = 'myMoveBack 1s ease-in-out';
        setTimeout(()=> {
            setMenuOverlay(true);
        }, 800);
    }
    return (
        <>
            <div className='cartButton'>
                <div className='tileContainer'><img id='tiles' onClick={()=>restoreOverlay()} src='/img/OverlayMenu/icon_mini_tiles_black.png' alt='opening tile menu icon' /></div>
                <div className='cartButtonCart' onClick={()=>Router.push('/cart')}>
                    <p>{getNumItems(cart)<10?`0${getNumItems(cart)}`:getNumItems(cart)}</p>
                    <img 
                        src='../../../img/shoppingCart.png'
                        alt='shopping cart'
                    />
                </div>
                <div>
                    <a style={{
                        textDecoration: 'underline', 
                        position: 'absolute', 
                        right: '14px', 
                        bottom: '-10px'
                    }} href='#'>top</a></div>
            </div>           
            <CartCss />
        </>
    )
}

export default CartButton;
