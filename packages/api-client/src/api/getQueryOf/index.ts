import gql from 'graphql-tag';
import getQueryQuery from './getQueryQuery';
import { CustomQuery } from '@vue-storefront/core';
import { Context, RequestDataStructure, GetCartResponse, Order } from '../../types';
import { NO_CACHE_FETCH_POLICY } from '../../helpers/constants';

type getQuotesOfParams = {email: String}
const getQueryOf = async (context: Context, params: getQuotesOfParams,customQuery?: CustomQuery): Promise<GetCartResponse> => {
  
  const { getQuote } = context.extendQuery(
    customQuery, { getQuote: { query: getQueryQuery, variables: {...params} } }
  );

  const request = await context.client.query({
    query: gql`${getQuote.query}`,
    variables: getQuote.variables,
    fetchPolicy: NO_CACHE_FETCH_POLICY
  });
  return request;

};

export default getQueryOf;
