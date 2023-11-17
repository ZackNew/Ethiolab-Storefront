import gql from 'graphql-tag';
import { CartFragment } from '../../fragments';

export default gql`
 
mutation wQuote($msg: String!, 
                $subject: String!, 
                $fromEmail: String!, 
                $fromPhone: String!, 
                $location:String!, 
                $productDescr: String!, 
                $productIds: [String] = "[]",
                $isSpecial: Boolean! = false,
                $companyName: String!
                ){
  writeQuote(args:{
    msg:$msg,
    subject: $subject, 
    fromEmail: $fromEmail, 
    fromPhone: $fromPhone, 
    location: $location, 
    productDescr: $productDescr,
    productIds: $productIds  ,
    isSpecial: $isSpecial
    companyName: $companyName
  }){
    location,
    msg,
    id,
    subject,
    productDescr,
    isSpecial,
    companyName,
    
    forProducts{
      name
    }
  }
}
`;
