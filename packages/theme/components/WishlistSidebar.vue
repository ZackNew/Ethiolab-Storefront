<template>
  <div id="wishlist">
    <SfSidebar
      :visible="isWishlistSidebarOpen"
      :button="false"
      title="My Wishlist"
      @close="toggleWishlistSidebar"
      class="sidebar sf-sidebar--right"
    >
      <template #title>
        <div class="heading__wrapper">
          <SfHeading :level="3" title="My wishlist" class="sf-heading--left" />
          <SfButton
            class="heading__close-button sf-button--pure"
            aria-label="Wishlist sidebar close button"
            @click="toggleWishlistSidebar"
          >
            <SfIcon icon="cross" size="14px" color="gray-primary" />
          </SfButton>
        </div>
      </template>
      <transition name="fade" mode="out-in">
        <div v-if="totalItems" class="my-wishlist" key="my-wishlist">
          <div class="my-wishlist__total-items">
            Total items: <strong>{{ totalItems }}</strong>
          </div>
          <div class="collected-product-list">
            <transition-group name="fade" tag="div">
              <SfCollectedProduct
                v-for="product in products"
                :key="product._id"
                :image="product.images"
                :title="product.name"
                :regular-price="
                  product.price.original &&
                  String(product.price.original).slice(0, -2) +
                    '.' +
                    String(product.price.original).slice(-2)
                "
                :stock="99999"
                image-width="180"
                image-height="200"
                @click:remove="removeFromList(product)"
                class="collected-product sf-collected-product"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(
                        attribute, key
                      ) in wishlistGetters.getItemAttributes(product, [
                        'color',
                        'size',
                      ])"
                      :key="key"
                      :name="key"
                      :value="attribute"
                    />
                  </div>
                </template>
                <template #input="{}">&nbsp;</template>
              </SfCollectedProduct>
            </transition-group>
          </div>
          <div class="sidebar-bottom">
            <!-- <SfProperty
              class="sf-property--full-width my-wishlist__total-price"
            >
              <template #name>
                <span class="my-wishlist__total-price-label">Total price:</span>
              </template>
              <template #value>
                <SfPrice :regular="totals + ' ETB'" />
              </template>
            </SfProperty> -->
          </div>
        </div>
        <div v-else class="empty-wishlist" key="empty-wishlist">
          <div class="empty-wishlist__banner">
            <SfImage
            src="/icons/empty-cart.png"
              alt="Empty bag"
              class="empty-wishlist__icon"
            />
            <SfHeading
              title="Your bag is empty"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
              class="empty-wishlist__label"
            />
          </div>
        </div>
      </transition>
      <!-- <template #content-bottom>
        <SfButton
          @click="toggleWishlistSidebar"
          class="sf-button--full-width color-secondary"
        >
          {{ $t('Start shopping') }}
        </SfButton>
      </template> -->
    </SfSidebar>
  </div>
</template>
<script>
import axios from 'axios';
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
} from '@storefront-ui/vue';
import { computed, onMounted, ref } from '@vue/composition-api';
import { useWishlist, useUser, wishlistGetters } from '@vue-storefront/vendure';
import { useUiState } from '~/composables';
import { getCalculatedPrice } from '~/helpers';
import CryptoJS from 'crypto-js';

