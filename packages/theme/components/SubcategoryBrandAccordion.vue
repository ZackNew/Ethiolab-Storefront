<template>
  <div class="m-[5%]">
    <!-- <p class="sf-heading__description m-4 font-xs mt-6">
      {{ $t('search with in these results:') }}
    </p> -->
    <div class="relative m-2 max-w-[100%] mb-[12%]">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <svg
          :style="
            !isDarkMode
              ? 'color: black !important'
              : 'color: white !important'
          "
          aria-hidden="true"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
        class="max-w-[100%] block px-2 py-1 pl-10 mt-12 h-14 rounded-2xl border border-white focus:border-light_accent"
        :style="
        !isDarkMode
          ? 'background-color: #f0f7fc !important '
          : 'background-color: #0e1621 !important; color: white'
        "
        placeholder="Search for product"
        @input="sendChanges"
      />
    </div>

    <div class="ml-2">
      <Accordion v-if="categories" class="mb-[6%]">
      <template v-slot:title>
        <span class="text-[18px]">Category</span>
      </template>
      <template v-slot:content>
        <ul
            class="ul_list mt-[2%]"
            v-for="category in categories"
            :key="category"
            :style="
              !isDarkMode
                ? 'background-color: white'
                : 'background-color: #182533'
            "
          >
            <li class="ml-3 flex">
              <input
                v-on:click="
                  (e) => {
                    checkOne(e, filterClicked);
                  }
                "
                type="checkbox"
                name="categories"
                class="mr-4"
                :checked="false"
                :id="category"
              />
              <h4 class="text-secondary text-[18px]">{{ category }}</h4>
            </li>
          </ul>
      </template>
    </Accordion>

    <div v-for="filter in filters" :key="filter.filter_title">
      <Accordion class="mb-[6%]" v-if="filter.filter_options.length > 0">
        <template v-slot:title>
          <span class="text-[18px]">{{ filter.filter_title }}</span>
        </template>
        <template v-slot:content>
          <p>
            <ul
            class="ul_list mt-[2%]"
            v-for="(list, i) in filter.filter_options"
            :key="i"
          >
            <li class="mx-3 flex text-[18px]">
              <input
                v-on:click="filterClicked"
                type="checkbox"
                name="otherFiilters"
                class="mr-4"
                :checked="false"
                :id="list"
              />
              <h4 class="text-secondary text-[18px]">{{ list }}</h4>
            </li>
          </ul>
          </p>
        </template>
      </Accordion>
    </div>
    </div>

    <h4 class="text-[18px] mx-2 mt-2 mb-6 text-secondary font-bold">Price Range</h4>
    <ul class="ul_list">
      <div v-for="(list, i) in range" :key="i">
        <li class="ml-3 text-secondary text-[18px]">
          <input
            type="radio"
            class="mr-4 text-secondary "
            :checked="false"
            :id="list"
            @input="() => bothInput(list)"
            name="group1"
          />
          {{ list.minrange }} ETB - {{ list.maxrange }} ETB
        </li>
      </div>
    </ul>
    <div class="flex mx-2 my-8">
      <input
        v-model="min"
        @input="minInput"
        class="rounded-md border border-primary w-28 bg-[#c3defa]"
        type="number"
        placeholder="Min..."
      />
      <p class="mx-2">to</p>
      <input
        v-model="max"
        @input="maxInput"
        class="rounded-md border border-primary w-28 bg-[#c3defa]"
        type="number"
        placeholder="Max..."
      />
    </div>
    <button @click="clearAllFilters" class="bg-secondary text-white rounded w-full py-1 text-center">Clear All Filters</button>
    <div class="mt-5 hidden md:block">
          <LazyHydrate>
            <!-- :buttonText="adSection.buttonText || 'AD Button'" -->
            <Banner
              :title="adSection.title || 'AD Title'"
              :subtitle="adSection.overview || 'AD Overview'"
              :description="adSection.description || 'AD Description'"
              background=""
              :image="adImage || '/homepage/bannerA.webp'"
              link="/c/clinical-laboratory"
            >
            </Banner>
          </LazyHydrate>
        </div>
  </div>
