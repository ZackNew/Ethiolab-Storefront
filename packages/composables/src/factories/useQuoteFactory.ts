import { ComposableFunctionArgs, ComputedProperty, useVSFContext } from "@vue-storefront/core";
import { Quote, writeQuoteParams } from "@vue-storefront/vendure-api/src/types";
import { ref } from "@vue/composition-api";
import { UseQuote } from "../composables/useQuote"

export function useQuoteFactory(){
    return function useQuote() : UseQuote{
        const context = useVSFContext();
        async function writeQuote(params: ComposableFunctionArgs<writeQuoteParams>): Promise<Quote | undefined>{
            console.log("WriteQuote=>", context.$vendure.api.writeQuote)
             const result =  await context.$vendure.api.writeQuote({...params});
            return result.data.writeQuote;
           
        }
        const myQuotes: ComputedProperty<Quote[]> = ref([])
        function deleteQuote(params: ComposableFunctionArgs<string>){}; 
        async function load(params: ComposableFunctionArgs<{email: string}>) {
           // context.$vendure.api.getQueryOf(id)
           console.log('Called load')
           const data= await context.$vendure.api.getQueryOf({...params})
           console.log('Load:: ', context.$vendure.api.getQueryOf, ' ', data.data?.getQueryOf )
          // myQuotes.value = data.data.getQueryOf;
        };
        return {
            load,
             myQuotes,
            deleteQuote,
            writeQuote,

        }
    }
}