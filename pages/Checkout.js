import React, { useState, useContext, useEffect } from 'react';
import uuid from 'react-uuid';
// import fetch from "isomorphic-unfetch";
import Router from 'next/router';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import CheckoutCss from '../src/styles/checkout.css';
import { CartContext } from '../src/contexts/CartContext';
import { UserContext } from '../src/contexts/UserContext';
import { 
    selectCountry,
    selectRegion,
    shipping,
    tax,
    getTotal
} from '../src/utils/checkoutHelpers';

function Checkout(props) {
    const { cart, setCart } = useContext(CartContext);
    const { user, setUser } = useContext(UserContext);
    const [ change, setChange ]  = useState(false);
    // const [stripe, setStripe] = useState(null);

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
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const lineItems = [];
    //     cart.map(cartItem => {
    //         const item = {
    //             name: cartItem.description,
    //             description: '',
    //             images: [cartItem.product_image],
    //             amount: Number(cartItem.price),
    //             currency: "usd",
    //             quantity: Number(cartItem.product_quantity)
    //         }
    //         lineItems.push(item);
    //         console.log(lineItems)
    //     })   
    // }
    // useEffect(
    //     () => setStripe(window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY)),
    //     []
    // );
    const handleSubmit = () => {
        Router.push(`/checkoutform`)
    //     stripe
    //       .redirectToCheckout({
    //         sessionId: props.sessionId
    //       })
    //       .then(function(result) {
    //         console.log(result.error.message);
    //       });
      };
    return (
        <>
            <header>
                <h1>Checkout</h1>
                <h3><span style={{fontStyle: 'italic', textTransform: 'none'}}>for</span>&nbsp;&nbsp;{user.fname} {user.lname}</h3>
            </header>
            <div className="wrapper">
                <div className="row">
                    <form method="get">
                        <div className="col-7 col">
                            <h3 className="topborder"><span>Shipping Details</span></h3>
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
                            <div className="padright">
                                <div>
                                    <CountryDropdown
                                        value={user.country}
                                        name='country'
                                        onChange={(val) => selectCountry(val, user, setUser)} 
                                    />
                                    <RegionDropdown
                                        country={user.country}
                                        value={user.state_prov}
                                        name='state_prov'
                                        onChange={(val) => selectRegion(val, user, setUser)} 
                                        placeholder='select country, then state/prov/region'
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="zip_postal">Zip/Postal Code</label>
                                <input type="text" name="zip_postal" value={user.zip_postal} onChange={handleChange} id="zip_postal" placeholder="Postcode / Zip" required />
                            </div>
                            <div className="padright">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" name="email" value={user.email} onChange={handleChange} id="email" required />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input type="text" name="phone" value={user.phone} onChange={handleChange} id="phone" required />
                            </div>
                            {/* <div style={{display: 'block'}}>
                                <h3 className="topborder"><span>Shipping Address</span></h3>
                                <input type="checkbox" value="3" name="shippingDifferent" onChange={handleChange} checked={user.shippingDifferent} /><p>Ship to a different address?</p>
                                <label htmlFor="notes" className="notes">Order Notes</label>
                                <textarea name="notes" value={user.notes} onChange={handleChange} id="notes" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                            </div> */}
                        </div>
                        <div className="col-5 col order">
                            <h3 className="topborder"><span>Your Order</span></h3>
                            <div className='products'>
                                <table style={{tableLayout: "auto", width: '100%'}}>
                                    <tbody>
                                        <tr>
                                            <th>Qty</th>
                                            <th>Product</th>
                                            <th>SubTotal</th>
                                        </tr>
                                        {cart.map(item=>
                                            <tr key={uuid()}>
                                                <td style={{width:"10%"}}>{item.product_quantity}</td>
                                                <td style={{width:"70%"}}>{item.description}</td>
                                                <td style={{textAlign:'right', width:"20%"}}>${(item.product_quantity*item.price).toFixed(2)}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flexSB">
                                <div className="shipping" style={{color:"black",border: 'none',paddingBottom:'-10px'}}>Shipping</div>
                                <div style={{textAlign:'right',color: 'black',border: 'none',paddingBottom:'-10px'}}>{isNaN(parseFloat(shipping(user)))?'$--.--':parseFloat(shipping(user)).toFixed(2)}</div>
                            </div>
                            <div className="flexSB">
                                <div style={{color:"black",border: 'none',paddingBottom:'-10px'}}>Taxes</div>
                                <div style={{textAlign:'right', color: 'black',border: 'none',paddingBottom:'-10px'}}>{tax(cart, user)}</div>
                            </div>
                            <div className="flexSB">
                                <div style={{color:"black"}}>ORDER TOTAL</div>
                                <div style={{textAlign:'right', color: 'black'}}>${getTotal(cart,user)}</div>
                            </div>
                            {/* <div>
                                <h3 className="topborder"><span>Payment Method</span></h3>
                                <input type="radio" value="creditcard" name="payment" onChange={handleChange}checked /><p>Credit Card <span style={{fontStyle: 'italic', fontSize: '12px'}}>(powered by Stripe)</span></p>
                                <div className="paymenttypes">
                                    <img src="img/mastercard.png" alt="Mastercard Logo" className="cards" />
                                    <img src="img/visa.png" alt="Visa Logo" className="cards" />
                                    <img src="img/discover.jpg" alt="Discover Logo" className="cards" />
                                    <img src="img/americanexpress.png" alt="American Express Logo" className="cards" />
                                </div>
                            </div>
                            <div>
                                <input type="radio" value="paypal" name="payment" onChange={handleChange}/><p>Paypal</p>
                                <div className='paymenttypes'>
                                    <legend><img id='paypallogo' src="img/paypal.png" alt="PayPal Logo" className="paypal" /></legend>
                                </div>
                            </div> */}
                            <div style={{display: 'flex'}}>
                                <button 
                                    className="orderButton"
                                    type="button" 
                                    name="submit" 
                                    onClick={handleSubmit} 
                                    value="Place Order" 
                                    style={{margin: 'auto'}}
                                >Place Order</button>
                            </div>
                            
                        </div>
                        <CheckoutCss />
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default Checkout;


// EXTRA CODE
//#region ASK FOR ACCOUNT
{/* <input type="checkbox" value="2" name="checkbox" /><p>Create an account?</p> */}                
{/* <div className="row">
                    <div className="col-12 col">
                        <div className="info-bar">
                            <p>
                                <i className="fa fa-info"></i> 
                                Returning customer? <a href="#">Click here to login</a>
                            </p>
                        </div>
                        <p>
                            If you have shopped with us before, please enter your details in the boxes below. If you are a new customer please proceed to the Billing &amp; Shipping section.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col">
                        <form method="get" className="user-pswd">
                            <div className="width50 padright">
                                <label htmlFor="username">Username or email</label>
                                <input type="text" name="username" id="username" required />
                            </div>
                            <div className="width50">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" required />
                            </div>
                                <input type="submit" name="submit" value="Login" /><input type="checkbox" value="1" name="checkbox" /><p>Remember me</p>
                        </form>
                        <p><a href="#">Lost your password?</a></p>
                    </div>
                </div> */}
//#endregion
//#region ASK FOR COUPON
                {/* <div className="row">
                     <div className="col-12 col">
                        <div className="info-bar">
                            <p>
                                <i className="fa fa-info"></i> 
                                Have a coupon? <a href="#">Click here to enter your code</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col coupon">
                        <form method="get">
                            <input type="text" name="coupon" id="coupon" placeholder="Coupon code" />
                            <input type="submit" name="submit" value="Apply Coupon" />
                        </form>
                    </div>
                </div> */}

//#endregion