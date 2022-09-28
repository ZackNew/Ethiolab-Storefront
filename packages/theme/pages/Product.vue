<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <!-- <p>{{breadcrumbs}}</p> -->
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery
          :images="productGallery"
          class="product__gallery w-auto"
          enableZoom
        />
      </LazyHydrate>
      <div class="product__info mr-20">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(varproduct[0])"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <SfPrice
            :regular="
              // varproduct[0].price.current
              // productGetters.getPrice(varproduct).regular.toLocaleString() + ' ETB'
              varprice + ' ETB'
            "
          />
          <!-- <div>
            <div class="product__rating">
              <SfRating :score="5" :max="5" />
              <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a>
            </div>
            <SfButton class="sf-button--text">{{
              $t('Read all reviews')
            }}</SfButton>
          </div> -->
        </div>
        <div>
          <SfAddToCart
            v-e2e="'product_add-to-cart'"
            :stock="stock"
            v-model="qty"
            :disabled="loading"
            :canAddToCart="stock > 0"
            class="product__add-to-cart -mt-2"
            @click="addToCart"
          />
          <div
            :class="classes.red"
            class="product__description desktop-only my-4 max-h-[30rem] overflow-hidden text-justify"
            v-html="variant_description"
          ></div>
          <a style="color: blue" href="#full-description">MORE +</a>
          <iframe
            width="560"
            height="315"
            :src="`https://www.youtube-nocookie.com/embed/${youtube_link}?playlist=${youtube_link}&loop=1&controls=0`"
            title="YouTube video player"
            frameborder="0"
            v-if="youtube_link !== ''"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <!-- <div v-if="options && options.length">
            <SfSelect
              v-for="optionGroup in options"
              :key="optionGroup.id"
              v-model="configuration[optionGroup.value]"
              @input="(option) => updateFilter({ [optionGroup.value]: option })"
              :label="optionGroup.label"
              class="sf-select--underlined product__select-size"
              :required="true"
            >
              <SfSelectOption
                v-for="option in optionGroup.options"
                :key="option.id"
                :value="option.value"
              >
                {{ option.label }}
              </SfSelectOption>
            </SfSelect>
          </div> -->
        </div>
        <LazyHydrate when-idle> </LazyHydrate>

        <LazyHydrate when-idle>
          <SfTabs :open-tab="1" class="product__tabs max-h-96 overflow-auto">
            <SfTab :title="$t('Read reviews')" :key="reviewKey">
              <!-- <div v-for="(review, index) in reviews" :key="index">
                {{review.summary}}
              </div> -->
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
              <!-- :myReview="currentReview.value" @updateMyReview="updateMyReview" @addNewReview="addNewReview" -->
              <MyReview
                :productId="id"
                :currentUserHasNoReview="!currentUserHasReview"
              />
            </SfTab>
          </SfTabs>
        </LazyHydrate>
      </div>
    </div>
    <div>
      <div
        id="full-description"
        class="flex justify-evenly bg-light_accent mt-6 pt-4 pb-10"
      >
        <div class="w-1/2">
          <h3 class="font-thin mb-4 ml-16">Specification and Description</h3>

          <table class="table-auto w-2/3 border ml-16">
            <tbody>
              <tr v-for="(option, index) in optionTableValues" :key="index">
                <td>
                  {{ option.head }}
                </td>
                <td>
                  {{ option.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-1/2 -ml-16 mr-8">
          <h3 class="font-thin">More about this item</h3>
          <p
            class="text-justify"
            :class="classes.red"
            v-html="variant_description"
          ></p>
        </div>
      </div>
      <div v-if="productAccessories.length !== 0" class="mx-14 mt-14">
        <h3 class="font-extralight">Accessories</h3>
        <SubcatBrandCard :filteredProducts="productAccessories" />
      </div>
      <!-- <div class="mx-14 mt-14">
        <h3 class="font-extralight">Accessories</h3>
        <div class="grid grid-cols-5">
          <div
            class="card shadow-lg w-52 my-3 bg-light_accent"
            v-for="accessory in productAccessories"
            :key="accessory.id"
          >
            <img src="../static/homepage/testTube.jpg" alt="" />
            <h3 class="text-center m-3">{{ accessory.name }}</h3>
            <h4 class="text-center font-serif m-3">
              {{ accessory.variants[0].price }}
            </h4>
            <button
              class="mx-10 my-4 bg-dark text-white font-bold py-2 px-4 rounded"
            >
              View
            </button>
          </div>
        </div>
      </div> -->
    </div>

    <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        title="Related Products"
      />
    </LazyHydrate>
    <!-- <LazyHydrate when-visible> -->
    <!-- </LazyHydrate> -->
  </div>
</template>
<script src="https://www.youtube.com/iframe_api"></script>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
} from '@storefront-ui/vue';
import SubcatBrandCard from '../components/SubcatBrandCard.vue';
import MyReview from '~/components/MyAccount/MyReview.vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed, reactive, onMounted } from '@vue/composition-api';
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  reviewGetters,
  useRelatedProducts,
  useUser,
  userGetters,
} from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { getProductVariantByConfiguration } from '~/helpers';
import axios from 'axios';

