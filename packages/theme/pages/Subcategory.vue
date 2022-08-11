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
          <nuxt-link class="sf-breadcrumbs__breadcrumb" :to="`/c/${parent}`">
            {{ parent }}
          </nuxt-link>
        </li>
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          {{ categoryName }}
        </li>
      </ol>
    </nav>
    <div class="flex mt-4">
      <!-- Side filter search or an Ad -->
      <div class="shadow-2xl rounded w-2/6 h-3/4">
        <div v-if="products.length === 0">
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
        <div v-else>
          <SubcategoryBrandAccordion
            @searchChange="searchBox"
            @filterClicked="filterProducts"
            :filters="filters"
          />
        </div>
      </div>
      <!-- Subcategory name and description -->
      <div class="ml-6">
        <h2 class="sf-heading__title font-light text-4xl font-sans text-gray">
          {{ categoryName }}
        </h2>
        <div class="card shadow-lg my-4 flex w-auto mr-5">
          <img class="h-36 w-auto my-auto bg-light" :src="categoryImg" alt="" />
          <div class="bg-faded_black w-full">
            <p class="py-4 ml-4 mr-4 text-white" v-html="description"></p>
          </div>
        </div>
        <!-- Ad section -->
        <div
          style="background-color: #e2e5de"
          class="flex card mr-5 w-auto h-16 mb-10"
        >
          <!-- <img class="w-32 object-cover" src="../static/icon.png" alt="" /> -->
          <div class="relative overflow-hidden">
            <img
              class="min-w-[90%]"
              src="../static/homepage/bannerA.webp"
              alt=""
            />
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
          <div class="card mr-5 w-auto h-12 bg-light_accent">
            <p class="float-left pt-3 ml-3">
              Number of Results | {{ Object.keys(products).length }}
            </p>
          </div>
          <!-- Products -->
          <SubcatBrandCard :filteredProducts="filteredSearchedProducts" />

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
      filtersClicked: [],
      search: '',
      categoryName: null,
      products: [],
      parent: null,
      aCat: null,
      categoryImg: null,
      description: null,
    };
  },
  computed: {
    filteredSearchedProducts() {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.search.toLowerCase())
      );
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
    searchBox(event) {
      this.search = event;
    },
    filterProducts(event) {
      // if (event.checked) {
      //   this.filtersClicked.push(event.id);
      // } else {
      //   const index = this.filtersClicked.indexOf(event.id);
      //   this.filtersClicked.splice(index, 1);
      // }
      // console.log('you clicked a filter', this.filtersClicked);
      // this.filteredSearchedProducts.filter((p) => {
      //   p.customFields.industry.name in this.filtersClicked ||
      //   p.customFields.brand.name in this.filtersClicked ||
      //   p.facetValues.name in this.filtersClicked
      // })
      console.log(event);
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
      const acat = await axios
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

          this.aCat = res.data?.data?.collection;
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
  },
};
</script>

<style></style>
