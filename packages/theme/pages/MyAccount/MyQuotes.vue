<template>
  <SfTabs :open-tab="1" class="tab-orphan">
    <SfTab class="profileTabs" title="My Quotes">
      <SfTable>
        <SfTableHeading>
          <SfTableHeader v-for="tableHeader in quotesHeader" :key="tableHeader">
            <h4 class="text-lg font-bold text-secondary">
              {{ tableHeader }}
            </h4>
          </SfTableHeader>
        </SfTableHeading>

        <SfTableRow v-for="quote in quotes" :key="quote.id">
          <SfTableData>{{ quote.id }}</SfTableData>
          <SfTableData class="pr-2">{{
            quote.createdAt && quote.createdAt.split('T')[0]
          }}</SfTableData>
          <SfTableData class="pr-2">{{ quote.subject }}</SfTableData>
          <SfTableData>
            <SfButton class="sf-button--text">
              <a @click="openPDF(quote.assetUrl)"> view pdf </a>
            </SfButton>
          </SfTableData>
        </SfTableRow>
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
import { ref, computed, onMounted, inject } from '@vue/composition-api';
import { useUser } from '@vue-storefront/vendure';
import axios from 'axios';
export default {
  name: 'MyQuotes',
  components: {
    SfTabs,
    SfCheckbox,
    SfButton,
    SfLink,
    SfTable,
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
  setup() {
    const { isAuthenticated, load: loadUser, user } = useUser();
    const quotesHeader = ['Id', 'Sent At', 'Subject', 'Response'];
    const quotes = ref([]);
    const urlLink = computed(() => {
      return process.env.GRAPHQL_API.split('/shop-api')[0];
    });
    const getMyuotes = async () => {
      loadUser();
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `
          query getMyuotes($email: String!) {
            getQueryOf(email: $email){
              id
              createdAt
              subject
              assetUrl
            }
          }`,
        variables: { email: user?.value?.emailAddress },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await axios.post(baseUrl, body, options).then((res) => {
        quotes.value = res.data.data.getQueryOf.reverse();
      });
    };
    getMyuotes();
    return {
      quotes,
      quotesHeader,
      urlLink,
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
