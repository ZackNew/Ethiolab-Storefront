<template>
  <div class="m-12 ">
    <!-- <p class="sf-heading__description m-4 font-xs mt-6">
      {{ $t('search with in these results:') }}
    </p> -->
    <div class="relative m-2 w-80 mb-12  ">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none "
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
        class="block p-2 pl-10 mt-12 h-14 rounded-2xl border bg-light_gray border-white focus:ring-faded_black focus:border-light_accent dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for product"
        @input="sendChanges"
      />
    </div>
    <!-- filter options -->
    <SfAccordion class="px-2" open="all" showChevron>
      <SfAccordionItem v-if="categories" header="category" class="sf-accordion">
        <ul class="ml-3" v-for="category in categories" :key="category">
          <li class="mb-3">
            <!-- <a href="# ">{{'df'+ category }}</a> -->
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
            {{ category }}
          </li>
        </ul>
      </SfAccordionItem>
    </SfAccordion>
    
    <!-- <SfAccordion
      v-for="filter in filters"
      :key="$t(filter.filter_title)"
      class="mb-2 px-2 accordion-bg"
      open="all"
      showChevron
    >
      <SfAccordionItem
        v-if="filter.filter_options.length !== 0"
        :header="filter.filter_title"
        class="sf-accordion -mb-4 bg-primary"
      >
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
    </SfAccordion> -->
    
    <vsa-list :autoCollapse="false" :initActive="true" :heading="true">
  <!-- Here you can use v-for to loop through items  -->
  <vsa-item  v-for="filter in filters"
      :key="$t(filter.filter_title)">
    
    <vsa-heading class="border-none">
      <div> 
        {{filter.filter_title}} 
      </div>

      <div> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      <!-- <table>
        <tr >
          <td  colspan="4">{{filter.filter_title}} </td>
          <td></td>
          <td></td>
          <td></td>

          <td colspan="1">   
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
  </td>
        </tr>
      </table> -->
      
     
 
    </vsa-heading>
 
    <vsa-content v-for="list in filter.filter_options" :key="list">
      <ul class="ul_list" v-for="list in filter.filter_options" :key="list">
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
    </vsa-content>
  </vsa-item>
</vsa-list>

    <p class="text-xl mx-2 mt-2 mb-2">Price Range</p>
    <ul class="ul_list" >
      <div v-for="list in range" :key="list">
        <li class="ml-3">
                  <fieldset id="group1">

                  </fieldset>
                  <input
                    type="radio"
                    class="mr-4"
                    :checked="false"
                    :id="list"
                    @input="() => bothInput(list)"
                    name="group1"
                  />
                  {{ list.minrange }} - {{list.maxrange}}
                </li>
      </div>
       
        </ul>
    <div class="flex mx-4">



      <input
        v-model="min"
        @input="minInput"
        class="rounded border border-primary w-20"
        type="number"
        placeholder="min..."
      />
      <p class="mx-2">to</p>
      <input
        v-model="max"
        @input="maxInput"
        class="rounded border border-primary w-20"
        type="number"
        placeholder="max..."
      />
    </div>
  </div>
</template>

<script>
import { SfAccordion, SfSearchBar } from '@storefront-ui/vue';
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon
} from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';

export default {
  name: 'SubcategoryBrandAccordion',
  components: {
    SfAccordion,
    SfSearchBar,
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon
  },
  data() {
    return {
      max: null,
      min: null,
      range: [{minrange: 50, maxrange: 1999}, {minrange: 2000, maxrange: 9999}, {minrange: 10000, maxrange: 50000}]
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
    bothInput(range){
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
  },
  created() {},
};
</script>

<style lang="scss">


// the Heading block
.vsa-item__trigger{
  height:20px;
  background-color: white;
  color: #b6932f;


}

.vsa-item__trigger :hover{
  background-color: white;
  color: #b6932f;

}

// the whole block
.vsa-list{
  border-style: none;
  width: 100%;

}
.vsa-list :hover{
background-color: white;
// color: #b6932f;
}

.vsa-list :focus{
background-color: white;
color: #b6932f;

}
.vsa-item__trigger__content{
  // background-color: black;
  display: flex;
  justify-content: space-between;
  width: 90%;

}


.vsa-item :hover{
  color: #3860a7;
}



.vsa-item__trigger__icon{
  display: none;
  // color: #b6932f;
  // background-color: green;

}

.vsa-item__heading{
  display: flex;
    border-style: none;
}

.title{
  float: left;
  margin-right: 80px;
  font-size: 22px;
  // min-width: 150px;
}

.title :hover{
  color: #b6932f;
}
.icon{
  float: left;
  margin-right: 10px;
}

.vsa-item__content{
  font-size: 18px;
  color: #3860a7;
}

.ul_list :hover{
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
