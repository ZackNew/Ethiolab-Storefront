<template>
  <div class="forgotPW text-secondary">
    <h1 class="ml-[15%]">Forgot Password</h1>

    <div class="grid grid-cols-12 gap-4">
      <div class="left col-span-6 mt-10">
        <!-- <p>*Required</p> -->
        <div class="field">
          <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
            <form
              class="form justify-center"
              @submit.prevent="handleSubmit(handleForgotten)"
            >
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <SfInput
                  v-e2e="'forgot-modal-email'"
                  v-model="userEmail"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="email"
                  :label="$t('Forgot Password Modal Email')"
                  class="form__element width-[80%]"
                />
              </ValidationProvider>
              <!-- <div v-if="forgotPasswordError.request">
                {{ forgotPasswordError.request.message }}
              </div> -->
              <SfButton type="submit" class="width-[80%] bg-secondary">
                <!-- Reset Password -->
                <SfLoader
                  :class="{ loader: forgotPasswordLoading }"
                  :loading="forgotPasswordLoading"
                >
                  <div>{{ $t('Reset Password') }}</div>
                </SfLoader>
              </SfButton>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <div class="col-span-6 mt-10">
        <div class="right">
          <h4 class="px-10 py-6 uppercase font-bold">Why Register?</h4>
          <h4 class="px-10">Register today and enjoy these benefits</h4>
          <ul class="mx-3 md:mx-16 my-4">
            <li class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-secondary font-bold"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span
                >Full account records, order history, invoices & tracking</span
              >
            </li>
            <li class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-secondary font-bold"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span>Wishlist organized saved items to order later</span>
            </li>
            <li class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-secondary font-bold"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span>Create & track quotes</span>
            </li>
            <li class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-secondary font-bold"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span>Keep a record of payment transactions</span>
            </li>
            <li class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-secondary font-bold"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span>Discounts & special packages</span>
            </li>
          </ul>

          <h4 class="px-16 pt-3">Don't have an account?</h4>
          <div class="mx-16">
            <nuxt-link to="/signup">
              <button
                class="bg-secondary text-white w-1/3 h-14 font-bold rounded"
              >
                REGISTER
              </button>
            </nuxt-link>
            <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
          </div>
          <h4 class="px-16 pt-3">Already have an account?</h4>
          <div class="mx-16">
            <nuxt-link to="/signin">
              <button
                class="bg-secondary text-white w-1/3 h-14 font-bold mb-8 rounded"
              >
                SIGN IN
              </button>
            </nuxt-link>
            <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '~/components/Toast.vue';
import { defineComponent } from '@vue/composition-api';
import { ref, onMounted, inject, reactive } from '@vue/composition-api';
import { required, min, digits, email } from 'vee-validate/dist/rules';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  ErrorMessage,
} from 'vee-validate';
import { SfInput, SfButton, SfLoader } from '@storefront-ui/vue';
import { useUser, useForgotPassword } from '@vue-storefront/vendure';
import { useUiState } from '~/composables';
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
export default defineComponent({
  components: {
    ValidationProvider,
    ValidationObserver,
    SfInput,
    ErrorMessage,
    SfButton,
    SfLoader,
  },
  setup() {
    const showToast = inject('showToast');
    const {
      request,
      error: forgotPasswordError,
      loading: forgotPasswordLoading,
    } = useForgotPassword();

    const userEmail = ref('');

    const handleForgotten = async () => {
      await request({ email: userEmail.value });
      showToast('A password reset link has been sent to your email');
      // if (!forgotPasswordError.value.request) {
      //   setCurrentScreen(SCREEN_THANK_YOU);
      // }
    };

    return {
      forgotPasswordLoading,
      handleForgotten,
      userEmail,
    };
  },
});
</script>

<style scoped lang="scss">
.forgotPW {
  min-height: 100vh;
  margin-top: 50px !important;
  font-weight: 500;

  @include for-desktop {
    max-width: 1250px !important;
    margin: auto;
  }
}

// .left{
// float:left;
// width: 50%;
// }

// .right{
//     float: left;

// }

.field {
  min-height: 300px;
  background-color: white;
  padding: 5%;
  margin: 0px auto;
}

.right {
  min-height: 400px;
  background-color: white;
  font-size: large;
  top: 0px;
  position: sticky;
}
.register {
  background-color: rgb(81, 180, 16);
}

// ul li::before {
//   content: "✅";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
//   color: red; /* Change the color */
//   font-weight: bold; /* If you want it to be bold */
//   display: inline-block; /* Needed to add space between the bullet and the text */
//   width: 1em; /* Also needed for space (tweak if needed) */
//   margin-right: 1em; /* Also needed for space (tweak if needed) */
// }
.but {
  position: relative;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.but:after {
  content: '';
  background: #ffffff;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}

.but:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}
</style>
