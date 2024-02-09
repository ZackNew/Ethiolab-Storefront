<template>
  <div>
    <div>
      <div v-if="products.length > 0">
        <h2 class="text-secondary text-center my-10">Related Products</h2>
        <VueSlickCarousel class="carousel-wrapper" v-bind="settings">
          <template #prevArrow>
            <div class="arrows">
              <svg
                class="w-12 h-12 text-secondary -ml-6"
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
          <template #nextArrow>
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
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </template>
          <div v-for="product in products" :key="product.productId">
            <div
              class="max-w-48 min-w-48 mr-3 pb-4 items-center"
              :class="isDarkMode ? 'bg-[#182533]' : 'bg-white'"
            >
              <div class="p-3">
                <nuxt-link :to="`/v/${product.slug}`">
                  <img
                    :src="
                      product.productAsset ? product.productAsset.preview : ''
                    "
                    class="w-full max-h-[20rem] min-h-[20rem] object-cover"
                    alt="image"
                  />
                </nuxt-link>
              </div>
              <h1
                class="mx-3 text-primary text-sm md:text-2xl font-bold md:min-h-[5rem] text-center"
              >
                {{ product.productName }}
              </h1>
              <h4
                v-if="product.price.min === product.price.max"
                class="text-secondary font-bold mx-3 text-center"
              >
                {{product.price.min/100}}
                ETB
              </h4>
              <h4 v-else class="text-secondary font-bold text-center">
                {{product.price.min/100}}
                ETB -
                {{product.price.max/100}}
                ETB
              </h4>
              <div class="mx-auto">
                <nuxt-link :to="`/v/${product.slug}`">
                  <button
                    class="px-5 py-2 bg-secondary text-white font-bold rounded ml-24"
                  >
                    View All
                  </button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import { useUiState } from '~/composables';

export default {
  data() {
    return {
      settings: {
        dots: true,
        focusOnSelect: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
    VueSlickCarousel,
  },
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  computed: {
    slugs() {
      let x = [];
      const p = this.products.map((p) => {
        x.push(p.slug);
      });
      return this.products;
    },
  },
  methods: {
    async getRelated() {},
  },
  created() {
    this.getRelated();
  },
  setup() {
    const { isDarkMode } = useUiState();
    return {
      isDarkMode,
    };
  },
};
</script>

<style></style>
