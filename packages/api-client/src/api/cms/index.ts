import gql from 'graphql-tag';
import cmsQuery from './cmsQuery';
import {CustomQuery} from '@vue-storefront/core';
import {Cms, cmsType, Context, GetCmsResponse, RequestDataStructure} from '../../types';
import {NO_CACHE_FETCH_POLICY} from '../../helpers';

const getCms = async (context: Context, customQuery?: CustomQuery): Promise<GetCmsResponse> => {
    const getCmsVariables = {type:cmsType};
    const { getCms } = context.extendQuery(
        customQuery, { getCms: { query: cmsQuery, variables: getCmsVariables } }
    );
    return await context.client.query<RequestDataStructure<'cms', Cms>>({
        query: gql`${getCms.query}`,
        variables: getCms.variables,
        fetchPolicy: NO_CACHE_FETCH_POLICY
    });

};

export default getCms;
