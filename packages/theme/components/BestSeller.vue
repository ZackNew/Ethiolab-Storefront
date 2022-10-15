<template>
  <div class="">
    <!-- <h3 class="font-bold mt-12 pb-2 border-b border-gray-200">Best Seller</h3> -->
    <div class="p-3 md:p-14">
      <div v-if="bestSellings.length !== 0" class="w-full text-center">
        <h1 class="">Best Seller</h1>
      </div>
    </div>
    <!-- <div
      class="grid grid-cols-1 gap-10 mt-10 mb-10 md:grid-cols-3"
      data-aos="fade-left"
    >
      <div v-for="category in bestSellings" :key="category.title">
        <BestSellerSingle
          :title="category.name"
          :image="category.preview"
          :slug="category.slug"
          :price="category.priceWithTax"
        />
      </div>
    </div> -->
    <Carousel
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
        class="carousel__item border-0 rounded-lg drop-shadow-md product-card ml-2 w-40 md:w-72"
        v-for="product in bestSellings"
        :key="product._id"
      >
        <ProductCard
          :title="product.name"
          :image="product.image"
          :regular-price="product.price.current + ' ETB'"
          imageHeight="20.25rem"
          imageWidth="100%"
          :alt="product.name"
          :max-rating="5"
          :score-rating="3"
          :show-add-to-cart-button="true"
          :isInWishlist="isInWishlist({ product })"
          :isAddedToCart="isInCart({ product })"
          :link="localePath(`/v/${product.slug}`)"
          @click:wishlist="
            !isInWishlist({ product })
              ? addItemToWishlist({ product })
              : removeItemFromWishlist({ product })
          "
          @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
          class="carousel__item__product"
          style="border-radius: 15px"
        />
      </SfCarouselItem>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent, mounted } from '@vue/composition-api';
import Carousel from './carousel.vue';
import BestSellerSingle from './BestSellerSingle.vue';
import ProductCard from './ProductCard.vue';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import { useWishlist, useCart } from '@vue-storefront/vendure';
export default defineComponent({
  data() {
    return {
      cats: null,
      bestSellings: [],
    };
  },
  components: { BestSellerSingle, Carousel, ProductCard },
  mounted() {
    AOS.init({
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 3000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  },
  setup() {
    const { addItem: addItemToCart, isInCart, cart } = useCart();
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };
    const categories = [
      { title: 'Balance and Scales', image: '/categories/empty_image.png' },
      { title: 'Calibration', image: '/categories/empty_image.png' },
      { title: 'Electrical Products', image: '/categories/empty_image.png' },
      // {title:"Filtration Products" , image:"/categories/cat4.jpg"},
      // {title:"Flowmeters" , image:"/categories/cat5.jpg"}
    ];

    return {
      categories,
      isInWishlist,
      isInCart,
      toggleWishlist,
      addItemToCart,
      addItemToWishlist,
      removeItemFromWishlist,
    };
  },
  methods: {
    async getBestSellers() {
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `
        query{
          bestSellingProducts{
            slug
          }
        }
        `,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const bestSeller = await axios.post(baseUrl, body, options);
      const slugs = bestSeller.data.data.bestSellingProducts.map((bs) => {
        let x = [];
        x.push(bs?.slug);
        return x;
      });
      const STRSlug = [];
      const a = slugs.forEach((s) => {
        STRSlug.push(s[0]);
      });
      console.log('ddddddddjjjjjjjjjjjj', slugs);
      const pbody = {
        query: `
        query BSProducts($in: [String!]!) {
          products(options: {filter: {slug: {in: $in}}}) {
            items {
              id
              name
              slug
              description
              featuredAsset {
                preview
              }
              variants {
                id
                price
              }
              collections {
                id
              }
              customFields {
                reviewRating
              }
            }
          }
        }`,
        variables: {
          in: STRSlug,
        },
      };
      await axios.post(baseUrl, pbody, options).then((res) => {
        const ppp = res.data.data.products?.items.map((product) => {
          let cref = [];
          product?.collections?.forEach((x) => {
            cref.push(String(x.id));
          });
          const image = [String(product?.featuredAsset?.preview)];
          const price =
            String(product?.variants[0]?.price).slice(0, -2) +
            '.' +
            String(product?.variants[0]?.price).slice(-2);
          const prod = {
            _id: product?.id,
            _variantId: product?.variants[0]?.id,
            _description: product.description,
            _categoriesRef: cref,
            name: product.name,
            images: image,
            price: {
              original: price,
              current: price,
            },
            slug: product.slug,
            rating: product?.customFields?.reviewRating,
          };
          return prod;
        });
        this.bestSellings = ppp;
        console.log('minini', this.bestSellings);
      });
    },
  },
  created() {
    this.getBestSellers();
  },
});
</script>

<style scoped></style>
