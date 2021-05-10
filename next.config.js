const withCSS = require('@zeit/next-css')
module.exports = withCSS({cssModules: false});
module.exports = {
    env: {
        // next_env: 'development',
        next_env: 'production',
        backend: 'http://localhost:3000', // BREAKING
        // backend: 'https://findaharp-api-testing.herokuapp.com',
        // backend: 'https://findaharp-api-staging.herokuapp.com',
        // backend: 'https://findaharp-api.herokuapp.com',
        currencyconvert: 'adc394df1eed4e6c9c5980039d4b4f42',
        STRIPE_PUBLISHABLE_KEY: "pk_live_51H8sxyDhvslWjvSBmtaWd4SrOF5msXfMNSiy2QlXE9ei4rglmXwtlBO63zVKR9lJZuroHIrm80nn4jJO5O7Bovxk00U0rL2BK3"
    }
}

