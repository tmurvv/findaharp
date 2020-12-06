import { useContext, useState, useReducer } from 'react';
import {withRouter} from 'next/router';
import uuid from 'react-uuid';
import LazyLoad from 'react-lazyload';
import parseNum from 'parse-num';
import {
    incQty
} from '../../utils/storeHelpers';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import FeaturedProductCss from '../../styles/onlinestore/FeaturedProduct.css';
import { resultInfoReducer } from '../../reducers/reducers';
import Results from '../Results';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../../constants/constants';

import { leaveSiteListener, setlocalCart } from '../../utils/checkoutHelpers'
import {
    triggerLazy
} from '../../utils/helpers';


const FeaturedProduct = (props) => {
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const [ openModal, setOpenModal ] = useState(false);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);

    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function handleClick(msg) {
        const resultText = document.querySelector('#loadingLoginText');
        resultText.innerText=msg;
        dispatchResultInfo({type: 'OK'});
    }
    function loginGuest(evt) {
        // if (evt) evt.preventDefault();  
        resetResults();
    } 
    function handleImageLoad(evt) {
        if (evt.target.style.height !== '30%') evt.target.style.height="auto";
        if (props.productdetail.naturalHeight && props.productdetail.naturalHeight > 0) evt.target.style.height=`auto`;
    }
    function handleOpenModal() {
        // if (!props.productdetail||!props.productdetail.productTitle) return;
        setOpenModal(true);
        props.handleopendetail(props.productdetail); 
    }
    async function updateCart(e) {
        // // check if second store
        // if (cart.length>0&&cart[0].store !==e.target.getAttribute('data-item-store')) {
        //     // const resultText = document.querySelector('#loadingLoginText');
        //     // resultText.innerText=`Coming soon !! Ordering from two different stores at the same time. Currently Find a Harp can only handle orders from one store at a time. We are new and working hard to enable you to order from different stores. Please complete or delete your order from ${cart[0].store} to order ${e.target.getAttribute('data-item-title')} from ${e.target.getAttribute('data-item-store')}.`;
        //     // dispatchResultInfo({type: 'OK'});
            
        //     return alert(`Coming soon !! Ordering from two different stores at the same time. Currently Find a Harp can only handle orders from one store at a time. Please click on the cart icon and complete or delete your order from "${cart[0].store}" before ordering "${e.target.getAttribute('data-item-title')}" from "${e.target.getAttribute('data-item-store')}".`)
        // }
        if (cart.findIndex(item=>item.title===e.target.getAttribute('data-item-title'))>-1) {
            const targetItem = cart.find(item=>item.title===e.target.getAttribute('data-item-title'));
            if (targetItem&&targetItem.newused&&targetItem.newused==='used') {
                handleClick('Only 1 in stock. Item already in cart.')
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
                price: parseNum(e.target.getAttribute('data-item-price')), 
                condition: e.target.getAttribute('data-item-condition'),
                level: e.target.getAttribute('data-item-level'),
                harptype: e.target.getAttribute('data-item-harptype'),
                newprice: parseNum(e.target.getAttribute('data-item-newprice')),
                notes: e.target.getAttribute('data-item-notes'),
                newused: e.target.getAttribute('data-item-newused'),
                product_image: e.target.getAttribute('data-item-url'),
                product_quantity: '1'    
            }
            cartCopy.push(thisItem);
            cartCopy.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
            const tempCartJson = await JSON.stringify(cartCopy);
            setlocalCart('fah-cart', tempCartJson);
            setCart(cartCopy);
        }
    }
    function handleAdd(e) {  
        e.target.addEventListener("webkitAnimationend", (e)=>updateCart(e));
        e.target.addEventListener("animationend", (e)=>updateCart(e))
        e.target.classList.add("storeflyToCart");
    }
    return (
        <div className="featuredproduct" style={{height: 'auto'}}>
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
                zipMsg='Only 1 in stock. Item already in cart.'
            />
            
            <div className={`featuredproduct__imgcontainer`}>
                <LazyLoad
                    once={true}
                    offset={300}
                    placeholder={<img src={`/img/golden_harp_full_loading.png`} alt="Image Not Found with store logo" />}
                >
                    <img 
                        id={props.productdetail.id} 
                        src={props.productdetail.image} 
                        onError={(evt) => {
                            evt.target.src='./img/not_found.png'; 
                            evt.target.style.height='30%';
                        }} 
                        onLoad={(evt) => handleImageLoad(evt)}
                        alt={props.productdetail.title}
                        onClick={()=>handleOpenModal()}
                    />
                </LazyLoad>
                </div>
                    <div className="featuredproduct__price-button-container">
                    {user&&user.currency==="USD"?    
                        <div className="featuredproduct__price">${parseNum(props.productdetail.price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD</span></div>
                        :<div className="featuredproduct__price">${(parseNum(props.productdetail.price)*currencyMultiplier).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD</span></div>
                    }               
                </div>        
            <FeaturedProductCss />
        </div>
    )
}

export default withRouter(FeaturedProduct)
