<template>
  <div class="mt-12" id="industry">
    <div class="grid grid-cols-11 mt-6">
      <!-- Side filter search or an Ad -->

      <div class="col-span-3">
        <nav
          class="sf-breadcrumbs sticky mb-2"
          aria-label="breadcrumbs"
          :style="
            !isDarkMode
              ? 'background-color: #f0f7fc !important'
              : 'background-color: #0e1621 !important'
          "
        >
          <ol class="sf-breadcrumbs__list">
            <li class="sf-breadcrumbs__list-item" :aria-current="false">
              <nuxt-link
                class="sf-breadcrumbs__breadcrumb font-exrathin"
                to="/"
              >
                Home
              </nuxt-link>
            </li>
            <!-- <li class="sf-breadcrumbs__list-item" :aria-current="false">
                {{ 'Industries' }}
                </li> -->
            <li class="sf-breadcrumbs__list-item" :aria-current="false">
              <p class="text-secondary">
                {{ industryName }}
              </p>
            </li>
          </ol>
        </nav>
        <div
          class="shadow-[3px_3px_10px_0_rgba(0,0,0,0.3)] rounded-xl hidden md:block border-white sticky h-[40rem] overflow-auto top-[5%] no-scrollbar"
          :style="
            !isDarkMode
              ? 'background-color: white !important'
              : 'background-color: #182533 !important'
          "
        >
          <div v-if="products.length > 0" class="py-[2%]">
            <SubcategoryBrandAccordion
              @searchChange="searchBox"
              @filterClicked="filterProducts"
              @maxAdded="maxInput"
              @minAdded="minInput"
              :filters="filters"
              :categories="categoriesList"
            />
            <!-- <p class="text-xl mx-4 mt-2 mb-2">Price Range</p>
              <div class="flex mx-4">
              <input
              v-model="low"
              class="rounded border border-primary w-12"
              type="number"
              placeholder="min..."
              />
              <p class="mx-2">to</p>
              <input
              v-model="high"
              class="rounded border border-primary w-12"
              type="number"
              placeholder="max..."
              />
              </div> -->
          </div>
          <!-- <div class="p-3">
              <LazyHydrate>
              <Banner
              :title="adSection.title || 'AD Title'"
              :subtitle="adSection.overview || 'AD Overview'"
              :description="adSection.description || 'AD Description'"
              :buttonText="adSection.buttonText || 'AD Button'"
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
        <h2
          class="sf-heading__title font-medium text-4xl font-sans text-secondary"
        >
          {{ industryName }}
        </h2>
        <div
          :style="
            !isDarkMode
              ? 'background-color: #EfEfEf; color: #3860a7'
              : 'background-color: #182533; color: white'
          "
          class="rounded-md shadow-lg my-4 flex mr-5 max-h-40"
        >
          <img
            class="rounded-xl my-auto max-h-40 min-h-40 bg-light max-w-[25%] min-w-[25%]"
            :src="industryImg || '/categories/empty_image.png'"
            alt=""
          />
          <div class="rounded w-full overflow-auto no-scrollbar">
            <p
              :style="!isDarkMode ? 'color: #3860a7' : 'color: #ffffff'"
              class="py-4 ml-4 mr-4 text-thin"
              v-html="description"
            ></p>
          </div>
        </div>
        <div
          v-if="products.length === 0 && !loading"
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
          <div
            class="flex card mr-5 w-auto h-12"
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
                class="flex justify-between mt-2 mb-1 text-dark_accent bg-white transform transition duration-200 hover:scale-105 font-medium rounded-lg text-sm px-4 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 w-44"
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
          <div class="mt-5 grid grid-cols-1 md:grid-cols-4">
            <div
              v-for="(product, i) in filteredSearchedProducts"
              :key="product.id"
            >
              <SubcatBrandCard v-if="i < limit" :product="product" />
            </div>
          </div>
          <button
            v-if="filteredSearchedProducts.length > limit"
            class="text-secondary text-left"
            @click="increaseLimit"
          >
            Show More +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '~/components/Banner.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { computed, ref } from '@vue/composition-api';
import Loading from '~/components/Loading.vue';
import {
  SfRange,
  SfAccordion,
  SfSearchBar,
  SfBreadcrumbs,
  SfBanner,
} from '@storefront-ui/vue';
import SubcategoryBrandAccordion from '~/components/SubcategoryBrandAccordion';
import { useCms } from '@vue-storefront/vendure';
import { useUiHelpers, useUiState } from '~/composables';
import axios from 'axios';
import SubcatBrandCard from '../components/SubcatBrandCard.vue';

