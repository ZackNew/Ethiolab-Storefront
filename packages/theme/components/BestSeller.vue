<template>
  <div class="wrap">
    <!-- <h3 class="font-bold mt-12 pb-2 border-b border-gray-200">Best Seller</h3> -->
    <div class="p-2 md:p-3">
      <div v-if="bestSellers.length !== 0" class="w-full text-center">
        <h1 class="md:text-4xl text-secondary">Best Seller</h1>
      </div>
    </div>

    <div v-if="bestSellers.length !== 0">
      <VueSlickCarousel class="carousel-wrapper" v-bind="settings">
        <template #prevArrow>
          <div class="arrows">
            <svg
              class="w-12 h-12 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
        <template #nextArrow>
          <div class="arrows">
            <svg
              class="w-12 h-12 text-secondary -ml-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
        <div v-for="product in bestSellers" :key="product._id">
          <ProductCard
            :id="product._id"
            :title="product.name"
            :image="product.images"
            :regular-price="product.price.current + ' ETB'"
            :imageHeight="340"
            :imageWidth="500"
            :alt="product.name"
            :max-rating="5"
            :score-rating="3"
            :variantId="product._variantId"
            :show-add-to-cart-button="true"
            :isInWishlist="isInWishlist({ product })"
            :isAddedToCart="isInCart({ product })"
            :link="localePath(`/v/${product.slug}`)"
            @click:wishlist="
              !isInWishlist({ product })
                ? addItemToWishlist({ product })
                : removeItemFromWishlist({ product })
            "
            @click:add-to-cart="addToCart"
            class="carousel__item__product mr-2"
            style="border-radius: 15px"
          />
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import { defineComponent, mounted } from '@vue/composition-api';
import Carousel from './carousel.vue';
import NewCarousel from './NewCarousel.vue';
import BestSellerSingle from './BestSellerSingle.vue';
import ProductCard from './ProductCard.vue';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import { useWishlist, useCart } from '@vue-storefront/vendure';
export default defineComponent({
  data() {
    return {
      numberCart: 1,
      cats: null,
      bestSellings: [],
      number: 10,
      settings: {
        dots: true,
        focusOnSelect: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
        centerMode: true,
        centerPadding: '20px',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  components: {
    BestSellerSingle,
    Carousel,
    ProductCard,
    VueSlickCarousel,
    NewCarousel,
  },
  mounted() {
    AOS.init({
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 3000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  },
  props: {
    bestSellers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const { addItem: addItemToCart, isInCart, cart } = useCart();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };
    const addToCart = (e) => {
      addItemToCart({
        product: {
          _variantId: e._variantId,
        },
        quantity: e.quantity,
      });
    };
    const categories = [
      { title: 'Balance and Scales', image: '/categories/empty_image.png' },
      { title: 'Calibration', image: '/categories/empty_image.png' },
      { title: 'Electrical Products', image: '/categories/empty_image.png' },
      // {title:"Filtration Products" , image:"/categories/cat4.jpg"},
      // {title:"Flowmeters" , image:"/categories/cat5.jpg"}
    ];

    return {
      categories,
      isInWishlist,
      isInCart,
      toggleWishlist,
      addItemToCart,
      addItemToWishlist,
      removeItemFromWishlist,
      addToCart,
    };
  },
  methods: {},
  created() {
    // this.getBestSellers();
  },
});
</script>

<style scoped>
.carousel-wrapper {
  padding: 40px;
}
.arrows {
  background-color: none;
}
.wrap {
  @include for-desktop {
    max-width: 1100px !important;
    margin: auto;
  }
}
</style>
