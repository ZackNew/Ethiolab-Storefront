<template>
  <div :class="{
      'theme-light': !isDarkMode,
      'theme-dark': isDarkMode,
    }">
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <AppHeader />
    </LazyHydrate>

    <div id="layout" >
      <nuxt :key="$route.fullPath"/>

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
      <categories-sidebar/>
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import CategoriesSidebar from "~/components/CategoriesSidebar";
import {useCms,useFacet} from "@vue-storefront/vendure";
import {useUiState} from "~/composables"
import {onSSR} from "@vue-storefront/core";
export default {
  name: 'DefaultLayout',

  components: {
    CategoriesSidebar,
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification
  },
  setup(){
    const {isDarkMode} = useUiState();
     const {search:searchCms}=useCms();
        const { search } = useFacet();
      onSSR(async () => {
      await search({ sort: { name: 'DESC' }, take: 8});
      await searchCms(['HERO_SECTION','POPUP','STATIC','ADVERTISEMENT',"POLICIES"])
    });
    return{isDarkMode}
  },
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
@import "./assets/styles";
#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
.sf-search-bar__input{
    border-width: 0 0 0 0;
}
.sf-header__wrapper{
  padding-top: .5em;
}
.sf-search-bar__input:focus{
  outline: none;
}
</style>
