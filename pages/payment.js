// packages
import { useEffect, useContext, useState } from 'react';

// internal
import PaymentCss from '../src/styles/onlinestore/Payment.css';
import StatusIndicator from '../src/components/onlinestore/StatusIndicator';
import Subtotal from '../src/components/onlineStore/Subtotal';
import StripeCheckout from '../src/components/onlinestore/StripeCheckout';
import PaypalCheckout from '../src/components/onlinestore/PaypalCheckout';
import OrderSummary from '../src/components/onlinestore/OrderSummary';
import { StatusContext } from '../src/contexts/StatusContext';

function Payment() {
    const { setStatus } = useContext(StatusContext);
    const [ method, setMethod ]  = useState('stripe');
    
    function changeRadio(e) {
        if (e.target.checked===true) {setMethod(e.target.value);}
    }
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    },[]);
    useEffect(()=>{
        setStatus('payment');
    },[]);
    return (
        <div className='whiteWallPaper'>
            <div className='paymentContainer'>
            <StatusIndicator />
            <Subtotal type='total'/>
            <div className='paymentshippingContainer'>
                <form method="get">
                    <h3>Payment</h3>
                    <div className='paymentInfo'>
                        <div className='paymentMethod' style={{display: 'flex', fontSize: '20px', fontWeight: 'bold', paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid lightgrey'}}>
                            <input id="stripe" onClick={(e)=>changeRadio(e)} type='radio' id='cc' name='paymentMethod' value='stripe' style={{transform: 'scale(2)', marginRight: '15px'}}/>
                            <label htmlFor='cc' style={{transform: 'translate(0, -5px)'}}>Credit Card</label>
                        </div>
                        <StripeCheckout method={method} />
                        <div id='paypal' style={{display: 'flex', fontSize: '20px', fontWeight: 'bold', paddingBottom: '20px', marginTop:'25px', borderBottom: '1px solid lightgrey'}} className='paymentMethod'>
                            <input type='radio' onClick={(e)=>changeRadio(e)} id='paypal' name='paymentMethod' value='paypal' style={{transform: 'scale(2)', marginRight: '15px'}}/>
                            <label htmlFor='cc' style={{transform: 'translate(0, -5px)'}}>PayPal</label>
                        </div>
                        <PaypalCheckout method={method}/>
                    </div>
                </form>
            </div>
            <OrderSummary />   
            <PaymentCss />
            </div>
        </div>
    )
}

export default Payment;