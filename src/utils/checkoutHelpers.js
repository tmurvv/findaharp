import uuid from 'react-uuid';
import { getSubTotal, getStores } from './storeHelpers';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import SalesTax from 'sales-tax-cad';
import { SHIPPING_CALCULATIONS } from '../constants/constants';

export function setlocalCart(localName, localValue) {
    localStorage.getItem(localName);
    localStorage.setItem(localName, localValue);
}
export function deletelocalCart(localName) {
    localStorage.removeItem(localName);
}
export function selectCountry(val, user, setUser) {
    if (val==='Canada' && user.currency!=="CAD") {
        setUser({...user, shippingcountry: val, currency: 'CAD', shippingregion: null});
    } else {
        setUser({...user, shippingcountry: val, currency: 'USD', shippingregion: null});
    }
}
export function getProvCode(prov) {
    switch (prov) {
        case "Prince Edward Island":
            return "PE";
        case "Nova Scotia":
            return "NS";
        case "New Brunswick":
            return "NB";
        case "Quebec":
            return "QC";
        case "Newfoundland and Labrador":
            return "NL";
        case "Ontario":
            return "ON";
        case "Manitoba":
            return "MB";
        case "Saskatchewan":
            return "SK";
        case "Alberta":
            return "AB";
        case "British Columbia":
            return "BC";
        case "Yukon":
            return "YN";
        case "Northwest Territories":
            return "NT";
        case "Nunavut":
            return "NU";
        default:
            return null;
    }
}
function harpsetc_shipping(cart, shippingcountry) {
    if (!shippingcountry||!cart||cart.length===0) return [ 0.00, '' ];
    const subtotal=getSubTotal(cart);
    if (shippingcountry==="United States") {
        if (subtotal<10) return [ 6, 'USPS' ];
        if (subtotal>=10&&subtotal<35) return [ 9.95, 'USPS' ];
        if (subtotal>=35&&subtotal<50) return [ 11.50, 'USPS' ];
        if (subtotal>=50&&subtotal<100) return [ 13.25, 'USPS' ];
        if (subtotal>=100&&subtotal<250) return [ 15.25, 'USPS' ];
        if (subtotal>=250&&subtotal<400) return [ 24.25, 'USPS' ];
        if (subtotal>400) return [ 29.95, 'USPS' ];
    } else if (shippingcountry === 'Canada') {
        if (subtotal<10) return [ 19, '*International Shipping' ];
        if (subtotal>=10&&subtotal<35) return [ 22.95, '*International Shipping' ];
        if (subtotal>=35&&subtotal<50) return [ 24.50, '*International Shipping' ];
        if (subtotal>=50&&subtotal<100) return [ 26.25, '*International Shipping' ];
        if (subtotal>=100&&subtotal<250) return [ 28.25, '*International Shipping' ];
        if (subtotal>=250&&subtotal<400) return [ 37.25, '*International Shipping' ];
        if (subtotal>400) return [ 42.95, '*International Shipping' ];
    } else {
        return [-1,''];
    } 
}
function findaharp_shipping(cart, shippingcountry) {
    if (shippingcountry==="Canada") return [ 8.00, "*If your order does not qualify for Canada Post letter rate, you will be contacted to approve additional shipping charges." ];
    if (shippingcountry==="United States") return [ 20.00, "*International Shipping" ];
    return [ -1, '' ];
}
export function shipping(shippingcountry, store, cart) {
    if (!shippingcountry) return 0.00;
    if (shippingcountry==='Antarctica') return 0.00;
    if (store&&store==="harpsetc") return harpsetc_shipping(cart, shippingcountry);
    if (store&&store==="findaharp") return findaharp_shipping(cart, shippingcountry);
}
export function getShippingArray(shippingcountry, cart) {
    let subCart = [];
    let tempShipArray = [];
    getStores(cart).map(store => {
        subCart = [];
        cart.map(cartItem=>{
            if (String(cartItem.store)===store) {
                subCart.push(cartItem);
            }
        });
        tempShipArray.push([ store, Number(shipping(shippingcountry, store, subCart)[0]) ]);
    });
    return tempShipArray;
    // setCartSubtotals({...cartSubtotals, shipping: tempShip, taxes: 0, shippingarray: tempShipArray });
}
export function tax(cart, shippingcountry, shippingregion, store, currencyMultiplier) {
    console.log('in tax', cart, shippingcountry, shippingregion, store, currencyMultiplier)
    if (!shippingregion) return 0.00;
    switch(shippingcountry) {
        case "Canada": 
            if (store==='findaharp') {
                try {
                    const tax = new SalesTax(
                        getProvCode(shippingregion),
                        getSubTotal(cart)*currencyMultiplier,
                        2
                    );
                    return tax.sum().toFixed(2);
                } catch(e) {
                    return 0;
                }
            } else {
                return 0;
            }
        case "United States":
            if (store==='harpsetc'&&shippingregion==='California') {
                return getSubTotal(cart)*.0825;
            } else {
                return 0;
            }
            break;
        default :
            return 0;
    }
          
}
export function getTotal(cart, user, currencyMultiplier) {
    // console.log('params', cart[0], user, currencyMultiplier)
    const subTotal = getSubTotal(cart);
    const shippingArray = getShippingArray(user.shippingcountry, cart);
    let shippingTotal = 0;
    shippingArray.length>0?shippingArray.map(arrayItem => {shippingTotal += arrayItem[1];console.log('inside', shippingTotal)}):0;
    if (shippingTotal<0) shippingTotal=0;
    // console.log('shipingtot', shippingTotal)
    if (!subTotal || subTotal===0) return 0.00;
    if (!user.currency) return subTotal;
    console.log('bott params', user.currency, subTotal, currencyMultiplier)
    if (user.currency==="CAD") {
        // console.log(Number(subTotal)*currencyMultiplier + shippingTotal + Number(tax(cart,user.shippingcountry,user.shippingregion,currencyMultiplier)));
        return (Number(subTotal)*currencyMultiplier + shippingTotal + Number(tax(cart,user.shippingcountry,user.shippingregion,currencyMultiplier)));
    } else {
        // console.log(Number(subTotal) + shippingTotal);
        return (Number(subTotal) + shippingTotal);
    }
}
export function selectRegion(val, user, setUser) {
    setUser({...user, shippingregion: val});
}

