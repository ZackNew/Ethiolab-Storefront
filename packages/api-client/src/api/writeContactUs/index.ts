     import gql from 'graphql-tag';


         import { CustomQuery } from '@vue-storefront/core';
   
         import { CartCouponParams, Context, ProductVariant, RemoveCouponCodeResponse, writeContactUsParams, writeContactUsParamsResult } from '../../types';
         import { NO_CACHE_FETCH_POLICY } from '../../helpers/constants';
         
         const mutation = gql`
      
         mutation sendMessage($phone_number: String!,$first_name: String!, $last_name: String!, $message: String!, $email:String!){
            writeContactUsMessage(message: {email: $email, firstName: $first_name, 
                          lastName: $last_name, phoneNumber: $phone_number, message: $message}){id}
         }`

         
         type writeContactUsParams = {msg: string, subject: string,fromEmail: string,fromPhone: string, location: string, productIds: string, productDescr: string}
         
         const writeQuote = async (context: Context, params: writeContactUsParams, customQuery?: CustomQuery): Promise<writeContactUsParamsResult> => {
           const removeCartCouponVariables = {
             ...params
           };
         
           const { removeCouponCode } = context.extendQuery(
             customQuery, { removeCouponCode: { query: mutation, variables: removeCartCouponVariables } }
           );
         
           const request = await context.client.mutate({
             mutation: gql`${removeCouponCode.query}`,
             variables: removeCouponCode.variables,
             fetchPolicy: NO_CACHE_FETCH_POLICY
           }) as writeQuoteResult;
         
           return request;
         };
         
         export default writeQuote;
         
