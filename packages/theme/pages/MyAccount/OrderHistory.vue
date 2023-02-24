<template>
  <div>
    <h3 class="text-secondary font-bold mb-[3%]">Billing Details</h3>
    <hr class="mb-4" />
    <SfTabs :open-tab="1">
      <SfTab class="profileTabs" title="My orders">
        <div v-if="currentOrder">
          <SfButton
            class="sf-button--text all-orders"
            @click="currentOrder = null"
            >All Orders</SfButton
          >
          <div class="highlighted highlighted--total">
            <SfProperty
              name="Order ID"
              :value="orderGetters.getId(currentOrder)"
              class="sf-property--full-width property"
            />
            <SfProperty
              name="Date"
              :value="orderGetters.getDate(currentOrder)"
              class="sf-property--full-width property"
            />
            <SfProperty
              name="Status"
              :value="orderGetters.getStatus(currentOrder)"
              class="sf-property--full-width property"
            />
            <SfProperty
              name="Total"
              :value="
                orderGetters.getPrice(currentOrder).toLocaleString() + ' ETB'
              "
              class="sf-property--full-width property"
            />
          </div>
          <SfTable class="products">
            <SfTableHeading>
              <SfTableHeader class="products__name">{{
                $t('Product')
              }}</SfTableHeader>
              <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
              <SfTableHeader>{{ $t('Price') }}</SfTableHeader>
              <SfTableHeader>{{ $t('Reorder') }}</SfTableHeader>
            </SfTableHeading>
            <SfTableRow
              v-for="(item, i) in orderGetters.getItems(currentOrder)"
              class="review-bar"
              :key="i"
            >
              <SfTableData class="products__name">
                {{ orderGetters.getItemName(item) }}
              </SfTableData>
              <SfTableData>{{ orderGetters.getItemQty(item) }}</SfTableData>
              <SfTableData>{{
                orderGetters.getItemPrice(item).toLocaleString() + ' ETB'
              }}</SfTableData>
              <SfTableData
                ><button @click="itemsToCart(item)">
                  Reorder Item
                </button></SfTableData
              >
            </SfTableRow>
          </SfTable>
          <div class="modal-backdrop" aria-hidden="true"></div>
        </div>
        <div v-else>
          <p class="message">
            {{ $t('Details and status orders') }}
          </p>
          <div v-if="orders.length === 0" class="no-orders">
            <p class="no-orders__title">
              {{ $t('You currently have no orders') }}
            </p>
            <SfButton class="no-orders__button">{{
              $t('Start shopping')
            }}</SfButton>
          </div>
          <SfTable v-else class="orders">
            <SfTableHeading>
              <SfTableHeader
                v-for="(tableHeader, index) in tableHeaders"
                :key="index"
              >
                <h4 class="text-lg font-bold text-secondary">
                  {{ tableHeader }}
                </h4>
              </SfTableHeader>
              <SfTableHeader class="orders__element--right" />
            </SfTableHeading>
            <template v-if="orders.items">
              <SfTableRow
                v-for="order in orders.items.slice().reverse()"
                :key="order.code"
              >
                <SfTableData v-e2e="'order-number'">{{
                  order.code
                }}</SfTableData>
                <SfTableData>{{ orderGetters.getDate(order) }}</SfTableData>
                <SfTableData>{{
                  orderGetters.getPrice(order).toLocaleString() + ' ETB'
                }}</SfTableData>
                <SfTableData>
                  <span :class="getStatusTextClass(order)">{{
                    orderGetters.getStatus(order)
                  }}</span>
                </SfTableData>
                <SfTableData class="orders__view orders__element--right">
                  <SfButton
                    class="text-secondary sf-button--text desktop-only"
                    @click="currentOrder = order"
                  >
                    {{ $t('View details') }}
                  </SfButton>
                  <button
                    class="mt-2"
                    @click="itemsToCart(orderGetters.getItems(order))"
                  >
                    <h4 class="text-secondary text-base">Reorder All Items</h4>
                  </button>
                </SfTableData>
              </SfTableRow>
            </template>
          </SfTable>
          <div class="pagination" v-if="orders.length < totalOrders">
            <SfArrow
              aria-label="prev"
              class="sf-arrow--left sf-arrow--transparent"
              :disabled="offset === 0"
              @click="goPrev(offset)"
            />
            <div class="pagination-count">
              {{ orders.length > 1 ? `${offset + 1} - ` : '' }}
              {{ offset + orders.length }} <strong>of</strong> {{ totalOrders }}
            </div>
            <SfArrow
              aria-label="next"
              class="sf-arrow--right sf-arrow--transparent"
              :disabled="offset + orders.length === totalOrders"
              @click="goNext(offset)"
            />
          </div>
        </div>
      </SfTab>

      <SfTab class="profileTabs" title="My Invoices">
        <!-- <div v-for="quote of quotes">{{quotes.indexOf(quote) + 1}})  Date: {{quote.createdAt}} <br/> Subject: {{quote.subject}}  
            Message: {{quote.msg}}
            <SfButton>Delete</SfButton>
          </div> -->
        <SfTable>
          <SfTableHeading>
            <SfTableHeader
              v-for="(invoiceHeader, index) in InvoiceHeader"
              :key="index"
            >
              <h4 class="text-lg font-bold text-secondary">
                {{ invoiceHeader }}
              </h4>
            </SfTableHeader>
            <!-- <SfTableHeader class="orders__element--right" /> -->
          </SfTableHeading>
          <SfTableRow v-for="(invoice, index) in invoices" :key="index">
            <SfTableData>{{ invoice.invoiceNumber }}</SfTableData>
            <SfTableData>{{ invoice.createdAt }}</SfTableData>
            <SfTableData>{{ invoice.orderCode }}</SfTableData>
            <!-- <SfTableData>Message: {{quote.msg}}</SfTableData> -->
            <SfTableData>
              <!-- <SfButton class="sf-button--text">See Details</SfButton> -->
              <!-- <SfButton
                class="sf-button--text red-text"
                >Delete</SfButton
              > -->
              <SfButton class="sf-button--text">
                <!-- <a :href="inv_download + invoice.downloadUrl" target="_blank">
                  Show As Pdf</a
                > -->
                <a @click="openPDF(invoice.downloadUrl)"> Show As Pdf</a>
              </SfButton>
            </SfTableData>
          </SfTableRow>
        </SfTable>
      </SfTab>
    </SfTabs>
  </div>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton,
  SfProperty,
  SfLink,
  SfArrow,
} from '@storefront-ui/vue';
import {
  computed,
  ref,
  provide,
  onMounted,
  inject,
} from '@vue/composition-api';
// import { useCookie } from "@vue-composable/cookie";
import {
  useUserOrder,
  orderGetters,
  useQuote,
  useUser,
  userGetters,
  useCart,
} from '@vue-storefront/vendure';
import { AgnosticOrderStatus, onSSR } from '@vue-storefront/core';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import gql from 'graphql-tag';
import { print } from 'graphql';
export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfTable,
    SfButton,
    SfProperty,
    SfLink,
    SfArrow,
  },
  computed: {
    custom() {
      const link = this.product?.customFields?.youtube_link?.split('?v=')[1];
      const document = process.env.GRAPHQL?.split('/shop-api')[0];
      return { link: link, document: document };
    },
  },

  computed: {
    inv_download() {
      return process.env.GRAPHQL?.split('/shop-api')[0];
    },
  },

  methods: {
    async openPDF(link) {
      const url = process.env.GRAPHQL_API?.split('/shop-api')[0] + link;
      const token = this.$cookies.get('etech-auth-token');
      const options = {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: `Bearer ${token}`,
        },
      };
      await axios.get(url, options).then((res) => {
        let binarydata = [];
        binarydata.push(res.data);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binarydata, {
            type: 'application/pdf',
          })
        );
        downloadLink.setAttribute('target', '_blank');
        console.log('the anchor tag', downloadLink);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
    },
  },

  setup(props, { root }) {
    const quotes = ref([]);
    const invoices = ref([]);

    const { load, myQuotes, deleteQuote } = useQuote();
    const { user, load: loadUser } = useUser();
    const { addItem: addItemToCart, isInCart, cart, setCart } = useCart();
    const invoiceEmail = userGetters.getEmailAddress(user.value);
    const baseUrl = process.env.GRAPHQL_API;

    loadUser().then(() => {
      const currentEmail = userGetters.getEmailAddress(user.value);
      load({ email: currentEmail })
        .then((data) => {
          quotes.value = myQuotes.value;
        })
        .catch((err) => console.warn(err));
    });

    function removeQuote(index) {
      deleteQuote({ id: quotes.value[index].id });
      quotes.value = quotes.value.filter(
        (q) => quotes.value.indexOf(q) !== index
      );
    }
    function downloadQuote(index) {
      const doc = jsPDF();

      doc.text(`Subject: ${quotes.value[index]?.subject}`, 10, 10);
      doc.text(`Msg ${quotes.value[index]?.msg}`, 10, 20);
      doc.save('quote.pdf');
    }

    onMounted(() => {
      let baseUrl = process.env.GRAPHQL_API;
      let pbody = {
        query: `query getInvoices($customerEmail: String!) {
                       myInvoices(input:{customerEmail: $customerEmail}){
                          items{
                            invoiceNumber
                            downloadUrl
                            createdAt
                            orderCode
                          }
                        }
                      }`,
        variables: {
          customerEmail: invoiceEmail,
        },
      };
      let poptions = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      axios
        .post(baseUrl, pbody, poptions)
        .then((res) => {
          invoices.value = res.data.data.myInvoices.items;
        })
        .catch((err) => {});
    });

    //    // quotes.value = myQuotes

    // const  mutation = gql`
    //     query getInvoices($invoiceEmail: String!){
    //       myInvoices(input:{customerEmail: $invoiceEmail}){
    //         items{
    //           invoiceNumber
    //           downloadUrl
    //         }
    //       }
    //     }`
    // axios.post('http://localhost:3000/shop-api', {query: print(mutation), variables :{customerEmail:invoiceEmail}})
    // .then(data =>{
    //     // quotes.value = data.data.data.getQueryOf
    // }).catch(err => {
    // })

    const limit = 10;
    const { orders, search } = useUserOrder();
    const currentOrder = ref(null);
    const showToast = inject('showToast');

    onSSR(async () => {
      await search({ limit, offset: 0, sort: 'createdAt desc' });
    });

    const goNext = (offset) => {
      search({ limit, offset: offset + limit, sort: 'createdAt desc' });
    };

    const goPrev = (offset) => {
      search({ limit, offset: offset - limit, sort: 'createdAt desc' });
    };

    const tableHeaders = ['Order ID', 'Payment date', 'Amount', 'Status'];
    const quotesHeader = [
      'Id',
      'Sent At',
      'Subject',
      //   'message',
      'Actions',
    ];

    const InvoiceHeader = [
      'Invoice Number',
      'Created At',
      'Order No',
      'Document',
    ];

    const itemsToCart = (items) => {
      if (items.length >= 1) {
        for (let item of items) {
          addItemToCart({
            product: {
              _variantId: item?.productVariant?.id,
            },
            quantity: 1,
          }).then((res) => {
            if (cart?.value?.errorCode && cart.value.errorCode != '') {
              showToast(cart.value.message);
              setCart();
            } else {
              showToast('Product added to cart!');
            }
          });
        }
      } else {
        addItemToCart({
          product: {
            _variantId: items?.productVariant?.id,
          },
          quantity: 1,
        }).then((res) => {
          if (cart?.value?.errorCode && cart.value.errorCode != '') {
            showToast(cart.value.message);
            setCart();
          } else {
            showToast('Product added to cart!');
          }
        });
      }
      setTimeout(() => setCart(), 5000);
    };

    const getStatusTextClass = (order) => {
      const status = orderGetters.getStatus(order);
      switch (status) {
        case AgnosticOrderStatus.Open:
          return 'text-warning';
        case AgnosticOrderStatus.Complete:
          return 'text-success';
        default:
          return '';
      }
    };

    return {
      quotesHeader,
      tableHeaders,
      InvoiceHeader,
      orders: computed(() => orders.value ?? []),
      offset: computed(() => orders.value?.offset ?? 0),
      totalOrders: computed(() => orderGetters.getTotalItems(orders.value)),
      getStatusTextClass,
      goNext,
      goPrev,
      orderGetters,
      currentOrder,
      quotes,
      invoices,
      deleteQuote,
      downloadQuote,
      removeQuote,
      addItemToCart,
      itemsToCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  padding-top: var(--spacer-base);
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination-count {
  padding: 0 var(--spacer-base);
}
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6
      var(--font-family--primary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17, 5rem;
    }
  }
}
.orders {
  @include for-desktop {
    &__element {
      &--right {
        --table-column-flex: 1;
        text-align: right;
      }
    }
  }
}
.all-orders {
  --button-padding: var(--spacer-base) 0;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--primary);
  &__link {
    color: var(--c-primary);
    font-weight: var(--font-weight--medium);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-size--sm);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size--sm);
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
  }
}
.products {
  --table-column-flex: 1;
  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);
  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);
  &:last-child {
    margin-bottom: 0;
  }
  ::v-deep .sf-property__name {
    white-space: nowrap;
  }
  ::v-deep .sf-property__value {
    text-align: right;
  }
  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);
    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
  }
}
.review-bar {
  width: 100% !important;
}
.red-text {
  color: red;
}
hr {
  color: lightgray;
}
</style>
