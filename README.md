
### Requirements

- NodeJS v14 or later
- Vendure server running in localhost for GraphQL API or <https://demo.vendure.io/shop-api>
- Set up auth options in Vendure server (This functionality is available for those who scaffold a local instance of Vendure)

```ts
// vendure-config.ts
...
  authOptions: {
    tokenMethod: 'bearer', // authorization header method
    requireVerification: false, // disable register by email verification
  },
```
