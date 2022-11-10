<template>
  <div id="product" v-if="Svariant !== null">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only text-secondary"
      :breadcrumbs="breadcrumbs"
    />
    <!-- <p>{{breadcrumbs}}</p> -->
    <div>
      <div class="mx-2 md:mx-0 md:grid md:grid-cols-12">
        <div class="md:col-span-6 max-w[99%] overflow-hidden">
          <Gallery
            :images="
              Svariant.assets.length > 0 ? Svariant.assets : prImages || []
            "
            :display="Svariant.featuredAsset ? Svariant.featuredAsset : prImage"
            class="mb-5 md:mb-0"
          />
        </div>
        <div class="md:col-span-6">
          <h2 class="text-secondary font-bold mb-3">{{ Svariant.name }}</h2>
          <h4 class="text-secondary mb-3">
            {{
              String(Svariant.priceWithTax).slice(0, -2) +
              '.' +
              String(Svariant.priceWithTax).slice(-2)
            }}
            ETB
          </h4>
          <div class="flex mb-5">
            <input
              class="max-w-[55px] text-center mr-4"
              v-model="qty"
              type="number"
            />
            <SfButton @click="addToCart" class="rounded bg-secondary mr-[2%]"
              >Add To Cart</SfButton
            >
            <SfButton @click="addToCompareList" class="rounded bg-primary"
              >Add To Compare List</SfButton
            >
          </div>
          <div
            v-if="Svariant.customFields"
            class="max-h-[20rem] overflow-hidden"
            :class="isDarkMode ? 'text-white' : ''"
          >
            <p
              v-html="Svariant.customFields.description"
              class="text-justify"
              :class="classes.red"
            ></p>
          </div>

          <a href="#full" class="text-secondary text-xl">More +</a>
        </div>
      </div>
    </div>
    <div
      id="full"
      class="card rounded-2xl grid grid-cols-12 p-8"
      :class="isDarkMode ? 'text-white bg-dark_accent' : 'bg-light_gray'"
    >
      <div class="col-span-6">
        <h3>Speciﬁcation And Description</h3>
        <p
          class="max-w-[95%]"
          v-html="Svariant.customFields ? Svariant.customFields.table : ''"
          :class="classes.red"
        ></p>
      </div>
      <div class="col-span-6">
        <h3>More About This Item</h3>
        <div v-if="Svariant.customFields">
          <p
            v-html="Svariant.customFields.description"
            class="text-justify"
            :class="classes.red"
          ></p>
        </div>
      </div>
    </div>

    <div v-if="VariantAccessories.length > 0">
      <h2 class="text-secondary text-center my-10">Accessories</h2>
      <LazyHydrate when-visible>
        <VueSlickCarousel class="carousel-wrapper" v-bind="settings">
          <template #prevArrow>
            <div class="arrows">
              <svg
                class="w-12 h-12 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </div>
          </template>
          /*...*/
          <template #nextArrow>
            <div class="arrows">
              <svg
                class="w-12 h-12 text-secondary -ml-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </template>
          <div v-for="product in VariantAccessories" :key="product._id">
            <ProductCard
              :id="product._id"
              :title="product.name"
              :image="product.images"
              :regular-price="product.price.current + ' ETB'"
              :imageHeight="440"
              :imageWidth="500"
              :alt="product.name"
              :max-rating="5"
              :score-rating="3"
              :variantId="product._variantId"
              :show-add-to-cart-button="true"
              :isInWishlist="isInWishlist({ product })"
              :isAddedToCart="isInCart({ product })"
              :link="localePath(`/v/${product.slug}`)"
              @click:wishlist="
                !isInWishlist({ product })
                  ? addItemToWishlist({ product })
                  : removeItemFromWishlist({ product })
              "
              @click:add-to-cart="addToCart"
              class="carousel__item__product mr-2"
              style="border-radius: 15px"
            />
          </div>
        </VueSlickCarousel>
      </LazyHydrate>
    </div>

    <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        class="related"
      />
    </LazyHydrate>

    <!-- <LazyHydrate when-visible> -->
    <!-- </LazyHydrate> -->
  </div>
</template>
<script src="https://www.youtube.com/iframe_api"></script>
<script>
import ProductCard from '~/components/ProductCard.vue';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import Toast from '~/components/Toast.vue';
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
import SubcatBrandCard from '/components/SubcatBrandCard.vue';
import Gallery from '../components/Gallery.vue';
import MyReview from '~/components/MyAccount/MyReview.vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import {
  ref,
  computed,
  reactive,
  onMounted,
  inject,
} from '@vue/composition-api';
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  reviewGetters,
  useRelatedProducts,
  useUser,
  userGetters,
  useWishlist,
} from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { getProductVariantByConfiguration } from '~/helpers';
import { useUiState } from '~/composables';
import axios from 'axios';

