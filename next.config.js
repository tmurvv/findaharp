const withCSS = require('@zeit/next-css')
module.exports = withCSS({cssModules: false});
module.exports = {
    env: {
        // next_env: 'development',
        next_env: 'production',
        // backend: 'http://localhost:3000',
        // backend: 'https://findaharp-api-testing.herokuapp.com',
        // backend: 'https://findaharp-api-staging.herokuapp.com',
        backend: 'https://findaharp-api.herokuapp.com',
        STRIPE_PUBLISHABLE_KEY: "pk_test_51H8sxyDhvslWjvSBFfpC1cYhtNQPohoFP9ozVTxgKh7kLCjQsImSvkZBl8XWrtJ9mLatyz4DML18sOEXMobpoq4100OPnmSX1Z"
    }
};
