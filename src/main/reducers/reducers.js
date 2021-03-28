export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'size':
            return setOpenMenu({ sizeOpen: true, finishOpen: false })
        case 'finish':
            return setOpenMenu({ sizeOpen: false, finishOpen: true })
        default:
            throw new Error();
    }
}
export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'detail':
            return {
                openDetail: true,
                openContact: false,
                productSelect: action.product,
                opacity: .1
            }
        case 'contact':
            return {
                openDetail: false,
                openContact: true,
                productSelect: action.product,
                opacity: .1,
            }
        case 'initial':
            return {
                openDetail: false,
                openContact: false,
                productSelect: null,
                opacity: 1
            }
        }
}
export const onlineOrderReducer = (state, action) => {
    switch (action.type.toUpperCase()) {
        // case 'PICKUP':
        //     console.log('pickup')
        //     if (String(storesOrderedFrom).toUpperCase==="FINDAHARP"&&user.shippingcountry==="Pickup") {
        //         initShipping = 0;
        //         initTaxes = tax(cart, "Canada", "Alberta", currencyMultiplier);
        //     }
    
        //     if (String(storesOrderedFrom).toUpperCase==="HARPSETC"&&user.shippingcountry==="Pickup") {
        //         initShipping = 0;
        //         initTaxes = tax(cart,"United States","California",currencyMultiplier);
        //     }
        //     return { answer:'Pickup'};
        case 'Canada':
            return { answer:'Canada'};
        case 'United States':
            return { answer:'United States'};
        default:
            return { answer:'default'};
    }
}
export const resultInfoReducer = (state, action) => {
    switch (action.type) {
        case 'initial': 
            return {
                resultContainer: 'none',
                resultText: 'none',
                resultOkButton: 'none',
                resultTryAgainButton: 'none',
                tryAgainMarginLeft: '0',
                resultImg: 'none'
            }
        case 'loadingImage':
            return {
                resultContainer: 'block',
                resultText: 'none',
                resultOkButton: 'none',
                resultTryAgainButton: 'none',
                tryAgainMarginLeft: '0',
                resultImg: 'block'
            }
        case 'OK':
            return {
                resultContainer: 'block',
                resultText: 'block',
                resultOkButton: 'block',
                resultTryAgainButton: 'none',
                tryAgainMarginLeft: '0',
                resultImg: 'none'
            }
        case 'tryAgain':
            return {
                resultContainer: 'block',
                resultText: 'block',
                resultOkButton: 'none',
                resultTryAgainButton: 'block',
                tryAgainMarginLeft: '0',
                resultImg: 'none'
            }
        case 'okTryAgain':
            return {
                resultContainer: 'block',
                resultText: 'block',
                resultOkButton: 'block',
                resultTryAgainButton: 'block',
                tryAgainMarginLeft: '30px',
                resultImg: 'none'
            }
        }
}
export const activeWindowReducer = (state, action) => {
    switch (action.type) {
        case 'initial': 
            return {
                active: 'login',
                loginClasses: 'login-signup l-attop',
                signupClasses: 'login-signup s-atbottom'
            }
        case 'login':
            return {
                active: 'login',
                loginClasses: 'login-signup l-attop',
                signupClasses: 'login-signup s-atbottom'
            }
        case 'signup':
            return {
                active: 'signup',
                loginClasses: 'login-signup l-atbottom',
                signupClasses: 'login-signup s-attop'
            }
    }
}
export const harpactiveWindowReducer = (state, action) => {
    switch (action.type) {
        case 'initial': 
            return {
                active: 'harplogin',
                harploginClasses: 'harplogin-signup l-attop',
                harpsignupClasses: 'harplogin-signup s-atbottom'
            }
        case 'harplogin':
            return {
                active: 'harplogin',
                harploginClasses: 'harplogin-signup l-attop',
                harpsignupClasses: 'harplogin-signup s-atbottom'
            }
        case 'signup':
            return {
                active: 'harpsignup',
                harploginClasses: 'harplogin-signup l-atbottom',
                harpsignupClasses: 'harplogin-signup s-attop'
            }
    }
}
