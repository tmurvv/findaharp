import parseNum from 'parse-num';
import { setlocalCart } from "./checkoutHelpers";

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
export async function decQty(cart, setCart, prodId) {
    let tempCart = [...cart]
    const idx = tempCart.findIndex(item => item.id===prodId || item.id===prodId);
    tempCart[idx].product_quantity = (tempCart[idx].product_quantity>0)?parseInt(tempCart[idx].product_quantity)-1:0;
    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    setCart(tempCart);
}
export async function incQty(cart, setCart, prodId) {
    let tempCart = [...cart]
    const idx = tempCart.findIndex(item => item.title===prodId || item.id===prodId);
    tempCart[idx].product_quantity = parseInt(tempCart[idx].product_quantity)+1;
    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    setCart(tempCart);
} 
export async function deleteItem(cart, setCart, prodId) {
    if (!confirm("Are you sure you want to delete this item from your cart?")) return;
    let tempCart = [...cart]
    tempCart = tempCart.filter(item => item.id!==prodId);
    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    setCart(tempCart);
}