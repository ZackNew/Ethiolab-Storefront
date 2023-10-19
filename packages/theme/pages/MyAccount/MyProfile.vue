<template>
  <div class="myTabs">
    <h3 class="text-secondary font-bold mb-[3%]">My Profile</h3>
    <!-- <hr class="mb-4" /> -->
    <SfTabs :open-tab="1">
      <!-- Personal data update -->
      <SfTab class="profileTabs" title="Personal data">
        <p class="message text-secondary">
          {{ $t('Feel free to edit') }}
        </p>
        <ProfileUpdateForm @submit="updatePersonalData" />
        <p class="notice text-secondary">
          {{ $t('Use your personal data') }}
          <a href="">{{ $t('Privacy Policy') }}</a>
        </p>
      </SfTab>
      <!-- Email update -->
      <SfTab class="profileTabs" title="Email data">
        <p class="message text-secondary">
          {{ $t('Feel free to edit') }}
        </p>

        <EmailUpdateForm @submit="updateEmailData" />

        <p class="notice text-secondary">
          {{ $t('Use your personal data') }}
          <a href="">{{ $t('Privacy Policy') }}</a>
        </p>
      </SfTab>
      <!-- Password reset -->
      <SfTab class="profileTabs" title="Password change">
        <p class="message text-secondary">
          {{ $t('Change password your account') }}:<br />
          {{ $t('Your current email address is') }}
          <span v-e2e="'myaccount-message-email'" class="message__label">
            {{ currentEmail }}
          </span>
        </p>
        <PasswordResetForm @submit="updatePassword" />
      </SfTab>
      <SfTab class="profileTabs" title="Address">
        <h4 class="text-secondary text-lg">Change Your Address:</h4>
        <SfInput
          class="max-w-[60%] grid-cols-2"
          placeholder="Your Phone number"
          v-model="addressForm.phoneNumber"
          @keypress="handleKeyPress"
        />
        <SfInput
          class="max-w-[60%] grid-cols-2"
          placeholder="Your Country"
          v-model="addressForm.country"
          onKeyPress="if(this.value.length==10) return false;"
        />
        <SfInput
          class="max-w-[60%] grid-cols-2"
          placeholder="Your State "
          v-model="addressForm.state"
        />
        <SfInput
          class="max-w-[60%] grid-cols-2"
          placeholder="Your City "
          v-model="addressForm.city"
        />
        <SfInput
          class="max-w-[60%] grid-cols-2"
          placeholder="Your Street number"
          v-model="addressForm.streetLine1"
        />
        <SfInput
          class="max-w-[60%]"
          placeholder="Your tin number"
          v-model="addressForm.tin"
        />
        <SfInput
          class="max-w-[60%] grid-cols-2"
          placeholder="Your fax number"
          v-model="addressForm.fax"
        />
        <span
          class="max-w-[50%] grid-cols-2 text-secondary text-sm font-bold mb-2"
        >
          JOB FUNCTION</span
        >
        <select
          v-model="addressForm.job"
          class="text-sm font-bold mb-2 ml-4 w-1/3 h-10 border border-primary"
        >
          <option value="Adminstrative">Adminstrative</option>
          <option value="Calibration">Calibration</option>
          <option value="Purchasing">Purchasing</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Engineer">Engineer</option>
          <option value="Equipment Technician">Equipment Technician</option>
          <option value="Executive/Director">Executive/Director</option>
          <option value="Healthcare Professional">
            Healthcare Professional
          </option>
          <option value="Human Resources">Human Resources</option>
          <option value="Laboratory/R&D">Laboratory/R&D</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Operations/Plant Management">
            Operations/Plant Management
          </option>
          <option value="Owner">Owner</option>
          <option value="Production Maintenance">Production Maintenance</option>
          <option value="Production Management">Production Management</option>
          <option value="Quality Assurance/Control">
            Quality Assurance/Control
          </option>
          <option value="Safety">Safety</option>
          <option value="Student">Student</option>
          <option value="Researcher">Researcher</option>
        </select>
        <SfButton class="bg-secondary" @click="updateAddress"
          >Update Address</SfButton
        >
      </SfTab>
    </SfTabs>
  </div>
</template>
<script>
import { extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm';
import EmailUpdateForm from '~/components/MyAccount/EmailUpdateForm';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/vendure';
import {
  onMounted,
  watchEffect,
  ref,
  inject,
  reactive,
} from '@vue/composition-api';
import gql from 'graphql-tag';
import { print } from 'graphql';
import axios from 'axios';
import CryptoJS from 'crypto-js';

extend('email', {
  ...email,
  message: 'Invalid email',
});

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});

