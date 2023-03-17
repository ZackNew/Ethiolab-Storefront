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
                      category.isCurrent
                        ? 'sidebar--cat-selected cl '
                        : 'mb-3 cl '
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
                    :class="
                      subCat.isCurrent
                        ? 'sidebar--cat-selected cl '
                        : 'mb-3 cl '
                    "
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
    <SfAccordion>
      <SfAccordionItem header="Brands">
        <SfList>
          <SfListItem v-for="brand in brands" :key="brand.id">
            <SfMenuItem :label="brand.name">
              <template #label="{ label }">
                <nuxt-link
                  :to="`/b/${label.toLowerCase()}/${brand.id}`"
                  class="mb-3 cl"
                  @click.native="closeSideNav()"
                >
                  {{ label }}
                </nuxt-link>
              </template>
            </SfMenuItem>
          </SfListItem>
        </SfList>
      </SfAccordionItem>
      <SfAccordionItem header="Industries">
        <SfList>
          <SfListItem v-for="industry in industries" :key="industry.id">
            <SfMenuItem :label="industry.name">
              <template #label>
                <nuxt-link
                  :to="`/i/${industry.name.toLowerCase()}/${industry.id}`"
                  class="mb-3 cl"
                  @click.native="closeSideNav()"
                >
                  {{ industry.name }}
                </nuxt-link>
              </template>
            </SfMenuItem>
          </SfListItem>
        </SfList>
      </SfAccordionItem>
    </SfAccordion>
  </div>
</template>

<script>
import axios from 'axios';
import { SfAccordion, SfList, SfMenuItem } from '@storefront-ui/vue';
import { facetGetters, useCategory } from '@vue-storefront/vendure';
import { useUiState } from '~/composables';

export default {
  name: 'CategoriesAccordion',
  data() {
    return {
      brands: [],
      industries: [],
    };
  },
  components: {
    SfAccordion,
    SfMenuItem,
    SfList,
  },
  created() {
    this.getBrandAndIndustry();
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
        if (a.parent?.name === '__root_collection__') {
          headerNavigation.push(facetGetters.getTree(a));
        }
      });
    };
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const getSubCategory = (category) => {
      return isMobileMenuOpen.value ? category.items : category.items;
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
  methods: {
    async getBrandAndIndustry() {
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `query{
          brands{
            id
            name
          }
          industries{
            id
            name
          }
        }`,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await axios.post(baseUrl, body, options).then((res) => {
        this.brands = res.data.data?.brands;
        this.industries = res.data.data?.industries;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion {
  font-family: var(--font-family--secondary);
  --accordion-item-header-font: 10px;
  --accordion-item-header-color: var(--c-secondary);
  --accordion-item-content-font-size: 5px;
}
.cl {
  color: var(--c-secondary);
}
</style>
