<template>
  <client-only>
    <div id="home">
      <PopupNotification />
      <div class="grid grid-cols-12 gap-4 mt-3 py-6">
        <!--        categories-->
        <div
          class="md:col-span-3 px-4 pt-4 mt-16 md:block hidden rounded-xl drop-shadow-2xl shadow-lg category-container max-h-screen overflow-auto"
        >
          <LazyHydrate when-visible>
            <CategoriesAccordion />
          </LazyHydrate>
          <SfDivider />
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
        <div class="md:col-span-9 col-span-12 md:ml-3">
          <!-- <LazyHydrate when-visible>
          <div class="similar-products">
            <SfHeading title="New Products" :level="2" />
            <nuxt-link :to="localePath('/c/all')" class="smartphone-only"
            >See all</nuxt-link
            >
          </div>
        </LazyHydrate> -->
          <!-- <LazyHydrate when-visible>
      <div class="flex flex-wrap gap-4 mb-4 mt-3 place-content-center md:place-content-start"  >
        <div v-for="(product, i) in this.products"
             :key="i" class="rounded-lg drop-shadow-lg product-card w-40 md:w-48">
          <SfProductCard
              :title="productGetters.getName(product)"
              :image="productGetters.getCoverImage(product)"
              :regular-price="productGetters.getPrice(product).regular.toLocaleString() + ' ETB'"
              imageHeight="10rem"
              :alt="productGetters.getName(product)"
              :score-rating="productGetters.getAverageRating(product)"
              :show-add-to-cart-button="true"
              :isInWishlist="isInWishlist({ product })"
              :isAddedToCart="isInCart({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeItemFromWishlist({ product })"
              @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
              class="carousel__item__product w-48"
              style="border-radius: 15px"
            />
        </div>
      </div>
        </LazyHydrate> -->

          <LazyHydrate when-visible>
            <template>
              <SfBanner
                class="banner"
                :title="heroSection.title || 'Big Sale'"
                :subtitle="heroSection.overview || 'Medical Equipments'"
                :description="
                  heroSection.description ||
                  'Find new, used, and surplus lab equipment plus medical, test equipment, process, pharmaceutical.'
                "
                :buttonText="heroSection.buttonText || 'Shop Now'"
                :image="heroImage || '/homepage/bannerB.webp'"
                link="http://www.ethiolab.et"
              />
            </template>
          </LazyHydrate>

          <iframe
            class="w-full h-96 mt-10 ytplayer"
            id="ytplayer"
            type="text/html"
            src="https://www.youtube-nocookie.com/embed/KQBQrVlEqXA?autoplay=1&mute=1&controls=0&loop=1&playlist=KQBQrVlEqXA&rel=0"
            frameborder="0"
            allowfullscreen
            ng-show="showvideo"
          ></iframe>

          <LazyHydrate when-visible>
            <div class="similar-products mt-3">
              <SfHeading title="Featured Products" :level="2" />
            </div>
          </LazyHydrate>
          <LazyHydrate when-visible>
            <SfCarousel
              class="carousel mt-2"
              :settings="{
                type: 'slider',
                rewind: true,
                perView: 3,
                slidePerPage: true,
                breakpoints: { 1023: { peek: 0, perView: 1 } },
              }"
            >
              <SfCarouselItem
                class="carousel__item border-0 rounded-lg drop-shadow-md product-card ml-2 w-40 md:w-48"
                v-for="(product, i) in this.products"
                :key="i"
              >
                <SfProductCard
                  :title="productGetters.getName(product)"
                  :image="productGetters.getCoverImage(product)"
                  :regular-price="
                    productGetters.getPrice(product).regular.toLocaleString() +
                    ' ETB'
                  "
                  imageHeight="10rem"
                  :alt="productGetters.getName(product)"
                  :score-rating="productGetters.getAverageRating(product)"
                  :show-add-to-cart-button="true"
                  :isInWishlist="isInWishlist({ product })"
                  :isAddedToCart="isInCart({ product })"
                  :link="
                    localePath(
                      `/p/${productGetters.getId(
                        product
                      )}/${productGetters.getSlug(product)}`
                    )
                  "
                  @click:wishlist="
                    !isInWishlist({ product })
                      ? addItemToWishlist({ product })
                      : removeItemFromWishlist({ product })
                  "
                  @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
                  class="carousel__item__product w-48"
                  style="border-radius: 15px"
                />
              </SfCarouselItem>
            </SfCarousel>
          </LazyHydrate>
        </div>
      </div>
      <!-- <top-section></top-section> -->

      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <LazyHydrate>
        <CategoryFeature />
      </LazyHydrate>

      <LazyHydrate>
        <BestSeller />
      </LazyHydrate>
      <!-- 
      <LazyHydrate>
        <FeaturedProducts />
      </LazyHydrate> -->
      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////// -->

      <LazyHydrate when-visible>
        <SfCallToAction
          title="Subscribe to Newsletters"
          button-text="Subscribe"
          description="Be aware of upcoming sales and events. Receive gifts and special offers!"
          background="#005FB7"
          class="call-to-action"
        >
          <template #button>
            <SfButton
              class="sf-call-to-action__button"
              data-testid="cta-button"
              @click="toggleNewsletterModal"
            >
              {{ $t('Subscribe') }}
            </SfButton>
          </template>
        </SfCallToAction>
      </LazyHydrate>

      <LazyHydrate when-visible>
        <Testimonial />
      </LazyHydrate>

      <LazyHydrate when-visible>
        <NewsletterModal @email-submitted="onSubscribe" />
      </LazyHydrate>
    </div>
  </client-only>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfHeading,
  SfArrow,
  SfButton,
  SfAccordion,
  SfMenuItem,
  SfList,
  SfDivider,
  SfCard,
} from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';
import Testimonial from '~/components/Testimonial.vue';
import NewsletterModal from '~/components/NewsletterModal.vue';
import PopupNotification from '~/components/PopupNotification.vue';
import { useUiState } from '../composables';
import cacheControl from './../helpers/cacheControl';
import {
  productGetters,
  useCategory,
  facetGetters,
  useCart,
  useWishlist,
  useFacet,
  useCms,
  useQuote,
} from '@vue-storefront/vendure';
import CategoriesAccordion from '~/components/CategoriesAccordion';
import { onSSR } from '@vue-storefront/core';
import { computed, onMounted, inject } from '@vue/composition-api';
import { getCalculatedPrice } from '~/helpers';
import getCms from '@vue-storefront/vendure-api/src/api/cms';
import CategoryFeature from '../components/CategoryFeature.vue';
import BestSeller from '../components/BestSeller.vue';
import FeaturedProducts from '../components/FeaturedProducts.vue';
import axios from 'axios';
import { subscribe } from 'graphql';

