<template>
  <div>
    <div class="flex bg-secondary">
      <div class="flex flex-1 justify-between items-center max-w-4xl mx-auto">
        <NuxtLink to="/pages/helpAndFAQ/" class="hover:scale-105 text-white"
          >Help</NuxtLink
        >
        <NuxtLink to="/pages/contact" class="hover:scale-105 text-white"
          >Contact Us</NuxtLink
        >
        <NuxtLink to="#" class="hover:scale-105 text-white">{{
          phoneNumber
        }}</NuxtLink>
        <a
          href="https://ethiolab.et/"
          target="_blank"
          class="px-2 bg-white text-secondary rounded-sm hover:scale-105"
          ><span>Website</span></a
        >
        <NuxtLink
          :to="isAuthenticated ? '/my-account' : '/signin'"
          class="hover:scale-105 text-white"
        >
          My Account
        </NuxtLink>
      </div>
      <div class="flex">
        <ThemeChanger class="text-white"></ThemeChanger>
      </div>
    </div>
  </div>
</template>

<script>
import { useUser } from '@vue-storefront/vendure';
import ThemeChanger from './ThemeChanger.vue';

export default {
  components: { ThemeChanger },
  computed: {
    phoneNumber() {
      return this.$store.state.companyDetails.companyInformation?.phone_number?.split(
        ';'
      )[0];
    },
  },
  setup() {
    const { isAuthenticated } = useUser();

    return {
      isAuthenticated,
    };
  },
};
</script>
