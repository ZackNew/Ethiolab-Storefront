<template>
  <HeaderNavigationItem
      :subnavList="headerNavigation"
      class="nav-item"
      v-e2e="`app-header-url_CATEGORY`"
      :label="'PRODUCTS'"
      :link="localePath(`/c/CATEGORY`)"
    />
</template>

<script>
import HeaderNavigationItem from '../HeaderNavigationItem.vue';
import { useCategory, facetGetters,useCms } from '@vue-storefront/vendure';
import { computed } from '@vue/composition-api';
export default {
    name:"CategoriesSubNav",
    components:{
        HeaderNavigationItem,
    },
    created(){
        this.getTree();
    },
    setup(){
        const headerNavigation = [];
        const {categories} = useCategory();
        const {getCms}=useCms();
        const adSection = computed(() => JSON.parse(getCms.value[3].content));
        const adImage = computed(()=>getCms.value[3].featuredAsset.preview);
         const getTree = ()=>{
            categories.value.items.forEach((a)=>{
                if (a.parent.name === "__root_collection__") {
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