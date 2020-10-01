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
export function decQty(cart, setCart, prodId) {
    let tempCart = [...cart]
    console.log('hereup', prodId)
    const idx = tempCart.findIndex(item => item.id===prodId || item.id===prodId);
    tempCart[idx].product_quantity = (tempCart[idx].product_quantity>0)?parseInt(tempCart[idx].product_quantity)-1:0;
    
    setCart(tempCart);
}
export function incQty(cart, setCart, prodId) {
    let tempCart = [...cart]
    
    console.log('hereup', prodId)
    const idx = tempCart.findIndex(item => item.title===prodId || item.id===prodId);
    tempCart[idx].product_quantity = parseInt(tempCart[idx].product_quantity)+1;
    setCart(tempCart);
} 
export function deleteItem(cart, setCart, prodId) {
    if (!confirm("Are you sure you want to delete this item from your cart?")) return;
    let tempCart = [...cart]
    tempCart = tempCart.filter(item => item.id!==prodId);
    setCart(tempCart);
}