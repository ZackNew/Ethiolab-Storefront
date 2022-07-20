<template>
  <div>
  <h3 class="font-bold mt-12 pb-2 border-b border-gray-200">Featured Categories</h3>
    <div class="grid grid-cols-3 gap-10 mt-10 mb-10" >

      <div v-for="category in headerNavigation" :key="category.label">
          <!-- <CategorySingle :title="category.label" :image="category.featuredAsset.preview" /> -->
                 <div class="max-w-sm rounded overflow-hidden shadow-xl">
       
           <div class="m-4">
                  <h4 class="">{{category.label}}</h4>
             </div>
            <img v-if="category.featuredAsset" :src="category.featuredAsset.preview" class="w-full h-32 sm:h-48 object-cover" />
  
        </div>
      </div>
    </div>
  </div>
    
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api'
import CategorySingle from './CategorySingle.vue'
import HeaderSubNavigation from './HeaderSubNavigation.vue';
import { useCategory, categoryGetters,useFacet, facetGetters,useCms } from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

export default defineComponent({
  components: { CategorySingle },
      created(){
        this.getTree();
        // console.log(this.headerNavigation);
    },
    setup() {
              const headerNavigation = [];
        const {categories} = useCategory();

            const getTree = ()=>{
        categories.value.items.forEach((a)=>{
            if (a.parent.name === "__root_collection__") {
                headerNavigation.push(facetGetters.getTree(a));
                // console.log("category featured asset  val is ", a.featuredAsset.preview)
           }
        });
        };
      const cats = [
        {title:"Balance and Scales", image:"/categories/cat1.jpeg"},
        {title:"Calibration" , image:"/categories/cat2.jpeg"},
        {title:"Electrical Products" , image:"/categories/cat3.jpeg"},
        {title:"Filtration Products" , image:"/categories/cat4.jpg"},
        {title:"Flowmeters" , image:"/categories/cat5.jpg"}
      ]
              // console.log("the header navigation value is ", headerNavigation)

      // onMounted(()=> {
      //   console.log("the header navigation value is ", headerNavigation)
      // })

      return {
        cats,
           getTree,
            headerNavigation,
      }
        
    },
    })
</script>



<style scoped>

</style>