<template>
  <div class="header">
    <SfHeader
      :class="{
        'header-on-top': isSearchOpen,
        'sf-header--has-mobile-navigation': !isMobileMenuOpen,
      }"
      :is-nav-visible="isMobileMenuOpen"
      data-app
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link :to="localePath('/')">
          <SfImage
            src="/icons/logo.svg"
            :alt="$t('Ethiolab')"
            width="200"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>

      <template #aside>
         <div class="flex flex-row justify-between">
        <LocaleSelector class="smartphone-only" />
        <ThemeChanger class="smartphone-only" />
        </div>
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            v-e2e="'app-header-account'"
            aria-label="Open account button"
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton>
          <SfButton
            aria-label="Toggle wishlist sidebar"
            class="sf-button--pure sf-header__action"
            @click="toggleWishlistSidebar"
          >
            <SfIcon class="sf-header__icon" icon="heart" size="1.25rem" />
            <SfBadge
              v-if="wishlistTotalItems"
              class="sf-badge--number cart-badge"
              >{{ wishlistTotalItems }}</SfBadge
            >
          </SfButton>
          <SfButton
            v-e2e="'app-header-cart'"
            aria-label="Toggle cart sidebar"
            class="sf-button--pure sf-header__action"
            @click="toggleCartSidebar"
          >
            <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />
            <SfBadge
              v-if="cartTotalItems"
              class="sf-badge--number cart-badge"
              >{{ cartTotalItems }}</SfBadge
            >
          </SfButton>
        </div>
      </template>
      <template #navigation>
        <SfSearchBar
          ref="searchBarRef"
          :aria-label="$t('Search')"
          :placeholder="$t('Search for items')"
          :value="term"
          class="search"
          @focus="isSearchOpen = true"
          @blur="isSearchOpen = false"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @keydown.esc="closeSearch"
        >
          <template #icon>
            <SfButton
              v-if="!!term"
              aria-label="Close search"
              class="sf-search-bar__button sf-button--pure"
              @click="closeOrFocusSearchBar"
            >
              Search
            </SfButton>
            <SfButton
              v-else
              aria-label="Open search"
              class="sf-search-bar__button sf-button--pure"
              @click="
                isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
              "
            >
              Search
            </SfButton>
          </template>
        </SfSearchBar>
      </template>
      <template #search>
        <div></div>
      </template>
    </SfHeader>
    <SearchResults
      :result="result"
      :visible="isSearchOpen"
      @close="closeSearch"
      @removeSearchResults="removeSearchResults"
      class="search-result-container"
    />
    <SfOverlay :visible="isSearchOpen" />
  </div>
</template>

