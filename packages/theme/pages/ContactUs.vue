<template>
  <div>
    <div class="p-20">
      <!-- <section class="sf-call-to-action rounded" :style="style">
        <div class="sf-call-to-action__text-container">
          <slot name="title">
            <h2 class="sf-call-to-action__title">Contact Us</h2>
          </slot>
        </div>
      </section> -->
      <div class="flex">
        <div
          class="card shadow-lg w-2/3 font-bold p-3 rounded text-white bg-primary"
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
          class="card shadow-lg p-10 mx-10 rounded bg-light_accent"
        >
          <h2 class="mb-2">Contact Us</h2>
          <form @submit.prevent="handleSubmit(handleFormSubmit)">
            <div class="form">
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
                name="phoneNumber"
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
                name="emailAddress"
                rules="required"
                v-slot="{ errors }"
                slim
              >
                <SfInput
                  type="number"
                  v-e2e="'customer-emailAddress'"
                  v-model="form.phoneNumber"
                  :label="$t('Phone Number')"
                  name="phoneNumber"
                  class="form__element form__element--half form__element--half-even"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider name="companyName" v-slot="{ errors }" slim>
                <SfInput
                  v-e2e="'customer-firstName'"
                  v-model="form.customerName"
                  :label="$t('Company Name')"
                  name="company_name"
                  class="form__element form__element--half"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider
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
              </ValidationProvider>
              <ValidationProvider
                name="message"
                rules="required"
                v-slot="{ errors }"
                slim
              >
                <div class="sf-textarea">
                  <textarea
                    id="message"
                    name="message"
                    class="form__element form__element--full"
                    placeholder="Your Message"
                    v-model="form.message"
                    :cols="50"
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
                </div>
              </ValidationProvider>
            </div>

            <div class="form">
              <div class="form__action">
                <button
                  class="color-primary bg-primary px-4 py-1 rounded text-white text-xl"
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
    <div class="similar-products">
      <SfHeading title="Our Stores" :level="1" />
    </div>
    <div class="contact-location">
      <SfStoreLocator
        tileServerUrl="http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        :center="[9.035565, 38.759099]"
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
            :latlng="[9.035565, 38.759099]"
            :pictureWidth="82"
            :pictureHeight="112"
          />
          <!-- name="Ethiolab Head Office"
            address="Adwa Street, Arada Sub-city, Elsi Bldg (881/EBG 407)"
            phone="(+251) 111 264 829"
            email="info@ethiolab.et" -->
          <div class="mt-4">
            <p>Ethiolab Head Office</p>
            <p class="mb-6">
              Adwa Street, Arada Sub-city, Elsi Bldg (881/EBG 407)
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
                  <p>{{ phone }}</p>
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
                  <p class="ml-2">{{ email }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </SfStoreLocator>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfStoreLocator,
  SfBanner,
  SfIcon,
} from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';
import { ref, onMounted, inject } from '@vue/composition-api';
import { required, min, digits, email } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { useVSFContext } from '@vue-storefront/core';
import { useCart, useTinNumber, useContactUs } from '@vue-storefront/vendure';
import { EMAIL_ADDRESS_CONFLICT_ERROR } from '~/helpers';
import gql from 'graphql-tag';
import { print } from 'graphql';
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
  message: 'Please provide a valid phone number',
});

extend('email', {
  ...email,
  message: 'Invalid email',
});

export default {
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
  },

  computed: {
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
      const phone = this.companyInfo?.phone_number.split(';');
      return phone;
    },
    emails() {
      const email = this.companyInfo?.email.split(';');
      return email;
    },
  },
  setup(_, { root }) {
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

    const sendMessage = async () => {
      //     console.log("......x")
      sendContactUs({
        phone_number: form.value.phoneNumber,
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email: form.value.emailAddress,
        message: form.value.message,
        customerName: form.value.customerName,
        customerEmail: form.value.customerEmail,
      });
      showToast('Sent!');
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
      //  console.log({data})
      //  form.value = {}
      //  location.href = 'http://localhost:3001'
    };
    const handleFormSubmit = async () => {
      sendMessage();
      // const response = await $vendure.api.setCustomerForOrder(form.value);
      // if (
      //   response?.data?.setCustomerForOrder?.errorCode ===
      //   EMAIL_ADDRESS_CONFLICT_ERROR
      // ) {
      //   errorMessage.value = response?.data?.setCustomerForOrder?.message;
      //   return;
      // }
      // root.$router.push(root.localePath({ name: "shipping" }));
      // isFormSubmitted.value = true;
    };

    onMounted(async () => {
      await load();
    });

    return {
      isFormSubmitted,
      form,
      handleFormSubmit,
      errorMessage,
    };
  },
  data() {
    return {
      companyInfo: null,
    };
  },
  methods: {
    async getCompanyInfo() {
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `query companyInfo {
          getCompanyInfos {
            company_name
            email
            id
            latitude
            longitude
            phone_number
          }
        }`,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const companyInformation = await axios.post(baseUrl, body, options);
      this.companyInfo = companyInformation?.data.data?.getCompanyInfos;
      console.log('company info', this.companyInfo);
    },
  },
  mounted() {
    this.getCompanyInfo();
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
</style>
