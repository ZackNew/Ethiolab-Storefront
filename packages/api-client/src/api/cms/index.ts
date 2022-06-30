import gql from 'graphql-tag';
import cmsQuery from './cmsQuery';
import {CustomQuery} from '@vue-storefront/core';
import {Cms, CmsParams, cmsType, Context, GetCmsResponse, RequestDataStructure} from '../../types';
import {NO_CACHE_FETCH_POLICY} from '../../helpers';

const getCms = async (context: Context,params:CmsParams, customQuery?: CustomQuery): Promise<GetCmsResponse> => {
    const getCmsVariables = {type:params};
    const { getCms } = context.extendQuery(
        customQuery, { getCms: { query: cmsQuery, variables: getCmsVariables } }
    );
    return await context.client.query<RequestDataStructure<'getCms', Cms>>({
        query: gql`${getCms.query}`,
        variables: getCms.variables,
        fetchPolicy: NO_CACHE_FETCH_POLICY
    });

};

export default getCms;
