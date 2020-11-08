import { useContext, useEffect } from 'react';

import { StatusContext } from '../../contexts/StatusContext';
import { StoresOrderedFromContext } from '../../contexts/StoresOrderedFromContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import OrderSummaryCss from '../../styles/onlinestore/OrderSummary.css'
import {
    getNumItems,
    getSubTotal
} from '../../utils/storeHelpers';
import {
    getTotal,
    shipping,
    tax
} from '../../utils/checkoutHelpers';

function OrderSummary() {
    const { status } = useContext(StatusContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { storesOrderedFrom } = useContext(StoresOrderedFromContext);
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
 

    useEffect(() => {
        if (getNumItems(cart)>0&&user.shippingcountry) {
            setCartSubtotals({...cartSubtotals, 
                shipping: shipping(user.shippingcountry,cart[0].store), 
                taxes: 0
            });
            if ((user.shippingcountry==="Canada"||user.shippingcountry==="Pickup")&&user.shippingregion) {
                setCartSubtotals({...cartSubtotals, taxes: tax(cart,user.shippingcountry,user.shippingregion,currencyMultiplier)});
            }
        }
    }, []);
    return (
        <>
             <div className="orderSummary" style={{padding: '15px', borderBottom: '1px solid #868686'}}>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Products Subtotal:</p>
                    {user.currency==='USD'?<p style={{textAlign: 'right'}}>${!isNaN(Number(getSubTotal(cart)))?(Number(getSubTotal(cart)).toFixed(2)):'0.00'}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD</span></p>
                    :<p style={{textAlign: 'right'}}>${!isNaN(Number(getSubTotal(cart))*currencyMultiplier)?(Number(getSubTotal(cart))*currencyMultiplier).toFixed(2):'0.00'}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD</span></p>}
                </div>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Shipping: <span style={{fontSize: '10px', fontStyle: 'italic'}}>SOLD BY {storesOrderedFrom.toUpperCase()}</span></p>
                    <p style={{textAlign: 'right'}}>${cartSubtotals.shipping===-1?'International':!isNaN(Number(cartSubtotals.shipping))?(Number(cartSubtotals.shipping)).toFixed(2):'0.00'}{String(user.shippingcountry).toUpperCase()==="CANADA"||String(user.shippingcountry).toUpperCase()==="PICKUP"||cartSubtotals.shipping===-1?'*':''}</p>
                </div>
                {String(user.shippingcountry).toUpperCase()==="CANADA"?<p style={{fontSize: '12px',marginTop:'-10px', maxWidth: '350px'}}>*If your order qualifies for Canada Post letter rate, your credit card will be refunded $12.00 at time of shipping. <a style={{fontSize: '12px', borderBottom: '1px solid #6A75AA', color: '#6A75AA'}} href='https://www.canadapost.ca/tools/pg/manual/PGletterml-e.asp#1392028' target='_blank'>requirements</a></p>:''}
                {String(user.shippingcountry).toUpperCase()==="PICKUP"?<p style={{fontSize: '14px',marginTop:'-10px', maxWidth: '350px'}}>*Pickup at store</p>:''}
                {storesOrderedFrom!=='harpsetc'&&cartSubtotals.shipping=="-1"&&String(user.shippingcountry).toUpperCase()!=="PICKUP"?<p style={{fontSize: '12px',marginTop:'-10px', maxWidth: '350px'}}>*International orders require a shipping estimate. Your order will be submitted, but your credit card will not be charged until shipping costs are approved by you.</p>:''}
                
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
