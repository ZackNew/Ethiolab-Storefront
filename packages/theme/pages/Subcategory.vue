<template>
  <div>
    <div class="flex ml-14">
      <div class="shadow-lg m-4 w-2/5 border-2">
        <p class="m-2 font-xs">search with in these results:</p>
      </div>
      <div>
        <h3>
          Balaces and Scales
        </h3>
        <div class="card shadow-lg m-4 flex w-auto mr-16">
            <img class="h-32 w-32 my-auto" src="../static/icon.png" alt="">
            <p class="bg-dark my-auto p-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptates illum consequatur necessitatibus voluptas, autem amet nostrum in eos officia maxime voluptate possimus sapiente delectus eum ipsam. Explicabo, aspernatur fuga.
            </p>
        </div>
        <div style="background-color: #C7C6C1;" class="card mr-16 ml-4 w-auto h-12">
          <p class="pt-3 ml-3">number of Results  |  sortby</p>
        </div>
        <div class="card grid grid-cols-4">
          <div
            class="card shadow-lg w-52"
            v-for="i in 7"
            :key="i">
            <img src="../static/icon.png" alt="">
            <h3 class="text-center m-3">link</h3>
            <h4 class="text-center font-serif m-3">
              $925.00 - $2,080.00USD / Each
            </h4>
            <p class="text-center m-3">description</p>
            <button class="mx-12 my-4 bg-dark text-white font-bold py-2 px-4 rounded ">View All</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SfCard, SfProductCard } from '@storefront-ui/vue';

export default {
  components: {
    SfCard,
    SfProductCard,
  },
}
</script>

<style>

</style>