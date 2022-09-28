import {
  Context,
  useBillingFactory,
  UseBillingParams
} from '@vue-storefront/core';
import type { CreateAddressInput, Order, OrderAddress } from '@vue-storefront/vendure-api';
import { BILLING_TYPE } from '../../helpers';
import type {
  UseBillingAddParams as AddParams
} from '../../types';
import { useCart } from '../useCart';
// import { TransitionOrderToState } from '@vue-storefront/vendure-api';
const params: UseBillingParams<OrderAddress, AddParams> = {
  provide() { '@vue-storefront/vendure-api';
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    if (!context.cart?.cart?.value?.billingAddress) {
      await context.cart.load({ customQuery });
    }
    return context.cart.cart.value.billingAddress;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { params, billingDetails, customQuery }) => {
    console.log("billing incomming value are context" ,context, "params ", params, "customQuery", customQuery )

    // OrderAddress has one property optional which is required in CreateAddressInput.
    const response = await context.$vendure.api.updateAddressDetails({ input: billingDetails as CreateAddressInput, type: BILLING_TYPE }, customQuery);
    await context.$vendure.api.transitionOrderToState({state: "ArrangingPayment" });
    console.log("the response save billing is ", response);
    return (response?.data?.setOrderBillingAddress as Order)?.billingAddress;
  }
};

export const useBilling = useBillingFactory<OrderAddress, AddParams>(params);
