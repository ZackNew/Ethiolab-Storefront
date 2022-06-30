import { CustomQuery, Context, FactoryParams, sharedRef, Logger, configureFactoryParams, ComputedProperty, ComposableFunctionArgs } from '@vue-storefront/core';
import { Ref, computed } from '@vue/composition-api';
import {cmsType} from "@vue-storefront/vendure-api";
export interface UseCmsErrors {
    search: Error;
}
export interface CmsSearchParams {
    type:cmsType
}
export interface UseCmsFactoryParams<
    CMS,
    CMS_SEARCH_PARAMS,
    > extends FactoryParams {
    cmsSearch: (context: Context, params: CMS_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<CMS>;
}

export interface UseCms<CMS, CMS_SEARCH_PARAMS> {
    getCms: ComputedProperty<CMS>;
    search(params: ComposableFunctionArgs<CMS_SEARCH_PARAMS>): Promise<void>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseCmsErrors>;
}

export function useCmsFactory<CMS, CMS_SEARCH_PARAMS = any>(
    factoryParams: UseCmsFactoryParams<CMS, CMS_SEARCH_PARAMS>
) {
    return function useCms(): UseCms<CMS, CMS_SEARCH_PARAMS> {
        const cms: Ref<CMS> = sharedRef({}, `useCms-cms`);
        const loading = sharedRef(false, `useCms-loading`);
        const error: Ref<UseCmsErrors> = sharedRef({
            search: null
        }, `useCms-error`);

        const _factoryParams = configureFactoryParams(factoryParams);
        const search = async (searchParams) => {
            Logger.debug(`useCms/search`, searchParams);
            try {
                loading.value = true;
                cms.value = await _factoryParams.cmsSearch(searchParams);
                error.value.search = null;
            } catch (err) {
                error.value.search = err;
                Logger.error(`useCms/search`, err);
            } finally {
                loading.value = false;
            }
        };
        return {
            search,
            loading: computed(() => loading.value),
            getCms: computed(() => cms.value),
            error: computed(() => error.value)
        };
    };
}
