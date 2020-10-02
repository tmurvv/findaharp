// packages
import { useEffect, useContext, useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Router from 'next/router';
// internal
import ShippingCss from '../src/styles/onlinestore/Shipping.css';
import StatusIndicator from '../src/components/onlinestore/StatusIndicator';
import Subtotal from '../src/components/onlinestore/Subtotal';
import OrderSummary from '../src/components/onlinestore/OrderSummary';
import PageTitle from '../src/components/PageTitle';
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
import { 
    getNumItems
} from '../src/utils/storeHelpers';

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
            case 'shippingemail': 
                setUser({...user, shippingemail: evt.target.value});
                setChange(true);
                break
            case 'shippingphone': 
                setUser({...user, shippingphone: evt.target.value});
                setChange(true);
                break
            case 'shippingaltphone': 
                setUser({...user, shippingphone: evt.target.value});
                setChange(true);
                break
            case 'shippingaddress': 
                setUser({...user, shippingaddress1: evt.target.value});
                setChange(true);
                break
            case 'shippingaddress2': 
                setUser({...user, shippingaddress2: evt.target.value});
                setChange(true);
                break
            case 'shippingcity': 
                setUser({...user, shippingcity: evt.target.value});
                setChange(true);
                break 
            case 'shippingzip_postal': 
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
        selectCountry(val, user, setUser); 
        setCartSubtotals({...cartSubtotals, 
            shipping: shipping(val), 
            taxes: 0
        });
    }
    function changeRegion(val) {
        selectRegion(val, user, setUser); 
        if (user.shippingcountry==="Canada") {
            setCartSubtotals({...cartSubtotals, taxes: tax(cart,val)});
        } else {
            setCartSubtotals({...cartSubtotals, taxes: 0});
        }
    }
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    },[]);
    const [screenWidth, setScreenWidth] = useState();
    useEffect(()=> {
        setScreenWidth(window.innerWidth);
    },[]);
    useEffect(()=>{
        setStatus('shipping');
    },[]);
    return (
        <div className='whiteWallPaper'>
            <div style={{margin: 'auto'}}>
                <StatusIndicator />
                {screenWidth<551?<div style={{padding: '0 35px'}}><Subtotal type="total"/></div>:''}
                <h3 style={{marginLeft:'35px',marginBottom:'-10px'}}>Shipping Address</h3>
                <div className='shippingContainer'>
                    {screenWidth>1000
                    ?<form method="get" style={{flex: 8}}>
                        <table style={{borderSpacing: '10px'}}>
                            <tr>
                                <td colspan='2'>
                                    <div className='countryDrop'>
                                        <label htmlFor="country">Country</label>
                                        <CountryDropdown
                                            style={{
                                                minWidth: '100%',
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
                                </td>
                                <td colspan='2'>

                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>
                                    <div>
                                        <label htmlFor="fname">First Name</label>
                                        <input 
                                            type="text" 
                                            name="fname" 
                                            value={user.fname} 
                                            onChange={handleChange} 
                                            id="fname" 
                                            required 
                                        />
                                    </div>
                                </td>
                                <td colspan='2'>
                                    <div>
                                        <label htmlFor="lname">Last Name</label>
                                        <input 
                                            type="text" 
                                            name="lname" 
                                            value={user.lname} 
                                            onChange={handleChange} 
                                            id="lname" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='4'>
                                    <label htmlFor="address">Address</label>
                                    <input 
                                        type="text" 
                                        name="address" v
                                        alue={user.address} 
                                        onChange={handleChange} 
                                        id="address" 
                                        required 
                                    />
                                </td>
                                
                            </tr>
                            <tr>
                                <td colspan='4'>
                                    <input 
                                        type="text" 
                                        name="address2" 
                                        value={user.address2} 
                                        onChange={handleChange} 
                                        id="address2" 
                                        placeholder="Optional" 
                                    />
                                </td>
                                
                            </tr>
                            <tr>
                                <td colspan='2'>
                                    <div>
                                        <label htmlFor="city">Town / City</label>
                                        <input 
                                            type="text" 
                                            name="city" 
                                            value={user.city} 
                                            onChange={handleChange} 
                                            id="city" 
                                            required 
                                        />
                                    </div>
                                </td>
                                <td colspan='1'>
                                    <div style={{transform: 'translate(0, -8px)'}}>
                                        <label htmlFor="shippingRegion">State/Province</label>
                                        <RegionDropdown
                                            style={{
                                                padding: '15px',
                                                border: '2px solid black',
                                                borderRadius: '3px',
                                                minWidth: '100%',
                                                marginTop: '2.5px'
                                            }}
                                            country={user.shippingcountry}
                                            value={user.shippingregion}
                                            name='shippingregion'
                                            defaultOptionLabel='Select State/Province'
                                            onChange={(val) => {changeRegion(val)}} 
                                            placeholder='select country, then state/prov/region'
                                        />
                                    </div>
                                </td>
                                <td colspan='1'>
                                    <div>
                                        <label htmlFor="zip_postal">Zip/Postal Code</label>
                                        <input 
                                            type="text" 
                                            name="zip_postal" 
                                            value={user.zip_postal} 
                                            onChange={handleChange} 
                                            id="zip_postal" 
                                            placeholder="Postcode / Zip" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="shippingphone" value={user.phone} onChange={handleChange} id="phone" />
                                    </div> 
                                </td>
                                <td>
                                    <div>
                                        <label htmlFor="phone">Alternate Phone</label>
                                        <input type="text" name="shippingaltphone" value={user.altphone} onChange={handleChange} id="altphone" />
                                    </div> 
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table> 
                    </form> 
                    :<form name='mobile' method="get" style={{flex: 7}}>
                        <table style={{borderSpacing: '10px'}}>
                            <tr>
                                <td colspan='4'>
                                    <div className='countryDrop'>
                                        <label htmlFor="country">Country</label>
                                        <CountryDropdown
                                            style={{
                                                minWidth: '100%',
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
                                </td>
                            </tr>
                            <tr>
                                <td colspan='4'>
                                    <div>
                                        <label htmlFor="fname">First Name</label>
                                        <input 
                                            type="text" 
                                            name="fname" 
                                            value={user.fname} 
                                            onChange={handleChange} 
                                            id="fname" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='4'>
                                    <div>
                                        <label htmlFor="lname">Last Name</label>
                                        <input 
                                            type="text" 
                                            name="lname" 
                                            value={user.lname} 
                                            onChange={handleChange} 
                                            id="lname" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='4'>
                                    <label htmlFor="address">Address</label>
                                    <input 
                                        type="text" 
                                        name="address" v
                                        alue={user.address} 
                                        onChange={handleChange} 
                                        id="address" 
                                        required 
                                    />
                                </td>
                                
                            </tr>
                            <tr>
                                <td colspan='4'>
                                    <input 
                                        type="text" 
                                        name="address2" 
                                        value={user.address2} 
                                        onChange={handleChange} 
                                        id="address2" 
                                        placeholder="Optional" 
                                    />
                                </td>
                                
                            </tr>
                            <tr>
                                <td colspan='4'>
                                    <div>
                                        <label htmlFor="city">Town / City</label>
                                        <input 
                                            type="text" 
                                            name="city" 
                                            value={user.city} 
                                            onChange={handleChange} 
                                            id="city" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>
                                    <div style={{transform: 'translate(0, -8px)'}}>
                                        <label htmlFor="shippingRegion">State/Province</label>
                                        <RegionDropdown
                                            style={{
                                                padding: '15px',
                                                border: '2px solid black',
                                                borderRadius: '3px',
                                                minWidth: '100%',
                                                marginTop: '2.5px'
                                            }}
                                            country={user.shippingcountry}
                                            value={user.shippingregion}
                                            name='shippingregion'
                                            defaultOptionLabel='Select State/Province'
                                            onChange={(val) => {changeRegion(val)}} 
                                            placeholder='select country, then state/prov/region'
                                        />
                                    </div>
                                </td>
                                <td colspan='2'>
                                    <div>
                                        <label htmlFor="zip_postal">Zip/Postal Code</label>
                                        <input 
                                            type="text" 
                                            name="zip_postal" 
                                            value={user.zip_postal} 
                                            onChange={handleChange} 
                                            id="zip_postal" 
                                            placeholder="Postcode / Zip" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan='2'>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="shippingphone" value={user.phone} onChange={handleChange} id="phone" />
                                    </div> 
                                </td>
                                <td colspan='2'>
                                    <div>
                                        <label htmlFor="phone">Alternate Phone</label>
                                        <input type="text" name="shippingaltphone" value={user.altphone} onChange={handleChange} id="altphone" />
                                    </div> 
                                </td>
                            </tr>
                        </table> 
                    </form>
                } 
                <div style={{ flex: 4, backgroundColor: '#fff', marginLeft: '20px' }}>
                    <h3 style={{padding: '15px', borderBottom: '1px solid #868686'}}>Order Summary</h3>
                    <OrderSummary />
                    {/* {screenWidth>=715? */}
                    <button 
                        className='submit-btn'
                        onClick={()=>getNumItems(cart)===0?alert('Cart is Empty'):Router.push('/payment')}
                        style={{fontSize:'15px', fontWeight:'600', padding:'15px'}} //BREAKING needs error message if cart empty
                    >
                        Continue to Payment
                    </button>
                    {/* :''} */}
                </div>
                </div>
                
                <ShippingCss />
            </div>
        </div>
    )
}

export default Shipping;


{/* <form method="get" style={{flex: 7}}>
                        <h3>Shipping</h3>
                        <div className='shippingUpdatesContact'>
                            <h4>Contact Information</h4>
                            <p>Email Address</p>
                            <input type='email' name='shippingemail' value={user.shippingemail} onChange={handleChange} id="shippingemail" required />
                            <p>We'll send a receipt and order updates to this email</p>
                        </div>
                        <div className='shippingInfo'>
                        <h4>Shipping Address</h4>
                        <div className='countryDrop'>
                            <label htmlFor="country">Country</label>
                            <CountryDropdown
                                style={{
                                    width: '50%',
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
                        <div className='customerName whole'>
                                <div className='labelGroup half'>
                                    <label htmlFor="fname">First Name</label>
                                    <input 
                                        className='whole' 
                                        type="text" 
                                        name="fname" 
                                        value={user.fname} 
                                        onChange={handleChange} 
                                        id="fname" 
                                        required 
                                    />
                                </div>   
                                <div className='labelGroup half' style={{float: 'right'}}>
                                    <label htmlFor="lname">Last Name</label>
                                    <input 
                                        className='whole' 
                                        type="text" 
                                        name="lname" 
                                        value={user.lname} 
                                        onChange={handleChange} 
                                        id="lname" 
                                        required 
                                    />
                                </div>
                        </div>
                        
                        <br />
                        
                        <label htmlFor="address">Address</label>
                        <input width='100%' type="text" name="address" value={user.address} onChange={handleChange} id="address" required />
                        <input width='100%' type="text" name="address2" value={user.address2} onChange={handleChange} id="address2" placeholder="Optional" />
                        
                        <br />
                        
                        <div className="labelGroup flex-sb">
                            <div className='labelGroup'>
                                <label htmlFor="city">Town / City</label>
                                <input type="text" name="city" value={user.city} onChange={handleChange} id="city" required />
                            </div>
                            <div className='regionDrop'>
                                <label htmlFor="country">State/Province</label>
                                <RegionDropdown
                                    style={{
                                        padding: '15px',
                                        border: '2px solid black',
                                        borderRadius: '3px',
                                        minWidth: '90%',
                                        marginTop: '5px'
                                    }}
                                    country={user.shippingcountry}
                                    value={user.shippingregion}
                                    name='shippingregion'
                                    defaultOptionLabel='Select State/Province'
                                    onChange={(val) => {changeRegion(val)}} 
                                    placeholder='select country, then state/prov/region'
                                />
                            </div>
                            <div className='zipPostal'>
                                <label htmlFor="zip_postal">Zip/Postal Code</label>
                                <input type="text" name="zip_postal" value={user.zip_postal} onChange={handleChange} id="zip_postal" placeholder="Postcode / Zip" required />
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
                        {/* <OrderSummary />    */}
                    {/* <button 
                        type='button'
                        className='submit-btn'
                        onClick={()=>Router.push('/payment')}
                        style={{width:'90%', marginLeft: '5%', marginBottom: '50px', fontSize:'15px', fontWeight:'600', padding:'15px'}}
                        disabled={cart&&user&&!getTotal(cart, user) || getTotal(cart,user)<=0}
                    >
                        Continue
                    </button> */}