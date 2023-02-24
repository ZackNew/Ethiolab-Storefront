<template>
  <div
    class="bg-white max-w-[1250px] w-[100%] min-h-[26rem] dropDown broder border-2 border-[#aaaaaa]"
  >
    <CategoriesSubNav
      @oneClicked="$emit('oneClicked')"
      :categories="categories"
      v-if="categories"
    />
    <brandsIndustrySubnav
      @oneClicked="$emit('oneClicked')"
      :brandsIndustries="industries || brands"
      v-if="industries || brands"
    />
  </div>
</template>

<script>
import brandsIndustrySubnav from './subnavs/brandIndustrySubnav.vue';
import CategoriesSubNav from './subnavs/CategoriesSubNav.vue';

export default {
  props: {
    contents: {
      type: Object,
      default: {},
    },
  },
  computed: {
    categories() {
      let categs = null;
      if (this.contents.hovered === 'categories') categs = this.contents;
      return categs;
    },
    brands() {
      let categs = null;
      if (this.contents.hovered === 'brands') categs = this.contents;
      return categs;
    },
    industries() {
      let categs = null;
      if (this.contents.hovered === 'Industries') categs = this.contents;
      return categs;
    },
  },
  components: {
    brandsIndustrySubnav,
    CategoriesSubNav,
  },
};
</script>

<style>
.dropDown {
  margin: 0 auto;
  z-index: 9999;
}
</style>
