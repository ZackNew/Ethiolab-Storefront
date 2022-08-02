<template>
  <div> 
            <div class="grid grid-cols-5 "> 
                <div class="col-span-2 m-10">
                 
                    <img :src="products.featuredAsset.preview || '' " class="h-96" />
                       <div class="grid grid-cols-3"> 
                        <img :src="products.featuredAsset.preview || '' " class="col-span-1 mt-5" />

                        </div>

                </div>

                <div class="col-span-3 m-10 "> 
                    <p class="font-semibold text-2xl">{{products && products.name}}</p>
                    <!-- <P class="text-secondary mt-5"></P> -->

                    <div class="grid grid-cols-2">
                        <div class="col-span-1 overflow-auto h-96 mt-10"> 
                            <p v-html="products && products.description"></p>

                            <!-- <span> 
                                <p class="text-secondary mb-3"> MORE +</p>
                            </span> -->

                        </div> 
                        <div class="col-span-1"> 
                            <span class="text-xl font-bold ml-10 mr-5 mt-10">{{minPrice}}.00$ - {{maxPrice}}.00$</span> <span>USD/EACH</span>
                            <div class="h-20 bg-light_gray ml-5 mt-10">
                                    <p class="m-5">{{product && product.length}} variations of this product are available.</p>
                                    <a href="#var-table" class="text-secondary text-sm m-5 font-bold">SEE ALL PRODUCT OPTIONS BELOW</a>
                                </div>

                        </div>

                    </div>

                </div>

            </div>

            <table class="table-auto border-collapse border-spacing-2 border border-slate-100 mt-20" id="var-table">
                <thead>
                    <tr>
                        <div class=" grid grid-cols-12">
                            
                            <th class="border border-slate-300  h-16 bg-light_gray col-span-4">Item</th>
                            <th class="border border-slate-300  bg-light_gray col-span-1">Calibration Type</th>
                            <th  class="border border-slate-300 bg-light_gray col-span-1">Capacity (g)</th>
                            <th class="border border-slate-300 bg-light_gray col-span-1">Readability (g)</th>
                            <th class="border border-slate-300 bg-light_gray col-span-1">Availability</th>
                            <th class="border border-slate-300 bg-light_gray col-span-4">Pricing</th>
                        </div>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <div class="grid grid-cols-12"> 
                             <td class="border border-slate-300 col-span-4"> 
                            <div class="grid grid-cols-4"> 
                                <div class="col-span-2">
                                    <img src="/categories/cat7.jpeg" class="col-span-1 mt-5 ml-5" />
                                </div>
                                <div class="col-span-2">
                                    <!-- <a href="#" class="text-secondary ml-5">EW-10001-00</a> -->
                                    <nuxt-link to="/p/9/balancer">EW-10001-00</nuxt-link>
                                </div>

                            </div>
                        </td>
                            <td class="border border-slate-300 col-span-1">External</td>
                            <td class="border border-slate-300 col-span-1">120</td>
                            <td class="border border-slate-300 col-span-1">0.0001</td>
                            <td class="border border-slate-300 col-span-1">In Stock</td>
                            <td class="border border-slate-300 col-span-4">
                                <span class="text-xl font-bold ml-5 ">$1,370.00 - $1,850.00</span> <span>USD/EACH</span>
                                 <span>
                                    <input type="text" id="first_name" 
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                   focus:border-blue-500  w-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" value="1" required>
                                 </span> 
                                 <span class="b"> 
                                     <button class="">
                                    <img src="/categories/carticon.png" alt="cart image" class="h-16 -mb-8">
                                    </button>
                                 </span> 

                                 <div class="flex items-center mx-4 my-10">
                                     <input id="default-checkbox" type="checkbox" value=""  
                                         class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500
                                          dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                            @change="check($event)" v-model="checked">
                                     <label for="default-checkbox" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300 ">
                                            INCLUDE INNOCAL CALIBRATION SERVICES</label>
                                </div>

                                <div class="ml-10 mb-5" v-if="checked"> 
                                    <a class="text-secondary text-lg ">InnoCal NIST-Traceable Calibration: Balance/Scale - All Types</a>
                                    <p>for an additional <span class="font-bold">$200.00</span> USD / EACH</p>
                                </div> 
                        
                                  
                            </td>
                            
                        </div>
                   </tr>
                      <tr>
                        <div class="grid grid-cols-12"> 
                             <td class="border border-slate-300 col-span-4"> 
                            <div class="grid grid-cols-4"> 
                                <div class="col-span-2">
                                    <img src="/categories/cat7.jpeg" class="col-span-1 mt-5 ml-5" />
                                </div>
                                <div class="col-span-2">
                                    <a href="#" class="text-secondary ml-5">EW-10001-00</a>
                                </div>

                            </div>
                        </td>
                            <td class="border border-slate-300 col-span-1">External</td>
                            <td class="border border-slate-300 col-span-1">120</td>
                            <td class="border border-slate-300 col-span-1">0.0001</td>
                            <td class="border border-slate-300 col-span-1">In Stock</td>
                            <td class="border border-slate-300 col-span-4">
                                <span class="text-xl font-bold ml-5 ">$1,370.00 - $1,850.00</span> <span>USD/EACH</span>
                                 <span>
                                    <input type="text" id="first_name" 
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                   focus:border-blue-500  w-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" value="1" required>
                                 </span> 
                                 <span class="b"> 
                                     <button class="">
                                    <img src="/categories/carticon.png" alt="cart image" class="h-16 -mb-8">
                                    </button>
                                 </span> 

                                 <div class="flex items-center mx-4 my-10">
                                     <input id="default-checkbox" type="checkbox" value=""  
                                         class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500
                                          dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                            @change="check($event)" v-model="checked">
                                     <label for="default-checkbox" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300 ">
                                            INCLUDE INNOCAL CALIBRATION SERVICES</label>
                                </div>

                                <div class="ml-10 mb-5" v-if="checked"> 
                                    <a class="text-secondary text-lg ">InnoCal NIST-Traceable Calibration: Balance/Scale - All Types</a>
                                    <p>for an additional <span class="font-bold">$200.00</span> USD / EACH</p>
                                </div> 
                        
                                  
                            </td>
                            
                        </div>
                   </tr>
                    <tr>
                        <div class="grid grid-cols-12"> 
                             <td class="border border-slate-300 col-span-4"> 
                            <div class="grid grid-cols-4"> 
                                <div class="col-span-2">
                                    <img src="/categories/cat7.jpeg" class="col-span-1 mt-5 ml-5" />
                                </div>
                                <div class="col-span-2">
                                    <a href="#" class="text-secondary ml-5">EW-10001-00</a>
                                </div>

                            </div>
                        </td>
                            <td class="border border-slate-300 col-span-1">External</td>
                            <td class="border border-slate-300 col-span-1">120</td>
                            <td class="border border-slate-300 col-span-1">0.0001</td>
                            <td class="border border-slate-300 col-span-1">In Stock</td>
                            <td class="border border-slate-300 col-span-4">
                                <span class="text-xl font-bold ml-5 ">$1,370.00 - $1,850.00</span> <span>USD/EACH</span>
                                 <span>
                                    <input type="text" id="first_name" 
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                   focus:border-blue-500  w-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" value="1" required>
                                 </span> 
                                 <span class="b"> 
                                     <button class="">
                                    <img src="/categories/carticon.png" alt="cart image" class="h-16 -mb-8">
                                    </button>
                                 </span> 

                                 <div class="flex items-center mx-4 my-10">
                                     <input id="default-checkbox" type="checkbox" value=""  
                                         class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500
                                          dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                            @change="check($event)" v-model="checked">
                                     <label for="default-checkbox" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300 ">
                                            INCLUDE INNOCAL CALIBRATION SERVICES</label>
                                </div>

                                <div class="ml-10 mb-5" v-if="checked"> 
                                    <a class="text-secondary text-lg ">InnoCal NIST-Traceable Calibration: Balance/Scale - All Types</a>
                                    <p>for an additional <span class="font-bold">$200.00</span> USD / EACH</p>
                                </div> 
                        
                                  
                            </td>
                            
                        </div>
                   </tr>
                </tbody> 
            </table>
    </div>

  
    
