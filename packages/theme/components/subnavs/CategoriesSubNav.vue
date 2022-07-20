<template>
  <HeaderNavigationItem
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category}`"
      :label="'PRODUCTS'"
      :link="localePath(`/c/${category}`)"
    />
</template>

<script>
import HeaderSubNavigation from './HeaderSubNavigation.vue';
import { useCategory, categoryGetters,useFacet, facetGetters,useCms } from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import 
  {SfBanner}
 from '@storefront-ui/vue';
export default {
    setup() {
        const headerNavigation = [];
        const {categories} = useCategory();
        const {getCms}=useCms();
        const adSection = computed(() => JSON.parse(getCms.value[3].content));
        const adImage = computed(()=>getCms.value[3].featuredAsset.preview);
        const getTree = ()=>{
            categories.value.items.forEach((a)=>{
                if (a.children.length > 0) {
                    headerNavigation.push(facetGetters.getTree(a));
                }
            });
        };
        return {
            getTree,
            headerNavigation,
            adSection,
            adImage
        }
    }
}
</script>

<style>

</style>