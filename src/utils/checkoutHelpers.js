import { getSubTotal } from './storeHelpers';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import SalesTax from 'sales-tax-cad';
export function selectCountry(val, user, setUser) {
    setUser({...user, shippingcountry: val, shippingregion: null});
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
export function shipping(shippingcountry) {
    if (!shippingcountry) return 'select country';
    switch (shippingcountry) {
        case 'Canada':
            return 8.00;
        case 'United States':
            return 12.00;
        case 'select country':
            return 'select country'
        default:
            return 15.00;
    }
}
export function tax(cart, shippingregion) {
    try {
        const tax = new SalesTax(
            getProvCode(shippingregion),
            getSubTotal(cart),
            2
        );
        return tax.sum().toFixed(2);
    } catch(e) {
        return 'select region';
    }       
}
export function getTotal(cart, user) {
    if (!user.shippingcountry || !user.shippingregion) return getSubTotal(cart);
    if (user.shippingcountry==="Canada") {
        return (Number(getSubTotal(cart)) + Number(shipping(user.shippingcountry)) + Number(tax(cart,user.shippingregion))).toFixed(2);
    } else {
        return (Number(getSubTotal(cart)) + Number(shipping(user.shippingcountry))).toFixed(2);
    }
    
}
export function selectRegion(val, user, setUser) {
    setUser({...user, shippingregion: val});
}
