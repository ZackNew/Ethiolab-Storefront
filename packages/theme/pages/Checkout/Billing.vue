<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'billing-heading'"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <h3 class="my-4">Billing</h3>
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <SfCheckbox
        v-e2e="'copy-address'"
        :selected="sameAsShipping"
        @change="handleCheckSameAddress"
        :label="$t('Copy address data from shipping')"
        name="copyShippingAddress"
        class="form__element"
      />
      <div class="form">
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-firstName'"
            v-model="billingDetails.firstName"
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
            v-e2e="'billing-lastName'"
            v-model="billingDetails.lastName"
            :label="$t('Last name')"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="city"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-city'"
            v-model="billingDetails.city"
            :label="$t('City')"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="phone" slim>
          <!-- <SfInput
            v-e2e="'billing-phone'"
            v-model="billingDetails.phone"
            :label="$t('Phone number')"
            name="phone"
            class="form__element form__element--half phone-number"
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
        <ValidationProvider name="street-line-1" slim>
          <SfInput
            v-e2e="'billing-streetLine1'"
            v-model="billingDetails.streetLine1"
            :label="$t('Tin')"
            name="tin"
            class="form__element form__element--half max-w-[50%]"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            class="sf-button bg-secondary form__back-button"
            type="button"
            @click="$router.push('/checkout/shipping')"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-e2e="'continue-to-payment'"
            class="bg-secondary text-white form__action-button"
            type="submit"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox,
} from '@storefront-ui/vue';
import { ref, onMounted } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import {
  useBilling,
  useShipping,
  useUserBilling,
  useCart,
} from '@vue-storefront/vendure';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {
  mapAddressFormToOrderAddress,
  mapOrderAddressToAddressForm,
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
  name: 'Billing',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    VuePhoneNumberInput,
  },
  // data() {
  //   return {
  //     formPhoneNumber: '',
  //   };
  // },
  // methods: {
  //   phoneInputHandler(payload) {
  //     this.formPhoneNumber = payload?.formattedNumber;
  //     this.billingDetails.phone = this.formPhoneNumber;
  //   },
  // },
  // mounted() {
  //   this.formPhoneNumber = this.billingDetails.phone || '';
  // },
  setup(props, context) {
    const { load, save, billing } = useBilling();
    const { cart, load: loadCart, setCart, applyCoupon } = useCart();
    const { shipping: shippingDetails, load: loadShipping } = useShipping();
    const { billing: userBilling, load: loadUserBilling } = useUserBilling();
    const billingDetails = ref(billing.value || {});
    const formPhoneNumber = ref('');
    let oldBilling = null;

    const sameAsShipping = ref(false);

    const handleCheckSameAddress = async () => {
      sameAsShipping.value = !sameAsShipping.value;
      if (sameAsShipping.value) {
        if (!shippingDetails.value) {
          await loadShipping();
        }
        oldBilling = { ...billingDetails.value };
        billingDetails.value = {
          ...mapOrderAddressToAddressForm(shippingDetails.value),
        };
        formPhoneNumber.value = shippingDetails.value?.phoneNumber;
        return;
      }

      billingDetails.value = mapOrderAddressToAddressForm(oldBilling);
    };

    const phoneInputHandler = (payload) => {
      formPhoneNumber.value = payload?.formattedNumber;
      billingDetails.value = {
        ...billingDetails.value,
        phone: formPhoneNumber.value,
      };
    };

    const form = ref({
      firstName: '',
      lastName: '',
      //streetName: '',
      //apartment: '',
      city: '',
      state: '',
      //country: '',
      //postalCode: '',
      streetLine1: '',
      phone: null,
    });

    const handleFormSubmit = async () => {
      const orderAddress = mapAddressFormToOrderAddress(billingDetails.value);
      await save({ billingDetails: orderAddress });
      context.root.$router.push('/checkout/payment');
      sameAsShipping.value = false;
      setCart();
    };

    onSSR(async () => {
      await load();
    });

    onMounted(async () => {
      await loadUserBilling();
      const defaultAddress = getDefaultAddress(userBilling.value, 'billing');
      const formAddress = mapAddressToAddressForm(defaultAddress);
      billingDetails.value = {
        firstName: defaultAddress?.fullName.split(' ')[0],
        lastName: defaultAddress?.fullName.split(' ')[1],
        streetLine1: defaultAddress?.streetLine1,
        apartment: defaultAddress?.streetLine1,
        city: defaultAddress?.city,
        state: defaultAddress?.province,
        country: defaultAddress?.country?.name,
        postalCode: defaultAddress?.postalCode,
        phone: defaultAddress?.phoneNumber,
      };
      formPhoneNumber.value = defaultAddress?.phoneNumber;
      loadCart();
      billingDetails.value.streetLine1 =
        cart.value?.customer?.customFields?.tin_number;
    });

    return {
      form,
      countries: COUNTRIES,
      handleFormSubmit,
      sameAsShipping,
      handleCheckSameAddress,
      billingDetails,
      phoneInputHandler,
      formPhoneNumber,
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.form {
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
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button,
  &__back-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        --button-margin: 0;
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
      color: white;
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__back-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-lg) 0;
    border: 1px solid var(--c-light);
    border-width: 1px 0;
  }
}
.payment-method {
  --radio-container-align-items: center;
  --ratio-content-margin: 0 0 0 var(--spacer-base);
  --radio-label-font-size: var(--font-base);
  --radio-background: transparent;
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  --radio-background: transparent;
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}

.phone-number {
  width: 17.5% !important;
}

.form__action-button {
  color: black;
}
</style>
