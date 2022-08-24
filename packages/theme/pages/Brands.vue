<template>
  <div class="mt-12">
    <nav class="sf-breadcrumbs m-4" aria-label="breadcrumbs">
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
    <div class="flex mt-6">
      <!-- Side filter search or an Ad -->
      <div class="shadow-2xl rounded-lg w-2/10 h-3/4">
        <div v-if="products.length > 0">
          <SubcategoryBrandAccordion
            @maxAdded="maxInput"
            @minAdded="minInput"
            @searchChange="searchBox"
            @categoryClicked="filterCategory"
            @filterClicked="filterProducts"
            :filters="filters"
            :categories="collectionList"
          />
        </div>
        <div class="p-3">
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
      </div>
      <!-- Subcategory name and description -->
      <div class="ml-6 w-full">
        <h2 class="sf-heading__title font-medium text-4xl font-sans text-gray">
          {{ brand.name }}
        </h2>
        <div
          class="rounded-md bg-secondary card shadow-lg my-4 flex mr-5 max-h-40"
        >
          <img
            class="my-auto rounded-md max-h-40 bg-light max-w-[25%]"
            :src="brandImage || '/categories/empty_image.png'"
            alt=""
          />
          <div class="rounded w-full overflow-auto no-scrollbar">
            <p class="py-4 ml-4 mr-4 text-white" v-html="brand.description"></p>
          </div>
        </div>
        <div
          v-if="filteredSearchedProducts.length === 0 && !loading"
          class="border border-light_accent shadow-md bg-white rounded-lg w-full"
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
          <div class="flex card mr-5 w-full h-12 bg-light_accent">
            <p class="pt-3 mx-3">
              Number of Results | {{ Object.keys(products).length }}
            </p>
            <div class="ml-8">
              <button
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                class="mt-2 mb-1 text-dark_accent bg-white transform transition duration-200 hover:scale-105 font-medium rounded-lg text-sm px-4 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 w-44"
                type="button"
                @click="open = !open"
              >
                Sort Subcategory by
                <svg
                  class="ml-2 w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                v-if="open"
                id="dropdown"
                class="inset-0 relative flex flex-col z-10 w-44 bg-white border border-primary transform transition duration-300"
              >
                <button
                  @click="
                    A_Z = true;
                    Z_A = false;
                    open = false;
                  "
                  class="hover:bg-light_accent"
                >
                  Name from A to Z
                </button>
                <button
                  @click="
                    A_Z = false;
                    Z_A = true;
                    open = false;
                  "
                  class="hover:bg-light_accent"
                >
                  Name from Z to A
                </button>
              </div>
            </div>
          </div>
          <div v-if="loading">
            <img
              class="mt-16 w-20 h-20 mx-auto"
              src="~/assets/Loading_icon.gif"
              alt=""
            />
          </div>
          <!-- Products -->
          <SubcatBrandCard :filteredProducts="filteredSearchedProducts" />
          <!-- <div
            style="background-color: #e2e5de"
            class="card mr-16 ml-4 mt-5 w-auto h-12"
          >
            <p class="float-left pt-3 ml-3">Showing 1-10 of 10</p>
          </div> -->
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
import SubcatBrandCard from '../components/SubcatBrandCard.vue';

export default {
  name: 'brand',
  created() {
    this.getProducts();
  },
  data() {
    return {
      clickedCategory: '',
      open: false,
      A_Z: null,
      Z_A: null,
      search: '',
      loading: true,
      low: '',
      high: '',
      filtersClicked: [],
      products: [],
      brandImage: '',
      brand: {},
    };
  },
  computed: {
    filteredSearchedProducts() {
      const filtersClicked = this.filtersClicked;

      const lower = this.low || 0;

      const high = this.high || 1000000;

      let searchProduct = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.search.toLowerCase())
      );

      searchProduct = searchProduct.filter((product) => {
        let total_price = 0;
        for (const variant of product.variants) {
          total_price += Number(String(variant.price).slice(0, -2));
        }
        total_price = total_price / product.variants.length;

        return total_price >= lower && total_price <= high;
      });

      const filterProducts = searchProduct.filter((product) => {
        if (filtersClicked.length > 0) {
          const facetIndex = product.facetValues.findIndex((facet) =>
            filtersClicked.includes(facet.name)
          );
          return (
            filtersClicked.includes(product.customFields.industry?.name) ||
            filtersClicked.includes(product.facetValues[facetIndex]?.name)
          );
        }
        return true;
      });
      if (this.A_Z) filterProducts.sort(this.generateSortFn('name', false));
      if (this.Z_A) filterProducts.sort(this.generateSortFn('name', true));
      // if (this.clickedCategory) {
      //   filterProducts.filter((product) => {
      //     product.collections.forEach((c) => {
      //       return c.name === this.clickedCategory;
      //     });
      //   });
      // }
      return filterProducts;
    },
    industryList() {
      let industry = [];
      this.products.forEach((product) => {
        if (product.customFields.industry !== null) {
          industry.push(product.customFields.industry?.name);
        }
      });
      const industries = [...new Set(industry)];
      console.log('insider', this.products);
      return industries;
    },
    collectionList() {
      let collection = [];
      this.products.forEach((product) => {
        if (product.collections !== null) {
          product.collections.forEach((c) => {
            collection.push(c.name);
          });
        }
      });
      const collections = [...new Set(collection)];
      return collections;
    },
    facetList() {
      let facet = [];
      this.products.forEach((product) => {
        if (product.facetValues?.length !== 0) {
          product.facetValues.forEach((f) => {
            facet.push(f?.name);
          });
        }
      });
      const facets = [...new Set(facet)];
      return facets;
    },
    filters() {
      return [
        {
          filter_title: 'Industry',
          filter_options: this.industryList,
        },
        {
          filter_title: 'Facet',
          filter_options: this.facetList,
        },
      ];
    },
  },
  methods: {
    searchBox(event) {
      this.search = event;
    },
    maxInput(event) {
      this.high = event;
    },
    minInput(event) {
      this.low = event;
    },
    filterProducts(event) {
      if (event.checked) {
        this.filtersClicked.push(event.id);
      } else {
        const index = this.filtersClicked.indexOf(event.id);
        this.filtersClicked.splice(index, 1);
      }
    },
    filterCategory(event) {
      this.clickedCategory = event.id;
    },
    generateSortFn(prop, reverse) {
      return function (a, b) {
        if (a[prop].toLowerCase() < b[prop].toLowerCase())
          return reverse ? 1 : -1;
        if (a[prop].toLowerCase() > b[prop].toLowerCase())
          return reverse ? -1 : 1;
        return 0;
      };
    },
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
                      collections {
                        name
                      }
                      featuredAsset{
                        preview
                      }
                      variants{
                        price
                      }
                      facetValues{
                        name
                      }
                      customFields{
                        industry{
                          name
                        }
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
      this.loading = false;
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
    return {
      adSection,
      adImage,
    };
  },
  components: {
    SubcatBrandCard,
    SfBanner,
    LazyHydrate,
    SfAccordion,
    SfSearchBar,
    SfBreadcrumbs,
    SubcategoryBrandAccordion,
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
