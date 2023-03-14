<template>
  <div id="main" class="md:flex mt-8">
    <div
      class="card shadow-lg w-full md:w-2/5 font-bold p-3 rounded text-white bg-secondary md:mr-5 md:ml-10 mx-auto mx-3"
    >
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
      class="form rounded-md p-5 pl-10 w-full md:w-7/12 text-3xl mx-auto"
      :class="isDarkMode ? 'bg-dark_accent' : 'bg-light_accent'"
    >
      <h2 class="text-secondary">Write A Special Quote</h2>
      <div class="notice">
        NOTICE* If you didn't find what you want on this website, you can
        mention it here.
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(send)">
          <ValidationProvider
            name="fromEmail"
            rules="required|email"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              label="Your Contact Email"
              v-model="data.fromEmail"
              class="form__element mt-6 text-white w-[80%]"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider
            name="fromName"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              label="Company Name"
              v-model="data.fromName"
              class="form__element mt-3 text-white w-[80%]"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider
            name="subject"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              label="Subject"
              class="form__element w-[80%]"
              v-model="data.subject"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>

          <VuePhoneNumberInput
            @update="phoneInputHandler"
            required
            color="#000000"
            v-model="formPhoneNumber"
            valid-color="#3860a7"
            default-country-code="ET"
            class="specialPhone form__element form__element--half form__element--half-even my-3 w-[80%]"
          />
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
            <SfInput
              label="First Name"
              class="form__element w-[80%]"
              v-model="data.firstName"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider
            name="lastName"
            rules="required"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              label="Last Name"
              class="form__element w-[80%]"
              v-model="data.lastName"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>

          <textarea
            placeholder="Your special quote."
            cols="20"
            class="form__element tarea text-sm rounded mt-4 text-dark_accent w-[80%]"
            v-model="data.msg"
            required
          ></textarea>
          <!-- <SfButton class="btn rounded bg-secondary w-[80%]" @click="send"
          >Send</SfButton  > -->
          <div class="justify-center flex">
            <button class="btn rounded bg-secondary w-[40%]" type="submit">
              <h4 class="text-white font-bold">SEND</h4>
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
import { SfTabs, SfInput, SfButton, SfTextarea } from '@storefront-ui/vue';
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
    VuePhoneNumberInput,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      formPhoneNumber: '',
    };
  },
  methods: {
    phoneInputHandler(payload) {
      this.formPhoneNumber = payload?.formattedNumber;
      this.data.fromPhone = this.formPhoneNumber;
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
    if (isAuthenticated) {
      data.value.productDescr = user?.value?.emailAddress;
    }
    const send = () => {
      writeQuote({
        isSpecial: true,
        fromEmail: data.value.fromEmail,
        fromName: data.value.fromName,
        subject: data.value.subject,
        fromPhone: data.value.fromPhone,
        msg: data.value.msg,
        location: data.value.location,
        productDescr: data.value.productDescr,
        firstName: data.value.firstName,
        lastName: data.value.firstName,
      });
      showToast('Quote Sent!');
    };
    return { data, send, isDarkMode };
  },
};
</script>

<style scoped lang="scss">
.tarea {
  height: 140px;
  width: 91%;
  padding-bottom: 10%;
  margin-bottom: 10%;
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
    max-width: 1250px !important;
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
</style>
