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
          {{ brand.name }}
        </li>
      </ol>
    </nav>
    <div class="flex mt-4">
      <!-- Side filter search or an Ad -->
      <div
        v-if="Object.keys(products).length === 0"
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
      <SubcategoryBrandAccordion
        v-else
        :filters="filters"
        :categories="categories"
      />
      <!-- Subcategory name and description -->
      <div class="ml-6">
        <h2 class="sf-heading__title font-light text-4xl font-sans text-gray">
          {{ brand.name }}
        </h2>
        <div class="card shadow-lg my-4 flex w-auto mr-5">
          <img class="h-36 w-auto my-auto bg-light" :src="brandImage" alt="" />
          <div class="bg-faded_black w-full">
            <p class="py-4 ml-4 mr-4 text-white" v-html="brand.description"></p>
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
          v-if="Object.keys(products).length === 0"
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
            <p class="float-left pt-3 ml-3">
              Number of Results | {{ Object.keys(products).length }}
            </p>
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
                  :src="product.featuredAsset.preview"
                  alt="image"
                />
              </div>
              <h4 class="text-center font-serif m-3">{{ product.name }}</h4>
              <p class="text-center m-3">
                {{ String(product.variants[0].price).slice(0, -2) }}.00
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
import {
  SfAccordion,
  SfSearchBar,
  SfBreadcrumbs,
  SfBanner,
} from '@storefront-ui/vue';
import { computed, onMounted, ref, onBeforeMount } from '@vue/composition-api';
import SubcategoryBrandAccordion from '~/components/SubcategoryBrandAccordion';
import axios from 'axios';
import { useCms } from '@vue-storefront/vendure';

export default {
  name: 'brand',
  created() {
    this.getProducts();
  },
  data() {
    return {
      products: [],
      brandImage: '',
      brand: {},
    };
  },
  methods: {
    async getProducts() {
      const id = this.$route.params.id;
      const body = {
        query: `query getProductByBrand($id: ID!){
                  brand(id: $id){
                    name
                    description
                    icon{
                      preview
                    }
                    products{
                      id
                      name
                      slug
                      featuredAsset{
                        preview
                      }
                      variants{
                        price
                      }
                    }
                  }
                }`,
        variables: {
          id: id,
        },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const brandResult = await axios.post(
        'http://localhost:3000/shop-api',
        body,
        options
      );
      this.brand = brandResult.data.data.brand;
      this.brandImage = brandResult.data.data.brand.icon?.preview;
      this.products = brandResult.data.data.brand.products;
      console.log('this are the brand', brandResult);
    },
  },
  setup() {
    const { getCms } = useCms();
    const adSection = computed(() =>
      JSON.parse(getCms.value[3]?.content ?? '{}')
    );
    const adImage = computed(() => getCms.value[3]?.featuredAsset.preview);
    const filters = [
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
    const categories = [
      'Laboratory equipment',
      'Laboratiory Supplies',
      'Water Quality Products',
      'Test and Measurment',
      'Heating and Cooling',
    ];
    return {
      filters,
      categories,
      adSection,
      adImage,
    };
  },
  components: {
    SfBanner,
    LazyHydrate,
    SfAccordion,
    SfSearchBar,
    SfBreadcrumbs,
    SubcategoryBrandAccordion,
  },
};
</script>

<style></style>