export default {
  name: 'Home',
  async created() {
    this.getTree();
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }),
  components: {
    CategoriesAccordion,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfHeading,
    SfArrow,
    SfButton,
    NewsletterModal,
    LazyHydrate,
    Testimonial,
    PopupNotification,
    SfAccordion,
    SfMenuItem,
    SfList,
    SfDivider,
    SfCard,
    CategoryFeature,
    BestSeller,
    FeaturedProducts,
  },

  setup() {
    const showToast = inject('showToast');
    const { toggleNewsletterModal } = useUiState();
    const { categories } = useCategory();
    const { getCms } = useCms();
    const { addItem: addItemToCart, isInCart, cart } = useCart();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const { result } = useFacet();
    const products = computed(() => result.value.data?.items);
    //console.log(useTest())

    const { writeQuote, load, myQuotes } = useQuote();

    //console.log({comps})
    // console.log(getCms.value[0] )

    const heroSection = computed(() =>
      JSON.parse(getCms.value[0]?.content ?? '{}')
    );
    const adSection = computed(() =>
      JSON.parse(getCms.value[3]?.content ?? '{}')
    );
    const heroImage = computed(() => getCms.value[0]?.featuredAsset.preview);
    const adImage = computed(() => getCms.value[3]?.featuredAsset.preview);
    const headerNavigation = [];
    // console.log('products',products)
    //       console.log("the adsection value is ", adSection);

    const getTree = () => {
      categories.value.items.forEach((a) => {
        if (a.children.length > 0) {
          headerNavigation.push(facetGetters.getTree(a));
        }
      });
    };
    const onSubscribe = ({ emailAddress, event }) => {
      const body = {
        query: `mutation MyMutation($email: String = "asdfg@gmail.com") {
                  addSubscriptionEmail(input: {email: $email}) {
                    id
                  }
                }`,
        variables: {
          email: emailAddress,
        },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      console.log('you sussessfullay suscribed');
      let baseUrl = process.env.GRAPHQL_API
      axios
        .post(baseUrl, body, options)
        .then((res) => {
          if (res.status === 200) showToast('Subscribed!');
        })
        .catch((err) => {
          showToast("Couldn't Subscribed!");
        });
      toggleNewsletterModal();
    };
    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };
    const tabs = [
      {
        title: 'Description',
        content: 'desc is not good',
      },
    ];
    return {
      productGetters,
      tabs,
      toggleWishlist,
      toggleNewsletterModal,
      onSubscribe,
      products,
      headerNavigation,
      getCalculatedPrice,
      getTree,
      addItemToWishlist,
      removeItemFromWishlist,
      isInWishlist,
      addItemToCart,
      isInCart,
      cart,
      heroSection,
      heroImage,
      adSection,
      adImage,
    };
  },
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    // max-width: 12400px;
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  .sf-link {
    font-size: xx-large;
  }
}

.banner {
  --banner-width: 100%;
  --banner-height: 100px;
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.advert {
  --banner-width: 100%;
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  margin-top: 0px;
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  color: var(--c-text);
  background: var(--c-secondary);
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  &__item {
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
      background-color: var(--c-cards);
      --product-card-title-font-size: 0.85rem;
    }
  }
}

.sf-carousel-item {
  width: auto !important;
}
.category-container,
.product-card {
  background-color: var(--c-accent);
}

.ytplayer {
  pointer-events: none;
}
</style>