export default {
  name: 'Subcategory',
  created() {
    this.getCategory();
  },
  data() {
    return {
      loading: true,
      limit: 12,
      low: '',
      high: '',
      A_Z: null,
      Z_A: null,
      open: false,
      filtersClicked: [],
      search: '',
      industryName: null,
      products: [],
      parent: null,
      aCat: null,
      industryImg: null,
      description: null,
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
            for (let collection of product.collections) {
              matchFound = filtersClicked.includes(collection.name);
              if (matchFound) {
                break;
              }
            }
          } else {
            matchFound = false;
          }
          return (
            filtersClicked.includes(product.customFields.brand?.name) ||
            filtersClicked.includes(product.facetValues[facetIndex]?.name) ||
            matchFound
          );
        }
        return true;
      });
      if (this.A_Z) filterProducts.sort(this.generateSortFn('name', false));

      if (this.Z_A) filterProducts.sort(this.generateSortFn('name', true));
      return filterProducts;
    },
    brandsList() {
      let brand = [];
      this.products.forEach((element) => {
        if (element.customFields.brand?.name) {
          brand.push(element.customFields.brand?.name);
        }
      });
      const brands = [...new Set(brand)];
      return brands;
    },
    industryList() {
      let industry = [];
      this.products.forEach((element) => {
        if (element.customFields.industry !== null) {
          industry.push(element.customFields.industry?.name);
        }
      });
      const industries = [...new Set(industry)];
      return industries;
    },
    categoriesList() {
      let categories = [];
      this.products.forEach((element) => {
        if (element.collections.length > 0) {
          for (let cat in element.collections) {
            if (!categories.includes(element.collections[cat].name)) {
              categories.push(element.collections[cat].name);
            }
          }
        }
      });
      categories = [...new Set(categories)];
      return categories;
    },
    facetList() {
      let facet = [];
      this.products.forEach((element) => {
        if (element.facetValues.length !== 0) {
          element.facetValues.forEach((f) => {
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
          filter_title: 'Brand',
          filter_options: this.brandsList,
        },
        {
          filter_title: 'Facet',
          filter_options: this.facetList,
        },
      ];
    },
  },
  methods: {
    sortBtn() {
      this.A_Z = !this.A_Z;
      this.Z_A = !this.Z_A;
      this.open = !this.open;
    },
    increaseLimit() {
      this.limit += 8;
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
    async getCategory() {
      // const slug = this.$route.params.slug_1;
      let body2 = {
        query: `query getIndustryById($id:ID){
          industry(id:$id){
          name
          description
          icon{
          preview
          }
          products{
          id
          }
          id
          }
          }`,
        variables: {
          id: this.$route.params.id,
        },
      };

      const body = {
        query: `query getCategoryBySlug($slug: String!){
          collection(slug: $slug){
          parent{
          name
          }
          name
          featuredAsset{
          preview
          }
          description
          filters{
          args{
          name
          value
          }
          }
          }
          }`,
        variables: {
          // slug: slug,
        },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let baseUrl = process.env.GRAPHQL_API;
      const acat = await axios
        .post(baseUrl, body2, options)
        .then(async (res) => {
          if (res.data?.data?.industry.products.length > 0) {
            const productIdString = res.data.data.industry.products.map(
              (product_object) => {
                return product_object.id;
              }
            );
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
                collections{
                name
                }
                variants {
                id
                price
                priceWithTax
                }
                featuredAsset{
                preview
                }
                facetValues{
                name
                }
                customFields{
                industries{
                name
                }
                brand{
                name
                }
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
                'Access-Control-Allow-Origin': '*',
              },
            };
            var prod = await axios.post(baseUrl, pbody, poptions);
            this.products = prod.data?.data?.products?.items;
          }

          this.aCat = res.data?.data?.collection;
          this.parent = res.data?.data?.collection?.parent?.name;
          this.industryName = res.data?.data?.industry?.name;
          this.industryImg = res.data?.data?.industry?.icon?.preview;
          this.description = res.data?.data?.industry?.description;
          this.loading = false;
        });
    },
  },
  setup(props, { root }) {
    const { isDarkMode } = useUiState();
    const th = useUiHelpers();
    const { getCms } = useCms();
    const adSection = computed(() =>
      JSON.parse(getCms.value[3]?.content ?? '{}')
    );
    const adImage = computed(() => getCms.value[3]?.featuredAsset.preview);

    return {
      th,
      adSection,
      adImage,
      isDarkMode,
    };
  },
  components: {
    LazyHydrate,
    SfAccordion,
    SfSearchBar,
    SfBreadcrumbs,
    SubcategoryBrandAccordion,
    SfBanner,
    SubcatBrandCard,
    SfRange,
    Banner,
    Loading,
  },
};
</script>

<style scoped lang="scss">
#industry {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1250px;
    margin: 0 auto;
  }
}

.sticky {
  display: block;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 1;
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
</style>
