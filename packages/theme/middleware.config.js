module.exports = {
  integrations: {
    vendure: {
      location: '@vue-storefront/vendure-api/server',
      configuration: {
        api: {
          uri: "http://10.10.20.55/shop-api",
          // to be used later with authentication
          tokenMethod: process.env.TOKEN_METHOD
        }
      }
    }
  }
};
