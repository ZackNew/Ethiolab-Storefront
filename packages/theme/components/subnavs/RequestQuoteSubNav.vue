<template>
  <nuxt-link to="/WriteAQuote">
    <div class="sf-header-navigation-item" v-on="$listeners">
      <div
        class="sf-header-navigation-item__item sf-header-navigation-item__item--mobile"
      >
        <slot name="mobile-navigation-item w-full">
          <!-- <SfMenuItem
            label="REQUEST QUOTE"
            class="sf-header-navigation-item__menu-item"
          >
          </SfMenuItem> -->
          <h1 class="text-lg font-bold text-secondary">REQUEST QUOTE</h1>
        </slot>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { SfMenuItem, SfModal } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfMenuItem,
  },
  setup() {},
});
</script>
