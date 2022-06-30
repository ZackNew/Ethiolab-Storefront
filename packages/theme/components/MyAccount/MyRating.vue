<template>
<div class="grid grid-cols-5 self-center gap-2 rating-grid">
  <div><SfIcon
    icon="star"
    size="sm"
    @mouseenter="toggle"
    color="gray-secondary"
    :coverage="1"
    class="rating-star star-1"
  /></div>
  <div><SfIcon
    icon="star"
    size="sm"
    @mouseenter="toggle"
    color="gray-secondary"
    viewBox="0 0 24 24"
    class="rating-star star-2"
    :coverage="1"
  /></div>
  <div><SfIcon
    icon="star"
    size="sm"
    @mouseenter="toggle"
    color="gray-secondary"
    class="rating-star star-3"
    viewBox="0 0 24 24"
    :coverage="1"
  /></div>
  <div><SfIcon
    icon="star"
    size="sm"
    @mouseenter="toggle"
    color="gray-secondary"
    viewBox="0 0 24 24"
    class="rating-star star-4"
    :coverage="1"
  /></div>
  <div><SfIcon
    icon="star"
    size="sm"
    @mouseenter="toggle"
    color="gray-secondary"
    viewBox="0 0 24 24"
    class="rating-star star-5"
    :coverage="1"
  /></div>
</div>
</template>
<script>
    import {
      SfIcon,
    } from '@storefront-ui/vue';
import { integer } from 'vee-validate/dist/rules';
    var selected_color="color-green-primary";
    var unselected_color="color-gray-secondary";
    export default{
        name: 'MyRating',
        props: {
          value: integer,
          disabled: Boolean,
        },
        mounted(){
          this.toggle_precedings(this.count);
          this.$emit('updateMyRating', this.count);
        },

        methods:{
            toggle(e){
              if(this.$props.disabled == true){
                return;
              }
              // console.log(`over here ${this.$props.value}`);
              var index;
              for(var classes of e.target.classList){
                if(classes.includes("star-")){
                  index= parseInt(classes.split('-')[1]);
                  break;
                }
              }
              const stars = this.$el.querySelectorAll('.rating-star');
              if(index==1 && stars[1].classList.contains(unselected_color)
                && stars[2].classList.contains(unselected_color)
                && stars[3].classList.contains(unselected_color)
                && stars[4].classList.contains(unselected_color)){
                if(stars[0].classList.contains(selected_color)){
                  stars[0].classList.remove(selected_color);
                  stars[0].classList.add(unselected_color);
                  this.count= 0;
                }else if(stars[0].classList.contains(unselected_color)){
                  stars[0].classList.remove(unselected_color);
                  stars[0].classList.add(selected_color);
                  this.count= 1;
                }else{
                  console.log("This shouldn't print");
                }
              }else{
                this.toggle_precedings(index, stars);
              }
              e.preventDefault();
            },
            toggle_precedings(index){
              const stars = this.$el.querySelectorAll('.rating-star');
              for(var count=0;count<index;count++){
                var element= stars[count];
                if(element.classList.contains(unselected_color)){
                  element.classList.remove(unselected_color);
                  element.classList.add(selected_color);
                }
              }
              this.count= index;
              for(var remain=count; remain<5; remain++){
                var element= stars[remain];
                if(element.classList.contains(selected_color)){
                  element.classList.remove(selected_color);
                  element.classList.add(unselected_color);
                }
              }
            },
        },

        data(){
          return{
            count: parseInt(this.$props.value)
          }
        },
        watch:{
          count(newCount, _){
            this.$emit('updateMyRating', newCount);
          }
        },
        components:{
            SfIcon,
        },
    }
</script>
<style>
/* .rating-grid{
    width: 10% !important;
    height: 3% !important;
} */
</style>