export function leaveSiteListener(e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = '';
}

export function generateReceiptEmailHtml(cart, cartSubtotals, user, currencyMultiplier) {
    const subTotal = user.currency==="USD"?getSubTotal(cart):getSubTotal(cart)*currencyMultiplier;
    const total = (Number(getTotal(cart, user, currencyMultiplier))).toFixed(2);
    const currencyText = user.currency==='USD'?'USD':"CAD";
    // prepare today's date for formatting
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const today = new Date();
    const todayDate = today.getDate();
    const monthName = months[today.getMonth()];
    const todayYear = today.getFullYear();
    // create html for cart items
    let itemHtml = '';
    cart.map(item => itemHtml = itemHtml + `
                <tr>
                    <td style="text-align: center; padding: 5px 7px; border: 1px solid #868686">${item.product_quantity}</td>
                    <td colSpan="8" style="padding: 5px 7px; border: 1px solid #868686">${item.title}</td>
                    <td style="text-align: center; padding: 5px 7px; border: 1px solid #868686">$${(item.price*item.product_quantity*(user.currency==='USD'?1:currencyMultiplier)).toFixed(2)}</td>
                </tr>
   `);
   // return html for entire order
    return `
        <html>
        <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif; line-height:1.8em;">
            <img style="width:300px;background-color:#f9bf1e" src="https://findaharp.com/img/storePartners/findaharp_store_logo.png" alt="find a harp logo" />
            <p>Contact Us: orders@findaharp.com</p>
            <h1>Order Receipt</h1>
            <div>Date: ${todayDate}-${monthName}-${todayYear}</div>
            <div>Order Number: ${uuid().substr(0,7)}</div>
            <div>
                <h3>Shipping Address:</h3>
                <p>${user.shippingfname} ${user.shippinglname}<br />
                    ${user.shippingaddress}<br />
                    ${user.shippingaddress2?user.shippingaddress2:''}${user.shippingaddress2?'<br />':''}
                    ${user.shippingcity}, ${user.shippingregion} ${user.shippingzip_postal}<br />
                    ${user.shippingcountry}
                <p>
                <div style="
                    padding: 5px;
                    border-bottom: 1px solid #868686; 
                    margin-top: 30px;"
                >
                <h3>Order Items:<h3/>
                <table style="width: 90%; background-color: #fff; margin: 0 20px; padding: 15px">
                    <th>Qty</th>
                    <th colSpan="8">Item</th>
                    <th>Amount</th>
                    ${itemHtml}
                </table>
                <div class="orderSummary" style="
                    padding:15px;
                    border-bottom:1px solid #868686;"
                >
                    <div style='display:flex; justify-content: space-between; background-color:#fff; margin: 5px;padding:15px;'>
                        <div style="text-align:left;font-family:Metropolis Extra Bold;font-weight:bold">Products Subtotal: </div>
                        <div style="text-align:right;font-size:18px;font-weight:600;">$${Number(subTotal).toFixed(2)}<span style="font-size:12px;font-style:italic;">${currencyText}</span></div>
                    </div>
                    <div style='display:flex; justify-content: space-between;background-color: #fff; margin: 5px;padding:15px;'>
                        <div style="text-align:left;font-family:Metropolis Extra Bold;font-weight:bold">Shipping:</div>
                        <div style="text-align:right; font-size:18px;font-weight:600;">$${Number(cartSubtotals.shipping).toFixed(2)}</div>
                    </div>
                    <div style='display:flex; justify-content: space-between; background-color: #fff; margin: 5px;padding:15px;'>
                        <div style="text-align:left;font-family:Metropolis Extra Bold;font-weight:bold;">Taxes:</div>
                        <div style="text-align:right; font-size: 18px; font-weight: 600;">$${Number(cartSubtotals.taxes).toFixed(2)}</div>
                    </div>
                </div>
                <div style="padding:15px; display:flex; justify-content: space-between; background-color: #fff; border-bottom: 1px solid #868686;">
                    <div style="text-align:left;font-family:Metropolis Extra Bold;font-weight:bold">Total:</div>
                    <div style="text-align:right;font-size:18px;font-weight:600;">$${Number(total).toFixed(2)}<span style="font-size:12px;font-style:italic;">${currencyText}</span></div>
                </div>
                <div style="
                    width: 100%;
                    text-align:center;
                    font-size:18px;
                    font-weight:800;
                    font-style: italic; 
                    margin-top: 10px;"
                >
                    Thank you for your order
                </div>
            </div>
        </body>
    </html>`
}

