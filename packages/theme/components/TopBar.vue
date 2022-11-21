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
          ><h1 class="text-sm text-white hover:scale-110 font-semibold">
            Help
          </h1></nuxt-link
        >
        <nuxt-link :to="'/pages/contact'"
          ><h1 class="text-sm text-white hover:scale-110 font-semibold">
            Contact us
          </h1></nuxt-link
        >
        <a href="#">
          <h1 class="text-sm text-white hover:scale-110 font-semibold">
            {{ phoneNumber }}
          </h1>
        </a>
        <a href="https://www.ethiolab.et/">
          <h1
            class="bg-white text-secondary px-2 py-0.5 rounded text-sm hover:scale-110"
          >
            Website
          </h1>
        </a>
        <nuxt-link to='/signup'>
          <h1 class="text-sm text-white hover:scale-110 flex font-semibold">
            <SfIcon icon="profile_fill" color="white" size="xs" class="mr-1" />
            MY ACCOUNT
          </h1> 
          <!-- <span class=" text-dark_gray text-sm font-bold mb-2">  
              <SfIcon icon="profile_fill" color="white" size="xs" class="mr-1" />
              MY ACCOUNT
          </span>
                         <select onChange="window.location.href=this.value"  class=" text-sm font-bold text-secondary m-1 ml-4 w-32 h-8 border border-primary bg-white font-semibold rounded">
                                <option value="#" class=" text-primary text-md font-bold ">MY ACCOUNT</option>
                                <option value="/signin" class=" text-primary text-md font-bold "> SIGN IN</option>
                                <option value="/signup" class=" text-primary text-md font-bold ">SIGN UP</option>

                        </select> -->
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
import axios from 'axios';

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
          name: this.$store.state.companyDetails.companyInformation?.phone_number?.split(
            ';'
          )[0],
          link: '#',
        },
        { name: 'Request a Quote', link: '/WriteAQuote' },
      ];
      return navigation;
    },
    phoneNumber() {
      return this.$store.state.companyDetails.companyInformation?.phone_number?.split(
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
  methods: {
    async getInfos() {
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `query{
          getCompanyInfos{
            id
            company_name
            email
            phone_number
            icon{
              preview
            }
            facebook_address
            instagram_address
            twitter_address 
            linkdin_address
            telegram_address
            youtube_address
            longtude
            latitude
            location_text  
          }
        }`,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const compy = await axios.post(baseUrl, body, options);
      const infos = compy?.data?.data?.getCompanyInfos;
      console.log('iasdnfaeisbdfia', infos);
      this.$store.commit('companyDetails/SET_COMPANY_INFORMATION', {
        company: infos,
      });
    },
  },
  created() {
    this.getInfos();
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
