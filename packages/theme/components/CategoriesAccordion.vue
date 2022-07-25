<template>
  <div>
    <div v-for="category in headerNavigation" :key="category.id">
      <SfAccordion
        class="accordion"
        :open="openState"
        :multiple="false"
        transition=""
        showChevron
      >
        <SfAccordionItem :header="category.label">
          <SfList class="ml-5">
            <SfListItem>
              <SfMenuItem :count="category.count || ''" :label="category.label">
                <template #label>
                  <nuxt-link
                    :to="'/c/' + category.slug"
                    :class="
                      category.isCurrent ? 'sidebar--cat-selected' : 'mb-3 '
                    "
                    @click.native="closeSideNav()"
                  >
                    All
                  </nuxt-link>
                </template>
              </SfMenuItem>
            </SfListItem>
            <SfListItem
              v-for="subCat in getSubCategory(category)"
              class="border-b-2 mb-3"
              :key="subCat.id"
            >
              <SfMenuItem :label="subCat.label">
                <template #label="{ label }">
                  <nuxt-link
                    :to="'/s/' + subCat.slug"
                    :class="subCat.isCurrent ? 'sidebar--cat-selected' : 'mb-3'"
                    @click.native="closeSideNav()"
                  >
                    {{ label }}
                  </nuxt-link>
                </template>
              </SfMenuItem>
            </SfListItem>
          </SfList>
        </SfAccordionItem>
      </SfAccordion>
    </div>
  </div>
</template>

<script>
import { SfAccordion, SfList, SfMenuItem } from '@storefront-ui/vue';
import { facetGetters, useCategory } from '@vue-storefront/vendure';
import { useUiState } from '~/composables';

export default {
  name: 'CategoriesAccordion',
  components: {
    SfAccordion,
    SfMenuItem,
    SfList,
  },
  created() {
    this.getTree();
  },
  props: {
    openState: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const headerNavigation = [];
    const { categories } = useCategory();
    const getTree = () => {
      categories.value.items.forEach((a) => {
        if (a.parent.name === '__root_collection__') {
          headerNavigation.push(facetGetters.getTree(a));
        }
      });
    };
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const getSubCategory = (category) => {
      return isMobileMenuOpen.value
        ? category.items.slice(0, 6)
        : category.items;
    };
    const closeSideNav = () => {
      if (isMobileMenuOpen.value) {
        toggleMobileMenu();
      }
    };
    return {
      headerNavigation,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeSideNav,
      getSubCategory,
      getTree,
    };
  },
};
</script>

<style lang="scss" scoped>
.accordion {
  --accordion-item-header-font: 10px;
  --accordion-item-header-color: var(--c-primary);
  --accordion-item-content-font-size: 5px;
}
</style>
