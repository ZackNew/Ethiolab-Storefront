<template>
  <HeaderNavigationItem
    :subnavList="headerNavigation"
    class="nav-item"
    v-e2e="`app-header-url_BRANDS`"
    :label="$t('BRANDS')"
    :link="localePath(`/c/BRANDS`)"
  />
</template>

<script>
import HeaderNavigationItem from '../HeaderNavigationItem.vue';
import { ref } from '@vue/composition-api';
import { useCategory } from '@vue-storefront/vendure';
export default {
  name: 'BrandsSubNav',
  components: {
    HeaderNavigationItem,
  },
  created() {
    this.getBrands();
  },
  setup() {
    let headerNavigation = ref([]);
    const { categories } = useCategory();
    return {
      headerNavigation,
    };
  },
  methods: {
    getBrands() {
      let graphql = JSON.stringify({
        query: `query{
            brands{
                id
                name
                description
                icon{
                  preview
                }
            }
        }`,
      });
      let baseUrl = process.env.GRAPHQL_API;
      fetch(baseUrl, {
        method: 'post',
        body: graphql,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': graphql.length,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          this.headerNavigation = data.data.brands.map((value, index) => {
            return {
              label: value.name,
              items: [],
              preview: value.icon?.preview,
              description: value.description,
              id: index,
              link: `/b/${value.name.toLowerCase()}/${value.id}`,
            };
          });
        });
    },
  },
};
</script>

<style></style>
