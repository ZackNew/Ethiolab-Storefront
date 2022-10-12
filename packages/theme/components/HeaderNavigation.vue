<template>
  <div
    v-if="!isMobile"
    class="grid grid-cols-4 gap-20 pt-4 w-full desktop pl-[15%] pr-[15%]"
  >
    <!-- <HeaderNavigationItem
        v-for="(category, index) in categories"
        :key="index"
        class="nav-item"
        v-e2e="`app-header-url_${category}`"
        :label="category"
        :link="localePath(`/c/${category}`)"
      /> -->
    <CategoriesSubNav />
    <IndustriesSubNav />
    <BrandsSubNav />
    <RequestQuoteSubNav />
  </div>

  <!-- <SfModal v-else :visible="isMobileMenuOpen">
    <HeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category}`"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="category"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/c/${category}`)"
          @click="toggleMobileMenu"
        />
      </template>
    </HeaderNavigationItem>
  </SfModal> -->
</template>

<script>
import { SfMenuItem, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import HeaderNavigationItem from './HeaderNavigationItem.vue';
import BrandsSubNav from './subnavs/BrandsSubNav.vue';
import IndustriesSubNav from './subnavs/IndustriesSubNav.vue';
import CategoriesSubNav from './subnavs/CategoriesSubNav.vue';
import RequestQuoteSubNav from './subnavs//RequestQuoteSubNav.vue';

export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
    HeaderNavigationItem,
    BrandsSubNav,
    IndustriesSubNav,
    CategoriesSubNav,
    RequestQuoteSubNav,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const categories = ['PRODUCTS', 'SERVICES'];

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}

.sf-header__navigation {
  width: 55% !important;
  margin: 0 auto !important;
}

.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}

.sf-menu-item__label {
  /* margin: auto !important; */
  // display: block !important;
  font-weight: bold !important;
  font-family: Arial !important;
}
</style>
