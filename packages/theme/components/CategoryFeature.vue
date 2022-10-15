<template>
  <div class="md:mx-80">
    <!-- <h3 class="font-bold mt-12 pb-2 border-b border-gray-200">Featured Categories</h3> -->
    <div class="md:p-3">
      <div class="w-full py-5 md:pt-14 md:text-center">
        <h1 class="">Featured</h1>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 md:mt-10 mb-10 md:grid-cols-3">
      <div v-for="category in headerNavigation" :key="category.label" class="">
        <!-- <CategorySingle :title="category.label" :image="category.featuredAsset.preview" /> -->
        <div class="rounded overflow-hidden text-secondary mx-auto bg- mb-5">
          <nuxt-link :to="`/c/${category.slug}`">
            <img
              :src="
                category.featuredAsset
                  ? category.featuredAsset.preview
                  : '/categories/empty_image.png'
              "
              class="w-full h-32 md:h-72 object-cover shadow-xl"
            />
          </nuxt-link>
          <div class="mt-1">
            <h4 class="text-2xl">{{ category.label }}</h4>
          </div>
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
