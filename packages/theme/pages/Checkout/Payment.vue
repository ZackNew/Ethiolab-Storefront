<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <div v-if="!canPay" class="flex items-center">
          <!-- <img src="/info.png" alt="info icon" class="w-14 h-14 mr-2" />
          <div class="bg-white text-lg px-2 py-1 font-bold rounded-lg">
            <p>
              This order contains order based product. You are allowed to pay
              once the admin update the order status.
            </p>
          </div> -->
          <SfAlert
            message="Your order contains at least one item that is order-based. Please wait for our team members to contact you, so that you are able to access the payment methods and proceed with your purchase."
            type="info"
          />
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
              <!-- <SfProperty
                v-for="(attribute, key) in cartGetters.getItemOptions(product)"
                :key="key"
                :name="attribute.label"
                :value="attribute.value"
              /> -->
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
                name="VAT"
                :value="standardTax.toLocaleString() + ' ETB'"
                class="sf-property--full-width property"
              />
              <SfProperty
                v-if="totals.withholding != 0"
                :name="$t('Withholding Tax')"
                :value="
                  parseFloat(totals.withholding).toLocaleString() + ' ETB'
                "
                class="sf-property--full-width property"
              />
              <SfProperty
                v-if="
                  totals.ordermodification != 0 &&
                  !isNaN(totals.ordermodification)
                "
                :name="$t('Order Modification')"
                :value="
                  parseFloat(totals.ordermodification).toLocaleString() + ' ETB'
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

            <div v-if="totals.total > 10000" class="my-5">
              <input
                type="checkbox"
                name="apply-withholding"
                id="apply-withholding"
                v-model="withholdingApplied"
                @change="addOrRemoveWithholdingTax"
              />
              <label for="apply-withholding">I will pay withholding tax.</label>
            </div>

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
                    :disabled="!terms"
                    type="submit"
                    @click="cashComplete"
                    id="submit"
                    name="submit"
                    value="PAY WITH CYBERSOURCE"
                    class="box-border relative flex h-12 pl-4 pr-4 align-center justify-center delay-75 bg-center uppercase cursor-pointer font-bold rounded-lg"
                    :class="
                      !terms
                        ? 'bg-[#f1f2f3] text-[#dfdfdf]'
                        : 'bg-primary text-white'
                    "
                  />
                </form>
              </div>

              <div v-if="paymentMethod && paymentMethod.name == 'Telebirr'">
                <SfButton
                  v-e2e="'make-an-order'"
                  class="summary__action-button"
                  @click="processTelebirr"
                  :disabled="!terms || teleBirrLoading"
                >
                  {{ $t('Pay with Telebirr') }}
                </SfButton>
              </div>

              <div v-if="paymentMethod && paymentMethod.name == 'Awash'">
                <SfButton
                  v-e2e="'make-an-order'"
                  class="summary__action-button"
                  @click="processAwash"
                  :disabled="!terms"
                >
                  {{ $t('Pay with Awash Bank') }}
                </SfButton>
              </div>

              <div v-if="paymentMethod && paymentMethod.name == 'Cash'">
                <SfModal
                  title="My title"
                  visible
                  :persistent="false"
                  :cross="false"
                >
                  <div class="relative h-full max-w-md md:h-auto -m-4">
                    <div class="relative rounded-lg dark:bg-gray-700">
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
        <div
          v-if="canPay && cart.customFields.withholding_tax === 0"
          class="highlighted promo-code"
        >
          <SfInput
            v-model="promoCode"
            name="promoCode"
            :label="$t('Enter promo code')"
            class="sf-input--filled promo-code__input"
          />
          <SfButton class="promo-code__button" @click="applyPromoCode">
            {{ $t('Apply') }}
          </SfButton>
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
          <SfModal title="My title" visible :persistent="false" :cross="false">
            <div class="relative w-full h-full max-w-md md:h-auto">
              <div class="relative rounded-lg dark:bg-gray-700">
                <button
                  type="button"
                  class="absolute right-[1px] top-3 bg-transparent rounded-lg text-sm"
                  data-modal-toggle="popup-modal"
                  @click="handleModalOpen"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
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
        <div>
          <SfModal
            v-model="modalAwashOpen"
            title="My title"
            visible
            cross
            overlay
            persistent
            @close="awashModalClosed()"
          >
            <h3>OrderCode: {{ awashCode }}</h3>
            <p>
              Your order is being processed. make your payment using the
              reference code: {{ awashRefCode }}. in one of awash bank branches
              or using awash bank mobile app.
              <span v-if="isAuthenticated"
                >your reference code has been sent to your email.</span
              >
            </p>
          </SfModal>
        </div>
      </div>
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
  SfAlert,
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import {
  ref,
  computed,
  onMounted,
  onBeforeMount,
  inject,
} from '@vue/composition-api';
import {
  useMakeOrder,
  useCart,
  cartGetters,
  usePayment,
  useUser,
} from '@vue-storefront/vendure';
import { useBilling } from '@vue-storefront/vendure';
import { uuid } from 'vue-uuid';
import * as crypto from 'crypto';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import axios from 'axios';
// import VueAxios from 'vue-axios';
import NodeRSA from 'node-rsa';
import CartPreview from '~/components/Checkout/CartPreview.vue';

