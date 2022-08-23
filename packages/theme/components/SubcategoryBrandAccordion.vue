<template>
  <div class="m-2">
    <p class="sf-heading__description m-4 font-xs mt-6">
      search with in these results:
    </p>
    <div class="relative m-3">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        class="block p-2 pl-10 w-full rounded-lg border border-light_gray focus:ring-faded_black focus:border-light_accent dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for product"
        @input="sendChanges"
      />
    </div>
    <!-- filter options -->
    <SfAccordion
      v-for="filter in filters"
      :key="filter.filter_title"
      class="mb-2 px-2 accordion-bg"
      transition=""
      open="all"
      showChevron
    >
      <SfAccordionItem v-if="categories" header="category" class="sf-accordion">
        <ul class="ml-3" v-for="category in categories" :key="category">
          <li class="mb-3">
            <a href="# ">{{ category }}</a>
          </li>
        </ul>
      </SfAccordionItem>
      <SfAccordionItem :header="filter.filter_title" class="sf-accordion -mb-4">
        <ul v-for="list in filter.filter_options" :key="list">
          <li class="ml-3">
            <input
              v-on:click="filterClicked"
              type="checkbox"
              class="mr-4"
              :checked="false"
              :id="list"
            />
            {{ list }}
          </li>
        </ul>
      </SfAccordionItem>
    </SfAccordion>
    <p class="text-xl mx-4 mt-2 mb-2">Price Range</p>
    <div class="flex mx-4">
      <input
        v-model="min"
        @input="minInput"
        class="rounded border border-primary w-12"
        type="number"
        placeholder="min..."
      />
      <p class="mx-2">to</p>
      <input
        v-model="max"
        @input="maxInput"
        class="rounded border border-primary w-12"
        type="number"
        placeholder="max..."
      />
    </div>
  </div>
</template>

<script>
import { SfAccordion, SfSearchBar } from '@storefront-ui/vue';

export default {
  name: 'SubcategoryBrandAccordion',
  components: {
    SfAccordion,
    SfSearchBar,
  },
  data() {
    return {
      max: null,
      min: null,
    };
  },
  props: {
    categories: {
      type: Array,
      required: false,
    },
    filters: {
      type: Array,
      required: true,
    },
  },
  methods: {
    maxInput(event) {
      this.$emit('maxAdded', this.max);
    },
    minInput(event) {
      this.$emit('minAdded', this.min);
    },
    sendChanges(event) {
      this.$emit('searchChange', event.target.value);
    },
    filterClicked(event) {
      this.$emit('filterClicked', event.target);
    },
  },
};
</script>

<style></style>
