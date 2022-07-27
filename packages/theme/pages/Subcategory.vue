<template>
  <div>
    <!-- <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    /> -->
    <p class="mt-4 ml-4 mb-2 text-sm text-gray">
      <NuxtLink to="/">Home</NuxtLink> | <NuxtLink to="#">Category</NuxtLink> |
      <span>Subcategory</span>
    </p>
    <div class="flex mt-4">
      <!-- Side filter search -->
      <SubcategoryBrandAccordion :filters="filterrs" />
      <!-- Subcategory name and description -->
      <div class="ml-2">
        <h2 class="sf-heading__title font-light text-4xl font-sans text-gray">
          {{ name }}
        </h2>
        <div class="card shadow-lg my-4 flex w-auto mr-5">
          <img
            class="h-36 w-auto my-auto bg-light"
            :src="subcategoryImage"
            alt=""
          />
          <div class="bg-faded_black">
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

        <div class="card mr-5 w-auto h-12 bg-light_accent">
          <p class="float-left pt-3 ml-3">Number of Results | sortby</p>
          <button class="mt-2 ml-3 bg-dark p-1">Best Match</button>
        </div>
        <!-- Products -->
        <div class="grid grid-cols-4">
          <div
            class="card shadow-lg w-52 my-3 ml-2 bg-light_accent"
            v-for="product in result"
            :key="product.id"
          >
            <img
              class="h-36"
              v-for="(img, index) in product.assets"
              :key="index"
              :src="img.preview"
              alt="image"
            />
            <!-- <h3 class="text-center m-3">link</h3> -->
            <h4 class="text-center font-serif m-3">{{ product.name }}</h4>
            <p
              class="text-center m-3"
              v-for="(price, index) in product.variants"
              :key="index"
            >
              {{ String(price.price).slice(0, -2) }}
            </p>
            <nuxt-link
              class="mx-12 my-4 bg-dark text-white font-bold py-2 px-4 rounded"
              :to="'/v/' + product.slug"
            >
              View All
            </nuxt-link>
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
</template>

<script>
import { computed, onMounted, ref, onBeforeMount } from '@vue/composition-api';
import { SfAccordion, SfSearchBar, SfBreadcrumbs } from '@storefront-ui/vue';
import SubcategoryBrandAccordion from '~/components/SubcategoryBrandAccordion';
import {
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
  setup(props, context) {
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
    const { name, featuredAsset, description, filters } =
      activeSubcategory.value;
    const subcategoryImage = featuredAsset?.preview;

    // =========================================================== //

    // let cbody = {
    //   query: `query getCollection($slug: String) {
    //             collection(slug: $slug) {
    //               name
    //               description
    //               featuredAsset {
    //                 source
    //               }
    //               filters {
    //                 args {
    //                   value
    //                 }
    //               }
    //             }
    //           }`,
    //   variables: {
    //     slug: lastSlug,
    //   },
    // };

    // let coptions = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    // const activeCat = ref(null);
    // axios
    //   .post('http://localhost:3000/shop-api', cbody, coptions)
    //   .then((response) => (activeCat.value = response.data?.data?.collection));

    // console.log('me me me', activeCat.value);

    // ================================================= ||

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
      result,
      // activeCat,
      subcategoryImage,
      activeSubcategory,
      // breadcrumbs,
    };
  },
  components: {
    SfAccordion,
    SfSearchBar,
    SfBreadcrumbs,
    SubcategoryBrandAccordion,
  },
};
</script>

<style></style>
