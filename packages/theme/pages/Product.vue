<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
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
            :title="productGetters.getName(product)"
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
              productGetters.getPrice(product).regular.toLocaleString() + ' ETB'
            "
          />
          <div>
            <div class="product__rating">
              <SfRating :score="averageRating" :max="5" />
              <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a>
            </div>
            <SfButton class="sf-button--text">{{
              $t('Read all reviews')
            }}</SfButton>
          </div>
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
            class="product__description desktop-only my-4"
            v-html="productGetters.getDescription(product)"
          ></div>
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
          <div v-if="options && options.length">
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
          </div>
        </div>
        <LazyHydrate when-idle> </LazyHydrate>
      </div>
    </div>
    <div>
      <div class="flex justify-evenly bg-light_accent mt-6 pt-4 pb-10">
        <div class="w-1/2">
          <h3 class="font-thin mb-4 ml-16">Specification and Description</h3>
          <table class="table-auto w-2/3 border ml-16">
            <tbody>
              <tr>
                <td>Capacity (kg)</td>
                <td>25</td>
              </tr>
              <tr>
                <td>Readability (g)</td>
                <td>25</td>
              </tr>
              <tr>
                <td>Platform Length (in)</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Platform Width (in)</td>
                <td>25</td>
              </tr>
              <tr>
                <td>Min Temperature (° C)</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Max Temperature (° C)</td>
                <td>-10</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-1/2 -ml-16 mr-8">
          <h3 class="font-thin">More about this item</h3>
          <p>
            Lorem ipsum dolor, yes sit amet consectetur adipisicing elit. Nisi
            eveniet, illum eligendi distinctio obcaecati magni error molestias,
            provident explicabo omnis doloribus animi voluptatum blanditiis
            esse. Fuga quisquam eos veniam aspernatur! Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Nostrum accusamus mollitia, autem
            officia harum quae itaque nesciunt eos commodi sunt numquam, ex
            beatae ea nihil? Neque optio doloremque quidem facilis. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Laboriosam, pariatur
            nulla qui exercitationem, aliquid fuga provident veritatis quisquam
            tempore commodi inventore debitis corporis minima facilis assumenda,
            praesentium eum optio omnis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Pariatur deserunt, nam aliquam accusamus iure
            perspiciatis ullam. Aut error, aliquam exercitationem aliquid neque
            corrupti perferendis illo accusantium nulla, quidem qui quam!
          </p>
        </div>
      </div>
      <div class="mx-14 mt-14">
        <h3 class="font-extralight">Accessories</h3>
        <div class="grid grid-cols-5">
          <div
            class="card shadow-lg w-52 my-3 bg-light_accent"
            v-for="i in 5"
            :key="i"
          >
            <img src="../static/homepage/testTube.jpg" alt="" />
            <h3 class="text-center m-3">link</h3>
            <h4 class="text-center font-serif m-3">
              $925.00 - $2,080.00USD / Each
            </h4>
            <p class="text-center m-3">description</p>
            <button
              class="mx-10 my-4 bg-dark text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
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
import MyReview from '~/components/MyAccount/MyReview.vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed, reactive } from '@vue/composition-api';
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

export default {
  name: 'Product',
  transition: 'fade',
  async created() {
    console.log('Product Page created');
    this.reviews = await this.getProductsReviews();
  },
  setup(props, context) {
    console.log('Product Page setup');
    const qty = ref(1);
    const { id } = context.root.$route.params;
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
    const productGallery = computed(() =>
      productGetters.getAllGallery(products.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        alt: product.value._name || product.value.name,
      }))
    );
    console.log('gallery', productGallery);

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
      //reviewKey,
    };
  },
  methods: {
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
      const response = await fetch('http://localhost:3000/shop-api', {
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
    max-width: 1272px;
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
</style>
