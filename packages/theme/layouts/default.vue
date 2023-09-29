<template>
  <div
    :class="{
      'theme-light': !isDarkMode,
      'theme-dark': isDarkMode,
    }"
    id="whole"
    :style="
      !isDarkMode ? `background-color: #f0f7fc;` : `background-color: #0e1621;`
    "
  >
    <div :class="!isDarkMode ? `bg-white` : `bg-dark_accent`">
      <LazyHydrate when-visible>
        <TopBar class="desktop-only" />
      </LazyHydrate>
      <LazyHydrate when-idle>
        <AppHeader />
      </LazyHydrate>
    </div>
    <div id="layout">
      <nuxt :key="$route.fullPath" />
      <client-only><Compare class="bottomright" /></client-only>
      <!-- <client-only><img src="chatr.png" alt="chat image" height="50px" width="50px" class="chatcss" /></client-only> -->
      <!--
    <div id="layout" >
      <nuxt :key="$route.fullPath"/> -->

      <ToastVue :show="isToastVisible" :message="toastMessage" />
      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <CategoriesSidebar />
      <LoginModal />
      <Notification />
      <!-- <categories-sidebar /> -->
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
  <!-- </div> -->
</template>

<script>
import ToastVue from '~/components/Toast.vue';
import Compare from '~/components/Compare.vue';
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
import { ref, provide } from '@vue/composition-api';
export default {
  name: 'DefaultLayout',
  // middleware: 'themeChecker',

  components: {
    ToastVue,
    Compare,
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
      // this.$router.go(0)
    });

    onSSR(async () => {
      await search({ sort: { name: 'DESC' }, take: 8 });
      await searchCms([
        'HERO_SECTION',
        'POPUP',
        'STATIC',
        'ADVERTISEMENT',
        'POLICIES',
        'BIG_SALE',
      ]);
    });
    return { isDarkMode, isToastVisible, showToast, toastMessage };
  },
  created() {
    this.$store.dispatch('companyDetails/setInfo');
  },
};
</script>

<style lang="scss">
@import '../assets/myAccountOverrides.scss';
@import '../assets/overrides.scss';
@import '~@storefront-ui/vue/styles';
@import './assets/styles';
#whole {
  @include for-desktop {
    max-width: 100% !important;
    margin: auto;
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

.bottomright {
  position: fixed;
  padding: 5px;
  z-index: 500;
}
.chatcss {
  position: fixed;
  z-index: 500;
  top: 90vh;
  left: 95%;
}
</style>
