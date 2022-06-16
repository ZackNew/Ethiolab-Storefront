import {Context} from '@vue-storefront/core';
import type {Cms} from '@vue-storefront/vendure-api';
import {CmsSearchParams, UseCms, useCmsFactory, UseCmsFactoryParams} from "../../factories/useCmsFactory";

const useCmsFactoryParams: UseCmsFactoryParams<Cms, CmsSearchParams> = {
    cmsSearch: async (context: Context, params: CmsSearchParams): Promise<Cms> => {
        const {...cmsSearchParams} = params;
        const cmsResponse = await context.$vendure.api.getCms(cmsSearchParams);
        return cmsResponse?.data?.cms;
    }
};

const useCms: (cacheId: string) => UseCms<Cms, CmsSearchParams> = useCmsFactory<Cms, CmsSearchParams>(useCmsFactoryParams);

export {
    useCms,
    useCmsFactoryParams
};
