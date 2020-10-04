import React, { useState, useEffect, useContext, useReducer } from "react";
import Router from 'next/router';
import axios from 'axios';
import uuid from 'react-uuid';

import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { UserContext } from '../../contexts/UserContext';
import { StatusContext } from '../../contexts/StatusContext';

import Results from '../Results';
import { RESULTS_INITIAL_STATE } from '../../constants/constants';
import { resultInfoReducer } from '../../reducers/reducers';
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { getTotal, generateReceiptEmailHtml } from "../../utils/checkoutHelpers";
import IndexCss from "../../styles/index.css";
import CheckoutFormCss from "../../styles/onlinestore/CheckoutForm.css";
import ShippingCss from "../../styles/onlinestore/Shipping.css";

export default function StripeCheckout(props) {
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { currency } = useContext(CurrencyContext);
    const { user, setUser } = useContext(UserContext);
    const { setStatus } = useContext(StatusContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    console.log('cart', cart)
    console.log('user', user)
    console.log('cartSubtotals', cartSubtotals)
    console.log('currency', currency)
    useEffect(() => {
        if (getTotal(cart, user)&&getTotal(cart,user)>0) {
            try {
                // Create PaymentIntent as soon as the page loads
                window
                .fetch(`https://findaharp-api-testing.herokuapp.com/api/v1/create-stripe-payment-intent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // body: JSON.stringify({items: [{ id: "xl-tshirt" }]}) // Format for listing all stripe items
                    body: JSON.stringify({"total": getTotal(cart, user)*100})
                }) 
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setClientSecret(data.clientSecret);
                });
            } catch (e) {
                console.log('error fetch stripe payment intent', e.message)
            }
        } else {
            alert('Total owed is $0.00. Please try again. If problem persists, please send an email via the contact page.');
            Router.push('/');
        }
    }, []);
    const cardStyle = {
        style: {
        base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                color: "#32325d",
                margin: 'auto',
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
        }
    };
    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    const handleSubmit = async ev => {
        const resultText = document.querySelector('#loadingLoginText');
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
            name: ev.target.name.value
            }
        }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            
            // prepare communication object
            const receipt = {
                email: user.shippingemail,
                html: generateReceiptEmailHtml(cart, cartSubtotals, user, currency===1?'USD':'CAD')
            }
            // email receipt
            try {
                await axios.post(`${process.env.backend}/api/v1/sendreceipt`, receipt);
                setCart([]);
                setCartSubtotals([]);
                setStatus('completed');
                Router.push('/receipt')
            } catch (e) {
                alert(e.message, 'Error emailing receipt, but order has been placed successfully.Please contact orders@findaharp.com to have a receipt emailed.') // BREAKING
                setCart([]);
                setCartSubtotals([]);
                setStatus('completed');
                Router.push('/receipt')
            }
        }
    };
    function resetResults() {
        dispatchResultInfo({type: 'initial'});
    }
    function response() {
        if (succeeded) return Router.push('/');
        resultText.innerText=`Something went wrong on payment. Return to home page?`;
        dispatchResultInfo({type: 'tryAgain'});
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    },[]);
    if (props.method==='stripe') {
        return (
            <>
                <form id="payment-form" onSubmit={handleSubmit} style={{margin: 'auto', paddingBottom: '20px', borderBottom: '1px solid lightgrey'}}>
                    <p>We accept the following cards:</p>
                    <img style={{width: '125px', marginBottom: '-15px'}} src='img/creditcardgroup-small.jpg' alt='credit card logos, mastercard, visa, discover, AmEx' />
                    <p style={{fontSize: '12px', fontStyle:'italic', color: 'lightgrey', marginTop: '10px'}}>Powered by Stripe</p>
                    <CardElement id="card-element" options={cardStyle} onChange={handleChange} />                   
                    <button
                        disabled={processing || disabled || succeeded}
                        className="submit-btn"
                        style={{marginTop: '25px', backgroundColor: '#f9bf1e'}}
                        id="submit"
                    >
                        <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Place Order"
                        )}
                        </span>
                    </button>
                    
                    {/* Show any error that happens when processing the payment */}
                    {error && (
                        <div className="card-error" role="alert">
                        {error}
                        </div>
                    )}
                    {/* Show a success message upon completion */}
                    <p className={succeeded ? "result-message" : "result-message hidden"}>
                        Payment succeeded... loading...
                        {/* <a
                        href={`https://dashboard.stripe.com/test/payments`}
                        >
                        {" "}
                        Stripe dashboard.
                        </a> Refresh the page to pay again. */}
                    </p>
                </form>
                <IndexCss />
                <CheckoutFormCss />
                <ShippingCss />
            </>
        );
    } else {
        return('')
    }
    
    
}


{/* <h3>Billing Address</h3>
                    <div>{user.shippingfname} {user.shippinglname}</div>
                    <div>{user.shippingaddress1}</div>
                    <div>{user.shippingaddress2}</div>
                    <div>{user.shippingcity}, {user.shipping} {user.shippingzip_postal}</div>
                    <div>{user.shippingcountry}</div>
                    <button type='button' onClick={()=>document.querySelector('#changeBilling').style.display='block'} style={{
                        backgroundColor: '#fff',
                        outline: 'none',
                        border: '1px dashed #868686',
                        padding: '20px 10px',
                        width: '100%',
                        fontSize: '14px',
                        borderRadius: '3px',
                        marginBottom: '25px'
                    }}>Change Billing Address</button>
                    <div id='changeBilling' style={{display: 'none'}}>   
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
                        <label htmlFor="address2">Address 2</label>
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
                                        marginTop: '5px',
                                        backgroundColor: '#fff'
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
                                <label htmlFor="country">State/Province</label>
                                <RegionDropdown
                                    style={{
                                        width: '98%',
                                        padding: '15px',
                                        border: '2px solid black',
                                        borderRadius: '3px',
                                        marginBottom: '20px',
                                        marginTop: '5px',
                                        backgroundColor: '#fff'
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
                    </div>  */}
