<template>
  <div
    class="shadow-lg rounded-lg transform transition duration-200 hover:shadow-2xl border border-light_accent mr-3 mb-6 relative"
    :style="
      !isDarkMode ? 'background-color: white' : 'background-color: #182533'
    "
  >
    <img
      v-if="product.customFields.is_order_based"
      src="/OB.png"
      height="100"
      width="100"
      alt="order based"
      class="absolute z-[100]"
    />
    <nuxt-link :to="{ path: '/v/' + product.slug }">
      <LazyHydrate>
        <img
          class="object-cover h-60 w-[88%] md:w-[93%] rounded-t-lg my-2 mx-auto"
          :src="product.featuredAsset ? product.featuredAsset.preview : ''"
          alt="image"
        />
      </LazyHydrate>
    </nuxt-link>
    <nuxt-link :to="{ path: '/v/' + product.slug }">
      <div class="m-1">
        <h4
          class="truncate-overflow mx-3 my-2 mx-auto font-extrabold text-secondary md:text-lg text-center md:min-h-[7rem]"
        >
          {{ product.name }}
        </h4>
      </div>
    </nuxt-link>

    <div class="text-center">
      <button class="my-2 h-4 w-32">
        <nuxt-link :to="{ path: '/v/' + product.slug }">
          <p class="text-sm bg-secondary text-white font-bold py-2 px-4">
            {{ $t('View All') }}
          </p>
        </nuxt-link>
      </button>
    </div>
    <h1
      @click="toggleIsInWishlist"
      class="mx-3 my-2 text-center text-xs md:text-sm text-secondary text-extralight"
    >
      <button>+ Add to Wishlist</button>
    </h1>
    <h1
      @click="addToCompareList"
      class="mx-3 my-2 text-center text-xs md:text-sm text-secondary text-extralight"
    >
      <button>+ Add to Compare List</button>
    </h1>

    <!-- <p class="text-center m-3 text-xs md:text-base"> -->
    <!-- {{ String(product.variants[0].priceWithTax).slice(0, -2) }}.00 -->
    <!-- {{minPrice}} - {{maxPrice}}
      </p> -->

    <div
      class="text-center m-3 text-xs md:text-base"
      v-if="product.variants.length === 1 && prices !== undefined"
    >
      <span> </span>{{ parseFloat(prices).toLocaleString() }} ETB
    </div>
    <div class="text-center m-3 text-xs md:text-base" v-else>
      <div class="inline-flex" v-for="(p, index) of prices" :key="index">
        <div class="mx-2" v-if="index === 1">-</div>
        <template>{{ parseFloat(p).toLocaleString() }}ETB </template>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '~/components/Toast.vue';