<script>
import {
  SfInput,
  SfBadge,
  SfButton,
  SfHeader,
  SfIcon,
  SfImage,
  SfLink,
  SfMenuItem,
  SfOverlay,
  SfSearchBar,
  SfTextarea,
  SfModal
} from '@storefront-ui/vue';
import { useUiHelpers, useUiState } from '~/composables';
import {
  cartGetters,
  categoryGetters,
  useCart,
  useCategory,
  useFacet,
  useUser,
  useWishlist,
  wishlistGetters,
  userGetters
} from '@vue-storefront/vendure';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import LocaleSelector from '~/components/LocaleSelector';
import ThemeChanger from "~/components/ThemeChanger";
import SearchResults from '~/components/SearchResults';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import debounce from 'lodash.debounce';
import DropdownNavigationItem from '~/components/DropdownNavigationItem.vue';
import { useProduct } from '@vue-storefront/vendure';
import { load } from 'mime';
export default {
  components: {
    SfInput,
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    SfMenuItem,
    SfLink,
    DropdownNavigationItem,
    SfTextarea,
    SfModal,
    ThemeChanger
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      isMobileMenuOpen
    } = useUiState();
    const selectedProds = ref(['Micro']);
    // let selectedProdsNames = null;

    const prodNums = ref([]);
    const addProd = (name) => {
      if (selectedProds.value.indexOf(name) !== -1) {
        selectedProds.value.push(name);
        prodNums.value.push(0);
      }
    };
    const removeProd = (name) => {
      const index = selectedProds.value.indexOf(name);
      if (index !== -1) {
        selectedProds.value = selectedProds.value.filter(
          (data) => selectedProds.value.indexOf(data) !== index
        );
        prodNums.value = prodNums.value.filter(
          (data) => prodNums.value.indexOf(data) !== index
        );
      }
    };
    const prodList = ['Stetosocope', 'Microscope']; // useProduct({search: ""}).products.value

    const selectedProd = () => {
      console.log('selected');
    };

    const showQuotation = ref(false);
    const { setTermForUrl, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load: loadUser, user } = useUser();
    const { cart, load: loadCart } = useCart();
    const { wishlist, load: loadWishlist } = useWishlist();
    const { search, categories } = useCategory();
    const term = ref(getFacetsFromURL().phrase);
    const { search: searchTerm, result: searchResult } = useFacet();
    const isSearchOpen = ref(false);
    const searchBarRef = ref(null);
    const result = ref(null);
    const items = ref([]);
    const showMenu = ref(false);
    const showCategory = ref(false);
    const subCategory = ref('');
    const selectedCata = ref(null);
    // TODO:: ADD ALL CITIES
    const cities = ['Addis Ababa', 'Adama', 'Mekele', 'Gondar', 'Bahir Dar'];

    const quoteCity = ref(cities[0]);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const wishlistTotalItems = computed(() => {
      const count = wishlistGetters.getTotalItems(wishlist.value);
      return count ? count.toString() : null;
    });
    const accountIcon = ref('profile');
    
    (async ()=>await loadUser())()
   
    watch(user, ()=> (async()=>{
      console.log("Tin Number: ", userGetters.getTinNumber(user))
      console.log('User %c', 'color: lightblue', user)
      accountIcon.value = isAuthenticated.value ? 'profile_fill' : 'profile'
    })())

    // const accountIcon = computed(() =>
    //   isAuthenticated.value ? 'profile_fill' : 'profile'
    // );

    // TODO: https://github.com/vuestorefront/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      await loadUser();
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }
      toggleLoginModal();
    };
    onSSR(async () => {
      await loadUser();
      await loadCart();
      await loadWishlist();
      await search();
    });

    const headerNavigation = [
      { name: 'Products', link: '/c/clinical-laboratory' },
      { name: 'About us', link: '/page/about' },
      { name: 'Contact us', link: '/pages/contact' },
      { name: 'Help center', link: '/pages/helpAndFAQ' }
    ];

    const currentRoute = computed(() => {
      return root.$route.name === 'home';
    });

    const tree = computed(() => {
      return searchResult.value.data ? searchResult.value.data.collections : [];
    });

    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = '';
      isSearchOpen.value = false;
    };

    const toggleQuoteDialog = () => {
      showQuotation.value = !showQuotation.value;
    };
    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
      }
      await searchTerm({ term: term.value });
      result.value = searchResult;
    }, 1000);

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      } else {
        term.value = '';
        return searchBarRef.value.$el.children[0].focus();
      }
    };

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true;
        }
      }
    );

    const removeSearchResults = () => {
      result.value = null;
    };

    const onCataSelected = (itm) => {
      selectedCata.value = itm.name;
      root.$router.push({ path: `/c/${itm.link}` });
    };

    const onCategory = (itm) => {
      subCategory.value = itm.name;
      showCategory.value = true;
    };

    const onsubCataSelected = () => {
      items.value.forEach((c) => {
        if (c.name === subCategory.value) {
          root.$router.push({ path: `/c/${c.link}` });
          showCategory.value = false;
        }
      });
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    onMounted(() => {
      items.value = categoryGetters.getNavigation(categories.value);
    });

    return {
      selectedProd,
      selectedProds,
      addProd,
      removeProd,
      cities,
      SfModal,
      toggleQuoteDialog,
      showQuotation,
      items,
      selectedCata,
      onCataSelected,
      showCategory,
      showMenu,
      onCategory,
      subCategory,
      onsubCataSelected,
      currentRoute,
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      setTermForUrl,
      term,
      isSearchOpen,
      closeSearch,
      handleSearch,
      result,
      closeOrFocusSearchBar,
      searchBarRef,
      isMobile,
      removeSearchResults,
      headerNavigation,
      isMobileMenuOpen,
      wishlistTotalItems,
      tree,
      SfTextarea,
      prodList
    };
  }
};
</script>
<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__navigation.is-visible {
    --header-navigation-display: block;
  }

  &__logo-image {
    height: 200%;
  }
}

.search {
  width: 800px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #aaa;
  padding-left: 10px;
  color: var(--c-text);
}
@media (max-width: 800px) {
  .search {
    width: 80%;
    margin-left: 40px;
  }
}
.header-on-top {
  z-index: 2;
}
.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
.sf-search-bar__button {
  background-color: var(--c-secondary);
  height: 100%;
  color: var(--c-white);
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  bottom: 0;
  padding-right: 10px;
  padding-left: 10px;
}
.header2 {
  width: fit-content;
  margin: auto;
}

</style>
