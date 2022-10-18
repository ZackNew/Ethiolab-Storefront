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
              {{ $t('I agree to') }} <SfLink href="/policy/terms-and-conditions"> {{ $t('Terms and conditions') }}</SfLink>
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
          <!-- <button v-on:click="sendData">
            Click me
          </button> -->

          <div v-if="paymentMethod && paymentMethod.name == 'Abyssinia Cybersource Hosted Checkout' " class="cyberForm"> 

           <form id="payment_confirmation" action="https://testsecureacceptance.cybersource.com/pay" target="_blank" method="post">
            <input id="access_key" type="hidden"  name="access_key" v-model="paymentDetail.access_key">
            <input id="profile_id" type="hidden"  name="profile_id" v-model="paymentDetail.profile_id">
            <input id="transaction_uuid" type="hidden"  name="transaction_uuid" v-model="paymentDetail.transaction_uuid">
            <input id="signed_field_names" type="hidden"  name="signed_field_names" v-model="paymentDetail.signed_field_names">
            <input id="unsigned_field_names" type="hidden"  name="unsigned_field_names" v-model="paymentDetail.unsigned_field_names">
            <input id="signed_date_time" type="hidden"  name="signed_date_time" v-model="paymentDetail.signed_date_time">
            <input id="locale" type="hidden"  name="locale" v-model="paymentDetail.locale">
            <input id="transaction_type" type="hidden"  name="transaction_type" v-model="paymentDetail.transaction_type">
            <input id="reference_number" type="hidden"  name="reference_number" v-model="paymentDetail.reference_number">
            <input id="amount" type="hidden"  name="amount" v-model.lazy="paymentDetail.amount">
            <input id="currency" type="hidden"  name="currency" v-model="paymentDetail.currency">
            <input id="signature" type="hidden"  name="signature" v-model="paymentDetail.signature">

          <br></br>  <input type="submit" id="submit" name="submit" value="Confirm"  class="box-border relative flex h-16 w-48 align-center justify-center p-4 text-white bg-primary delay-75 bg-center uppercase cursor-pointer font-bold -mt-12">
  
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
import { ref, computed, onMounted , onBeforeMount} from '@vue/composition-api';
import { useMakeOrder, useCart, cartGetters, usePayment } from '@vue-storefront/vendure';
// import { useBilling, useShipping, useUserBilling } from '@vue-storefront/vendure';
import { uuid } from 'vue-uuid'; 
import * as crypto from 'crypto';
import CryptoJS from 'crypto-js'
import moment from "moment";
import axios from 'axios';
import Vue from 'vue';
// import VueAxios from 'vue-axios';
import { mapAddressFormToOrderAddress, COUNTRIES, getDefaultAddress, mapAddressToAddressForm } from '~/helpers';
import NodeRSA from "node-rsa";

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
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider')
  },
  async fetch() {
    console.log("fetchhhhhh");

    if(req.method == "GET"){
      const body = []
    req.on('ACCEPT', (chunk) => {
      body.push(chunk)
    })
    console.log("body accept ", body);
    }
  //   if(event.type == "ACCEPT"){
  //     console.log("payment is accepted")
  //   }
  //  else if(event.type == "REVIEW"){
  //     console.log("payment is Review")
  //   } else if(event.type == "Decline"){
  //     console.log("payment is delined")
  //   } else if(event.type == "ERROR"){
  //     console.log("payment is error")
  //   } else if(event.type == "CANCEL"){
  //     console.log("payment is canceled")
  //   }
  },
  setup(props, context) {
    const { cart, load, setCart } = useCart();
    const { loading } = useMakeOrder();
    const { set } = usePayment();
    
    

    const terms = ref(false);
    const paymentMethod = ref(null);

     let time = new Date().getTime();


    let sign = ref("")
    let paymentDetail = {};
    let SECRET_KEY = ""
    let url =""
    onSSR(async () => {
      await load();
    });

    onMounted(() => {
      console.log("the usecart cart value is ", cart);
      console.log("the final payment detail value is ", paymentDetail)
      console.log("amount type", typeof(paymentDetail.transaction_uuid))
      console.log("the time value is ", time)
    })

    onBeforeMount(() => {

     url = "https://testsecureacceptance.cybersource.com/pay";
    // const date = moment()
     SECRET_KEY = "c03b7b8aa22c4bc8b2760c31d915bafd5b1c0c08d87340bfbf2e73931d4b066afdeb12fa507c435cb7a5530147ca9430ee81ebf228144eeaae55bb76eb6aba0d3e7038cb4e3e473cae83a48a3e9ce99864d7a1a903de4ce1b923e4d711321fe40bd2fd198dee4621b650e52ccd3f04ee818443c9b1d3476a8af1460343fb7ac7";
    paymentDetail.access_key = "98e9854d57563c34843c61c09e13f17c";
    paymentDetail.profile_id = "09D76F9D-C5BB-4A5F-8D1E-4E3F2A757AD9";
    paymentDetail.transaction_uuid = uuid.v4();
    paymentDetail.signed_field_names = "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency";
    paymentDetail.unsigned_field_names = "";
    paymentDetail.signed_date_time = moment.utc(time).format('YYYY-MM-DDTHH:mm:ss[Z]');
    paymentDetail.locale = "en";
    paymentDetail.transaction_type = "authorization";
    // paymentDetail.reference_number = new Date().getTime();
    paymentDetail.reference_number = cart.value.code;

    
    paymentDetail.amount = (cart?.value?.totalWithTax/100).toFixed(2).toString();
    paymentDetail.currency = "ETB";
    paymentDetail.signature = "";
    paymentDetail.submit = "Submit";

    // let key =  signData(buildDataToSign(paymentDetail), SECRET_KEY);
    // sign = key;
    // paymentDetail.signature = "111111aaaa";

    // console.log("finalyyyyy", paymentDetail.signature)

    let signedFieldNames = "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency";
      // console.log("the signed field names are ", signedFieldNames)
      let params = signedFieldNames.split(",");
      let dataToSign = [];

      params.forEach(param => {
        dataToSign.push(param+"="+paymentDetail[param]);
        
      });

      let data = dataToSign.join();

      var hash = CryptoJS.HmacSHA256(data, SECRET_KEY);
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  paymentDetail.signature = hashInBase64;
      // console.log("before comma", dataToSign)
      // return commaSeparate(dataToSign);
    })

    const updatePaymentMethod = method => {
      paymentMethod.value = method;
      // console.log("paymentmethod id ", method);
    };

    const processOrder = async () => {
      const response = await set({
        method: paymentMethod?.value?.code,
        metadata: {
          // Here you would pass data from an external Payment Provided after successful payment process like payment id.
        }

      });
        console.log("the final payment response value is ", response)

        const state = "Completed";

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
      //     console.log("the response value sura is ", res);
      //   }).catch(err => {
      //     console.log("error occured while updating the state and err is ", err);
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
      //     console.log("the  gql response value is ", res);
      //   }).catch(err => {
      //     console.log("the catch err is ", err)
      //   })

      // const thankYouPath = { name: 'thank-you', query: { order: response?.code }}; 
      // const thankYouPath = { name: 'thank-you', query: { order:11256 }}; // order number is to be getted from the response later

      // context.root.$router.push(context.root.localePath(thankYouPath));
      // // context.root.$router.push({ redirect: window.location.href = 'https://secureacceptance.cybersource.com/checkout' });
      // setCart(null);
    };

    const processTelebirr =  async() => {
      console.log("telebirr next");

      ////////////////////////////////STEP 1//////////////////////////////////////

        const appKey = '64d1499394ba4c4aa7d8deb1a500b9a0';
        let signObj = {"appId":"4ae7217b4e7149fdac877852e7fd87db",
                      "nonce":paymentDetail.transaction_uuid,
                      "notifyUrl":`https://fd47-196-188-51-249.in.ngrok.io/api/hook`,
                      "outTradeNo":cart.value.code,
                      "receiveName":"Ethiolab",
                      "returnUrl":"http://localhost:3001/checkout/thank-you/",
                      "shortCode":"220322",
                      "subject":"Goods Name",
                      "timeoutExpress":"30",
                      "timestamp":paymentDetail.reference_number.toString(),
                      "totalAmount":paymentDetail.amount
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
        str += arr[i] + "=" + jsonObj[arr[i]] + "&";
        }
        return str.substr(0, str.length - 1);
        }

        console.log("string A vlaue is ", StringA)

              ////////////////////////////////STEP 2//////////////////////////////////////

              let StringB = sha256(StringA);

        function sha256(data) {
            var hash = crypto.createHash('sha256');
            hash.update(data);
            return hash.digest('hex');
        }
              ////////////////////////////////STEP 3//////////////////////////////////////
              console.log("string B vlaue is ", StringB)

       let sign = StringB.toUpperCase();


       console.log("sign vlaue is ", sign)

              ////////////////////////////////STEP 4//////////////////////////////////////

              let jsonObj = {"appId":"4ae7217b4e7149fdac877852e7fd87db",
                      "nonce":paymentDetail.transaction_uuid,
                      "notifyUrl":`https://fd47-196-188-51-249.in.ngrok.io/api/hook`,
                      "outTradeNo":cart.value.code,
                      "receiveName":"Ethiolab",
                      "returnUrl":"http://localhost:3001/checkout/thank-you/",
                      "shortCode":"220322",
                      "subject":"Goods Name",
                      "timeoutExpress":"30",
                      "timestamp":paymentDetail.reference_number.toString(),
                      "totalAmount":paymentDetail.amount
                    };

                    

                    // console.log("jsonobj is ", jsonObj)
                    
                    let ussdjson = JSON.stringify(jsonObj);

              ////////////////////////////////STEP 5//////////////////////////////////////

              let ussd = rsa_encrypt(ussdjson);

          function rsa_encrypt (data) {
            let publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhu+JrZMv17Ah5joHaBWWOl2NOZruM6M0ZMQLpRDfvobwZhK46mDH+b9nej1PnM4mSqQ8TlDIQJ5Y27vIyc2KWksxdLb59+POd3wUv455npMeK2RCBL5KDSam+eets6XoO6dRZv00eWMQ+SOHaK48XlftIUghfeOfZs/LdWK6EksgXaOKQsQzhqOnmsGdJkMe3YMqm10SBuWqkaZcmt+DUUzd2j1rvDr8B8Tu24FkmMbpSKhfRYI3HBIBG1tB6nefXT3A7ouwnuEMqwe1XCHaHWUMErmvr4bs3o3ZzJvEinIi5LX7mTG/+OB/OI4AyAbjrHad77Vb5RyGSFrpCr5TEwIDAQAB";
              let key = new NodeRSA(getPublicKey(publicKey));
              key.setOptions({encryptionScheme: 'pkcs1'});
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

          function getPublicKey (key) {
              const result = insertStr(key, '\n', 64);
              return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
          };

                    ////////////////////////////////STEP 6//////////////////////////////////////

          const appId = '4ae7217b4e7149fdac877852e7fd87db';
        let requestMessage = {appid: signObj.appId, sign: sign, ussd: ussd};


        ////////////////////////////////STEP 7//////////////////////////////////////

        const api = 'http://196.188.120.3:11443/service-openup/toTradeWebPay';
              // const options = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      // };
          //       const instance = axios.create({
          //   baseURL: 'http://196.188.120.3:11443/service-openup/toTradeWebPay',
          //   // timeout: 1000,
          //   // headers: {'X-Custom-Header': 'foobar'}
          // });

          // const instance = axios.create({
          //           // url: '/service-openup/toTradeWebPay',
          //           baseURL: 'http://196.188.120.3:11443',
          //           // method: 'POST',
          //           // timeout: 1000
          //         });

              axios
                      .post("/api/test", requestMessage)
                      .then(res => {
                        console.log("local response is ", res);
                          if (res.status == 200 && res.data.data.code == 200) {
                              // rsp.redirect(res.data.data.toPayUrl);
                              window.location.href = res.data.data.data.toPayUrl
                          } else {
                              console.error(res.data.message);
                          }
                      })
                      .catch(error => {
                          console.error(error);
                      });

        //       await this.$axios
        // .post("/service-openup/toTradeWebPay", requestMessage)
        // .then((res) => {
        //   if (res.status == 200 && res.data.code == 200) {
        //     rsp.redirect(res.data.data.toPayUrl);
        //   } else {
        //     console.error(res.data.message);
        //   }
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
    }

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
      sign,
      processTelebirr
    };
  }
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
