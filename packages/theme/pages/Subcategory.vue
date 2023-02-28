<template>
  <div class="mt-12" id="subcategory">
    <nav
      class="sf-breadcrumbs m-4 sticky"
      aria-label="breadcrumbs"
      :style="
        !isDarkMode
          ? 'background-color: #f0f7fc !important'
          : 'background-color: #0e1621 !important'
      "
    >
      <ol class="sf-breadcrumbs__list">
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <span class="text-black">
            <nuxt-link class="sf-breadcrumbs__breadcrumb font-exrathin" to="/">
              Home
            </nuxt-link>
          </span>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <span class="text-black">
            <nuxt-link
              class="sf-breadcrumbs__breadcrumb font-exrathin"
              :to="`/c/${parent}`"
            >
              {{ parent }}
            </nuxt-link>
          </span>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <p class="text-secondary">{{ categoryName }}</p>
        </li>
      </ol>
    </nav>
    <div class="flex mt-6">
      <!-- Side filter search or an Ad -->
      <div
        :style="
          !isDarkMode ? 'background-color: white' : 'background-color: #182533'
        "
        class="shadow-[3px_3px_10px_0_rgba(0,0,0,0.3)] rounded-xl w-[28%] hidden md:block border-white sticky h-[40rem] overflow-auto top-[5%] no-scrollbar"
      >
        <div v-if="products.length > 0">
          <SubcategoryBrandAccordion
            @maxAdded="maxInput"
            @minAdded="minInput"
            @searchChange="searchBox"
            @filterClicked="filterProducts"
            @clearClicked="clearFilters"
            :filters="filters"
          />
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
      <!-- Subcategory name and description -->
      <div class="ml-6 md:w-[72%] xs:w-[100%]">
        <h1
          class="sf-heading__title font-medium text-4xl font-sans text-secondary"
        >
          {{ categoryName }}
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
            class="rounded-xl my-auto max-h-40 min-h-40 max-w-[25%] min-w-[25%]"
            :src="categoryImg || '/categories/empty_image.png'"
            alt=""
          />
          <div class="w-full overflow-auto no-scrollbar">
            <p class="py-4 ml-4 mr-4 text-thin" v-html="description"></p>
          </div>
        </div>
        <button
          class="flex my-5 visible md:invisible text-sm px-2"
          @click="showFilter = !showFilter"
        >
          <SfIcon
            icon="menu"
            size="xxs"
            color="primary"
            viewBox="0 0 24 24"
            :coverage="1"
          />
          <p>Filters</p>
        </button>
        <div
          class="shadow-xl rounded-lg w-80 h-10rem overflow-auto no-scrollbar"
          v-if="products.length > 0 && showFilter"
        >
          <SubcategoryBrandAccordion
            @maxAdded="maxInput"
            @minAdded="minInput"
            @searchChange="searchBox"
            @filterClicked="filterProducts"
            :filters="filters"
          />
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
          <div
            class="flex card mr-5 w-full h-12 text-sm md:text-base"
            :style="
              !isDarkMode
                ? 'background-color: #f0f7fc'
                : 'background-color: #182533'
            "
          >
            <p
              class="pt-1 md:pt-3 mx-3"
              :style="!isDarkMode ? 'color: #3860a7' : 'color: #ffffff'"
            >
              Number of Results | {{ Object.keys(products).length }}
            </p>

            <div class="ml-8">
              <button
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                class="mt-2 mb-1 text-dark_accent bg-white transform transition duration-200 hover:scale-105 font-medium rounded-lg text-sm px-4 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 w-48"
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
                class="inset-0 relative flex flex-col z-10 w-48 bg-white border border-primary transform transition duration-300"
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
          <div v-if="loading" class="mt-[7%]">
            <Loading />
          </div>

          <!-- Products -->

          <div class="mt-5">
            <div class="grid grid-cols-1 md:grid-cols-4">
              <!-- <p>{{product.name}}</p> -->
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
import { computed, ref } from '@vue/composition-api';
import {
  SfRange,
  SfAccordion,
  SfSearchBar,
  SfBreadcrumbs,
  SfBanner,
  SfIcon,
} from '@storefront-ui/vue';
import SubcategoryBrandAccordion from '~/components/SubcategoryBrandAccordion';
import Loading from '~/components/Loading.vue';
import { useCms } from '@vue-storefront/vendure';
import { useUiHelpers, useUiState } from '~/composables';
import axios from 'axios';
import SubcatBrandCard from '../components/SubcatBrandCard.vue';

export default {
  name: 'Subcategory',
  created() {
    this.loading = true;
    this.getCategory();
  },
  data() {
    return {
      limit: 12,
      showFilter: false,
      loading: false,
      low: '',
      high: '',
      A_Z: null,
      Z_A: null,
      open: false,
      filtersClicked: [],
      search: '',
      categoryName: null,
      products: [],
      parent: null,
      activeCategory: null,
      categoryImg: null,
      description: null,
    };
  },
  computed: {
    filteredSearchedProducts() {
      const filtersClicked = this.filtersClicked;

      const lower = this.low || 0;

      const high = this.high || 1000000000;

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
          const industries = [];
          product?.customFields?.industries?.forEach((i) =>
            industries.push(i.name)
          );
          return (
            filtersClicked.includes(product.customFields.brand?.name) ||
            filtersClicked.some((r) => industries.indexOf(r) >= 0) ||
            filtersClicked.includes(product.facetValues[facetIndex]?.name)
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
        element.customFields.industries.forEach((i) => {
          industry.push(i?.name);
        });
      });
      const industries = [...new Set(industry)];
      return industries;
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
    generateSortFn(prop, reverse) {
      return function (a, b) {
        if (a[prop].toLowerCase() < b[prop].toLowerCase())
          return reverse ? 1 : -1;
        if (a[prop].toLowerCase() > b[prop].toLowerCase())
          return reverse ? -1 : 1;
        return 0;
      };
    },
    increaseLimit() {
      this.limit += 8;
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
      const slug = this.$route.params.slug_1;
      const body = {
        query: `query getCategoryBySlug($slug: String!){
            collection(slug: $slug){
              parent{
                name
                slug
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
          slug: slug,
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
        .post(baseUrl, body, options)
        .then(async (res) => {
          if (
            res.data?.data?.collection?.filters[0]?.args[0].name ===
            'productIds'
          ) {
            const productIdString = JSON.parse(
              res.data?.data?.collection?.filters[0]?.args[0].value
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
                            variants {
                              id
                              price
                            }
                            featuredAsset{
                              preview
                            }
                            facetValues{
                              name
                            }
                            customFields{
                              is_order_based
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
          this.loading = false;
          this.activeCategory = res.data?.data?.collection;
          this.parent = res.data?.data?.collection?.parent?.slug;
          this.categoryName = res.data?.data?.collection?.name;
          this.categoryImg = res.data?.data?.collection?.featuredAsset?.preview;
          this.description = res.data?.data?.collection?.description;
        });
    },
    clearFilters() {
      this.filtersClicked = [];
      this.low = 0;
      this.high = 1000000000;
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
    SfIcon,
    Banner,
    Loading,
  },
};
</script>

<style lang="scss" scoped>
#subcategory {
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

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.sticky {
  display: block;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>
