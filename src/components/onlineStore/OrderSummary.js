import { useContext, useEffect } from 'react';

import { StatusContext } from '../../contexts/StatusContext';
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
    const { currency } = useContext(CurrencyContext);
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    
    useEffect(() => {
        if (getNumItems(cart)>0&&user.shippingcountry) {
            setCartSubtotals({...cartSubtotals, 
                shipping: shipping(user.shippingcountry), 
                taxes: 0
            });
            if (user.shippingcountry==="Canada"&&user.shippingregion) {
                setCartSubtotals({...cartSubtotals, taxes: tax(cart,user.shippingregion)});
            }
        }
    }, []);
    return (
        <>
             <div className="orderSummary" style={{padding: '15px', borderBottom: '1px solid #868686'}}>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Products Subtotal:</p>
                    <p style={{textAlign: 'right'}}>${Number(getSubTotal(cart)).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>{!currency||currency===1?'USD':'CAD'}</span></p>
                </div>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Shipping:</p>
                    <p style={{textAlign: 'right'}}>${Number(cartSubtotals.shipping).toFixed(2)}</p>
                </div>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Taxes:</p>
                    <p style={{textAlign: 'right'}}>${Number(cartSubtotals.taxes).toFixed(2)}</p>
                </div>
            </div>
            <div className='flex-sb' style={{padding: '15px'}}>
                    <h4 style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Total:</h4>
                    <p style={{textAlign: 'right'}}>${Number(getTotal(cart, user)).toFixed(2)}<span style={{fontSize: '10px', fontStyle: 'italic'}}>{!currency||currency===1?'USD':'CAD'}</span></p>
            </div>
            
            <OrderSummaryCss />
        </>
    )
}

export default OrderSummary;
