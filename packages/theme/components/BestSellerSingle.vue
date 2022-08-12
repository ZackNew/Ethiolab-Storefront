<template>
       <div class="max-w-sm rounded overflow-hidden shadow-xl">
       
           <div class="m-4">
                  <h4 class="">{{title}}</h4>
             </div>
            <img :src="image" class="w-full h-32 sm:h-48 object-cover scale-100 hover:scale-75 ease-out duration-300" />
  
        </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
    props:['title','image']

})
</script>

<style scoped>

</style>