import { useContext, useReducer, useEffect } from 'react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import ShippingCss from '../../styles/onlineStore/Shipping.css';
import { SHIPPING_CALCULATIONS } from '../../constants/constants';
import { resultInfoReducer } from '../../reducers/reducers';
import Results from '../Results';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../../constants/constants';
import { 
    selectRegion,
    tax,
    getShippingArray,
    updateShippingTaxes
} from '../../utils/checkoutHelpers';
import {getStores, getNumItems} from '../../utils/storeHelpers';

function GetPostalZip() {
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    
    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function handleClick(msg) {
        dispatchResultInfo({type: 'OK'});
        const resultText = document.querySelector('#loadingLoginText');
        resultText.innerText=msg;
    }
    function loginGuest(evt) {
        // if (evt) evt.preventDefault();  
        resetResults();
    }
    const handleCountryChange = (val) => { 
        if (val==='Canada') {
            if (user.currency!=="CAD") handleClick('Currency is being changed to Canadian.', "false")
            setUser({...user, shippingcountry: val, currency: 'CAD', shippingregion: ''});
        } else {
            setUser({...user, shippingcountry: val, currency: 'USD', shippingregion:''});
        }
        setCartSubtotals({...cartSubtotals, taxes: 0, shippingarray: getShippingArray(val,cart) });
    }
    function changeRegion(val) { 
        let tempTax = 0;
        let subCart = [];
        selectRegion(val, user, setUser);
        getStores(cart).map(store => {
            subCart = [];
            cart.map(cartItem=>{
                if (String(cartItem.store)===store) {
                    subCart.push(cartItem);
                }
            });
            tempTax = Number(tempTax) + Number(Number(tax(subCart,user.shippingcountry,val, store, currencyMultiplier)));
        });
        setCartSubtotals({...cartSubtotals, taxes: tempTax });
    }
    useEffect(() => {
        updateShippingTaxes(user,cart,cartSubtotals,setCartSubtotals,currencyMultiplier);
    }, []);
    return (
        <div style={{padding: '15px', borderBottom: '1px solid #868686'}}>
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
                zipMsg='Currency is being changed to Canadian.'
            />
            <div style={{display:'flex', marginLeft: '-6px'}}>
                <img style={{height:'33px', marginRight: '4px'}} src='img/store/fastTruck.png' alt='humorous fast truck' />
                <h2>Where are we shipping to?</h2>
            </div>
            <div>
                <div style={{marginBottom: '15px'}}>
                    <p>It will help us estimate shipping costs.</p>
                </div>
                <div className='countryDrop'>
                    <label htmlFor="country" style={{display: 'block'}}>Country</label>
                    <div className="selectContainer" style={{position: 'relative', display: 'inline-block'}}>
                    <CountryDropdown
                        style={{
                            display: 'block',
                            padding: '15px',
                            border: '2px solid black',
                            borderRadius: '3px',
                            marginBottom: '20px',
                            marginTop: '5px',
                            backgroundColor: '#fff',
                            minWidth: '260px',
                            WebkitAppearance: 'none'
                        }}
                        value={user.shippingcountry}
                        name='shippingcountry'
                        onChange={(val)=> handleCountryChange(val)} 
                    />
                    <span style={{
                        position: 'absolute',
                        right: '8px',
                        top: '20px',
                        fontSize: '36px',
                        pointerEvents: 'none'
                    }}>&#711;</span>
                    </div>
                </div>
            </div>
            {user.shippingcountry==='Canada'||user.shippingcountry==="United States"
            ?<><div className='regionDrop' style={{marginLeft: '0'}}>
                <label htmlFor="country" style={{display: 'block'}}>Select {user.shippingcountry==="Canada"?'Province':'State'} to calculate taxes</label>
                <div className="selectContainer" style={{position: 'relative', display: 'inline-block'}}>
                <RegionDropdown
                    style={{
                        display: 'block',
                        padding: '15px',
                        border: '2px solid black',
                        borderRadius: '3px',
                        marginBottom: '20px',
                        marginTop: '5px',
                        backgroundColor: '#fff',
                        WebkitAppearance: 'none'
                    }}
                    country={user.shippingcountry}
                    value={user.shippingregion}
                    blacklist='["MX", "Venezuela", "Indonesia", "South Africa", "Romania"]'
                    name='shippingregion'
                    defaultOptionLabel={`Select ${user.shippingcountry==='United States'?'state':'province'} to calculate taxes`}
                    onChange={(val) => {changeRegion(val)}} 
                />
                <span style={{
                    position: 'absolute',
                    right: '4px',
                    top: '20px',
                    fontSize: '36px',
                    pointerEvents: 'none'
                }}>&#711;</span>
                </div>
            </div>
            </>
            :''}
            
            <ShippingCss />
        </div>
    )
}

export default GetPostalZip;
