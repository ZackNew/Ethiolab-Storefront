import { Context } from '@nuxt/types';
import { Order } from '@vue-storefront/vendure';
import { ARRANGING_PAYMENT } from './constants';

export const canEnterThankYou = (context: Context): boolean =>
  Boolean(context.route.query?.order);

export const canEnterShipping = (cart: Order): boolean =>
  Boolean(cart?.customer);

export const canEnterBilling = (cart: Order): boolean =>
  Boolean(cart?.shippingAddress?.city);

export const canEnterPayment = (cart: Order): boolean =>
  Boolean(canEnterShipping(cart) && canEnterBilling(cart));

export enum CheckoutSteps {
  Shipping = 'shipping',
  Billing = 'billing',
  Payment = 'payment',
  ThankYou = 'thank-you',
}
