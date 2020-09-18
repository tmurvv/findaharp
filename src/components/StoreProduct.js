import { useContext } from 'react';
import {withRouter} from 'next/router';
import uuid from 'react-uuid';
import {
    incQty
} from '../utils/storeHelpers';
import { CartContext } from '../contexts/CartContext';
import StoreProductCss from '../styles/StoreProduct.css';

const StoreProduct = (props) => {
    const { cart, setCart } = useContext(CartContext);
    function handleAdd(e) {  
        // a trick to restart animation courtesy Chris Coyier. Does not work in strict mode
        e.target.classList.remove("flyToCart");
        void e.target.offsetWidth;
        e.target.classList.add("flyToCart");
        // update cart
        if (cart.findIndex(item=>item.description===e.target.getAttribute('data-item-name'))>-1) {
            incQty(e, cart, setCart);
        } else {
            const cartCopy = [...cart];
            const thisItem = {
                id: uuid(), 
                description: e.target.getAttribute('data-item-name'), 
                price: e.target.getAttribute('data-item-price'), 
                product_image: e.target.getAttribute('data-item-url'),
                product_quantity: '1'    
            }
            cartCopy.push(thisItem);
            setCart(cartCopy);
        }
    }
    return (
        <div className="product">
            <h3 className="product__title">{props.product.name}</h3>
            <p className="product__description">{props.product.description}</p>
            <img 
                src={props.product.image} 
                alt={props.product.name} 
                className="product__image"
            />
            <div className="product__price-button-container">
                <div className="product__price">${props.product.price.toFixed(2)}</div>
                <button 
                    id="blueFontButton"
                    style={{marginTop: '0px', marginBottom: '25px'}}
                    onClick={(e)=>handleAdd(e)}
                    data-item-id={props.product.id}
                    data-item-name={props.product.name}
                    data-item-price={props.product.price}
                    data-item-url={props.product.image}
                    data-item-image={props.product.image}
                >
                    Add to cart
                </button>
            </div>        
            <StoreProductCss />
        </div>
    )
}

export default withRouter(StoreProduct)
