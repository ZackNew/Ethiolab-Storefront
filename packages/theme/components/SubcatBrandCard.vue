<template>
  <div class="mt-5 grid grid-cols-1 md:grid-cols-4">
    <div
      :style="
        !isDarkMode ? 'background-color: #ffffff' : 'background-color: #182533'
      "
      class="card shadow-lg w-80 md:w-52 my-3 mr-5 rounded-lg transform transition duration-200 hover:shadow-2xl border border-light_accent"
      v-for="product in filteredProducts"
      :key="product.id"
    >
      <a :href="'/v/' + product.slug">
        <LazyHydrate>
          <img
            class="object-cover h-52 w-72 md:w-48 rounded-t-lg m-2"
            :src="product.featuredAsset.preview"
            alt="image"
          />
        </LazyHydrate>
      </a>
      <a :href="'/v/' + product.slug">
        <div class="shadowInner m-1">
          <h4
            class="text-center font-serif m-3 text-xs md:text-xl max-h-[6rem] overflow-scroll nobar"
          >
            {{ product.name }}
          </h4>
        </div>
      </a>
      <p class="text-center m-3 text-xs md:text-base">
        {{ String(product.variants[0].price).slice(0, -2) }}.00
      </p>
      <div class="text-center">
        <button class="mb-4">
          <a
            class="text-xs md:text-base bg-dark text-white font-bold py-2 px-4 rounded"
            :href="'/v/' + product.slug"
          >
            {{ $t('View All') }}
          </a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUiState } from '~/composables';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'SubcatBrandCard',
  props: {
    filteredProducts: {
      type: Array,
      required: true,
    },
  },
  components: {
    LazyHydrate,
  },
  setup() {
    const { isDarkMode } = useUiState();
    return {
      isDarkMode,
    };
  },
};
</script>

<style scoped>
.nobar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.shadowInner {
  box-shadow: inset 5px 0px 5px -4px rgba(134, 134, 134, 0.8),
    5px 0px 5px -4px rgba(134, 134, 134, 0.8);
  z-index: 1;
}
</style>
