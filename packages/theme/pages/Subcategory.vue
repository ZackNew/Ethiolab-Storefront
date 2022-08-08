<template>
  <div>
    <nav class="sf-breadcrumbs" aria-label="breadcrumbs">
      <ol class="sf-breadcrumbs__list">
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <nuxt-link class="sf-breadcrumbs__breadcrumb" to="/">
            Home
          </nuxt-link>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <nuxt-link
            class="sf-breadcrumbs__breadcrumb"
            :to="`/c/${parent.slug}`"
          >
            {{ parent.name }}
          </nuxt-link>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          {{ name }}
        </li>
      </ol>
    </nav>
    <div class="flex mt-4">
      <!-- Side filter search or an Ad -->
      <div
        v-if="products === false"
        class="border shadow-2xl rounded ml-4 w-2/6 h-3/4 mt-5"
      >
        <LazyHydrate>
          <SfBanner
            :title="adSection.title || 'AD Title'"
            :subtitle="adSection.overview || 'AD Overview'"
            :description="adSection.description || 'AD Description'"
            :buttonText="adSection.buttonText || 'AD Button'"
            background=""
            :image="adImage || '/homepage/bannerA.webp'"
            link="/c/clinical-laboratory"
          >
          </SfBanner>
        </LazyHydrate>
      </div>
      <SubcategoryBrandAccordion v-else :filters="filterrs" />
      <!-- Subcategory name and description -->
      <div class="ml-6">
        <h2 class="sf-heading__title font-light text-4xl font-sans text-gray">
          {{ name }}
        </h2>
        <div class="card shadow-lg my-4 flex w-auto mr-5">
          <img
            class="h-36 w-auto my-auto bg-light"
            :src="subcategoryImage"
            alt=""
          />
          <div class="bg-faded_black w-full">
            <p class="py-4 ml-4 mr-4 text-white" v-html="description"></p>
          </div>
        </div>
        <!-- Ad section -->
        <div
          style="background-color: #e2e5de"
          class="flex card mr-5 w-auto h-16 mb-10"
        >
          <img class="w-32 object-cover" src="../static/icon.png" alt="" />
          <div class="relative overflow-hidden">
            <img class="w-full" src="../static/homepage/bannerA.webp" alt="" />
            <div
              class="absolute flex justify-evenly w-full bottom-0 inset-x-0 py-2 text-xs leading-4"
            >
              <p class="font-semibold text-4xl font-sans -ml-16">
                This is a AD
              </p>
              <button class="bg-blue-500 font-bold">Shop Now</button>
            </div>
          </div>
        </div>
        <div
          v-if="products === false"
          class="border border-light_accent shadow-md bg-white rounded-lg"
        >
          <div class="justify-end">
            <div class="flex flex-col items-center py-10">
              <img src="~/static/noProduct.png" alt="" />
              <h2>OOPS!</h2>
              <p>No Product Avaliable!</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="card mr-5 w-auto h-12 bg-light_accent">
            <p class="float-left pt-3 ml-3">Number of Results | 0</p>
          </div>
          <!-- Products -->
          <div class="grid grid-cols-4">
            <div
              class="card shadow-lg w-52 my-3 ml-2 bg-light_accent"
              v-for="product in products"
              :key="product.id"
            >
              <div class="min-h-[50%]">
                <img
                  class="h-auto w-52"
                  v-for="(img, index) in product.assets"
                  :key="'img' + index"
                  :src="img.preview"
                  alt="image"
                />
              </div>
              <h4 class="text-center font-serif m-3">{{ product.name }}</h4>
              <p class="text-center m-3">
                {{ String(product.variants[0].price).slice(0, -2) }}
                <!-- {{ String(price.price).slice(0, -2) }} -->
              </p>
              <button class="mb-4">
                <nuxt-link
                  class="mx-14 bg-dark text-white font-bold py-2 px-4 rounded"
                  :to="'/v/' + product.slug"
                >
                  View All
                </nuxt-link>
              </button>
            </div>
          </div>

          <div
            style="background-color: #e2e5de"
            class="card mr-16 ml-4 mt-5 w-auto h-12"
          >
            <p class="float-left pt-3 ml-3">Showing 1-10 of 10</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import { computed, onMounted, ref, onBeforeMount } from '@vue/composition-api';
import {
  SfAccordion,
  SfSearchBar,
  SfBreadcrumbs,
  SfBanner,
} from '@storefront-ui/vue';
import SubcategoryBrandAccordion from '~/components/SubcategoryBrandAccordion';
import {
  useCms,
  useFacet,
  facetGetters,
  useCategory,
  useProduct,
} from '@vue-storefront/vendure';
import { useUiHelpers } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import axios from 'axios';

export default {
  name: 'Subcategory',
  setup(props, { root }) {
    const th = useUiHelpers();
    const lastSlug = th.getLastSlugFromParams();
    const { categories } = useCategory();
    const activeSubcategory = computed(() => {
      for (let category of categories.value.items) {
        const { slug } = category;
        if (slug === lastSlug) {
          return category;
        }
      }
    });
    const { getCms } = useCms();
    const adSection = computed(() =>
      JSON.parse(getCms.value[3]?.content ?? '{}')
    );
    const { name, featuredAsset, description, filters, parent } =
      activeSubcategory.value;
    const subcategoryImage = featuredAsset?.preview;

    const products = ref(null);

    if (filters[0]?.args[0]?.name === 'productIds') {
      const productIdString = JSON.parse(filters[0]?.args[0].value);
      const productId = productIdString.map((num) => {
        return String(num);
      });

      let pbody = {
        query: `query getProductById($in: [String!]) {
                  products(options: {filter: {id: {in: $in}}}) {
                    items {
                      name
                      id
                      slug
                      description
                      variants {
                        price
                      }
                      assets {
                        preview
                      }
                    }
                  }
                }`,
        variables: {
          in: productId,
        },
      };

    let poptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = ref({});
    let baseUrl = process.env.GRAPHQL_API
    axios
      .post(baseUrl, pbody, poptions)
      .then(
        (response) => (result.value = response.data?.data?.products?.items)
      );

      axios
        .post('http://localhost:3000/shop-api', pbody, poptions)
        .then(
          (response) => (products.value = response.data?.data?.products?.items)
        );
    } else {
      products.value = false;
    }
    console.log('this one is ad', adSection);
    const filterrs = [
      {
        filter_title: 'Brand',
        filter_options: ['Sartorius', 'Ohaus', 'Cole parmer'],
      },
      { filter_title: 'Color', filter_options: ['Indigo', 'yellow', 'Cyan'] },
      {
        filter_title: 'Price Range',
        filter_options: [
          '1000 ETB and less',
          '1000 to 10,000 ETB',
          '10,000 ETB and more',
        ],
      },
      {
        filter_title: 'Calibration Type',
        filter_options: ['Internal', 'External', 'Internal Calibration'],
      },
      { filter_title: 'Capacity', filter_options: ['0.22', '0.31', '0.33'] },
    ];

    return {
      th,
      filterrs,
      description,
      name,
      adSection,
      products,
      // activeCat,
      subcategoryImage,
      activeSubcategory,
      parent,
    };
  },
  components: {
    LazyHydrate,
    SfAccordion,
    SfSearchBar,
    SfBreadcrumbs,
    SubcategoryBrandAccordion,
    SfBanner,
  },
};
</script>

<style></style>
