// packages
import { useEffect, useContext, useState, useReducer } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Router from 'next/router';
import axios from 'axios';
// internal
import ShippingCss from '../src/styles/onlinestore/Shipping.css';
import StatusIndicator from '../src/components/onlinestore/StatusIndicator';
import Subtotal from '../src/components/onlinestore/Subtotal';
import OrderSummary from '../src/components/onlinestore/OrderSummary';
import PageTitle from '../src/components/PageTitle';
import { UserContext } from '../src/contexts/UserContext';
import { CartContext } from '../src/contexts/CartContext';
import { CartSubtotalsContext } from '../src/contexts/CartSubtotalsContext';
import { CurrencyContext } from '../src/contexts/CurrencyContext';
import { StatusContext } from '../src/contexts/StatusContext';
import { resultInfoReducer } from '../src/reducers/reducers';
import Results from '../src/components/Results';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../src/constants/constants';
import {
    generateReceiptEmailHtml, 
    selectCountry,
    selectRegion,
    getTotal, 
    shipping,
    tax,
    deleteCartCookie
} from '../src/utils/checkoutHelpers';
import { 
    getNumItems, getSubTotal
} from '../src/utils/storeHelpers';

function Shipping() {
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { setStatus } = useContext(StatusContext);
    const [ change, setChange ]  = useState(false);
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
        Router.push('/onlinestore');
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        if (getNumItems(cart)===0) return handleClick("Cart is Empty");
        // for international shipping estimate
        if (cartSubtotals.shipping===-1) {
            document.querySelector('#spinner').style.display="block";
            // prepare communication object
            const receipt = {
                email: user.shippingemail,
                shipping: cartSubtotals.shipping,
                html: generateReceiptEmailHtml(cart, cartSubtotals, user, currencyMultiplier)
            }
            // email order to Find a Harp for estimate
            try {
                await axios.post(`${process.env.backend}/api/v1/sendreceipt`, receipt);
                // deleteCartCookie('cart');
                setCart([]);
                setCartSubtotals([]);
                setStatus('completed');
                setUser({...user, RESET_SHIPPING_INFO});
                handleClick("International orders require approval of shipping costs. Your order has been sent to Find a Harp, but your credit card has not been charged. You will receive an order total including shipping by email within 24 hours.");    
            } catch (e) {
                handleClick('Error sending email to Find a Harp, please check your connection and try again.')
                // deleteCartCookie('cart');
                setCart([]);
                setCartSubtotals([]);
                setStatus('completed');
                setUser({...user, RESET_SHIPPING_INFO});
            }
            window.removeEventListener('beforeunload', function (e) {
                // Cancel the event
                e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
                // Chrome requires returnValue to be set
                e.returnValue = '';
            });
            document.querySelector('#spinner').style.display="none";
        } else {
            Router.push('/payment');
        }
        
    }
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'shippingfname': 
                setUser({...user, shippingfname: evt.target.value});
                setChange(true);
                break
            case 'shippinglname': 
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
                setUser({...user, shippingaddress: evt.target.value});
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
        if (val==='Canada') alert('Currency is being changed to Canadian.')
        // if (val==='Canada') handleClick('Currency is being changed to Canadian', true);
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
            <img id='spinner' style={{display: 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}src='/img/spinner.gif' alt='spinner' />
            <div style={{margin: 'auto'}}>
                <StatusIndicator />
                <Results 
                    resultInfo={resultInfo} 
                    loginGuest={loginGuest}
                    resetResults={resetResults} 
                    gotoRoute={'/'}
                />
                <div><Subtotal type="total"/></div>
               <form 
                    method="get" 
                    onSubmit={(e)=>handleSubmit(e)}
                    style={{padding: '15px'}}
                >
                    <div>
                    <table style={{borderSpacing: '10px', flex:'12'}}>
                        <tr>
                            <td colSpan='4'>
                            <h3>Contact Information</h3>
                                <div className="shippingemail" style={{marginBottom:'0px',}}>
                                    <label style={{display:'block'}} htmlFor="shippingemail">Email</label>
                                    <input 
                                        type="email" 
                                        name="shippingemail" 
                                        value={user.shippingemail} 
                                        onChange={handleChange} 
                                        id="shippingemail" 
                                        required 
                                    />
                                </div>
                                <div style={{fontStyle: 'italic', color: '#adadad'}}>Shipping updates and order receipt will be sent to this address.</div>
                            </td>
                        </tr>
                    </table>
                    </div>
                    <div className='shippingContainer'>
                    <div style={{flex: '12'}}>
                    <h3>Shipping Address</h3>
                    {screenWidth>1000
                    ?
                        <table style={{borderSpacing: '10px'}}>
                            <tr>
                                <td colSpan='2'>
                                    <div className='countryDrop'>
                                        <label htmlFor="country">Country</label>
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
                                            onChange={(val)=> changeCountry(val)} 
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
                                </td>
                                <td colSpan='2'>

                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <div>
                                        <label htmlFor="shippingfname">First Name</label>
                                        <input 
                                            type="text" 
                                            name="shippingfname" 
                                            value={user.shippingfname} 
                                            onChange={handleChange} 
                                            id="shippingfname" 
                                            required 
                                        />
                                    </div>
                                </td>
                                <td colSpan='2'>
                                    <div>
                                        <label htmlFor="shippinglname">Last Name</label>
                                        <input 
                                            type="text" 
                                            name="shippinglname" 
                                            value={user.shippinglname}
                                            onChange={handleChange} 
                                            id="shippinglname" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='4'>
                                    <label htmlFor="shippingaddress">Address</label>
                                    <input 
                                        type="text" 
                                        name="shippingaddress" v
                                        alue={user.shippingaddress} 
                                        onChange={handleChange} 
                                        id="shippingaddress" 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='4'>
                                    <input 
                                        type="text" 
                                        name="shippingaddress2" 
                                        value={user.shippingaddress2} 
                                        onChange={handleChange} 
                                        id="shippingaddress2" 
                                        placeholder="Optional" 
                                    />
                                </td>
                                
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <div>
                                        <label htmlFor="shippingcity">Town / City</label>
                                        <input 
                                            type="text" 
                                            name="shippingcity" 
                                            value={user.shippingcity} 
                                            onChange={handleChange} 
                                            id="shippingcity" 
                                            required 
                                        />
                                    </div>
                                </td>
                                <td colSpan='1'>
                                    <div style={{transform: 'translate(0, -8px)'}}>
                                        <label htmlFor="shippingRegion">State/Province</label>
                                        <div className="selectContainer" style={{position: 'relative', display: 'inline-block'}}>
                                        <RegionDropdown
                                            className="dropDown"
                                            style={{
                                                padding:'15px 0',
                                                border:'2px solid black',
                                                borderRadius:'3px',
                                                marginTop:'2.5px',
                                                backgroundColor:'#fff',
                                                WebkitAppearance: 'none',
                                                width: '100%'
                                            }}
                                            country={user.shippingcountry}
                                            value={user.shippingregion}
                                            name='shippingregion'
                                            defaultOptionLabel={`Select State/Province__`}
                                            onChange={(val) => {changeRegion(val)}} 
                                            required
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            right: '4px',
                                            top: '16px',
                                            fontSize: '36px',
                                            pointerEvents: 'none',
                                            paddingLeft: '25px'
                                        }}>&#711;</span>
                                        </div>
                                    </div>
                                </td>
                                <td colSpan='1'>
                                    <div>
                                        <label htmlFor="shippingzip_postal">Zip/Postal Code</label>
                                        <input 
                                            type="text" 
                                            name="shippingzip_postal" 
                                            value={user.zip_postal} 
                                            onChange={handleChange} 
                                            id="shippingzip_postal" 
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
                     
                    :<table style={{borderSpacing: '10px', flex:'8'}}>
                            <tr>
                                <td colSpan='4'>
                                    <div className='countryDrop'>
                                        <label htmlFor="country">Country</label>
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
                                            onChange={(val)=> changeCountry(val)} 
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
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='4'>
                                    <div>
                                        <label htmlFor="shippingfname">First Name</label>
                                        <input 
                                            type="text" 
                                            name="shippingfname" 
                                            value={user.shippingfname} 
                                            onChange={handleChange} 
                                            id="shippingfname" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='4'>
                                    <div>
                                        <label htmlFor="shippinglname">Last Name</label>
                                        <input 
                                            type="text" 
                                            name="shippinglname" 
                                            value={user.shippinglname} 
                                            onChange={handleChange} 
                                            id="shippinglname" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='4'>
                                    <label htmlFor="shippingaddress">Address</label>
                                    <input 
                                        type="text" 
                                        name="shippingaddress"
                                        value={user.shippingaddress} 
                                        onChange={handleChange} 
                                        id="shippingaddress" 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='4'>
                                    <input 
                                        type="text" 
                                        name="shippingaddress2" 
                                        value={user.shippingaddress2} 
                                        onChange={handleChange} 
                                        id="shippingaddress2" 
                                        placeholder="Optional" 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='4'>
                                    <div>
                                        <label htmlFor="shippingcity">Town / City</label>
                                        <input 
                                            type="text" 
                                            name="shippingcity" 
                                            value={user.shippingcity} 
                                            onChange={handleChange} 
                                            id="shippingcity" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2' style={{maxWidth: '50%'}}>
                                    <div style={{transform: 'translate(0, -8px)'}}>
                                        <label htmlFor="shippingRegion">State/Province</label>
                                        
                                        <div className="selectContainer" style={{position: 'relative', display: 'inline-block'}}>
                                        <RegionDropdown
                                            className="dropDown"
                                            style={{
                                                padding:'15px 0',
                                                border:'2px solid black',
                                                borderRadius:'3px',
                                                marginTop:'2.5px',
                                                backgroundColor:'#fff',
                                                WebkitAppearance: 'none'
                                            }}
                                            country={user.shippingcountry}
                                            value={user.shippingregion}
                                            name='shippingregion'
                                            defaultOptionLabel={`Select State/Province__`}
                                            onChange={(val) => {changeRegion(val)}} 
                                            required
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
                                </td>
                                <td colSpan='2' style={{maxWidth: '50%'}}>
                                    <div>
                                        <label htmlFor="shippingzip_postal">Zip/Postal Code</label>
                                        <input 
                                            type="text" 
                                            name="shippingzip_postal" 
                                            value={user.shippingzip_postal} 
                                            onChange={handleChange} 
                                            id="shippingzip_postal" 
                                            placeholder="Postcode / Zip" 
                                            required 
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text" name="shippingphone" value={user.phone} onChange={handleChange} id="phone" />
                                    </div> 
                                </td>
                                <td colSpan='2'>
                                    <div>
                                        <label htmlFor="phone">Alternate Phone</label>
                                        <input type="text" name="shippingaltphone" value={user.altphone} onChange={handleChange} id="altphone" />
                                    </div> 
                                </td>
                            </tr>
                        </table> 
                    
                } 
                </div>
                <div style={{ flex: 4, backgroundColor: '#fff'}}>
                    <h3 style={{padding: '15px', borderBottom: '1px solid #868686'}}>Order Summary</h3>
                    <OrderSummary />
                    <button 
                        className='submit-btn'
                        type='submit'
                        style={{fontSize:'15px', fontWeight:'600', padding:'15px'}}
                    >
                        {cartSubtotals.shipping===-1?'Submit order':'Continue to Payment'}
                    </button>
                </div>
                </div>
                </form>
                <ShippingCss />
            </div>
        </div>
    )
}

export default Shipping;
