// packages
import { useContext, useEffect } from 'react';

// internal
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../../main/contexts/UserContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import { CurrencyContext } from '../../../main/contexts/CurrencyContext';
import SubtotalCss from '../../styles/Subtotal.css';
import {
    getNumItems,
    getSubTotal
} from '../../utils/storeHelpers';
import {
    getTotal,
    shipping,
    tax
} from '../../utils/checkoutHelpers';

function Subtotal(props) {
    const { cart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const { currencyMultiplier } = useContext(CurrencyContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    useEffect(() => {
        if (getNumItems(cart)>0&&user.shippingcountry) {
            setCartSubtotals({...cartSubtotals, 
                shipping: shipping(user.shippingcountry,cart[0].store, cart), 
                taxes: 0,
                shippingarray: [['simplymusic', 3.33], ['harptoheart', 7.77]]
            });
            if (user.shippingcountry==="Canada"&&user.shippingregion) {
                setCartSubtotals({...cartSubtotals, taxes: tax(cart,user.shippingcountry,user.shippingregion,currencyMultiplier)});
            }
        }
    }, []);
    
    return (
        <>
            {props.type==='subtotal'
            ?<div className='flexSB subtotal'>
                <h3>SubTotal:</h3>
                {user.currency==="USD"?<h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${Number(getSubTotal(cart).toFixed(2)).toFixed(2)}</h3>
                :<h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${Number(getSubTotal(cart)*currencyMultiplier).toFixed(2)}</h3>}
            </div>
            :<div className='flexSB subtotal'> 
                <h3>Total: </h3>
                {user.currency==="USD"?<h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${getTotal(cart,user,currencyMultiplier)&&getTotal(cart,user,currencyMultiplier).toFixed(2)}<span style={{fontStyle:'italic',fontSize:'10px'}}>USD</span></h3>
                :<h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${getTotal(cart,user,currencyMultiplier)&&getTotal(cart,user,currencyMultiplier).toFixed(2)}<span style={{fontStyle:'italic',fontSize:'10px'}}>CAD</span></h3>}
            </div>
            }
            <SubtotalCss />
        </>
    )
}

export default Subtotal;
