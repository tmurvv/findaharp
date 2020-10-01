import { useContext } from 'react';
import axios from 'axios';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { StatusContext } from '../../contexts/StatusContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import ShippingCss from '../../styles/onlinestore/Shipping.css';
import { SHIPPING_CALCULATIONS } from '../../constants/constants';
import {
    getNumItems,
    getSubTotal
} from '../../utils/storeHelpers';
import { 
    selectCountry,
    selectRegion,
    getTotal, 
    shipping,
    tax
} from '../../utils/checkoutHelpers';

function GetPostalZip() {
    const { status } = useContext(StatusContext);
    const { currency } = useContext(CurrencyContext);
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);

    const handleChange = (evt) => {
        setUser({...user, shippingzip_postal: evt.target.value});
    }
    const handleCountryChange = (val) => {
        if (!val) return alert('Please select country.');
        setUser({...user, shippingcountry: val})
        console.log('here', user.shippingcountry)
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
            <div style={{display:'flex'}}>
                <img style={{height:'33px', marginRight: '4px'}} src='img/store/fastTruck.png' alt='humorous fast truck' />
                <h2>Where are we shipping to?</h2>
            </div>
            <div style={{marginBottom: '15px'}}>It will help us estimate shipping costs.</div>
            {/* <form style={{display: 'block'}}> */}
                <div className='countryDrop'>
                <label htmlFor="country">Country</label>
                <CountryDropdown
                    style={{
                        display: 'block',
                        padding: '15px',
                        border: '2px solid black',
                        borderRadius: '3px',
                        marginBottom: '20px',
                        marginTop: '5px'
                    }}
                    value={user.shippingcountry}
                    name='shippingcountry'
                    onChange={(val)=> handleCountryChange(val)} 
                />
            </div>
            {user.shippingcountry==='Canada'
            ?<div className='regionDrop' style={{marginLeft: '0'}}>
                <label htmlFor="country">Select Province to calculate taxes</label>
                <RegionDropdown
                    style={{
                        display: 'block',
                        padding: '15px',
                        border: '2px solid black',
                        borderRadius: '3px',
                        marginBottom: '20px',
                        marginTop: '5px'
                    }}
                    country={user.shippingcountry}
                    value={user.shippingregion}
                    name='shippingregion'
                    defaultOptionLabel='Select Province to calculate taxes.'
                    onChange={(val) => {changeRegion(val)}} 
                />
            </div>
            :''}
            {/* <label htmlFor="zip_postal">Zip/Postal Code</label>
            <input 
                style={{padding: '10px',
                    width: '150px',
                    borderRadius: '3px',
                    marginTop: '10px',
                    marginBottom: '30px',
                    display:'block'}}
                onChange={(e)=>handleChange(e)}
                name='zip_postal'
                value={user.shippingzip_postal?user.shippingzip_postal:''}
            />
            <button className='submit-btn' type='button' onClick={()=>handleSubmit()}>Submit</button>
            </form> */}
            <ShippingCss />
        </div>
    )
}

export default GetPostalZip;
