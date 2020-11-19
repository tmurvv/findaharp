import { useContext, useReducer } from 'react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { StoresOrderedFromContext } from '../../contexts/StoresOrderedFromContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import ShippingCss from '../../styles/onlinestore/Shipping.css';
import { SHIPPING_CALCULATIONS } from '../../constants/constants';
import { resultInfoReducer } from '../../reducers/reducers';
import Results from '../Results';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../../constants/constants';
import { 
    selectRegion,
    tax,
    shipping
} from '../../utils/checkoutHelpers';


function GetPostalZip() {
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { storesOrderedFrom } = useContext(StoresOrderedFromContext);
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
    const handleStorePickup = () => {
        console.log(storesOrderedFrom);
        if (String(user.shippingcountry).toUpperCase()==='PICKUP') {
            const confirmCurrency = window.confirm("View currency in US dollars?\nSelect OK for US dollars. Select cancel for Canadian dollars.");
            setUser({...user, shippingcountry: null, shippingregion: null, currency: confirmCurrency?"USD":"CAD"})
            setCartSubtotals({...cartSubtotals, shipping: null, taxes: null})
        } else {
            if (String(storesOrderedFrom).toUpperCase()==="FINDAHARP") {
                setCartSubtotals({...cartSubtotals, shipping: 0.00, taxes: tax(cart, "Canada", "Alberta", currencyMultiplier)})
                setUser({...user, shippingcountry: "Pickup", shippingregion: "Alberta", currency: "CAD"})
            } else {
                setCartSubtotals({...cartSubtotals, shipping: 0.00, taxes: String(storesOrderedFrom).toUpperCase()==="HARPSETC"?tax(cart, "United States", "California", currencyMultiplier):null})
                setUser({...user, shippingcountry: "Pickup", shippingregion: null, currency: 'USD'})
            }
        }
    }
    const handleCountryChange = (val) => {
        if (val==='Canada') {
            if (user.currency!=="CAD") handleClick('Currency is being changed to Canadian.')
            setUser({...user, shippingcountry: val, currency: 'CAD', shippingregion: ''});
        } else {
            if (val!=="Pickup") setUser({...user, shippingcountry: val, currency: 'USD', shippingregion:''});
        }
        setCartSubtotals({...cartSubtotals, shipping: shipping(val, storesOrderedFrom, cart), taxes:null})
        // switch(val) {
        //     case 'Canada':
        //         setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.Canada});
        //         break;
        //     case 'United States':
        //         setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.USA, taxes: 0});
        //         break;
        //     case 'Pickup':
        //         setCartSubtotals({...cartSubtotals, shipping: 0});
        //         setUser({...user, currency: "CAD"});
        //         break;
        //     default:
        //         setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.default, taxes: 0});
        // }
    }
    function changeRegion(val) {
        selectRegion(val, user, setUser); 
        if (user.shippingcountry==="Canada") {
            setCartSubtotals({...cartSubtotals, taxes: tax(cart,"Canada",val,currencyMultiplier)});
        } else {
            setCartSubtotals({...cartSubtotals, taxes: 0});
        }
    }
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
            <div style={user.shippingcountry&&user.shippingcountry==="Pickup"?{display: 'none'}:{display: 'block'}}>
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
            {user.shippingcountry==='Canada'&&String(storesOrderedFrom).toUpperCase()!=="HARPSETC"
            ?<><div className='regionDrop' style={{marginLeft: '0'}}>
                <label htmlFor="country" style={{display: 'block'}}>Select Province to calculate taxes</label>
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
                    defaultOptionLabel='Select Province to calculate taxes'
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
            {/* <div>
                <input 
                    type='checkbox'
                    name='shippingstorepickup'
                    onChange={handleStorePickup}
                    style={{marginLeft: '0'}}
                    checked={user.shippingcountry&&user.shippingcountry==="Pickup"}
                />
                <label style={{marginLeft: '5px'}} name='newsletter'>
                    Pickup at store<br />
                    {cart.length>0?<span style={{fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold', fontSize: '10px', fontStyle: 'italic'}}>SOLD BY {String(storesOrderedFrom).toUpperCase()} {String(storesOrderedFrom).toUpperCase()==="HARPSETC"?'(USA)':'(Canada)'}</span>:''}
                </label>
            </div> */}
            <ShippingCss />
        </div>
    )
}

export default GetPostalZip;
