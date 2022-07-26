
import { ComposableFunctionArgs, ComputedProperty, CustomQuery, FactoryParams } from "@vue-storefront/core";
import { Context, Quote, writeQuoteParams, writeQuoteResult } from "@vue-storefront/vendure-api/src/types";
import { useQuoteFactory } from "../../factories/useQuoteFactory";

import {DeleteQuoteParams} from '../../types/'


export interface UseQuote{
    writeQuote(params: ComposableFunctionArgs<writeQuoteParams>): Promise<Quote>;
    myQuotes: ComputedProperty<Quote[]>;
    deleteQuote(params: ComposableFunctionArgs<DeleteQuoteParams>); //the string is the id of the quote
    load(params: {email: string});
}

const useQuote: ()=>UseQuote = useQuoteFactory();

export {useQuote, useQuoteFactory}