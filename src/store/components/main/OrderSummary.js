import { useContext, useEffect, useReducer } from 'react';

import { CurrencyContext } from '../../../main/contexts/CurrencyContext';
import { UserContext } from '../../../main/contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import OrderSummaryCss from '../../styles/OrderSummary.css';
import { STORE_PARTNERS } from '../../../main/constants/storeDirectory';
import {
    getNumItems,
    getSubTotal
} from '../../utils/storeHelpers';
import {
    getTotal,
    updateShippingTaxes
} from '../../utils/checkoutHelpers';

const onlineOrderReducerInitialState = {
    shipping: 0,
    taxes: 0
}

function OrderSummary(props) {
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { user } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    
    useEffect(() => {
        updateShippingTaxes(user, cart, cartSubtotals, setCartSubtotals,currencyMultiplier);
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
                    {getNumItems(cart)>0&&cartSubtotals.shippingarray&&cartSubtotals.shippingarray.length>0?cartSubtotals.shippingarray.map(shippingItem => 
                        <div className='flex-sb'>
                        <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Shipping: <span style={{fontSize: '10px', fontStyle: 'italic'}}>FROM {(STORE_PARTNERS.filter(partner => partner.id===shippingItem[0])[0].productTitle).toUpperCase()}</span></p>
                        <p style={{textAlign: 'right'}}>
                            ${shippingItem[1]===-1
                                ?'International'
                                :!isNaN(Number(shippingItem[1]))
                                    ?(Number(shippingItem[1])).toFixed(2)
                                    :'0.00'
                            }
                        </p>
                    </div>
                    ):<div className='flex-sb'>
                        <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Shipping:</p>
                        <p style={{textAlign: 'right'}}>
                             $0.00
                        </p>
                    </div>}
                    
                    {/* {cart.length>0?<p style={{fontSize: '10px', fontStyle: 'italic', marginTop: '-15px', marginBottom: '25px'}}>SOLD BY {String(storesOrderedFrom).toUpperCase()} {String(storesOrderedFrom).toUpperCase()==="HARPSETC"?'(USA)':'(Canada)'}</p>:''}  */}
                </div>
                {/* {String(storesOrderedFrom).toUpperCase()!=="HARPSETC"?<p style={{fontSize: '12px',marginTop:'-10px', maxWidth: '350px'}}>*If your order qualifies for Canada Post letter rate, your credit card will be refunded $12.00 at time of shipping. <a style={{fontSize: '12px', borderBottom: '1px solid #6A75AA', color: '#6A75AA'}} href='https://www.canadapost.ca/tools/pg/manual/PGletterml-e.asp#1392028' target='_blank'>requirements</a></p>:''} */}
                {/* {cartSubtotals.shipping=="-1"?<p style={{fontSize: '12px',marginTop:'-10px', maxWidth: '350px'}}>*International orders require a shipping estimate. Your order will be submitted, but your credit card will not be charged until shipping costs are approved by you.</p>:''} */}
                {/* {String(storesOrderedFrom).toUpperCase()==='HARPSETC'&&user.shippingcountry!=="Canada"&&cartSubtotals.shipping=="-1"?<p style={{fontSize: '12px', maxWidth: '350px'}}>*International orders from Harps Etc. require a wire transfer. Information on payment will be sent with your shipping estimate.</p>:''} */}
                
                <div className='flex-sb'>
                    <p style={{textAlign: 'left', fontFamily: 'Metropolis Extra Bold', fontWeight: 'bold'}}>Taxes:</p>
                    <p style={{textAlign: 'right'}}>${!isNaN(Number(cartSubtotals.taxes))?(Number(cartSubtotals.taxes)).toFixed(2):'0.00'}</p>
                </div>
            </div>
            <div className='flex-sb' style={{padding: '15px'}}>
                <h4 
                    style={{
                        textAlign: 'left', 
                        fontFamily: 'Metropolis Extra Bold', 
                        fontWeight: 'bold'
                    }}>Total:
                </h4>
                {user.currency==="USD"
                ?<p style={{textAlign: 'right'}}>
                    ${!isNaN(Number(getTotal(cart, user)))?Number(getTotal(cart, user)).toFixed(2):'0.00'}<span style={{fontSize: '10px', fontStyle: 'italic'}}>USD</span>
                </p>
                :<p style={{textAlign: 'right'}}>
                    ${!isNaN(Number(getTotal(cart, user, currencyMultiplier)))?Number(getTotal(cart, user, currencyMultiplier)).toFixed(2):'0.00'}<span style={{fontSize: '10px', fontStyle: 'italic'}}>CAD</span>
                </p>
                }
            </div>
            <OrderSummaryCss />
        </>
    )
}

export default OrderSummary;
