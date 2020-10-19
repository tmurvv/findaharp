import { useContext, useReducer } from 'react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import ShippingCss from '../../styles/onlinestore/Shipping.css';
import { SHIPPING_CALCULATIONS } from '../../constants/constants';
import { resultInfoReducer } from '../../reducers/reducers';
import Results from '../Results';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../../constants/constants';
import { 
    selectRegion,
    tax
} from '../../utils/checkoutHelpers';

function GetPostalZip() {
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    
    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function handleClick(msg) {
        console.log('here', msg);
        dispatchResultInfo({type: 'OK'});
        const resultText = document.querySelector('#loadingLoginText');
        console.log(resultText)
        resultText.innerText=msg;
        console.log(resultText.innerText)
    }
    function loginGuest(evt) {
        // if (evt) evt.preventDefault();  
        resetResults();
    }
    const handleCountryChange = (val) => {
        if (val==='Canada' && user.currency!=="CAD") {
            handleClick('Currency is being changed to Canadian.')
            setUser({...user, shippingcountry: val, currency: 'CAD', shippingregion: ''});
        } else {
            setUser({...user, shippingcountry: val, currency: 'USD', shippingregion:''});
        }
        
        switch(val) {
            case 'Canada':
                setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.Canada});
                break;
            case 'United States':
                setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.USA, taxes: 0});
                break;
            default:
                setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.default, taxes: 0});
        }
    }
    function changeRegion(val) {
        selectRegion(val, user, setUser); 
        if (user.shippingcountry==="Canada") {
            setCartSubtotals({...cartSubtotals, taxes: tax(cart,val)});
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
                zipMsg='Currecy is being changed to Canadian.'
            />
            <div style={{display:'flex'}}>
                <img style={{height:'33px', marginRight: '4px'}} src='img/store/fastTruck.png' alt='humorous fast truck' />
                <h2>Where are we shipping to?</h2>
            </div>
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
                    fontSize: '18px',
                    pointerEvents: 'none'
                }}>&#711;</span>
                </div>
            </div>
            {user.shippingcountry==='Canada'
            ?<><div className='regionDrop' style={{marginLeft: '0'}}>
                <label htmlFor="country">Select Province to calculate taxes</label>
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
                    name='shippingregion'
                    defaultOptionLabel='Select Province to calculate taxes.'
                    onChange={(val) => {changeRegion(val)}} 
                />
                <span style={{
                    position: 'absolute',
                    right: '4px',
                    top: '20px',
                    fontSize: '18px',
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
