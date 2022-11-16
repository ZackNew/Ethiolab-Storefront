<template>
  <div id="variant">
    <div v-if="product !== null">
      <nav class="sf-breadcrumbs my-4" aria-label="breadcrumbs">
        <ol class="sf-breadcrumbs__list">
          <li class="sf-breadcrumbs__list-item" :aria-current="false">
            <nuxt-link
              class="sf-breadcrumbs__breadcrumb text-secondary font-exrathin"
              to="/"
            >
              Home
            </nuxt-link>
          </li>
          <li class="sf-breadcrumbs__list-item" :aria-current="false">
            <h5 class="text-secondary font-bold">
              {{ product.name }}
            </h5>
          </li>
        </ol>
      </nav>
      <div class="mx-2 md:mx-0 md:grid md:grid-cols-12">
        <div
          class="md:mr-8 md:col-span-6 max-w[99%] overflow-x-hidden overflow-y-visible"
        >
          <Gallery
            :images="product.assets"
            :display="product.featuredAsset"
            class="mb-5 md:mb-0"
          />
        </div>
        <div class="md:col-span-6">
          <h2 class="text-secondary font-bold">{{ product.name }}</h2>
          <h3 class="text-secondary text-xl">
            <span class="font-bold mr-2">Price </span>{{ priceRange }}
          </h3>
          <div class="mt-4 bg-[#EAEAEA] rounded py-2 flex justify-around">
            <div v-if="product.variantList.totalItems === 1">
              <h5>1 Variant of this product are available.</h5>
            </div>
            <div v-if="product.variantList.totalItems > 1">
              <h5 class="text-lg">
                <span>{{ product.variantList.totalItems }}</span>
                Variants of this product are available.
              </h5>
            </div>
            <a href="#var-table">
              <h5 class="text-secondary font-extrathin">
                SEE ALL PRODUCT OPTIONS BELOW
              </h5>
            </a>
          </div>
          <iframe
            class="mt-4"
            width="545"
            height="300"
            :src="`https://www.youtube-nocookie.com/embed/${custom.link}?autoplay=1&mute=1&controls=0&loop=1&playlist=${custom.link}&rel=0`"
            title="YouTube video player"
            frameborder="0"
            v-if="custom.link"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div :class="isDarkMode ? 'text-white' : ''">
            <p
              class="text-justify mt-2"
              :class="classes.red"
              v-html="product.description"
            ></p>
          </div>
          <SfButton
            v-if="product.customFields.documentation"
            class="bg-secondary my-2 pb-2 pt-3 rounded"
          >
            <a class="text-white px-1" :href="custom.document" target="_blank">
              DESCRIPTION PDF
            </a>
            <!-- Get documentation -->
          </SfButton>
          <div v-if="product.facetValues !== []" class="flex">
            <div v-for="(facet, i) in product.facetValues" :key="i">
              <p class="bg-[#a7c6ed] mr-4 px-3 py-[0.5] rounded">
                {{ facet.name }}
              </p>
            </div>
          </div>

          <LazyHydrate when-idle>
            <SfTabs :open-tab="1" class="product__tabs max-h-96 overflow-auto">
              <SfTab :title="$t('Read reviews')" :key="reviewKey">
                <SfReview
                  v-for="review in reviews"
                  :key="review.id"
                  :author="review.authorName"
                  :date="new Date(review.createdAt).toLocaleString()"
                  :message="review.summary"
                  :max-rating="5"
                  :rating="review.rating"
                  :char-limit="250"
                  :read-more-text="$t('Read more')"
                  :hide-full-text="$t('Read less')"
                  class="product__review"
                />
                <MyReview
                  :productId="product.id"
                  :currentUserHasNoReview="!currentUserHasReview"
                />
              </SfTab>
            </SfTabs>
          </LazyHydrate>
        </div>
      </div>

      <div class="hidden md:block mt-8">
        <SfTable id="var-table">
          <SfTableHeading class="bg-none">
            <SfTableHeader class="text-secondary font-bold text-xl">
              Item
            </SfTableHeader>
            <template v-if="product.variantList.items[0].options.length > 0">
              <SfTableHeader
                class="text-secondary font-bold text-xl"
                v-for="(o, index) in product.variantList.items[0].options"
                :key="index"
              >
                {{ o.group.name }}
              </SfTableHeader>
            </template>
            <SfTableHeader class="text-secondary font-bold text-xl">
              Availability
            </SfTableHeader>
            <SfTableHeader class="text-secondary font-bold text-xl">
              Price
            </SfTableHeader>
          </SfTableHeading>
          <SfTableRow
            v-for="variant in product.variantList.items"
            :key="variant.id"
            class="mb-4"
          >
            <SfTableData class="flex">
              <div v-if="variant.featuredAsset">
                <img
                  :src="variant.featuredAsset.preview"
                  alt=""
                  class="float-left h-28 w-28 mr-2 object-cover"
                />
              </div>
              <div v-else-if="product.featuredAsset">
                <img
                  :src="product.featuredAsset.preview"
                  alt=""
                  class="float-left h-28 w-28 mr-2 object-cover"
                />
              </div>
              <p class="text-secondary">
                <nuxt-link
                  class="text-secondary"
                  :to="`/p/${product.id}/${variant.id}/${product.slug}`"
                >
                  {{ variant.sku }}
                </nuxt-link>
              </p>
            </SfTableData>
            <SfTableData
              v-for="(option, index) in variant.options"
              :key="index"
            >
              <p class="text-secondary">{{ option.name }}</p>
            </SfTableData>
            <SfTableData
              ><p class="text-secondary">
                {{ variant.stockLevel }}
              </p>
            </SfTableData>
            <SfTableData>
              <div class="flex">
                <div class="mr-4">
                  <h4 class="text-secondary">
                    <span class="font-bold">
                      {{
                        String(variant.priceWithTax).slice(0, -2) +
                        '.' +
                        String(variant.priceWithTax).slice(-2)
                      }}
                    </span>
                    ETB
                  </h4>
                </div>
                <div class="flex">
                  <input
                    :value="toCart"
                    class="bg-light_accent w-14 text-center mr-1"
                    type="number"
                    :id="variant.id"
                  />
                  <SfIcon
                    :icon="
                      isInCart({ product: { _variantId: variant.id } })
                        ? 'added_to_cart'
                        : 'add_to_cart'
                    "
                    size="lg"
                    color="green-primary"
                    viewBox="0 0 24 24"
                    :coverage="1"
                    @click="addToCart($event)"
                  />
                </div>
              </div>
              <hr class="mt-4" />
              <div
                v-for="(acc, i) in variant.accessories"
                :key="`'r' + ${i}`"
                class="mt-3"
              >
                <div class="flex">
                  <img
                    :src="acc.featuredAsset ? acc.featuredAsset.preview : ''"
                    alt=""
                    class="w-10 h-10 mr-2"
                  />
                  <h4 class="text-secondary font-bold">{{ acc.name }}</h4>
                </div>
                <hr class="mt-2" />
              </div>
            </SfTableData>
          </SfTableRow>
        </SfTable>
      </div>

      <div class="md:hidden">
        <div v-for="variant in product.variantList.items" :key="variant.id">
          <div class="bg-white rounded-lg m-2 pb-3">
            <div class="flex">
              <div v-if="variant.featuredAsset">
                <img :src="variant.featuredAsset.preview" alt="image" />
              </div>
              <div v-else-if="product.featuredAsset">
                <img
                  :src="product.featuredAsset.preview"
                  alt="image"
                  class="w-20 h-20 object-cover m-2"
                />
              </div>
              <div>
                <h6 class="m-4 text-secondary">{{ variant.sku }}</h6>
                <h6 class="ml-4 text-secondary">
                  {{
                    String(variant.priceWithTax).slice(0, -2) +
                    '.' +
                    String(variant.priceWithTax).slice(-2)
                  }}
                  ETB
                </h6>
              </div>
            </div>
            <div class="ml-4">
              <div v-for="(option, i) in variant.options" :key="i">
                <h6 class="text-secondary">
                  {{ option.group.name }} : {{ option.name }}
                </h6>
              </div>
              <h6 class="text-secondary">
                Availability: {{ variant.stockLevel }}
              </h6>
              <div class="flex">
                <input
                  :value="toCart"
                  class="bg-light_accent w-14 text-center mr-1"
                  type="number"
                  :id="variant.id"
                />
                <SfIcon
                  :icon="
                    isInCart({ product: { _variantId: variant.id } })
                      ? 'added_to_cart'
                      : 'add_to_cart'
                  "
                  size="lg"
                  color="green-primary"
                  viewBox="0 0 24 24"
                  :coverage="1"
                  @click="addToCart($event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyReview from '~/components/MyAccount/MyReview.vue';
