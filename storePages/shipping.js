// packages
import { useEffect, useContext, useState, useReducer } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Router from 'next/router';
import axios from 'axios';
// contexts
import { UserContext } from '../src/main/contexts/UserContext';
import { CartContext } from '../src/store/contexts/CartContext';
import { CartSubtotalsContext } from '../src/store/contexts/CartSubtotalsContext';
import { CurrencyContext } from '../src/main/contexts/CurrencyContext';
import { StatusContext } from '../src/store/contexts/StatusContext';
// components
import StatusIndicator from '../src/store/components/main/StatusIndicator';
import Subtotal from '../src/store/components/main/Subtotal';
import OrderSummary from '../src/store/components/main/OrderSummary';
import Results from '../src/main/components/main/Results';
import Spinner from '../src/main/components/main/Spinner';
// other internal
import ShippingCss from '../src/store/styles//Shipping.css';
import { resultInfoReducer } from '../src/main/reducers/reducers';
import { RESULTS_INITIAL_STATE, RESET_SHIPPING_INFO } from '../src/main/constants/constants';
import {
    generateReceiptEmailHtml, 
    selectRegion, 
    shipping,
    tax,
    deletelocalCart,
    getShippingArray
} from '../src/store/utils/checkoutHelpers';
import { 
    getNumItems, getStores
} from '../src/store/utils/storeHelpers';

