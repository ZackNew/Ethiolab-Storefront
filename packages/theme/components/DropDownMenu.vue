<template>
  <div></div>
  
</template>
<script>
import HeaderSubNavigation from './HeaderSubNavigation.vue';
import { useCms } from '@vue-storefront/vendure';
import { computed } from '@vue/composition-api';
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
  },
  setup() {
        return {}
  },
};
</script>
<style scoped>
.center-my-text {
  text-align: left !important;
}
.body {
  position: absolute !important;
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
