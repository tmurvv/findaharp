import { useContext, useEffect, useReducer } from 'react';

import { StatusContext } from '../../contexts/StatusContext';
import { StoresOrderedFromContext } from '../../contexts/StoresOrderedFromContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import { onlineOrderReducer } from '../../reducers/reducers';
import OrderSummaryCss from '../../styles/onlinestore/OrderSummary.css';
import { RESULTS_INITIAL_STATE } from '../../constants/constants';
import {
    getNumItems,
    getSubTotal
} from '../../utils/storeHelpers';
import {
    getTotal,
    shipping,
    tax
} from '../../utils/checkoutHelpers';

const onlineOrderReducerInitialState = {
    shipping: 0,
    taxes: 0
}

function OrderSummary() {
    const { status } = useContext(StatusContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { storesOrderedFrom } = useContext(StoresOrderedFromContext);
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    // const [ resultInfo, dispatchResultInfo ] = useReducer(resultInfoReducer, RESULTS_INITIAL_STATE);
    const [ onlineOrder, dispatchOnlineOrder ] = useReducer(onlineOrderReducer, {
        ...onlineOrderReducerInitialState, 
    });
    
    useEffect(() => {
        
        // dispatchOnlineOrder({type:'pickup'})
        let initShipping = 0;
        let initTaxes = 0;
        if (getNumItems(cart)>0&&user.shippingcountry) initShipping = shipping(user.shippingcountry,cart[0].store, cart)
        if (getNumItems(cart)>0&&user.shippingcountry&&user.shippingregion) initTaxes = tax(cart,user.shippingcountry,user.shippingregion, currencyMultiplier)
        if (getNumItems(cart)>0) console.log('ord sum', cart[0])

        if (String(storesOrderedFrom).toUpperCase()==="FINDAHARP"&&user.shippingcountry==="Pickup") {
            initShipping = 0;
            initTaxes = tax(cart, "Canada", "Alberta", currencyMultiplier);
        }

        if (String(storesOrderedFrom).toUpperCase()==="HARPSETC"&&user.shippingcountry==="Pickup") {
            initShipping = 0;
            initTaxes = tax(cart,"United States","California",currencyMultiplier);
        }
        setCartSubtotals({...cartSubtotals, 
            shipping: initShipping, 
            taxes: initTaxes
        });
    }, []);
    return (
        <>
             <div className="orderSummary" style={{padding: '15px', borderBottom: '1px solid #868686'}}>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Products Subtotal:</p>
                    {user.currency==='USD'?<p style={{textAlign: 'right'}}>${!isNaN(Number(getSubTotal(cart)))?(Number(getSubTotal(cart)).toFixed(2)):'0.00'}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD</span></p>
                    :<p style={{textAlign: 'right'}}>${!isNaN(Number(getSubTotal(cart))*currencyMultiplier)?(Number(getSubTotal(cart))*currencyMultiplier).toFixed(2):'0.00'}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD</span></p>}
                </div>
                <div>
                    <div className='flex-sb'>
                        <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Shipping: </p>
                        <p style={{textAlign: 'right'}}> NYI
                            {/* ${cartSubtotals.shipping===-1
                                ?'International'
                                :!isNaN(Number(cartSubtotals.shipping))
                                    ?(Number(cartSubtotals.shipping)).toFixed(2)
                                    :'0.00'
                            }
                            {String(user.shippingcountry).toUpperCase()==="CANADA"||String(user.shippingcountry).toUpperCase()==="PICKUP"||cartSubtotals.shipping===-1
                                ?'*'
                                :''
                            } */}
                        </p>
                    </div>
                    {/* {cart.length>0?<p style={{fontSize: '10px', fontStyle: 'italic', marginTop: '-15px', marginBottom: '25px'}}>SOLD BY {String(storesOrderedFrom).toUpperCase()} {String(storesOrderedFrom).toUpperCase()==="HARPSETC"?'(USA)':'(Canada)'}</p>:''}  */}
                </div>
                {String(storesOrderedFrom).toUpperCase()!=="HARPSETC"?<p style={{fontSize: '12px',marginTop:'-10px', maxWidth: '350px'}}>*If your order qualifies for Canada Post letter rate, your credit card will be refunded $12.00 at time of shipping. <a style={{fontSize: '12px', borderBottom: '1px solid #6A75AA', color: '#6A75AA'}} href='https://www.canadapost.ca/tools/pg/manual/PGletterml-e.asp#1392028' target='_blank'>requirements</a></p>:''}
                {String(user.shippingcountry).toUpperCase()==="PICKUP"?<p style={{fontSize: '14px',marginTop:'-10px', maxWidth: '350px'}}>*Pickup at store</p>:''}
                {cartSubtotals.shipping=="-1"&&String(user.shippingcountry).toUpperCase()!=="PICKUP"?<p style={{fontSize: '12px',marginTop:'-10px', maxWidth: '350px'}}>*International orders require a shipping estimate. Your order will be submitted, but your credit card will not be charged until shipping costs are approved by you.</p>:''}
                {String(storesOrderedFrom).toUpperCase()==='HARPSETC'&&user.shippingcountry!=="Canada"&&cartSubtotals.shipping=="-1"&&String(user.shippingcountry).toUpperCase()!=="PICKUP"?<p style={{fontSize: '12px', maxWidth: '350px'}}>*International orders from Harps Etc. require a wire transfer. Information on payment will be sent with your shipping estimate.</p>:''}
                
                <div className='flex-sb'>
                    <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Taxes:</p>
                    <p style={{textAlign: 'right'}}>${!isNaN(Number(cartSubtotals.taxes))?(Number(cartSubtotals.taxes)).toFixed(2):'0.00'}</p>
                </div>
            </div>
            <div className='flex-sb' style={{padding: '15px'}}>
                    <h4 style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Total:</h4>
                    {user.currency==="USD"?<p style={{textAlign: 'right'}}>${!isNaN(Number(getTotal(cart, user)))?Number(getTotal(cart, user)).toFixed(2):'0.00'}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD</span></p>
                    :<p style={{textAlign: 'right'}}>${!isNaN(Number(getTotal(cart, user, currencyMultiplier)))?Number(getTotal(cart, user, currencyMultiplier)).toFixed(2):'0.00'}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD</span></p>}
            </div>
            <OrderSummaryCss />
        </>
    )
}

export default OrderSummary;