import { useUiState } from '~/composables';
import { computed, onMounted, inject } from '@vue/composition-api';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'SubcatBrandCard',
  props: {
    product: {
      type: Object,
      required: false,
    },
    wishlistIcon: {
      type: [String, Array, Boolean],
      default: 'heart',
    },
    isInWishlistIcon: {
      type: [String, Array],
      default: 'heart_fill',
    },
    isInWishlist: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LazyHydrate,
    Toast,
  },
  methods: {
    toggleIsInWishlist() {
      this.toastShower('Item added to wishlist');
      this.$emit('click:wishlist', !this.isInWishlist);
      this.$root.$emit('emitWishList');
    },
    addToCompareList() {
      if (
        this.$store.state.compareList?.productsToCompare?.length < 5 &&
        this.product.id !== '' &&
        this.product.variants[0].id !== ''
      ) {
        if (
          this.$store.state.compareList?.productsToCompare?.filter(
            (e) =>
              e?.productID === this.product.id &&
              e?.variantID === this.product.variants[0].id
          ).length === 0
        ) {
          this.toastShower('Added to Compare List');
          this.$store.dispatch('compareList/addToCompareList', {
            product: {
              productID: this.product.id,
              variantID: this.product.variants[0].id,
              image: this.product.featuredAsset
                ? this.product.featuredAsset.preview
                : '',
            },
          });
        } else {
          this.toastShower('Item is already in the list');
        }
      } else {
        this.toastShower('Limit to Compare Products reached');
      }
    },
  },
  computed: {
    prices() {
      const showpriceIndex = this.product.variants.findIndex(
        (item) => item?.customFields?.showprice
      );
      if (showpriceIndex === -1) {
        return;
      } else {
        if (this.product?.variants.length === 1) {
          const price = String(this.product?.variants[0]?.price);
          const fPrice = price.slice(0, -2) + '.' + price.slice(-2);
          return fPrice;
        }
        if (this.product?.variants.length > 1) {
          let items = this.product?.variants;
          let prices = [];
          items.forEach((item) => {
            item?.customFields?.showprice && prices.push(item.price);
          });
          const max =
            String(Math.max(...prices)).slice(0, -2) +
            '.' +
            String(Math.max(...prices)).slice(-2);
          const min =
            String(Math.min(...prices)).slice(0, -2) +
            '.' +
            String(Math.min(...prices)).slice(-2);
          return [min, max];
        }
      }
    },
  },
  setup(props) {
    const showToast = inject('showToast');
    const { isDarkMode } = useUiState();
    let maxPrice = '';
    let minPrice = '';
    // const originalPrice = [];
    const currentPrice = [];
    const toastShower = (message) => {
      showToast(message);
    };

    props.product?.value?.variants.forEach((element) => {
      // originalPrice.push(element.priceWithTax);
      currentPrice.push(element.price.current);
    });

    const maxP = Math.max(...currentPrice).toString();
    const minP = Math.min(...currentPrice).toString();

    maxPrice =
      maxP.substring(0, maxP.length - 2) +
      '.' +
      maxP.substring(maxP.length - 2);
    minPrice =
      minP.substring(0, minP.length - 2) +
      '.' +
      minP.substring(minP.length - 2);

    return {
      isDarkMode,
      toastShower,
      maxPrice,
      minPrice,
    };
  },
};
</script>

<style scoped lang="scss">
.nobar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.shadowInner {
  box-shadow: inset 5px 0px 5px -4px rgba(134, 134, 134, 0.8),
    5px 0px 5px -4px rgba(134, 134, 134, 0.8);
  z-index: 1;
}

