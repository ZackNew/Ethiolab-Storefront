<template>
  <div>
    <!-- <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    /> -->
    <p class="mt-4 mb-2 text-sm text-gray">
      <NuxtLink to="/">Home</NuxtLink> |
      <NuxtLink to="/">Shope by brand</NuxtLink> |
      <span>brand name</span>
    </p>
    <!-- Side Bar -->
    <div class="flex mt-4">
      <SubcategoryBrandAccordion
        :categories="categories"
        :filters="filters"
        class="w-72"
      />

      <!-- Main Content -->
      <div class="ml-6">
        <h2 class="sf-heading__title font-light text-4xl font-sans text-gray">
          {{ brand.name }}
        </h2>
        <div class="card shadow-lg mt-4 flex w-auto mr-5">
          <img class="h-36 w-auto my-auto bg-light" :src="brandImage" alt="" />
          <div class="bg-faded_black w-full">
            <p class="py-4 ml-4 mr-4 text-white" v-html="brand.description"></p>
          </div>
        </div>

        <div class="card mr-5 w-auto h-12 bg-light_accent">
          <p class="float-left pt-3 ml-3">Number of Results | sortby</p>
        </div>

        <div class="grid grid-cols-4">
          <div
            class="card shadow-lg w-52 my-3 mr-10 bg-light_accent"
            v-for="product in products"
            :key="product.id"
          >
            <div class="min-h-[50%]">
              <img :src="product.featuredAsset.preview" alt="" />
            </div>
            <h3 class="text-center m-3">{{ product.name }}</h3>
            <h4 class="text-center font-serif m-3">
              {{ String(product.variants[0].price).slice(0, -2) }}.00
            </h4>
            <button
              class="mx-12 my-4 bg-dark text-white font-bold py-2 px-4 rounded"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SfAccordion, SfSearchBar, SfBreadcrumbs } from '@storefront-ui/vue';
import { getFragmentQueryDocument } from 'apollo-utilities';
import SubcategoryBrandAccordion from '~/components/SubcategoryBrandAccordion';
import axios from 'axios';

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
      let baseUrl = env.process.GRAPHQL_API
      const brandResult = await axios.post(
        baseUrl,
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