extend('password', {
  validate: (value) =>
    String(value).length >= 8 &&
    String(value).match(/[A-Za-z]/gi) &&
    String(value).match(/[0-9]/gi),
  message:
    'Password must have at least 8 characters including one letter and a number',
});

extend('confirmed', {
  ...confirmed,
  message: "Passwords don't match",
});

export default {
  methods: {
    handleKeyPress(event) {
      const inputChar = String.fromCharCode(event.charCode);
      if (!/^\d+$/.test(inputChar) && inputChar !== '+') {
        event.preventDefault(); 
      }
      if (this.addressForm.phoneNumber.length === 0 && inputChar === ' ') {
        event.preventDefault(); 
      }
      if (this.addressForm.phoneNumber.length >= 13 && event.key !== 'Backspace') {
        event.preventDefault(); 
      }
    },
  },
  middleware: ['csrf'],
  name: 'PersonalDetails',
  onMounted() {},
  components: {
    SfTabs,
    SfInput,
    SfButton,
    ProfileUpdateForm,
    PasswordResetForm,
    EmailUpdateForm,
  },
  setup(_, { root }) {
    const token = CryptoJS.AES.encrypt(
      root.$store.state.csrfToken.csrfToken,
      'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
    ).toString();
    const showToast = inject('showToast');
    const { updateUser, changePassword, user, load, updateEmail } = useUser();
    const tinNumber = ref('');
    const addressForm = reactive({
      phoneNumber: '',
      country: '',
      state: '',
      city: '',
      streetLine1: '',
      fax: '',
      job: '',
      tin: '',
    });
    const currentEmail = userGetters.getEmailAddress(user.value);
    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };
    function getCookie(cname) {
      let name = cname + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
    const updatePersonalData = ({ form, onComplete, onError }) => {
      formHandler(() => updateUser({ user: form.value }), onComplete, onError);
      showToast('Updated Succcessfully!');
    };
    const updateAddress = async () => {
      const body = {
        query: `
          mutation updateAddress(
            $city: String
            $country: String
            $fax: String
            $id: ID!
            $job: String
            $phoneNumber: String
            $postalCode: String
            $state: String
            $streetLine1: String
            $streetLine2: String
            $company: String
            $tin: String
          ) {
            updateEtechCustomer(
              input: {
                id: $id
                city: $city
                country: $country
                fax: $fax
                job: $job
                phoneNumber: $phoneNumber
                postalCode: $postalCode
                state: $state
                streetLine1: $streetLine1
                streetLine2: $streetLine2
                company: $company
                tin:  $tin
              }
            ) {
              success
            }
          }
        `,
        variables: {
          phoneNumber: addressForm.phoneNumber,
          country: addressForm.country,
          state: addressForm.state,
          city: addressForm.city,
          streetLine1: addressForm.streetLine1,
          fax: addressForm.fax,
          job: addressForm.job,
          tin: addressForm.tin,
          id: user.value.id,
        },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      await axios.post(process.env.GRAPHQL_API, body, options).then((res) => {
        console.log(res);
        showToast('Updated Succcessfully!');
      });
    };

    const updateEmailData = ({ form, onComplete, onError }) => {
      formHandler(
        () =>
          updateEmail({
            password: form.value.password,
            newEmail: form.value.email,
          }),
        onComplete,
        onError
      );
      showToast('Updated Succcessfully!');
    };
    const updatePassword = ({ form, onComplete, onError }) => {
      formHandler(
        () =>
          changePassword({
            currentPassword: form.value.currentPassword,
            newPassword: form.value.newPassword,
          }),
        onComplete,
        onError
      );
      showToast('Updated Succcessfully!');
    };
    onMounted(async () => {
      await load();
      addressForm.phoneNumber = user.value.phoneNumber;
      addressForm.country = user.value.addresses[0].country.name;
      addressForm.state = user.value.addresses[0].province;
      addressForm.city = user.value.addresses[0].city;
      addressForm.streetLine1 = user.value.addresses[0].streetLine1;
      addressForm.fax = user.value.addresses[0].customFields.fax;
      addressForm.job = user.value.customFields.job;
      addressForm.tin = user.value.customFields.tin_number;
    });
    return {
      currentEmail,
      updatePersonalData,
      updatePassword,
      updateEmailData,
      user,
      addressForm,
      updateAddress,
    };
  },
};
</script>

<style lang="scss" scoped>
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}
hr {
  color: lightgray;
}
</style>
