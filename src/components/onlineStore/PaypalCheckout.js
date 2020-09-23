import { useContext } from 'react';

import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';

import { getTotal } from "../../utils/checkoutHelpers";
function PaypalCheckout(props) {
    const { cart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    if (props.method==='paypal') {
        return (
            <>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                    <input type="hidden" name="cmd" value="_xclick"/>
                    <input type="hidden" name="business" value="W6ELYHGQCWECA"/>
                    <input type="hidden" name="lc" value="CA"/>
                    <input type="hidden" name="item_name" value="Order Total (see emailed receipt for details):"/>
                    <input type="hidden" name="button_subtype" value="services"/>
                    <input type="hidden" name="no_note" value="0"/>
                    <input type="hidden" name="cn" value="Add special instructions to the seller"/>
                    <input type="hidden" name="no_shipping" value="2"/>
                    <input type="hidden" name="amount" value={getTotal(cart,user).toString()}/>
                    <input type="hidden" name="currency_code" value="CAD"/>
                    <input type="hidden" name="return" value="https://harptisha.com"/>
                    <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted"/>
                    <button type="submit" style={{margin: '25px 0', backgroundColor:'#fff', outline:'none', border:'none'}}><img width='80%' src="../img/PayPal-PayNow-Button-300x61.png" alt="Pay Now with Paypal" /></button>
                    {/* <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/> */}
                    {/* <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/> */}
                </form>
            </>
        );
    } else {
        return ('');
    }
    
}

export default PaypalCheckout;
