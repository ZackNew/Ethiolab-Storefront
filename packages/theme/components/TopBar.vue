<template>
  <SfTopBar class="topbar">
    <template #left>
        <SfButton class="topbar__button sf-button--text">+251-111-264-829</SfButton>
      </template>
    <template #center>
      <div class="flex items-center gap-20">
      <DropdownNavigationItem
                  v-for="category in headerNavigation"
                  :key="category.name"
                  class="nav-item"
                  v-e2e="`app-header-${category.name}`"
                  :label="category.name"
                  :link="localePath(category.link)"
                  :link-class="category.linkClass"
                  :button="category.button"
                />
      </div>
      </template>
      <template #right>
        <LocaleSelector />
        <ThemeChanger/>
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector.vue';
import DropdownNavigationItem from '~/components/DropdownNavigationItem.vue';
import ThemeChanger from "./ThemeChanger.vue";

export default {
  components: {
    ThemeChanger,
    SfTopBar,
    SfButton,
    LocaleSelector,
    DropdownNavigationItem
  },
  setup() {
      const headerNavigation = [
        { name: 'Help', link: '/pages/helpAndFAQ' },
        { name: 'Contact us', link: '/pages/contact'},
        { name: 'Help center', link: '/pages/helpAndFAQ'},
         { name: 'Request a Quote', link: '/WriteAQuote'},
      ];
    return{
      headerNavigation
    }
  }
};

</script>
<style lang="scss" scoped>
.sf-button--text{
  color: white;
}
.nav-item{
  white-space: nowrap;
  align-items: center;
  font-size: larger;
}
.nav-item:hover{
  transform: scale(1.1);
}
.topbar {
  background-color: var(--c-bg-secondary);
  color:white;
  position: relative;
  z-index: 2;
  &__button {
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
