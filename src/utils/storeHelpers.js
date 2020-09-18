export function getNumItems(cart) {
    let amt = 0
    cart.map(item => amt=amt+parseInt(item.product_quantity));
    return amt;
}
export function getSubTotal(cart) {
    let amt = 0
    cart.map(item => amt=amt+parseInt(item.product_quantity)*parseFloat(item.price));
    return amt;
}
export function decQty(e, cart, setCart) {
    let tempCart = [...cart]
    const idx = tempCart.findIndex(item => item.description===e.target.getAttribute('data-item-name'));
    tempCart[idx].product_quantity = parseInt(tempCart[idx].product_quantity)-1;
    setCart(tempCart);
}
export function incQty(e, cart, setCart) {
    let tempCart = [...cart]
    const idx = tempCart.findIndex(item => item.description===e.target.getAttribute('data-item-name'));
    tempCart[idx].product_quantity = parseInt(tempCart[idx].product_quantity)+1;
    setCart(tempCart);
}
export function deleteItem(e, cart, setCart) {
    confirm("Are you sure you want to delete this line item?");
    const updateItemId = e.target.getAttribute('dataid');
    let tempCart = [...cart]
    tempCart = tempCart.filter(item => item.id!==updateItemId);
    setCart(tempCart);
}