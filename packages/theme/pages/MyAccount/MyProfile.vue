<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab title="Personal data">
      <p class="message">
        {{ $t('Feel free to edit') }}
      </p>
   
      <ProfileUpdateForm @submit="updatePersonalData" />
     

      <p class="notice">
        {{ $t('Use your personal data') }}
        <a href="">{{ $t('Privacy Policy') }}</a>
      </p>
    </SfTab>

    <!-- Email update -->
    <SfTab title="Email data">
      <p class="message">
        {{ $t('Feel free to edit') }}
      </p>

      <EmailUpdateForm @submit="updateEmailData" />

      <p class="notice">
        {{ $t('Use your personal data') }}
        <a href="">{{ $t('Privacy Policy') }}</a>
      </p>
    </SfTab>

    <!-- Password reset -->
    <SfTab title="Password change">
      <p class="message">
        {{ $t('Change password your account') }}:<br />
        {{ $t('Your current email address is') }}
        <span
          v-e2e="'myaccount-message-email'"
          class="message__label"
        >
          {{currentEmail}}
        </span>
      </p>

      <PasswordResetForm @submit="updatePassword" />
    </SfTab>
    <SfTab title="Tin Number">
          Tin Number: <SfInput pplaceholder="Your tin number" v-model="tinNumber"/>
          <SfButton @click="updateTinNumber">Update Tin Number</SfButton>
    </SfTab>
  </SfTabs>
</template>

<script>
import { extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm';
import EmailUpdateForm from '~/components/MyAccount/EmailUpdateForm';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/vendure';
import { onMounted,watchEffect,ref, inject } from '@vue/composition-api';
import gql from 'graphql-tag';
import { print } from 'graphql';
import axios from 'axios'

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('password', {
  validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
  message: 'Password must have at least 8 characters including one letter and a number'
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match'
});

export default {
  name: 'PersonalDetails',
  onMounted(){
      
  },
  components: {
    SfTabs,
    SfInput,
    SfButton,
    ProfileUpdateForm,
    PasswordResetForm,
    EmailUpdateForm
  },

  setup() {
    const showToast = inject('showToast')
    const { updateUser, changePassword, user, load, updateEmail } = useUser();
    const tinNumber = ref('');
    const currentEmail = userGetters.getEmailAddress(user.value);
    console.log("user=",JSON.stringify( user.value))
    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };
    function getCookie(cname) {
        console.log('Getting ' +  cname)
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
     }
    console.log("user", JSON.stringify(user.value))

    const updatePersonalData = ({ form, onComplete, onError }) => formHandler(() => updateUser({ user: form.value }), onComplete, onError);
    const updateEmailData = ({ form, onComplete, onError }) => formHandler(() => updateEmail({ password: form.value.password, newEmail: form.value.email }), onComplete, onError);
    const updatePassword = ({ form, onComplete, onError }) => formHandler(() => changePassword({ currentPassword: form.value.currentPassword, newPassword: form.value.newPassword }), onComplete, onError);

    onMounted(async () => {
      await load();
         const query =    gql`{
        activeCustomer{
            customFields {
                tin_number
            }
            user{
                id
                
            }
            
        }
      }`
    console.log("Token=", getCookie('etech-auth-token'))
    let baseUrl = process.env.GRAPHQL_API
    axios.post(baseUrl, 
    {query: print(query),},
    {headers:{
      'Authorization': 'Bearer ' + getCookie('etech-auth-token')
    }}
    
    )
    
    .then(data =>{
            tinNumber.value = data.data.data.activeCustomer.customFields.tin_number
             console.log(data.data.data.activeCustomer.customFields.tin_number)
             
    }, )
    });
    const updateTinNumber  = async()=>{
      try{
         showToast('Updated!')
              const query 
              =    gql`mutation upd($tinNumber: String!){
                    updateCustomer(input: {
                       # id: $id,
                        customFields: {
                          tin_number: $tinNumber
                        }

                    }){
                      id
                    }
              }`
            console.log("Token=", getCookie('etech-auth-token'))
            let baseUrl = process.env.GRAPHQL_API
            axios.post(baseUrl, 
            {query: print(query),variables: {tinNumber: tinNumber.value, }},
            {headers:{
              'Authorization': 'Bearer ' + getCookie('etech-auth-token')
            }
            }
           
            
            )
    }catch(e){
      console.log(JSON.stringify(e))
    }}

    return {
      tinNumber,
      currentEmail,
      updatePersonalData,
      updatePassword,
      updateEmailData,
      updateTinNumber,
      user
    };
  }
}
</script>

<style lang='scss' scoped>
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

</style>
