<template>
  <div class="wrap">
    <SfMegaMenu
      :visible="isSearchOpen"
      title="Search results"
      class="search w-[96%] md:w-[1140px]"
    >
      <transition name="sf-fade" mode="out-in">
        <div
          v-if="result !== null && result.length > 0 && loading === false"
          class="search__wrapper-results"
          key="results"
        >
          <!-- <SfMegaMenuColumn
            title="Categories"
            class="sf-mega-menu-column--pined-content-on-mobile search__categories"
          >
            <template #title="{ title }">
              <SfMenuItem :label="title">
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <SfList>
              <template v-for="res in result">
                <SfListItem
                  v-for="category in res._categoriesRef"
                  :key="category.id"
                >
                  <SfMenuItem
                    :label="category.name"
                    :link="localePath(`/c/${category.slug}`)"
                  >
                    <template #mobile-nav-icon> &#8203; </template>
                  </SfMenuItem>
                </SfListItem>
              </template>
            </SfList>
          </SfMegaMenuColumn> -->
          <SfMegaMenuColumn
            title="Product suggestions"
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <div
              class="results--desktop desktop-only overflow-auto"
              show-text=""
              hide-text=""
            >
              <SfScrollable
                class="results--desktop desktop-only"
                show-text=""
                hide-text=""
              >
                <div class="results-listing grid grid-cols-1 md:grid-cols-3">
                  
                  <div v-for="product in result" :key="product._id">
                    <ProductCard
                      :id="product._id"
                      v-e2e="'category-product-card'"
                      :title="product.name"
                      :image="product.images"
                      :imageHeight="260"
                      :imageWidth="300"
                      :alt="product.name"
                      :regular-price="product.showprice ? product.price.current + ' ETB' : 'unavailable'"
                      :max-rating="5"
                      :score-rating="product.rating"
                      :show-add-to-cart-button="true"
                      :link="localePath(`/v/${product.slug}`)"
                      class="carousel__item__product mr-2 mb-4"
                      @click:add-to-cart="addToCart"
                      :variantId="product._variantId"
                      @click:wishlist="
                        !isInWishlist({ product })
                          ? addItemToWishlist({ product })
                          : removeItemFromWishlist({ product })
                      "
                    />
                  </div>

                  <!-- class="products__product-card mr-2 mb-4" -->
                </div>
              </SfScrollable>
            </div>
            <div class="results--mobile smartphone-only">
              <div v-for="product in result" :key="product._id">
                <ProductCard
                  :id="product._id"
                  v-e2e="'category-product-card'"
                  class="result-card"
                  :regular-price="product.price.current + ' ETB'"
                  :score-rating="product.rating"
                  :image="product.images"
                  :alt="product.name"
                  :title="product.name"
                  :max-rating="5"
                  :imageHeight="198"
                  :imageWidth="128"
                  :link="localePath(`/v/${product.slug}`)"
                  @click:add-to-cart="addToCart"
                  :variantId="product._variantId"
                  @click:wishlist="
                    !isInWishlist({ product })
                      ? addItemToWishlist({ product })
                      : removeItemFromWishlist({ product })
                  "
                />
              </div>
            </div>
          </SfMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <SfButton
              class="action-buttons__button color-light"
              @click="$emit('close')"
            >
              Cancel
            </SfButton>
          </div>
        </div>
        <div v-else key="no-results" class="before-results">
          <div v-if="loading" class="mt-[7%]">
            <Loading />
            <h1 class="text-light_accent">_</h1>
          </div>
          <template v-else-if="result !== null && result.length === 0">
            <SfImage
              :src="'/error/error.png'"
              class="before-results__picture"
              alt="error"
              loading="lazy"
            />
            <p class="before-results__paragraph">
              We haven’t found any results for given phrase
            </p>
          </template>
          <template v-else>
            <SfImage
              :src="'/error/error.png'"
              class="before-results__picture"
              alt="error"
              loading="lazy"
            />
            <p class="before-results__paragraph">
              You haven’t searched for items yet
            </p>
            <p class="before-results__paragraph">
              Let’s start now – we’ll help you
            </p>
          </template>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            Go back
          </SfButton>
        </div>
      </transition>
    </SfMegaMenu>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfBanner,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfImage,
} from '@storefront-ui/vue';
import { ref, watch, computed, inject } from '@nuxtjs/composition-api';
import Loading from '~/components/Loading.vue';
import { productGetters, useCart, useWishlist } from '@vue-storefront/vendure';
import ProductCard from './ProductCard.vue';

export default {
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfList,
    SfBanner,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SfImage,
    ProductCard,
    Loading,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Array,
    },
    term: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const showToast = inject('showToast');
    const isSearchOpen = ref(props.visible);
    const products = computed(() => props.result?.value?.data?.items);
    const { addItem: addItemToCart, isInCart, cart } = useCart();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();

    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };
    const categories = computed(() => {
      return props.result?.value?.data?.collections;
    });

    const addToCart = (e) => {
      addItemToCart({
        product: {
          _variantId: e._variantId,
        },
        quantity: e.quantity,
      }).then((res) => {
        if (cart.value.errorCode && cart.value.errorCode != '') {
          showToast(cart.value.message);
        } else {
          showToast('Product added to cart!');
        }
      });
    };

    watch(
      () => props.visible,
      (newVal) => {
        isSearchOpen.value = newVal;
        if (isSearchOpen.value) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
          emit('removeSearchResults');
        }
      }
    );

    return {
      isSearchOpen,
      productGetters,
      products,
      categories,
      addToCart,
      addItemToCart,
      isInWishlist,
      toggleWishlist,
      addItemToWishlist,
      removeItemFromWishlist,
    };
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1250px !important;
    width: 91%;
    padding: 0;
    margin: 0 auto;
  }
}
.search {
  position: absolute;
  z-index: 99;
  height: 100%;
  min-height: 50%;
  // --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  background-color: var(--c-accent);
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
    height: auto;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    width: 100%;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    @include for-desktop {
      margin: var(--spacer-sm) 0 var(--spacer-xl);
      flex: 0 0 13.75rem;
    }
  }
  &__categories > .sf-button {
    --menu-item-text-transform: uppercase;
    margin: var(--spacer-sm) var(--spacer-sm) var(--spacer-xl);
    @include for-desktop {
      margin: 0 var(--spacer-sm) var(--spacer-xl) 0;
    }
  }
  &__results {
    flex: 1;
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.results {
  &--desktop {
    --scrollable-max-height: 65vh;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
