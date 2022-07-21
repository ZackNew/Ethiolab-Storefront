<template>
  <div class="sf-header-navigation-item" v-on="$listeners">
    <!-- <div
      class="
        sf-header-navigation-item__item sf-header-navigation-item__item--dePRODUCTSsktop
      "
    >
      <slot name="desktop-navigation-item">
        <SfLink class="sf-header-navigation-item__link" :link="link">{{
          label
        }}</SfLink>
      </slot>
      <slot />
    </div> -->
    <div
      class="
        sf-header-navigation-item__item sf-header-navigation-item__item--mobile
      "
    >
      <slot name="mobile-navigation-item">
        <SfMenuItem :label="label" class="sf-header-navigation-item__menu-item">
          {{ label }}
        </SfMenuItem>
        <DropDownMenu class="overlay"/>
        <!-- <div > -->
        <!-- </div> -->
      </slot>
      <!-- <div class="sf-header-navigation-item__content">
        <slot />
      </div> -->
    </div>
  </div>
</template>
<script>
import { SfMenuItem, SfLink, SfModal } from '@storefront-ui/vue';
import DropDownMenu from './DropDownMenu.vue'
export default {
  name: "HeaderNavigationItem",
  components: {
    SfLink,
    SfMenuItem,
    SfModal,
    DropDownMenu
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    subnavList:Array,
  },
};
</script>
<style scoped>
/* .sf-header-navigation-item__menu-item:hover{
  border: 1px solid black;
} */
/* .sf-header-navigation-item__menu-item:hover::{
  border: 1px solid black !important;
  width: 60% !important;
  height: 35% !important;
.sf-header-navigation-item__menu-item:hover .overlay{
  z-index: 2;
} */
.sf-button{
   display: inline !important;
   border-top: 0.25px solid transparent !important;
   border-left: 0.25px solid transparent !important;
   border-right: 0.25px solid transparent !important;
   /* border: 0.25px solid transparent !important;*/
}
.sf-menu-item__label{
  /* margin: auto !important; */
  display: block !important;
  font-weight: bold;
}

.sf-button:hover{
  justify-content: center;
  /* border-top: 0.1px solid var(--c-bg-primary) !important;
  border-left: 0.1px solid var(--c-bg-primary) !important;
  border-right: 0.1px solid var(--c-bg-primary) !important; */
  border-bottom: 0.1px solid var(--c-bg-primary) !important;
}

.overlay{
  position: relative;
  display: none !important;
}

/* .sf-header-navigation-item__menu-item{
  height: 500% !important;
  justify-content: baseline !important;
} */

.sf-header-navigation-item__item:hover .overlay{
  /* margin: 0 auto !important; */
  position: absolute;
  left: 22.5% !important;
  /* top: 19.5vh !important; */
  right: 22.5% !important;
  /* bottom: 38vh !important; */
  display: block !important;
  width: 55% !important;
  height: 40% !important;
  /* border: 0.1px solid var(--c-bg-primary) !important; */
  box-shadow: 1px rgb(0, 0, 0, 0.2);
  z-index: 1 !important;
}
</style>