<template>
    <div class="body">
        <div class="grid grid-rows-6 grid-flow-col">
            <HeaderSubNavigation :title="navs.label" :subnavList="navs.items" v-for="navs in $props.subnavList" :key="navs.id"/>
            <!-- <HeaderSubNavigation :title="navs.label" :subnavList="navs.items" v-for="navs in headerNavigation" :key="navs.id"/> -->
        </div>
        <SfBanner
            class="ad-banner"
            :title="adSection.title || 'Ad Titile'"
            :subtitle="adSection.overview || 'Ad Overview'"
            :description="adSection.description || 'Ad Description'"
            :buttonText="adSection.buttonText || 'Ad Button'"
            background=""
            :image="adImage || '/homepage/bannerA.webp'"
            link="/c/clinical-laboratory"
            >
        </SfBanner>
    </div>
</template>
<script>
import HeaderSubNavigation from './HeaderSubNavigation.vue';
import { useCms } from '@vue-storefront/vendure';
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
        // this.getTree();
        // console.log(this.headerNavigation);
    },
    props: {
        subnavList:Array,
    },
    setup() {
        // const headerNavigation = [];
        // const {categories} = useCategory();
        const {getCms}=useCms();
        const adSection = computed(() => JSON.parse(getCms.value[3].content));
        const adImage = computed(()=>getCms.value[3].featuredAsset.preview);
        // const getTree = ()=>{
        // // categories.value.items.forEach((a)=>{
        // //     if (a.parent.name === "__root_collection__") {
        // //         headerNavigation.push(facetGetters.getTree(a));
        // //    }
        // // });
        // };
        return {
            // getTree,
            // headerNavigation,
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
    position: absolute !important;
    background:rgb(255,255,255,1) !important;
    height: 100% !important;
    overflow: hidden !important;
}

.grid{
    margin-top: 5% !important;
    margin-left: 2.5% !important;
    width: 80% !important;
    height: 75% !important;
}

.sf-banner{
  width:20% !important;
  height: 60% !important;
  position: relative !important;
  left: 80% !important;
  /* top: -87% !important; */
  /* right: 0% !important; */
  bottom: 90% !important;
  display: inline-block !important;
  /* border: 1px solid black; */
}
</style>