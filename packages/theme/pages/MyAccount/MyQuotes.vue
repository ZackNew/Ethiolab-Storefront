<template>
  <SfTabs :open-tab="1" class="tab-orphan">
    <SfTab class="profileTabs" title="My Quotes">
      <SfTable>
        <SfTableHeading>
          <SfTableHeader
            v-for="(tableHeader, index) in quotesHeader"
            :key="index"
          >
            <h4 class="text-lg font-bold text-secondary">
              {{ tableHeader }}
            </h4>
          </SfTableHeader>
          <SfTableHeader class="orders__element--right" />
        </SfTableHeading>

        <!-- <SfTableRow v-for="(quote, index) in quotes" :key="index">
            <SfTableData>{{ quotes.indexOf(quote) + 1 }})</SfTableData>
            <SfTableData>{{ quote.createdAt }}</SfTableData>
            <SfTableData>{{ quote.subject }}</SfTableData>
            <SfTableData>
              <SfButton class="sf-button--text">See Details</SfButton>
              <SfButton
                class="sf-button--text red-text"
                @click="removeQuote(quotes.indexOf(quote))"
                >Delete</SfButton
              >
              <SfButton
                class="sf-button--text"
                @click="downloadQuote(quotes.indexOf(quote))"
                >Download As Pdf</SfButton
              >
            </SfTableData>
          </SfTableRow> -->

        <!-- <SfTableRow v-for="(quote,index) in quotes" :key="index">
            <SfTableData>{{ quotes.indexOf(quote) + 1 }})</SfTableData>
            <SfTableData>{{ quote.createdAt }}</SfTableData>
            <SfTableData>{{ quote.subject }}</SfTableData>
            <SfTableData>
              <SfButton class="sf-button--text">See Details</SfButton>
              <SfButton
                class="sf-button--text red-text"
                @click="removeQuote(quotes.indexOf(quote))"
                >Delete</SfButton       <SfTableData class="orders__view orders__element--right">
                <SfButton
                  class="sf-button--text desktop-only"
                  @click="currentOrder = order"
                >
                  {{ $t('View details') }}
                </SfButton>
                <button
                  class="mt-2"
                  @click="itemsToCart(orderGetters.getItems(order))"
                >
                  Reorder All Items
                </button>
              </SfTableData>
                @click="downloadQuote(quotes.indexOf(quote))"
                >Download As Pdf</SfButton
              >
            </SfTableData>
          </SfTableRow> -->
      </SfTable>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfCheckbox,
  SfButton,
  SfLink,
  SfTable,
} from '@storefront-ui/vue';
export default {
  name: 'MyQuotes',
  components: {
    SfTabs,
    SfCheckbox,
    SfButton,
    SfLink,
    SfTable,
  },
  data() {
    return { newsletter: [] };
  },
  setup() {
    const quotesHeader = [
      'Id',
      'Sent At',
      'Subject',
      //   'message',
      'Actions',
    ];
    return {
      quotesHeader,
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}
.form {
  &__element {
    margin: 0 0 var(--spacer-base) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__checkbox-group {
    margin: 0 0 var(--spacer-xl) 0;
  }
  &__title {
    margin: 0 0 var(--spacer-base) 0;
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17.5rem;
    }
  }
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
}
.notice {
  margin: var(--spacer-base) 0 0 0;
  font-size: var(--font-size--xs);
  &__link {
    color: var(--c-primary);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
</style>
