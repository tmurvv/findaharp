import { useContext } from 'react';

import { StatusContext } from '../../contexts/StatusContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import OrderSummaryCss from '../../styles/onlineStore/OrderSummary.css'
import {
    getNumItems,
    getSubTotal
} from '../../utils/storeHelpers';

function OrderSummary() {
    const { status } = useContext(StatusContext);
    const { currency } = useContext(CurrencyContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    return (
        <>
             <div class="orderSummary" style={{padding: '15px', borderBottom: '1px solid #868686'}}>
                <div class='flex-sb'>
                    <p style={{textAlign: 'left'}}>Product Subtotal</p>
                    <p style={{textAlign: 'right'}}>${getSubTotal(cart)}{currency}</p>
                </div>
                <div class='flex-sb'>
                    <p style={{textAlign: 'left'}}>Estimated Shipping</p>
                    <p style={{textAlign: 'right'}}>${cartSubtotals.shipping}</p>
                </div>
                <div class='flex-sb'>
                    <p style={{textAlign: 'left'}}>Estimated Taxes</p>
                    <p style={{textAlign: 'right'}}>${cartSubtotals.taxes}</p>
                </div>
            </div>
            <div class='flex-sb' style={{padding: '15px'}}>
                    <h4 style={{textAlign: 'left'}}>Estimated Total</h4>
                    <p style={{textAlign: 'right'}}>${getSubTotal(cart) + parseFloat(cartSubtotals.taxes)===NaN?0:parseFloat(cartSubtotals.taxes) + parseFloat(cartSubtotals.shipping)===NaN?0:parseFloat(cartSubtotals.shipping)}</p>
            </div>
            
            <OrderSummaryCss />
        </>
    )
}

export default OrderSummary;
