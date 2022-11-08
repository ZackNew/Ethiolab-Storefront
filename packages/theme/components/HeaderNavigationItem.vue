<template>
  <div class="sf-header-navigation-item" v-on="$listeners">

    <div
      class="sf-header-navigation-item__item sf-header-navigation-item__item--mobile"
    >
      <slot name="mobile-navigation-item">

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

      </slot>

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
  position: absolute;
  display: none !important;
  border-radius: 12px;
  border-color: white;
}

.sf-header-navigation-item__item:hover .overlay {
  /* margin: 0 auto !important; */
  position: absolute;
  left: 7.5% !important;
  /* top: 19.5vh !important; */
  right: 7.5% !important;
  /* bottom: 38vh !important; */
  display: block !important;
  width: 85% !important;
  height: 60% !important;
  /* border: 0.1px solid var(--c-bg-primary) !important; */
  box-shadow: 6px 3px 5px rgb(139, 139, 139);
  border: solid 1px rgb(194, 194, 194);
  z-index: 10 !important;
}
</style>
