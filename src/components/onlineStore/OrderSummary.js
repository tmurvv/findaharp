import { useContext } from 'react';

import { StatusContext } from '../../contexts/StatusContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import OrderSummaryCss from '../../styles/onlineStore/OrderSummary.css'
import {
    getNumItems,
    getSubTotal
} from '../../utils/storeHelpers';
import {
    getTotal
} from '../../utils/checkoutHelpers';

function OrderSummary() {
    const { status } = useContext(StatusContext);
    const { currency } = useContext(CurrencyContext);
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    return (
        <>
             <div className="orderSummary" style={{padding: '15px', borderBottom: '1px solid #868686'}}>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left'}}>Product Subtotal</p>
                    <p style={{textAlign: 'right'}}>${Number(getSubTotal(cart)).toFixed(2)}{currency}</p>
                </div>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left'}}>Estimated Shipping</p>
                    <p style={{textAlign: 'right'}}>${Number(cartSubtotals.shipping).toFixed(2)}</p>
                </div>
                <div className='flex-sb'>
                    <p style={{textAlign: 'left'}}>Estimated Taxes</p>
                    <p style={{textAlign: 'right'}}>${Number(cartSubtotals.taxes).toFixed(2)}</p>
                </div>
            </div>
            <div className='flex-sb' style={{padding: '15px'}}>
                    <h4 style={{textAlign: 'left'}}>Estimated Total</h4>
                    <p style={{textAlign: 'right'}}>${Number(getTotal(cart, user)).toFixed(2)}</p>
            </div>
            
            <OrderSummaryCss />
        </>
    )
}

export default OrderSummary;
