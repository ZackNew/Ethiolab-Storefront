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
      <div
        v-if="products === null"
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
      <SubcategoryBrandAccordion v-else :filters="filterrs" />
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
          v-if="products === null"
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

export default {
  name: 'Subcategory',
  created() {
    this.getCategory();
  },
  data() {
    return {
      categoryName: null,
      products: null,
      parent: null,
      aCat: null,
      categoryImg: null,
      description: null,
      filterrs: [
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
      ],
    };
  },
  methods: {
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
        },
      };
      let baseUrl = process.env.GRAPHQL_API
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
                              price
                            }
                            featuredAsset{
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
            var prod = await axios.post(
              baseUrl,
              pbody,
              poptions
            );
            this.products = prod.data?.data?.products?.items;
            console.log('products', this.products);
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
  },
};
</script>

<style></style>
