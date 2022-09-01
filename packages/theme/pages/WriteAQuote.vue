<template>
  <div id="main" class="flex mt-8 mx-24">
    <div
      class="card shadow-lg w-21/3 font-bold p-3 rounded text-white bg-primary mr-5"
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
    <div id="left" class="form rounded-md p-5 w-9/12 text-3xl bg-light_accent">
      Write A Special Quote
      <div class="notice">
        NOTICE* If you didn't find what you want on this website, you can
        mention it here.
      </div>
      <SfInput
        label="Your Contact Email"
        v-model="data.fromEmail"
        class="form__element mt-3 text-white"
      />
      <SfInput label="Subject" class="form__element" v-model="data.subject" />

      <SfInput
        label="Phone Number"
        class="form__element"
        v-model="data.fromPhone"
      />
      <SfInput
        label="First Name"
        class="form__element"
        v-model="data.firstName"
      />

      <SfInput
        label="Last Name"
        class="form__element text-light_accent"
        v-model="data.lastName"
      />
      <textarea
        placeholder="Your special quote."
        cols="20"
        class="form__element tarea text-sm rounded mt-4 text-dark_accent"
        v-model="data.msg"
      ></textarea>
      <SfButton class="btn rounded bg-secondary" @click="send">Send</SfButton>
    </div>
  </div>
</template>

<script>
//import {}
import { SfTabs, SfInput, SfButton, SfTextarea } from '@storefront-ui/vue';
import { useUser, userGetters, useQuote } from '@vue-storefront/vendure';
import { ref } from '@vue/composition-api';
export default {
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfTextarea,
  },
  setup() {
    const { writeQuote } = useQuote();
    const data = ref({
      fromEmail: '',
      subject: '',
      fromPhone: '',
      msg: '',
      location: '',
      productDescr: '',
      firstName: '',
      lastName: '',
    });
    const send = () => {
      console.log({ data });
      writeQuote({
        isSpecial: true,
        fromEmail: data.value.fromEmail,

        subject: data.value.subject,
        fromPhone: data.value.fromPhone,
        msg: data.value.msg,
        location: data.value.location,
        productDescr: '',
      });
    };
    return { data, send };
  },
};
</script>

<style scoped>
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
