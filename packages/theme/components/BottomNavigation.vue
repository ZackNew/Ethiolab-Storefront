<template>
  <!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <SfBottomNavigationItem
      :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''"
      icon="home"
      size="20px"
      label="Home"
      @click="handleHomeClick"
    />
    <SfBottomNavigationItem
      icon="menu"
      size="20px"
      :label="$t('Menu')"
      @click="toggleMobileMenu"
    />
    <div style="position: relative">
      <SfBadge v-if="wishlistTotalItems" class="sf-badge--dot wishlist-badge"
        >{{ wishlistTotalItems }}
      </SfBadge>
      <SfBottomNavigationItem
        icon="heart"
        size="20px"
        :label="$t('Wishlist')"
        @click="toggleWishlistSidebar"
      />
    </div>
    <SfBottomNavigationItem
      icon="profile"
      size="20px"
      :label="$t('Account')"
      @click="handleAccountClick"
    />
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <div style="position: relative">
      <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{
        cartTotalItems
      }}</SfBadge>
      <SfBottomNavigationItem
        :label="$t('Basket')"
        icon="add_to_cart"
        @click="toggleCartSidebar"
      >
        <!-- <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{ margin: '0 0 0 -2px' }"
          />
        </SfCircleIcon>
      </template> -->
      </SfBottomNavigationItem>
    </div>
    <SfBottomNavigationItem
      :label="$t('Chat')"
      icon="message"
      @click="$root.$emit('emitMessage')"
    >
      <template #icon>
        <SfCircleIcon aria-label="Message">
          <SfIcon
            icon="mail"
            color="white"
            size="25px"
            :style="{ margin: '0 0 0 -2px' }"
          />
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import {
  SfBottomNavigation,
  SfIcon,
  SfCircleIcon,
  SfBadge,
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import {
  useUser,
  cartGetters,
  categoryGetters,
  useCart,
  useFacet,
  wishlistGetters,
  userGetters,
  useWishlist,
} from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfBadge,
  },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      toggleMobileMenu,
      isMobileMenuOpen,
      isMessageSideBarOpen,
      toggleMessageSidebar,
    } = useUiState();
    const { isAuthenticated } = useUser();
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      } else {
        return root.$router.push('/signin');
      }
      // toggleLoginModal();
    };
    const handleHomeClick = () => {
      isMobileMenuOpen.value ? toggleMobileMenu() : false;
      root.$router.push('/');
    };
    const { wishlist, load: loadWishlist } = useWishlist();
    const { cart, load: loadCart } = useCart();
    const wishlistTotalItems = computed(() => {
      const count = wishlistGetters.getTotalItems(wishlist.value);
      return count ? count.toString() : null;
    });
    loadCart();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    onSSR(async () => {
      await loadWishlist();
      await loadCart();
    });
    return {
      isMobileMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      handleAccountClick,
      handleHomeClick,
      wishlistTotalItems,
      cartTotalItems,
      isMessageSideBarOpen,
      toggleMessageSidebar,
    };
  },
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
.sf-bottom-navigation-item {
  --icon-color: blue !important;
  color: blue !important;
}
.wishlist-badge {
  position: absolute;
  bottom: 50%;
  left: 40%;
  color: blue !important;
  border-radius: 50%;
  background-color: transparent !important;
}
.cart-badge {
  position: absolute;
  bottom: 58%;
  left: 60%;
  color: blue !important;
  border-radius: 50%;
  background-color: transparent !important;
}
// .sf-badge {
//   position: relative;
//   top: -8px;
//   right: -8px;
//   background-color: #f44336;
//   color: #fff;
//   padding: 2px 5px;
//   border-radius: 50%;
//   font-size: 10px;
// }
</style>
