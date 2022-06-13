import loginWithGoogleMutation from './loginWithGoogleMutation';
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import { Context, LoginParams, LoginResponse } from '../../types';
import { NO_CACHE_FETCH_POLICY } from '../../helpers';

const loginWithGoogle = async (context: Context, params: LoginParams, customQuery?: CustomQuery): Promise<LoginResponse> => {
  const loginVariables = {
    ...params
  };

  const { login } = context.extendQuery(
    customQuery, { login: { query: loginWithGoogleMutation, variables: loginVariables } }
  );

  const request = await context.client.mutate({
    mutation: gql`${login.query}`,
    variables: login.variables,
    fetchPolicy: NO_CACHE_FETCH_POLICY
  }) as LoginResponse;

  return request;
};

export default loginWithGoogle
