<template>
  <div id="static">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      :active="$t(activePage)"
      :title="activePage"
      @click:change="changeActivePage"
    >
      <SfContentPage
        v-for="(page, key) in staticPages || pages"
        :key="key"
        :title="$t(page.name)"
      >
        <div v-if="page.description">
          <p
            v-html="page.description[0]"
            :class="isDarkMode ? 'darkVHtml' : ''"
          ></p>
        </div>
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
import { computed, onMounted, ref } from '@vue/composition-api';
import { useCms } from '@vue-storefront/vendure';
import { useUiState } from '~/composables';
export default {
  name: 'Static',
  components: {
    SfContentPages,
    SfTabs,
    SfBreadcrumbs,
    SfHeading,
  },
  setup(props, context) {
    const { isDarkMode } = useUiState();
    const { search: searchCms, getCms } = useCms();
    console.log(getCms);
    const staticPages = computed(() => JSON.parse(getCms.value[3].content));
     //Test Return page Based on query
     const activePage = ref(context.root.$route.query.initialPage || 'RETURN');
    staticPages.value.forEach((element) => {
      element.description = [element?.description];
    });
    // const activePage = ref('RETURN');
    const breadcrumbs = computed(() => [
      { text: 'Home', route: { link: '/' } },
      { text: activePage.value, route: { link: '#' } },
    ]);
    let contents = ref('');
    const changeActivePage = (title) => {
      activePage.value = title;
      contents = staticPages.value.filter((page) => page.name == title);
    };
    return {
      staticPages,
      changeActivePage,
      contents,
      activePage,
      breadcrumbs,
      isDarkMode,
    };
  },
  data() {
    return {
      pages: [
        {
          name: 'About',
          description: [
            'Ethiolab is a firm established in 2012 with the objective of supplying quality equipment from branded partners for research and development, testing, measuring and laboratory analysis applications.',
            ' We have solutions for R&D institutions, universities, production industries, and controlling & regulating authorities. On our eCommerce platform, we carry several portable measuring and testing devices, laboratory and research consumables, instruments and many more ranges for our partners and customers. In addition to our high equipment quality our after sales service is a source of trust by our clients.',
          ],
        },
        {
          name: 'Mission',
          description: [
            'Providing high quality and latest technology laboratory instruments from world leading companies to researchers and other interested parties with efficient pre and post sales service.',
            'Creating an alternative marketplace online where safe and reliable market transactions are carried out.',
            'Growing and expanding our business to regional cities of the country.',
          ],
        },
        {
          name: 'Vision',
          description: [
            'To be the leading laboratory products supplier in Africa.',
          ],
        },
        {
          name: 'Value',
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
.darkVHtml {
  color: white;
}
</style>
