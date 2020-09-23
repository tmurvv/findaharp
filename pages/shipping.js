// packages
import { useEffect, useContext, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Router from 'next/router';
// internal
import ShippingCss from '../src/styles/onlineStore/Shipping.css';
import StatusIndicator from '../src/components/onlineStore/StatusIndicator';
import Subtotal from '../src/components/Subtotal';
import OrderSummary from '../src/components/onlineStore/OrderSummary';
import { UserContext } from '../src/contexts/UserContext';
import { CartContext } from '../src/contexts/CartContext';
import { CartSubtotalsContext } from '../src/contexts/CartSubtotalsContext';
import { StatusContext } from '../src/contexts/StatusContext';
import { 
    selectCountry,
    selectRegion,
    getTotal, 
    shipping,
    tax
} from '../src/utils/checkoutHelpers';

function Shipping() {
    const { user, setUser } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { setStatus } = useContext(StatusContext);
    const [ change, setChange ]  = useState(false);
    
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'fname': 
                setUser({...user, shippingfname: evt.target.value});
                setChange(true);
                break
            case 'lname': 
                setUser({...user, shippinglname: evt.target.value});
                setChange(true);
                break
            case 'email': 
                setUser({...user, shippingemail: evt.target.value});
                setChange(true);
                break
            case 'phone': 
                setUser({...user, shippingphone: evt.target.value});
                setChange(true);
                break
            case 'address': 
                setUser({...user, shippingaddress1: evt.target.value});
                setChange(true);
                break
            case 'address2': 
                setUser({...user, shippingaddress2: evt.target.value});
                setChange(true);
                break
            case 'city': 
                setUser({...user, shippingcity: evt.target.value});
                setChange(true);
                break 
            case 'zip_postal': 
                setUser({...user, shippingzip_postal: evt.target.value});
                setChange(true);
                break
            case 'shippingcountry': 
                setUser({...user, shippingcountry: evt.target.value});
                setChange(true);
                break
            case 'shippingregion': 
                setUser({...user, shippingregion: evt.target.value});
                setChange(true);
                break
            case 'notes': 
                setUser({...user, shippingnotes: evt.target.value});
                setChange(true);
                break
            case 'shippingDifferent': 
                setUser({...user, shippingDifferent: !user.shippingDifferent});
                setChange(true);
                break
            case 'paymentType': 
                setUser({...user, paymentType: evt.target.value});
                setChange(true);
                break
            default :
        }
    }
    function changeCountry(val) {
        console.log(val)
        selectCountry(val, user, setUser); 
        setCartSubtotals({...cartSubtotals, 
            shipping: shipping(val), 
            taxes: 0
        });
    }
    function changeRegion(val) {
        console.log(val)
        selectRegion(val, user, setUser); 
        if (user.shippingcountry==="Canada") {
            setCartSubtotals({...cartSubtotals, taxes: tax(cart,val)});
        } else {
            setCartSubtotals({...cartSubtotals, taxes: 0});
        }
    }
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    });
    useEffect(()=>{
        setStatus('shipping');
    });
    return (
        <div className='whiteWallPaper'>
            <StatusIndicator />
            <Subtotal />
            <div className='shippingContainer'>
            <form method="get">
                <h3>Shipping</h3>
                <div className='shippingUpdatesContact'>
                    <h4>Contact Information</h4>
                    <p>Email Address</p>
                    <input type='email' />
                    <p>We'll send order updates to this email</p>
                </div>
                <div className='shippingInfo'>
                <h4>Shipping Address</h4>
                    <div className="padright">
                        <label htmlFor="fname">First Name</label>
                        <input type="text" name="fname" value={user.fname} onChange={handleChange} id="fname" required />
                    </div>
                    <div>
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" name="lname" value={user.lname} onChange={handleChange} id="lname" required />
                    </div>
                    <br />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={user.address} onChange={handleChange} id="address" required />
                    <input type="text" name="address2" value={user.address2} onChange={handleChange} id="address2" placeholder="Optional" />
                    <br />
                    <label htmlFor="city">Town / City</label>
                    <input type="text" name="city" value={user.city} onChange={handleChange} id="city" required />
                    
                        <div className='countryDrop'>
                        <label htmlFor="country">Country</label>
                            <CountryDropdown
                                style={{
                                    width: '98%',
                                    padding: '15px',
                                    border: '2px solid black',
                                    borderRadius: '3px',
                                    marginBottom: '20px',
                                    marginTop: '5px'
                                }}
                                value={user.shippingcountry}
                                name='shippingcountry'
                                onChange={(val)=> changeCountry(val)} 
                            />
                        </div>
                        <div className='flex-sb'>
                        <div className='zipPostal'>
                            <label htmlFor="zip_postal">Zip/Postal Code</label>
                            <input type="text" name="zip_postal" value={user.zip_postal} onChange={handleChange} id="zip_postal" placeholder="Postcode / Zip" required />
                        </div>
                        <div className='regionDrop'>
                            <label htmlFor="country">State/Province</label>
                            <RegionDropdown
                                style={{
                                    width: '98%',
                                    padding: '15px',
                                    border: '2px solid black',
                                    borderRadius: '3px',
                                    marginBottom: '20px',
                                    marginTop: '5px'
                                }}
                                country={user.shippingcountry}
                                value={user.shippingregion}
                                name='shippingregion'
                                defaultOptionLabel='Select State/Province'
                                onChange={(val) => {
                                    console.log("change", user.shippingcountry)
                                    
                                        changeRegion(val)
                                    
                                }} 
                                placeholder='select country, then state/prov/region'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" value={user.phone} onChange={handleChange} id="phone" required />
                    </div>
                </div>
                {/* <div style={{display: 'block'}}>
                    <h3 className="topborder"><span>Shipping Address</span></h3>
                    <input type="checkbox" value="3" name="shippingDifferent" onChange={handleChange} checked={user.shippingDifferent} /><p>Ship to a different address?</p>
                    <label htmlFor="notes" className="notes">Order Notes</label>
                    <textarea name="notes" value={user.notes} onChange={handleChange} id="notes" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                </div> */}
                <OrderSummary />   
            <button 
                type='button'
                className='submit-btn'
                onClick={()=>Router.push('/payment')}
                style={{width:'90%', marginLeft: '5%', marginBottom: '50px', fontSize:'15px', fontWeight:'600', padding:'15px'}}
                disabled={cart&&user&&!getTotal(cart, user) || getTotal(cart,user)<=0}
            >
                Continue
            </button>
            </form>
            </div>
            
            <ShippingCss />
        </div>
    )
}

export default Shipping;
