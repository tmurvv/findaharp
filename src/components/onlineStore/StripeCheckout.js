// packages
import React, { useState, useEffect, useContext, useReducer } from "react";
import Router from 'next/router';
import axios from 'axios';

// contexts
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { UserContext } from '../../contexts/UserContext';
import { StatusContext } from '../../contexts/StatusContext';

// internal
import Results from '../Results';
import { RESULTS_INITIAL_STATE } from '../../constants/constants';
import { resultInfoReducer } from '../../reducers/reducers';
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { 
    getTotal, 
    generateReceiptEmailHtml, 
    deletelocalCart 
} from "../../utils/checkoutHelpers";
import IndexCss from "../../styles/index.css";
import CheckoutFormCss from "../../styles/onlineStore/CheckoutForm.css";
import ShippingCss from "../../styles/onlineStore/Shipping.css";

export default function StripeCheckout(props) {
    // context variables
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { user } = useContext(UserContext);
    const { setStatus } = useContext(StatusContext);
    // state variables
    const [ newRoute, setNewRoute ]  = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const stripe = useStripe();
    const elements = useElements();

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
    useEffect(() => {
        // check for balance owed
        if (getTotal(cart, user,currencyMultiplier)&&getTotal(cart,user,currencyMultiplier)>0) {
            try {
                // Create PaymentIntent as soon as the page loads
                window
                .fetch(`https://findaharp-api.herokuapp.com/api/v1/create-stripe-payment-intent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"total": getTotal(cart, user, currencyMultiplier)*100})
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
            handleClick('Total owed is $0.00. Please note that items priced $0.00 are "free with purchase. \n\nYou may have reached this message by pressing your browser back-button on the PayPal page before paying. If so, you have not been charged for your order, but your cart was lost. We are working to resolve this issue."', 'cart');
        }
    }, []);
    // from Stripe code
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
        dispatchResultInfo({type: 'loadingImage'});
        ev.preventDefault();
        setProcessing(true);
        let payload;
        // contact Stripe
        try {
            payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                    name: ev.target.name.value
                    }
                }
                });
        } catch (e) {
            handleClick('Problem connecting with payment provider. Please check your connection and try again.', 'cart')
        }
        if (payload&&payload.error) {
            resetResults();
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            // reset Stripe vars
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            // reset cart
            deletelocalCart('fah-cart');
            setCart([]);
            setCartSubtotals([]);
            setStatus('completed');
            // prepare communication object
            const receipt = {
                email: user.shippingemail,
                html: generateReceiptEmailHtml(cart, cartSubtotals, user, currencyMultiplier)
            }
            // email receipt
            try {
                await axios.post(`${process.env.backend}/api/v1/sendreceipt`, receipt);
                Router.push('/receipt')
            } catch (e) {               
                handleClick('Error emailing receipt, but order has been placed successfully. Please contact orders@findaharp.com to have a receipt emailed.', '/receipt')
            }
        }
    };
    // check to display cart
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    },[]);
    if (props.method==='stripe') {
        return (
            <>
                <Results 
                    resultInfo={resultInfo} 
                    loginGuest={loginGuest}
                    resetResults={resetResults}
                />
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
                        Payment succeeded... loading page...
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