export default {
  name: 'Product',
  transition: 'fade',
  async created() {
    this.getVariants();
    this.reviews = await this.getProductsReviews();
  },

  setup(props, context) {
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const showToast = inject('showToast');
    const { isDarkMode } = useUiState();
    const qty = ref(1);
    const { id } = context.root.$route.params;
    const { vid } = context.root.$route.params;
    const { products, search } = useProduct('products');
    const { addItem, addItemToCart, isInCart, loading } = useCart();
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
    const toastShower = (message) => {
      showToast(message);
    };

    const options = computed(() =>
      productGetters.getOptions(products.value, ['color', 'size'])
    );
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
      varp.substring(0, varp?.length - 2) +
        '.' +
        varp.substring(varp?.length - 2);

    const productGallery = computed(() => {
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

    onMounted(() => {});

    onSSR(async () => {
      await search({ id });
      await load();
      const currentCollectionId =
        product.value._categoriesRef[product.value._categoriesRef?.length - 1];
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
      const isConfigurationSelected = Object.values(
        configuration.value
      )?.length;
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
      addItemToCart,
      isDarkMode,
      toastShower,
      //reviewKey,
      removeItemFromWishlist,
      isInWishlist,
      isInCart,
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
                    assets{
                      preview
                    }
                    featuredAsset{
                      preview
                    }
                    variantList(options: {filter: {id: {eq: $eq}}}) {
                      items {
                        accessories{
                          id
                          name
                          slug
                          variants{
                            id
                            sku
                            priceWithTax
                          }
                          featuredAsset{
                            preview
                          }
                        }
                        name
                        priceWithTax
                        customFields {
                          description
                          table
                        }
                        featuredAsset{
                          preview
                        }
                        assets{
                          preview
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
      this.prImage = variant.data.data.product?.featuredAsset;
      this.prImages = variant.data.data.product?.assets;
      this.Svariant = variant.data.data.product?.variantList?.items[0];
      console.log('Magi Magi', this.Svariant.accessories);
      this.VariantAccessories = this.Svariant.accessories.map((p) => {
        const image = p.featuredAsset ? p.featuredAsset.preview : '';
        const price =
          String(p?.variants[0]?.priceWithTax).slice(0, -2) +
          '.' +
          String(p?.variants[0]?.priceWithTax).slice(-2);
        return {
          _id: p.id,
          _variantId: p?.variants[0]?.id,
          name: p.name,
          images: image,
          price: {
            original: price,
            current: price,
          },
          slug: p?.slug,
        };
      });
      console.log('manininin', this.VariantAccessories);
    },
    async getProductsReviews() {
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
          'Content-Length': data?.length,
        },
      });
      const reviewsListResponse = await response.json();
      let splitted =
        reviewsListResponse.data.product.customFields?.youtube_link.split(
          '?v='
        );
      if (splitted?.length == 2) {
        this.youtube_link = splitted[1];
      }
      if (
        reviewsListResponse.data.product.customFields?.maintenance_fee !== ''
      ) {
        this.properties.push({
          name: 'Maintenance Fee',
          value: reviewsListResponse.data.product.customFields?.maintenance_fee,
        });
      }
      var reviewsList = reviewsListResponse.data.product.reviews.items;
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

    addToCompareList() {
      const productId = this.$route.params.id;
      const variantId = this.$route.params.vid;
      if (
        this.$store.state.compareList?.productsToCompare?.length < 5 &&
        productId !== '' &&
        variantId !== ''
      ) {
        console.log('passed the first one');
        console.log(
          'djsfada',
          this.$store.state.compareList?.productsToCompare?.filter(
            (e) => e?.productID === productId && e?.variantID === variantId
          )?.length
        );
        if (
          this.$store.state.compareList?.productsToCompare?.filter(
            (e) => e?.productID === productId && e?.variantID === variantId
          )?.length === 0
        ) {
          console.log('passed the second one');
          this.toastShower('Added to Compare List');
          this.$store.dispatch('compareList/addToCompareList', {
            product: {
              productID: productId,
              variantID: variantId,
              image: this.Svariant.featuredAsset
                ? this.Svariant.featuredAsset.preview
                : this.prImage
                ? this.prImage.preview
                : '',
            },
          });
        } else {
          this.toastShower('Item is already in the list');
        }
      } else {
        this.toastShower('Limit to Compare Products reached');
        console.log('limit reached');
      }
    },
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
    Gallery,
    VueSlickCarousel,
    ProductCard,
  },
  data() {
    return {
      prImage: '',
      quantity: 1,
      variant_description: null,
      productAccessories: [],
      optionTableValues: [],
      VariantAccessories: [],
      Svariant: null,
      stock: 5,
      brand:
        'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
      email: '',
      reviews: [],
      currentUserHasReview: false,
      youtube_link: '',
      reviewKey: 0,
      settings: {
        dots: true,
        focusOnSelect: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
        centerMode: true,
        centerPadding: '20px',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
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
    max-width: 1250px !important;
    padding: 0;
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
