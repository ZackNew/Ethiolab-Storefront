<template>
  <client-only>
    <div id="home">
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
        <div class="grid grid-cols-1 md:grid-cols-11 gap-4 wrapsm mt-7">
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
          <div class="md:col-span-8" v-if="heroSection.link">
            <iframe
              class="w-[90%] md:h-[25rem] ytplayer mx-auto"
              id="ytplayer"
              type="text/html"
              :src="`https://www.youtube-nocookie.com/embed/${heroSection.link}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroSection.link}&rel=0`"
              frameborder="0"
              allowfullscreen
              ng-show="showvideo"
            ></iframe>
          </div>
          <div class="md:col-span-3">
            <div
              class="flex-row justify-between md:grid md:grid-rows-3 md:grid-flow-col gap-1"
            >
              <div v-for="sale in bigSale" :key="sale.sku">
                <div>
                  <nuxt-link
                    :to="`/v/${sale.productSlug}`"
                    class="font-bold text-white"
                  >
                    <img
                      :src="imageUrl + sale.banner"
                      alt="image"
                      class="min-w-[100%] max-h-[8rem] min-h-[8rem]"
                    />
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="md:col-span-1"></div> -->
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
            <VueSlickCarousel
              class="carousel-wrapper"
              v-bind="settings"
              :slidesToShow="4"
            >
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
                    String(
                      product.priceWithTax.min || product.priceWithTax.value
                    ).slice(0, -2) +
                    '.' +
                    String(
                      product.priceWithTax.min || product.priceWithTax.value
                    ).slice(-2) +
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
                  @click:add-to-cart="itemsToCart(product, 1)"
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

      <!-- <LazyHydrate when-visible>
        <Testimonial :testimonials="testimonials" />
      </LazyHydrate> -->
      <h1 class="md:text-4xl text-secondary text-center">Testimonials</h1>
      <VueSlickCarousel
        v-if="testimonials.length > 0"
        class="carousel-wrapper wraplg"
        v-bind="settings"
        :slidesToShow="3"
      >
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
        <div v-for="testimony in testimonials" :key="testimony.id" cl>
          <div class="testimonial_card mr-2 noScrollbar">
            <div class="flex flex-col">
              <div
                class="mx-auto w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full"
              >
                <img
                  :src="
                    `${path}${testimony.src}` ||
                    ` https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg`
                  "
                  alt="img"
                  class="object-cover object-center w-full h-full"
                />
              </div>
              <h5 class="font-bold quote text-center">
                {{ testimony.name }}
              </h5>
              <p class="text-sm testimonies text-center">
                {{ testimony.title }}
              </p>
              <div class="h-3 text-3xl text-left quote">“</div>
              <p
                class="px-4 text-center testimonies"
                v-html="testimony.content"
              ></p>
              <div class="h-3 text-3xl text-right quote">”</div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>

      <LazyHydrate when-visible>
        <NewsletterModal @email-submitted="onSubscribe" />
      </LazyHydrate>
      <div class="hidden lg:block">
        <SfButton
          class="sf-button--pure sf-header__action chatIcon"
          v-if="isMessageSideBarOpen"
          @click="toggleMessageSidebar()"
        >
          <div v-if="isAuthenticated && isMessageSideBarOpen">
            <img src="~/assets/close-circle-svgrepo-com.svg" alt="image" />
          </div>
        </SfButton>
        <SfButton
          class="sf-button--pure sf-header__action chatIcon"
          v-if="isAuthenticated && !isMessageSideBarOpen"
          @click="toggleMessageSidebar()"
        >
          <div>
            <img src="~/assets/chat1-svgrepo-com.svg" alt="image" />
          </div>
        </SfButton>
      </div>
      <MessageSideBar
        class="lg:w-[25%] lg:right-[2%] lg:bottom-[6%] lg:min-h-[70%] lg:fixed z-[500]"
        :messages="messages"
        @sendMessageToAdmin="sendMessageToAdmin"
      />
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
import MessageSideBar from '~/components/MessageSideBar.vue';
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
  useUser,
  userGetters,
  useInstantMessage,
} from '@vue-storefront/vendure';
import CategoriesAccordion from '~/components/CategoriesAccordion';
import Banner from '~/components/Banner';
import { onSSR } from '@vue-storefront/core';
import { computed, onMounted, inject, ref } from '@vue/composition-api';
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
        touchThreshold: 5,
        centerMode: true,
        centerPadding: '30px',
        responsive: [
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
    MessageSideBar,
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
        const testim = res.data.data.getTestimonials.map((testimony) => {
          return {
            id: testimony.id,
            name: testimony.name,
            src: testimony.pic_location,
            content: testimony.msg,
            title: testimony.person_position,
          };
        });
        this.testimonials = testim.slice(0, 3);
        console.log('Maji testimonials', this.testimonials);
      });
    },
  },

  setup() {
    const { user, load: loadUser, isAuthenticated } = useUser();
    const baseUrl = process.env.GRAPHQL_API;
    const path = baseUrl.split('/shop-api')[0] + '/assets/';
    const showToast = inject('showToast');
    const {
      toggleNewsletterModal,
      isMessageSideBarOpen,
      toggleMessageSidebar,
    } = useUiState();
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
    loadUser();

    const messages = ref([]);
    const refreshMessages = async () => {
      await loadUser();
      const data = await getUserInstantMessage({
        userEmail: userGetters.getEmailAddress(user.value),
      });
      messages.value = data.data.getUserInstantMessage;
    };
    // setInterval(() => {
    //   console.log('you are genius');
    //   refreshMessages();
    // }, 1000);

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
    const bigSale = BIG_SALE?.value?.map((pro) => {
      return JSON.parse(pro ?? '{}');
    });
    const imageUrl = String(process.env.GRAPHQL_API).split('/shop-api')[0];
    const { sendMessage, getUserInstantMessage } = useInstantMessage();

    const sendMessageToAdmin = async (messageToSend) => {
      console.log('emit accepted', messageToSend);
      await loadUser();
      const userEmail = userGetters.getEmailAddress(user.value);
      const userFirstName = userGetters.getFirstName(user.value);
      const userLastName = userGetters.getLastName(user.value);
      await sendMessage({
        msg: messageToSend,
        lastName: userLastName,
        firstName: userFirstName,
        userEmail: userEmail,
      });
    };

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

    const itemsToCart = (product, quantity) => {
      addItemToCart({
        product: {
          _variantId: product?.productVariantId,
        },
        quantity: quantity,
      }).then((res) => {
        console.log('best seller updated cart value is ', cart.value);
        if (cart?.value?.errorCode && cart.value.errorCode != '') {
          showToast(cart.value.message);
        } else {
          showToast('Product added to cart!');
        }
      });
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
      itemsToCart,
      path,
      isMessageSideBarOpen,
      toggleMessageSidebar,
      isAuthenticated,
      sendMessageToAdmin,
      messages,
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
.wraplg {
  @include for-desktop {
    max-width: 93% !important;
    margin: auto;
  }
}

// .container {
//   position: relative;
// }

.text-overlayer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.quote {
  color: var(--c-secondary);
}

.testimonies {
  color: var(--c-primary);
  font-family: var(--font-family--lora);
  --font-family--primary: 'Josefin Sans', sans-serif;
}

// .testimonies p {
//   font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
//     'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
// }

.testimonial_card {
  background-color: var(--c-accent);
  padding: 5%;
  box-shadow: 1px 1px 3px #bbbbbb;
  min-height: 15rem;
  max-height: 18rem;
  overflow: auto;
}

.noScrollbar::-webkit-scrollbar {
  display: none;
}

.chatIcon {
  position: fixed;
  z-index: 600;
  bottom: 30px;
  right: 20px;
  width: 3%;
  height: 3%;
}
</style>
