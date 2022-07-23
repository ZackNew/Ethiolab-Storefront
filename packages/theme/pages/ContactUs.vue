
<template>
  <div>
    <section class="sf-call-to-action" :style="style">
      <div class="sf-call-to-action__text-container">
        <slot name="title">
          <h2 class="sf-call-to-action__title">Contact Us</h2>
        </slot>
      </div>
    </section>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }">
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
                class="
                  form__element form__element--half form__element--half-even
                "
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
                :label='$t("Email")'
                name="email"
                class="form__element form__element--half"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <ValidationProvider
              name="emailAddress"
              rules="required|phone"
              v-slot="{ errors }"
              slim
            >
              <SfInput
                v-e2e="'customer-emailAddress'"
                v-model="form.phoneNumber"
                :label="$t('Phone Number')"
                name="phoneNumber"
                class="
                  form__element form__element--half form__element--half-even
                "
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
                class="color-primary"
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
    <div class="similar-products">
        <SfHeading title="Our Stores" :level="1" />
      </div>
    <div class="contact-location">
      <SfStoreLocator
        tileServerUrl="http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        :center="[9.035565, 38.759099]"
        :zoom="6"
        :maxZoom="16"
        :markerIconSize="[28, 28]"
        :markerIconAnchor="[10.5, 0]"
        :mapOptions="{}"
        :tileLayerOptions="{}"
        :markerOptions="{}"
        :flyToStoreZoom="15"
      >
        <SfStore
          :latlng="[9.035565, 38.759099]"
          name="Ethiolab Head Office"
          :pictureWidth="82"
          :pictureHeight="112"
          address="Adwa Street, Arada Sub-city, Elsi Bldg (881/EBG 407)"
          phone="(+251) 111 264 829"
          email="info@ethiolab.et"
        />
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
} from "@storefront-ui/vue";
import LazyHydrate from "vue-lazy-hydration";
import { ref, onMounted } from "@vue/composition-api";
import { required, min, digits, email } from "vee-validate/dist/rules";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { useVSFContext } from "@vue-storefront/core";
import { useCart, useTinNumber, useContactUs } from "@vue-storefront/vendure";
import { EMAIL_ADDRESS_CONFLICT_ERROR } from "~/helpers";
import gql from 'graphql-tag';
import { print } from 'graphql';
import axios from 'axios'

extend("required", {
  ...required,
  message: "This field is required",
});
extend("min", {
  ...min,
  message: "The field should have at least {length} characters",
});
extend("digits", {
  ...digits,
  message: "Please provide a valid phone number",
});

extend("email", {
  ...email,
  message: "Invalid email",
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
    LazyHydrate,
  },

  computed: {
    style() {
      //   const image = this.image;
      //   const background = this.background;
      return {
        "--_call-to-action-background-image": `url("")`,
        "--_call-to-action-background-desktop-image": `url("")`,
        "--_call-to-action-background-color": "#005FB7",
        margin: "var(--spacer-xl) auto var(--spacer-2xl)",
      };
    },
  },
  setup(_, { root }) {
    const isFormSubmitted = ref(false);
    const { $vendure } = useVSFContext();
    const { cart, load } = useCart();
    const errorMessage = ref(""); 
    const {sendContactUs} = useContactUs();
    const {setTinNumber} = useTinNumber()

    const form = ref({
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      message: ""
    });
     
     const sendMessage = async () =>{
       console.log("......x")
       sendContactUs({
                  phone_number: form.value.phoneNumber,
                  first_name: form.value.firstName,
                  last_name: form.value.lastName,
                  email: form.value.emailAddress,  
                  message: form.value.message})
       setTinNumber({tinNumber: '09ddsifdilsjfdis'});
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
      
     }  
     const handleFormSubmit = async () => {
         sendMessage()
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

