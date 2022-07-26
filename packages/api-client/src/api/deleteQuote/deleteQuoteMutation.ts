import gql from 'graphql-tag'


export default gql `
  mutation deleteQuote($id: ID!){
    deleteQuote(id: $id)
  }`;