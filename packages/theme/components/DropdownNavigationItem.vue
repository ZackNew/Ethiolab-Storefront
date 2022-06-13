<template>
  <div class="sf-header-navigation-item">
    <div class="text-center">
      <div>
        <slot name="desktop-navigation-item">
          <button v-on:click="!button?$router.push({path:link}):toggleQuoteModal()" :class="`sf-header-navigation-item__link text-wrap text-sm `+linkClass">{{
              label
            }}
          </button>
        </slot>
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
import {SfLink, SfMenuItem} from '@storefront-ui/vue';
import {useUiState} from "~/composables";

export default {
  name: 'DropdownNavigationItem',
  components: {
    SfLink,
    SfMenuItem,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    link: {
      type: [String, Object],
      default: '',
    },
    linkClass:{
      type:String,
      default:null,
    },
    button:{
      type:Boolean,
      default:false
    },
  },
  setup(){
    const { toggleQuoteModal } = useUiState();
    return {
      toggleQuoteModal
    }
  }
};
</script>
<style lang="scss">
.dropdown-button .sf-header-navigation-item__item {
}

.sf-header-navigation-item__link {
  color: white;

}
.background{
  background-color: var(--c-primary);
}


</style>
