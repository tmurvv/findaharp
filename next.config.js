const withCSS = require('@zeit/next-css')
module.exports = withCSS({cssModules: false});
module.exports = {
    env: {
        // next_env: 'development',
        next_env: 'production',
        // backend: 'http://localhost:3000', // BREAKINk
        // backend: 'https://findaharp-api-testing.herokuapp.com',
        // backend: 'https://findaharp-api-staging.herokuapp.com',
        backend: 'https://findaharp-api.herokuapp.com',
        STRIPE_PUBLISHABLE_KEY: "pk_live_51H8sxyDhvslWjvSBmtaWd4SrOF5msXfMNSiy2QlXE9ei4rglmXwtlBO63zVKR9lJZuroHIrm80nn4jJO5O7Bovxk00U0rL2BK3"
    }
}

