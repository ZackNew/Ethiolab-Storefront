<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <h3 class="my-4">Shipping</h3>
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div class="form">
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-firstName'"
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
            v-e2e="'shipping-lastName'"
            v-model="form.lastName"
            :label="$t('Last name')"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="city" rules="required|min:2" slim>
          <!-- <SfInput
            v-e2e="'shipping-city'"
            v-model="form.city"
            :label="$t('City')"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          /> -->
          <select
            required
            class="bg-white rounded md:rounded-lg px-1 py-2 form__element--half selectTab mb-10"
            @change="setCity($event, cookieToken)"
          >
            <option value="" disabled selected hidden>Choose a City</option>
            <template v-for="(city, i) in cities">
              <option :key="i" :value="city" class="capitalize">
                {{ city }}
              </option>
            </template>
          </select>
        </ValidationProvider>
        <!-- <ValidationProvider name="state" slim>
          <SfInput
            v-e2e="'shipping-state'"
            v-model="form.state"
            :label="$t('Region')"
            name="state"
            class="form__element form__element--half form__element--half-even"
          />
        </ValidationProvider> -->
        <ValidationProvider name="phone">
          <!-- <SfInput
            v-e2e="'shipping-phone'"
            v-model="form.phone"
            :label="$t('Phone number')"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          /> -->
          <VuePhoneNumberInput
            @update="phoneInputHandler"
            required
            color="#000000"
            v-model="formPhoneNumber"
            valid-color="#3860a7"
            default-country-code="ET"
            class="form__element form__element--half form__element--half-even"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            v-e2e="'select-shipping'"
            v-if="!isFormSubmitted"
            :disabled="loading"
            class="bg-secondary text-white form__action-button"
            type="submit"
          >
            {{
              isSelfPickup ? 'Continue to Billing' : 'Select Shipping Method'
            }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isFormSubmitted"
        @submit="$router.push('/checkout/billing')"
        @shippingMethodSelected="displayBillingButton"
      />
      <div class="form__action">
        <SfButton
          v-if="shouldDisplayButton"
          v-e2e="'continue-to-billing'"
          class="bg-secondary text-white form__action-button"
          type="button"
          @click="$router.push(localePath({ name: 'billing' }))"
          :disabled="!shouldDisplayButton || loadingShippingProvider"
        >
          Continue to billing
        </SfButton>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import { SfHeading, SfInput, SfButton, SfSelect } from '@storefront-ui/vue';
import { ref, onMounted, inject } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import {
  useShipping,
  useShippingProvider,
  useUserShipping,
} from '@vue-storefront/vendure';
import { required, min, digits } from 'vee-validate/dist/rules';
import axios from 'axios';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {
  mapAddressFormToOrderAddress,
  COUNTRIES,
  getDefaultAddress,
  mapAddressToAddressForm,
} from '~/helpers';
import '@/helpers';

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

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    VuePhoneNumberInput,
    VsfShippingProvider: () =>
      import('~/components/Checkout/VsfShippingProvider'),
  },
  data() {
    return {
      cities: [],
      cookieToken: '',
    };
  },
  created() {
    this.getEligibleLocation();
    this.cookieToken = this.$cookies.get('etech-auth-token');
  },
  methods: {
    async getEligibleLocation() {
      let baseUrl = process.env.GRAPHQL_API;
      let body = {
        query: `
          query{
            shippingAvailableTo
          }
          `,
      };
      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await axios.post('/api/shop', body).then((res) => {
        this.cities = res.data.data.data.shippingAvailableTo;
      });
    },
  },
  setup(props, { root }) {
    const showToast = inject('showToast');
    const isFormSubmitted = ref(false);
    const { load, save, loading } = useShipping();
    const { loading: loadingShippingProvider } = useShippingProvider();
    const { shipping: userShipping, load: loadUserShipping } =
      useUserShipping();
    const shouldDisplayButton = ref(false);
    const formPhoneNumber = ref('');
    const isSelfPickup = ref(false);
    const cookieSetup = ref(null);

    const form = ref({
      firstName: '',
      lastName: '',
      // streetName: '',
      //apartment: '',
      city: '',
      state: '',
      //country: '',
      //postalCode: '',
      phone: null,
    });

    const handleFormSubmit = async () => {
      const orderAddress = mapAddressFormToOrderAddress(form.value);
      await save({ shippingDetails: orderAddress });
      if (isSelfPickup.value) {
        await setSelfPickupTrue();
      } else {
        isFormSubmitted.value = true;
      }
    };

    const setSelfPickupTrue = async () => {
      const body = {
        query: `mutation setSelfPickupAsShippingMethod {
                  setSelfPickupAsShippingMethod
                  {
                    success
                  } 
                }`,
      };

      await axios
        .post('/api/shop', body)
        .then((res) => {
          if (res.data.data.data?.setSelfPickupAsShippingMethod?.success) {
            root.$router.push(root.localePath({ name: 'billing' }));
          } else {
            showToast('Something went wrong. Try again!');
          }
        })
        .catch((err) => {});
    };

    const phoneInputHandler = (payload) => {
      formPhoneNumber.value = payload?.formattedNumber;
      form.value.phone = formPhoneNumber.value;
    };

    const displayBillingButton = async () => {
      shouldDisplayButton.value = true;
    };

    const setCity = (e, token) => {
      cookieSetup.value = token;
      if (e.target.value === 'Self Pickup') {
        isSelfPickup.value = true;
      } else {
        isSelfPickup.value = false;
      }
      form.value.city = e.target.value;
    };

    onSSR(async () => {
      await load();
    });

    onMounted(async () => {
      await loadUserShipping();
      if (userShipping.value) {
        const defaultAddress = getDefaultAddress(
          userShipping.value,
          'shipping'
        );
        const formAddress = mapAddressToAddressForm(defaultAddress);
        form.value = {
          firstName: formAddress?.firstName,
          lastName: formAddress?.lastName,
          streetName: formAddress?.streetName,
          apartment: formAddress?.streetNumber,
          city: formAddress?.city,
          state: formAddress?.state,
          country: formAddress?.country,
          postalCode: formAddress?.postalCode,
          phone: formAddress?.phone,
        };
        formPhoneNumber.value = formAddress?.phone;
      }
    });

    return {
      loading,
      isFormSubmitted,
      form,
      countries: COUNTRIES,
      formPhoneNumber,
      handleFormSubmit,
      loadingShippingProvider,
      displayBillingButton,
      phoneInputHandler,
      shouldDisplayButton,
      setCity,
      isSelfPickup,
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
.form__action-button {
  color: black;
}
.selectTab {
  max-width: 100% !important;
}
@media only screen and (min-width: 1024px) {
  .selectTab {
    max-width: 50% !important;
  }
}
</style>
