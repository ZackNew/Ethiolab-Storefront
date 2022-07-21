import { CustomQuery, Context, FactoryParams, sharedRef, Logger, configureFactoryParams, ComputedProperty, ComposableFunctionArgs } from '@vue-storefront/core';
import { Ref, computed } from '@vue/composition-api';
interface TestType{

}
export interface UseTestErrors {
    search: Error;
}
export interface TestSearchParams {
    
}
export interface UseTestFactoryParams<
    Test,
    Test_SEARCH_PARAMS,
    > extends FactoryParams {
    TestSearch: (context: Context, params: Test_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<Test>;
}

export interface UseTest<Test, Test_SEARCH_PARAMS> {
    getTest: ComputedProperty<Test>;
    search(params: ComposableFunctionArgs<Test_SEARCH_PARAMS>): Promise<void>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseTestErrors>;
}

export function useTestFactory<Test, Test_SEARCH_PARAMS = any>(
    factoryParams: UseTestFactoryParams<Test, Test_SEARCH_PARAMS>
) {
    return function useTest(): UseTest<Test, Test_SEARCH_PARAMS> {
        const Test: Ref<Test> = sharedRef({}, `useTest-Test`);
        const loading = sharedRef(false, `useTest-loading`);
        const error: Ref<UseTestErrors> = sharedRef({
            search: null
        }, `useTest-error`);

        const _factoryParams = configureFactoryParams(factoryParams);
        const search = async (searchParams) => {
            Logger.debug(`useTest/search`, searchParams);
            try {
                loading.value = true;
                Test.value = {msg: 'dsdsdsds'} as unknown as Test
                console.log('called')
                error.value.search = null;
            } catch (err) {
                error.value.search = err;
                Logger.error(`useTest/search`, err);
            } finally {
                loading.value = false;
            }
        };
        return {
            search,
            loading: computed(() => loading.value),
            getTest: computed(() => Test.value),
            error: computed(() => error.value)
        };
    };
}
