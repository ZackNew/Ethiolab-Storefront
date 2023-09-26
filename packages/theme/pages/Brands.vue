<template>
  <div class="mt-12" id="brand">
    <nav
      class="sf-breadcrumbs m-4"
      aria-label="breadcrumbs"
      :style="
        !isDarkMode
          ? 'background-color: #f0f7fc !important'
          : 'background-color: #0e1621 !important'
      "
    >
      <ol class="sf-breadcrumbs__list">
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <nuxt-link class="sf-breadcrumbs__breadcrumb font-exrathin" to="/">
            Home
          </nuxt-link>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <p class="text-secondary">
            {{ brand.name }}
          </p>
        </li>
      </ol>
    </nav>
    <div class="grid grid-cols-11 mt-6">
      <!-- Side filter search or an Ad -->

      <div class="col-span-3">
        <!-- {{overflow-auto no-scrollbar}} -->
        <!-- sidebar -->
        <div>
          <div
            class="shadow-[3px_3px_10px_0_rgba(0,0,0,0.3)] rounded hidden md:block border-white overflow-auto top-[5%] no-scrollbar"
            :style="
              !isDarkMode
                ? 'background-color: white'
                : 'background-color: #182533'
            "
          >
            <div v-if="products.length > 0" class="py-[2%]">
              <SubcategoryBrandAccordion
                @maxAdded="maxInput"
                @minAdded="minInput"
                @searchChange="searchBox"
                @categoryClicked="filterCategory"
                @filterClicked="filterProducts"
                @clearClicked="clearFilters"
                :filters="filters"
                :categories="collectionList"
              />
            </div>
          </div>
          <!-- <div class="p-3 hidden md:block">
            <LazyHydrate>
               :buttonText="adSection.buttonText || 'AD Button'" 
              <Banner
                :title="adSection.title || 'AD Title'"
                :subtitle="adSection.overview || 'AD Overview'"
                :description="adSection.description || 'AD Description'"
                background=""
                :image="adImage || '/homepage/bannerA.webp'"
                link="/c/clinical-laboratory"
              >
              </Banner>
            </LazyHydrate>
          </div> -->
        </div>
      </div>
      <!-- Subcategory name and description -->
      <div class="ml-6 col-span-8">
        <h1
          class="sf-heading__title font-medium text-4xl font-sans text-secondary"
        >
          {{ brand.name }}
        </h1>
        <div
          :style="
            !isDarkMode
              ? 'background-color: #EfEfEf; color: #3860a7'
              : 'background-color: #182533; color: white'
          "
          class="rounded-md card shadow-lg my-4 flex mr-5 max-h-40"
        >
          <img
            class="rounded-r rounded-xl my-auto max-h-40 min-h-40 bg-light max-w-[25%] min-w-[25%]"
            :src="brandImage || '/categories/empty_image.png'"
            alt=""
          />
          <div class="w-full overflow-auto no-scrollbar">
            <p
              :style="!isDarkMode ? 'color: #3860a7' : 'color: #ffffff'"
              class="py-4 ml-4 mr-4 text-thin"
              v-html="brand.description"
            ></p>
          </div>
        </div>
        <div
          v-if="filteredSearchedProducts.length === 0 && !loading"
          class="border border-light_accent shadow-md bg-white rounded-lg w-full"
        >
          <div class="justify-end">
            <div class="flex flex-col items-center py-10">
              <img src="~/static/noProduct.png" alt="no product" />
              <h2>OOPS!</h2>
              <p>No Product Avaliable!</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="flex card mr-5 w-full h-12"
            :style="
              !isDarkMode
                ? 'background-color: #f0f7fc'
                : 'background-color: #182533'
            "
          >
            <p
              class="pt-3 mx-3"
              :style="!isDarkMode ? 'color: #3860a7' : 'color: #ffffff'"
            >
              Number of Results | {{ Object.keys(products).length }}
            </p>
            <div class="ml-8">
              <button
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                class="flex justify-between mt-2 mb-1 text-dark_accent bg-white transform transition duration-200 hover:shadow-2xl font-medium rounded-lg text-sm px-4 py-1.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 w-44"
                type="button"
                @click="open = !open"
              >
                {{ sortby }}
                <svg
                  class="ml-2 w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                    sortby = 'Name from A to Z';
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
                    sortby = 'Name from Z to A';
                  "
                  class="hover:bg-light_accent"
                >
                  Name from Z to A
                </button>
              </div>
            </div>
          </div>
          <div v-if="loading" class="mt-[7%]">
            <Loading />
          </div>
          <!-- Products -->
          <div class="mt-5 grid grid-cols-1 md:grid-cols-3">
            <div
              v-for="product in filteredSearchedProducts.slice(0, limit)"
              :key="product.id"
            >
              <!-- <p>{{product.name}}</p> -->
              <SubcatBrandCard :product="product" />
            </div>
          </div>
          <button
            v-if="filteredSearchedProducts.length > limit"
            class="text-secondary text-left"
            @click="increaseLimit"
          >
            Show More +
          </button>
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
import Banner from '~/components/Banner.vue';
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfAccordion,
  SfSearchBar,
  SfBreadcrumbs,
  SfBanner,
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import Loading from '~/components/Loading.vue';
import SubcategoryBrandAccordion from '~/components/SubcategoryBrandAccordion';
import axios from 'axios';
import { useCms } from '@vue-storefront/vendure';
import SubcatBrandCard from '../components/SubcatBrandCard.vue';
import useUiState from '~/composables/useUiState';
import CryptoJS from 'crypto-js';

