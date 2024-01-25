<template>
  <SfModal
    id="qu-pop"
    v-on:close="toggleQuotationDialog()"
    title="Request A Quote"
    :visible="isQuoteModalOpen"
    isOpen="Boolean(showQuotation)"
    class="quoteWrite"
    :persistent="true"
    overlay
  >
    {{ pId }}
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      "
    >
      <span class="block text-md"
        >This form will take objects from your cart</span
      >
      <h2
        class="font-bold text-secondary"
        style="justify-self: center; font-size: 2em"
      >
        Request a Quote
      </h2>
      <SfInput
        v-model="qTitle"
        placeholder="Subject"
        :valid="Boolean(isSubjectValid)"
        errorMessage="This is a required field"
      />
      <SfInput
        v-model="qPhone"
        placeholder="Your Phone number"
        :valid="Boolean(isPhoneValid)"
        errorMessage="Invalid Phone number"
      />

      <SfInput
        v-model="qEmail"
        placeholder="Your Email"
        :valid="Boolean(isEmailValid)"
        errorMessage="This is a required field"
      />
      <SfInput
        v-model="qfromName"
        placeholder="Company Name"
        :valid="Boolean(isCompanyValid)"
        errorMessage="This is a required field"
      />
      <SfTextarea
        cols="95"
        rows="7"
        v-model="qBody"
        id="t-area"
        placeholder="message"
        :valid="Boolean(isMessageValid)"
        errorMessage="This is a required field"
      />
      <span style="color: red" class="text-red-500" v-if="!isLocationValid"
        >Invalid location please make sure it's in Ethiopia</span
      >
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-bottom: 2px;
        "
      >
        <SfButton @click="sendQuote" class="bg-secondary">Submit!</SfButton>
        <SfButton @click="toggleQuotationDialog()" class="bg-secondary"
          >Close</SfButton
        >
      </div>
    </div>
  </SfModal>
</template>

<script>
import { useUiState } from '~/composables';
import { computed, ref, watchEffect, inject } from '@vue/composition-api';
import { SfInput, SfModal, SfTextarea, SfButton } from '@storefront-ui/vue';
import {
  useCart,
  useUser,
  cartGetters,
  useQuote,
} from '@vue-storefront/vendure';
import test from '~/composables/test';
import gql from 'graphql-tag';
import { print } from 'graphql';

import product from '~/tests/e2e/pages/product';
export default {
  name: 'RequestAQuote',
  components: {
    SfModal,
    SfTextarea,
    SfInput,
    SfButton,
  },
  props: {
    pId: {
      type: [String, Number],
    },
  },
  // props: [pId],
  setup(props, context) {
    console.log('))))))))))))))))))))))))))))');
    console.log("props.pId", props.pId);
    // const variantId = context.root.$route.params.vid;
    const qfromName = ref('');
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const isSubjectValid = ref(true);
    const isCompanyValid = ref(true);
    const isPhoneValid = ref(true);
    const isMessageValid = ref(true);
    const isLocationValid = ref(true);
    const isEmailValid = ref(true);
    const { isAuthenticated, load: loadUser, user } = useUser();

    const showToast = inject('showToast');
    const { writeQuote } = useQuote();

    const { isQuoteModalOpen, toggleQuoteModal, toggleCartSidebar } =
      useUiState();
    const qTitle = ref(''),
      qEmail = ref(''),
      qBody = ref(''),
      qPhone = ref(''),
      formattedMessage = ref('');
    const cities = ['Addis Ababa', 'Adama', 'Mekele', 'Gondar', 'Bahir Dar'];
    const { cart } = useCart();
    const quoteCity = ref(cities[0]);
    let quoteShow = ref(false);
    let showQuotations = computed(
      () => (quoteShow.value = props.showQuotation)
    );

    function telephoneCheck(str) {
      return /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(
        str
      );
    }
    const checkInputs = () => {
      isEmailValid.value = validateEmail(qEmail.value);
      isLocationValid.value = cities.indexOf(quoteCity.value) != -1;
      isPhoneValid.value = telephoneCheck(qPhone.value);
      isMessageValid.value = qBody.value.length > 0;
      formattedMessage.value =
        qBody.value.length > 0 ? qBody.value.replace(/\n/g, '<br>') : '';
      isSubjectValid.value = qTitle.value.length > 0;
      isCompanyValid.value = qfromName.value.length > 0;

      return (
        isEmailValid.value &&
        isSubjectValid.value &&
        isPhoneValid.value &&
        isLocationValid.value &&
        isEmailValid.value &&
        isMessageValid.value &&
        formattedMessage.value &&
        isCompanyValid.value
      );
    };
    //  watchEffect(checkInputs);
    const toggleQuotationDialog = () => {
      toggleCartSidebar();
      toggleQuoteModal();
    };
    const sendQuote = () => {
      if (!checkInputs()) return;

      //fetch("data: ",qTitle.value, " ", qEmail.value, " ", qBody.value, " ", qPhone.value, quoteCity.value)

      const items = cartGetters.getItems(cart.value);
      let descr = '';
      if (isAuthenticated) {
        descr = user?.value?.emailAddress;
      }
      let pIds = [];
      if(props.pId) {
        pIds = [props.pId];
      } else {
        cart?.value?.lines.forEach((product) => {
          pIds.push(String(product?.productVariant?.id));
        });
      }

      writeQuote({
        msg: formattedMessage.value,
        subject: qTitle.value,
        fromEmail: qEmail.value,
        fromPhone: qPhone.value,
        location: quoteCity.value,
        productDescr: descr || '',
        productIds: pIds,
        companyName: qfromName.value,
      });
      showToast('Sent!');
      toggleQuoteModal();
    };
    return {
      isSubjectValid,
      isPhoneValid,
      isEmailValid,
      isMessageValid,
      isLocationValid,
      isCompanyValid,
      toggleCartSidebar,
      toggleQuotationDialog,
      isQuoteModalOpen,
      showQuotations,
      quoteCity,
      quoteShow,
      sendQuote,
      qBody,
      qEmail,
      qTitle,
      qPhone,
      cities,
      qfromName,
      formattedMessage,
      // variantId,
    };
  },
};
</script>

<style lang="scss" scoped>
#qu-pop {
  --modal-width: 60vw;
  /* width: 70%; */
  --modal-height: 50vh;
  --modal-padding: 0;
  padding: 0;
  border-radius: 15px !important;
}
.no-scrollbar::-webkit-scrollbar {
  width: 30px;
  background-color: none;
  width: 7px;
}
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #acacac;
  border-radius: 100px;
}
</style>
