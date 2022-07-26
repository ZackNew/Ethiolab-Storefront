import {Context} from '@vue-storefront/core';

interface Test{

}
import {TestSearchParams, UseTest, useTestFactory, UseTestFactoryParams} from "../../factories/useTestFactory";
const useTestFactoryParams: UseTestFactoryParams<Test, TestSearchParams> = {
    TestSearch: async (context: Context, params: TestSearchParams): Promise<Test> => {
        const TestResponse = await context.$vendure.api.writeQuote
        ({msg: 'SDSDDS', subject: 'dsdsd', fromEmail:'dsds', fromPhone: '091270', productDescr:'dsdsdsd', productIds: "[12]", location:'assos'});
        return TestResponse?.data;
    }
};

const useTest: () => UseTest<Test, TestSearchParams> = useTestFactory<Test, TestSearchParams>(useTestFactoryParams);

export {
    useTest,
    useTestFactoryParams
};
