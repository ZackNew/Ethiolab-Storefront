import { CustomQuery } from '@vue-storefront/core';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';

import {
  Address,
  Cms, CmsParams,
  CreateAddressInput,
  CurrentUser,
  DeleteCustomerAddress,
  UpdateCustomerEmailAddressParams,
  UpdateCustomerInput
} from '.';
import { ActiveOrderResult, ApplyCouponCodeResult, CollectionList, CreateCustomerInput, Customer, NativeAuthenticationResult, Order, PaymentInput, PaymentMethodQuote, Product, RegisterCustomerAccountResult, RegisterCustomerInput, RemoveOrderItemsResult, SearchResponse, SetCustomerForOrderResult, ShippingMethodQuote, Success, UpdateAddressInput, UpdateOrderItemsResult, RequestPasswordResetResult, ResetPasswordResult } from './GraphQL';
import { AddToCartParams, CartCouponParams, CollectionParams, LoginParams, ProductParams, RemoveFromCartParams, SearchParams, SetShippingMethodParams, TransitionOrderToStateParams, UpdateAddressDetailsParams, UpdateCartParams, UpdateCustomerPasswordParams, RequestPasswordResetParams, ResetPasswordParams } from './types';
import cms from "../api/cms";

export type QueryResponse<K extends string, V> = ApolloQueryResult<Record<K, V>>;
export type MutationResponse<K extends string, V> = FetchResult<Record<K, V>>;
export type RequestDataStructure<K extends string, V> = Record<K, V>;

export type GetProductResponse = QueryResponse<'product', Product>;
export type GetCategoryResponse = QueryResponse<'collections', CollectionList>;
export type GetFacetResponse = QueryResponse<'search', SearchResponse>;
export type GetCartResponse = QueryResponse<'activeOrder', Order>;
export type GetActiveCustomerResponse = QueryResponse<'activeCustomer', Customer>;
export type GetShippingMethodsResponse = QueryResponse<'eligibleShippingMethods', ShippingMethodQuote[]>;
export type GetPaymentMethodsResponse = QueryResponse<'eligiblePaymentMethods', PaymentMethodQuote[]>;
export type GetMeResponse = QueryResponse<'me', CurrentUser>;
export type GetCmsResponse = QueryResponse<'getCms', Cms>;
export type AddToCartResponse = MutationResponse<'addItemToOrder', UpdateOrderItemsResult>;
export type RemoveFromCartResponse = MutationResponse<'removeOrderLine', RemoveOrderItemsResult>;
export type UpdateCartQuantityResponse = MutationResponse<'adjustOrderLine', UpdateOrderItemsResult>;
export type ApplyCouponCodeResponse = MutationResponse<'applyCouponCode', ApplyCouponCodeResult>;
export type RemoveCouponCodeResponse = MutationResponse<'removeCouponCode', Order>;
export type UpdateAddressDetailsResponse = MutationResponse<'setOrderShippingAddress' | 'setOrderBillingAddress', ActiveOrderResult>;
export type SetShippingMethodResponse = MutationResponse<'setOrderShippingMethod', Order>;
export type SetPaymentMethodResponse = MutationResponse<'addPaymentToOrder', Order>;
export type TransitionOrderToState = MutationResponse<'transitionOrderToState', Order>;
export type SetCustomerForOrderResponse = MutationResponse<'setCustomerForOrder', SetCustomerForOrderResult>;
export type RegisterCustomerAccountResponse = MutationResponse<'registerCustomerAccount', RegisterCustomerAccountResult>;
export type LoginResponse = MutationResponse<'login', NativeAuthenticationResult>;
export type LogoutResponse = MutationResponse<'logout', Success>;
export type UpdateCustomerPasswordResponse = MutationResponse<'updateCustomerPassword', Success>;
export type UpdateCustomerResponse = MutationResponse<'updateCustomer', Customer>;
export type CreateCustomerAddressResponse = MutationResponse<'createCustomerAddress', Address>;
export type UpdateCustomerAddressResponse = MutationResponse<'updateCustomerAddress', Address>;
export type DeleteCustomerAddressResponse = MutationResponse<'deleteCustomerAddress', Success>;
export type RequestPasswordResetResponse = MutationResponse<'requestPasswordReset', RequestPasswordResetResult>;
export type ResetPasswordResponse = MutationResponse<'resetPassword', ResetPasswordResult>;
export type UpdateCustomerEmailAddressResponse = MutationResponse<'updateCustomerEmailAddress', Success>;

