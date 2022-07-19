<template>
  <div class="ml-10">
    <p class="mt-4 mb-2 text-sm text-gray">
      <NuxtLink to="/">Home</NuxtLink> | <NuxtLink to="#">Shope by brand</NuxtLink> | 
      <span>brand name</span>
    </p>
    <!-- Side Bar -->
    <div class="flex">
      <div class="shadow-2xl rounded w-2/6 h-3/4">
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
            <SfAccordionItem header="category" class="sf-accordion">
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

      <!-- Main Content -->
      <div class="ml-4">
        <h2 class="sf-heading__title font-light text-4xl font-sans text-gray">Cole Parmer</h2>
        <div class="card shadow-lg mt-4 flex w-auto mr-10">
          <img
            class="h-36 w-auto my-auto bg-light"
            src="../static/icon.png"
            alt=""
          />
          <div class="bg-faded_black">
            <p class="py-4 ml-4 mr-4 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              voluptates illum consequatur necessitatibus voluptas, autem amet
              nostrum in eos officia maxime voluptate possimus sapiente delectus
              eum ipsam. Explicabo, aspernatur fuga.
            </p>
          </div>
        </div>

        <div class="card mr-10 mt-5 h-12 bg-light_accent">
          <p class="float-left pt-3 ml-3">Number of Results | sortby</p>
          <button class="mt-2 ml-3 bg-dark p-1">Best Match</button>
        </div>

        <div class="grid grid-cols-4">
          <div class="card shadow-lg w-52 my-3 bg-light_accent" v-for="i in 10" :key="i">
            <img src="../static/homepage/productC.webp" alt="" />
            <h3 class="text-center m-3">link</h3>
            <h4 class="text-center font-serif m-3">
              $925.00 - $2,080.00USD / Each
            </h4>
            <p class="text-center m-3">description</p>
            <button
              class="mx-12 my-4 bg-dark text-white font-bold py-2 px-4 rounded"
            >
              View All
            </button>
          </div>  
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { SfAccordion, SfSearchBar } from "@storefront-ui/vue";
export default {
  data() {
    return {
      filters: [
        {
          filter_title: 'Brand',
          filter_options: ['Sartorius', 'Ohaus', 'Cole parmer'],
        },
        { filter_title: 'Color', filter_options: ['Indigo', 'yellow', 'Cyan'] },
        {
          filter_title: 'Price Range',
          filter_options: [
            '1000 ETB and less',
            '1000 to 10,000 ETB',
            '10,000 ETB and more',
          ],
        },
        {
          filter_title: 'Calibration Type',
          filter_options: ['Internal', 'External', 'Internal Calibration'],
        },
        { filter_title: 'Capacity', filter_options: ['0.22', '0.31', '0.33'] },
      ],
      categories: [
        'Laboratory equipment', 'Laboratiory Supplies', 'Water Quality Products', 'Test and Measurment', 'Heating and Cooling'
      ],
    };
  },
  components: {
    SfAccordion,
    SfSearchBar,
  },
}
</script>

<style>

</style>