// <html>
//         <body style="color:#083a08; font-family: Lato, Arial, Helvetica, sans-serif; line-height:1.8em;">
//         <div style="
//         min-width: 300px;
//         margin: 0;
//         padding-left: 15px;
//         background-color: #fffeee;">                       
//         <ul style='list-style: none'>
//             ${itemHtml}
//         </ul>
//     </div>
//                 <div class="orderSummary" style="padding:15px;border-bottom:1px solid #868686">
//                     <div class="flex-sb">
//                         <p style="text-align:left;font-family:Metropolis Extra Bold;font-weight:bold">Products Subtotal: </p>
//                         <p style="text-align:right">$${Number(getSubTotal(cart)).toFixed(2)}${currency}</p>
//                     </div>
//                     <div class="flex-sb">
//                         <p style="text-align:left;font-family:Metropolis Extra Bold;font-weight:bold">Shipping:</p>
//                         <p style="text-align:right">$${Number(cartSubtotals.shipping).toFixed(2)}</p>
//                     </div>
//                     <div class="flex-sb">
//                         <p style="text-align:left;font-family:Metropolis Extra Bold;font-weight:bold">Taxes:</p>
//                         <p style="text-align:right">$${Number(cartSubtotals.taxes).toFixed(2)}</p>
//                     </div>
//                 </div>
//                 <div class="flex-sb" style="padding:15px">
//                     <h4 style="text-align:left;font-family:Metropolis Extra Bold;font-weight:bold">Total:</h4>
//                     <p style="text-align:right">$${Number(getTotal(cart, user)).toFixed(2)}${currency}</p>
//                 </div>
                
//                     </div>

//         </body>
//     </html>




// <li><div style="width: 660px; 
// height: 100px;
// border-radius: 3px;
// background-color: #fff;
// margin: 15px;">  
// <div style='font-size: 16px;
// font-family: 'Metropolis Extra Bold';'>${item.product_quantity}</div> 
// <div style='max-height: 100px;'>
//     <p><span style='font-size: 14px; font-weight: 600; max-width: 250px;'>${item.title} ${item.artist?',':''} ${item.artist}</span></p>
// </div>
// <div style='font-weight: 600;'>
//     <p>Product Total: ${(item.price*item.product_quantity).toFixed(2)}${currency}</p>
// </div>
// </div></li>