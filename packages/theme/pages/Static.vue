<template>
  <div id="static">
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
        v-for="(page, key) in pages"
        :key="key"
        :title="$t(page.title)"
      >
        <template v-if="page.content[0] && typeof page.content[0] === 'string'">
          <SfHeading
            :title="$t(page.subtitle)"
            :level="3"/>
          <p
            v-for="(paragraph, index) in page.content"
            :key="index"
            class="paragraph paragraph--without-tab"
          >
            {{ paragraph }}
          </p>
        </template>
        <template v-else>
          <SfTabs :open-tab="1">
            <SfTab
              v-for="(tab, index) in page.content"
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
import { SfContentPages, SfTabs, SfBreadcrumbs, SfHeading } from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
export default {
  name: 'Static',
  components: {
    SfContentPages,
    SfTabs,
    SfBreadcrumbs,
    SfHeading
  },
  head () {
    return {
      title: this.activePage,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ]
    };
  },
  setup(props, context) {
    const { $router, $route } = context.root;
    const activePage = computed(() => {
      const { pageName } = $route.params;
      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replaceAll('-', ' ');
      }
      return 'About';
    });
    const changeActivePage = async (title) => {
      $router.push(`/page/${(title || '').toLowerCase().replaceAll(' ', '-')}`);
    };
    return { changeActivePage, activePage };
  },
  data() {
    return {
      breadcrumbs: [
        { text: 'Home', route: { link: '#' } },
        { text: this.activePage, route: { link: '#' } }
      ],
      pages: [
        {
          title: 'About',
          subtitle: 'About EthioLabs',
          content: [
            'Ethiolab is a firm established in 2012 with the objective of supplying quality equipment from branded partners for research and development, testing, measuring and laboratory analysis applications.',
            ' We have solutions for R&D institutions, universities, production industries, and controlling & regulating authorities. On our eCommerce platform, we carry several portable measuring and testing devices, laboratory and research consumables, instruments and many more ranges for our partners and customers. In addition to our high equipment quality our after sales service is a source of trust by our clients.'
          ]
        },
        {
          title: 'Mission',
          subtitle: 'Our Mission',
          content: [
            'Providing high quality and latest technology laboratory instruments from world leading companies to researchers and other interested parties with efficient pre and post sales service.',
            'Creating an alternative marketplace online where safe and reliable market transactions are carried out.',
            'Growing and expanding our business to regional cities of the country.'
          ]
        },
        {
          title: 'Vision',
          subtitle: 'Our vison',
          content: [
            'To be the leading laboratory products supplier in Africa.'
          ]
        },
        {
          title: 'Value',
          subtitle: 'Our Values',
          content: [
            'Our first principal is honesty in our engagements with clients to serve them in a manner that upholds our cultural values as Ethiopians, where a promise is highly consecrated above all. ',
            'We believe trust is everything in the business world; therefore, we encourage open communication with our employees as well as with our clients.',
            'Passion – We are driven to perform better, progress constantly and exceed expectations.',
            ''
          ]
        },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#static {
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
  color:var(--c-text);
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
