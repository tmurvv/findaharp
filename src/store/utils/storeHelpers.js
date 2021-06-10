import parseNum from 'parse-num';
import { setlocalCart, tax, shipping, getShippingArray, updateShippingTaxes } from "./checkoutHelpers";
import { ABBR } from '../constants/Abbreviations';

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
export async function decQty(cart, setCart, prodId, cartSubtotals, setCartSubtotals, user, currencyMultiplier) {
    let tempCart = [...cart]
    const idx = tempCart.findIndex(item => item.id===prodId || item.id===prodId);
    tempCart[idx].product_quantity = (tempCart[idx].product_quantity>0)?parseInt(tempCart[idx].product_quantity)-1:0;
    if (tempCart[idx].product_quantity===0) confirm('Quantity 0, delete item from cart?')?tempCart = tempCart.filter(item => item.id!==prodId):'';
    // update shipping & taxes
    updateShippingTaxes(user, tempCart, cartSubtotals, setCartSubtotals, currencyMultiplier)

    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    setCart(tempCart);
    if (tempCart.length===0) return setCartSubtotals({...cartSubtotals, shipping: 0, taxes: 0, shippingArray: []});
    
}
export async function incQty(cart, setCart, prodId, cartSubtotals, setCartSubtotals, user, currencyMultiplier) {
    let tempCart = [...cart]
    const idx = tempCart.findIndex(item => item.title===prodId || item.id===prodId);
    tempCart[idx].product_quantity = parseInt(tempCart[idx].product_quantity)+1;
    // update shipping & taxes
    updateShippingTaxes(user, tempCart, cartSubtotals, setCartSubtotals, currencyMultiplier)
    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    setCart(tempCart);
} 
export async function deleteItem(cart, setCart, prodId, cartSubtotals, setCartSubtotals, user, currencyMultiplier) {
    if (!confirm("Are you sure you want to delete this item from your cart?")) return;
    // prepare replacement cart by removing deleted item
    let tempCart = [...cart]
    tempCart = tempCart.filter(item => item.id!==prodId);
    // update shipping & taxes
    updateShippingTaxes(user, tempCart, cartSubtotals, setCartSubtotals, currencyMultiplier)
    //update local cart
    const tempCartJson = await JSON.stringify(tempCart);
    setlocalCart('fah-cart', tempCartJson);
    // update cart
    setCart(tempCart);
}
export function zeroQuantities(parseStringForm) {
    for (var i = 0; i<parseStringForm.length; i++) {
        if (parseStringForm[i].E) parseStringForm[i].E.qty='0'; 
        if (parseStringForm[i].D) parseStringForm[i].D.qty='0'; 
        if (parseStringForm[i].C) parseStringForm[i].C.qty='0';
        if (parseStringForm[i].B) parseStringForm[i].B.qty='0';
        if (parseStringForm[i].A) parseStringForm[i].A.qty='0';
        if (parseStringForm[i].G) parseStringForm[i].G.qty='0';
        if (parseStringForm[i].F) parseStringForm[i].F.qty='0';
    }
    return parseStringForm;
}
export function getMenuAbbr(fullLength, fallBack) {
    let abbr;
        
    ABBR.map(abbrConst => { 
        if (fullLength===abbrConst[0]) abbr=abbrConst[1];
    });
    if (abbr===undefined) abbr=fallBack;
    return abbr;
}
