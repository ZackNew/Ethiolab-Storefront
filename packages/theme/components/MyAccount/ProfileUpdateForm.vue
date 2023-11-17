<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form class="form" @submit.prevent="handleSubmit(updatePersonalData(reset))">
      <div class="form__vertical">
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-e2e="'myaccount-firstName'"
            v-model="ProfileUpdateForm.firstName"
            name="firstName"
            label="First Name"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-e2e="'myaccount-lastName'"
            v-model="ProfileUpdateForm.lastName"
            name="lastName"
            label="Last Name"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" class="form__element">
          <SfInput
            v-model="ProfileUpdateForm.company"
            name="Company"
            label="Company"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" class="form__element">
          <SfInput
            v-model="ProfileUpdateForm.tin"
            name="Tin-Number"
            label="TIN Number"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <span
          class="max-w-[50%] grid-cols-2 text-secondary text-sm font-bold mb-2"
        >
          JOB FUNCTION</span
        >
        <select
          v-model="ProfileUpdateForm.job"
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
        <ValidationProvider
          rules="required"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            name="PhoneNumber"
            label="Phone Number"
            :errorMessage="errors[0]"
            v-model="ProfileUpdateForm.phoneNumber"
            required
          />
        </ValidationProvider>
      </div>

      <SfButton
        v-e2e="'myaccount-update-personal-data-btn'"
        class="bg-secondary w-[33%] py-3"
      >
        <h4 class="text-white font-bold text-base">UPDATE PERSONAL DATA</h4>
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { ref, onMounted , inject ,reactive} from '@vue/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { useUser, userGetters } from '@vue-storefront/vendure';
import { SfInput, SfButton } from '@storefront-ui/vue';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { extend, required, min } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});
export default {
  name: 'ProfileUpdateForm',
  components: {
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver,
  },

  setup(_, { root, }) {
     const { user, load } = useUser();
    const token = CryptoJS.AES.encrypt( 
      root.$store.state.csrfToken.csrfToken,
      'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
    ).toString();
    const showToast = inject('showToast');
    const ProfileUpdateForm = reactive({
      firstName: '',
      lastName: '',
      company: '',
      tin: '',
      job: '',
      phoneNumber: '',
    });
    const updatePersonalData = async () => {
      const body = {
        query: `
          mutation updatePersonalData(
            $id: ID!
            $job: String
            $phoneNumber: String
            $company: String
            $tin: String
            $firstName : String
            $lastName : String
          ) {
            updateEtechCustomer(
              input: {
                id: $id
                firstName: $firstName
                lastName: $lastName
                job: $job
                phoneNumber: $phoneNumber
                company: $company
                tin:  $tin
            
              }
            ) {
              success
            }
          }
        `,
        variables: {
          phoneNumber: ProfileUpdateForm.phoneNumber,
          job: ProfileUpdateForm.job,
          tin: ProfileUpdateForm.tin,
          company: ProfileUpdateForm.company,
          firstName: ProfileUpdateForm.firstName,
          lastName: ProfileUpdateForm.lastName,
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
        showToast('Updated Succcessfully!');
      });
    };

    // const resetForm = () => ({
    //   firstName: userGetters.getFirstName(user.value),
    //   lastName: userGetters.getLastName(user.value),
    // });

    // const form = ref(resetForm());

    // const submitForm = (resetValidationFn) => {
    //   return () => {
    //     const onComplete = () => {
    //       form.value = resetForm();
    //       resetValidationFn();
    //     };

    //     const onError = () => {
    //       // TODO: Handle error
    //     };

    //     emit('submit', { form, onComplete, onError });
    //   };
    // };

    onMounted(async () => {
      await load();
      ProfileUpdateForm.phoneNumber = user.value.phoneNumber;
      ProfileUpdateForm.job = user.value.customFields.job;
      ProfileUpdateForm.tin = user.value.customFields.tin_number;
      ProfileUpdateForm.company = user.value.customFields.company;
      ProfileUpdateForm.firstName = user.value.firstName;
      ProfileUpdateForm.lastName = user.value.lastName;

      // form.value = resetForm();
    });

    return {
      //form,
    //  submitForm,
      ProfileUpdateForm,
      updatePersonalData,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  &__element {
    display: block;
    margin: 0 0 var(--spacer-lg) 0;
  }
  &__button {
    display: block;
    width: 100%;
    @include for-desktop {
      width: 17.5rem;
    }
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-2xl);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
