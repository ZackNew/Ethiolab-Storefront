import gql from 'graphql-tag';


import { CustomQuery } from '@vue-storefront/core';

import { CartCouponParams, Context, ProductVariant, RemoveCouponCodeResponse, writeInstantMessageParams, writeInstantMessageResult} from '../../types';
import { NO_CACHE_FETCH_POLICY } from '../../helpers/constants';

const mutation = gql`

mutation($msg: String!, $firstName: String!, $lastName: String!, $userEmail: String!){
    writeInstantMessage(msg: $msg, 
      firstName: $firstName, lastName: $lastName
      ,userEmail: $userEmail,
      isFromAdmin: false
     ){
      id
    }
  }`




const writeQuote = async (context: Context, params: writeInstantMessageParams, customQuery?: CustomQuery): Promise<writeInstantMessageResult> => {
  const removeCartCouponVariables = {
    ...params
  };
  // console.log('Called to calle')
  const { removeCouponCode } = context.extendQuery(
    customQuery, { removeCouponCode: { query: mutation, variables: removeCartCouponVariables } }
  );

  const request = await context.client.mutate({
    mutation: gql`${removeCouponCode.query}`,
    variables: removeCouponCode.variables,
    fetchPolicy: NO_CACHE_FETCH_POLICY
  }) as writeInstantMessageResult;

  return request;
};

export default writeQuote;
