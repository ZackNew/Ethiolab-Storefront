import gql from 'graphql-tag';
import getQueryQuery from './getQueryQuery';
import { CustomQuery } from '@vue-storefront/core';
import { Context, RequestDataStructure, GetCartResponse, Order } from '../../types';
import { NO_CACHE_FETCH_POLICY } from '../../helpers/constants';

type getQuotesOfParams = {id: String}
const getCart = async (context: Context, params: getQuotesOfParams,customQuery?: CustomQuery): Promise<GetCartResponse> => {
  const getQuoteVars = {};

  const { getQuote } = context.extendQuery(
    customQuery, { activeOrder: { query: getQueryQuery, variables: getQuoteVars } }
  );

  const request = await context.client.query({
    query: gql`${getQuote.query}`,
    variables: getQuote.variables,
    fetchPolicy: NO_CACHE_FETCH_POLICY
  });
  return request;

};

export default getCart;
