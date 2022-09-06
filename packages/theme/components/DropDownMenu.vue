<template>
  <div class="flex body">
    <div class="grid grid-rows-6 grid-cols-5 gap-3 grid-flow-col">
      <HeaderSubNavigation
        :handler="hoverHandler"
        :hoverOutHandler="hoverOutHandler"
        :title="navs.label"
        :link="navs.link"
        :id="navs.id"
        :disc="navs.description"
        :prev="navs.preview"
        :subnavList="navs.items"
        v-for="navs in $props.subnavList"
        :key="navs.id"
      />
      <!-- <HeaderSubNavigation :title="navs.label" :subnavList="navs.items" v-for="navs in headerNavigation" :key="navs.id"/> -->
    </div>
    <!-- <SfBanner
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
      meme
    </SfBanner> -->
    <div class="detail" v-show="showDetail">
      <img
        style="width: 10em; max-height: 6em; object-fit: cover"
        alt="Industry Image"
        :src="cPrev"
      />
      <h4>{{ cTitle }}</h4>
      <p v-html="cDisc"></p>
    </div>
    <div
      v-show="!showDetail"
      class="ad text-dark_accent pl-8 pt-16"
      :style="{
        backgroundImage: `url(${adImage || '/homepage/bannerA.webp'})`,
      }"
    >
      <p class="text-dark_gray uppercase pr-1">
        {{ adSection.overview || 'Ad Overview' }}
      </p>
      <h2 class="mt-5 uppercase pr-1">{{ adSection.title || 'Ad Titile' }}</h2>
      <p class="mt-5">{{ adSection.description || 'Ad Description' }}</p>
      <button
        class="mt-5 mb-2 bg-secondary w-24 p-2 text-white rounded hover:bg-dark_secondary hover:text-faded_black"
      >
        {{ adSection.buttonText || 'Ad Button' }}
      </button>
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
    main: String,
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
    let showDetail = ref(false);
    let addVisible = ref(true);
    let cTitle = ref('');
    let cDisc = ref('');
    let cPrev = ref('');
    let hoverHandler = (item, title, disc, prev) => {
      // console.log('**hovered over the items',props.main,item,title,disc,prev)
      if (props.main === 'INDUSTRIES' || props.main == 'BRANDS') {
        addVisible.value = false;
        showDetail.value = true;
        cTitle.value = title;
        let a = '';
        a.len;
        disc = disc.replace(/<[^>]+>/g, '');
        if (disc.length > 120) {
          disc = disc.slice(0, 120);
          disc += ' ...';
          // disc = disc.replace(/<[^>]+>/g, '');
        }
        cDisc.value = disc;
        cPrev.value = prev;
      }
    };
    let hoverOutHandler = () => {
      addVisible.value = true;
      showDetail.value = false;
    };
    return {
      // getTree,
      // headerNavigation,
      adSection,
      adImage,
      cDisc,
      cTitle,
      cPrev,
      hoverHandler,
      hoverOutHandler,
      addVisible,
      showDetail,
    };
  },
};
</script>
<style scoped>
.detail {
  position: absolute;
  background-color: var(--c-bg-secondary);
  right: 0;
  top: 0;
  color: white;
  display: flex;
  border-radius: 1em;
  box-shadow: 2px 2px 5px rgb(68, 68, 68);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
  box-sizing: border-box;
  height: 90%;
  width: 25%;
  padding: 1em;
}
.detail p {
  text-align: justify;
}
.ad {
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  display: flex;
  border-radius: 0.5em;
  box-shadow: 2px 2px 5px rgb(68, 68, 68);
  flex-direction: column;
  margin: 1em;
  box-sizing: border-box;
  height: 95%;
  width: 20%;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
}
.ad::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
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
