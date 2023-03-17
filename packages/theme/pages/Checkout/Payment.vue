<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <div v-if="!canPay" class="flex">
          <img src="/info.png" alt="info icon" height="50" width="50" />
          <div class="bg-white text-lg m-4 p-4 font-bold rounded-lg">
            <p>
              This order contains order based product. You are allowed to pay
              once the admin update the order status.
            </p>
          </div>
        </div>

        <SfHeading
          :level="3"
          :title="$t('Payment')"
          class="sf-heading--left sf-heading--no-underline title"
        />

        <SfTable class="sf-table--bordered table desktop-only">
          <SfTableHeading class="table__row">
            <SfTableHeader class="table__header table__image">{{
              $t('Item')
            }}</SfTableHeader>
            <SfTableHeader
              v-for="tableHeader in tableHeaders"
              :key="tableHeader"
              class="table__header"
              :class="{ table__description: tableHeader === 'Description' }"
            >
              {{ tableHeader }}
            </SfTableHeader>
          </SfTableHeading>
          <SfTableRow
            v-for="(product, index) in products"
            :key="index"
            class="table__row"
          >
            <SfTableData class="table__image">
              <SfImage
                :src="cartGetters.getItemImage(product)"
                :alt="cartGetters.getItemName(product)"
              />
            </SfTableData>
            <SfTableData class="table__data table__description table__data">
              <div class="product-title">
                {{ cartGetters.getItemName(product) }}
              </div>
              <div class="product-sku">
                {{ cartGetters.getItemSku(product) }}
              </div>
              <SfProperty
                v-for="(attribute, key) in cartGetters.getItemOptions(product)"
                :key="key"
                :name="attribute.label"
                :value="attribute.value"
              />
            </SfTableData>
            <SfTableData class="table__data">{{
              cartGetters.getItemQty(product)
            }}</SfTableData>
            <SfTableData class="table__data price">
              <SfPrice
                :regular="
                  cartGetters.getItemPrice(product).regular.toLocaleString() +
                  ' ETB'
                "
                class="product-price"
              />
            </SfTableData>
          </SfTableRow>
        </SfTable>
        <div class="summary">
          <div class="summary__group">
            <div class="summary__total">
              <SfProperty
                :name="$t('Subtotal')"
                :value="parseFloat(totals.subtotal).toLocaleString() + ' ETB'"
                class="sf-property--full-width property"
              />
              <SfProperty
                :name="$t('Standard Tax')"
                :value="standardTax.toLocaleString() + ' ETB'"
                class="sf-property--full-width property"
              />
              <SfProperty
                :name="$t('Withholding Tax')"
                :value="
                  parseFloat(totals.withholding).toLocaleString() + ' ETB'
                "
                class="sf-property--full-width property"
              />
            </div>

            <SfDivider />

            <SfProperty
              :name="$t('Price With Tax')"
              :value="parseFloat(totals.total).toLocaleString() + ' ETB'"
              class="sf-property--full-width sf-property--large summary__property-total"
            />

            <div v-if="canPay">
              <VsfPaymentProvider
                @paymentMethodSelected="updatePaymentMethod"
              />

              <SfCheckbox
                v-e2e="'terms'"
                v-model="terms"
                name="terms"
                class="summary__terms"
              >
                <template #label>
                  <div class="sf-checkbox__label">
                    {{ $t('I agree to') }}
                    <SfLink href="/policy/terms-and-conditions">
                      {{ $t('Terms and conditions') }}</SfLink
                    >
                  </div>
                </template>
              </SfCheckbox>
            </div>

            <div class="summary__action">
              <SfButton
                type="button"
                class="sf-button bg-secondary summary__back-button"
                @click="$router.push('/checkout/billing')"
              >
                {{ $t('Go back') }}
              </SfButton>
              <!-- <button v-on:click="sendData">
            Click me
          </button> -->

              <div
                v-if="paymentMethod && paymentMethod.name == 'Cybersource'"
                class="cyberForm"
              >
                <form
                  id="payment_confirmation"
                  action="https://testsecureacceptance.cybersource.com/pay"
                  target="_blank"
                  method="post"
                >
                  <input
                    id="access_key"
                    type="hidden"
                    name="access_key"
                    v-model="paymentDetail.access_key"
                  />
                  <input
                    id="profile_id"
                    type="hidden"
                    name="profile_id"
                    v-model="paymentDetail.profile_id"
                  />
                  <input
                    id="transaction_uuid"
                    type="hidden"
                    name="transaction_uuid"
                    v-model="paymentDetail.transaction_uuid"
                  />
                  <input
                    id="signed_field_names"
                    type="hidden"
                    name="signed_field_names"
                    v-model="paymentDetail.signed_field_names"
                  />
                  <input
                    id="unsigned_field_names"
                    type="hidden"
                    name="unsigned_field_names"
                    v-model="paymentDetail.unsigned_field_names"
                  />
                  <input
                    id="signed_date_time"
                    type="hidden"
                    name="signed_date_time"
                    v-model="paymentDetail.signed_date_time"
                  />
                  <input
                    id="locale"
                    type="hidden"
                    name="locale"
                    v-model="paymentDetail.locale"
                  />
                  <input
                    id="transaction_type"
                    type="hidden"
                    name="transaction_type"
                    v-model="paymentDetail.transaction_type"
                  />
                  <input
                    id="reference_number"
                    type="hidden"
                    name="reference_number"
                    v-model="paymentDetail.reference_number"
                  />
                  <input
                    id="amount"
                    type="hidden"
                    name="amount"
                    v-model.lazy="paymentDetail.amount"
                  />
                  <input
                    id="currency"
                    type="hidden"
                    name="currency"
                    v-model="paymentDetail.currency"
                  />
                  <input
                    id="signature"
                    type="hidden"
                    name="signature"
                    v-model="paymentDetail.signature"
                  />

                  <input
                    @click="cashComplete"
                    type="submit"
                    id="submit"
                    name="submit"
                    value="PAY WITH CYBERSOURCE"
                    class="box-border relative flex h-12 pl-4 pr-4 align-center justify-center text-white bg-primary delay-75 bg-center uppercase cursor-pointer font-bold rounded-lg"
                  />
                </form>
              </div>

              <div v-if="paymentMethod && paymentMethod.name == 'Telebirr'">
                <SfButton
                  v-e2e="'make-an-order'"
                  :disabled="!paymentMethod"
                  class="summary__action-button"
                  @click="processTelebirr"
                >
                  {{ $t('Pay with Telebirr') }}
                </SfButton>
              </div>

              <div v-if="paymentMethod && paymentMethod.name == 'Cash'">
                <SfModal title="My title" visible :persistent="false">
                  <div class="relative h-full max-w-md md:h-auto -m-4">
                    <div
                      class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                    >
                      <button
                        type="button"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="popup-modal"
                        @click="handleModalCashOpen"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <!-- <span class="sr-only">Close modal</span> -->
                      </button>
                      <div class="p-6 text-center">
                        <img
                          class="m-auto"
                          src="https://res.cloudinary.com/dh6muae8v/image/upload/v1666180438/cash2-removebg-preview_e2wbqm.png"
                          alt="image here"
                          width="100"
                          height="100"
                        />

                        <h3
                          class="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400"
                        >
                          Cash Payment
                        </h3>
                        <div v-if="CBE.length > 0">
                          <p>
                            Dear customer, you can complete your order by
                            directly depositing to one of the accounts below:
                          </p>
                          <ul v-for="bank in CBE" :key="bank">
                            <li>
                              {{ bank.split(',')[0] }} {{ bank.split(',')[1] }}
                            </li>
                          </ul>
                          <p>
                            Please write the order ID #{{ cart.code }} in
                            'Reason for payment' and contact the admin
                            {{ phoneNumber }} for further instructions.
                          </p>
                        </div>
                      </div>
                      <div class="flex justify-around">
                        <button
                          @click="cashComplete"
                          class="my-4 rounded bg-secondary text-bold text-white px-3 py-2"
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  </div>
                </SfModal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="checkout__aside desktop-only">
        <transition name="fade">
          <CartPreview key="order-summary" />
        </transition>
        <div class="highlighted promo-code">
          <SfInput
            v-model="promoCode"
            name="promoCode"
            :label="$t('Enter promo code')"
            class="sf-input--filled promo-code__input"
          />
          <SfButton class="promo-code__button" @click="applyPromoCode">{{
            $t('Apply')
          }}</SfButton>
        </div>

        <div>
          <SfButton
            class="w-full mt-10 bg-secondary"
            @click="handleModalOpen"
            >{{ $t('Cancel Order') }}</SfButton
          >
        </div>
      </div>
      <div>
        <div v-if="modalOpen">
          <SfModal title="My title" visible :persistent="false">
            <div class="relative w-full h-full max-w-md md:h-auto">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="popup-modal"
                  @click="handleModalOpen"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <!-- <span class="sr-only">Close modal</span> -->
                </button>
                <div class="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3
                    class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                  >
                    Are you sure you want to cancel this order?
                  </h3>
                  <button
                    @click="handleCancelOrder(cookieToken)"
                    data-modal-toggle="popup-modal"
                    type="button"
                    class="text-white bg-red hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-toggle="popup-modal"
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    @click="handleModalOpen"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </SfModal>
        </div>
      </div>

      <!-- <div>
        <div v-if="modalCashOpen">
          <SfModal title="My title" visible :persistent="false">
            <div class="relative h-full max-w-md md:h-auto -mr-4">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="popup-modal"
                  @click="handleModalCashOpen"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div class="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3
                    class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                  >
                    Cash Payment
                  </h3>
                </div>
              </div>
            </div>
          </SfModal>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfDivider,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion,
  SfLink,
  SfInput,
  SfModal,
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { ref, computed, onMounted, onBeforeMount } from '@vue/composition-api';
import {
  useMakeOrder,
  useCart,
  cartGetters,
  usePayment,
} from '@vue-storefront/vendure';
import {
  useBilling,
  useShipping,
  useUserBilling,
} from '@vue-storefront/vendure';
import { uuid } from 'vue-uuid';
import * as crypto from 'crypto';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import axios from 'axios';
import Vue from 'vue';
// import VueAxios from 'vue-axios';
import {
  mapAddressFormToOrderAddress,
  COUNTRIES,
  getDefaultAddress,
  mapAddressToAddressForm,
} from '~/helpers';
import NodeRSA from 'node-rsa';
import CartPreview from '~/components/Checkout/CartPreview.vue';

