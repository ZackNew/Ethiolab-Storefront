import { ComposableFunctionArgs, ComputedProperty, useVSFContext } from "@vue-storefront/core";
import { Quote, writeQuoteParams } from "@vue-storefront/vendure-api/src/types";
import { ref } from "@vue/composition-api";
import { UseQuote } from "../composables/useQuote"

export function useQuoteFactory(){
    return function useQuote() : UseQuote{
        const context = useVSFContext();
        async function writeQuote(params: ComposableFunctionArgs<writeQuoteParams>): Promise<Quote | undefined>{
            const result =  await context.$vendure.api.writeQuote({...params});
            return result.data.writeQuote;
        }
        const myQuotes: ComputedProperty<Quote[]> = ref([])
        function deleteQuote(params: ComposableFunctionArgs<string>){}; 
        function load(){
          
           
        };
        return {
            load,
             myQuotes,
            deleteQuote,
            writeQuote,

        }
    }
}