export type Quote = {id: number, msg: string, subject: string,fromEmail: string,fromPhone: string, location: string, productIds:string, productDescr: string}
export type writeQuoteParams = {msg: string, subject: string,fromEmail: string,fromPhone: string, location: string, productIds: string, productDescr: string}
export type writeQuoteResult = MutationResponse<"writeQuote" ,Quote>
export type getQuotesResult = QueryResponse<'getQueryOf', Quote[]>
export type getQuotesOfParams = {email: string}

export interface VendureApiMethods 
{
  getQueryOf(params: getQuotesOfParams, customQuery?: CustomQuery): Promise<getQuotesResult>;
  writeQuote (params: writeQuoteParams, customQuery?: CustomQuery): Promise<writeQuoteResult>;


  getProduct(params: ProductParams, customQuery?: CustomQuery): Promise<GetProductResponse>;
  getFacet(params: SearchParams, customQuery?: CustomQuery): Promise<GetFacetResponse>;
  getCategory(params: CollectionParams, customQuery?: CustomQuery): Promise<GetCategoryResponse>;
  getCart(customQuery?: CustomQuery): Promise<GetCartResponse>;
  getMe(customQuery?: CustomQuery): Promise<GetMeResponse>;
  getCms(params:CmsParams, customQuery?: CustomQuery):Promise<GetCmsResponse>;
  getActiveCustomer(customQuery?: CustomQuery): Promise<GetActiveCustomerResponse>;
  getShippingMethods(customQuery?: CustomQuery): Promise<GetShippingMethodsResponse>;
  getPaymentMethods(customQuery?: CustomQuery): Promise<GetPaymentMethodsResponse>;
  addToCart(params: AddToCartParams, customQuery?: CustomQuery): Promise<AddToCartResponse>;
  removeFromCart(params: RemoveFromCartParams, customQuery?: CustomQuery): Promise<RemoveFromCartResponse>;
  updateCartQuantity(params: UpdateCartParams, customQuery?: CustomQuery): Promise<UpdateCartQuantityResponse>;
  applyCartCoupon(params: CartCouponParams, customQuery?: CustomQuery): Promise<ApplyCouponCodeResponse>;
  removeCartCoupon(params: CartCouponParams, customQuery?: CustomQuery): Promise<RemoveCouponCodeResponse>;
  updateAddressDetails(params: UpdateAddressDetailsParams, customQuery?: CustomQuery): Promise<UpdateAddressDetailsResponse>;
  setShippingMethod(params: SetShippingMethodParams, customQuery?: CustomQuery): Promise<SetShippingMethodResponse>;
  setPaymentMethod(params: PaymentInput, customQuery?: CustomQuery): Promise<SetPaymentMethodResponse>;
  transitionOrderToState(params: TransitionOrderToStateParams, customQuery?: CustomQuery): Promise<TransitionOrderToState>;
  setCustomerForOrder(params: CreateCustomerInput, customQuery?: CustomQuery): Promise<SetCustomerForOrderResponse>;
  registerCustomerAccount(params: RegisterCustomerInput, customQuery?: CustomQuery): Promise<RegisterCustomerAccountResponse>;
  login(params: LoginParams, customQuery?: CustomQuery): Promise<LoginResponse>;
  logout(customQuery?: CustomQuery): Promise<LogoutResponse>;
  updateCustomerPassword(params: UpdateCustomerPasswordParams, customQuery?: CustomQuery): Promise<UpdateCustomerPasswordResponse>;
  updateCustomer(params: UpdateCustomerInput, customQuery?: CustomQuery): Promise<UpdateCustomerResponse>;
  createCustomerAddress(params: CreateAddressInput, customQuery?: CustomQuery): Promise<CreateCustomerAddressResponse>;
  updateCustomerAddress(params: UpdateAddressInput, customQuery?: CustomQuery): Promise<UpdateCustomerAddressResponse>;
  deleteCustomerAddress(params: DeleteCustomerAddress, customQuery?: CustomQuery): Promise<DeleteCustomerAddressResponse>;
  requestPasswordReset(params: RequestPasswordResetParams, customQuery?: CustomQuery): Promise<RequestPasswordResetResponse>;
  resetPassword(params: ResetPasswordParams, customQuery?: CustomQuery): Promise<ResetPasswordResponse>;
  updateCustomerEmailAddress(params: UpdateCustomerEmailAddressParams, customQuery?: CustomQuery): Promise<UpdateCustomerEmailAddressResponse>;
  getRelatedProducts(params: SearchParams, customQuery?: CustomQuery): Promise<GetFacetResponse>;
}