// Vue.use(VueAxios, axios);

export default {
  name: 'ReviewOrder',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfDivider,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion,
    SfLink,
    SfInput,
    SfModal,
    VsfPaymentProvider: () =>
      import('~/components/Checkout/VsfPaymentProvider'),
    CartPreview,
  },
  data() {
    return {
      cookieToken: '',
    };
  },
  created() {
    this.cookieToken = this.$cookies.get('etech-auth-token');
  },
  computed: {
    phoneNumber() {
      return this.$store.state.companyDetails.companyInformation?.phone_number?.split(
        ';'
      )[0];
    },
    CBE() {
      return this.$store.state.companyDetails.companyInformation?.commercial_bank.split(
        ';'
      );
    },
  },

  methods: {
    // async handleCancelOrder  () {
    //   const body = {
    //     query: `mutation cancelOrder {
    //       cancelMyOrder{
    //               success
    //             }
    //           }`,
    //     variables: {
    //       orderCode: cart?.value?.code,
    //     },
    //   };
    //   const token = this.$cookies.get('etech-auth-token');
    //   const options = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       authorization: `Bearer ${token}`,
    //     },
    //   };
    //   let baseUrl = process.env.GRAPHQL_API;
    //   const acat = await axios
    //     .post(baseUrl, body, options)
    //     .then(async (res) => {
    //       setCart();
    //       modalOpen.value = false;
    //       // this.$router.push('/');
    //       window.location.href = "/"
    //     })
    //     .catch((err) => {});
    // }
  },
  setup(props, { root }) {
    const { load: loadBilling, save, billing } = useBilling();
    const { cart, load, setCart, applyCoupon } = useCart();
    const billingDetails = ref(billing.value || {});
    const { loading } = useMakeOrder();
    const { set } = usePayment();

    const canPay = computed(
      () => cart?.value?.customFields?.allow_customer_payment
    );

    const terms = ref(false);
    const paymentMethod = ref(null);
    const modalOpen = ref(false);
    const modalCashOpen = ref(false);

    let time = new Date().getTime();

    let sign = ref('');
    let paymentDetail = {};
    let SECRET_KEY = '';
    let url = '';
    const promoCode = ref('');

    const handleModalOpen = () => {
      let temp = modalOpen.value;
      modalOpen.value = !temp;

      // if(modalOpen){
      //   modalOpen.value = false
      // }
      // else {
      //   modalOpen.value = true
      // }
    };

    const handleModalCashOpen = () => {
      paymentMethod.value = null;
      let temp = modalCashOpen.value;
      modalCashOpen.value = !temp;
      paymentMethod.value = null;
      if (modalOpen) {
        modalOpen.value = false;
      } else {
        modalOpen.value = true;
      }
    };

    const standardTax = computed(() => {
      let tax = 0;
      let totalWithTax = 0;
      cart.value?.lines.forEach((line) => {
        totalWithTax = totalWithTax + line.quantity * line.unitPriceWithTax;
      });
      tax = totalWithTax - cart.value?.subTotal;
      return tax / 100;
    });

    const totals = computed(() => {
      return {
        subtotal:
          String(cart.value?.subTotal).slice(0, -2) +
          '.' +
          String(cart.value?.subTotal).slice(-2),
        withholding:
          String(cart.value?.witholdingTax).slice(0, -2) +
          '.' +
          String(cart.value?.witholdingTax).slice(-2),
        total:
          String(cart.value?.subTotalWithTax).slice(0, -2) +
          '.' +
          String(cart.value?.subTotalWithTax).slice(-2),
      };
    });

    onSSR(async () => {
      await load({ customQuery: { activeOrder: 'get-cart-custom-query' } });
    });

    onMounted(() => {});

    onBeforeMount(async () => {
      url = 'https://testsecureacceptance.cybersource.com/pay';
      SECRET_KEY =
        'c03b7b8aa22c4bc8b2760c31d915bafd5b1c0c08d87340bfbf2e73931d4b066afdeb12fa507c435cb7a5530147ca9430ee81ebf228144eeaae55bb76eb6aba0d3e7038cb4e3e473cae83a48a3e9ce99864d7a1a903de4ce1b923e4d711321fe40bd2fd198dee4621b650e52ccd3f04ee818443c9b1d3476a8af1460343fb7ac7';
      paymentDetail.access_key = '98e9854d57563c34843c61c09e13f17c';
      paymentDetail.profile_id = '09D76F9D-C5BB-4A5F-8D1E-4E3F2A757AD9';
      paymentDetail.transaction_uuid = uuid.v4();
      paymentDetail.signed_field_names =
        'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency';
      paymentDetail.unsigned_field_names = '';
      paymentDetail.signed_date_time = moment
        .utc(time)
        .format('YYYY-MM-DDTHH:mm:ss[Z]');
      paymentDetail.locale = 'en';
      paymentDetail.transaction_type = 'authorization';
      paymentDetail.reference_number = cart?.value?.code;
      paymentDetail.amount = (cart?.value?.totalWithTax / 100)
        .toFixed(2)
        .toString();
      paymentDetail.currency = 'ETB';
      paymentDetail.signature = '';
      paymentDetail.submit = 'Submit';

      let signedFieldNames =
        'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency';
      let params = signedFieldNames.split(',');
      let dataToSign = [];

      params.forEach((param) => {
        dataToSign.push(param + '=' + paymentDetail[param]);
      });

      let data = dataToSign.join();

      var hash = CryptoJS.HmacSHA256(data, SECRET_KEY);
      var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      paymentDetail.signature = hashInBase64;
      // return commaSeparate(dataToSign);
    });

    const updatePaymentMethod = (method) => {
      paymentMethod.value = method;
    };

    const changeState = async () => {
      const orderAddress = mapAddressFormToOrderAddress(billingDetails.value);
      await save({ billingDetails: orderAddress });
      await load();
      setCart();
    };

    const applyPromoCode = async () => {
      const result = await applyCoupon({
        couponCode: promoCode.value,
        currentCart: cart.value,
      });

      paymentDetail.amount = (cart?.value?.totalWithTax / 100)
        .toFixed(2)
        .toString();
      paymentDetail.signature = '';

      let signedFieldNames =
        'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency';

      let params = signedFieldNames.split(',');
      let dataToSign = [];

      params.forEach((param) => {
        dataToSign.push(param + '=' + paymentDetail[param]);
      });

      let data = dataToSign.join();

      var hash = CryptoJS.HmacSHA256(data, SECRET_KEY);
      var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      paymentDetail.signature = hashInBase64;
    };
    const processOrder = async () => {
      const response = await set({
        method: paymentMethod?.value?.code,
        metadata: {
          // Here you would pass data from an external Payment Provided after successful payment process like payment id.
        },
      });

      const state = 'Completed';

      //   const body = {
      //   query: `mutation{
      //           transitionOrderToState(state: "PaymentAuthorized"){
      //             ... on Order{
      //               billingAddress{
      //                 fullName
      //               }
      //             }
      //             ... on OrderStateTransitionError{
      //               errorCode
      //               message
      //             }
      //           }
      //         }`
      // };
      // const options = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      // };
      // let baseUrl = process.env.GRAPHQL_API;
      // const acat = await axios
      //   .post(baseUrl, body, options)
      //   .then(async (res) => {
      //   }).catch(err => {
      //   })

      //   const body = {
      //   query: `mutation transitionOrderToState($state: String!) {
      //           transitionOrderToState(input : {state: $state}) {

      //           }
      //         }`,
      //   variables: {
      //     state: state,
      //   },
      // };
      // const options = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      // };
      // let baseUrl = process.env.GRAPHQL_API;

      //      const acat = await axios
      //   .post(baseUrl, body, options)
      //   .then(async (res) => {
      //   }).catch(err => {
      //   })

      // const thankYouPath = { name: 'thank-you', query: { order: response?.code }};
      // const thankYouPath = { name: 'thank-you', query: { order:11256 }}; // order number is to be getted from the response later

      // context.root.$router.push(context.root.localePath(thankYouPath));
      // // context.root.$router.push({ redirect: window.location.href = 'https://secureacceptance.cybersource.com/checkout' });
      // setCart(null);
    };

    const processTelebirr = async () => {
      ////////////////////////////////STEP 1//////////////////////////////////////
      const uniqueId = uuid.v4();

      const appKey = '64d1499394ba4c4aa7d8deb1a500b9a0';
      let signObj = {
        appId: '4ae7217b4e7149fdac877852e7fd87db',
        nonce: uniqueId,
        notifyUrl: 'https://admin.ethiolab.et/telebirr',
        outTradeNo: `${cart.value.code}_${uniqueId}`,
        receiveName: 'Ethiolab',
        returnUrl: 'http://localhost:3001/checkout/thank-you/',
        shortCode: '220322',
        subject: 'Goods Name',
        timeoutExpress: '30',
        timestamp: cart?.value?.code?.toString(),
        totalAmount: paymentDetail.amount,
      };

      signObj.appKey = appKey;
      let StringA = jsonSort(signObj);

      function jsonSort(jsonObj) {
        let arr = [];
        for (var key in jsonObj) {
          arr.push(key);
        }
        arr.sort();
        let str = '';
        for (var i in arr) {
          str += arr[i] + '=' + jsonObj[arr[i]] + '&';
        }
        return str.substr(0, str.length - 1);
      }

      ////////////////////////////////STEP 2//////////////////////////////////////

      let StringB = sha256(StringA);

      function sha256(data) {
        var hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
      }
      ////////////////////////////////STEP 3//////////////////////////////////////

      let sign = StringB.toUpperCase();

      ////////////////////////////////STEP 4//////////////////////////////////////

      let jsonObj = {
        appId: '4ae7217b4e7149fdac877852e7fd87db',
        nonce: uniqueId,
        notifyUrl: 'https://admin.ethiolab.et/telebirr',
        outTradeNo: `${cart.value.code}_${uniqueId}`,
        receiveName: 'Ethiolab',
        returnUrl: 'http://localhost:3001/checkout/thank-you/',
        shortCode: '220322',
        subject: 'Goods Name',
        timeoutExpress: '30',
        timestamp: cart?.value?.code?.toString(),
        totalAmount: paymentDetail.amount,
      };

      let ussdjson = JSON.stringify(jsonObj);

      ////////////////////////////////STEP 5//////////////////////////////////////

      let ussd = rsa_encrypt(ussdjson);

      function rsa_encrypt(data) {
        let publicKey =
          'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhu+JrZMv17Ah5joHaBWWOl2NOZruM6M0ZMQLpRDfvobwZhK46mDH+b9nej1PnM4mSqQ8TlDIQJ5Y27vIyc2KWksxdLb59+POd3wUv455npMeK2RCBL5KDSam+eets6XoO6dRZv00eWMQ+SOHaK48XlftIUghfeOfZs/LdWK6EksgXaOKQsQzhqOnmsGdJkMe3YMqm10SBuWqkaZcmt+DUUzd2j1rvDr8B8Tu24FkmMbpSKhfRYI3HBIBG1tB6nefXT3A7ouwnuEMqwe1XCHaHWUMErmvr4bs3o3ZzJvEinIi5LX7mTG/+OB/OI4AyAbjrHad77Vb5RyGSFrpCr5TEwIDAQAB';
        let key = new NodeRSA(getPublicKey(publicKey));
        key.setOptions({ encryptionScheme: 'pkcs1' });
        let encryptKey = key.encrypt(data, 'base64');
        return encryptKey;
      }

      function insertStr(str, insertStr, sn) {
        var newstr = '';
        for (var i = 0; i < str.length; i += sn) {
          var tmp = str.substring(i, i + sn);
          newstr += tmp + insertStr;
        }
        return newstr;
      }

      function getPublicKey(key) {
        const result = insertStr(key, '\n', 64);
        return (
          '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----'
        );
      }

      ////////////////////////////////STEP 6//////////////////////////////////////

      const appId = '4ae7217b4e7149fdac877852e7fd87db';
      let requestMessage = { appid: signObj.appId, sign: sign, ussd: ussd };

      ////////////////////////////////STEP 7//////////////////////////////////////

      changeState();
      await load();
      setCart();

      const api = 'http://196.188.120.3:11443/service-openup/toTradeWebPay';

      axios
        .post('/api/telebirr', requestMessage)
        .then((res) => {
          if (res.status == 200 && res.data.data.code == 200) {
            // rsp.redirect(res.data.data.toPayUrl);
            window.location.href = res.data.data.data.toPayUrl;
          } else {
            console.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleCancelOrder = async (token) => {
      const body = {
        query: `mutation cancelOrder {
          cancelMyOrder{
                  success
                }
              }`,
        variables: {
          orderCode: cart?.value?.code,
        },
      };
      // const token = this.$cookies.get('etech-auth-token');

      // const token = this.cookieToken;

      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: `Bearer ${token}`,
        },
      };
      let baseUrl = process.env.GRAPHQL_API;

      const acat = await axios
        .post(baseUrl, body, options)
        .then(async (res) => {
          setCart();
          modalOpen.value = false;

          root.$router.push('/');
          // window.location.href = "/"
        })
        .catch((err) => {});
    };

    const cashComplete = async () => {
      changeState();
      await load();
      setCart();
      root.$router.push('/');
    };

    return {
      terms,
      loading,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals,
      cart: computed(() => cart.value),
      tableHeaders: ['Description', 'Quantity', 'Amount'],
      cartGetters,
      processOrder,
      updatePaymentMethod,
      paymentMethod,
      paymentDetail,
      url,
      sign,
      processTelebirr,
      applyPromoCode,
      promoCode,
      handleModalOpen,
      modalOpen,
      // handleCancelOrder,
      handleModalCashOpen,
      canPay,
      handleCancelOrder,
      standardTax,
      cashComplete,
      changeState,
    };
  },
};
</script>

<style lang="scss" scoped>
.cyberForm {
  max-height: 50px;
}
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.table {
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: center;
      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
    }
  }
}
.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
  margin-bottom: var(--spacer-base);
}
.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.product-price {
  --price-font-size: var(--font-size--base);
}
.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }
  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }
  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color: var(--c-white);
    &:hover {
      color: var(--c-white);
    }
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.property {
  margin: 0 0 var(--spacer-sm) 0;
  &__name {
    color: var(--c-text-muted);
  }
}
.accordion {
  margin: 0 0 var(--spacer-xl) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}
.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: var(--font-weight--normal);
  }
}

#checkout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
      // margin-right: 100px;
      min-width: 85%;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin: 0 0 0 4.25rem;
    }
  }
  // &__steps {
  //   --steps-content-padding: 0 var(--spacer-base);
  //   ::v-deep .sf-steps__step.is-done  {
  //     color: var(--c-primary);
  //   }
  //   @include for-desktop {
  //     --steps-content-padding: 0;
  //   }
  // }
}

.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;
  &:last-child {
    padding-bottom: var(--spacer-xl);
  }
}

.promo-code {
  display: flex;
  align-items: flex-start;
  &__button {
    --button-width: 6.3125rem;
    --button-height: var(--spacer-lg);
  }
  &__input {
    --input-background: var(--c-white);
    flex: 1;
  }
}
</style>
