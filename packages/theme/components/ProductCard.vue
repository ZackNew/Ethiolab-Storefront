<template>
  <div
    :class="!isDarkMode ? `bg-white` : `bg-dark_accent`"
    class="pt-3 shadow-lg hover:shadow-2xl duration-300 rounded"
    data-testid="product-card"
  >
    <div class="ssf-product-card__image-wrapper mx-3 relative">
      <slot
        name="image"
        v-bind="{
          image,
          title,
          link,
          imageHeight,
          imageWidth,
          imageTag,
          nuxtImgConfig,
          isOrderBased,
        }"
      >
        <img
          v-if="isOrderBased"
          src="/OB.png"
          height="100"
          width="100"
          alt="order based"
          class="absolute orderBased"
        />
        <SfButton
          :link="link"
          class="sf-button--pure ssf-product-card__link"
          data-testid="product-link"
          :aria-label="'Go To Product'"
          v-on="$listeners"
        >
          <template v-if="Array.isArray(image)">
            <SfImage
              v-for="(picture, key) in image.slice(0, 2)"
              :key="key"
              :class="`ssf-product-card__picture min-h-[${imageHeight}]`"
              :src="picture"
              :alt="title"
              :width="imageWidth"
              :height="imageHeight"
              :image-tag="imageTag"
              :nuxt-img-config="nuxtImgConfig"
            />
          </template>
          <!-- <img
            style="object-fit: cover"
            v-else
            :src="image"
            :alt="title"
            :class="`rounded-t-lg rounded-b w-full min-h-[14rem] max-h-[14rem]`"
          /> -->
          <SfImage
            v-else
            class=""
            :src="image"
            alt="image"
            :width="imageWidth"
            :height="imageHeight"
            :image-tag="imageTag"
            :nuxt-img-config="nuxtImgConfig"
            placeholder="image"
          />
        </SfButton>
      </slot>
      <slot name="colors" v-bind="{ colors }">
        <SfColorPicker
          :class="{ 'display-none': !colors.length }"
          class="ssf-product-card__colors smartphone-only"
          label="Choose color"
          :is-open="openColorPicker"
          @click:toggle="toggleColorPicker"
        >
          <SfColor
            v-for="(color, i) in colors"
            :key="color.value"
            :color="color.color"
            :selected="color.selected"
            class="ssf-product-card__color"
            :class="{ 'display-none': i > 3 && showBadge }"
            @click="handleSelectedColor(i)"
          />
          <SfBadge
            v-if="showBadge"
            class="ssf-product-card__colors-badge color-secondary"
          >
            {{ `+${colors.length - 4}` }}
          </SfBadge>
        </SfColorPicker>
        <SfColorPicker
          :class="{ 'display-none': !colors.length }"
          class="ssf-product-card__colors desktop-only"
          label="Choose color"
          :is-open="true"
        >
          <SfColor
            v-for="(color, i) in colors"
            :key="color.value"
            :color="color.color"
            :selected="color.selected"
            class="ssf-product-card__color"
            :class="{ 'display-none': i > 3 && showBadge }"
            @click="handleSelectedColor(i)"
          />
          <SfBadge
            v-if="showBadge"
            class="ssf-product-card__colors-badge color-secondary"
          >
            {{ `+${colors.length - 4}` }}
          </SfBadge>
        </SfColorPicker>
      </slot>
      <slot name="badge" v-bind="{ badgeLabel, badgeColor }">
        <SfBadge
          class="ssf-product-card__badge"
          :class="[badgeColorClass, { 'display-none': !badgeLabel }]"
          >{{ badgeLabel }}</SfBadge
        >
      </slot>
      <!--
      <SfButton
        :aria-label="`${ariaLabel} ${title}`"
        :class="[wishlistIconClasses, { 'display-none': !wishlistIcon }]"
        data-testid="product-wishlist-button"
        @click="toggleIsInWishlist"
      >
        <slot name="wishlist-icon" v-bind="{ currentWishlistIcon }">
          <SfIcon
            v-if="currentWishlistIcon !== false"
            :icon="currentWishlistIcon"
            color="#CC0066"
            size="22px"
            data-test="sf-wishlist-icon"
          />
        </slot>
      </SfButton>-->
      <!--
      <div :class="{ 'display-none': !showAddToCartButton }">
        <slot
          name="add-to-cart"
          v-bind="{
            isAddedToCart,
            showAddedToCartBadge,
            isAddingToCart,
            title,
          }"
        >
          <SfCircleIcon
            class="ssf-product-card__add-button"
            :class="{ 'has-colors': colors.length }"
            :aria-label="`Add to Cart ${title}`"
            :has-badge="showAddedToCartBadge"
            :disabled="addToCartDisabled"
            data-testid="product-add-icon"
            @click="onAddToCart"
          >
            <span class="ssf-product-card__add-button--icons">
              <transition
                v-if="!isAddingToCart && !isAddedToCart"
                name="sf-pulse"
                mode="out-in"
              >
                <slot name="add-to-cart-icon">
                  <SfIcon
                    key="add_to_cart"
                    icon="add_to_cart"
                    size="20px"
                    color="white"
                  />
                </slot>
              </transition>
              <transition v-else name="sf-pulse" mode="out-in">
                <slot name="adding-to-cart-icon">
                  <SfIcon
                    key="added_to_cart"
                    icon="added_to_cart"
                    size="20px"
                    color="white"
                  />
                </slot>
              </transition>
            </span>
          </SfCircleIcon>
        </slot>
      </div>
      -->
    </div>
    <slot
      v-bind="{
        isAddedToCart,
        showAddedToCartBadge,
        isAddingToCart,
        title,
      }"
    >
      <div class="add-to-cart-button flex mt-2 justify-center">
        <input
          type="number"
          class="w-[20%] bg-light_accent mr-3 h-10 text-center"
          v-model="numberCart"
        />
        <SfButton @click="onAddToCart" class="rounded bg-secondary mr-[2%]"
          >Add To Cart</SfButton
        >
      </div>
    </slot>
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
    <slot name="title" v-bind="{ title, link }">
      <!-- <SfButton
        :link="link"
        class="sf-button--pure ssf-product-card__link mx-3"
        data-testid="product-link"
        v-on="$listeners"
      >
        <span class="ssf-product-card__title  md:min-h-[5rem]">
          {{ title }}
        </span>
      </SfButton> -->
      <nuxt-link :to="link">
        <h1
          :class="`mx-3 mt-1 text-center text-secondary md:min-h-[4rem] text-xs md:text-base text-extrathin md:min-w-${imageWidth}`"
        >
          {{ title }}
        </h1>
      </nuxt-link>
    </slot>
    <div class="mt-1 mx-3 flex justify-around">
      <slot name="review" v-bind="{ maxRating, scoreRating }">
        <div
          :class="{ 'display-none': !scoreRating }"
          class="ssf-product-card__reviews"
        >
          <SfRating
            v-if="typeof scoreRating === 'number'"
            class="ssf-product-card__rating"
            :max="maxRating"
            :score="scoreRating"
            size="4xl"
          />
          <SfButton
            :class="{ 'display-none': !reviewsCount }"
            :aria-label="`Read ${reviewsCount} reviews about ${title}`"
            class="sf-button--pure ssf-product-card__reviews-count"
            data-testid="product-review-button"
            @click="$emit('click:reviews')"
          >
            ({{ reviewsCount }})
          </SfButton>
        </div>
      </slot>
      <slot name="price" v-bind="{ specialPrice, regularPrice }">
        <!--<SfPrice
          :class="{ 'display-none': !regularPrice }"
          class="ssf-product-card__price"
          :regular="regularPrice"
          :special="specialPrice"
        />-->
        <RequestAQuote v-if="RequestStatus" :pId="variantId"/>
        <!-- <h5 class="text-secondary" v-if="regularPrice === 'unavailable'">
          Request Quote
        </h5> -->
        <button v-if="regularPrice ==='unavailable'" @click="toggleQuoteDialog">
          Request Quote</button>
        <p v-else  class="text-lg text-secondary">
          {{ parseFloat(regularPrice).toLocaleString() + '  ETB' }}
        </p>
        <div class="sf-price"></div>
      </slot>
    </div>
  </div>
