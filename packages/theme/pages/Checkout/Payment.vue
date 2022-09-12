<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Payment')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfTable class="sf-table--bordered table desktop-only">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">{{ $t('Item') }}</SfTableHeader>
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
          <SfImage :src="cartGetters.getItemImage(product)" :alt="cartGetters.getItemName(product)" />
        </SfTableData>
        <SfTableData class="table__data table__description table__data">
          <div class="product-title">{{ cartGetters.getItemName(product) }}</div>
          <div class="product-sku">{{ cartGetters.getItemSku(product) }}</div>
          <SfProperty
            v-for="(attribute, key) in cartGetters.getItemOptions(product)"
            :key="key"
            :name="attribute.label"
            :value="attribute.value"
          />
        </SfTableData>
        <SfTableData class="table__data">{{ cartGetters.getItemQty(product) }}</SfTableData>
        <SfTableData class="table__data price">
          <SfPrice
            :regular="cartGetters.getItemPrice(product).regular.toLocaleString() + ' ETB'"
            :special="cartGetters.getItemPrice(product).special.toLocaleString() + ' ETB'"
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
            :value="(totals.special > 0 ? totals.special : totals.subtotal).toLocaleString() + ' ETB'"
            class="sf-property--full-width property"
          />
        </div>

        <SfDivider />

        <SfProperty
          :name="$t('Total price')"
          :value="totals.subtotal.toLocaleString() + ' ETB'"
          class="sf-property--full-width sf-property--large summary__property-total"
        />

        <VsfPaymentProvider @paymentMethodSelected="updatePaymentMethod"/>

        <SfCheckbox v-e2e="'terms'" v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              {{ $t('I agree to') }} <SfLink href="#"> {{ $t('Terms and conditions') }}</SfLink>
            </div>
          </template>
        </SfCheckbox>

        <div class="summary__action">
          <SfButton
            type="button"
            class="sf-button color-secondary summary__back-button"
            @click="$router.push('/checkout/billing')"
          >
            {{ $t('Go back') }}
          </SfButton>
          <button v-on:click="sendData">
            Click me
          </button>

          <!-- <form id="payment_confirmation" action="https://testsecureacceptance.cybersource.com/pay" method="post">
            <input type="hidden" name="access_key" v-model="paymentDetail.access_key">
            <input type="hidden" name="profile_id" v-model="paymentDetail.profile_id">
            <input type="hidden" name="transaction_uuid" v-model="paymentDetail.transaction_uuid">
            <input type="hidden" name="signed_field_names" v-model="paymentDetail.signed_field_names">
            <input type="hidden" name="unsigned_field_names" v-model="paymentDetail.unsigned_field_names">
            <input type="hidden" name="signed_date_time" v-model="paymentDetail.signed_date_time">
            <input type="hidden" name="locale" v-model="paymentDetail.locale">
            <input type="hidden" name="transaction_type" v-model="paymentDetail.transaction_type">
            <input type="hidden" name="reference_number" v-model="paymentDetail.reference_number">
            <input type="hidden" name="amount" v-model="paymentDetail.amount">
            <input type="hidden" name="currency" v-model="paymentDetail.currency">
            <input type="hidden" name="signature" v-model="paymentDetail.signature">
            <input type="submit" name="submit" value="Confirm">

          </form> -->

          <!-- <SfButton
            v-e2e="'make-an-order'"
            :disabled="!paymentMethod || !terms"
            class="summary__action-button"
            @click="processOrder"
          >
            {{ $t('Make an order') }}
          </SfButton> -->
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
  SfLink
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { ref, computed, onMounted } from '@vue/composition-api';
import { useMakeOrder, useCart, cartGetters, usePayment } from '@vue-storefront/vendure';
// import { useBilling, useShipping, useUserBilling } from '@vue-storefront/vendure';
import { uuid } from 'vue-uuid'; 
import {crypto} from "crypto";
import CryptoJS from 'crypto-js'
import moment from "moment";

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
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider')
  },
  setup(props, context) {
    const { cart, load, setCart } = useCart();
    const { loading } = useMakeOrder();
    const { set } = usePayment();

    

    const terms = ref(false);
    const paymentMethod = ref(null);

     let time = new Date().getTime();

    const url = "https://testsecureacceptance.cybersource.com/pay";
    const date = moment()
    const SECRET_KEY = "c03b7b8aa22c4bc8b2760c31d915bafd5b1c0c08d87340bfbf2e73931d4b066afdeb12fa507c435cb7a5530147ca9430ee81ebf228144eeaae55bb76eb6aba0d3e7038cb4e3e473cae83a48a3e9ce99864d7a1a903de4ce1b923e4d711321fe40bd2fd198dee4621b650e52ccd3f04ee818443c9b1d3476a8af1460343fb7ac7";
    let paymentDetail = {};
    paymentDetail.access_key = "98e9854d57563c34843c61c09e13f17c";
    paymentDetail.profile_id = "09D76F9D-C5BB-4A5F-8D1E-4E3F2A757AD9";
    paymentDetail.transaction_uuid = uuid.v4();
    paymentDetail.signed_field_names = "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency";
    paymentDetail.unsigned_field_names = "";
    paymentDetail.signed_date_time = moment.utc(time).format('YYYY-MM-DDTHH:mm:ss[Z]');
    paymentDetail.locale = "en";
    paymentDetail.transaction_type = "authorization";
    paymentDetail.reference_number = moment().unix().toString();
    paymentDetail.amount = (cart.value.totalWithTax/100).toFixed(2).toString();
    paymentDetail.currency = "USD";
    paymentDetail.signature = "";
    paymentDetail.submit = "Submit";

    function sendData() {
  console.log('Sending data');

  const XHR = new XMLHttpRequest();

  const urlEncodedDataPairs = [];

  // Turn the data object into an array of URL-encoded key/value pairs.
  for (const [name, value] of Object.entries(paymentDetail)) {
    urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behavior of browser form submissions.
  const urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  // Define what happens on successful data submission
  XHR.addEventListener('load', (event) => {
    alert('Yeah! Data sent and response loaded.');
  });

  // Define what happens in case of error
  XHR.addEventListener('error', (event) => {
    alert('Oops! Something went wrong.');
  });

  // Set up our request
  XHR.open('POST', 'https://testsecureacceptance.cybersource.com/pay');

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Access-Control-Allow-Origin', '*');
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
  // XHR.setRequestHeader("withCredentials", true);
  // XHR.setRequestHeader("mode", "no-cors");



  // Finally, send our data.
  XHR.send(urlEncodedData);
}

    onSSR(async () => {
      await load();
    });

    onMounted(() => {
      console.log("the usecart cart value is ", cart);
      console.log("key vlaue is ", key)
      console.log("the final payment detail value is ", paymentDetail)
      console.log("amount type", typeof(paymentDetail.transaction_uuid))
      console.log("the time value is ", time)
    })

    const updatePaymentMethod = method => {
      paymentMethod.value = method;
    };

    const processOrder = async () => {
      const response = await set({
        method: paymentMethod?.value?.code,
        metadata: {
          // Here you would pass data from an external Payment Provided after successful payment process like payment id.
        }

      });
        console.log("the final payment response value is ", response)


      // const thankYouPath = { name: 'thank-you', query: { order: response?.code }}; 
      const thankYouPath = { name: 'thank-you', query: { order:11256 }}; // order number is to be getted from the response later

      context.root.$router.push(context.root.localePath(thankYouPath));
      // context.root.$router.push({ redirect: window.location.href = 'https://secureacceptance.cybersource.com/checkout' });
      setCart(null);
    };

    const buildDataToSign = async (paymentDetail) => {
      let signedFieldNames =await  paymentDetail.signed_field_names;
      console.log("the signed field names are ", signedFieldNames)
      let params = signedFieldNames.split(",");
      let dataToSign = [];

      params.forEach(param => {
        dataToSign.push(param+"="+paymentDetail[param]);
        
      });
      console.log("before comma", dataToSign)
      return commaSeparate(dataToSign);


    }

    const commaSeparate = async (dataToSign) => {
      console.log("after comma", dataToSign.join())
      return dataToSign.join();
      
    }

    const signData =  (data,key) => {
      console.log("the incoming value is ", "data", data, "key", key);
      // const b64 = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
      // const e64 = CryptoJS.enc.Base64.parse(b64)

      // const sign = CryptoJS.HmacSHA256(data, key).toString(CryptoJS.enc.Hex)
      var hash = CryptoJS.HmacSHA256(data, key);
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      // console.log("the final key string value is ", sign.toString(CryptoJS.enc.Hex))
      return hashInBase64 
      
    }
    let key =  signData(buildDataToSign(paymentDetail), SECRET_KEY);
    paymentDetail.signature = key;


    return {
      terms,
      loading,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      tableHeaders: ['Description', 'Quantity', 'Amount'],
      cartGetters,
      processOrder,
      updatePaymentMethod,
      paymentMethod,
      paymentDetail,
      url,
      sendData
    };
  }
};
</script>

<style lang="scss" scoped>
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
      margin: 0 var(--spacer-xl) 0 0;
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
    color:  var(--c-white);
    &:hover {
      color:  var(--c-white);
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
</style>
