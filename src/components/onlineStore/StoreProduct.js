import { useContext, useState, useReducer, useEffect } from 'react';
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
import StoreProductCss from '../../styles/onlinestore/StoreProduct.css';
import { resultInfoReducer } from '../../reducers/reducers';
import Results from '../Results';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../../constants/constants';
import { STORE_PARTNERS } from '../../constants/storeDirectory';

import { leaveSiteListener, setlocalCart } from '../../utils/checkoutHelpers'
import {
    triggerLazy
} from '../../utils/helpers';


const StoreProduct = (props) => {
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const [ openStoreModal, setOpenStoreModal ] = useState(false);
    const [ sellerInfo, setSellerInfo ] = useState();
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
    function handleOpenStoreModal() {
        // if (!props.productdetail||!props.productdetail.productTitle) return;
        setOpenStoreModal(true);
        props.handleopenstoredetail(props.productdetail); 
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
        const result = Array.from(STORE_PARTNERS).filter(seller => {
            if (seller.id===props.productdetail.store) setSellerInfo(seller);
        });
    });
    return (
        <div className="storeproduct">
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
                zipMsg='Only 1 in stock. Item already in cart.'
            />
            {/* <div className="storeproduct__imgcontainer">
                <img 
                    src={props.productdetail.image} 
                    alt={props.productdetail.title}
                    onClick={()=>handleOpenStoreModal()} 
                />
            </div> */}
            <div className={`storeproduct__imgcontainer`}>
                <LazyLoad
                    once={true}
                    offset={300}
                    placeholder={<img src={`/img/golden_harp_full_loading.png`} alt="Image Not Found with store logo" />}
                >
                    <img 
                        id={props.productdetail.id} 
                        src={props.productdetail.image&&props.productdetail.image!==undefined&&props.productdetail.image!==''?props.productdetail.image:'/img/golden_harp_full.png'} 
                        onError={(evt) => {
                            evt.target.src='./img/not_found.png'; 
                            // evt.target.style.height='30%';
                        }} 
                        onLoad={(evt) => handleImageLoad(evt)}
                        alt={props.productdetail.title}
                        onClick={()=>handleOpenStoreModal()}
                    />
                </LazyLoad>
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
                {props.productdetail.newused==='used'?<div><span>Condition (1-10):</span> {props.productdetail.condition} (used)</div>:''}
                <button 
                    onClick={()=>handleOpenStoreModal()} 
                    classNames="btn blueFontButton" 
                    style={{
                        color: '#6A75AA', 
                        fontStyle:'italic', 
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        outline: 'none',
                        textDecoration: 'none',
                        border: 'none',
                        fontSize: '14px',
                        textAlign:'left',
                        verticalAlign: 'text-top',
                        letterSpacing: '2px'
                    }}
                >more...</button>
            </div>
            :<>
                <div style={{textAlign: 'left', minHeight: '200px'}}>New Item - {String(props.productdetail.description).substr(0,70)} <span onClick={()=>handleOpenStoreModal()} style={{fontStyle:'italic', cursor:'pointer', color:"cadetblue"}}>more...</span></div></>}
                <div className="storeproduct__price-button-container">
                {user&&user.currency==="USD"?    
                <div className="storeproduct__price">${parseNum(props.productdetail.price).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD</span></div>
                :<div className="storeproduct__price">${(parseNum(props.productdetail.price)*currencyMultiplier).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD</span></div>
                }
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px'}}>
                    <div style={{width:'fit-content'}}>Ships From: {sellerInfo&&sellerInfo.sellerCountry}</div>
                    <img style={{width: '25px', maxHeight: '20px'}} src="/img/store/fastTruck.png" alt='Fast shipping truck' />
                    <div style={{width:'fit-content'}}>To: {sellerInfo&&sellerInfo.shipsTo}</div>
                </div>
                <button 
                    disabled={props.productdetail.sold&&String(props.productdetail.sold).toUpperCase()==='SOLD'}
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
                    {props.productdetail.sold&&String(props.productdetail.sold).toUpperCase()==='SOLD'?'SOLD':'Add to Cart'}
                </button>
            </div>        
            <StoreProductCss />
        </div>
    )
}

export default withRouter(StoreProduct)
