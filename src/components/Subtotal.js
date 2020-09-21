import { useContext } from 'react';

import { CartContext } from '../contexts/CartContext';
import SubtotalCss from '../styles/Subtotal.css';
import {
    getNumItems,
    getSubTotal
} from '../utils/storeHelpers';

function Subtotal() {
    const { cart } = useContext(CartContext);
    return (
        <>
             <div className='flexSB subtotal'>
                <h3>SubTotal:</h3>
                <h3><span style={{color: '#868686', fontSize: '11px', fontWeight: '100'}}>({getNumItems(cart)} {getNumItems(cart)===1?'item':'items'})</span>  ${getSubTotal(cart).toFixed(2)}</h3>
            </div>
            <SubtotalCss />
        </>
    )
}

export default Subtotal;
