<template>
  <div id="main" class="md:flex mt-8">
    <div
      class="card shadow-lg w-full md:w-2/5 font-bold p-5 rounded border border-[#a1a1a1] md:mr-5 md:ml-10 mx-auto"
    >
      <h3 class="mb-5 text-secondary">Request a Quote</h3>
      <div
        class="mt-5 p-3"
        :class="isDarkMode ? 'bg-dark_accent' : 'bg-[#f1f1f1]'"
      >
        <p :class="isDarkMode ? 'text-[#ffffff]' : 'text-dark_accent'">
          Follow these steps to request a quote and our team will get back to
          you.
        </p>
        <div class="mt-16 px-5">
          <div
            class="mb-3 flex p-3"
            :class="isDarkMode ? 'bg-[#1d2f33]' : 'bg-[#E1E1E1]'"
          >
            <div class="circleBg bg-secondary relative">
              <div class="icon-container">
                <SfIcon
                  icon="added_to_cart"
                  size="lg"
                  color="white"
                  viewBox="0 0 24 24"
                  :coverage="1"
                />
              </div>
            </div>
            <p
              class="my-auto"
              :class="isDarkMode ? 'text-[#ffffff]' : 'text-dark_accent'"
            >
              Add Items To Your Cart
            </p>
          </div>
          <div
            class="mb-3 flex p-3"
            :class="isDarkMode ? 'bg-[#1d2f33]' : 'bg-[#E1E1E1]'"
          >
            <div class="circleBg bg-secondary relative">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                />
              </svg>
            </div>

            <p
              class="my-auto"
              :class="isDarkMode ? 'text-[#ffffff]' : 'text-dark_accent'"
            >
              Click Request a quote from the Bottom.
            </p>
          </div>
          <div
            class="mb-10 flex p-3"
            :class="isDarkMode ? 'bg-[#1d2f33]' : 'bg-[#E1E1E1]'"
          >
            <div class="circleBg bg-secondary relative">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7 text-white mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </div>

            <p
              class="my-auto"
              :class="isDarkMode ? 'text-[#ffffff]' : 'text-dark_accent'"
            >
              Click send!
            </p>
          </div>
        </div>
        <p
          class="mt-8"
          :class="isDarkMode ? 'text-[#ffffff]' : 'text-dark_accent'"
        >
          or fill the form if you have a special quote
        </p>
      </div>
    </div>
    <!-- <div class="p-3">
      <h4 class="text-6xl mb-5 mt-10 font-bold">Request a Quote</h4>
      <p class="mt-5">
        Follow this steps to request a quote and out team will get back to you.
      </p>
      <div class="ml-10 mt-16">
        <div class="mb-3 flex">
          <img class="w-10 h-10 mr-3" src="~/assets/add.png" />
          <p>Add Items To Your Cart</p>
        </div>
        <div class="mb-3 flex">
          <img class="w-10 h-10 mr-3" src="~/assets/click.png" />
          <p>Click Request a quote from the Bottom.</p>
        </div>
        <div class="mb-10 flex">
          <img class="w-8 h-8 mr-5" src="~/assets/send.png" />
          <p>Click send!</p>
        </div>
      </div>
      <p class="mt-8">or fill the form if you have a special quote</p>
    </div> -->
    <div
      id="left"
      class="form rounded-md p-5 pl-10 w-full md:w-7/12 text-3xl mx-auto border border-[#a1a1a1]"
      :class="isDarkMode ? 'bg-dark_accent' : 'bg-light_accent'"
    >
      <h3 class="text-secondary">Write A Special Quote</h3>
      <div class="notice mb-6">
        NOTICE* If you didn't find what you want on this website, you can
        mention it here.
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(validphone(send))">
          <ValidationProvider
            name="fromEmail"
            rules="required|email"
            v-slot="{ errors }"
            slim
          >
            <!-- <SfInput
              label="Your Contact Email"
              v-model="data.fromEmail"
              class="form__element mt-6 text-white w-[80%]"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />  -->
            <label
              for="email"
              class="text-sm uppercase"
              :class="isDarkMode ? 'text-white' : 'text-dark_accent'"
              >Your Contact Email</label
            >
            <input
              id="email"
              type="text"
              v-model="data.fromEmail"
              class="w-[80%] mt-1 border text-sm px-1 py-2"
              :class="
                isDarkMode
                  ? 'bg-dark_accent border-light_accent text-white'
                  : 'bg-light_accent border-dark_accent text-dark_accent'
              "
            />
            <h3 v-if="errors" class="text-[#dd0000] text-xs mt-1">
              {{ errors[0] }}
            </h3>
          </ValidationProvider>
          <ValidationProvider
            name="fromName"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <!-- <SfInput
              label="Company Name"
              v-model="data.fromName"
              class="form__element mt-3 text-white w-[80%]"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            /> -->
            <label
              for="company-name"
              class="text-sm uppercase"
              :class="isDarkMode ? 'text-white' : 'text-dark_accent'"
              >Company Name</label
            >
            <br />
            <input
              id="company-name"
              type="text"
              v-model="data.fromName"
              class="w-[80%] mt-1 border border-dark_accent text-sm px-1 py-2"
              :class="
                isDarkMode
                  ? 'bg-dark_accent border-[#ffffff] text-white'
                  : 'bg-light_accent border-dark_accent text-dark_accent'
              "
            />
            <h3 v-if="errors" class="text-[#dd0000] text-xs mt-1">
              {{ errors[0] }}
            </h3>
          </ValidationProvider>

          <ValidationProvider
            name="subject"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <!-- <SfInput
              label="Subject"
              class="form__element w-[80%]"
              v-model="data.subject"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            /> -->
            <label
              for="subject"
              class="text-sm uppercase"
              :class="isDarkMode ? 'text-white' : 'text-dark_accent'"
              >Subject</label
            >
            <br />
            <input
              id="subject"
              type="text"
              v-model="data.subject"
              class="w-[80%] mt-1 border border-dark_accent text-sm px-1 py-2"
              :class="
                isDarkMode
                  ? 'bg-dark_accent border-[#ffffff] text-white'
                  : 'bg-light_accent border-dark_accent text-dark_accent'
              "
            />
            <h3 v-if="errors" class="text-[#dd0000] text-xs mt-1">
              {{ errors[0] }}
            </h3>
          </ValidationProvider>
          <ValidationProvider name="phone" slim>
          <label
            for="phoneNumber"
            class="text-sm uppercase"
            :class="isDarkMode ? 'text-white' : 'text-dark_accent'"
            >Phone Number</label
          >
          <VuePhoneNumberInput
            id="phoneNumber"
            @update="phoneInputHandler"
            required
            color="red"
            :valid="isPhoneValid"
            v-model="formPhoneNumber"
            valid-color="#3860a7"
            default-country-code="ET"
            class="specialPhone form__element form__element--half form__element--half-even my-3 w-[80%]"
          />
          </ValidationProvider>
          <!-- <SfInput
          label="Phone Number"
          class="form__element w-[80%]"
          v-model="data.fromPhone"
          /> -->

          <ValidationProvider
            name="firstName"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <!-- <SfInput
              label="First Name"
              class="form__element w-[80%]"
              v-model="data.firstName"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            /> -->
            <label
              for="fname"
              class="text-sm uppercase"
              :class="isDarkMode ? 'text-white' : 'text-dark_accent'"
              >First Name</label
            >
            <br />
            <input
              id="fname"
              type="text"
              v-model="data.firstName"
              class="w-[80%] mt-1 border border-dark_accent text-sm px-1 py-2"
              :class="
                isDarkMode
                  ? 'bg-dark_accent border-[#ffffff] text-white'
                  : 'bg-light_accent border-dark_accent text-dark_accent'
              "
            />
            <h3 v-if="errors" class="text-[#dd0000] text-xs mt-1">
              {{ errors[0] }}
            </h3>
          </ValidationProvider>

          <ValidationProvider
            name="lastName"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <!-- <SfInput
              label="Last Name"
              class="form__element w-[80%]"
              v-model="data.lastName"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            /> -->
            <label
              for="lname"
              class="text-sm uppercase"
              :class="isDarkMode ? 'text-white' : 'text-dark_accent'"
              >Last Name</label
            >
            <br />
            <input
              id="lname"
              type="text"
              v-model="data.lastName"
              class="w-[80%] mt-1 border border-dark_accent text-sm px-1 py-2"
              :class="
                isDarkMode
                  ? 'bg-dark_accent border-[#ffffff] text-white'
                  : 'bg-light_accent border-dark_accent text-dark_accent'
              "
            />
            <h3 v-if="errors" class="text-[#dd0000] text-xs mt-1">
              {{ errors[0] }}
            </h3>
          </ValidationProvider>

          <label
            for="quote"
            class="text-sm uppercase"
            :class="isDarkMode ? 'text-white' : 'text-dark_accent'"
            >Your Quote</label
          >
          <br />
          <textarea
            id="quote"
            placeholder="Your special quote."
            cols="20"
            class="tarea text-sm rounded mt-4 w-[80%]"
            :class="
              isDarkMode
                ? 'bg-dark_accent border-light_accent text-[#ffffff]'
                : 'bg-light_accent border-dark_accent'
            "
            v-model="data.msg"
            required
          ></textarea>
          <!-- <SfButton class="btn rounded bg-secondary w-[80%]" @click="send"
          >Send</SfButton  > -->
          <div>
            <button class="btn bg-secondary w-[40%] py-2" type="submit">
              <h4 class="text-white font-bold text-base">SEND</h4>
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import { useUiState } from '~/composables';
import {
  SfTabs,
  SfInput,
  SfButton,
  SfTextarea,
  SfIcon,
} from '@storefront-ui/vue';
import { useUser, userGetters, useQuote } from '@vue-storefront/vendure';
import { ref, inject } from '@vue/composition-api';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  ErrorMessage,
} from 'vee-validate';
import {
  required,
  min,
  digits,
  email,
  regex,
  max,
} from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'This field is required',
});
extend('email', {
  ...email,
  message: 'Invalid email',
});
export default {
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfTextarea,
    SfIcon,
    VuePhoneNumberInput,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      formPhoneNumber: '',
      isPhoneValid : false,
    };
  },
  methods: {
    phoneInputHandler(payload) {
      this.isPhoneValid = payload?.isValid;
      this.formPhoneNumber = payload?.formattedNumber;
      this.data.fromPhone = this.formPhoneNumber;
    },
    validphone(){
      if (!this.isPhoneValid) {
        this.showToast('Please provide a valid phone number');
        return;
      } else {
        this.send();
      }
    },
  },
  setup() {
    const { isDarkMode } = useUiState();
    const showToast = inject('showToast');
    const { writeQuote } = useQuote();
    const { isAuthenticated, load: loadUser, user } = useUser();
    const data = ref({
      fromName: '',
      fromEmail: '',
      subject: '',
      fromPhone: '',
      msg: '',
      location: '',
      productDescr: '',
      firstName: '',
      lastName: '',
    });
    const resetForm = () => {
      data.value = {
        fromName: '',
        fromEmail: '',
        subject: '',
        fromPhone: '',
        msg: '',
        location: '',
        productDescr: '',
        firstName: '',
        lastName: '',
      };
      
    };
    if (isAuthenticated) {
      data.value.productDescr =
        user?.value?.emailAddress || data?.value?.fromEmail;
    }
    const send = () => {
      writeQuote({
        isSpecial: true,
        fromEmail: data.value.fromEmail,
        companyName: data.value.fromName,
        subject: data.value.subject,
        fromPhone: data.value.fromPhone,
        msg: data.value.msg,
        location: data.value.location,
        productDescr: data.value.productDescr,
        firstName: data.value.firstName,
        lastName: data.value.firstName,
      });
      showToast('Quote Sent!');
      resetForm();
    };
    return { data, send, isDarkMode,showToast};
  },
};
</script>

<style scoped lang="scss">
.tarea {
  height: 140px;
  width: 91%;
  padding: 5px;
  border-style: solid !important;
  border: 1px;
}
.btn {
  width: 100%;
}
/*
.box-order{
   border: 2px grey solid;
} */
.notice {
  color: red;
  font-style: italic;
  font-size: 0.7rem;
}

#main {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1150px !important;
    padding: 0;
    margin: 0 auto;
  }
}
/*
#main{
    display: grid;
    grid-template-columns: 4;
    position: relative;
    left: 8%;
    top: 12%;
   grid-gap: 2%;
}
#right{
   grid-column: 4/4;
   border: 1px;
   border: 1px grey solid;
   padding: 5%;
   background-color: white;
}
#middle{
   grid-column: 2/3;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

 
}
#left{
    grid-column: 1/1;
     border: 1px;
     padding: 0%;
     border: 1px grey solid;
       padding: 5%;
   background-color: white;
}
#or{
   justify-content: center;
   color: black;

   font-weight: bold;
}
img{
   width: 15%;
   display: inline;
}
.img_descr{
   padding-top: 8%;
  
} */
.circleBg {
  min-width: 73px;
  min-height: 73px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
}
</style>
