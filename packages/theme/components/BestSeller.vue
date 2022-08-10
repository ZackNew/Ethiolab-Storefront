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
        {title:"Balance and Scales", image:"/categories/empty_image.png"},
        {title:"Calibration" , image:"/categories/empty_image.png"},
        {title:"Electrical Products" , image:"/categories/empty_image.png"},
        // {title:"Filtration Products" , image:"/categories/cat4.jpg"},
        // {title:"Flowmeters" , image:"/categories/cat5.jpg"}
      ]

      return {
        categories
      }
        
    },
    })
</script>



<style scoped>

</style>