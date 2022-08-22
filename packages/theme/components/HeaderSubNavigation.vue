<template>
  <div class="sub-body">
    <div @mouseover="handler(id,title,disc,prev)" @mouseleave="hoverOutHandler()" class="content">
      <nuxt-link :key="-1" :to="this.$props.link">{{
        this.$props.title
      }}</nuxt-link>
      <!-- <a v-for="sub in subnavList" :key="sub.id" :href="localePath(`/c/${sub.slug}`)">{{this.$props.title}}</a> -->
      <div
        class="grid grid-rows-4 grid-cols-2 gap-6 overlay"
        v-if="subnavList.length > 0"
      >
        <a v-for="sub in subnavList" :key="sub.id" :href="`/s/${sub.slug}`">{{
          sub.label
        }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import anymatch from 'anymatch';

export default {
  name: 'HeaderSubNavigation',
  components: {},
  props: {
    title: String,
    subnavList: Array,
    link: String,
    handler:Function,
    hoverOutHandler:Function,
    disc:String,
    prev:String,
    id:anymatch

  },
  setup() {
        let hoverHandler = ()=>{
      console.log('hover handler activated**')
    }
    return {
      // hoverHandler
    }
  },
};
</script>
<style scoped>
.overlay {
  display: none !important;
  text-align: 5%;
  background: rgb(255, 255, 255) !important;
  opacity: 1 !important;
  /* width: 300% !important; */
}

/* .content>a{
  display: block !important;
} */

.sub-body {
  margin-bottom: 2%;
  width: 30%;
  height: 50%;
}

.content {
  position: absolute;
  /* left: 0%;  */
}

.content > a {
  display: block;
  width: 120% !important;
  text-align: left;
  margin-bottom: 10%;
}

.content:hover > .overlay {
  position: absolute;
  left: 120% !important;
  top: 25% !important;
  display: block !important;
  width: 250px !important;
  min-height: 200px !important;
  border: 0.025px solid var(--c-bg-primary) !important;
  /* box-shadow: 5px grey; */
  z-index: 2 !important;
  opacity: 1 !important;
}

.overlay > a {
  display: inline-block;
  margin-left: 5% !important;
  width: 80%;
  height: 5% !important;
}
a:hover {
  /* border-bottom:  0.1px solid var(--c-bg-primary) !important; */
  color: var(--c-bg-primary);
  font-weight: bold;
}

.content:hover > a {
  border-bottom: 0.1px solid var(--c-bg-primary) !important;
  font-weight: bold;
  color: var(--c-bg-primary);
}
</style>
