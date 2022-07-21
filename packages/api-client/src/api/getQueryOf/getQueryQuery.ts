import gql from 'graphql-tag';

export default gql` query getQuotesOf($email: String!){
    getQueryOf(email: $email)    {
      id,
      productDescr,
      #fromEmail,
      msg,
      subject,
      createdAt
    }
}`