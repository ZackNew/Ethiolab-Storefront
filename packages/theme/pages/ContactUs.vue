<template>
  <div :class="isDarkMode ? 'text-white' : ''">
    <div class="mt-8 md:mt-20 wrap">
      <!-- <section class="sf-call-to-action rounded" :style="style">
        <div class="sf-call-to-action__text-container">
          <slot name="title">
            <h2 class="sf-call-to-action__title">Contact Us</h2>
          </slot>
        </div>
      </section> -->
      <!-- <h2
        :class="{
          'text-[#000000]': !isDarkMode,
          'text-[#ffffff]': isDarkMode,
        }"
        class="mb-2 ml-5 visible md:hidden"
      >
        Contact Us
      </h2> -->
      <div class="md:flex">
        <div
          class="mx-auto card shadow-lg md:w-2/3 font-bold p-3 rounded text-white bg-secondary"
        >
          <h4 class="text-7xl mb-5 mt-10">HOW CAN WE HELP?</h4>
          <p>
            Have some questions? Reach out to us by filling the form and our
            team will get in touch with you. We are looking forward to hear from
            you.
          </p>
        </div>
        <ValidationObserver
          v-slot="{ handleSubmit }"
          :class="{
            'bg-light_accent': !isDarkMode,
            'bg-dark_accent': isDarkMode,
          }"
          class="card shadow-lg p-10 mx-10 rounded"
        >
          <h2
            :class="{
              'text-[#000000]': !isDarkMode,
              'text-[#ffffff]': isDarkMode,
            }"
            class="mb-2 hidden md:visible"
          >
            Contact Us
          </h2>
          <form @submit.prevent="handleSubmit(sendMessage)">
            <div class="form px-5 md:px-0">
              <ValidationProvider
                name="firstName"
                rules="required|min:2"
                v-slot="{ errors }"
                slim
              >
                <SfInput
                  v-e2e="'customer-firstName'"
                  v-model="form.firstName"
                  :label="$t('First name')"
                  name="firstName"
                  class="form__element form__element--half"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider
                name="lastName"
                rules="required|min:2"
                v-slot="{ errors }"
                slim
              >
                <SfInput
                  v-e2e="'customer-lastName'"
                  v-model="form.lastName"
                  :label="$t('Last name')"
                  name="lastName"
                  class="form__element form__element--half form__element--half-even"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider
                name="emailAddress"
                rules="required|email"
                v-slot="{ errors }"
                slim
              >
                <SfInput
                  v-e2e="'customer-emailAddress'"
                  v-model="form.emailAddress"
                  :label="$t('Email')"
                  name="email"
                  class="form__element form__element--half"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider
                name="phoneNumber"
                rules="required|digits:9"
                v-slot="{ errors }"
                slim
              >
                <VuePhoneNumberInput
                  @update="phoneInputHandler"
                    required
                    color="#000000"
                    valid-color="#3860a7"
                    default-country-code="ET"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    v-model="formPhoneNumber"
                    class="form__element form__element--half form__element--half-even"
                />
                <p class="text-red">{{ errors[0] }}</p>
              </ValidationProvider>
              <ValidationProvider name="companyName" v-slot="{ errors }" slim>
                <SfInput
                  v-e2e="'customer-firstName'"
                  v-model="form.customerName"
                  :label="$t('Company Name')"
                  name="company_name"
                  required
                  class="form__element form__element--full"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <!-- <ValidationProvider
                name="emailAddress"
                rules="email"
                v-slot="{ errors }"
                slim
              >
                <SfInput
                  type="text"
                  v-e2e="'customer-emailAddress'"
                  v-model="form.customerEmail"
                  :label="$t('Company Email Address')"
                  name="phoneNumber"
                  class="form__element form__element--half form__element--half-even"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider> -->
              <ValidationProvider
                name="message"
                rules="required"
                v-slot="{ errors }"
                slim
              >
                <div class="w-full mb-2">
                  <textarea
                    id="message"
                    placeholder="Message *"
                    cols="75"
                    rows="10"
                    class="border p-2 placeholder:text-faded_black rounded-sm focus:outline-primary focus:outline focus:border-none"
                    :class="
                      isDarkMode
                        ? 'bg-dark_accent border-faded_white text-light_accent placeholder:text-faded_white'
                        : 'bg-light_accent border-dark_accent'
                    "
                    v-model="form.message"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    required
                  ></textarea>
                </div>
                <!-- <div class="w-full">
                  <textarea
                    id="message"
                    name="message"
                    class="w-full bg-none border p-3"
                    placeholder="Your Message"
                    v-model="form.message"
                    :rows="10"
                    wrap="soft"
                    :disabled="false"
                    :required="false"
                    :maxlength="null"
                    :minlength="null"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                  />
                  <div class="sf-textarea__error-message">
                    <transition name="sf-fade">
                      <div class="display-none">Required</div>
                    </transition>
                  </div>
                </div> -->
              </ValidationProvider>
            </div>

            <div class="form">
              <div class="form__action">
                <button
                  class="color-primary bg-secondary px-4 py-1 rounded text-white text-xl"
                  :aria-disabled="false"
                  :link="null"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <p v-if="errorMessage">{{ errorMessage }}</p>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <div class="similar-products wrap my-10">
      <SfHeading title="Our Stores" :level="1" />
    </div>
    <div class="contact-location wrap">
      <StoreLocator
        tileServerUrl="http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        :center="[location.latitude, location.longtude]"
        :zoom="6"
        :maxZoom="18"
        :markerIconAnchor="[10.5, 0]"
        :mapOptions="{}"
        :tileLayerOptions="{}"
        :markerOptions="{}"
        :flyToStoreZoom="15"
      >
        <div class="flex">
          <SfStore
            picture="~/static/Logo.png"
            :latlng="[location.latitude, location.longtude]"
            :pictureWidth="82"
            :pictureHeight="112"
          />
          <!-- name="Ethiolab Head Office"
            address="Adwa Street, Arada Sub-city, Elsi Bldg (881/EBG 407)"
            phone="(+251) 111 264 829"
            email="info@ethiolab.et" -->
          <div class="mt-4">
            <p>{{ companyName }} Head Office</p>
            <p class="mb-6">
              {{ location.locationText }}
            </p>
            <div class="flex">
              <SfIcon
                icon="phone"
                size="xs"
                color="#b6932f"
                viewBox="0 0 24 24"
                :coverage="1"
              />
              <div
                class="ml-2 mb-3"
                v-for="(phone, index) in phoneNumbers"
                :key="index"
              >
                <a :href="`tel:${phone}`">
                  <p>{{ phone }},</p>
                </a>
              </div>
            </div>
            <div class="flex">
              <SfIcon
                icon="mail"
                size="xs"
                color="#b6932f"
                viewBox="0 0 24 24"
                :coverage="1"
              />
              <div v-for="(email, index) in emails" :key="index">
                <a :href="`mailto:${email}`">
                  <p class="ml-2">{{ email }},</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </StoreLocator>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfStoreLocator,
  SfBanner,
  SfIcon,
} from '@storefront-ui/vue';
import StoreLocator from '~/components/StoreLocator.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiHelpers, useUiState } from '~/composables';
import { ref, onMounted, inject } from '@vue/composition-api';
import { required, min, digits, email } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { useVSFContext } from '@vue-storefront/core';
import { useCart, useTinNumber, useContactUs } from '@vue-storefront/vendure';
import { EMAIL_ADDRESS_CONFLICT_ERROR } from '~/helpers';
import gql from 'graphql-tag';
import { print } from 'graphql';
import CryptoJS from 'crypto-js';
import axios from 'axios';

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});
extend('digits', {
  ...digits,
  message: 'valid phone number Example:- 910111213',
});

