<template>
  <div id="variant" class="p-4">
    <div class="my-[3%]" v-if="product === null && loading">
      <Loading />
    </div>
    <div v-if="product !== null">
      <!-- <nav class="sf-breadcrumbs my-4" aria-label="breadcrumbs">
        <ol class="sf-breadcrumbs__list">
          <li class="sf-breadcrumbs__list-item" :aria-current="false">
            <nuxt-link class="sf-breadcrumbs__breadcrumb font-exrathin" to="/">
              Home
            </nuxt-link>
          </li>
          <li class="sf-breadcrumbs__list-item" :aria-current="false">
            <h5 class="text-secondary">
              {{ product.name }}
            </h5>
          </li>
        </ol>
      </nav> -->
      <SfBreadcrumbs
        class="breadcrumbs desktop-only mb-5"
        :breadcrumbs="breadcrumbs"
      />
      <div class="mx-2 md:mx-0 md:grid md:grid-cols-12">
        <div class="md:mr-8 md:col-span-6 max-w[99%]">
          <Gallery
            :images="product.assets"
            :display="product.featuredAsset"
            :isOrderBased="product.customFields.is_order_based"
            class="mb-5 md:mb-0"
          />
        </div>
        <div class="md:col-span-6">
          <h2 class="text-secondary font-bold">{{ product.name }}</h2>
          <div
            class="p-2 flex justify-between"
            :class="isDarkMode ? 'bg-[#182533]' : 'bg-[#EBEBEB]'"
          >
            <h3 v-if="product.variantList.items[0].customFields.showprice"  class="text-secondary text-xl">
              <span class="font-semibold mr-1 p-2">Price : </span
              >{{ priceRange }} /
              {{ product.customFields.granularity }}
            </h3>
            <h3 v-else class="text-secondary text-xl">
              <span class="font-semibold mr-1 p-2">Unavailable Price : </span
            ></h3>
            <img
              v-if="product.customFields.is_order_based"
              src="/OB.png"
              height="100"
              width="100"
              alt="order based"
              class=""
            />
          </div>
          <div
            class="mt-4 rounded py-2 flex justify-around"
            :class="isDarkMode ? 'bg-[#182533]' : 'bg-[#EBEBEB]'"
          >
            <div v-if="product.variantList.totalItems === 1">
              <h5 :class="isDarkMode ? 'text-white' : 'text-black'">
                1 Variant of this product are available.
              </h5>
            </div>
            <div v-if="product.variantList.totalItems > 1">
              <h5 :class="isDarkMode ? 'text-white' : 'text-black'">
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
          <div class="prose" :class="isDarkMode ? 'text-white' : ''">
            <p
              class="text-justify my-4 space-y-4"
              :class="classes.red"
              v-html="product.description"
            ></p>
          </div>

          <div v-if="custom.documents.length > 0">
            <div v-for="(document, i) in custom.documents" :key="i">
              <a
                class="text-secondary underline"
                :href="document.link"
                target="_blank"
              >
                {{ document.name }}
              </a>
              <!-- Get documentation -->
            </div>
          </div>
          <div v-if="product.facetValues.length > 0" class="flex">
            <div v-for="(facet, i) in product.facetValues" :key="i">
              <p class="bg-[#d3e6fe] mr-4 px-3 py-[0.5] rounded">
                {{ facet.name }}
              </p>
            </div>
          </div>
          <div>
            <LazyHydrate when-idle>
              <div class="hidden md:block">
                <h4 class="my-4 text-secondary">Product Reviews</h4>
                <SfReview
                  v-for="review in reviews"
                  :key="review.id"
                  :message="review.summary"
                  :max-rating="5"
                  :rating="review.rating"
                  :char-limit="250"
                  :read-more-text="$t('Read more')"
                  :hide-full-text="$t('Read less')"
                  class="product__review"
                >
                  <template #author class="flex">
                    <h4
                      class="capitalize text-[#4f4f4f] mr-3 font-bold text-base float-left"
                    >
                      {{ review.authorName }}
                    </h4>
                    <h4 class="text-base text-[#4f4f4f]">
                      {{ new Date(review.createdAt).toLocaleString() }}
                    </h4>
                  </template>
                </SfReview>
                <MyReview
                  :productId="product.id"
                  :currentUserHasNoReview="!currentUserHasReview"
                />
              </div>

              <!-- <SfTabs :open-tab="1" class="product__tabs max-h-96 overflow-auto">
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
            </SfTabs> -->
            </LazyHydrate>
          </div>
        </div>
      </div>

      <div class="hidden md:flex mt-8">
        <SfTable
          :class="isDarkMode ? 'text-white bg-dark_accent' : 'bg-faded_white'"
          id="var-table"
        >
          <SfTableHeading>
            <SfTableHeader class="border-r"> Item </SfTableHeader>
            <template v-if="product.variantList.items[0].options.length > 0">
              <SfTableHeader
                class="border-r"
                v-for="(o, index) in product.variantList.items[0].options"
                :key="index"
              >
                {{ o.group.name }}
              </SfTableHeader>
            </template>
            <SfTableHeader class="border-r"> Availability </SfTableHeader>
            <SfTableHeader> Price </SfTableHeader>
          </SfTableHeading>
          <SfTableRow
            v-for="variant in product.variantList.items"
            :key="variant.id"
            class="mb-4"
          >
            <SfTableData class="flex justify-center">
              <div class="flex justify-center my-4">
                <div v-if="variant.featuredAsset" class="ml-2">
                  <img
                    :src="variant.featuredAsset.preview"
                    alt=""
                    class="h-16 w-16 mr-2 object-contain"
                  />
                </div>
                <div v-else-if="product.featuredAsset" class="ml-2">
                  <img
                    :src="product.featuredAsset.preview"
                    alt=""
                    class="h-16 w-16 mr-2 object-contain"
                  />
                </div>
                <p>
                  <nuxt-link
                    class="text-secondary hover:underline"
                    :to="`/p/${product.id}/${variant.id}/${product.slug}`"
                  >
                    {{ variant.sku }}
                  </nuxt-link>
                </p>
              </div>
            </SfTableData>
            <SfTableData
              v-for="(option, index) in variant.options"
              :key="index"
              class="flex justify-center mt-2 ml-4"
            >
              <p class="my-4 capitalize">{{ option.name }}</p>
            </SfTableData>
            <SfTableData class="flex justify-center items-start"
              ><p class="mt-7">
                {{ variant.stockLevel }}
              </p>
            </SfTableData>
            <SfTableData class="justify-center items-start">
              <div class="mt-6">
                <div class="mx-2 items-center">
                  <div class="whitespace-nowrap mr-4">
                    <h4 v-if="variant.customFields.showprice"  class="text-lg">
                      {{
                        parseFloat(
                          String(variant.price).slice(0, -2)
                        ).toLocaleString() +
                        '.' +
                        String(variant.price).slice(-2) +
                        ' '
                      }}
                      ETB / {{ product.customFields.granularity }}
                    </h4>
                  <h4 v-else class="text-lg">
                      Unavailable</h4>
                  </div> 
                  <div>
                    <div  class="flex">
                      <input
                        type="number"
                        min="1"
                        :value="toCart"
                        :class="
                          isDarkMode
                            ? 'text-white bg-dark_accent'
                            : 'text-secondary'
                        "
                        class="border border-secondary rounded-lg w-10 text-center mr-2"
                        :id="variant.id"
                      />
                      <button
                        @click="addToCart($event)"
                        
                        class="flex rounded-lg px-2 hover:scale-105"
                      >
                        <!-- <span class="mt-1"> Buy </span> -->
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
                        />
                      </button>
                    </div>
                    <!-- <div v-else class="flex">
                      <button
                        :class="
                          isDarkMode
                            ? 'bg-[#d3e6fe] text-secondary'
                            : 'bg-secondary text-white'
                        "
                        class="flex border border-secondary rounded-lg px-2 hover:scale-105"
                      >
                        <span class="mt-1"> Contact Us </span>
                      </button>
                    </div> -->
                    <!-- <button
                      @click="addToWishlist(product, variant.id)"
                      :class="
                        isDarkMode
                          ? 'bg-white text-secondary'
                          : 'bg-secondary text-white'
                      "
                      class="border border-secondary rounded-lg my-2 mx-2"
                    >
                      <span class="mt-1">Add To WishList</span>
                    </button> -->
                  </div>

                  <!-- <div class="flex my-auto">
                  <input
                    :class="
                      isDarkMode
                        ? 'text-white bg-dark_accent'
                        : 'bg-faded_white'
                    "
                    class="bg-none rounded-lg w-12 text-center mr-2 h-8"
                    min="1"
                    :value="toCart"
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
                </div> -->
                </div>
                <div v-if="variant.accessories.length > 0">
                  <div class="mt-[5%] ml-2">
                    <input
                      type="checkbox"
                      v-model="isAccessories"
                      class="mr-[3%]"
                    />
                    <h3 class="text-secondary font-bold text-lg">
                      accessories
                    </h3>
                  </div>
                  <hr class="mt-4" />
                  <template v-if="isAccessories">
                    <div
                      v-for="(acc, i) in variant.accessories"
                      :key="`'r' + ${i}`"
                      class="mt-3 ml-2"
                    >
                      <div class="accessories">
                        <input
                          @change="accessoryClicked(acc.variants[0].id)"
                          type="checkbox"
                          class="mr-[3%]"
                        />
                        <nuxt-link :to="`/v/${acc.slug}`">
                          <img
                            :src="
                              acc.featuredAsset && acc.featuredAsset.preview
                            "
                            alt=""
                            class="w-8 h-8 mr-2"
                          />
                        </nuxt-link>
                        <nuxt-link :to="`/v/${acc.slug}`">
                          <h4 class="text-secondary font-bold text-base">
                            {{ acc.name }}
                          </h4>
                          <h5>
                            For an additional
                            {{
                              parseFloat(
                                String(acc.variants[0].price).slice(0, -2)
                              ).toLocaleString() +
                              '.' +
                              String(acc.variants[0].price).slice(-2) +
                              ' '
                            }}
                            ETB
                          </h5>
                        </nuxt-link>
                      </div>
                      <hr class="mt-2" />
                    </div>
                  </template>
                </div>
              </div>
            </SfTableData>
          </SfTableRow>
        </SfTable>
      </div>

      <div class="md:hidden mt-4 mx-auto" id="var-table">
        <div v-for="variant in product.variantList.items" :key="variant.id">
          <div
            :class="isDarkMode ? 'text-white bg-dark_accent' : 'bg-white'"
            class="rounded-lg m-2"
          >
            <div class="block w-full">
              <div class="grid grid-cols-2">
                <div class="image mr-1">
                  <div v-if="variant.featuredAsset">
                    <img
                      :src="variant.featuredAsset.preview"
                      alt="image"
                      class="rounded-lg object-cover m-2"
                    />
                  </div>
                  <div v-else-if="product.featuredAsset">
                    <img
                      :src="product.featuredAsset.preview"
                      alt="image"
                      class="rounded-lg object-cover m-2"
                    />
                  </div>
                </div>
                <div class="text flex flex-col justify-between">
                  <nuxt-link
                    :to="`/p/${product.id}/${variant.id}/${product.slug}`"
                  >
                    <h6
                      :class="isDarkMode ? 'text-white bg-dark_accent' : ''"
                      class="m-4"
                    >
                      {{ variant.sku }}
                      <br />
                      {{
                        String(variant.price).slice(0, -2) +
                        '.' +
                        String(variant.price).slice(-2)
                      }}
                      ETB / {{ product.customFields.granularity }}
                    </h6>
                  </nuxt-link>
                  <div class="m-4">
                    <div v-for="(option, i) in variant.options" :key="i">
                      <h6 class="text-secondary">
                        {{ option.group.name }} : {{ option.name }}
                      </h6>
                    </div>
                    <h6 :class="isDarkMode ? 'text-white bg-dark_accent' : ''">
                      Availability: {{ variant.stockLevel }}
                    </h6>
                    <div v-if="variant.accessories.length > 0">
                      <div class="mt-[5%] ml-2">
                        <input
                          type="checkbox"
                          v-model="isAccessories"
                          class="mr-[3%]"
                        />
                        <h3 class="text-secondary font-bold text-lg">
                          accessories
                        </h3>
                      </div>
                      <hr class="mt-4" />
                      <template v-if="isAccessories">
                        <div
                          v-for="(acc, i) in variant.accessories"
                          :key="`'r' + ${i}`"
                          class="mt-3 ml-2"
                        >
                          <div class="accessories">
                            <input
                              @change="accessoryClicked(acc.variants[0].id)"
                              type="checkbox"
                              class="mr-[3%]"
                            />
                            <nuxt-link :to="`/v/${acc.slug}`">
                              <img
                                :src="
                                  acc.featuredAsset && acc.featuredAsset.preview
                                "
                                alt=""
                                class="w-8 h-8 mr-2"
                              />
                            </nuxt-link>
                            <nuxt-link :to="`/v/${acc.slug}`">
                              <h4 class="text-secondary font-bold text-base">
                                {{ acc.name }}
                              </h4>
                              <h5>
                                For an additional
                                {{
                                  parseFloat(
                                    String(acc.variants[0].price).slice(0, -2)
                                  ).toLocaleString() +
                                  '.' +
                                  String(acc.variants[0].price).slice(-2) +
                                  ' '
                                }}
                                ETB
                              </h5>
                            </nuxt-link>
                          </div>
                          <hr class="mt-2" />
                        </div>
                      </template>
                    </div>
                    <hr
                      :class="isDarkMode ? 'bg-white ' : 'bg-bg_dark'"
                      class="my-4"
                    />
                    <div class="flex">
                      <input
                        :value="toCart"
                        :class="
                          isDarkMode
                            ? 'text-white bg-dark_accent'
                            : 'text-secondary'
                        "
                        class="border border-secondary rounded-lg w-10 text-center mr-2"
                        type="number"
                        :id="variant.id"
                      />
                      <button
                        @click="addToCart($event)"
                        :class="
                          isDarkMode
                            ? 'bg-white text-secondary'
                            : 'bg-secondary text-white'
                        "
                        class="flex border border-secondary rounded-lg px-2"
                      >
                        <span class="mt-1"> Buy </span>
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
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LazyHydrate when-idle>
        <div class="md:hidden">
          <h4 class="my-8 text-secondary">Product Reviews</h4>
          <SfReview
            v-for="review in reviews"
            :key="review.id"
            :message="review.summary"
            :max-rating="5"
            :rating="review.rating"
            :char-limit="250"
            :read-more-text="$t('Read more')"
            :hide-full-text="$t('Read less')"
            class="product__review"
          >
            <template #author class="flex">
              <h4
                class="capitalize text-[#4f4f4f] mr-3 font-bold text-base float-left"
              >
                {{ review.authorName }}
              </h4>
              <h4 class="text-base text-[#4f4f4f]">
                {{ new Date(review.createdAt).toLocaleString() }}
              </h4>
            </template>
          </SfReview>
          <MyReview
            :productId="product.id"
            :currentUserHasNoReview="!currentUserHasReview"
          />
        </div>

        <!-- <SfTabs :open-tab="1" class="product__tabs max-h-96 overflow-auto">
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
            </SfTabs> -->
      </LazyHydrate>
    </div>
  </div>
