<template>
  <div
    :class="{
      'theme-light': !isDarkMode,
      'theme-dark': isDarkMode,
    }"
    id="whole"
  >
    <div class="bg-white">
      <LazyHydrate when-visible>
        <TopBar class="desktop-only" />
      </LazyHydrate>
      <LazyHydrate when-idle>
        <AppHeader />
      </LazyHydrate>
    </div>

    <div id="layout">
      <nuxt :key="$route.fullPath" />

      <ToastVue :show="isToastVisible" :message="toastMessage" />
      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
      <!-- <categories-sidebar /> -->
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import ToastVue from '~/components/Toast.vue';
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import CategoriesSidebar from '~/components/CategoriesSidebar';
import { useCms, useFacet, useUser } from '@vue-storefront/vendure';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import Toast from '~/components/Toast.vue';
import { computed, ref, watchEffect, provide } from '@vue/composition-api';
export default {
  name: 'DefaultLayout',
  // middleware: "themeChecker",

  components: {
    ToastVue,
    CategoriesSidebar,
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
    Toast,
  },

  setup() {
    const { load: loadUser } = useUser();

    const { isDarkMode } = useUiState();
    const { search: searchCms } = useCms();
    const { search } = useFacet();
    const isToastVisible = ref(false);
    const toastMessage = ref('');
    function showToast(msg) {
      toastMessage.value = msg;
      isToastVisible.value = true;

      setTimeout(() => {
        closeToast();
      }, 100);
    }
    function closeToast() {
      isToastVisible.value = false;
    }
    provide('closeToast', closeToast);
    provide('showToast', showToast);
    loadUser().then(() => {
      //this.$router.go(0)
    });

    onSSR(async () => {
      await search({ sort: { name: 'DESC' }, take: 8 });
      await searchCms([
        'HERO_SECTION',
        'POPUP',
        'STATIC',
        'ADVERTISEMENT',
        'POLICIES',
      ]);
    });
    return { isDarkMode, isToastVisible, showToast, toastMessage };
  },
};
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';
@import './assets/styles';
#whole {
  @include for-desktop {
    max-width: 100% !important;
    margin: auto;
    background-color: #f0f7fc;
  }
}
#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 100% !important;
    margin: auto;
  }
}
.custom-bg {
  background-color: var(--c-secondary) !important;
}
:root {
  --font-family--secondary: 'Roboto' !important;
  --font-family--primary: 'Roboto Slab' !important;
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
.sf-search-bar__input {
  border-width: 0 0 0 0;
}
.sf-header__wrapper {
  padding-top: 0.5em;
}
.sf-accordion-item__header {
  background-color: #a5c4ea;
  box-shadow: 0 4px 8px 0 rgba(128, 122, 122, 0.2),
    0 6px 20px 0 rgba(139, 134, 134, 0.19);
  font-size: x-large;
  color: white;
  border-radius: 1rem;
  min-width: 106%;
  height: 4.7rem;
  padding: 0 15px;
  margin-left: -3%;
}
.sf-search-bar__input:focus {
  outline: none;
}
.vsa-item__heading{
  border: #ffffff !important;
}
.vsa-item  {
  border: #ffffff !important;

}
.sf-table__row {
  border-radius: 20px;
  background-color: white;
  margin-bottom: 12px;
}
.sf-table__heading {
  border-color: #f0f7fc;
}
.slick-next:before {
  display: none;
}
.slick-prev:before {
  display: none;
}
.sf-accordion-item__content {
  max-height: 30rem;
  overflow: auto;
}
.sf-accordion-item__content::-webkit-scrollbar {
  display: none;
}
// .vue-magnifier-container .preview {
//   width: 150px;
//   height: 150px;
// }
</style>