</template>
<script>
import Toast from '~/components/Toast.vue';
import { computed, onMounted, inject } from '@vue/composition-api';
import { useUiState } from '~/composables';
import { colorsValues as SF_COLORS } from '@storefront-ui/shared/variables/colors';
import RequestAQuote from '~/components/RequestAQuote.vue';
import {
  SfPrice,
  SfRating,
  SfIcon,
  SfImage,
  SfCircleIcon,
  SfBadge,
  SfButton,
  SfColorPicker,
  SfColor
} from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';

export default {
  name: 'ProductCard',
  components: {
    SfPrice,
    SfRating,
    SfIcon,
    SfImage,
    SfCircleIcon,
    SfBadge,
    SfButton,
    SfColorPicker,
    SfColor,
    Toast,
    RequestAQuote,
  },  
  props: {
    id: {
      type: [Number, String],
      default: ''
    },
    image: {
      type: [Array, Object, String],
      default: ''
    },
    imageWidth: {
      type: [Number, String],
      default: null
    },
    imageHeight: {
      type: [Number, String],
      default: null
    },
    badgeLabel: {
      type: String,
      default: ''
    },
    badgeColor: {
      type: String,
      default: ''
    },
    colors: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    link: {
      type: [String, Object],
      default: null
    },

    /**
     * Link element tag
     * @deprecated will be removed in 1.0.0 use slot to replace content
     */
    linkTag: {
      type: String,
      default: undefined
    },
    scoreRating: {
      type: [Number, Boolean, String],
      default: false
    },
    reviewsCount: {
      type: [Number, Boolean],
      default: false
    },
    maxRating: {
      type: [Number, String],
      default: 5
    },
    regularPrice: {
      type: [Number, String],
      default: null
    },
    specialPrice: {
      type: [Number, String],
      default: null
    },
    wishlistIcon: {
      type: [String, Array, Boolean],
      default: 'heart'
    },
    isInWishlistIcon: {
      type: [String, Array],
      default: 'heart_fill'
    },
    isInWishlist: {
      type: Boolean,
      default: false
    },
    showAddToCartButton: {
      type: Boolean,
      default: false
    },
    isAddedToCart: {
      type: Boolean,
      deafult: false
    },
    addToCartDisabled: {
      type: Boolean,
      default: false
    },
    imageTag: {
      type: String,
      default: ''
    },
    nuxtImgConfig: {
      type: Object,
      default: () => ({})
    },
    variantId: {
      type: String,
      default: ''
    },
    isOrderBased: {
      type: Boolean,
      default: false
    },
    productID: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      isAddingToCart: false,
      openColorPicker: false,
      numberCart: 1
    };
  },
  computed: {
    isSFColors() {
      return SF_COLORS.includes(this.badgeColor.trim());
    },
    badgeColorClass() {
      return this.isSFColors ? `${this.badgeColor.trim()}` : '';
    },
    currentWishlistIcon() {
      return this.isInWishlist ? this.isInWishlistIcon : this.wishlistIcon;
    },
    showAddedToCartBadge() {
      return !this.isAddingToCart && this.isAddedToCart;
    },
    ariaLabel() {
      return this.isInWishlist ? 'Remove from wishlist' : 'Add to wishlist';
    },
    wishlistIconClasses() {
      const defaultClass = 'sf-button--pure ssf-product-card__wishlist-icon';
      return `${defaultClass} ${this.isInWishlist ? 'on-wishlist' : ''}`;
    },
    showBadge() {
      return this.colors.length > 5;
    }
  },
  setup() {
    const showToast = inject('showToast');
    const { isDarkMode,toggleQuoteModal } = useUiState();
    const RequestStatus = ref(false);
    const toggleQuoteDialog = () => {
      RequestStatus.value = true;
      toggleQuoteModal();
    };
    const toastShower = (message) => {
      showToast(message);
    };
    return {
      isDarkMode,
      toastShower,
      toggleQuoteModal,
      toggleQuoteDialog,  
      RequestStatus,
    };
  },
  methods: {
    toggleIsInWishlist() {
      this.toastShower('Item added to wishlist');
      this.$emit('click:wishlist', !this.isInWishlist);
      this.$root.$emit('emitWishList');
    },
    onAddToCart(event) {
      event.preventDefault();
      this.isAddingToCart = true;
      setTimeout(() => {
        this.isAddingToCart = false;
      }, 1000);
      this.$emit('click:add-to-cart', {
        _variantId: this.variantId,
        quantity: Number(this.numberCart)
      });
    },
    handleSelectedColor(colorIndex) {
      if (this.colors.length > 0) {
        this.colors.map((color, i) => {
          if (colorIndex === i) {
            this.$emit('click:colors', color);
            this.openColorPicker = false;
          }
        });
      }
    },
    toggleColorPicker() {
      this.openColorPicker = !this.openColorPicker;
    },
    addToCompareList() {
      if (
        this.$store.state.compareList?.productsToCompare?.length < 5 &&
        this.id !== '' &&
        this.variantId !== ''
      ) {
        if (
          this.$store.state.compareList?.productsToCompare?.filter(
            (e) => e?.productID === this.id && e?.variantID === this.variantId
          ).length === 0
        ) {
          this.toastShower('Added to Compare List');
          this.$store.dispatch('compareList/addToCompareList', {
            product: {
              productID: this.id,
              variantID: this.variantId,
              image: this.image
            }
          });
        } else {
          this.toastShower('Item is already in the list');
        }
      } else {
        this.toastShower('Limit to Compare Products reached');
      }
    }
  }
};
</script>
<style scoped lang="scss">
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
.sf-image {
  object-fit: contain !important;
}
.orderBased {
 z-index: 3;
}
</style>
