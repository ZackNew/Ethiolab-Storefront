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
          <nuxt-link class="sf-breadcrumbs__breadcrumb" :to="`/c/${parent}`">
            {{ parent }}
          </nuxt-link>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          {{ categoryName }}
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
            @filterClicked="filterProducts"
            :filters="filters"
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
          {{ categoryName }}
        </h2>
        <div
          class="rounded bg-secondary card shadow-lg my-4 flex mr-5 max-h-40"
        >
          <img
            class="my-auto max-h-40 rounded-l bg-light max-w-[25%]"
            :src="categoryImg || '/categories/empty_image.png'"
            alt=""
          />
          <div class="rounded w-full overflow-auto no-scrollbar">
            <p class="py-4 ml-4 mr-4 text-white" v-html="description"></p>
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
import { computed, ref } from '@vue/composition-api';
import {
  SfRange,
  SfAccordion,
  SfSearchBar,
  SfBreadcrumbs,
  SfBanner,
} from '@storefront-ui/vue';
import SubcategoryBrandAccordion from '~/components/SubcategoryBrandAccordion';
import { useCms } from '@vue-storefront/vendure';
import { useUiHelpers } from '~/composables';
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
            filtersClicked.includes(product.customFields.brand?.name) ||
            filtersClicked.includes(product.customFields.industry?.name) ||
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
        brand.push(element.customFields.brand?.name);
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
      const activeCategory = await axios
        .post('http://localhost:3000/shop-api', body, options)
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
                              price
                            }
                            featuredAsset{
                              preview
                            }
                            facetValues{
                              name
                            }
                            customFields{
                              industry{
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
            var prod = await axios.post(
              'http://localhost:3000/shop-api',
              pbody,
              poptions
            );
            this.products = prod.data?.data?.products?.items;
          }
          this.loading = false;
          this.activeCategory = res.data?.data?.collection;
          this.parent = res.data?.data?.collection?.parent?.name;
          this.categoryName = res.data?.data?.collection?.name;
          this.categoryImg = res.data?.data?.collection?.featuredAsset?.preview;
          this.description = res.data?.data?.collection?.description;
        });
    },
  },
  setup(props, { root }) {
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
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
