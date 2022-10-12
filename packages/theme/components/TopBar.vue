<template>
  <SfTopBar class="topbar">
    <template #left>
      <!-- <SfButton class="topbar__button sf-button--text">+251-111-264-829</SfButton> -->
    </template>
    <template #center>
      <div class="flex items-center gap-20">
        <!-- <DropdownNavigationItem
          v-for="category in headerNavigation"
          :key="category.name"
          class="nav-item"
          v-e2e="`app-header-${category.name}`"
          :label="category.name"
          :link="localePath(category.link)"
          :link-class="category.linkClass"
          :button="category.button"
        /> -->
        <nuxt-link :to="'/pages/helpAndFAQ/'"
          ><p class="text-xl text-white hover:scale-110">Help</p></nuxt-link
        >
        <nuxt-link :to="'/pages/contact'"
          ><p class="text-xl text-white hover:scale-110">
            Contact us
          </p></nuxt-link
        >
        <a href="#">
          <p class="text-xl text-white hover:scale-110">{{ phoneNumber }}</p>
        </a>
        <a href="https://www.ethiolab.et/">
          <p
            class="bg-white text-secondary px-2 py-0.5 rounded text-sm hover:scale-110"
          >
            Website
          </p>
        </a>
        <nuxt-link :to="'#'">
          <p class="text-xl text-white hover:scale-110 flex">
            <SfIcon icon="profile_fill" color="white" size="xs" class="mr-1" />
            MY ACCOUNT
          </p>
        </nuxt-link>
      </div>
    </template>
    <template #right>
      <LocaleSelector />
      <ThemeChanger />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar, SfIcon } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector.vue';
import DropdownNavigationItem from '~/components/DropdownNavigationItem.vue';
import ThemeChanger from './ThemeChanger.vue';

export default {
  components: {
    ThemeChanger,
    SfTopBar,
    SfButton,
    LocaleSelector,
    DropdownNavigationItem,
    SfIcon,
  },
  computed: {
    headerNavigation() {
      const navigation = [
        { name: 'Help', link: '/pages/helpAndFAQ' },
        { name: 'Contact us', link: '/pages/contact' },
        {
          name: this.$store.state.companyDetails.companyInformation?.phone_number.split(
            ';'
          )[0],
          link: '#',
        },
        { name: 'Request a Quote', link: '/WriteAQuote' },
      ];
      return navigation;
    },
    phoneNumber() {
      return this.$store.state.companyDetails.companyInformation?.phone_number.split(
        ';'
      )[0];
    },
  },
  setup() {
    // const headerNavigation = [
    //   { name: 'Help', link: '/pages/helpAndFAQ' },
    //   { name: 'Contact us', link: '/pages/contact' },
    //   { name: '(+251) 940 02 44 02', link: '#' },
    //  { name: 'Request a Quote', link: '/WriteAQuote'}
    // ];
    // return {
    //   headerNavigation,
    // };
  },
  created() {
    this.$store.dispatch('companyDetails/getCompanyInfo');
  },
};
</script>
<style lang="scss" scoped>
.sf-button--text {
  color: white;
}
.nav-item {
  white-space: nowrap;
  align-items: center;
  font-size: larger;
}
.nav-item:hover {
  transform: scale(1.1);
}
.topbar {
  background-color: var(--c-bg-secondary);
  color: white;
  position: relative;
  // max-width: var(--sf-topbar-width, 770.5rem)!important;
  --sf-topbar-width: 90%;
  z-index: 2;
  &__button {
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
