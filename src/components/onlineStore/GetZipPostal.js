import { useContext } from 'react';

import { StatusContext } from '../../contexts/StatusContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { CartSubtotalsContext } from '../../contexts/CartSubtotalsContext';
import ShippingCss from '../../styles/onlinestore/Shipping.css'
import {
    getNumItems,
    getSubTotal
} from '../../utils/storeHelpers';
import {
    getTotal
} from '../../utils/checkoutHelpers';

function GetPostalZip() {
    const { status } = useContext(StatusContext);
    const { currency } = useContext(CurrencyContext);
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { cartSubtotals, setCartSubtotals } = useContext(CartSubtotalsContext);

    const handleChange = (evt) => {
        setUser({...user, shippingzip_postal: evt.target.value});
    }
    return (
        <div style={{padding: '15px', borderBottom: '1px solid #868686'}}>
            <div style={{display:'flex'}}>
                <img style={{height:'33px', marginRight: '4px'}} src='img/store/fastTruck.png' alt='humorous fast truck' />
                <h2>What's your zip/postal code?</h2>
            </div>
            <div>It will help us estimate shipping.</div>
            <input style={{padding: '10px',
                width: '150px',
                borderRadius: '3px',
                marginTop: '10px'}} onchange={(e)=>handleChange(e)} value={user.shippingzip_postal?user.shippingzip_postal:''}/>
                <ShippingCss />
        </div>
    )
}

export default GetPostalZip;
