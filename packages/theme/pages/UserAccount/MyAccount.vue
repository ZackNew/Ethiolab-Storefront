<template>
  <div id="my-account">
    <nav class="sf-breadcrumbs m-4" aria-label="breadcrumbs">
      <ol class="sf-breadcrumbs__list">
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <span class="text-black">
            <nuxt-link class="sf-breadcrumbs__breadcrumb font-exrathin" to="/">
              Home
            </nuxt-link>
          </span>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <p class="text-secondary">My Account</p>
        </li>
      </ol>
    </nav>
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      title="My Account"
      :active="activePage"
      class="my-account accountPage"
      :class="isDarkMode ? 'accountPageDark' : 'accountPage'"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile />
        </SfContentPage>

        <SfContentPage title="Shipping details">
          <ShippingDetails />
        </SfContentPage>

        <SfContentPage title="Billing details">
          <BillingDetails />
        </SfContentPage>

        <!-- <SfContentPage title="My newsletter">
          <MyNewsletter />
        </SfContentPage> -->

        <SfContentPage title="My Quotes">
          <MyQuotes />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <OrderHistory />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { computed, onBeforeUnmount } from '@vue/composition-api';
import { useUser, useCart } from '@vue-storefront/vendure';
import MyProfile from '../MyAccount/MyProfile';
import ShippingDetails from '../MyAccount/ShippingDetails';
import BillingDetails from '../MyAccount/BillingDetails';
import MyNewsletter from '../MyAccount/MyNewsletter';
import OrderHistory from '../MyAccount/OrderHistory';
import MyQuotes from '../MyAccount/MyQuotes';
import useUiState from '~/composables/useUiState';
import {
  mapMobileObserver,
  unMapMobileObserver,
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    BillingDetails,
    MyNewsletter,
    OrderHistory,
    MyQuotes,
  },
  middleware: ['is-authenticated'],
  setup(props, context) {
    const { isDarkMode } = useUiState();
    const { $router, $route } = context.root;
    const { cart, load: loadCart, setCart, applyCoupon } = useCart();
    const { logout } = useUser();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const activePage = computed(() => {
      const { pageName } = $route.params;

      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace(
          '-',
          ' '
        );
      } else if (!isMobile.value) {
        return 'My profile';
      } else {
        return '';
      }
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        // await loadCart();
        setCart();
        $router.push(context.root.localePath({ name: 'home' }));
        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = context.root.localePath(transformedPath);

      $router.push(localeTransformedPath);
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return { changeActivePage, activePage, isDarkMode };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: { link: '#' },
        },
        {
          text: 'My Account',
          route: { link: '#' },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}

.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
.accountPage .sf-content-pages {
  &__section {
    border-radius: 2% !important;
    background: white !important;
  }
  &__sidebar {
    min-height: 100% !important;
    border-radius: 2% 0 0 2% !important;
    background: #e7efff !important;
  }
  &__title {
    color: #3860a7 !important;
    font-weight: 700 !important;
  }
  &__category-title {
    color: #3860a7 !important;
  }
}
.sf-content-pages__content::-webkit-scrollbar {
  width: 30px !important;
  background-color: none !important;
  width: 7px !important;
}
.sf-content-pages__content::-webkit-scrollbar-thumb {
  background-color: #acacac !important;
  border-radius: 100px !important;
}
.accountPage .sf-tabs__title.is-active + .sf-tabs__content {
  border: none !important;
}
.accountPage .sf-menu-item.is-active {
  padding: 5px !important;
  background-color: #f8fbff !important;
  color: #b6932f !important;
}

.myTabs .sf-tabs {
  padding-top: 3% !important;
  border-top: 1px solid rgb(205, 205, 205) !important;
  &__title {
    font-weight: 800 !important;
  }
}

.profileTabs .is-active {
  // background-color: pink !important;
  border-radius: 0% !important;
  box-shadow: 0px 1px 0px 0px #3860a7 !important;
  color: #3860a7 !important;
}

// sf-content-pages__content
</style>
