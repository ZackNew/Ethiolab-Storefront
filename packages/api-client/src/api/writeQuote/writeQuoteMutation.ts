import gql from 'graphql-tag';
import { CartFragment } from '../../fragments';

export default gql`
 
mutation wQuote($msg: String!, $subject: String!, $fromEmail: String!, $fromPhone: String!, $location:String!, $productDescr: String!, $productIds: String!){
  writeQuote(args:{msg:msg,
    subject: $subject, 
    fromEmail: $fromEmail, 
    fromPhone: $fromPhone, 
    location: $location, 
    productDescr: $prodcutDescr,
    productIds: $productIds  
  }){
    location,
    msg,
    id,
    subject,
    productDescr,
    forProducts{
      name
    }
  }
}
`;
