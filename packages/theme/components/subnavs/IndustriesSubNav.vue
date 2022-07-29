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
            }
        }`});
        fetch('http://localhost:3000/shop-api', {
          method: 'post',
          body: graphql,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': graphql.length
          }
        }).then(r => r.json())
          .then((data) => {
              this.headerNavigation=data.data.industries.map((value, index)=>{
                return {
                    label: value.name,
                    items:[],
                    id: index,
                    link:`/i/${value.name.toLowerCase()}/${value.id}`
                }
              });
            //   console.log(this.)
          });
    }
    }
}
</script>

<style>

</style>