import {Context} from "@vue-storefront/core";
import {cmsType} from "@vue-storefront/vendure-api";
import {
    ComposableFunctionArgs,
    ComputedProperty,
} from "@vue-storefront/core/lib/src/types";
export interface UseCmsErrors {
    search: Error;
}
export interface UseCms<CMS, CMS_SEARCH_PARAMS> {
    cms: ComputedProperty<CMS>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseCmsErrors>;
    search(params: ComposableFunctionArgs<CMS_SEARCH_PARAMS>): Promise<void>;
}
export interface CmsSearchParams {
  type:cmsType
}
export interface UseCmsFactoryParams<CMS, CMS_SEARCH_PARAMS extends CmsSearchParams>{
    cmsSearch: (context: Context, params: CMS_SEARCH_PARAMS) => Promise<CMS>;
}


// @ts-ignore
export function useCmsFactory<CMS, CMS_SEARCH_PARAMS>(factoryParams: UseCmsFactoryParams<CMS, CMS_SEARCH_PARAMS>): (id: string) => UseCms<CMS, CMS_SEARCH_PARAMS>{

}
