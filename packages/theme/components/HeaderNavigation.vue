<template>
  <div>
    <div
      v-if="!isMobile"
      class="grid grid-cols-4 gap-3 pt-4 w-[80%] desktop-only mx-auto text-center relative"
    >
      <h4
        class="text-secondary font-bold uppercase"
        @mouseover="hoverHandler('Products')"
        @mouseleave="hoverOutHandler"
      >
        Products
      </h4>
      <h4
        class="text-secondary font-bold uppercase"
        @mouseover="hoverHandler('Industries')"
        @mouseleave="hoverOutHandler"
      >
        Industries
      </h4>
      <h4
        class="text-secondary font-bold uppercase"
        @mouseover="hoverHandler('brands')"
        @mouseleave="hoverOutHandler"
      >
        brands
      </h4>
      <nuxt-link to="/WriteAQuote">
        <h4 class="text-secondary font-bold uppercase">request quote</h4>
      </nuxt-link>
    </div>
    <DropDownMenu
      class="absolute"
      @mouseover.native="mouseEnter = true"
      @mouseleave.native="(dropDownIsVisible = false), (mouseEnter = false)"
      :contents="contents"
      v-if="dropDownIsVisible"
    />
  </div>
</template>

<script>
import { SfMenuItem, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import HeaderNavigationItem from './HeaderNavigationItem.vue';
import DropDownMenu from './DropDownMenu.vue';
import BrandsSubNav from './subnavs/BrandsSubNav.vue';
import IndustriesSubNav from './subnavs/IndustriesSubNav.vue';
import { ref } from '@vue/composition-api';
import CategoriesSubNav from './subnavs/CategoriesSubNav.vue';
import RequestQuoteSubNav from './subnavs//RequestQuoteSubNav.vue';
import debounce from 'lodash.debounce';
import axios from 'axios';

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
    DropDownMenu,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const categories = ref([]);
    const brands = ref([]);
    const industries = ref([]);
    const contents = ref([]);
    const dropDownIsVisible = ref(false);
    const mouseEnter = ref(false);
    const getBrandIndustryCategory = async () => {
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `
          query getBrandIndustryCategory{
            collection: collections{
              items{
                id
                name
                slug
                parent{
                  name
                }
                children{
                  id
                  slug
                  name
                }
                featuredAsset{
                  preview
                }
              }
            }
            brands: brands {
              id
              name
              icon{
                preview
              }
            }
            industries: industries{
              id
              name
              icon{
                preview
              }
            }
          }`,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await axios.post(baseUrl, body, options).then((res) => {
        categories.value = res?.data?.data?.collection;
        brands.value = res?.data?.data?.brands;
        industries.value = res?.data?.data?.industries;
      });
    };
    getBrandIndustryCategory();
    const hoverHandler = (hovered) => {
      if (hovered === 'Products') {
        contents.value = {
          id: '1',
          hovered: 'categories',
          items: categories.value?.items,
        };
      }
      if (hovered === 'Industries') {
        contents.value = {
          id: '2',
          hovered: 'Industries',
          items: industries.value,
        };
      }
      if (hovered === 'brands') {
        contents.value = { id: '3', hovered: 'brands', items: brands.value };
      }
      dropDownIsVisible.value = true;
    };
    const hoverOutHandler = debounce(function () {
      if (mouseEnter.value === false) {
        dropDownIsVisible.value = false;
      }
    }, 1);
    return {
      dropDownIsVisible,
      mouseEnter,
      hoverOutHandler,
      hoverHandler,
      categories,
      brands,
      industries,
      isMobileMenuOpen,
      toggleMobileMenu,
      contents,
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
