<template>
  <div class="shadow-2xl rounded ml-4 w-2/6 h-3/4">
        <div class="m-2">
          <p class="sf-heading__description m-2 font-xs mt-6">search with in these results:</p>
          <div class="my-2">
            <SfSearchBar
              placeholder="Search for items"
              :value="null"
              :icon='{"icon":"search","size":"1.25rem","color":"#43464E"}'
              aria-label="Search"
              class="w-10/12 mx-2 border rounded bg-light_accent"
            />
          </div>

          <!-- filter options -->
          <SfAccordion 
            v-for="filter in filters"
            :key="filter.filter_title" 
            class="mb-2 px-2 accordion-bg" transition="" open="all" showChevron>
            <SfAccordionItem v-if="categories" header="category" class="sf-accordion">
              <ul class="ml-3" v-for="category in categories" :key="category">
                <li class="mb-3"><a href="# ">{{ category }}</a></li>
              </ul>
            </SfAccordionItem>
            <SfAccordionItem :header="filter.filter_title" class="sf-accordion -mb-4">
              <ul v-for="list in filter.filter_options" :key="list">
                <li class="ml-3"><input type="checkbox" class="mr-4" /> {{ list }} </li>
              </ul>
            </SfAccordionItem>
          </SfAccordion>
        </div>
      </div>
</template>

<script>
import { SfAccordion, SfSearchBar } from "@storefront-ui/vue";

export default {
  name: "SubcategoryBrandAccordion",
  components: {
    SfAccordion,
    SfSearchBar, 
  },
  props: {
    categories: {
      type: Array,
      required: false
    },
    filters: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>