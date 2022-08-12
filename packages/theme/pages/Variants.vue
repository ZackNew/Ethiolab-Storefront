<template>
  <div> 
            <div class="grid grid-cols-12 "> 
               - <div class="col-span-5 m-3">
                    <LazyHydrate when-idle>
                      <SfGallery
                        :images="productGallery"
                        class="product__gallery w-auto"
                        :current="1"
                        :imageWidth="300"
                        :imageHeight="400"
                        :thumbWidth="160"
                        :thumbHeight="160"
                        :sliderOptions='{"autoplay":3000,"rewind":true,"gap":0}'
                        :outsideZoom="false"
                        :enableZoom="true"
                        
                      />
                    </LazyHydrate>
                    <!-- <!- <img :src="loading? '' : products.featuredAsset.preview" class="h-96" />
                       <div class="grid grid-cols-3"> 
                        <img :src="loading? '' : products.featuredAsset.preview"  class="col-span-1 mt-5" />
        </div> --> 
          
            </div>


                <div class="col-span-6 m-3 "> 
                    <p class="font-semibold text-2xl">{{products && products.name}}</p>
                    <!-- <P class="text-secondary mt-5"></P> -->

                    <div class="grid grid-cols-3">
                        <div class="col-span-2 overflow-auto h-96 mt-10"> 
                            <p v-html="products && products.description"></p>

            <!-- <span> 
                                <p class="text-secondary mb-3"> MORE +</p>
                            </span> -->

                        </div> 
                        <div class="col-span-1"> 
                            <span class="text-xl font-bold mt-10"><span>Price </span>{{minPrice}} - {{maxPrice}}</span>
                            <div class="h-20 bg-light_gray ml-5 mt-10">
                                    <p class="m-5 float-left">{{product && product.length}} variations of this product are available.</p>
                                    <a href="#var-table" class="text-secondary text-sm m-4 font-bold">SEE ALL PRODUCT OPTIONS BELOW</a>
                                </div>

                        </div>

                    </div>

                </div>

          </div>

          <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <LazyHydrate>
           <table class="min-w-full mt-20" id="var-table">
                <thead class="bg-white border-b ">
                    <tr>
                        <div class=" grid grid-cols-12">
                            
                            <th scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-left col-span-4">Item</th>
                            <th  scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-left col-span-1">SKU</th>

                            <!-- <th  scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-left">{{loading? '' : option.value[0].label}}</th> -->
                    
                                <!-- <th v-for="(op, i) in option && option" :key="i"  scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-left">{{op.label.toUpperCase()}}</th> -->
                            <th scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-left col-span-2" v-if="option && option.length != 0">Option</th>

                                <th scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-left col-span-4">Price</th>
              
                        </div>

                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(pro, i) in product && product" :key="i" >
                        <div :class="i%2== 0? 'grid grid-cols-12 bg-light_gray border-b': 'grid grid-cols-12 bg-white border-b'"> 
                             <td class=" col-span-4 whitespace-nowrap"> 
                                <div class="grid grid-cols-4"> 
                                    <div class="col-span-2">
                                      <LazyHydrate>
                                        <img :src="pro.images[0]? pro.images[0]: products.featuredAsset.preview" class="col-span-1" />

                                      </LazyHydrate>
                                    </div>
                                   
                                        <!-- <a href="#" class="text-secondary ml-5">EW-10001-00</a> -->
                                        <nuxt-link class="text-secondary ml-5 mt-5"  :to="'/p/17/'+ pro.slug">{{pro.name}}</nuxt-link>
                                    

                                </div>
                        </td>
                            <!-- <td class=" col-span-1">{{pro.price.current}}</td> -->
                            <td class=" col-span-1">{{pro.sku}}</td>
                            
                            <td class=" col-span-2" v-if="option.length != 0">{{ pro.name.replace(products.name, "")}}</td>
                            <td class=" col-span-4">
                                <span class="text-xl font-bold ml-5 ">{{ pro.price.current.toString().substring(0,pro.price.current.toString().length-2)+"."+pro.price.current.toString().substring(pro.price.current.toString().length-2)}}</span> <span>{{ products.variants[i].currencyCode}}</span>
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
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  value=""
                                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  @change="check($event)"
                                  v-model="checked"
                                />
                                <label
                                  for="default-checkbox"
                                  class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300"
                                >
                                  INCLUDE INNOCAL CALIBRATION SERVICES</label
                                >
                              </div>

                            <div class="ml-10 mb-5" v-if="checked">
                              <a class="text-secondary text-lg"
                                >InnoCal NIST-Traceable Calibration: Balance/Scale - All
                                Types</a
                              >
                              <p>
                                for an additional <span class="font-bold">$200.00</span>{{ products.variants[i].currencyCode}} </p>
                            </div>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
        </LazyHydrate>
           
        </div>
    </div>
  </div>
  </div>
         

          
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted } from '@vue/composition-api'
import { useCategory, categoryGetters , useProduct, productGetters} from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core'
import {computed} from "@vue/composition-api";
import { useUiHelpers } from '~/composables';
import { name } from 'file-loader';
import LazyHydrate from 'vue-lazy-hydration';

import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
} from '@storefront-ui/vue';
export default defineComponent({
   components: {
    SfGallery,
    LazyHydrate
   },
    setup() {

        let maxPrice='';
        let minPrice='';

         const { products, search, loading, error } = useProduct('<UNIQUE_ID>');
        //  const {featuredAsset} = products.value;
        // const productImage = computed(() => products.value?.assets[0]?.preview); 

         
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
            const option = computed(() => productGetters.getOptions(products.value))
            const configuration = computed(() => productGetters.getCategoryIds(product.value))

                const productGallery = computed(() =>
                  productGetters.getAllGallery(products.value)
                  .map((img) => ({
                    mobile: { url: img.small },
                    desktop: { url: img.normal },
                    big: { url: img.big },
                    alt: products.value.name || products.value._name,
                  }))
                );

            const originalPrice = []
            const currentPrice = []

             product.value.forEach(element => {
                originalPrice.push(element.price.original)
                currentPrice.push(element.price.current)
                
            });

            const maxP = Math.max(...currentPrice).toString();
            const minP = Math.min(...currentPrice).toString();

             maxPrice=maxP.substring(0,maxP.length-2)+"."+maxP.substring(maxP.length-2);
             minPrice=minP.substring(0,minP.length-2)+"."+minP.substring(minP.length-2);




            // const attributes = computed(() => productGetters.getAttributes(products.value))


    onMounted(() => {
        console.log("the product value is ", product.value)
        console.log("the option value is ", option.value)
                console.log("the productsss value is ", products.value)
                console.log("configuration value is ", configuration.value)
                //   console.log("the productsss image value is ", products.value.assets[0].preview)
                // console.log("THE PRODUCT VARIANTS ARE ", productGetters.getGallery(product.value))
                console.log("product gallery is ", productGallery.value)


    })

        return {
            check,
            checked,
            loading,
            error,
            products,
            product,
            option,
            configuration,
            minPrice,
            maxPrice,
            originalPrice,
            currentPrice,
            productGallery,
            LazyHydrate
            // productImage
        }
        
    },
})
</script>

<style scoped></style>
