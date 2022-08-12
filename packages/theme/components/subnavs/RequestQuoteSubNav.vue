<template>
    <nuxt-link to="/WriteAQuote">
       <div class="sf-header-navigation-item" v-on="$listeners">

        <div
      class="
        sf-header-navigation-item__item sf-header-navigation-item__item--mobile
      "
    >
      <slot name="mobile-navigation-item">
       <SfMenuItem label="REQUEST QOUTE" class="sf-header-navigation-item__menu-item">
    

        </SfMenuItem>
      </slot>
      </div>
       </div>
    </nuxt-link>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { SfMenuItem, SfModal } from '@storefront-ui/vue';


export default defineComponent({
  components:{
    SfMenuItem
  },
  setup() {
    
  },
})
</script>
