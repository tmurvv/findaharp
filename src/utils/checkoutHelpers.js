import uuid from 'react-uuid';
import { getSubTotal } from './storeHelpers';
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
export function shipping(shippingcountry, store) {
    if (!shippingcountry) return 0.00;
    if (store&&store==="harpsetc") return shippingcountry==='United States'?SHIPPING_CALCULATIONS.harpsetc:-1;
    switch (shippingcountry) {
        case 'Canada':
            return SHIPPING_CALCULATIONS.Canada;
        // included for testing
        case 'Antarctica':
            return 0.00;
        case 'Pickup':
            return 0.00;
        case 'select country':
            return 'select country'
        default:
            return SHIPPING_CALCULATIONS.default;
    }
}
export function tax(cart, shippingcountry, shippingregion, currencyMultiplier) {
    if (!shippingregion) return 0.00;
    switch(shippingcountry) {
        case "Canada": 
            try {
                const tax = new SalesTax(
                    getProvCode(shippingregion),
                    getSubTotal(cart)*currencyMultiplier,
                    2
                );
                return tax.sum().toFixed(2);
            } catch(e) {
                return 'select region';
            } 
            break;
        case "United States":
            if (shippingregion==='California') return (8.25).toFixed(2);
            break;
        default :
            return 0;
    }
          
}
export function getTotal(cart, user, currencyMultiplier) {
    const subTotal = getSubTotal(cart);
    // if international order, shipping is marked -1, this adds it back in to total
    const addOneInternational = user.shippingcountry&&user.shippingcountry!=='United States'&&user.shippingcountry!=="Canada"?1:0;
    if (!subTotal || subTotal===0) return 0.00;
    if (!user.currency) return subTotal;
    if (user.currency==="CAD") {
        return (Number(subTotal)*currencyMultiplier + Number(shipping(user.shippingcountry,cart[0].store)) + Number(tax(cart,user.shippingcountry,user.shippingregion,currencyMultiplier))).toFixed(2);
    } else {
        return (Number(getSubTotal(cart)) + Number(shipping(user.shippingcountry,cart[0].store)) + Number(addOneInternational)).toFixed(2);
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