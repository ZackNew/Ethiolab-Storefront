module.exports = {
  integrations: {
    vendure: {
      location: '@vue-storefront/vendure-api/server',
      configuration: {
        api: {
          uri: "http://localhost:3000/shop-api",
          // to be used later with authentication
          tokenMethod: process.env.TOKEN_METHOD
        }
      }
    }
  }
};
