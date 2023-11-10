<template>
  <SfModal :visible="isNewsletterModalOpen" class="modal" @close="closeModal">
    <template #modal-bar>
      <SfBar
        class="modal__title smartphone-only subs"
        :close="true"
        :title="$t('Subscribe to newsletter')"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div class="subs">
        <SfHeading
          :level="3"
          :title="$t('Subscribe to newsletter')"
          class="modal__title desktop-only"
        />
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(emailSubmitted)">
            <ValidationProvider
              name="FullName"
              rules="required"
              v-slot="{ errors }"
              slim
            >
              <SfInput
                type="Name"
                :label="$t('Full Name')"
                v-model="FullName"
                class="modal__input"
                required
              />
              <p id="error">{{ errors[0] }}</p>
            </ValidationProvider>
            <ValidationProvider
              name="email"
              rules="required|email"
              v-slot="{ errors }"
              :valid="!errors[0]" 
              slim
            >
              <SfInput
                type="email"
                :label="$t('Email address')"
                v-model="emailAddress"
                class="modal__input"
                :valid="!errors[0]"
                required
              />
              <p id="error">{{ errors[0] }}</p>
            </ValidationProvider>
            <ValidationProvider
              name="CompanyName"
              rules="required"
              v-slot="{ errors }"
              :valid="!errors[0]"
              slim
            >
              <SfInput
                type="Name"
                :label="$t('Company Name')"
                v-model="CompanyName"
                class="modal__input"
                :valid="!errors[0]"
                required
              />
              <p id="error">{{ errors[0] }}</p>
            </ValidationProvider>
            <SfButton class="modal__button confirm_btn" type="submit">
              I confirm subscription
            </SfButton>
          </form>
        </ValidationObserver>
        <SfHeading description="You can unsubscribe at any time" :level="3" />
        <SfScrollable
          maxContentHeight="3.75rem"
          :class="{ 'is-open text-center': !isHidden }"
        >
          <!--          <i18n tag="p"  class="modal__content" path="subscribeToNewsletterModalContent">-->
          <SfLink
            v-if="!isHidden"
            link="https://www.etechsc.com/privacy-policy"
            >{{ $t('Privacy Policy') }}</SfLink
          >
          <!--          </i18n>-->
          <template #view-all>
            <SfButton
              class="sf-button--text sf-scrollable__view-all desktop-only"
              @click="isHidden = !isHidden"
            >
              <span>{{ isHidden ? 'show more' : 'hide' }}</span>
            </SfButton>
          </template>
        </SfScrollable>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import {
  SfModal,
  SfHeading,
  SfInput,
  SfButton,
  SfScrollable,
  SfBar,
  SfLink,
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'This field is required',
});
extend('email', {
  ...email,
  message: 'Invalid email',
});
export default {
  name: 'NewsletterModal',
  components: {
    SfModal,
    SfHeading,
    SfInput,
    SfButton,
    SfScrollable,
    SfBar,
    SfLink,
    ValidationObserver,
    ValidationProvider,
  },
  data(){
    return{errors:[]};
  },
  methods: {
    emailSubmitted(event) {
      this.$emit('submitted', {
        emailAddress: this.emailAddress,
        FullName: this.FullName,
        CompanyName: this.CompanyName,
        event: event,
      });
      this.emailAddress = '';
      this.FullName = '';
      this.CompanyName = '';
    },
  },
  setup() {
    const { isNewsletterModalOpen, toggleNewsletterModal } = useUiState();

    const isHidden = ref(true);
    const emailAddress = ref('');
    const FullName = ref('');
    const CompanyName = ref('');

    const closeModal = () => {
      toggleNewsletterModal();
    };

    return {
      isNewsletterModalOpen,
      toggleNewsletterModal,
      isHidden,
      emailAddress,
      FullName,
      CompanyName,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.confirm_btn {
  color: white;
  background-color: var(--c-primary);
}
.modal {
  display: flex;
  justify-content: center;
  --modal-index: 3;
  --overlay-z-index: 3;
  --modal-content-padding: var(--spacer-xl);
  &__input,
  .sf-input__label {
    --input-font-size: var(--font-size--base);
    --input-label-font-size: var(--font-size--base);
  }
  &__button {
    margin: 0 auto;
  }
  &__content {
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--light);
  }
  .sf-scrollable__view-all.sf-button {
    font-weight: var(--font-weight--light);
  }
}
</style>
