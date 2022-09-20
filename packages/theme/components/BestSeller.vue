<template>
  <div>
    <!-- <h3 class="font-bold mt-12 pb-2 border-b border-gray-200">Best Seller</h3> -->
    <div class="p-3 md:p-20">
      <div
        data-aos="fade-left"
        class="w-full md:h-24 md:bg-primary md:p-20 md:before:content-[''] md:before:mr-8 md:before:mb-2 md:before:w-1/4 md:before:h-2 md:before:bg-dark_gray md:before:inline-block md:after:content-[''] md:after:ml-8 md:after:mb-2 md:after:w-1/4 md:after:h-2 md:after:bg-dark_gray md:after:inline-block text-center"
      >
        <span class="text-3xl md:text-4xl text-black md:text-white w-1/2"
          >Best Seller</span
        >
      </div>
    </div>
    <div
      class="grid grid-cols-1 gap-10 mt-10 mb-10 md:grid-cols-3"
      data-aos="fade-left"
    >
      <div v-for="category in categories" :key="category.title">
        <BestSellerSingle :title="category.title" :image="category.image" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, mounted } from '@vue/composition-api';
import BestSellerSingle from './BestSellerSingle.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default defineComponent({
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
});
</script>

<style scoped></style>
