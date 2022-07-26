import deleteQuoteMutation from './deleteQuoteMutation';
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import { CartCouponParams, Context, ProductVariant, RemoveCouponCodeResponse, writeQuoteResult } from '../../types';
import { NO_CACHE_FETCH_POLICY } from '../../helpers/constants';



type deleteQuoteParams = {id: string}

const deleteQuote = async (context: Context, params: deleteQuoteParams, customQuery?: CustomQuery): Promise<boolean> => {
  const deleteQuoteVars = {
    ...params
  };

  const { deleteQuoteRes } = context.extendQuery(
    customQuery, { deleteQuoteRes: { query: deleteQuoteMutation, variables:  deleteQuoteVars} }
  );

  const request = await context.client.mutate({
    mutation: gql`${deleteQuoteRes.query}`,
    variables: deleteQuoteRes.variables,
    fetchPolicy: NO_CACHE_FETCH_POLICY
  }) as boolean;

  return request;
};

export default deleteQuote;
