import { useContext,useState } from 'react';
import {withRouter} from 'next/router';
import uuid from 'react-uuid';
import {
    incQty
} from '../../utils/storeHelpers';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import StoreProductCss from '../../styles/onlinestore/StoreProduct.css';

const StoreProduct = (props) => {
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { currency } = useContext(CurrencyContext);
    const [ openModal, setOpenModal ] = useState(false);
    function handleOpenModal() {
        // if (!props.productdetail||!props.productdetail.productTitle) return;
        setOpenModal(true);
        props.handleopendetail(props.productdetail); 
    }
    function updateCart(e) {
        if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
            const targetItem = cart.find(item=>item.title===e.target.getAttribute('data-item-title'));
            if (targetItem&&targetItem.newused&&targetItem.newused==='used') {
                alert('Only 1 in stock. This item already in cart.')
            } else {
                incQty(cart, setCart, e.target.getAttribute('data-item-title'));
            }   
        } else {
            const cartCopy = [...cart];
            const thisItem = {
                id: uuid(), 
                store: e.target.getAttribute('data-item-store'),
                title: e.target.getAttribute('data-item-title'),
                artist_first: e.target.getAttribute('data-item-artist_first'),
                artist_last: e.target.getAttribute('data-item-artist_last'),
                description: e.target.getAttribute('data-item-description'), 
                price: e.target.getAttribute('data-item-price'), 
                condition: e.target.getAttribute('data-item-condition'),
                level: e.target.getAttribute('data-item-level'),
                harptype: e.target.getAttribute('data-item-harptype'),
                newprice: e.target.getAttribute('data-item-newprice'),
                notes: e.target.getAttribute('data-item-notes'),
                newused: e.target.getAttribute('data-item-newused'),
                product_image: e.target.getAttribute('data-item-url'),
                product_quantity: '1'    
            }
            cartCopy.push(thisItem);
            setCart(cartCopy);
        }
    }
    function handleAdd(e) {  
        e.target.addEventListener("webkitAnimationend", (e)=>updateCart(e));
        e.target.addEventListener("animationend", (e)=>updateCart(e))
        e.target.classList.add("storeflyToCart");  
    }
    return (
        <div className="storeproduct">  
            <div className="storeproduct__imgcontainer">
                <img 
                    src={props.productdetail.image} 
                    alt={props.productdetail.title}
                    onClick={()=>handleOpenModal()} 
                />
            </div>
            
            <div className="storeproduct__title" >
                <div style={{fontSize: '18px'}}>{props.productdetail.title}</div>
                <div style={{fontSize: '14px', fontStyle: 'italic'}}>{props.productdetail.artist_first||props.productdetail.artist_last?props.productdetail.artist_first+'   '+props.productdetail.artist_last:"_"}</div>
            </div>
            {/* <p className="storeproduct__description">{props.productdetail.description}</p> */}
            {props.productdetail.category==='music'
            ?<div className="storeproductDetails">
                <div><span>Level:</span> {props.productdetail.level}</div>
                <div><span>Harp Type:</span> {props.productdetail.harptype}</div>
                {props.productdetail.newused==='used'?<div><span>Condition (1-10):</span> {props.productdetail.condition} (used)</div>:<div><span>New Item</span></div>}
                <div onClick={()=>handleOpenModal()} style={{fontStyle:'italic', cursor:'pointer'}}>more...</div>
                {/* <div style={{height: '40px'}}><span>Notes:</span> {props.productdetail.notes}</div> */}
            </div>
            :<><div><span>New Item</span></div><br />
                {/* <div onClick={()=>handleOpenModal()} style={{fontStyle:'italic', cursor:'pointer'}}>more...</div> */}
                <div style={{textAlign: 'left', minHeight: '200px'}}>{String(props.productdetail.description).substr(0,70)} <span onClick={()=>handleOpenModal()} style={{fontStyle:'italic', cursor:'pointer', color:"cadetblue"}}>more...</span></div></>}
                <div className="storeproduct__price-button-container">
                <div className="storeproduct__price">${Number(props.productdetail.price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>{!currency||currency===1?'USD':'CAD'}</span></div>
                <button 
                    className='submit-btn'
                    type="button"
                    style={{marginTop: '0px'}}
                    onClick={(e)=>handleAdd(e)}
                    data-item-id={props.productdetail.id}
                    data-item-store={props.productdetail.store}
                    data-item-title={props.productdetail.title}
                    data-item-artist={props.productdetail.artist_first}
                    data-item-artist={props.productdetail.artist_last}
                    data-item-description={props.productdetail.description}
                    data-item-price={props.productdetail.price}
                    data-item-url={props.productdetail.image}
                    data-item-image={props.productdetail.image}
                    data-item-level={props.productdetail.level}
                    data-item-harptype={props.productdetail.harptype}
                    data-item-newused={props.productdetail.newused}
                >
                    Add to Cart
                </button>
            </div>        
            <StoreProductCss />
        </div>
    )
}

export default withRouter(StoreProduct)
