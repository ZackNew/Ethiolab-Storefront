<template>
  <div class="border-t mt-12">
    <nav class="sf-breadcrumbs m-4" aria-label="breadcrumbs">
      <ol class="sf-breadcrumbs__list">
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <nuxt-link class="sf-breadcrumbs__breadcrumb" to="/">
            Home
          </nuxt-link>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          {{ 'Industries' }}
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          {{ industryName }}
        </li>
      </ol>
    </nav>
    <div class="flex mt-4">
      <!-- Side filter search or an Ad -->
      <div class="shadow-2xl rounded-lg w-96 h-3/4">
        <div v-if="products.length > 0">
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
          {{ industryName }}
        </h2>
        <div
          class="rounded-md bg-secondary card shadow-lg my-4 flex mr-5 max-h-40"
        >
          <img
            class="rounded-md my-auto max-h-40 bg-light max-w-[25%]"
            :src="industryImg || '/categories/empty_image.png'"
            alt=""
          />
          <div class="rounded w-full overflow-auto no-scrollbar">
            <p class="py-4 ml-4 mr-4 text-white" v-html="description"></p>
          </div>
        </div>
        <div
          v-if="products.length === 0"
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
          <div class="flex card mr-5 w-auto h-12 bg-light_accent border-b-2">
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
                <button @click="sortBtn" class="hover:bg-light_accent">
                  Name from A to Z
                </button>
                <button @click="sortBtn" class="hover:bg-light_accent">
                  Name from Z to A
                </button>
              </div>
            </div>
          </div>
          <!-- Products -->
          <SubcatBrandCard
            :filteredProducts="filteredSearchedProducts"
            class="border-b"
          />

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
              // console.log('coolection in product***',product,collection.name,filtersClicked,matchFound)
              if (matchFound) {
                break;
              }
            }
          } else {
            matchFound = false;
          }
          // console.log('product match found collection clicked',product,matchFound,product.collections,filtersClicked)
          return (
            filtersClicked.includes(product.customFields.brand?.name) ||
            filtersClicked.includes(product.facetValues[facetIndex]?.name) ||
            matchFound
          );
        }
        return true;
      });

      // console.log('running again **',filtersClicked,filtersClicked.length)
      // let filteredBasedOnCategory = filterProducts.filter(product=>{
      //   // console.log('product***',product,filtersClicked)

      //   if(filtersClicked.length>0){
      //     console.log('running now **')
      //     // console.log('product vs filters ** ',product.collections,filtersClicked)
      //     if(product.collections.length>0){
      //       for (let collection of product.collections){
      //         let matchFound =  filtersClicked.includes(collection.name)
      //         console.log('coolection in product***',product,collection.name,filtersClicked,matchFound)
      //         if(matchFound){
      //           return true
      //         }
      //       }
      //       return false
      //     }else{
      //       return true
      //     }
      //   }else{
      //     return true
      //   }

      //   return true
      // })
      if (this.A_Z) filterProducts.sort(this.generateSortFn('name', false));

      if (this.Z_A) filterProducts.sort(this.generateSortFn('name', true));
      // console.log('all clicked filters',filtersClicked)
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
        // console.log("category names before loop ****", element.collections)
        if (element.collections.length > 0) {
          for (let cat in element.collections) {
            // console.log("category names in loop ****",element.collections[cat].name)
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
      console.log('filter button clicked ** ', event);
      if (event.checked) {
        this.filtersClicked.push(event.id);
      } else {
        const index = this.filtersClicked.indexOf(event.id);
        this.filtersClicked.splice(index, 1);
      }
    },
    async getCategory() {
      //   const slug = this.$route.params.slug_1;
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
          //   slug: slug,
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
            var prod = await axios.post(baseUrl, pbody, poptions);
            this.products = prod.data?.data?.products?.items;
          }

          this.aCat = res.data?.data?.collection;
          this.parent = res.data?.data?.collection?.parent?.name;
          this.industryName = res.data?.data?.industry?.name;
          this.industryImg = res.data?.data?.industry?.icon?.preview;
          this.description = res.data?.data?.industry?.description;
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

<style></style>
