import writeQuoteMutation from './writeQuoteMutation';
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import { CartCouponParams, Context, ProductVariant, RemoveCouponCodeResponse, writeQuoteResult } from '../../types';
import { NO_CACHE_FETCH_POLICY } from '../../helpers/constants';



type writeQuoteParams = {msg: string, subject: string,fromEmail: string,fromPhone: string, location: string, productIds?: string, productDescr: string
   isSpecial?: boolean
}



const writeQuote = async (context: Context, params: writeQuoteParams, customQuery?: CustomQuery): Promise<writeQuoteResult> => {
  const removeCartCouponVariables = {
    ...params
  };
  console.log({params})

  const { removeCouponCode } = context.extendQuery(
    customQuery, { removeCouponCode: { query: writeQuoteMutation, variables: removeCartCouponVariables } }
  );

  const request = await context.client.mutate({
    mutation: gql`${removeCouponCode.query}`,
    variables: removeCouponCode.variables,
    fetchPolicy: NO_CACHE_FETCH_POLICY
  }) as writeQuoteResult;

  return request;
};

export default writeQuote;
