// NODE_TLS_REJECT_UNAUTHORIZED=0
module.exports = {
  integrations: {
    vendure: {
      location: '@vue-storefront/vendure-api/server',
      configuration: {
        api: {
          // uri: "http://localhost:3000/shop-api",
          // uri: "http://196.188.235.247:3000/shop-api",
          uri: "http://10.10.20.55:3000/shop-api",
          // to be used later with authentication
          tokenMethod: process.env.TOKEN_METHOD
        }
      }
    }
  }
};

