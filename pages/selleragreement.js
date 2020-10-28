import { useContext, useEffect, useReducer } from 'react';
import Router from 'next/router';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { UserContext } from '../src/contexts/UserContext';
import { CartContext } from '../src/contexts/CartContext';
import { CurrencyContext } from '../src/contexts/CurrencyContext';
import { CartSubtotalsContext } from '../src/contexts/CartSubtotalsContext';
import ShippingCss from '../src/styles/onlinestore/Shipping.css';
import { SHIPPING_CALCULATIONS } from '../src/constants/constants';
import { resultInfoReducer } from '../src/reducers/reducers';
import Results from '../src/components/Results';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../src/constants/constants';
import { 
    selectRegion,
    tax
} from '../src/utils/checkoutHelpers';

function selleragreement() {
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
    const handleStorePickup = () => {
        if (String(user.shippingcountry).toUpperCase()==='PICKUP') {
            const confirmCurrency = window.confirm("Continue to view currency in Canadian dollars?\nSelect OK for Canadian dollars. Select cancel for US dollars.");
            setUser({...user, shippingcountry: null, shippingregion: null, currency: confirmCurrency?"CAD":"USD"})
            setCartSubtotals({...cartSubtotals, shipping: null, taxes: null})
        } else {
            setCartSubtotals({...cartSubtotals, shipping: 0.00, taxes: tax(cart, "Alberta", currencyMultiplier)})
            setUser({...user, shippingcountry: "Pickup", shippingregion: "Alberta", currency: "CAD"})
        }
    }
    const handleCountryChange = (val) => {
        if (val==='Canada') {
            if (user.currency!=="CAD") handleClick('Currency is being changed to Canadian.')
            setUser({...user, shippingcountry: val, currency: 'CAD', shippingregion: ''});
        } else {
            if (val!=="Pickup") setUser({...user, shippingcountry: val, currency: 'USD', shippingregion:''});
        }
        switch(val) {
            case 'Canada':
                setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.Canada});
                break;
            case 'United States':
                setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.USA, taxes: 0});
                break;
            case 'Pickup':
                setCartSubtotals({...cartSubtotals, shipping: 0});
                setUser({...user, currency: "CAD"});
                break;
            default:
                setCartSubtotals({...cartSubtotals, shipping: SHIPPING_CALCULATIONS.default, taxes: 0});
        }
    }
    function changeRegion(val) {
        selectRegion(val, user, setUser); 
        if (user.shippingcountry==="Canada") {
            setCartSubtotals({...cartSubtotals, taxes: tax(cart,val,currencyMultiplier)});
        } else {
            setCartSubtotals({...cartSubtotals, taxes: 0});
        }
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    },[]);
    useEffect(()=> {
        if (user.firstname!=="Vavra Harps") {
            alert('You must be logged in as Vavra Harps. Contact Tisha for login password.');
            Router.push('/');
        }
    });
    return (
        <>
            <Results 
                resultInfo={resultInfo} 
                loginGuest={loginGuest}
                resetResults={resetResults} 
            />
            <h1>Harp Seller Agreement</h1>
        </>
    )
}

export default selleragreement;