export default {
  middleware: ['csrf'],
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
    SfAlert,
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
    this.cookieToken = this.$cookies.get('vendure-auth-token');
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
  setup(props, context) {
    const showToast = inject('showToast');
    const { billing } = useBilling();
    const { cart, setCart, applyCoupon, load: loadCart } = useCart();
    const { isAuthenticated } = useUser();
    const billingDetails = ref(billing.value || {});
    const withholdingApplied = ref(false);
    const { loading } = useMakeOrder();
    const { set } = usePayment();

    const canPay = computed(
      () => cart?.value?.customFields?.allow_customer_payment
    );

    const terms = ref(false);
    const paymentMethod = ref(null);
    const modalOpen = ref(false);
    const modalAwashOpen = ref(false);
    const awashLoading = ref(false);
    const teleBirrLoading = ref(false);
    const modalCashOpen = ref(false);
    const awashRefCode = ref('');
    const awashCode = ref('');

    const time = new Date().getTime();

    const sign = ref('');
    const paymentDetail = {};
    let SECRET_KEY = '';
    let url = '';
    const promoCode = ref('');

    const handleModalOpen = () => {
      const temp = modalOpen.value;
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
      const temp = modalCashOpen.value;
      modalCashOpen.value = !temp;
      paymentMethod.value = null;
      modalOpen.value = !modalOpen;
    };

    const addOrRemoveWithholdingTax = async () => {
      let addRemove = '';
      if (withholdingApplied.value === true) {
        addRemove = 'add';
      } else {
        addRemove = 'remove';
      }
      const body = {
        query: `
          mutation AddOrRemoveWithholding($id: ID!, $value: String!) {
            addOrRemoveWitholding(input: {id: $id, value: $value}) {
              success
              }
            }`,
        variables: { id: cart.value.id, value: addRemove },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await axios
        .post(process.env.GRAPHQL_API, body, options)
        .then(async (res) => {
          if (res.data.data.addOrRemoveWitholding?.success === true) {
            const result =
              await context.parent.$store.$vsf.$vendure.api.getCart();
            setCart(result.data.activeOrder);
          } else {
            if (addRemove === 'add') {
              showToast("Couldn't add withholding.");
              withholdingApplied.value = false;
            }
          }
        });
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
          String(cart.value?.customFields?.withholding_tax).slice(0, -2) +
          '.' +
          String(cart.value?.customFields?.withholding_tax).slice(-2),
        total:
          String(cart.value?.subTotalWithTax).slice(0, -2) +
          '.' +
          String(cart.value?.subTotalWithTax).slice(-2),
        ordermodification: cart.value?.surcharges[0]?.price / 100,
      };
    });

    onSSR(async () => {
      await loadCart({ customQuery: { activeOrder: 'get-cart-custom-query' } });
    });

    onMounted(() => {});

    onBeforeMount(async () => {
      await loadCart();
      await addOrRemoveWithholdingTax();
      await loadCart();
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

      params?.forEach((param) => {
        dataToSign.push(param + '=' + paymentDetail[param]);
      });

      let data = dataToSign.join();

      var hash = CryptoJS.HmacSHA256(data, SECRET_KEY);
      var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      paymentDetail.signature = hashInBase64;
      // return commaSeparate(dataToSign);
      awashCode.value = cart.code;
    });

    const updatePaymentMethod = (method) => {
      paymentMethod.value = method;
    };

    const changeState = async () => {
      await context.parent.$store.$vsf.$vendure.api.transitionOrderToState({
        state: 'ArrangingPayment',
      });
      await loadCart();
      setCart();
    };

    const applyPromoCode = async () => {
      const prevDiscount = cart.value.discounts.length;
      const result = await applyCoupon({
        couponCode: promoCode.value,
        currentCart: cart.value,
      });

      if (cart.value.discounts.length > prevDiscount) {
        showToast('Coupon code applied!');
      } else {
        showToast("Couldn't apply coupon code!");
      }

      paymentDetail.amount = (cart?.value?.totalWithTax / 100)
        .toFixed(2)
        .toString();
      paymentDetail.signature = '';

      let signedFieldNames =
        'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency';

      let params = signedFieldNames.split(',');
      let dataToSign = [];

      params?.forEach((param) => {
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
      teleBirrLoading.value = true;
      const token = CryptoJS.AES.encrypt(
        context.root.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();

      const body = {
        query: `mutation PAY_WITH_TELEBIRR{
                  payWithTeleBirr(input:{orderCode:"4767680"}) {
                    error
                    msg
                    data
                  }
                }`,
        csrfToken: context.root.$store.state.csrfToken.csrfToken,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      await axios.post('/api/shop', body, options).then(async (res) => {
        if(res.data.data.data.payWithTeleBirr.data) {
          let rawRequest = res.data.data.data.payWithTeleBirr.data
          const baseURL = 'https://developerportal.ethiotelebirr.et:38443/payment/web/paygate'
          window.open(`${baseURL}/${rawRequest.trim()}`, '_blank', 'noopener,noreferrer');
        }
        teleBirrLoading.value = false
      });
    };

    const processAwash = async () => {
      awashLoading.value = true;
      const token = CryptoJS.AES.encrypt(
        context.root.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();

      const body = {
        query: `query getRefe5ZC9KWNYNYrenceCode {
          getAwashReferenceCode
        }`,
        csrfToken: context.root.$store.state.csrfToken.csrfToken,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      await axios.post('/api/shop', body, options).then(async (res) => {
        if (res.data.data?.data?.getAwashReferenceCode) {
          awashRefCode.value = res.data.data.data.getAwashReferenceCode;
          awashLoading.value = false;
          changeState();
          modalAwashOpen.value = true;
        } else {
          showToast('Something went wrong.');
        }
      });
    };

    const awashModalClosed = () => {
      modalAwashOpen.value = false;
      window.location.href = '/';
    };

    const handleCancelOrder = async () => {
      const body = {
        query: `mutation cancelOrder {
          cancelMyOrder{
                  success
                }
              }`,
        variables: {
          orderCode: cart?.value?.code,
        },
        csrfToken: context.root.$store.state.csrfToken.csrfToken,
      };
      const token = CryptoJS.AES.encrypt(
        context.root.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      await axios
        .post('/api/shop', body, options)
        .then(async (res) => {
          setCart();
          modalOpen.value = false;

          context.root.$router.push('/');
          // window.location.href = "/"
        })
        .catch((err) => {});
    };

    const cashComplete = async () => {
      changeState();
      await loadCart();
      setCart();
      context.root.$router.push('/');
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
      handleModalCashOpen,
      canPay,
      handleCancelOrder,
      standardTax,
      cashComplete,
      changeState,
      addOrRemoveWithholdingTax,
      withholdingApplied,
      processAwash,
      awashRefCode,
      modalAwashOpen,
      awashModalClosed,
      awashCode,
      isAuthenticated,
      teleBirrLoading
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
