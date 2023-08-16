<template>
  <div id="Comparison">
    <div v-if="loading" class="mt-28">
      <Loading />
    </div>
    <div v-else class="p-[2%] border border-secondary" :style="!isDarkMode ? 'background-color: white' : 'background-color: #182533'
      ">
      <h3 class="font-bold text-secondary">Product Comparison</h3>
      <hr />

      <!-- <div class="overflow-x-auto relative" v-if="productsToCompare.length > 0">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <tbody>
            
          </tbody>
        </table>
      </div> -->
      <div v-if="productsToCompare.length > 0">
        <table class="w-full table-fixed mt-5">
          <tbody>
            <tr class="align-top">
              <th scope="row" class="px-4 bg-light_gray border-b-4 border-b-white">
                <h2 class="text-lg font-bold mt-3 text-left">Images</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <img :src="product.variantList.featuredAsset
                    ? product.variantList.featuredAsset.preview
                    : undefined || product.featuredAsset
                      ? product.featuredAsset.preview
                      : ''
                    " alt="" class="object-cover w-36 h-36" />
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="bg-light_gray border-b-4 border-b-white px-4">
                <h2 class="text-lg font-bold mt-3 text-left">Name</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <h5 class="text-lg text-secondary">
                    {{ product.name }}
                  </h5>
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="px-4 bg-light_gray border-b-4 border-b-white">
                <h2 class="text-lg font-bold mt-3 text-left">SKU</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <h5 class="text-lg text-secondary">
                    {{ product.variantList.sku }}
                  </h5>
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="bg-light_gray border-b-4 border-b-white px-4">
                <h2 class="text-lg font-bold mt-3 text-left">Price</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <h5 class="text-lg text-secondary">
                    {{
                      String(product.variantList.priceWithTax).slice(0, -2) +
                      '.' +
                      String(product.variantList.priceWithTax).slice(-2)
                    }}
                  </h5>
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="bg-light_gray border-b-4 border-b-white px-4">
                <h2 class="text-lg font-bold mt-3 text-left">Description</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <!-- <p
                    v-html="product.variantList.customFields.description || ''"
                    class="text-justify"
                  ></p> -->
                  <truncate action-class="text-secondary" clamp="Show more" :length="120" less="Show Less" type="html"
                    :text="product.variantList.customFields.description || ''" class="text-justify"></truncate>
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="bg-light_gray border-b-4 border-b-white px-4">
                <h2 class="text-lg font-bold mt-3 text-left">Rating</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <SfRating class="ssf-product-card__rating" :max="5" :score="product.reviews.items[0]
                    ? product.reviews.items[0].rating
                    : 0
                    " size="4xl" />
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="bg-light_gray border-b-4 border-b-white px-4">
                <h2 class="text-lg font-bold mt-3 text-left">Availability</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td v-if="product.customFields.is_order_based" class="p-4 text-secondary"><span>ORDER_BASED</span></td>
                <td v-else class="p-4 text-secondary">{{ product.variantList.stockLevel }}</td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="bg-light_gray border-b-4 border-b-white px-4">
                <h2 class="text-lg font-bold mt-3 text-left">Accessories</h2>
              </th>

              <template v-for="product in productsToCompare">
                <!-- -->
                <td class="py-4 px-4">
                  <template v-for="a in product.variantList.accessories">
                    <p class="text-secondary font-bold">{{ a.name }}</p>
                  </template>
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="bg-light_gray border-b-4 border-b-white px-4">
                <h2 class="text-lg font-bold mt-3 text-left">Weight</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  {{
                    product.variantList.customFields.weight || 'Not Available'
                  }}
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th scope="row" class="bg-light_gray border-b-4 border-b-white px-4">
                <h2 class="text-lg font-bold mt-3 text-left">Specificaton</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <p v-html="product.variantList.customFields.table" :class="classes.red"></p>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '~/components/Loading.vue';
import axios from 'axios';
import truncate from 'vue-truncate-collapsed';
import { SfRating } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import CryptoJS from 'crypto-js';

export default {
  middleware: ['csrf'],
  name: 'compareProduct',
  data() {
    return {
      loading: false,
      productsToCompare: []
    };
  },
  created() {
    this.loading = true;
    this.getItemsToCompare();
    this.$root.$on('emitCompare', () => {
      this.loading = true;
      this.getItemsToCompare();
    });
  },
  components: {
    SfRating,
    truncate,
    Loading
  },
  setup() {
    const { isDarkMode } = useUiState();
    return {
      isDarkMode
    };
  },
  methods: {
    async getItemsToCompare() {
      const products = this.$store.state.compareList?.productsToCompare;
      const productIds = products.map((p) => {
        return p.productID;
      });
      const variantIds = products.map((p) => {
        return p.variantID;
      });
      const body = {
        query: `
        query getProductById($in: [String!], $eq: [String!]) {
          products(options: { filter: { id: { in: $in } } }) {
            items {
              name
              featuredAsset{
                preview
              }
            customFields{
                is_order_based
              }
              reviews{
                items{
                  rating
                }
              }
              variantList(options: { filter: { id: { in: $eq } } }) {
                items {
                  sku
                  featuredAsset{
                    preview
                  }
                  name
                  priceWithTax
                  customFields{
                    description
                    weight
                    table
                  }
                  stockLevel
                  options{
                    group{
                      name
                    }
                    name
                  }
                  accessories{
                    name
                  }
                }
              }
            }
          }
        }
        `,
        variables: { in: productIds, eq: variantIds },
        csrfToken: this.$store.state.csrfToken.csrfToken
        // variables: {
        //   in: ['11', '17'],
        //   eq: ['11', '27', '25', '26', '28'],
        // },
      };
      const token = CryptoJS.AES.encrypt(
        this.$root.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token
        }
      };
      await axios.post('/api/shop', body, options).then((res) => {
        const result = res.data.data.data?.products?.items;
        const prod = [];
        result?.forEach((element) => {
          if (element?.variantList?.items?.length <= 1) {
            prod.push({
              name: element?.name,
              featuredAsset: element?.featuredAsset,
              customFields: element?.customFields,
              reviews: element?.reviews,
              variantList: element?.variantList?.items[0]
            });
          } else if (element?.variantList?.items?.length >= 1) {
            element?.variantList?.items.forEach((e) => {
              prod.push({
                name: element?.name,
                featuredAsset: element?.featuredAsset,
                customFields: element?.customFields,
                reviews: element?.reviews,
                variantList: e
              });
            });
          }
        });
        this.productsToCompare = prod;
      });
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
th {
  width: 13%;
  height: auto;
  max-width: 13%;
}

#variant {
  box-sizing: border-box;

  @include for-desktop {
    max-width: 1250px !important;
    padding: 0;
    margin: 0 auto;
  }
}

#Comparison {
  box-sizing: border-box;

  @include for-desktop {
    max-width: 1250px;
    margin: 3% auto;
  }
}

hr {
  color: #d8d8d8;
}
</style>

<style module="classes">
.red {
  max-width: 95%;
}

.red ul {
  list-style-type: square;
}

.red table {
  table-layout: fixed;
  border-radius: 5px;
  font-size: 0.9em;
  font-family: sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.red table thead tr {
  color: #ffffff;
  text-align: left;
}

.red table th,
.red table td {
  padding: 6px 6px;
  display: flex;
}

.red table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.red table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.red table tbody tr.active-row {
  font-weight: bold;
  color: #0e1621;
}
</style>
