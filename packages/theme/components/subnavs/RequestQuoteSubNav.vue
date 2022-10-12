<template>
  <nuxt-link to="/WriteAQuote">
    <div class="sf-header-navigation-item" v-on="$listeners">
      <div
        class="sf-header-navigation-item__item sf-header-navigation-item__item--mobile -ml-14"
      >
        <slot name="mobile-navigation-item w-full">
          <!-- <SfMenuItem
            label="REQUEST QUOTE"
            class="sf-header-navigation-item__menu-item"
          >
          </SfMenuItem> -->
          <p class="text-xl font-bold text-secondary">REQUEST QUOTE</p>
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
