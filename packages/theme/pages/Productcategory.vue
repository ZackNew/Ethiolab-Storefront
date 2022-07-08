<template>
   
    <div class="mt-10">
         <div class="">
         <h1 class="bg-[url('/categories/catback3.jpg')] pt-20 grid h-30 place-items-center">Balance and Scales</h1>

         </div>
         <div class="grid grid-cols-4 gap-10 mt-10 mb-10 ">
            <div class="max-w-sm rounded overflow-hidden shadow-xl ">
                <h3  class="font-bold ml-5">Categories</h3>
                <div v-for="category in categories" :key="category.cat_name" class="ml-10">
                <h4 class="m-3 font-normal">{{category.cat_name}}</h4>

                </div>

            </div>

         </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        const categories = [
           { cat_name: "Weighing Accessories"},
           { cat_name: "Toploading Balances"},
           { cat_name: "Bench and Floor Scales"},
           { cat_name: "Analytical Balances"},
           { cat_name: "Weighing Dishes"},
           { cat_name: "Semi and Micro Analytical Balances"},

        ];

        return {
            categories
        }
        
    },
})
</script>

<style scoped>

</style>