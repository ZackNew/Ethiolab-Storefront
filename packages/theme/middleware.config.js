process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = {
  integrations: {
    vendure: {
      location: '@vue-storefront/vendure-api/server',
      configuration: {
        api: {
          uri: process.env.GRAPHQL_API,

          // to be used later with authentication
          tokenMethod: process.env.TOKEN_METHOD,
        },
      },
    },
  },
};
