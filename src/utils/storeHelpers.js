import { SettingsBackupRestoreSharp } from '@material-ui/icons';
import parseNum from 'parse-num';
import { setlocalCart, tax, shipping } from "./checkoutHelpers";

export function getStores(cart) {
    const stores = new Set();
    cart.map(cartItem => {
        stores.add(cartItem.store);
    })
    return Array.from(stores);
}
export function getNumItems(cart) {
    let amt = 0
    cart.map(item => amt=amt+parseInt(item.product_quantity));
    return amt;
}
export function getSubTotal(cart) {
    let amt = 0
    cart.map(item => amt=amt+parseInt(item.product_quantity)*parseFloat(parseNum(item.price)));
    return amt;
}
export async function decQty(cart, setCart, prodId, cartSubtotals, setCartSubtotals, user) {
    let tempCart = [...cart]
    const idx = tempCart.findIndex(item => item.id===prodId || item.id===prodId);
    tempCart[idx].product_quantity = (tempCart[idx].product_quantity>0)?parseInt(tempCart[idx].product_quantity)-1:0;
    if (tempCart[idx].product_quantity===0) confirm('Quantity 0, delete item from cart?')?tempCart = tempCart.filter(item => item.id!==prodId):'';
    tempCart.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    setCart(tempCart);
    if (tempCart.length===0) return setCartSubtotals({...cartSubtotals, shipping: 0, taxes: 0});
    setCartSubtotals({...cartSubtotals, taxes: tax(tempCart, user.shippingcountry, user.shippingregion), shipping:shipping(user.shippingcountry, tempCart[0].store, tempCart), shippingarray: [['simplymusic', 3.33], ['harptoheart', 7.77]]})
}
export async function incQty(cart, setCart, prodId, cartSubtotals, setCartSubtotals, user) {
    let tempCart = [...cart]
    const idx = tempCart.findIndex(item => item.title===prodId || item.id===prodId);
    tempCart[idx].product_quantity = parseInt(tempCart[idx].product_quantity)+1;
    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    setCart(tempCart);
    setCartSubtotals({...cartSubtotals, shipping: shipping(user.shippingcountry, tempCart[0].store, tempCart), shippingarray: [['simplymusic', 3.33], ['harptoheart', 7.77]]})//BREAKING
} 
export async function deleteItem(cart, setCart, prodId, cartSubtotals, setCartSubtotals, user) {
    if (!confirm("Are you sure you want to delete this item from your cart?")) return;
    let tempCart = [...cart]
    tempCart = tempCart.filter(item => item.id!==prodId);
    tempCart.sort((a,b) => (a.store > b.store) ? 1 : ((b.store > a.store) ? -1 : 0));
    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    setCart(tempCart);
    if (tempCart.length===0) return setCartSubtotals({...cartSubtotals, shipping: 0, taxes: 0});
    setCartSubtotals({...cartSubtotals, taxes: tax(tempCart, user.shippingcountry, user.shippingregion), shipping:shipping(user.shippingcountry, cart[0].store, tempCart), shippingarray: [['simplymusic', 3.33], ['harptoheart', 7.77]]})
}