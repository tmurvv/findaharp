// packages
import { useContext, useEffect } from 'react';

// internal
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import SubtotalCss from '../../styles/onlineStore/Subtotal.css';
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
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);
    console.log('subtotal', cart, user)
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
            {props.type==='subtotal'
            ?<div className='flexSB subtotal'>
                <h3>SubTotal:</h3>
                <h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${Number(getSubTotal(cart)).toFixed(2)}</h3>
            </div>
            :<div className='flexSB subtotal'>
                <h3>Estimated Total:</h3>
                {/* <h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${Number(getTotal(cart,user).toFixed(2))}</h3> */}
                <h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${getTotal(cart,user)}</h3> {/*// BREAKING needs error handling */}
            </div>
            }
            <SubtotalCss />
        </>
    )
}

export default Subtotal;