</template>

<script>
import MyReview from '~/components/MyAccount/MyReview.vue';
import Loading from '~/components/Loading.vue';
import { useUiState } from '~/composables';
import LazyHydrate from 'vue-lazy-hydration';
import axios from 'axios';
import {
  SfButton,
  SfTable,
  SfIcon,
  SfTabs,
  SfReview,
  SfBreadcrumbs,
} from '@storefront-ui/vue';
import { ref, inject } from '@vue/composition-api';
import { useWishlist, useCart, useUser } from '@vue-storefront/vendure';
import Gallery from '~/components/Gallery.vue';
import CryptoJS from 'crypto-js';
export default {
  middleware: ['csrf'],
  components: {
    SfButton,
    SfTable,
    SfBreadcrumbs,
    SfTabs,
    SfIcon,
    Gallery,
    MyReview,
    SfReview,
    LazyHydrate,
    Loading,
  },

  data() {
    return {
      isAccessories: false,
      loading: false,
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
      const reviewsListResponse = await axios.post('/api/shop', body, options);

      var reviewsList =
        reviewsListResponse.data?.data?.data?.product.reviews.items;
      if (this.isAuthenticated) {
        return this.setThisUsersReview(reviewsList);
      }

      return reviewsList;
    },

    setThisUsersReview(reviewsList) {
      var email = this.user.emailAddress;
      for (var review of reviewsList) {
        if (review['authorLocation'] === email) {
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
      const slug = this.$route.params.slug_1;
      const body = {
        query: `query getProductVariant($slug: String!){
          product(slug: $slug){
            id
            name
            slug
            description
            collections{
              id
              name
              slug
              parent {
                name
              }
            }
            facetValues{
              name
            }
            customFields{
              youtube_link
              documentations
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
                customFields {
                    showprice
                  }
                id
                sku
                price
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
                  variants{
                    id
                    priceWithTax
                    price
                  }
                }
                stockLevel
              }
            }
          }
        }`,
        variables: { slug: slug },
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
      const productVariant = await axios.post('/api/shop', body, options);
      this.product = productVariant?.data?.data?.data?.product;
      this.loading = false;
    },
  },
  computed: {
    breadcrumbs() {
      let bcrumb = [{ text: 'home', link: '/' }];
      this.product.collections.forEach((collection) => {
        if (
          collection?.name !== null &&
          collection?.parent?.name &&
          collection?.parent?.name === '__root_collection__'
        ) {
          bcrumb.push({
            text: collection?.name,
            link: `/c/${collection?.slug}`,
          });
        } else if (
          collection?.name !== null &&
          collection?.parent?.name &&
          collection?.parent?.name !== '__root_collection__'
        ) {
          bcrumb.push({
            text: collection?.name,
            link: `/s/${collection?.slug}`,
          });
        }
      });
      bcrumb.push({ text: this.product?.name, link: '#' });
      return bcrumb;
    },
    priceRange() {
      if (this.product?.variantList?.totalItems === 1) {
        const price = String(this.product?.variantList?.items[0]?.price);
        const fPrice = price.slice(0, -2) + '.' + price.slice(-2);
        return parseFloat(fPrice).toLocaleString() + ' ETB';
      } else if (this.product?.variantList?.totalItems > 1) {
        let prices = [];
        this.product.variantList?.items.forEach((item) => {
          prices.push(item.price);
        });
        const max =
          String(Math.max(...prices)).slice(0, -2) +
          '.' +
          String(Math.max(...prices)).slice(-2);
        const min =
          String(Math.min(...prices)).slice(0, -2) +
          '.' +
          String(Math.min(...prices)).slice(-2);
        return (
          parseFloat(min).toLocaleString() +
          ' ETB' +
          ' - ' +
          parseFloat(max).toLocaleString() +
          ' ETB'
        );
      }
    },
    custom() {
      const link = this.product?.customFields?.youtube_link.split('?v=')[1];
      const documents = [];
      this.product?.customFields?.documentations?.forEach((document) => {
        if (document.length > 0) {
          documents.push({
            name: document.split('_')[1],
            link:
              process.env.GRAPHQL_API?.split('/shop-api')[0] +
              '/assets/' +
              document,
          });
        }
      });
      // process.env.GRAPHQL_API?.split('/shop-api')[0] +
      // this.product?.customFields?.documentation;
      return { link: link, documents: documents };
    },
  },
  setup(props, context) {
    const showToast = inject('showToast');
    const { user, isAuthenticated, load } = useUser();
    const { isDarkMode } = useUiState();
    const {
      load: loadCart,
      addItem: addItemToCart,
      isInCart,
      cart,
      setCart,
    } = useCart();
    const accessoriesToCart = ref([]);

    const accessoryClicked = (accId) => {
      if (!accessoriesToCart.value.includes(accId)) {
        accessoriesToCart.value.push(accId);
      } else {
        accessoriesToCart.value.splice(
          accessoriesToCart.value.indexOf(accId),
          1
        );
      }
    };
    // const {
    //   addItem: addItemToWishlist,
    //   WishlistItem,
    //   removeItem: removeItemFromWishlist,
    //   isInWishlist,
    //   load: loadwishlist,
    // } = useWishlist();
    // const wishlist = ref([]);
    // const addToWishlist = (product, variantId) => {
    //   const variant = product.variantList.items.find(
    //     (item) => item.id === variantId
    //   );

    //   if (!variant) {
    //     showToast('Variant not found');
    //     return;
    //   }

    //   const wishlistProduct = {
    //     _id: product.id,
    //     _variantId: variantId,
    //     _description: product.description,
    //     _categoriesRef: product.collections[0].id,
    //     name: product.name,
    //     slug: product.slug,
    //     images: product.assets[0].preview ? [product.assets[0].preview] : [],
    //     price: variant.price,
    //     options: variant.options,
    //     rating: product.rating,
    //   };

    //   addItemToWishlist({ product: wishlistProduct })
    //     .then(async () => {
    //       await loadwishlist();
    //       wishlist.value = [...wishlist.value, wishlistProduct];
    //       showToast('Product added to wishlist!');

    //       console.log('wishlistvalue', wishlist.value);
    //     })
    //     .catch((error) => {
    //       showToast(error.message);
    //     });
    // };

    const addToCart = async (e) => {
      //loadCart();
      const quantity =
        Number(e.target.parentElement.parentElement.firstChild.value) ||
        Number(
          e.target.parentElement.parentElement.parentElement.firstChild.value
        );
      const variantId =
        e.target.parentElement.parentElement.firstChild.id ||
        e.target.parentElement.parentElement.parentElement.firstChild.id;

      if (accessoriesToCart.value.length) {
        const variants = [];
        accessoriesToCart.value.forEach((a) =>
          variants.push({ accessoryId: a, quantity: 1 })
        );
        addItemToCart({
          product: {
            _variantId: variantId,
          },
          quantity: quantity,
        }).then((res) => {
          multipleAddToCart(variants).then((res) => {
            addItemToCart({
              product: {
                _variantId: variantId,
              },
              quantity: 0,
            });
          });
        });
        // loadCart();
        // setCart();
      } else {
        addItemToCart({
          product: {
            _variantId: variantId,
          },
          quantity: quantity,
        }).then((res) => {
          if (cart.value.errorCode && cart.value.errorCode != '') {
            showToast(cart.value.message);
            setCart(cart.value.order);
          } else {
            showToast('Product added to cart!');
          }
        });
      }
    };

    const multipleAddToCart = async (variants) => {
      const body = {
        query: `mutation multipleAdd($input: [AccessoriesInput!]) {
          addAccessoriesToOrder(input: $input) {
            success
          }
        }
        `,
        variables: {
          input: variants,
        },

        csrfToken: context.root.$store.state.csrfToken.csrfToken,
      };
      const token = CryptoJS.AES.encrypt(
        context.root.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      await axios
        .post('/api/shop', body, options)
        .then(async (res) => {
          if (res.data.data.data?.addAccessoriesToOrder?.success) {
            loadCart();
            console.log(cart.value);
            setCart(cart.value);
            showToast('Products added to cart');
          }
        })
        .catch((err) => '');
    };

    return {
      isInCart,
      addToCart,
      //  isInWishlist,
      // addToWishlist,
      loadCart,
      //  loadwishlist,
      isAuthenticated,
      isDarkMode,
      user,
      accessoryClicked,
      accessoriesToCart,
    };
  },
  async created() {
    this.loading = true;
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

.redd {
  color: #ffffff;
}
</style>