.ssf-product-card {
  // box-sizing: border-box;
  position: relative;
  z-index: var(--product-card-z-index);
  max-width: var(--product-card-max-width, 10.625rem);
  flex: 0 1 var(--product-card-max-width, 10.625rem);
  height: var(--product-card-height);
  // padding: var(--product-card-padding, var(--spacer-xs), 0, var(--spacer-xs));
  background-color: var(--product-card-background, var(--c-white));
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: var(--product-card-transition);
    box-shadow: var(--product-card-box-shadow);
  }
  &:hover {
    --product-card-image-opacity: 1;
    --product-card-image-even-opacity: 1;
    --product-card-wishlist-icon-opacity: 1;
    --product-card-add-button-opacity: 1;
    --product-card-z-index: 1;
    --product-card-box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
  }
  &.has-colors {
    --product-card-add-button-bottom: 0;
  }
  &:active {
    --product-card-box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
  }
  &__link {
    display: block;
    width: 100%;
    min-width: 100%;
    line-height: 0;
    min-height: 60%;
    text-decoration: none;
    margin: var(--product-card-link-margin, 0);
    text-align: center;
  }
  &__colors {
    --color-picker-position: absolute;
    --color-picker-label-font-size: var(--font-size--base);
    --color-picker-label-font-weight: var(--font-weight--medium);
    @include for-desktop {
      --color-picker-position: relative;
      --color-picker-justify-content: flex-start;
      --color-picker-padding: 0;
      pointer-events: none;
    }
  }
  &__color {
    margin: var(--spacer-xs);
    pointer-events: visible;
    @include for-desktop {
      margin: var(--spacer-sm) var(--spacer-sm) 0 0;
    }
  }
  &__title {
    @include font(
      --product-card-title-font,
      var(--font-weight--normal),
      var(--h5-font-size),
      1.6,
      var(--font-family--secondary)
    );
    color: var(--product-card-title-color, var(--c-link));
    margin: var(--product-card-title-margin, var(--spacer-xs) 0 0 0);
    overflow: hidden;
    // text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  &__image-wrapper {
    position: relative;
  }
  &__image,
  &__picture {
    --image-width: var(--product-card-image-width, 100%);
    --image-height: var(--product-card-image-height, auto);
    transition: var(--product-card-image-transition, opacity 150ms ease-in-out);
    opacity: var(--product-card-image-opacity);
    &:nth-child(even) {
      position: absolute;
      top: 0;
      left: 0;
      opacity: var(--product-card-image-even-opacity, 0);
    }
  }
  &__badge {
    position: absolute;
    top: var(--product-card-badge-top, var(--spacer-xs));
    left: var(--product-card-badge-left, 0);
  }
  &__colors-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: var(--spacer-xs);
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    color: var(--c-white);
    z-index: 2;
  }
  &__add-button {
    --circle-icon-position: absolute;
    right: var(--product-card-add-button-right, 1rem);
    bottom: var(--product-card-add-button-bottom, -1.5rem);
    display: var(--product-card-add-button-display, none);
    transform: var(--product-card-add-button-transform);
    opacity: var(--product-card-add-button-opacity, 0);
    &:focus {
      --product-card-add-button-opacity: 1;
    }
    & .sf-circle-icon:hover {
      --button-box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
      --button-box-shadow-opacity: 0.3;
    }
  }
  &__price {
    margin: var(--product-card-margin, 0);
  }
  &__reviews {
    display: flex;
    align-items: center;
  }
  &__rating {
    display: flex;
  }
  &__reviews-count {
    margin: var(--product-card-reviews-count-margin, 0 0 0 var(--spacer-xs));
    color: var(--product-card-reviews-count-color, var(--c-text));
    text-decoration: none;
    @include font(
      --product-reviews-count-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--secondary)
    );
  }
  &__wishlist-icon {
    --icon-color: var(--c-dark-variant);
    position: absolute;
    top: var(--product-card-wishlist-icon-top, var(--spacer-xs));
    right: var(--product-card-wishlist-icon-right, var(--spacer-xs));
    padding: var(--product-card-wishlist-icon-padding, 0);
    opacity: var(--product-card-wishlist-icon-opacity, 1);
    transition: var(
      --product-card-wishlist-icon-transition,
      opacity 150ms ease-in-out
    );
    cursor: pointer;
    &:focus {
      --product-card-wishlist-icon-opacity: 1;
    }
  }
  &.on-wishlist {
    --product-card-wishlist-icon-opacity: 1;
  }
  & .has-colors {
    --product-card-add-button-bottom: 0;
  }
  @include for-desktop {
    --product-card-max-width: 15.5rem;
    --product-card-padding: var(--spacer-sm);
    --product-card-transition: box-shadow 150ms ease-in-out;
    --product-card-wishlist-icon-top: var(--spacer-base);
    --product-card-wishlist-icon-right: var(--spacer-base);
    --product-card-wishlist-icon-opacity: 0;
    --product-card-add-button-display: flex;
    --product-card-title-margin: var(--spacer-sm) 0 0 0;
    --product-card-margin: var(--spacer-xs) 0;
    &__colors-badge {
      margin: var(--spacer-sm) var(--spacer-sm) 0 0;
      width: 1.25rem;
      height: 1.25rem;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }
}
.truncate-3-lines {
  max-height: 4rem; /* double the size of line-height */
  min-height: 4rem;
  line-height: 1.3rem;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
}
</style>
