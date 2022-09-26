<template>
  <div>
    <!-- <h3 class="font-bold mt-12 pb-2 border-b border-gray-200">Best Seller</h3> -->
    <div class="p-3 md:p-20">
      <div
        v-if="bestSellings.length !== 0"
        data-aos="fade-left"
        class="w-full h-24 p-20 before:content-[''] before:mr-8 before:mb-2 before:w-1/6 before:h-2 before:bg-dark_gray before:inline-block after:content-[''] after:ml-8 after:mb-2 after:w-1/6 after:h-2 after:bg-dark_gray after:inline-block text-center"
      >
        <span class="text-4xl w-1/4">Best Seller</span>
      </div>
    </div>
    <div
      class="grid grid-cols-1 gap-10 mt-10 mb-10 md:grid-cols-3"
      data-aos="fade-left"
    >
      <div v-for="category in bestSellings" :key="category.title">
        <BestSellerSingle :title="category.name" :image="category.preview" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, mounted } from '@vue/composition-api';
import BestSellerSingle from './BestSellerSingle.vue';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
export default defineComponent({
  data() {
    return {
      cats: null,
      bestSellings: [],
    };
  },
  components: { BestSellerSingle },
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
  setup() {
    const categories = [
      { title: 'Balance and Scales', image: '/categories/empty_image.png' },
      { title: 'Calibration', image: '/categories/empty_image.png' },
      { title: 'Electrical Products', image: '/categories/empty_image.png' },
      // {title:"Filtration Products" , image:"/categories/cat4.jpg"},
      // {title:"Flowmeters" , image:"/categories/cat5.jpg"}
    ];

    return {
      categories,
    };
  },
  methods: {
    async getBestSellers() {
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `
        query{
          bestSellingProducts{
            name
            preview
            slug
          }
        }
        `,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const bestSeller = await axios.post(baseUrl, body, options);
      this.bestSellings = bestSeller.data.data.bestSellingProducts;
      console.log('ddddddddjjjjjjjjjjjj', bestSeller);
    },
  },
  created() {
    this.getBestSellers();
  },
});
</script>

<style scoped></style>