extend('email', {
  ...email,
  message: 'Invalid email',
});


export default {
  middleware: ['csrf'],
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    SfStoreLocator,
    SfBanner,
    SfIcon,
    LazyHydrate,
    StoreLocator,
    VuePhoneNumberInput,
  },

  computed: {
    csrfToken() {
      const csrf = this.$store.state.csrfToken.csrfToken;
      return csrf;
    },
    style() {
      //   const image = this.image;
      //   const background = this.background;
      return {
        '--_call-to-action-background-image': `url("")`,
        '--_call-to-action-background-desktop-image': `url("")`,
        '--_call-to-action-background-color': '#005FB7',
        margin: 'var(--spacer-xl) auto var(--spacer-2xl)',
      };
    },
    phoneNumbers() {
      const phone =
        this.$store.state.companyDetails.companyInformation?.phone_number?.split(
          ';'
        );
      return phone;
    },
    location() {
      const locationText =
        this.$store.state.companyDetails.companyInformation?.location_text;
      const longtude =
        this.$store.state.companyDetails.companyInformation?.longtude;
      const latitude =
        this.$store.state.companyDetails.companyInformation?.latitude;
      return {
        locationText: locationText,
        longtude: longtude,
        latitude: latitude,
      };
    },
    emails() {
      const email =
        this.$store.state.companyDetails.companyInformation?.email?.split(';');
      return email;
    },
    companyName() {
      const name =
        this.$store.state.companyDetails.companyInformation?.company_name;
      return name;
    },
  },
   data() {
    return {
      formPhoneNumber: '',
    };
  },
  methods: {
    phoneInputHandler(payload) {
      this.formPhoneNumber = payload?.formattedNumber;
      this.form.phoneNumber = this.formPhoneNumber;
    },
  },
  setup(_, { root }) {
    const { isDarkMode } = useUiState();
    const showToast = inject('showToast');
    const isFormSubmitted = ref(false);
    const { $vendure } = useVSFContext();
    const { cart, load } = useCart();
    const errorMessage = ref('');
    const { sendContactUs } = useContactUs();
    const { setTinNumber } = useTinNumber();

    const form = ref({
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      message: '',
      customerEmail: '',
      customerName: '',
    });

    const generateCSRFToken = () => {
      let token = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 32; i++) {
        token += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return token;
    };

    const sendMessage = async (csrfToken) => {
      // sendContactUs({
      //   phone_number: form.value.phoneNumber,
      //   first_name: form.value.firstName,
      //   last_name: form.value.lastName,
      //   email: form.value.emailAddress,
      //   message: form.value.message,
      //   customerName: form.value.customerName,
      //   customerEmail: form.value.customerEmail,
      //   csrfToken: form.value.csrfToken,
      // });
      const body = {
        query: `mutation sendMessage(
          $phone_number: String!
          $first_name: String!
          $last_name: String!
          $message: String!
          $email: String!
        ) {
          writeContactUsMessage(
            message: {
              email: $email
              firstName: $first_name
              lastName: $last_name
              phoneNumber: $phone_number
              message: $message
            }
          ) {
            id
          }
        }`,
        variables: {
          phone_number: form.value.phoneNumber,
          first_name: form.value.firstName,
          last_name: form.value.lastName,
          email: form.value.emailAddress,
          message: form.value.message,
        },
        csrfToken: root.$store.state.csrfToken.csrfToken,
      };
      const token = CryptoJS.AES.encrypt(
        root.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      showToast('Message Is SuccessFully Sent!');
      await axios.post('/api/shop', body, options);
       return root.$router.push('/');
      

      //setTinNumber({tinNumber: '09ddsifdilsjfdis'});
      // const mutation = gql`

      //    mutation sendMessage($phone_number: String!,$first_name: String!, $last_name: String!, $message: String!, $email:String!){
      //       writeContactUsMessage(message: {email: $email, firstName: $first_name,
      //                     lastName: $last_name, phoneNumber: $phone_number, message: $message}){id}
      //    }
      // `
      // const data = await axios.post('http://localhost:3000/shop-api',
      //             {query: print(mutation), variables :{
      //             phone_number: form.value.phoneNumber,
      //             first_name: form.value.firstName,
      //             last_name: form.value.lastName,
      //             email: form.value.emailAddress,
      //             message: form.value.message
      //  }});
      //  form.value = {}
      //  location.href = 'http://localhost:3001'
    };

    // const handleFormSubmit = async (csrfToken) => {
    //   sendMessage(csrfToken);
    //   // const response = await $vendure.api.setCustomerForOrder(form.value);
    //   // if (
    //   //   response?.data?.setCustomerForOrder?.errorCode ===
    //   //   EMAIL_ADDRESS_CONFLICT_ERROR
    //   // ) {
    //   //   errorMessage.value = response?.data?.setCustomerForOrder?.message;
    //   //   return;
    //   // }
    //   // root.$router.push(root.localePath({ name: "shipping" }));
    //   // isFormSubmitted.value = true;
    // };

    return {
      isDarkMode,
      isFormSubmitted,
      form,
     // handleFormSubmit,
      errorMessage,
      sendMessage,
    };
  },
 
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }
    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color: var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}

.contact-location {
  margin-top: 20px;
}

.sf-call-to-action {
  margin-bottom: 10vh !important;
}

.wrap {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1250px;
    margin: 0 auto;
  }
}
</style>