export default {
  middleware: ['csrf'],
  name: 'Wishlist',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
  },
  setup(props, ctx) {
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const { wishlist, removeItem, load: loadWishlist } = useWishlist();
    const { isAuthenticated } = useUser();
    const products = ref([]);
    const totals = computed(() => {
      const wishList = wishlistGetters.getItems(wishlist.value);
      let total = parseFloat('0');
      wishList.forEach((p) => {
        total += parseFloat(String(p.price.original));
      });
      return total.toFixed(2);
    });
    const totalItems = computed(() =>
      wishlistGetters.getTotalItems(wishlist.value)
    );
    const getWishList = async (ids, vIds) => {
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `
        query getProductById($in: [String!], $eq: [String!]) {
          products(options: { filter: { id: { in: $in } } }) {
            items {
              id
              name
              slug
              featuredAsset{
                preview
              }
              variantList(options: { filter: { id: { in: $eq } } }) {
                items {
                  id
                  priceWithTax
                }
              }
            }
          }
        }
        `,
        variables: { in: ids, eq: vIds },
        csrfToken: ctx.root.$store.state.csrfToken.csrfToken,
      };
      const token = CryptoJS.AES.encrypt(
        ctx.root.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      await axios.post('/api/shop', body, options).then((res) => {
        const productsList = res.data.data.data?.products?.items;
        const empArray = [];
        productsList.forEach((p) => {
          empArray.push({
            _id: p.id,
            _variantId: p.variantList.items[0].id,
            _description: '',
            _categoriesRef: [''],
            name: p.name,
            sku: '',
            slug: p.slug,
            images: p.featuredAsset && p.featuredAsset.preview,
            price: {
              original: p.variantList.items[0].priceWithTax,
              current: p.variantList.items[0].priceWithTax,
            },
          });
        });
        products.value = empArray;
      });
    };

    const removeFromList = (product) => {
      removeItem({ product });
      // loadWishlist();
      const ids = [];
      const vIds = [];
      const wishList = wishlistGetters.getItems(wishlist.value);
      wishList.forEach((p) => {
        ids.push(p?._id);
        vIds.push(p?._variantId);
      });
      getWishList(ids, vIds);
    };

    onMounted(() => {
      loadWishlist();
      const ids = [];
      const vIds = [];
      const wishList = wishlistGetters.getItems(wishlist.value);
      wishList.forEach((p) => {
        ids.push(p?._id);
        vIds.push(p?._variantId);
      });
      if (ids.length > 0 && vIds.length > 0) {
        getWishList(ids, vIds);
      }
    });
    ctx.root.$on('emitWishList', () => {
      loadWishlist();
      const ids = [];
      const vIds = [];
      const wishList = wishlistGetters.getItems(wishlist.value);
      wishList.forEach((p) => {
        ids.push(p?._id);
        vIds.push(p?._variantId);
      });
      getWishList(ids, vIds);
    });

    loadWishlist();

    return {
      isAuthenticated,
      products,
      removeItem,
      isWishlistSidebarOpen,
      toggleWishlistSidebar,
      totals,
      totalItems,
      wishlistGetters,
      getCalculatedPrice,
      removeFromList,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  --sidebar-top-padding: var(--spacer-lg) var(--spacer-base) 0
    var(--spacer-base);
  --sidebar-content-padding: var(--spacer-lg) var(--spacer-base);
}

.my-wishlist {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    font: var(--font-weight--normal) var(--font-size--lg) / 1.6
      var(--font-family--secondary);
    color: var(--c-link);
    margin: 0;
  }
  &__total-price {
    --property-name-font-size: var(--font-size--xl);
    --price-font-size: var(--font-size--xl);
    margin: 0 0 var(--spacer-xl) 0;
    &-label {
      font: var(--font-weight--normal) var(--font-size--2xl) / 1.6
        var(--font-family--secondary);
      color: var(--c-link);
    }
  }
}
.empty-wishlist {
  display: flex;
  flex: 1;
  flex-direction: column;
  &__banner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__label,
  &__description {
    text-align: center;
  }
  &__label {
    --heading-description-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-color: var(--c-primary);
    --heading-title-font-weight: var(--font-weight--semibold);
    @include for-desktop {
      --heading-title-font-size: var(--font-size--xl);
      --heading-title-margin: 0 0 var(--spacer-sm) 0;
    }
  }
  &__icon {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
}
.heading {
  &__wrapper {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--semibold);
    display: flex;
    justify-content: space-between;
  }
}

.sidebar-bottom {
  margin: auto 0 0 0;
}

.collected-product {
  margin: var(--spacer-base) 0;
  z-index: 4;
  &__properties {
    margin: var(--spacer-sm) 0 0 0;
  }
}

.sf-collected-product:hover {
  --collected-product-title-color: black;
  --price-regular-color: black;
  --price-regular-font-weight: var(--font-weight-large);
}
</style>
