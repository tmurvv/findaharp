// packages
import { useEffect, useContext, useState } from 'react';
import Router from 'next/router';

// internal
import PaymentCss from '../src/styles/onlineStore/Payment.css';
import StatusIndicator from '../src/components/onlineStore/StatusIndicator';
import Subtotal from '../src/components/Subtotal';
import StripeCheckout from '../src/components/onlineStore/StripeCheckout';
import PaypalCheckout from '../src/components/onlineStore/PaypalCheckout';
import OrderSummary from '../src/components/onlineStore/OrderSummary';
import { UserContext } from '../src/contexts/UserContext';
import { StatusContext } from '../src/contexts/StatusContext';
import { 
    selectCountry,
    selectRegion
} from '../src/utils/checkoutHelpers';

function Payment() {
    const { user, setUser } = useContext(UserContext);
    const { setStatus } = useContext(StatusContext);
    const [ change, setChange ]  = useState(false);
    const [ method, setMethod ]  = useState('stripe');
    
    function changeRadio(e) {
        console.log('here', e.target.checked, e.target.value)
        if (e.target.checked===true) {setMethod(e.target.value);}
    }
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    });
    useEffect(()=>{
        setStatus('payment');
        console.log('beg payment', user)
    });
    return (
        <div className='whiteWallPaper'>
            <StatusIndicator />
            <Subtotal />
            <div className='shippingContainer'>
               
            <form method="get">
                <h3>Payment</h3>
                <div className='paymentInfo'>
                    <div className='paymentMethod' style={{fontSize: '20px', fontWeight: 'bold', paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid lightgrey'}}>
                        <input id="stripe" onClick={(e)=>changeRadio(e)} type='radio' id='cc' name='paymentMethod' value='stripe' style={{transform: 'scale(2)', marginRight: '15px'}}/>
                        <label htmlFor='cc'>Credit Card</label>
                    </div>
                    <StripeCheckout method={method} />
                    
                    <div id='paypal' style={{fontSize: '20px', fontWeight: 'bold', paddingBottom: '20px', marginTop:'25px', borderBottom: '1px solid lightgrey'}} className='paymentMethod'>
                        <input type='radio' onClick={(e)=>changeRadio(e)} id='paypal' name='paymentMethod' value='paypal' style={{transform: 'scale(2)', marginRight: '15px'}}/>
                        <label htmlFor='cc'>PayPal</label>
                    </div>
                    <PaypalCheckout method={method}/> {/* BREAKING - radio does not highlight properly */}
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
            {/* <button 
                className='submit-btn'
                onClick={()=>Router.push('/Review')}
                style={{width:'90%', marginLeft: '5%', marginBottom: '50px', fontSize:'15px', fontWeight:'600', padding:'15px'}}
            >
                Place Order
            </button>   */}
            <PaymentCss />
        </div>
    )
}

export default Payment;

// const handleChange = (evt) => {
//     switch (evt.target.name) {
//         case 'fname': 
//             setUser({...user, fname: evt.target.value});
//             setChange(true);
//             break
//         case 'lname': 
//             setUser({...user, lname: evt.target.value});
//             setChange(true);
//             break
//         case 'email': 
//             setUser({...user, email: evt.target.value});
//             setChange(true);
//             break
//         case 'phone': 
//             setUser({...user, phone: evt.target.value});
//             setChange(true);
//             break
//         case 'address': 
//             setUser({...user, address: evt.target.value});
//             setChange(true);
//             break
//         case 'address2': 
//             setUser({...user, address2: evt.target.value});
//             setChange(true);
//             break
//         case 'city': 
//             setUser({...user, city: evt.target.value});
//             setChange(true);
//             break 
//         case 'zip_postal': 
//             setUser({...user, zip_postal: evt.target.value});
//             setChange(true);
//             break
//         case 'country': 
//             setUser({...user, country: evt.target.value});
//             setChange(true);
//             break
//         case 'region': 
//             setUser({...user, region: evt.target.value});
//             setChange(true);
//             break
//         case 'notes': 
//             setUser({...user, notes: evt.target.value});
//             setChange(true);
//             break
//         case 'shippingDifferent': 
//             setUser({...user, shippingDifferent: !user.shippingDifferent});
//             setChange(true);
//             break
//         case 'paymentType': 
//             setUser({...user, paymentType: evt.target.value});
//             setChange(true);
//             break
//         default :
//     }
// }