</template>

<script>
import { defineComponent, onBeforeMount, onMounted } from '@vue/composition-api'
import { useCategory, categoryGetters , useProduct, productGetters} from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core'
import {computed} from "@vue/composition-api";
import { useUiHelpers } from '~/composables';
import { name } from 'file-loader';


export default defineComponent({
    setup() {

         const { products, search, loading, error } = useProduct('<UNIQUE_ID>');
        const th = useUiHelpers();
         const lastSlug = th.getLastSlugFromParams();
         console.log("the lastslug value is ", lastSlug)


        let checked = true;

       const check = (e) => {
            let temp = checked;
            checked = !temp;
        }
      
        
             onSSR(async () => {
            await search({ slug: lastSlug })  
              });


            const product = computed(() => productGetters.getByFilters(products.value));
            // const option = computed(() => productGetters.getOptions(products.value));
            // const configuration = computed(() => productGetters.getCategoryIds(product.value))

            const oiginalPrice = []
            const currentPrice = []

             product.value.forEach(element => {
                oiginalPrice.push(element.price.original)
                currentPrice.push(element.price.current)
                
            });

            const maxPrice = Math.max(...currentPrice).toString().slice(0, -2)
            const minPrice = Math.min(...currentPrice).toString().slice(0, -2)



            // const attributes = computed(() => productGetters.getAttributes(products.value))


    onMounted(() => {
        console.log("the product value is ", product.value)
        // console.log("the option value is ", option.value)
                console.log("the productsss value is ", products.value)

    })

        return {
            check,
            checked,
            loading,
            error,
            products,
            product,
            // option,
            // configuration,
            minPrice,
            maxPrice
        }
        
    },
})
</script>

<style scoped>

</style>