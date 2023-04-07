<template>
  <div id="policy">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      :active="$t(activePage)"
      :title="$t(activePage)"
      @click:change="changeActivePage"
    >
      <SfContentPage
        v-for="(page, key) in policyPages || pages"
        :key="key"
        :title="$t(page.name)"
      >
        <template
          v-if="page.description[0] && typeof page.description[0] === 'string'"
        >
          <SfHeading :title="$t(page.name)" :level="3" />
          <p
            class="paragraph paragraph--without-tab"
            v-html="page.description"
          ></p>
        </template>
        <template v-else>
          <SfTabs :open-tab="1">
            <SfTab
              v-for="(tab, index) in page.description"
              :key="index"
              :title="tab.tabName"
            >
              <p
                v-for="(paragraph, i) in tab.tabContent"
                :key="i"
                class="paragraph"
              >
                {{ paragraph }}
              </p>
            </SfTab>
          </SfTabs>
        </template>
      </SfContentPage>
    </SfContentPages>
  </div>
</template>
<script>
import {
  SfContentPages,
  SfTabs,
  SfBreadcrumbs,
  SfHeading,
} from '@storefront-ui/vue';
import { computed, onMounted } from '@vue/composition-api';
import { useCms } from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
export default {
  name: 'policy',
  components: {
    SfContentPages,
    SfTabs,
    SfBreadcrumbs,
    SfHeading,
  },
  head() {
    return {
      title: this.activePage,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Policy page description',
        },
      ],
    };
  },
  setup(props, context) {
    const { $router, $route } = context.root;
    const { search: searchCms, getCms } = useCms();
    const policyPages = computed(() => JSON.parse(getCms.value[4].content));
    // onSSR(async () => {
    //   await searchCms('POLICIES')
    // });
    const activePage = computed(() => {
      const { pageName } = $route.params;
      if (pageName) {
        return (
          pageName.charAt(0).toUpperCase() + pageName.slice(1)
        ).replaceAll('-', ' ');
      }
      return 'Return';
    });
    const changeActivePage = async (title) => {
      $router.push(
        `/policy/${(title || '').toLowerCase().replaceAll(' ', '-')}`
      );
    };
    onMounted(async () => {
      await searchCms();
    });
    return { changeActivePage, activePage, policyPages };
  },
  data() {
    return {
      breadcrumbs: [
        { text: 'Home', route: { link: '#' } },
        { text: this.activePage, route: { link: '#' } },
      ],
      pages: [
        {
          name: 'Return',
          description: [
            'Ethiolab is a firm established in 2012 with the objective of supplying quality equipment from branded partners for research and development, testing, measuring and laboratory analysis applications.',
            ' We have solutions for R&D institutions, universities, production industries, and controlling & regulating authorities. On our eCommerce platform, we carry several portable measuring and testing devices, laboratory and research consumables, instruments and many more ranges for our partners and customers. In addition to our high equipment quality our after sales service is a source of trust by our clients.',
          ],
        },
        {
          name: 'Shipping',
          description: [
            'Providing high quality and latest technology laboratory instruments from world leading companies to researchers and other interested parties with efficient pre and post sales service.',
            'Creating an alternative marketplace online where safe and reliable market transactions are carried out.',
            'Growing and expanding our business to regional cities of the country.',
          ],
        },
        {
          name: 'Privacy',
          description: [
            'To be the leading laboratory products supplier in Africa.',
          ],
        },
        {
          name: 'Terms and Conditions',
          description: [
            'Our first principal is honesty in our engagements with clients to serve them in a manner that upholds our cultural values as Ethiopians, where a promise is highly consecrated above all. ',
            'We believe trust is everything in the business world; therefore, we encourage open communication with our employees as well as with our clients.',
            'Passion – We are driven to perform better, progress constantly and exceed expectations.',
            '',
          ],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
#policy {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.paragraph {
  margin: var(--spacer-sm) 0;
  color: var(--c-text);
  &:first-child {
    margin: 0 0 var(--spacer-sm) 0;
  }
  &--without-tab {
    @include for-mobile {
      padding: 0 var(--spacer-sm);
    }
  }
}
</style>
