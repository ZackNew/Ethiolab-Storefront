<template>
    <div class="body">
        <!-- <div class="header">

        </div> -->
        <div class="grid grid-rows-6 grid-flow-col">
            <HeaderSubNavigation :title="navs.label" :subnavList="navs.items" v-for="navs in headerNavigation" :key="navs.id" :slug="navs.slug"/>
            <!-- <HeaderSubNavigation :title="navs.label" :subnavList="navs.items" v-for="navs in headerNavigation" :key="navs.id"/> -->
        </div>
        <SfBanner
            class="ad-banner"
            :title="adSection.title || 'SMALL SALE'"
            :subtitle="adSection.overview || 'High Quality Lab Equipments'"
            :description="adSection.description || 'Find new, used, and surplus lab equipment plus medical, test equipment, process, pharmaceutical.'"
            :buttonText="adSection.buttonText || 'Shop Now'"
            background=""
            :image="adImage || '/homepage/bannerA.webp'"
            link="/c/clinical-laboratory">
        </SfBanner>
    </div>
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
    name: "DropDownMenu",
    components: {
        HeaderSubNavigation,
        SfBanner
    },
    created(){
        this.getTree();
        // console.log(this.headerNavigation);
    },
    props: {
        
    },
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
    },
}
</script>
<style scoped>
.center-my-text{
    text-align: left !important;
}
.body{
    background:rgb(255,255,255,1) !important;
}

.grid{
    margin-top: 5%;
    margin-left: 2.5%;
    width: 80%;
    height: 75%;
}

.ad-banner{
  width:20% !important;
  height:100% !important;
  position: relative;
  left: 80% !important;
  top: -87% !important;
  /* right: 0% !important; */
  /* bottom: -10% !important; */
  display: inline-block !important;
  /* border: 1px solid black; */
}

.header{
    width:100%;
    height: 25%;
    /* border-bottom: 0.1px solid var(--c-bg-primary) !important; */
}
</style>