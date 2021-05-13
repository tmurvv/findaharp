import { useContext, useState, useReducer, useEffect } from 'react';
import {withRouter} from 'next/router';
import uuid from 'react-uuid';
import LazyLoad from 'react-lazyload';
import parseNum from 'parse-num';
import {
    incQty
} from '../../utils/storeHelpers';
import { UserContext } from '../../../main/contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../../main/contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import FeaturedProductCss from '../../styles/FeaturedProduct.css';
import { resultInfoReducer } from '../../../main/reducers/reducers';
import Results from '../../../main/components/main/Results';
import { RESULTS_INITIAL_STATE } from '../../../main/constants/constants';
import { STORE_PARTNERS } from '../../../main/constants/storeDirectory';

import { setlocalCart } from '../../utils/checkoutHelpers';

const FeaturedProduct = (props) => {
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const [ openModal, setOpenModal ] = useState(false);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [ sellerInfo, setSellerInfo ] = useState();

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
    useEffect(() => {
        Array.from(STORE_PARTNERS).filter(seller => {
            if (seller.id===props.productdetail.store) setSellerInfo(seller);
        });
    },[]);
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
                        <div className="featuredproduct__price">${parseNum(props.productdetail.price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic', marginLeft: '0'}}>USD</span> ({props.productdetail.newused})</div>
                        :<div className="featuredproduct__price">${(parseNum(props.productdetail.price)*currencyMultiplier).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic', marginLeft: '0'}}>CAD</span> ({props.productdetail.newused})</div>
                    }
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px', marginTop: '-24px'}}>
                        <div style={{width:'fit-content' }}>From: {sellerInfo&&sellerInfo.sellerCountry}</div>
                        <img style={{width: '25px', maxHeight: '20px'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                        <div style={{width:'fit-content'}}>{sellerInfo&&sellerInfo.shipsTo}</div>
                    </div>              
                </div> 
                       
            <FeaturedProductCss />
        </div>
    )
}

export default withRouter(FeaturedProduct)
