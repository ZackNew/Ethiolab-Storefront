<template>
  <HeaderNavigationItem
      :subnavList="headerNavigation"
      class="nav-item"
      v-e2e="`app-header-url_BRANDS`"
      :label="'BRANDS'"
      :link="localePath(`/c/BRANDS`)"
    />
</template>

<script>
import HeaderNavigationItem from '../HeaderNavigationItem.vue';
import { ref } from '@vue/composition-api';
import { useCategory,} from '@vue-storefront/vendure';
export default {
    name: 'BrandsSubNav',
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
            brands{
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
              this.headerNavigation=data.data.brands.map((value, index)=>{
                return {
                    label: value.name,
                    items:[],
                    id: index,
                    link:`/b/${value.name.toLowerCase()}/${value.id}`
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