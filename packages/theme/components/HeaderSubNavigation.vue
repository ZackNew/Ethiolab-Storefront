<template>
  <div class="sub-body">
    <div
      @mouseover="handler(id, title, disc, prev)"
      @mouseleave="hoverOutHandler()"
      class="content"
    >
      <nuxt-link :key="-1" :to="this.$props.link">
        <p class="text-secondary text-xl">{{ this.$props.title }}</p>
      </nuxt-link>
      <div
        class="grid grid-rows-4 grid-cols-2 gap-6 overlay no-scrollbar"
        v-if="subnavList.length > 0"
      >
        <a
          class="mb-4"
          v-for="sub in subnavList"
          :key="sub.id"
          :href="`/s/${sub.slug}`"
          >{{ sub.label }}</a
        >
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
    handler: Function,
    hoverOutHandler: Function,
    disc: String,
    prev: String,
    id: anymatch,
  },
  setup() {
    let hoverHandler = () => {};
    return {
      // hoverHandler
    };
  },
};
</script>
<style scoped>
.overlay {
  display: none !important;
  text-align: 5%;
  background: rgb(245, 230, 230) !important;
  opacity: 1 !important;
  /* overflow: auto; */
  min-height: 280px;
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
  font-family: var(--font-family--secondary);
  position: absolute;
  /* background-color: red; */
  width: 200px;
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
  top: 0% !important;
  display: block !important;
  min-width: 500px !important;

  border: 0.5px solid rgb(0, 0, 0) !important;
  /* border-radius: 15px; */
  /* box-shadow: 2px 1px 5px rgb(28, 26, 26); */
  /* box-shadow: 5px grey; */
  z-index: 2 !important;
  opacity: 1 !important;
  background-color: rgb(243, 243, 243) !important;
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
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.content:hover > a {
  border-bottom: 0.1px solid var(--c-bg-primary) !important;
  font-weight: bold;
  color: var(--c-bg-primary);
}
</style>
