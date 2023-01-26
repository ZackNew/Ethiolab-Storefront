import {
  ComposableFunctionArgs,
  ComputedProperty,
  sharedRef,
  useVSFContext,
} from '@vue-storefront/core';
import { Quote, writeQuoteParams } from '@vue-storefront/vendure-api/src/types';
import { Ref, ref } from '@vue/composition-api';
import { UseQuote } from '../composables/useQuote';
import { DeleteQuoteParams } from '../types';
export function useQuoteFactory() {
  return function useQuote(): UseQuote {
    const context = useVSFContext();
    async function writeQuote(
      params: ComposableFunctionArgs<writeQuoteParams>
    ): Promise<Quote | undefined> {
      const result = await context.$vendure.api.writeQuote({ ...params });
      return result.data.writeQuote;
    }
    const myQuotes: Ref<Quote[]> = sharedRef([], 'myQuotes');
    async function deleteQuote(
      params: ComposableFunctionArgs<DeleteQuoteParams>
    ) {
      context.$vendure.api.deleteQuote({ ...params });
    }
    async function load(params: ComposableFunctionArgs<{ email: string }>) {
      const data = await context.$vendure.api.getQueryOf({ ...params });
      myQuotes.value = data.data.getQueryOf;
      // myQuotes.value = data.data.getQueryOf;
    }
    return {
      load,
      myQuotes,
      deleteQuote,
      writeQuote,
    };
  };
}
