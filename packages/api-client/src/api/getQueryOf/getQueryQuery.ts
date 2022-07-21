import gql from 'graphql-tag';

export default gql` query getQueryOf($email: String!){
    getQueryOf(email: $email)    {
      id,
      productDescr,
      #fromEmail,
      msg,
      subject,
      createdAt
    }
}`