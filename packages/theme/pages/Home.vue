<template>
  <client-only>
    <div id="home">
      <!-- <PopupNotification /> -->
      <div>
        <!--        categories-->
        <!-- <div
          class="md:col-span-3 px-4 pt-4 mt-16 md:block hidden rounded-xl drop-shadow-2xl shadow-lg category-container max-h-screen overflow-auto"
        >
          <LazyHydrate when-visible>
            <CategoriesAccordion />
          </LazyHydrate>
          <SfDivider />
          <LazyHydrate>
            <Banner
              :description="adSection.description || 'AD Description'"
              :buttonText="adSection.buttonText || 'AD Button'"
              background=""
              :image="adImage || '/homepage/bannerA.webp'"
            >
            </Banner>
          </LazyHydrate>
        </div> -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 wrapsm mt-7">
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

          <!-- <LazyHydrate when-visible>
            <template>
              <Banner
                class="banner"
                :title="heroSection.title || 'Big Sale'"
                :subtitle="heroSection.overview || 'Medical Equipments'"
                :description="
                  heroSection.description ||
                  'Find new, used, and surplus lab equipment plus medical, test equipment, process, pharmaceutical.'
                "
                :buttonText="heroSection.buttonText || 'Shop Now'"
                :image="heroImage || '/homepage/bannerB.webp'"
                link="https://www.ethiolab.et"
              />
            </template>
          </LazyHydrate> -->
          <div class="md:col-span-9" v-if="heroSection.link">
            <iframe
              class="w-[86.5%] md:h-[25rem] ytplayer"
              id="ytplayer"
              type="text/html"
              :src="`https://www.youtube-nocookie.com/embed/${heroSection.link}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroSection.link}&rel=0`"
              frameborder="0"
              allowfullscreen
              ng-show="showvideo"
            ></iframe>
          </div>
          <div class="md:col-span-3 my-auto">
            <div
              class="mt-5 flex md:grid md:grid-rows-3 md:grid-flow-col gap-4"
            >
              <div v-for="sale in bigSale" :key="sale.sku">
                <div class="container mb-2">
                  <h3 class="font-bold text-overlayer z-[2] text-xs md:text-xl">
                    <nuxt-link
                      :to="`/v/${sale.productSlug}`"
                      class="font-bold text-white"
                      >{{ sale.buttonText }}</nuxt-link
                    >
                  </h3>
                  <img
                    :src="imageUrl + sale.banner"
                    alt="Image"
                    class="w-full max-h-[7rem] mb-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="this.products.length !== 0" class="md:mt-14 mt-3 wrapsm">
        <LazyHydrate when-visible>
          <div class="similar-products my-5 text-center">
            <!-- <SfHeading title="Recently Viewed Products" :level="2" /> -->
            <h1 class="md:text-4xl text-secondary">Recently Viewed Products</h1>
          </div>
        </LazyHydrate>
        <LazyHydrate when-visible>
          <div v-if="this.products.length !== 0">
            <VueSlickCarousel class="carousel-wrapper" v-bind="settings">
              <template #prevArrow>
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
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </div>
              </template>
              /*...*/
              <template #nextArrow>
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
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </template>
              <div v-for="product in this.products" :key="product._id">
                <RVPCard
                  :title="productGetters.getName(product)"
                  :image="
                    productGetters.getCoverImage(product) === ''
                      ? 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740'
                      : productGetters.getCoverImage(product)
                  "
                  :regular-price="
                    productGetters.getPrice(product).regular.toLocaleString() +
                    ' ETB'
                  "
                  :imageHeight="290"
                  :imageWidth="500"
                  :alt="productGetters.getName(product)"
                  :score-rating="productGetters.getAverageRating(product)"
                  :show-add-to-cart-button="true"
                  :isInWishlist="isInWishlist({ product })"
                  :isAddedToCart="isInCart({ product })"
                  :link="localePath(`/v/${productGetters.getSlug(product)}`)"
                  @click:wishlist="
                    !isInWishlist({ product })
                      ? addItemToWishlist({ product })
                      : removeItemFromWishlist({ product })
                  "
                  @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
                  class="carousel__item__product mr-2"
                />
              </div>
            </VueSlickCarousel>
          </div>
          <!-- <Carousel
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
              <RVPCard
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
                :link="localePath(`/v/${productGetters.getSlug(product)}`)"
                @click:wishlist="
                  !isInWishlist({ product })
                    ? addItemToWishlist({ product })
                    : removeItemFromWishlist({ product })
                "
                @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
                class="carousel__item__product w-72"
                style="border-radius: 15px"
              />
            </SfCarouselItem>
          </Carousel> -->
        </LazyHydrate>
      </div>
      <!-- <top-section></top-section> -->

      <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <LazyHydrate>
        <CategoryFeature />
      </LazyHydrate>

      <LazyHydrate>
        <BestSeller :bestSellers="bestSellings" />
      </LazyHydrate>

      <!-- <NewCarousel /> -->
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
        <Testimonial :testimonials="testimonials" />
      </LazyHydrate>

      <LazyHydrate when-visible>
        <NewsletterModal @email-submitted="onSubscribe" />
      </LazyHydrate>
    </div>
  </client-only>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
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
import Carousel from '~/components/carousel.vue';
import PopupNotification from '~/components/PopupNotification.vue';
import RVPCard from '~/components/RVPCard.vue';
import { useUiState } from '../composables';
import cacheControl from './../helpers/cacheControl';
import NewCarousel from '~/components/NewCarousel.vue';
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
import Banner from '~/components/Banner';
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
  created() {
    this.getBestSellers();
    this.getTestimonials();
  },
  data() {
    return {
      testimonials: [],
      bestSellings: [],
      settings: {
        dots: false,
        focusOnSelect: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        touchThreshold: 5,
        centerMode: true,
        centerPadding: '30px',
        responsive: [
          {
            breakpoint: 2098,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1624,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 430,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
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
    Banner,
    Carousel,
    RVPCard,
    NewCarousel,
    VueSlickCarousel,
  },
  methods: {
    async getBestSellers() {
      const baseUrl = process.env.GRAPHQL_API;

      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const pbody = {
        query: `
        query{
          bestSellingProducts{
            id
            variantId
            description
            collections
            name
            image
            priceWithTax
            slug
            sku
            rating
          }
        }`,
      };
      await axios.post(baseUrl, pbody, options).then((res) => {
        const produ = res.data.data?.bestSellingProducts.map((product) => {
          let cref = [];
          product?.collections?.forEach((x) => {
            cref.push(String(x.id));
          });
          const url = process.env.GRAPHQL_API;

          const image = url.split('shop')[0] + `assets/${product?.image}`;
          const price =
            String(product?.priceWithTax).slice(0, -2) +
            '.' +
            String(product?.priceWithTax).slice(-2);
          const prod = {
            _id: product?.id,
            _variantId: product?.variantId,
            _description: product?.description,
            _categoriesRef: product?.collections,
            name: product?.name,
            images: image,
            price: {
              original: price,
              current: price,
            },
            slug: product?.slug,
            rating: product?.rating,
          };
          return prod;
        });
        this.bestSellings = produ;
        console.log('sdadfasdfasdf', this.bestSellings);
      });
    },
    async getTestimonials() {
      const baseUrl = process.env.GRAPHQL_API;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const body = {
        query: `query{
          getTestimonials{
            id
            name
            pic_location
            msg
            person_position
          }
        }`,
      };
      await axios.post(baseUrl, body, options).then((res) => {
        const test = res.data.data.getTestimonials.map((testimony) => {
          return {
            id: testimony.id,
            name: testimony.name,
            src: testimony.pic_location,
            content: testimony.msg,
            title: testimony.person_position,
          };
        });
        this.testimonials = test;
        console.log('testimonials', this.testimonials);
      });
    },
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

    const { writeQuote, load, myQuotes } = useQuote();

    const heroSection = computed(() =>
      JSON.parse(getCms.value[0]?.content ?? '{}')
    );
    const adSection = computed(() =>
      JSON.parse(getCms.value[3]?.content ?? '{}')
    );
    const heroImage = computed(() => getCms.value[0]?.featuredAsset.preview);
    const adImage = computed(() => getCms.value[3]?.featuredAsset.preview);
    const headerNavigation = [];
    const getTree = () => {
      categories.value.items.forEach((a) => {
        if (a.children.length > 0) {
          headerNavigation.push(facetGetters.getTree(a));
        }
      });
    };
    const BIG_SALE = computed(() =>
      JSON.parse(getCms.value[5]?.content ?? '{}')
    );
    const bigSale = BIG_SALE.value.map((pro) => {
      return JSON.parse(pro ?? '{}');
    });
    const imageUrl = String(process.env.GRAPHQL_API).split('/shop-api')[0];

    console.log('Magi cms', getCms.value);
    console.log('Magi big Sale', bigSale);
    const onSubscribe = ({ emailAddress, event }) => {
      let baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `mutation MyMutation($email: String!) {
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

    onMounted(() => {
      localStorage.setItem('sort', 'Select Sorting');
    });
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
      bigSale,
      imageUrl,
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

.sf-banner {
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

.wrap {
  @include for-desktop {
    max-width: 1250px !important;
    margin: auto;
  }
}
.wrapsm {
  @include for-desktop {
    max-width: 1100px !important;
    margin: auto;
  }
}

.container {
  position: relative;
}

.text-overlayer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