</template>

<script>
import { useUiHelpers, useUiState } from '~/composables';
import { SfAccordion, SfSearchBar } from '@storefront-ui/vue';
import { computed, ref } from '@vue/composition-api';
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon,
} from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';
import Accordion from './Accordion.vue';
import Banner from '~/components/Banner.vue';
import { useCms } from '@vue-storefront/vendure';

export default {
  name: 'SubcategoryBrandAccordion',
  components: {
    SfAccordion,
    SfSearchBar,
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
    Banner,
    Accordion,
  },
  data() {
    return {
      max: null,
      min: null,
      range: [
        { minrange: 50, maxrange: 1999 },
        { minrange: 2000, maxrange: 9999 },
        { minrange: 10000, maxrange: 49999 },
        { minrange: 50000, maxrange: 100000 },
      ],
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
    categoryClicked(event) {
      this.$emit('categoryClicked', event.target);
    },
    maxInput(event) {
      this.$emit('maxAdded', this.max);
    },
    minInput(event) {
      this.$emit('minAdded', this.min);
    },
    bothInput(range) {
      this.$emit('minAdded', range.minrange);
      this.$emit('maxAdded', range.maxrange);
    },
    sendChanges(event) {
      this.$emit('searchChange', event.target.value);
    },
    checkOne(checkbox, filterClicked) {
      filterClicked(checkbox);
      var checkboxes = document.getElementsByName('categories');
      checkboxes.forEach((item) => {
        if (item.getAttribute('id') !== checkbox.target.getAttribute('id')) {
          if (item.checked) {
            item.click();
            checkbox.target.click();
          }
        }
      });
    },
    filterClicked(event) {
      this.$emit('filterClicked', event.target);
    },
    clearAllFilters(){
      this.min = ''
      this.max = ''
      var categoryCheckbox = document.getElementsByName('categories');
      var otherCheckbox = document.getElementsByName('otherFiilters');
      var priceRadio = document.getElementsByName('group1');
      categoryCheckbox.forEach((item) => {item.checked = false})
      otherCheckbox.forEach((item) => {item.checked = false})
      priceRadio.forEach((item) => {item.checked = false})
      this.$emit('clearClicked')
    }
  },
  setup() {
    const { isDarkMode } = useUiState();
    const { getCms } = useCms();
    const adSection = computed(() =>
      JSON.parse(getCms.value[3]?.content ?? '{}')
    );
    const adImage = computed(() => getCms.value[3]?.featuredAsset.preview);
    return {
      isDarkMode,
      adSection,
      adImage
    };
  },
};
</script>

<style lang="scss">
// the Heading block
.vsa-item__trigger {
  height: 20px;
  background-color: white;
  color: #b6932f;
}

.vsa-item__trigger :hover {
  background-color: white;
  color: #b6932f;
}

// the whole block
.vsa-list {
  border-style: none;
  width: 100%;
}
.vsa-list :hover {
  background-color: white;
  // color: #b6932f;
}

.vsa-list :focus {
  background-color: white;
  color: #b6932f;
}
.vsa-item__trigger__content {
  // background-color: black;
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.vsa-item :hover {
  color: #3860a7;
}

.vsa-item__trigger__icon {
  display: none;
  // color: #b6932f;
  // background-color: green;
}

.vsa-item__heading {
  display: flex;
  border-style: none;
}

.title {
  float: left;
  margin-right: 80px;
  font-size: 22px;
  // min-width: 150px;
}

.title :hover {
  color: #b6932f;
}
.icon {
  float: left;
  margin-right: 10px;
}

.vsa-item__content {
  font-size: 18px;
  color: #3860a7;
}

.ul_list :hover {
  color: #3860a7;
}
.vsa-item {
  $item: &;

  &:not(:last-of-type) {
    border-bottom: var(--vsa-border);
  }

  &__heading {
    #{$item}--is-active & {
      border-bottom: var(--vsa-border);
    }
  }
}
</style>