export default {
  name: 'Product',
  transition: 'fade',
  async created() {
    this.getVariants();
    this.getAccessories();
    this.reviews = await this.getProductsReviews();
  },

  setup(props, context) {
    console.log('Product Page setup', process.env.GRAPHQL_API);
    const qty = ref(1);
    const { id } = context.root.$route.params;
    const { vid } = context.root.$route.params;
    const { products, search } = useProduct('products');
    const { addItem, loading } = useCart();
    // const { reviews: productReviews, search: searchReviews } = useReview(id);
    const {
      relatedProducts,
      load: searchRelatedProducts,
      loading: relatedLoading,
    } = useRelatedProducts();

    const product = computed(() =>
      productGetters.getByFilters(products.value, {
        master: true,
        attributes: context.root.$route.query,
      })
    );
    console.log('producttttt', products.value);

    const options = computed(() =>
      productGetters.getOptions(products.value, ['color', 'size'])
    );
    console.log('optionsssss issss thissss', options.value);
    // TODO: Implement reviews
    //const reviews = ref([]);//computed(() => reviewGetters.getItems(productReviews.value));
    const configuration = ref({});
    const { user, isAuthenticated, load, getU } = useUser();
    const properties = computed(() => [
      {
        name: 'ID',
        value: productGetters.getId(product.value),
      },
      {
        name: 'Slug',
        value: productGetters.getSlug(product.value),
      },
      {
        name: 'SKU',
        value: productGetters.getSku(product.value),
      },
      {
        name: 'Categories',
        value: productGetters.getCategoryNames(products.value).join(', '),
      },
    ]);

    const breadcrumbs = computed(() =>
      productGetters.getBreadcrumbs(product.value)
    );

    const allvarproduct = computed(() =>
      productGetters.getByFilters(products.value)
    );
    const varproduct = allvarproduct.value.filter((value) => value._id === vid);
    const varp = varproduct[0]?.price.current.toString();
    const varprice =
      varp &&
      varp.substring(0, varp.length - 2) +
        '.' +
        varp.substring(varp.length - 2);

    const productGallery = computed(() => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa', varproduct[0]?.images[0]);
      if (varproduct[0]?.images[0])
        return productGetters.getAllGallery(varproduct[0]).map((img) => ({
          mobile: { url: img.small },
          desktop: { url: img.normal },
          big: { url: img.big },
          alt: product.value._name || product.value.name,
        }));
      else
        return productGetters.getAllGallery(products.value).map((img) => ({
          mobile: { url: img.small },
          desktop: { url: img.normal },
          big: { url: img.big },
          alt: product.value._name || product.value.name,
        }));
    });
    console.log('gallery', productGallery);

    onMounted(() => {
      console.log('the productzzzzz value is ', products.value);
      console.log('the varproduct value is ', varproduct);
    });

    onSSR(async () => {
      await search({ id });
      await load();
      const currentCollectionId =
        product.value._categoriesRef[product.value._categoriesRef.length - 1];
      await searchRelatedProducts({
        input: {
          collectionId: currentCollectionId,
          take: 8,
          groupByProduct: true,
        },
      });
    });

    const updateFilter = (filter) => {
      const url = new URL(window.location);
      url.searchParams.set(Object.keys(filter)[0], Object.values(filter)[0]);
      window.history.pushState({}, '', url);
    };

    const addToCart = () => {
      const isConfigurationSelected = Object.values(configuration.value).length;
      if (isConfigurationSelected) {
        const productVariant = getProductVariantByConfiguration(
          products.value,
          configuration.value
        );
        const agnosticProductVariant = computed(() =>
          productGetters.getByFilters(products.value, { id: productVariant.id })
        );
        addItem({
          product: agnosticProductVariant.value,
          quantity: parseInt(qty.value),
        });
      } else {
        addItem({ product: product.value, quantity: parseInt(qty.value) });
      }
    };

    //var reviewKey= ref(0);
    return {
      products,
      updateFilter,
      configuration,
      product,
      isAuthenticated,
      reviewGetters,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value)
      ),
      totalReviews: computed(() =>
        productGetters.getTotalReviews(product.value)
      ),
      relatedProducts: computed(() => relatedProducts.value.items),
      relatedLoading,
      options,
      qty,
      loading,
      productGetters,
      productGallery,
      properties,
      addToCart,
      breadcrumbs,
      id,
      user,
      varproduct,
      varprice,
      //reviewKey,
    };
  },
  methods: {
    async getVariants() {
      const productId = parseInt(this.$route.params.id);
      const variantId = this.$route.params.vid;
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `query productVariant($id: ID!, $eq: String!) {
                  product(id: $id) {
                    variantList(options: {filter: {id: {eq: $eq}}}) {
                      items {
                        customFields {
                          description
                        }
                        options {
                          name
                          group {
                            name
                          }
                        }
                      }
                    }
                  }
                }
                `,
        variables: {
          id: productId,
          eq: variantId,
        },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const variant = await axios.post(baseUrl, body, options);
      var tablular =
        variant.data.data?.product?.variantList?.items[0]?.options.map((o) => ({
          value: o.name,
          head: o.group.name,
        }));
      this.optionTableValues = tablular;
      this.variant_description =
        variant.data.data?.product?.variantList?.items[0]?.customFields?.description;

      console.log(
        '=======================',
        typeof productId,
        typeof variantId,
        variant.data.data?.product?.variantList?.items[0]?.options
      );
      console.log('=======bbbbbb===========', tablular);
    },
    async getAccessories() {
      const productId = this.$route.params.id;
      let baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `query getAccessories($id: ID!) {
                  product(id: $id) {
                    customFields {
                      accessories {
                        slug
                        id
                        name
                        featuredAsset {
                          preview
                        }
                        variants {
                          price
                        }
                      }
                    }
                  }
                }`,
        variables: {
          id: productId,
        },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const accessories = await axios.post(baseUrl, body, options);
      this.productAccessories =
        accessories.data.data.product?.customFields?.accessories;
      console.log(
        'xxxxxxxxxxxxx',
        accessories.data.data.product?.customFields?.accessories
      );
    },
    async getProductsReviews() {
      console.log(this.id);
      const data = JSON.stringify({
        query: `
        query{
          product(id: ${this.id}){
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
            customFields{
              youtube_link
              maintenance_fee
            }
          }
        }
      `,
      });
      let baseUrll = process.env.GRAPHQL_API;
      const response = await fetch(baseUrll, {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
      });
      const reviewsListResponse = await response.json();
      let splitted =
        reviewsListResponse.data.product.customFields?.youtube_link.split(
          '?v='
        );
      if (splitted.length == 2) {
        this.youtube_link = splitted[1];
      }
      if (
        reviewsListResponse.data.product.customFields?.maintenance_fee !== ''
      ) {
        console.log(
          `${reviewsListResponse.data.product.customFields?.maintenance_fee} fee`
        );
        this.properties.push({
          name: 'Maintenance Fee',
          value: reviewsListResponse.data.product.customFields?.maintenance_fee,
        });
        console.log(this.properties);
      }
      var reviewsList = reviewsListResponse.data.product.reviews.items;
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

    // getYoutubeLinks(){
    //   const data = JSON.stringify({
    //     query: `
    //     query{
    //       product(id: ${this.id}){
    //         reviews{
    //           items{
    //             summary
    //             body
    //             rating
    //             authorName
    //             authorLocation
    //             createdAt
    //             id
    //           }
    //         }
    //       }
    //     }
    //   `
    //   });
    //   const response = await fetch("http://localhost:3000/shop-api", {
    //     method: 'post',
    //     body: data,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Content-Length': data.length
    //     }
    //   });
    //   const reviewsListResponse = await response.json();
    // }
  },
  components: {
    SubcatBrandCard,
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    MobileStoreBanner,
    LazyHydrate,
    MyReview,
  },
  data() {
    return {
      variant_description: null,
      productAccessories: [],
      optionTableValues: [],
      stock: 5,
      brand:
        'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
      email: '',
      reviews: [],
      currentUserHasReview: false,
      youtube_link: '',
      reviewKey: 0,
    };
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

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 90%;
    margin: 0 auto;
  }
}
.product {
  color: var(--c-text);
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
    color: (--c-text);
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.product__review {
  --font-family--primary: 'Josefin Sans', sans-serif;
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
