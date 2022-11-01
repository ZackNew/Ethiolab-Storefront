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
      class="sf-header-navigation-item__item sf-header-navigation-item__item--mobile"
    >
      <slot name="mobile-navigation-item">
        <!-- <SfMenuItem
          :label="label"
          @mouseOver="hoverHandler(label)"
          class="sf-header-navigation-item__menu-item text-lg"
        >
          {{ label }}
        </SfMenuItem> -->
        <h1
          @mouseOver="hoverHandler(label)"
          class="text-lg font-bold text-secondary"
        >
          {{ label }}
        </h1>
        <DropDownMenu
          class="overlay"
          :main="label"
          :subnavList="$props.subnavList"
        />
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
import DropDownMenu from './DropDownMenu.vue';
export default {
  name: 'HeaderNavigationItem',
  components: {
    SfLink,
    SfMenuItem,
    SfModal,
    DropDownMenu,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    subnavList: Array,
  },
  methods: {
    hoverHandler: (label) => {},
  },
};
</script>
<style scoped>
.sf-menu-item__label {
  /* margin: auto !important; */
  display: block !important;
  font-weight: bold;
}

.overlay {
  position: relative;
  display: none !important;
  border-radius: 12px;
  border-color: white;
}

.sf-header-navigation-item__item:hover .overlay {
  /* margin: 0 auto !important; */
  position: absolute;
  left: 12.5% !important;
  /* top: 19.5vh !important; */
  right: 22.5% !important;
  /* bottom: 38vh !important; */
  display: block !important;
  width: 75% !important;
  height: 50% !important;
  /* border: 0.1px solid var(--c-bg-primary) !important; */
  box-shadow: 6px 3px 5px rgb(139, 139, 139);
  border: solid 1px rgb(194, 194, 194);
  z-index: 10 !important;
}
</style>
