<template>
  <div class="mx-40">
    <VueSlickCarousel class="carousel-wrapper" v-bind="settings">
      <template #prevArrow>
        <div class="arrows">
          <svg
            class="w-12 h-12 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </div>
      </template>
      /*...*/
      <template #nextArrow class="w-50 h-50">
        <div class="arrows">
          <svg
            class="w-12 h-12 text-secondary -ml-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </template>
      <!-- <div v-for="product in items" :key="product._id">
        <ProductCard
          :title="product.name"
          :image="product.image"
          :regular-price="product.price.current + ' ETB'"
          imageHeight="20.25rem"
          imageWidth="100%"
          :alt="product.name"
          :max-rating="5"
          :score-rating="3"
          :show-add-to-cart-button="true"
          :isInWishlist="isInWishlist({ product })"
          :isAddedToCart="isInCart({ product })"
          :link="localePath(`/v/${product.slug}`)"
          @click:wishlist="
            !isInWishlist({ product })
              ? addItemToWishlist({ product })
              : removeItemFromWishlist({ product })
          "
          @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
          class="carousel__item__product"
          style="border-radius: 15px"
        />
      </div> -->
      <div>
        <slot></slot>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import ProductCard from '~/components/ProductCard.vue';

export default {
  name: 'NewCarousel',
  data() {
    return {
      numbers: 15,
      settings: {
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
      },
    };
  },
  props: {
    // : {
    //   type: Array,
    //   default: null,
    // },
  },
  components: { VueSlickCarousel, ProductCard },
};
</script>

<style scoped>
.carousel-wrapper {
  padding: 40px;
}
.arrows {
  background-color: none;
}
</style>
