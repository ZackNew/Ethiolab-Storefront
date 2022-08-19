<template>
  <div class="body">
    <div class="grid grid-rows-6 grid-flow-col">
      <HeaderSubNavigation
        :handler="hoverHandler"
        :hoverOutHandler = 'hoverOutHandler'
        :title="navs.label"
        :link="navs.link"
        :id="navs.id"
        :subnavList="navs.items"
        v-for="navs in $props.subnavList"
        :key="navs.id"
      />
      <!-- <HeaderSubNavigation :title="navs.label" :subnavList="navs.items" v-for="navs in headerNavigation" :key="navs.id"/> -->
    </div>
    <SfBanner 
    v-if="addVisible"
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
    <div  class="detail" v-if ='showDetail'>
      here comes the detail
    </div>
  </div>
</template>
<script>
import HeaderSubNavigation from './HeaderSubNavigation.vue';
import { useCms } from '@vue-storefront/vendure';
import { computed, ref } from '@vue/composition-api';
import { SfBanner } from '@storefront-ui/vue';

export default {
  name: 'DropDownMenu',
  components: {
    HeaderSubNavigation,
    SfBanner,
  },
  created() {
    // this.getTree();
    // console.log(this.headerNavigation);
  },
  props: {
    subnavList: Array,
    main:String
  },
  setup(props) {
    // const headerNavigation = [];
    // const {categories} = useCategory();
    const { getCms } = useCms();
    let adSection = computed(() => JSON.parse(getCms.value[3].content));
    const adImage = computed(() => getCms.value[3].featuredAsset.preview);
    // const getTree = ()=>{
    // // categories.value.items.forEach((a)=>{
    // //     if (a.parent.name === "__root_collection__") {
    // //         headerNavigation.push(facetGetters.getTree(a));
    // //    }
    // // });
    // };
    let showDetail = ref(false)
    let addVisible= ref(true)
    let hoverHandler = (item)=>{
        // console.log('hoavered over **:',item,props.main)
      if(props.main==='INDUSTRIES'){
        addVisible.value = false
        showDetail.value=true
      
      }

    }
    let hoverOutHandler = ()=>{
      addVisible.value=true
      showDetail.value=false
    
    }
    return {
      // getTree,
      // headerNavigation,
      adSection,
      adImage,
      hoverHandler,
      hoverOutHandler,
      addVisible,
      showDetail
    };
  },
};
</script>
<style scoped>
.detail{
  position: absolute;
  right:0;
  top:0;
  margin:1em;
  box-sizing: border-box;
  height:100%;
  width:50%;
  padding:1em
}
.center-my-text {
  text-align: left !important;
}
.body {
  position: absolute !important;
  /* display: flex!important; */
  /* flex-direction: row!important; */
  /* flex-wrap: nowrap!important; */
  background: rgb(255, 255, 255, 1) !important;
  height: 100% !important;
  overflow: hidden !important;
}

.grid {
  margin-top: 5% !important;
  margin-left: 2.5% !important;
  width: 80% !important;
  height: 75% !important;
}

.sf-banner {
  width: 20% !important;
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
