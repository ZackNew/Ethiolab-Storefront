<template>
  <div>
    <!-- <SfBreadcrumbs
          class="breadcrumbs desktop-only"
          :breadcrumbs="breadcrumbs"
         />
         <p>{{breadcrumbs}}</p> -->
    <!-- <p>{{product[0].collections[0].breadcrumbs}}</p> -->
    <nav class="sf-breadcrumbs m-4" aria-label="breadcrumbs">
      <ol class="sf-breadcrumbs__list">
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          <nuxt-link class="sf-breadcrumbs__breadcrumb" to="/">
            Home
          </nuxt-link>
        </li>
        <!-- <li  class="sf-breadcrumbs__list-item" :aria-current="false">
          <nuxt-link class="sf-breadcrumbs__breadcrumb" :to="`/c/${getMainCategory || ''}`">
            {{ getMainCategory|| '' }}
          </nuxt-link>
        </li> -->
        <li class="sf-breadcrumbs__list-item" :aria-current="false">
          {{ products && products.name }}
        </li>
      </ol>
    </nav>
    <div class="flex mx-10">
      <div class="w-1/2">
        <LazyHydrate when-idle>
          <Gallery :images="productGallery" thumbWidth="500" enableZoom />
        </LazyHydrate>
      </div>

      <div class="w-1/2">
        <h2 class="text-secondary">{{ productVariants.name }}</h2>
        <!-- <p class="font-semibold text-2xl">{{products && products.name}}</p> -->
        <!-- <P class="text-secondary mt-5"></P> -->
        <div class="text-xl font-bold mt-10" v-if="totalVariants === 1">
          <span>Price </span>{{ prices }}
        </div>
        <div class="text-xl font-bold mt-5" v-else>
          Price
          <div class="inline-flex" v-for="(p, index) of prices" :key="index">
            <div class="mx-2" v-if="index === 1">-</div>
            <template>{{ p }}ETB </template>
          </div>
        </div>
        <div>
          <div
            class="flex items-center justify-center text-center h-10 bg-light_gray mt-10"
          >
            <p class="mr-5">
              {{ totalVariants }} variations of this product are available.
            </p>
            <a href="#var-table" class="text-secondary text-sm font-bold"
              >SEE ALL PRODUCT OPTIONS BELOW
            </a>
          </div>
        </div>
        <div>
          <div
            class="overflow-auto nobar hover:border border-light_gray p-1 max-h-72 mt-5"
          >
            <p
              class="text-justify"
              :class="classes.red"
              v-html="productVariants.description"
            ></p>
          </div>
          <iframe
            class="mt-4"
            width="760"
            height="315"
            :src="`https://www.youtube-nocookie.com/embed/${link}?playlist=${link}&loop=1&controls=0`"
            title="YouTube video player"
            frameborder="0"
            v-if="link"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <div class="md:hidden mt-10">
      <div
        v-for="(pro, i) in product && product"
        :key="i"
        class="flex shadow-lg card mx-3 mt-5 mb-1"
      >
        <nuxt-link :to="'/p/' + products.id + '/' + pro._id + '/' + pro.slug">
          <img
            class="max-h-[5rem] max-w-[5rem]"
            :src="
              pro.images[0] ? pro.images[0] : products.featuredAsset.preview
            "
          />
        </nuxt-link>
        <nuxt-link :to="'/p/' + products.id + '/' + pro._id + '/' + pro.slug">
          <div class="ml-2">
            <p class="text-sm">{{ pro.name }}</p>
            <p class="font-bold mt-2">
              {{
                pro.price.current
                  .toString()
                  .substring(0, pro.price.current.toString().length - 2) +
                '.' +
                pro.price.current
                  .toString()
                  .substring(pro.price.current.toString().length - 2)
              }}
              ETB
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <!-- {{ variantss }}
    <h1>iii</h1> -->
    <SfTable
      v-if="productVariants.length !== 0"
      class="invisible md:visible mt-10"
      id="var-table"
    >
      <SfTableHeading class="bg-primary">
        <!-- <SfTableHeader class="text-white font-bold text-xl"></SfTableHeader> -->
        <SfTableHeader class="text-white font-bold text-xl mr-10">
          Item
        </SfTableHeader>
        <template v-if="opt.length > 0">
          <SfTableHeader
            class="text-white font-bold text-xl"
            v-for="(o, index) in opt"
            :key="index"
          >
            {{ o }}
          </SfTableHeader>
        </template>
        <SfTableHeader class="text-white font-bold text-xl">
          Price
        </SfTableHeader>
      </SfTableHeading>
      <SfTableRow v-for="variant in variantss" :key="variant.id" class="">
        <SfTableData class="flex mr-10">
          <img
            :src="variant.image || productVariants.featuredAsset.preview"
            alt=""
            class="float-left h-28 w-28 mr-2"
          />
          <p class="text-secondary mt-3">
            <nuxt-link
              class="text-secondary"
              :to="`/p/${productVariants.id}/${variant.id}/${productVariants.slug}`"
            >
              {{ productVariants.name }}
            </nuxt-link>
          </p>
        </SfTableData>
        <SfTableData
          class="m-auto"
          v-for="(option, index) in variant.optionValue"
          :key="index"
        >
          {{ option.name }}
        </SfTableData>
        <SfTableData class="m-auto">{{ variant.price }}</SfTableData>
      </SfTableRow>
    </SfTable>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
} from '@vue/composition-api';
import {
  useCategory,
  categoryGetters,
  useProduct,
  productGetters,
} from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useUiHelpers } from '~/composables';
import { name } from 'file-loader';
import LazyHydrate from 'vue-lazy-hydration';
import axios from 'axios';
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
  SfTable,
} from '@storefront-ui/vue';
import { placeholder } from '@babel/types';
import Gallery from '~/components/Gallery.vue';
export default defineComponent({
  components: {
    SfGallery,
    LazyHydrate,
    SfBreadcrumbs,
    SfTable,
    Gallery,
  },
  created() {
    this.getProducts();
  },
  data() {
    return {
      productVariants: [],
    };
  },
  methods: {
    async getProducts() {
      const baseUrl = process.env.GRAPHQL_API;
      const slug = this.$route.params.slug_1;
      const body = {
        query: `query getProducts ($slug: String!){
          product(slug:$slug){
            id
            name
            slug
            description
            customFields{
              youtube_link
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
                priceWithTax
                id
                featuredAsset{
                  preview
                }
                options{
                  group{
                    name
                  }
                  name
                }
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
      const currentProducts = await axios.post(baseUrl, body, options);
      this.productVariants = currentProducts.data.data?.product;
      console.log('yaaay', this.productVariants);
    },
  },
  computed: {
    totalVariants() {
      return this.productVariants?.variantList?.totalItems;
    },
    prices() {
      if (this.productVariants?.variantList?.totalItems === 1) {
        const price = String(
          this.productVariants?.variantList?.items[0]?.priceWithTax
        );
        const fPrice = price.slice(0, -2) + '.' + price.slice(-2);
        return fPrice;
      }
      if (this.productVariants?.variantList?.totalItems > 1) {
        let items = this.productVariants?.variantList?.items;
        let prices = [];
        items.forEach((item) => {
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
        return [min, max];
      }
    },
    link() {
      const splittedLink =
        this.productVariants?.customFields?.youtube_link.split('?v=')[1];
      return splittedLink;
    },
    opt() {
      const options = [];
      this.productVariants?.variantList?.items[0]?.options.forEach((o) => {
        options.push(o.group.name);
      });
      return options;
    },
    variantss() {
      const variants = [];
      this.productVariants?.variantList?.items.forEach((variant) => {
        const price =
          String(variant.priceWithTax).slice(0, -2) +
          '.' +
          String(variant.priceWithTax).slice(-2);
        variants.push({
          id: variant.id,
          image: variant.featuredAsset?.preview,
          optionValue: variant.options,
          price: price,
        });
      });
      return variants;
    },
    featuredImage() {
      return this.productVariants?.featuredAsset?.preview;
    },
  },
  setup(props, context) {
    const router = context.root.$router;
    const route = context.root.$route;
    let maxPrice = '';
    let minPrice = '';
    let mainCategory = '';

    const { products, search, loading, error } = useProduct('<UNIQUE_ID>');
    //  const {featuredAsset} = products.value;
    // const productImage = computed(() => products.value?.assets[0]?.preview);

    let getMainCategory = computed(() => {
      return mainCategory;
    });
    const th = useUiHelpers();
    const lastSlug = th.getLastSlugFromParams();
    console.log('the lastslug value is ', lastSlug);

    let checked = true;

    const check = (e) => {
      let temp = checked;
      checked = !temp;
    };

    onSSR(async () => {
      await search({ slug: lastSlug });
    });

    const product = computed(() => productGetters.getByFilters(products.value));
    const breadcrumbs = computed(() => {
      let temp = productGetters.getBreadcrumbs(product.value);
      let path = [{ text: 'Home', link: '/' }];
      if (temp.length > 1) {
        temp.forEach((cat) => {
          if (cat.name === '__root_collection__') {
          } else {
            path.push({
              text: cat.name,
              link: `c/${cat.slug}`,
            });
          }
        });
      } else {
        path.push({
          text: products && products.name,
          link: `c/${products && products.slug}`,
        });
      }
      return path;
    });
    const option = computed(() => productGetters.getOptions(products.value));

    const configuration = computed(() =>
      productGetters.getCategoryIds(product.value)
    );

    const productGallery = computed(() =>
      productGetters.getAllGallery(products.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        alt: products.value.name || products.value._name,
      }))
    );

    const originalPrice = [];
    const currentPrice = [];

    product.value.forEach((element) => {
      originalPrice.push(element.price.original);
      currentPrice.push(element.price.current);
    });

    const maxP = Math.max(...currentPrice).toString();
    const minP = Math.min(...currentPrice).toString();

    maxPrice =
      maxP.substring(0, maxP.length - 2) +
      '.' +
      maxP.substring(maxP.length - 2);
    minPrice =
      minP.substring(0, minP.length - 2) +
      '.' +
      minP.substring(minP.length - 2);

    // const attributes = computed(() => productGetters.getAttributes(products.value))

    onMounted(() => {
      // if (option.value.length === 0) {
      //   const slug = route.params.slug_1;
      //   const id = products.value.id;
      //   const vid = product.value[0]?._id;
      //   router.push(`/p/${id}/${vid}/${slug}`);
      //   console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', slug, id, vid);
      // }
      console.log('the product value is ', product.value);
      console.log('the option value is ', option.value);
      // if (option.value.length === 0) {
      //   console.log('this is slug', route.params);
      // }
      // mainCategory=product[0].collections[0].breadcrumbs[1].slug
      mainCategory = product.value;
      console.log('the productsss  id value is ', products.value);
      console.log('configuration value is ', configuration.value);
      //   console.log("the productsss image value is ", products.value.assets[0].preview)
      // console.log("THE PRODUCT VARIANTS ARE ", productGetters.getGallery(product.value))
      console.log('product gallery is ', productGallery.value);
    });

    return {
      check,
      checked,
      loading,
      error,
      products,
      product,
      option,
      breadcrumbs,
      getMainCategory,
      mainCategory,
      configuration,
      minPrice,
      maxPrice,
      originalPrice,
      currentPrice,
      productGallery,
      LazyHydrate,
      // productImage
    };
  },
});
</script>

<style lang="scss" scoped>
.nobar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
// .sf-table td {
//   align-items: center;
//   justify-content: center;
// }
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
