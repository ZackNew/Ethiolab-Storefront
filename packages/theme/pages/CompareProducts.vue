<template>
  <div id="comparision">
    <div class="p-[2%] bg-white border border-secondary">
      <h3 class="font-bold text-secondary">Horizontal Matrix</h3>
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
              <th
                scope="row"
                class="px-4 bg-light_gray border-b-4 border-b-white"
              >
                <h2 class="text-lg font-bold mt-3 text-left">Images</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <img
                    :src="
                      product.variantList.featuredAsset
                        ? product.variantList.featuredAsset.preview
                        : '' || product.featuredAsset
                        ? product.featuredAsset.preview
                        : ''
                    "
                    alt=""
                    class="w-28 h-28"
                  />
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th
                scope="row"
                class="bg-light_gray border-b-4 border-b-white px-4"
              >
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
              <th
                scope="row"
                class="px-4 bg-light_gray border-b-4 border-b-white"
              >
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
              <th
                scope="row"
                class="bg-light_gray border-b-4 border-b-white px-4"
              >
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
              <th
                scope="row"
                class="bg-light_gray border-b-4 border-b-white px-4"
              >
                <h2 class="text-lg font-bold mt-3 text-left">Description</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <!-- <p
                    v-html="product.variantList.customFields.description || ''"
                    class="text-justify"
                  ></p> -->
                  <truncate
                    action-class="text-secondary"
                    clamp="Show more"
                    :length="120"
                    less="Show Less"
                    type="html"
                    :text="product.variantList.customFields.description || ''"
                    class="text-justify"
                  ></truncate>
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th
                scope="row"
                class="bg-light_gray border-b-4 border-b-white px-4"
              >
                <h2 class="text-lg font-bold mt-3 text-left">Rating</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <SfRating
                    class="ssf-product-card__rating"
                    :max="5"
                    :score="
                      product.reviews.items[0]
                        ? product.reviews.items[0].rating
                        : 0
                    "
                    size="4xl"
                  />
                </td>
              </template>
            </tr>
            <tr class="align-top">
              <th
                scope="row"
                class="bg-light_gray border-b-4 border-b-white px-4"
              >
                <h2 class="text-lg font-bold mt-3 text-left">Availability</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">{{ product.variantList.stockLevel }}</td>
              </template>
            </tr>
            <tr class="align-top">
              <th
                scope="row"
                class="bg-light_gray border-b-4 border-b-white px-4"
              >
                <h2 class="text-lg font-bold mt-3 text-left">Accessories</h2>
              </th>

              <template v-for="product in productsToCompare">
                <!-- {{product.variantList.stockLevel}} -->
                <td class="py-4 px-4">Accessory</td>
              </template>
            </tr>
            <tr class="align-top">
              <th
                scope="row"
                class="bg-light_gray border-b-4 border-b-white px-4"
              >
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
            <!-- <tr class="align-top">
              <th
                scope="row"
                class="bg-light_gray border-b-4 border-b-white px-4"
              >
                <h2 class="text-lg font-bold mt-3 text-left ">Specificaton</h2>
              </th>
              <template v-for="product in productsToCompare">
                <td class="py-4 px-4">
                  <p
                    v-html="product.variantList.customFields.table"
                    :class="classes.red"
                  ></p>
                </td>
              </template>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import truncate from 'vue-truncate-collapsed';
import { SfRating } from '@storefront-ui/vue';

export default {
  name: 'compareProduct',
  data() {
    return {
      productsToCompare: [],
    };
  },
  created() {
    this.getItemsToCompare();
  },
  components: {
    SfRating,
    truncate,
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
      console.log('Magi vid', variantIds);
      console.log('Magi pid', productIds);
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `
        query getProductById($in: [String!], $eq: [String!]) {
          products(options: { filter: { id: { in: $in } } }) {
            items {
              name
              featuredAsset{
                preview
              }
              reviews{
                items{
                  rating
                }
              }
              customFields{
                documentation
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
                  
                }
              }
            }
          }
        }
        `,
        variables: { in: productIds, eq: variantIds },
        // variables: {
        //   in: ['11', '17'],
        //   eq: ['11', '27', '25', '26', '28'],
        // },
      };
      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await axios.post(baseUrl, body, options).then((res) => {
        console.log('magi results', res.data.data?.products?.items);
        const result = res.data.data?.products?.items;
        const prod = [];
        result?.forEach((element) => {
          if (element?.variantList?.items?.length <= 1) {
            prod.push({
              name: element?.name,
              featuredAsset: element?.featuredAsset,
              customFields: element?.customFields,
              reviews: element?.reviews,
              variantList: element?.variantList?.items[0],
            });
          } else if (element?.variantList?.items?.length >= 1) {
            element?.variantList?.items.forEach((e) => {
              prod.push({
                name: element?.name,
                featuredAsset: element?.featuredAsset,
                customFields: element?.customFields,
                reviews: element?.reviews,
                variantList: e,
              });
            });
          }
        });
        this.productsToCompare = prod;
        console.log('magi2 results', this.productsToCompare);
      });
    },
  },
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
#comparision {
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
  max-width: 100%;
}
.red ul {
  list-style-type: square;
}
.red table {
  table-layout: fixed;
  border-radius: 5px;
  font-size: 0.9em;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.red table thead tr {
  color: #ffffff;
  text-align: left;
}
.red table th,
.red table td {
  padding: 12px 12px;
  max-width: 5px;
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
