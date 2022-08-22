<template>
  <HeaderNavigationItem
      :subnavList="headerNavigation"
      class="nav-item"
      v-e2e="`app-header-url_INDUSTRIES`"
      :label="'INDUSTRIES'"
      :link="localePath(`/c/INDUSTRIES`)"
    />
</template>

<script>
import HeaderNavigationItem from '../HeaderNavigationItem.vue';
import { ref } from '@vue/composition-api';
import { useCategory,} from '@vue-storefront/vendure';
import { isConditional } from '@babel/types';
import { disableFragmentWarnings } from 'graphql-tag';
export default {
    name: 'IndustriesSubNav',
    components:{
        HeaderNavigationItem,
    },
     created(){
         this.getBrands();
    },
    setup() {
        let headerNavigation=ref([]);
        const {categories} = useCategory();
        return {
            headerNavigation,
        }
    },
    methods:{
      getBrands(){
        let graphql=JSON.stringify({
          query:`query{
            industries{
                id
                name
                description
                icon{
                  preview
                }
            }
        }`});
        let baseUrl = process.env.GRAPHQL_API
        fetch(baseUrl, {
          method: 'post',
          body: graphql,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': graphql.length
          }
        }).then(r => r.json())
          .then((data) => {
              this.headerNavigation=data.data.industries.map((value, index)=>{
                let result =  {
                    label: value.name,
                    description:value.description,
                    preview:value.icon?.preview,
                    items:[],
                    id: value.id,
                    link:`/i/${value.name.toLowerCase()}/${value.id}`
                }
                return result
              });
            //   console.log(this.)
          });
    }
    }
}
</script>

<style>

</style>