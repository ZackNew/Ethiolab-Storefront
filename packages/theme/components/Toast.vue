<template>
  <Transition>
    <div v-if="show" id="container">
      <div id="toast-body">
        <div>{{ message }}</div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, watchEffect } from '@vue/composition-api';
import { SfButton } from '@storefront-ui/vue';

export default {
  props: ['message', 'show'],
  components: { SfButton },
  setup() {},
};
</script>

<style lang="scss" scoped>
#container {
  position: sticky;
  max-width: 50%;
  margin: auto;
  bottom: 15%;
  background: rgba(0, 80, 149, 0.8);
  color: white;
  padding-right: 0%;
  font-weight: bold;
  transition: opacity 10s ease-in-out;
  border-radius: 5px;
  font-size: 1.3rem;
  //  box-shadow: black
  //  border-radius: 10%;
  #toast-body {
    // background-color:;
    display: flex;
    justify-content: space-around;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
