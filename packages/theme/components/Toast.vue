<template>
  <Transition>
    <div v-if="show" id="container">
      <div id="toast-body">
        <div>
          <h4>{{ message }}</h4>
        </div>
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
  width: 50%;
  margin: auto;
  bottom: 15%;
  background: rgba(255, 255, 255, 0.8);
  color: rgb(0, 0, 0);
  padding: 1%;
  font-weight: bold;
  text-align: center;
  transition: opacity 10s ease-in-out;
  border-radius: 5px;
  font-size: 1.3rem;
  box-shadow: 1px 2px 2px 1px rgb(198, 198, 198);
  z-index: 9999;
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