import { useUiState } from '~/composables';
import LazyHydrate from 'vue-lazy-hydration';
import axios from 'axios';
import {
  SfButton,
  SfTable,
  SfIcon,
  SfTabs,
  SfReview,
} from '@storefront-ui/vue';
import { useWishlist, useCart, useUser } from '@vue-storefront/vendure';
import Gallery from '~/components/Gallery.vue';

export default {
  components: {
    SfButton,
    SfTable,
    SfTabs,
    SfIcon,
    Gallery,
    MyReview,
    SfReview,
    LazyHydrate,
  },
  data() {
    return {
      reviews: [],
      product: null,
      toCart: 1,
      currentUserHasReview: false,
      reviewKey: 0,
    };
  },
  methods: {
    async getProductsReviews() {
      const slug = this.$route.params.slug_1;
      const body = {
        query: `
        query Reviews($slug:String!){
          product(slug: $slug){
            reviews{
              items{
                summary
                body
                rating
                authorName
                authorLocation
                createdAt
                id
              }
            }
          }
        }
      `,
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
      const reviewsListResponse = await axios.post(baseUrl, body, options);

      var reviewsList = reviewsListResponse.data?.data?.product.reviews.items;
      if (this.isAuthenticated) {
        return this.setThisUsersReview(reviewsList);
      }

      console.log('reviews value is ', reviewsList);

      return reviewsList;
    },

    setThisUsersReview(reviewsList) {
      var email = this.user.emailAddress;
      for (var review of reviewsList) {
        console.log(`review['authorLocation'] ${review['authorLocation']}`);
        if (review['authorLocation'] === email) {
          console.log("review['authorLocation'] === this.email");
          review['authorName'] = 'You';
          this.currentUserHasReview = true;
          var currentItemIndex = reviewsList.indexOf(review);
          var firstItem = reviewsList[0];
          var tempItem = { ...review };
          reviewsList[currentItemIndex] = firstItem;
          reviewsList[0] = tempItem;
          break;
        }
      }
      return reviewsList;
    },

    async getProductVariant() {
      const baseUrl = process.env.GRAPHQL_API;
      const slug = this.$route.params.slug_1;
      const body = {
        query: `query getProductVariant($slug: String!){
          product(slug: $slug){
            id
            name
            slug
            description
            facetValues{
              name
            }
            customFields{
              youtube_link
              documentation
            }
            featuredAsset{
              preview
            }
            assets{
              preview
            }
            variantList{
              totalItems
              items{
                id
                sku
                priceWithTax
                featuredAsset{
                  preview
                }
                options{
                  group{
                    name
                  }
                  name
                }
                accessories{
                  name
                  featuredAsset{
                    preview
                  }
                  slug
                }
                stockLevel
              }
            }
          }
        }`,
        variables: { slug: slug },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const productVariant = await axios.post(baseUrl, body, options);
      this.product = productVariant?.data?.data?.product;
      console.log('pppppp', this.$route);
    },
  },
  computed: {
    priceRange() {
      if (this.product?.variantList?.totalItems === 1) {
        const price = String(this.product?.variantList?.items[0]?.priceWithTax);
        const fPrice = price.slice(0, -2) + '.' + price.slice(-2);
        return fPrice + ' ETB';
      } else if (this.product?.variantList?.totalItems > 1) {
        let prices = [];
        this.product.variantList?.items.forEach((item) => {
          prices.push(item.priceWithTax);
        });
        const max =
          String(Math.max(...prices)).slice(0, -2) +
          '.' +
          String(Math.max(...prices)).slice(-2);
        const min =
          String(Math.min(...prices)).slice(0, -2) +
          '.' +
          String(Math.min(...prices)).slice(-2);
        return min + ' ETB' + ' - ' + max + ' ETB';
      }
    },
    custom() {
      const link = this.product?.customFields?.youtube_link.split('?v=')[1];
      const document =
        process.env.GRAPHQL + this.product?.customFields?.documentation;
      return { link: link, document: document };
    },
  },
  setup() {
    const { user, isAuthenticated, load, getU } = useUser();
    const { isDarkMode } = useUiState();
    const { addItem: addItemToCart, isInCart, cart } = useCart();
    const addToCart = (e) => {
      const quantity =
        Number(e.target.parentElement.parentElement.firstChild.value) ||
        Number(
          e.target.parentElement.parentElement.parentElement.firstChild.value
        );
      const variantId =
        e.target.parentElement.parentElement.firstChild.id ||
        e.target.parentElement.parentElement.parentElement.firstChild.id;
      console.log('sds', quantity);
      console.log('mdm', variantId);
      addItemToCart({
        product: {
          _variantId: variantId,
        },
        quantity: quantity,
      });
    };
    return {
      isInCart,
      addToCart,
      isAuthenticated,
      isDarkMode,
      user,
    };
  },
  async created() {
    this.getProductVariant();
    this.reviews = await this.getProductsReviews();
  },
  watch: {
    isAuthenticated(newIsAuthenticated, oldIsAuthenticated) {
      if (newIsAuthenticated) {
        this.reviews = this.setThisUsersReview(this.reviews);
        this.reviewKey = this.reviewKey + 1;
      }
    },
  },
};
</script>

<style scoped lang="scss">
#variant {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1250px !important;
    padding: 0;
    margin: 0 auto;
  }
}
hr {
  color: lightgray;
}
</style>

<style module="classes">
.red ul {
  list-style-type: square;
}
.red a {
  color: blue;
}
.red table {
  border-radius: 10px;
  margin: 15px 5px;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 100%;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.red table thead tr {
  background-color: #568cea;
  color: #ffffff;
  text-align: left;
}
.red table th,
.red table td {
  padding: 12px 15px;
}
.red table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.red table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.red table tbody tr:last-of-type {
  border-bottom: 2px solid #568cea;
}
.red table tbody tr.active-row {
  font-weight: bold;
  color: #0e1621;
}
</style>
