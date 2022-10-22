<template>
  <div id="variant">
    <div v-if="product !== null">
      <nav class="sf-breadcrumbs my-4" aria-label="breadcrumbs">
        <ol class="sf-breadcrumbs__list">
          <li class="sf-breadcrumbs__list-item" :aria-current="false">
            <nuxt-link
              class="sf-breadcrumbs__breadcrumb text-secondary font-exrathin"
              to="/"
            >
              Home
            </nuxt-link>
          </li>
          <li class="sf-breadcrumbs__list-item" :aria-current="false">
            <h5 class="text-secondary font-bold">
              {{ product.name }}
            </h5>
          </li>
        </ol>
      </nav>
      <div class="grid grid-cols-12">
        <div class="col-span-6">
          <h1>ma nigga</h1>
        </div>
        <div class="col-span-6">
          <h2 class="text-secondary font-bold">{{ product.name }}</h2>
          <h3 class="text-secondary text-xl">
            <span class="font-bold mr-2">Price </span>{{ priceRange }}
          </h3>
          <div class="mt-4 bg-[#EAEAEA] rounded py-2 flex justify-around">
            <div v-if="product.variantList.totalItems === 1">
              <h4>
                <span class="text-lg">{{ product.variantList.totalItems }}</span
                >Variant of this product are available.
              </h4>
            </div>
            <div v-if="product.variantList.totalItems > 1">
              <h4 class="text-lg">
                <span>{{ product.variantList.totalItems }}</span>
                Variants of this product are available.
              </h4>
            </div>
            <a
              href="#var-table"
              class="text-secondary font-extrathin text-left text-lg"
            >
              SEE ALL PRODUCT OPTIONS BELOW
            </a>
          </div>
          <iframe
            class="mt-4"
            width="545"
            height="300"
            :src="`https://www.youtube-nocookie.com/embed/${custom.link}?autoplay=1&mute=1&controls=0&loop=1&playlist=${custom.link}&rel=0`"
            title="YouTube video player"
            frameborder="0"
            v-if="custom.link"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <p
            class="text-justify mt-2"
            :class="classes.red"
            v-html="product.description"
          ></p>
          <SfButton
            v-if="custom.document"
            class="bg-secondary my-2 pb-2 pt-3 rounded"
          >
            <a class="text-white px-1" :href="custom.document" target="_blank">
              See full description
            </a>
            <!-- Get documentation -->
          </SfButton>
          <div v-if="product.facetValues !== []" class="flex">
            <div v-for="(facet, i) in product.facetValues" :key="i">
              <p class="bg-[#a7c6ed] mr-4 px-3 py-[0.5] rounded">
                {{ facet.name }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h1>hello table</h1>
        <SfTable id="var-table">
          <SfTableHeading class="bg-none">
            <SfTableHeader class="text-secondary font-bold text-xl mr-10">
              Item
            </SfTableHeader>
            <template v-if="product.variantList.items[0].options.length > 0">
              <SfTableHeader
                class="text-secondary font-bold text-xl"
                v-for="(o, index) in product.variantList.items[0].options"
                :key="index"
              >
                {{ o.group.name }}
              </SfTableHeader>
            </template>
            <SfTableHeader class="text-secondary font-bold text-xl">
              Availability
            </SfTableHeader>
            <SfTableHeader class="text-secondary font-bold text-xl">
              Price
            </SfTableHeader>
          </SfTableHeading>
          <SfTableRow
            v-for="variant in product.variantList.items"
            :key="variant.id"
            class="mb-4"
          >
            <SfTableData class="flex">
              <div v-if="variant.featuredAsset">
                <img
                  :src="variant.featuredAsset.preview"
                  alt=""
                  class="float-left h-28 w-28 mr-2"
                />
              </div>
              <div v-else-if="product.featuredAsset">
                <img
                  :src="product.featuredAsset.preview"
                  alt=""
                  class="float-left h-28 w-28 mr-2"
                />
              </div>
              <p class="text-secondary">
                <nuxt-link
                  class="text-secondary"
                  :to="`/p/${product.id}/${variant.id}/${product.slug}`"
                >
                  {{ variant.sku }}
                </nuxt-link>
              </p>
            </SfTableData>
            <SfTableData
              v-for="(option, index) in variant.options"
              :key="index"
            >
              <p class="text-secondary">{{ option.name }}</p>
            </SfTableData>
            <SfTableData
              ><p class="text-secondary">
                {{ variant.stockLevel }}
              </p>
            </SfTableData>
            <SfTableData>
              <div>
                <div>
                  <h4 class="text-secondary">
                    <span class="font-bold">
                      {{
                        String(variant.priceWithTax).slice(0, -2) +
                        '.' +
                        String(variant.priceWithTax).slice(-2)
                      }}
                    </span>
                    ETB
                  </h4>
                </div>
                <div>
                  <input type="number" />
                  <SfIcon
                    icon="add_to_cart"
                    size="lg"
                    color="green-primary"
                    viewBox="0 0 24 24"
                    :coverage="1"
                  />
                </div>
              </div>
            </SfTableData>
          </SfTableRow>
        </SfTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { SfButton, SfTable, SfIcon } from '@storefront-ui/vue';
export default {
  components: {
    SfButton,
    SfTable,
    SfIcon,
  },
  data() {
    return {
      product: null,
    };
  },
  methods: {
    async getProductVariant() {
      const baseUrl = process.env.GRAPHQL_API;
      const slug = this.$route.params.slug_1;
      const body = {
        query: `query getProductVariant($slug: String!){
          product(slug: $slug){
            id
            name
            description
            facetValues{
              name
            }
            customFields{
              youtube_link
              documentation
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
                id
                sku
                priceWithTax
                featuredAsset{
                  preview
                }
                options{
                  group{
                    name
                  }
                  name
                }
                stockLevel
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
      const productVariant = await axios.post(baseUrl, body, options);
      this.product = productVariant?.data?.data?.product;
      console.log('pppppp', productVariant?.data?.data?.product);
    },
  },
  computed: {
    priceRange() {
      if (this.product?.variantList?.totalItems === 1) {
        const price = String(this.product?.variantList?.items[0]?.priceWithTax);
        const fPrice = price.slice(0, -2) + '.' + price.slice(-2);
        return fPrice + ' ETB';
      } else if (this.product?.variantList?.totalItems > 1) {
        let prices = [];
        this.product.variantList?.items.forEach((item) => {
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
        return min + ' ETB' + ' - ' + max + ' ETB';
      }
    },
    custom() {
      const link = this.product?.customFields?.youtube_link.split('?v=')[1];
      const document =
        process.env.GRAPHQL + this.product?.customFields?.documentation;
      return { link: link, document: document };
    },
  },
  created() {
    this.getProductVariant();
  },
};
</script>

<style scoped lang="scss">
#variant {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1300px !important;
    padding: 0;
    margin: 0 auto;
  }
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
