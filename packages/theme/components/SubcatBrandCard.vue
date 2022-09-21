<template>
  <div class="mt-5 grid grid-cols-4">
    <div
      class="card shadow-lg w-52 my-3 mr-5 bg-white rounded-lg transform transition duration-200 hover:shadow-2xl border border-light_accent"
      v-for="product in filteredProducts"
      :key="product.id"
    >
      <a :href="'/v/' + product.slug">
        <LazyHydrate>
          <img
            class="object-cover h-52 w-48 rounded-t-lg m-2"
            :src="product.featuredAsset.preview"
            alt="image"
          />
        </LazyHydrate>
      </a>
      <a :href="'/v/' + product.slug">
        <h4 class="text-center font-serif m-3">{{ product.name }}</h4>
      </a>
      <p class="text-center m-3">
        {{ String(product.variants[0].price).slice(0, -2) }}.00
      </p>
      <div class="text-center">
        <button class="mb-4">
          <a
            class="mx-10 bg-dark text-white font-bold py-2 px-4 rounded"
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
};
</script>

<style></style>
