<template>
  <div class="signup text-secondary">
    <h1 class="ml-[10%]">Sign In</h1>

    <div class="grid grid-cols-12 gap-4">
      <div class="left col-span-6 mt-10">
        <!-- <p>*Required</p> -->
        <div class="field pb-10">
          <h4 class="px-10 py-6 uppercase font-bold">Please Sign IN</h4>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(handleLogin)">
              <div class="m-8">
                <label
                  class="block text-dark_gray text-sm font-bold mb-2"
                  for="username"
                >
                  *EMAIL ADDRESS/USER ID
                </label>

                <ValidationProvider
                  name="username"
                  rules="required"
                  v-slot="{ errors }"
                  slim
                >
                  <SfInput
                    v-model="form.username"
                    :placeholder="$t('email')"
                    name="username"
                    class="sf-input--filled"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    type="email"
                  />
                </ValidationProvider>
                <!-- <ErrorMessage name="email" /> -->
              </div>

              <div class="m-8">
                <label
                  class="block text-dark_gray text-sm font-bold mb-2"
                  for="password"
                >
                  *PASSWORD
                </label>

                <ValidationProvider
                  name="password"
                  rules="required|min:4"
                  v-slot="{ errors }"
                  slim
                >
                  <SfInput
                    v-model="form.password"
                    :placeholder="$t('password')"
                    name="password"
                    class="sf-input--filled"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    type="password"
                  />
                </ValidationProvider>
              </div>

              <div class="justify-center flex">
                <button
                  class="bg-secondary text-white w-1/4 h-12 font-bold mb-8 but"
                  type="submit"
                >
                  SIGN IN
                </button>
                <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
              </div>
            </form>
          </ValidationObserver>

          <div class="justify-center flex">
            <nuxt-link to="forgotPassword">
              <span class="text-secondary"> Forgot Password?</span>
            </nuxt-link>
            <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
          </div>
        </div>
      </div>
      <div class="col-span-6 mt-10">
        <div class="right">
          <h4 class="px-10 py-6 uppercase font-bold">Why Register?</h4>
          <h4 class="px-10">Register today and enjoy these benefits</h4>
          <ul class="mx-16 my-4">
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

          <h4 class="px-16 pt-10">Don't hava an account?</h4>
          <div class="mx-16">
            <nuxt-link to="/signup">
              <button
                class="bg-secondary text-white w-1/3 h-12 font-bold mb-8 but"
              >
                REGISTER
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
import { defineComponent } from '@vue/composition-api';
import { ref, onMounted, inject, reactive } from '@vue/composition-api';
import { required, min, digits, email } from 'vee-validate/dist/rules';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  ErrorMessage,
} from 'vee-validate';
import axios from 'axios';
import { SfInput } from '@storefront-ui/vue';
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
  },
  setup() {
    const form = ref({});
    const { register, login, loading, error: userError } = useUser();
    const showToast = inject('showToast');

    const error = reactive({
      login: null,
      register: null,
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };

    const handleForm = (fn) => async () => {
      console.log('login is clicked form is ', form);
      resetErrorValues();
      await fn({ user: form.value });

      const hasUserErrors = userError.value.register || userError.value.login;

      if (hasUserErrors) {
        error.login = userError.value.login?.message;
        error.register = userError.value.register?.message;
        if ((userError.value.errorCode = 'INVALID_CREDENTIALS_ERROR')) {
          showToast(error.login);
        } else {
          showToast('Error occured while trying to login.');
        }
        return;
      }
      // if (isSubscribe.value === true) {
      // }
      // isSubscribe.value ? onSubscribe() : '';
      // toggleLoginModal();
      showToast('login successfull');

      window.location.href = '/';
    };

    const handleLogin = async () => handleForm(login)();

    return {
      handleLogin,
      form,
    };
  },
});
</script>

<style scoped lang="scss">
.signup {
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
  min-height: 500px;
  background-color: white;
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
