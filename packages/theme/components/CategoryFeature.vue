<template>
  <div class="">
    <!-- <h3 class="font-bold mt-12 pb-2 border-b border-gray-200">Featured Categories</h3> -->
    <div class="p-3 md:p-20">
      <div
        data-aos="slide-up"
        class="w-full md:h-24 md:bg-primary md:p-20 md:before:content-[''] md:before:mr-8 md:before:mb-2 md:before:w-1/4 md:before:h-2 md:before:bg-dark_gray md:before:inline-block md:after:content-[''] md:after:ml-8 md:after:mb-2 md:after:w-1/4 md:after:h-2 md:after:bg-dark_gray md:after:inline-block text-left md:text-center"
      >
        <span class="text-3xl md:text-4xl text-primary md:text-white w-1/2"
          >Featured</span
        >
      </div>
    </div>
    <div
      class="grid grid-cols-1 gap-10 mt-10 mb-10 md:grid-cols-3"
      data-aos="fade-right"
    >
      <div v-for="category in headerNavigation" :key="category.label">
        <!-- <CategorySingle :title="category.label" :image="category.featuredAsset.preview" /> -->
        <div
          :style="!isDarkMode ? '' : 'background-color: #182533'"
          class="max-w-sm rounded overflow-hidden shadow-xl hover:bg-light_gray hover:text-secondary"
        >
          <div class="m-4">
            <h4 class="">{{ category.label }}</h4>
          </div>
          <nuxt-link :to="`/c/${category.slug}`">
            <img
              :src="
                category.featuredAsset
                  ? category.featuredAsset.preview
                  : '/categories/empty_image.png'
              "
              class="w-full h-32 sm:h-48 object-cover scale-75 hover:scale-100 ease-in duration-300"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, mounted } from '@vue/composition-api';
import CategorySingle from './CategorySingle.vue';
import HeaderSubNavigation from './HeaderSubNavigation.vue';
import {
  useCategory,
  categoryGetters,
  useFacet,
  facetGetters,
  useCms,
} from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import AOS from 'aos';
import { useUiState } from '~/composables';
import 'aos/dist/aos.css';
export default defineComponent({
  components: { CategorySingle },
  created() {
    this.getTree();
    // console.log(this.headerNavigation);
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
  setup() {
    const { isDarkMode } = useUiState();
    const headerNavigation = [];
    const { categories } = useCategory();

    const getTree = () => {
      categories.value.items.forEach((a) => {
        if (a.parent.name === '__root_collection__') {
          headerNavigation.push(facetGetters.getTree(a));
          // console.log("category featured asset  val is ", a.featuredAsset.preview)
        }
      });
    };
    const cats = [
      { title: 'Balance and Scales', image: '/categories/cat1.jpeg' },
      { title: 'Calibration', image: '/categories/cat2.jpeg' },
      { title: 'Electrical Products', image: '/categories/cat3.jpeg' },
      { title: 'Filtration Products', image: '/categories/cat4.jpg' },
      { title: 'Flowmeters', image: '/categories/cat5.jpg' },
    ];
    // console.log("the header navigation value is ", headerNavigation)

    // onMounted(()=> {
    //   console.log("the header navigation value is ", headerNavigation)
    // })

    return {
      cats,
      getTree,
      headerNavigation,
      isDarkMode,
    };
  },
});
</script>

<style scoped></style>
