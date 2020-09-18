import { getSubTotal } from './storeHelpers';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import SalesTax from 'sales-tax-cad';
export function selectCountry(val, user, setUser) {
    setUser({...user, country: val});
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
    }
}
export function shipping(user) {
    if (!user.country) return 'select country';
    switch (user.country) {
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
export function tax(cart, user) {
    try {
        const tax = new SalesTax(
            // getProvCode(user.state_prov),
            getProvCode(user.state_prov),
            getSubTotal(cart),
            2
        );
        return tax.sum().toFixed(2);
    } catch(e) {
        return 'select region';
    }       
}
export function getTotal(cart, user) {
    if (!user.country || !user.state_prov || getSubTotal(cart) === 0) return '---.--';
    return (Number(getSubTotal(cart)) + Number(shipping(user)) + Number(tax(cart,user))).toFixed(2);
}
export function selectRegion(val, user, setUser) {
    setUser({...user, state_prov: val});
}
