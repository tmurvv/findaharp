import React, { useState, useContext, useEffect } from 'react';
import uuid from 'react-uuid';
// import fetch from "isomorphic-unfetch";
import Router from 'next/router';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import CheckoutCss from '../src/styles/checkout.css';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import {
    getNumItems,
    getSubTotal
} from '../storeHelpers';
import { 
    selectCountry,
    selectRegion,
    shipping,
    tax,
    getTotal
} from '../checkoutHelpers';

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
      // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    }, []); 
    return (
        <>  
            <div class="statusIndicator">
                <ol>
                    <li style={{flex: '1'}}>
                        <div className="statusItem">
                            <p style={{backgroundColor: '#333', color: '#fff'}}>1</p>
                            <a>Shipping</a>
                        </div>
                    </li>
                    <li style={{flex: '2'}}>
                        <div className="statusLine">
                            
                        </div>
                    </li>
                    <li style={{flex: '1'}}>
                        <div className="statusItem">
                            <p>2</p>
                            <a>Payment</a>
                        </div>
                    </li>
                    <li style={{flex: '2'}}>
                        <div className="statusLine">
                            
                        </div>
                    </li>
                    <li style={{flex: '1'}}>
                        <div className="statusItem">
                            <p>3</p>
                            <a>Review</a>
                        </div>
                    </li>
                </ol>
            </div>
            <div className='flexSB'>
                <h3>SubTotal:</h3>
                <h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${getSubTotal(cart).toFixed(2)}</h3>
            </div>
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
                                <div style={{textAlign:'right',color: 'black',border: 'none',paddingBottom:'-10px'}}>{!isNaN(parseFloat(shipping(user)))?'$--.--':parseFloat(shipping(user)).toFixed(2)}</div>
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
                            {/* <div style={{display: 'flex'}}>
                                <button 
                                    className="orderButton"
                                    type="button" 
                                    name="submit" 
                                    onClick={handleSubmit} 
                                    value="Place Order" 
                                    style={{margin: 'auto'}}
                                >Place Order</button>
                            </div> */}
                            
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {/* <button 
                                    className="orderButton"
                                    type="button" 
                                    name="submit" 
                                    onClick={handleSubmit} 
                                    value="Place Order" 
                                    style={{margin: 'auto'}}
                                > */}
                                    <p>Pay with Credit Card:</p>
                                    <img onClick={handleSubmit} style={{width: 'fit-content', marginTop: '30px 50px -15px'}} src='img/creditcardgroup.jpg' alt='credit card logos, mastercard, visa, discover, AmEx' />
                                    {/* </button> */}
                                {/* <button 
                                    className="orderButton"
                                    type="button" 
                                    name="submit" 
                                    //onClick={handleSubmit} 
                                    value="Place Order" 
                                    style={{margin: 'auto'}}
                                > */}
                                <p>Pay with PayPal:</p>
                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                                    <input type="hidden" name="cmd" value="_xclick"/>
                                    <input type="hidden" name="business" value="W6ELYHGQCWECA"/>
                                    <input type="hidden" name="lc" value="CA"/>
                                    <input type="hidden" name="item_name" value="Order Total (see emailed receipt for details):"/>
                                    <input type="hidden" name="button_subtype" value="services"/>
                                    <input type="hidden" name="no_note" value="0"/>
                                    <input type="hidden" name="cn" value="Add special instructions to the seller"/>
                                    <input type="hidden" name="no_shipping" value="2"/>
                                    <input name="amount" value={getTotal(cart,user).toString()}/>
                                    <input type="hidden" name="currency_code" value="CAD"/>
                                    <input type="hidden" name="return" value="https://harptisha.com"/>
                                    <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted"/>
                                    <button type="submit"><img width='100%' src="../img/paypal_secure.png" alt="Secure Payments by PayPal" /></button>
                                    {/* <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/> */}
                                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                                </form>
                                {/* </button> */}
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