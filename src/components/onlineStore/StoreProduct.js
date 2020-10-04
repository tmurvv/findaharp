import { useContext } from 'react';
import {withRouter} from 'next/router';
import uuid from 'react-uuid';
import {
    incQty
} from '../../utils/storeHelpers';
import { CartContext } from '../../contexts/CartContext';
import StoreProductCss from '../../styles/onlinestore/StoreProduct.css';

const StoreProduct = (props) => {
    const { cart, setCart } = useContext(CartContext);
    function handleAdd(e) {  
        // a trick to restart animation courtesy Chris Coyier. Does not work in strict mode
        e.target.classList.remove("fahflyToCart");
        void e.target.offsetWidth;
        e.target.classList.add("fahflyToCart");
        // update cart
        console.log('handleadd', cart[0], e.target)
        if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
            incQty(cart, setCart, e.target.getAttribute('data-item-title'));
            // incQty(e, cart, setCart);// BREAKING investigate why this is marked breaking
        } else {
            const cartCopy = [...cart];
            const thisItem = {
                id: uuid(), 
                title: e.target.getAttribute('data-item-title'),
                artist: e.target.getAttribute('data-item-artist'),
                description: e.target.getAttribute('data-item-description'), 
                price: e.target.getAttribute('data-item-price'), 
                condition: e.target.getAttribute('data-item-condition'),
                level: e.target.getAttribute('data-item-level'),
                harptype: e.target.getAttribute('data-item-harptype'),
                newprice: e.target.getAttribute('data-item-newprice'),
                notes: e.target.getAttribute('data-item-notes'),
                product_image: e.target.getAttribute('data-item-url'),
                product_quantity: '1'    
            }
            cartCopy.push(thisItem);
            setCart(cartCopy);
        }
    }
    return (
        <div className="fahproduct">
            <div height='50%'>
                <img 
                    src={props.product.image} 
                    alt={props.product.title} 
                    className="fahproduct__image"
                />
            </div>
            
            <div className="fahproduct__title" style={{width: '95%', margin: '25px auto 0', marginTop: '15px', whiteSpace: 'nowrap', overflow:'auto'}}>
                <div style={{fontSize: '20px'}}>{props.product.title}</div>
                <div style={{fontSize: '16px', fontStyle: 'italic'}}>{props.product.artist?props.product.artist:"_"}</div>
            </div>
            <p className="fahproduct__description">{props.product.description}</p>
            {props.product.category==='music'
            ?<div className="fahproductDetails">
                <div><span>Level:</span> {props.product.level}</div>
                <div><span>Harp Type:</span> {props.product.harptype}</div>
                <div><span>Condition (1-10):</span> {props.product.condition}</div>
                <div style={{height: '40px'}}><span>Notes:</span> {props.product.notes}</div>
            </div>
            :''}
            <div className="fahproduct__price-button-container">
                <div className="fahproduct__price">${Number(props.product.price).toFixed(2)}</div>
                <button 
                    className='submit-btn'
                    style={{marginTop: '0px', marginBottom: '25px'}}
                    onClick={(e)=>handleAdd(e)}
                    data-item-id={props.product.id}
                    data-item-title={props.product.title}
                    data-item-artist={props.product.artist}
                    data-item-description={props.product.description}
                    data-item-price={props.product.price}
                    data-item-url={props.product.image}
                    data-item-image={props.product.image}
                    data-item-level={props.product.level}
                    data-item-harptype={props.product.harptype}
                >
                    Add to cart
                </button>
            </div>        
            <StoreProductCss />
        </div>
    )
}

export default withRouter(StoreProduct)
