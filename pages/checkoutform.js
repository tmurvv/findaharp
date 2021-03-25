import React, { useState, useEffect, useContext, useReducer } from "react";
import Router from 'next/router';

import { CartContext } from '../src/main/contexts/CartContext';
import { UserContext } from '../src/main/contexts/UserContext';
import { CurrencyContext } from '../src/main/contexts/CurrencyContext';
import Results from '../src/main/components/Results';
import { RESULTS_INITIAL_STATE } from '../src/main/constants/constants';
import { resultInfoReducer } from '../src/main/reducers/reducers';
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { getTotal } from "../src/main/utils/checkoutHelpers";
import IndexCss from "../src/main/styles/index.css";
import CheckoutFormCss from "../src/main/styles/onlineStore/CheckoutForm.css";
import { deletelocalCart } from "../src/main/utils/checkoutHelpers";

export default function CheckoutForm() {
    const { cart, setCart } = useContext(CartContext);
    const { user, setUser } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const [resultInfo, dispatchResultInfo] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
        .fetch(`https://findaharp-api.herokuapp.com/api/v1/create-stripe-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({items: [{ id: "xl-tshirt" }]}) // Format for listing all stripe items
            body: JSON.stringify({"total": getTotal(cart, user, currencyMultiplier)*100, currency: Number(currencyMultiplier)===1?"usd": "cad"})
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setClientSecret(data.clientSecret);
        });
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
            deletelocalCart("fah-cart");
            setCart([]);
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
    return (
        <div className='index' style={{minHeight:"90vh"}}>
            <Results 
                resultInfo={resultInfo} 
                loginGuest={response}
                resetResults={resetResults} 
            />
            <h1>{currencyMultiplier}</h1>
            <form id="payment-form" onSubmit={handleSubmit} style={{margin: 'auto', marginTop: '50px'}}>
                <h2>Credit Card Payment</h2>
                <h4 style={{fontStyle:'italic', color: 'lightgrey', fontWeight: '300', marginTop: '0'}}>Powered by Stripe</h4>
                <h3 style={{margin: 'auto', marginBottom: '25px'}}>Total: {getTotal(cart, user, currencyMultiplier)}</h3>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                >
                    <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Pay"
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
                    Payment succeeded, see the result in your
                    <a
                    href={`https://dashboard.stripe.com/test/payments`}
                    >
                    {" "}
                    Stripe dashboard.
                    </a> Refresh the page to pay again.
                </p>
                <img style={{width: 'auto', marginTop: '30px', marginBottom: '-15px'}} src='img/creditcardgroup.jpg' alt='credit card logos, mastercard, visa, discover, AmEx' />
            </form>
            {/* <form id="payment-form" style={{margin: 'auto', marginTop: '50px'}}>
                <h2>Paypal Payment</h2>
                <h3 style={{margin: '25px 0'}}>Total: {getTotal(cart, user, currencyMultiplier)}</h3>
                <p>Paypal payment under construction</p>
                <script src="https://www.paypal.com/sdk/js?client-id=sb"></script>
                <script>paypal.Buttons().render('body');</script>
            </form> */}
            <IndexCss />
            <CheckoutFormCss />
            
        </div>
    );
}