export default {
  middleware: ['csrf'],
  name: 'brand',
  created() {
    this.getProducts();
  },
  data() {
    return {
      limit: 12,
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
      sortby: 'Sort By',
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

          let matchFound = false;
          if (product.collections.length > 0) {
            for (const collection of product.collections) {
              matchFound = filtersClicked.includes(collection.name);
              if (matchFound) {
                break;
              }
            }
          } else {
            matchFound = false;
          }
          const industries = [];
          product?.customFields?.industries?.forEach((i) =>
            industries.push(i.name)
          );
          return (
            // filtersClicked.includes(product.customFields.brand?.name) ||
            filtersClicked.some((r) => industries.indexOf(r) >= 0) ||
            filtersClicked.includes(product.facetValues[facetIndex]?.name) ||
            matchFound
          );
        }
        return true;
      });

      // const filterProducts = searchProduct.filter((product) => {
      // if (filtersClicked.length > 0) {
      // const facetIndex = product.facetValues.findIndex((facet) =>
      // filtersClicked.includes(facet.name)
      // );
      // return (
      // filtersClicked.includes(product.customFields.industry?.name) ||
      // filtersClicked.includes(product.facetValues[facetIndex]?.name)
      // );
      // }
      // return true;
      // });

      if (this.A_Z) filterProducts.sort(this.generateSortFn('name', false));
      if (this.Z_A) filterProducts.sort(this.generateSortFn('name', true));
      // if (this.clickedCategory) {
      // filterProducts.filter((product) => {
      // product.collections.forEach((c) => {
      // return c.name === this.clickedCategory;
      // });
      // });
      // }
      return filterProducts;
    },
    industryList() {
      const industry = [];
      this.products.forEach((product) => {
        product.customFields.industries.forEach((i) => {
          industry.push(i?.name);
        });
      });
      const industries = [...new Set(industry)];
      return industries;
    },
    collectionList() {
      const collection = [];
      this.products.forEach((product) => {
        if (product.collections !== null) {
          product.collections.forEach((c) => {
            if (c?.parent?.name === '__root_collection__') {
              collection.push(c.name);
            }
          });
        }
      });
      const collections = [...new Set(collection)];
      return collections;
    },
    facetList() {
      const allFacets = [];
      this.products.forEach((element) => {
        if (element.facetValues.length !== 0) {
          element.facetValues.forEach((facet) => {
            allFacets.push(facet);
          });
        }
      });
      const semiFinalFacets = [];
      allFacets.forEach((f) => {
        const a = {};
        a[f.facet.name] = f.name;
        semiFinalFacets.push(a);
      });
      const finalFacets = semiFinalFacets.reduce((acc, curr) => {
        const key = Object.keys(curr)[0];
        const value = curr[key];
        const existingObj = acc.find((obj) => obj[key]);

        if (existingObj) {
          if (!existingObj[key].includes(value)) {
            existingObj[key].push(value);
          }
        } else {
          acc.push({
            [key]: [value],
          });
        }

        return acc;
      }, []);
      const facet = finalFacets.map((facet) => {
        const key = Object.keys(facet)[0];
        const value = facet[key];
        return {
          filter_title: key,
          filter_options: value,
        };
      });
      return facet;
    },
    filters() {
      return [
        {
          filter_title: 'Industry',
          filter_options: this.industryList,
        },
      ].concat(this.facetList);
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
    increaseLimit() {
      this.limit += 8;
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
          parent {
            name
          }
          }
          featuredAsset{
          preview
          }
          variants{
          id
          price
          priceWithTax
          }
          facetValues{
          name
          facet{
          name
          }
          }
          customFields{
            is_order_based
          industries{
          name
          }
          }
          }
          }
          }`,
        variables: {
          id: id,
        },
        csrfToken: this.$store.state.csrfToken.csrfToken,
      };
      const token = CryptoJS.AES.encrypt(
        this.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };

      const brandResult = await axios.post('/api/shop', body, options);
      this.loading = false;
      this.brand = brandResult.data.data.data?.brand;
      this.brandImage = brandResult.data.data.data?.brand.icon?.preview;
      this.products = brandResult.data.data.data?.brand.products;
    },
    clearFilters() {
      this.filtersClicked = [];
      this.low = 0;
      this.high = 1000000000;
    },
  },
  setup() {
    const { isDarkMode } = useUiState();
    const { getCms } = useCms();
    const adSection = computed(() =>
      JSON.parse(getCms.value[3]?.content ?? '{}')
    );
    const adImage = computed(() => getCms.value[3]?.featuredAsset.preview);
    return {
      adSection,
      adImage,
      isDarkMode,
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
    Banner,
    Loading,
  },
};
</script>

<style scoped lang="scss">
#brand {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1250px;
    margin: 0 auto;
  }
}
.no-scrollbar::-webkit-scrollbar {
  width: 30px;
  background-color: none;
  width: 7px;
}
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #acacac;
  border-radius: 100px;
}

.sticky {
  display: block;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>
