<template>
  <div class="forgotPW text-secondary">
    <h1 class="ml-[15%]">Forgot Password</h1>

    <div class="grid grid-cols-12 gap-4">
      <div class="left col-span-6 mt-10">
        <!-- <p>*Required</p> -->
        <div class="field" v-if="emailReset">
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

              <SfButton type="submit" class="bg-secondary m-auto">
                <SfLoader
                  :class="{ loader: forgotPasswordLoading }"
                  :loading="forgotPasswordLoading"
                >
                  <div>{{ $t('Get Code') }}</div>
                </SfLoader>
              </SfButton>
            </form>
          </ValidationObserver>
          <button class="text-secondary font-bold" @click="handleHaveCode">
            Already have a code?
          </button>
        </div>

        <div class="field" v-else>
          <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
            <form
              class="form justify-center"
              @submit.prevent="handleSubmit(handleReset)"
            >
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  v-e2e="'forgot-modal-email'"
                  v-model="tokenValue"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="tokenValue"
                  :label="$t('Token Value')"
                  class="form__element width-[80%]"
                />
              </ValidationProvider>

              <ValidationProvider
                :rules="{
                  required: true,
                  min: 6,
                  regex:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
                }"
                name="password"
                v-slot="{ errors }"
                slim
              >
                <!-- <SfInput
                  v-e2e="'forgot-modal-email'"
                  v-model="password"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="password"
                  :label="$t('New Password')"
                  class="form__element width-[80%]"
                  type="password"
                /> -->
                <div class="relative mb-5">
                  <svg
                    v-if="!isPassword"
                    @click="isPassword = !isPassword"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 absolute left-[92%] mt-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg
                    v-else
                    @click="isPassword = !isPassword"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 absolute left-[92%] mt-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>

                  <input
                    v-model="password"
                    :type="isPassword ? 'password' : 'text'"
                    name="password"
                    class="w-full border-b bg-[#f3f3f3] border-primary h-8 passwordInput"
                    placeholder="New Password"
                  />
                  <h3
                    v-if="errors"
                    class="absolute text-[#dd0000] text-xs mt-1"
                  >
                    {{ errors[0] }}
                  </h3>
                </div>
              </ValidationProvider>

              <ValidationProvider
                :rules="{
                  required: true,
                  min: 6,
                }"
                name="Confirm password"
                v-slot="{ errors }"
                slim
              >
                <!-- <SfInput
                  v-e2e="'forgot-modal-email'"
                  v-model="confirm_password"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="Confirm password"
                  :label="$t('Confirm Password')"
                  class="form__element width-[80%]"
                  type="password"
                /> -->
                <div class="relative">
                  <svg
                    v-if="!confirmIsPassword"
                    @click="confirmIsPassword = !confirmIsPassword"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 absolute left-[92%] mt-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg
                    v-else
                    @click="confirmIsPassword = !confirmIsPassword"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 absolute left-[92%] mt-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>

                  <input
                    v-model="confirm_password"
                    :type="confirmIsPassword ? 'password' : 'text'"
                    name="password"
                    class="w-full border-b bg-[#f3f3f3] border-primary h-8 passwordInput"
                    placeholder="Confirm Password"
                  />
                </div>
                <h3 v-if="errors" class="absolute text-[#dd0000] text-xs mt-1">
                  {{ errors[0] }}
                </h3>
              </ValidationProvider>

              <SfButton type="submit" class="bg-secondary mx-auto mt-10">
                <SfLoader
                  :class="{ loader: forgotPasswordLoading }"
                  :loading="forgotPasswordLoading"
                >
                  <div>{{ $t('Reset Password') }}</div>
                </SfLoader>
              </SfButton>
            </form>
          </ValidationObserver>
          <button class="text-secondary font-bold" @click="handleNotReceived">
            Didn`t get the code?
          </button>
        </div>
      </div>
      <div class="col-span-6 mt-10">
        <div class="right">
          <h4 class="px-10 py-6 uppercase font-bold">Why Register?</h4>
          <h4 class="px-10">Register today and enjoy these benefits</h4>
          <RegisterMessage />

          <div class="mx-8 float-left w-1/3">
            <h4 class="pt-3">Don't have an account?</h4>
            <nuxt-link to="/signup">
              <button
                class="bg-secondary text-white w-full h-14 font-bold rounded"
              >
                REGISTER
              </button>
            </nuxt-link>
            <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
          </div>

          <div class="mx-4 float-left">
            <h4 class="pt-3">Already have an account?</h4>
            <nuxt-link to="/signin">
              <button
                class="bg-secondary text-white w-full h-14 font-bold rounded"
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
import RegisterMessage from '../components/RegisterMessage.vue';
import axios from 'axios';
import CryptoJS from 'crypto-js';
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
    RegisterMessage,
  },
  setup(props, { root }) {
    const showToast = inject('showToast');
    const {
      request,
      error: forgotPasswordError,
      loading: forgotPasswordLoading,
      setNew,
      result: forgotPasswordResult,
    } = useForgotPassword();
    const token = CryptoJS.AES.encrypt(
      root.$store.state.csrfToken.csrfToken,
      'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
    ).toString();

    const isPassword = ref(true);
    const confirmIsPassword = ref(true);
    const userEmail = ref('');
    const tokenValue = ref('');
    const password = ref('');
    const confirm_password = ref('');

    let emailReset = ref(true);

    const handleForgotten = async () => {
      emailReset.value = false;
      await request({ email: userEmail.value }).then((res) => {});
      if (forgotPasswordError.value.request !== null) {
        showToast('Code Is Not Sent!');
      } else {
        showToast('A password reset token has been sent to your email');
      }
      // if (!forgotPasswordError.value.request) {
      //   setCurrentScreen(SCREEN_THANK_YOU);
      // }
    };

    const handleNotReceived = async () => {
      emailReset.value = true;
    };
    const handleHaveCode = async () => {
      emailReset.value = false;
    };
    const handleReset = async () => {
      const body = {
        query: `
            mutation resetPassword(
              $token: String!
             $password: String!) 
            {
              resetPassword(
                token: $token
                password: $password)
              {
                ... on NotVerifiedError {
                  __typename
                  errorCode
                  message
                }
                ... on NativeAuthStrategyError {
                  __typename
                  errorCode
                  message
                }
                ... on PasswordValidationError {
                  __typename
                  errorCode
                  message
                  validationErrorMessage
                }
                ... on PasswordResetTokenExpiredError {
                  __typename
                  errorCode
                  message
                }
                ... on PasswordResetTokenInvalidError {
                  __typename
                  errorCode
                  message
                }
                ... on CurrentUser {
                  id
                }
              }
            }`,
        variables: {
          token: tokenValue.value,
          password: password.value,
        },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      if (password.value == confirm_password.value) {
        await axios.post(process.env.GRAPHQL_API, body, options).then((res) => {
            showToast('Password Resetted Successfully!');
            return root.$router.push('/signin');
        });
      } else {
        showToast('Password should be the same as confirm password');
      }
    };
    return {
      forgotPasswordLoading,
      handleForgotten,
      userEmail,
      emailReset,
      handleNotReceived,
      handleReset,
      tokenValue,
      password,
      handleHaveCode,
      confirm_password,
      isPassword,
      confirmIsPassword,
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
input {
  color: black;
  padding: 7px;
}
input:focus {
  outline: none;
}
input,
input::-webkit-input-placeholder {
  font-size: 11.5px;
  line-height: 4;
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
