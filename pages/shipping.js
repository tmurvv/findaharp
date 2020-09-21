// packages
import { useEffect, useContext, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Router from 'next/router';
// internal
import ShippingCss from '../src/styles/Shipping.css';
import StatusIndicator from '../src/components/onlineStore/StatusIndicator';
import Subtotal from '../src/components/Subtotal';
import OrderSummary from '../src/components/onlineStore/OrderSummary';
import { UserContext } from '../src/contexts/UserContext';
import { StatusContext } from '../src/contexts/StatusContext';
import { 
    selectCountry,
    selectRegion
} from '../src/utils/checkoutHelpers';

function Shipping() {
    const { user, setUser } = useContext(UserContext);
    const { setStatus } = useContext(StatusContext);
    const [ change, setChange ]  = useState(false);
    
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'fname': 
                setUser({...user, fname: evt.target.value});
                setChange(true);
                break
            case 'lname': 
                setUser({...user, lname: evt.target.value});
                setChange(true);
                break
            case 'email': 
                setUser({...user, email: evt.target.value});
                setChange(true);
                break
            case 'phone': 
                setUser({...user, phone: evt.target.value});
                setChange(true);
                break
            case 'address': 
                setUser({...user, address: evt.target.value});
                setChange(true);
                break
            case 'address2': 
                setUser({...user, address2: evt.target.value});
                setChange(true);
                break
            case 'city': 
                setUser({...user, city: evt.target.value});
                setChange(true);
                break 
            case 'zip_postal': 
                setUser({...user, zip_postal: evt.target.value});
                setChange(true);
                break
            case 'country': 
                setUser({...user, country: evt.target.value});
                setChange(true);
                break
            case 'region': 
                setUser({...user, region: evt.target.value});
                setChange(true);
                break
            case 'notes': 
                setUser({...user, notes: evt.target.value});
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
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    });
    useEffect(()=>{
        setStatus('shipping');
    });
    return (
        <div className='whiteWallPaper'>
            <StatusIndicator status='shipping'/>
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
                                value={user.country}
                                name='country'
                                onChange={(val) => selectCountry(val, user, setUser)} 
                            />
                        </div>
                        <div className='flex-sb'>
                        <div className='zipPostal'>
                            <label htmlFor="zip_postal">Zip/Postal Code</label>
                            <input type="text" name="zip_postal" value={user.zip_postal} onChange={handleChange} id="zip_postal" placeholder="Postcode / Zip" required />
                        </div>
                        <div className='regionDrop'>
                            <label htmlFor="country">State/Prov</label>
                            <RegionDropdown
                                style={{
                                    width: '98%',
                                    padding: '15px',
                                    border: '2px solid black',
                                    borderRadius: '3px',
                                    marginBottom: '20px',
                                    marginTop: '5px'
                                }}
                                country={user.country}
                                value={user.state_prov}
                                name='state_prov'
                                defaultOptionLabel='Select Region'
                                onChange={(val) => selectRegion(val, user, setUser)} 
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
            </form>
            </div>
            <OrderSummary />   
            <button 
                className='submit-btn'
                onClick={()=>Router.push('/payment')}
                style={{width:'90%', marginLeft: '5%', marginBottom: '50px', fontSize:'15px', fontWeight:'600', padding:'15px'}}
            >
                Continue
            </button>
            <ShippingCss />
        </div>
    )
}

export default Shipping;