function Shipping() {
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { setStatus } = useContext(StatusContext);
    const [ newRoute, setNewRoute ]  = useState(false);
    const [screenWidth, setScreenWidth] = useState();
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);

    function resetResults() {
        if (document.querySelector('#loadingLoginText').innerText.includes('records')) resetSignupForm();
        document.querySelector('#loadingLoginText').innerText='';
        dispatchResultInfo({type: 'initial'});
    }
    function handleClick(msg, routeChange) {
        const resultText = document.querySelector('#loadingLoginText');
        resultText.innerText=msg;
        routeChange==="false"?setNewRoute(false):setNewRoute(routeChange);
        dispatchResultInfo({type: 'OK'});
    }
    function loginGuest(evt) { 
        resetResults();
        newRoute&&Router.push(`${newRoute}`);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        // check cart
        if (getNumItems(cart)===0) return handleClick("Cart is Empty", "false");
        // check email
        if (!user.shippingemail) return handleClick("Contact email required.", "false");
        // for international shipping estimate
        if (user.shippingcountry!=='Canada'&&user.shippingcountry!=='United States'&&user.shippingcountry!=='Antarctica') {
            document.querySelector('#spinner').style.display="block";
            // prepare communication object
            const receipt = {
                email: user.shippingemail,
                shipping: cartSubtotals.shipping,
                html: `<h3>A shipping estimate is on it's way!</h3><p>The following order has been sent to findaharp.com to request a shipping estimate. Your credit card has not been charged.</p>${generateReceiptEmailHtml(cart, cartSubtotals, user, currencyMultiplier)}`
            }
            // email order to Find a Harp for estimate
            try {
                await axios.post(`${process.env.backend}/api/v1/sendreceipt`, receipt);
                deletelocalCart('fah-cart');
                setCart([]);
                setCartSubtotals([]);
                setStatus('completed');
                setUser({...user, 
                    RESET_SHIPPING_INFO});
                handleClick("International orders require approval of shipping costs. Your order has been sent to Find a Harp, but your credit card has not been charged. You will receive an order total including shipping by email within 24 hours.", "/onlinestore");
            } catch (e) {
                handleClick('Error sending email to Find a Harp, please check your connection and try again.', "false")
            }
            document.querySelector('#spinner').style.display="none";
        } else {
            Router.push('/payment');
        }
    }
    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'shippingfname': 
                setUser({...user, shippingfname: evt.target.value});''
                break
            case 'shippinglname': 
                setUser({...user, shippinglname: evt.target.value});''
                break
            case 'shippingemail': 
                setUser({...user, shippingemail: evt.target.value});''
                break
            case 'shippingphone': 
                setUser({...user, shippingphone: evt.target.value});''
                break
            case 'shippingaltphone': 
                setUser({...user, shippingaltphone: evt.target.value});''
                break
            case 'shippingaddress': 
                setUser({...user, shippingaddress: evt.target.value});''
                break
            case 'shippingaddress2': 
                setUser({...user, shippingaddress2: evt.target.value});''
                break
            case 'shippingcity': 
                setUser({...user, shippingcity: evt.target.value});''
                break 
            case 'shippingzip_postal': 
                setUser({...user, shippingzip_postal: evt.target.value});''
                break
            case 'shippingcountry': 
                setUser({...user, shippingcountry: evt.target.value});''
                break
            case 'shippingregion': 
                setUser({...user, shippingregion: evt.target.value});''
                break
            case 'notes': 
                setUser({...user, shippingnotes: evt.target.value});''
                break
            case 'shippingDifferent': 
                setUser({...user, shippingDifferent: !user.shippingDifferent});''
                break
            case 'paymentType': 
                setUser({...user, paymentType: evt.target.value});''
                break
            default :
        }
    }
    function changeCountry(val) {
        if (val==='Canada') {
            if (user.currency!=="CAD") handleClick('Currency is being changed to Canadian.', "false")
            setUser({...user, shippingcountry: val, currency: 'CAD', shippingregion: ''});
        } else {
            setUser({...user, shippingcountry: val, currency: 'USD', shippingregion:''});
        }
        setCartSubtotals({...cartSubtotals, shipping, taxes: 0, shippingarray: getShippingArray(val, cart) });
    }
    function changeRegion(val) {
        selectRegion(val, user, setUser);
        let tempTax = 0;
        let subCart = [];
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
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    useEffect(()=> {
        setScreenWidth(window.innerWidth);
    },[]);
    useEffect(()=>{
        setStatus('shipping');
    },[]);
    // this function to test the generate receipt function without actually purchasing
    async function testReceipt() {
        // prepare communication object
        const receipt = {
            email: user.shippingemail,
            html: generateReceiptEmailHtml(cart, cartSubtotals, user, currencyMultiplier)
        }
        // email receipt
        try {
            await axios.post(`${process.env.backend}/api/v1/sendreceipt`, receipt);
        } catch (e) {
            handleClick('Error emailing receipt, but order has been placed successfully. Please contact orders@findaharp.com to have a receipt emailed.', '/receipt')
        }
    }
    return (
        <div className='whiteWallPaper'>
            <Spinner />
            <div style={{margin: 'auto'}}>
                <StatusIndicator />
                {/* <button onClick={testReceipt}>test receipt</button> FOR TESTING */}
                <Results 
                    resultInfo={resultInfo} 
                    loginGuest={loginGuest}
                    resetResults={resetResults}
                />
                <div><Subtotal type="subtotal"/></div>
                <div style={{padding: '15px'}}>
                    <h3>Contact Information</h3>
                    <div className="shippingemail" style={{marginBottom:'0px'}}>
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
                    <div style={{fontStyle: 'italic', color: '#adadad', marginBottom: '60px'}}>
                        Shipping updates and order receipt will be sent to this address.
                    </div>
                    <h3>Shipping Address</h3>
                </div>
               <form 
                    method="get" 
                    onSubmit={(e)=>handleSubmit(e)}
                    style={user.shippingcountry==="Pickup"?{display: 'none',padding: '15px'}:{flex: '12',padding: '15px'}}
                >
                    <div>
                    <table style={{borderSpacing: '10px', flex:'12'}}>
                        <tr>
                            <td colSpan='4'>
                            </td>
                        </tr>
                    </table>
                    </div>
                    <div className='shippingContainer'>
                    <div style={{flex: '12'}}>
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
                                        <div className="selectContainer" style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                                        <RegionDropdown
                                            className="dropDown"
                                            style={{
                                                padding:'15px 5px',
                                                border:'2px solid black',
                                                borderRadius:'3px',
                                                marginTop:'2.5px',
                                                backgroundColor:'#fff',
                                                WebkitAppearance: 'none',
                                                minWidth: '100%'
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
                                        <input 
                                            type="text" 
                                            name="shippingphone" 
                                            value={user.shippingphone} 
                                            onChange={handleChange} 
                                            id="shippingphone" 
                                        />
                                    </div> 
                                </td>
                                <td>
                                    <div>
                                        <label htmlFor="phone">Alternate Phone</label>
                                        <input 
                                            type="text" 
                                            name="shippingaltphone" 
                                            value={user.shippingaltphone} 
                                            onChange={handleChange} 
                                            id="shippingaltphone" 
                                        />
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
                                            fontSize: '36px',
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
                                        
                                        <div className="selectContainer" style={{position: 'relative', display: 'inline-block', width: '100%'}}>
                                        <RegionDropdown
                                            className="dropDown"
                                            style={{
                                                padding:'15px 0',
                                                border:'2px solid black',
                                                borderRadius:'3px',
                                                marginTop:'2.5px',
                                                backgroundColor:'#fff',
                                                WebkitAppearance: 'none',
                                                minWidth: '100%'
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
                                        <input 
                                            type="text" 
                                            name="shippingphone"
                                            value={user.shippingphone} 
                                            onChange={handleChange} 
                                            id="shippingphone" 
                                        />
                                    </div> 
                                </td>
                                <td colSpan='2'>
                                    <div>
                                        <label htmlFor="phone">Alternate Phone</label>
                                        <input 
                                            type="text" 
                                            name="shippingaltphone" 
                                            value={user.shippingaltphone} 
                                            onChange={handleChange} 
                                            id="shippingaltphone" 
                                        />
                                    </div> 
                                </td>
                            </tr>
                        </table> 
                    
                } 
                </div>
                <div className="shippingOrderSummary">
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
                <div style={user.shippingcountry==="Pickup"?{ flex: 4, backgroundColor: '#fff'}:{display: 'none',padding: '15px'}}>
                    <h3 style={{padding: '15px', borderBottom: '1px solid #868686'}}>Order Summary</h3>
                    <OrderSummary />
                    <button 
                        className='submit-btn'
                        type='button'
                        style={{fontSize:'15px', fontWeight:'600', padding:'15px'}}
                        onClick={()=>{
                            if (user.shippingemail) {
                                Router.push('/payment');
                            } else {
                                handleClick("Email required.", "false");
                            }
                        }}
                    >
                        Continue to Payment
                    </button>
                </div>
                <ShippingCss />
            </div>
        </div>
    )
}

export default Shipping;
