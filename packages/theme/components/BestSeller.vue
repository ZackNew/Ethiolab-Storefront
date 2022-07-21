<template>
  <div>
  <h3 class="font-bold mt-12 pb-2 border-b border-gray-200">Best Seller</h3>
    <div class="grid grid-cols-3 gap-10 mt-10 mb-10" >

      <div v-for="category in categories" :key="category.title">
          <BestSellerSingle :title="category.title" :image="category.image" />
      </div>
    </div>
  </div>
    
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import BestSellerSingle from './BestSellerSingle.vue'

export default defineComponent({
  components: {  BestSellerSingle },
    setup() {
      const categories = [
        {title:"Balance and Scales", image:"/categories/cat1.jpeg"},
        {title:"Calibration" , image:"/categories/cat2.jpeg"},
        {title:"Electrical Products" , image:"/categories/cat3.jpeg"},
        {title:"Filtration Products" , image:"/categories/cat4.jpg"},
        {title:"Flowmeters" , image:"/categories/cat5.jpg"}
      ]

      return {
        categories
      }
        
    },
    })
</script>



<style scoped>

</style>