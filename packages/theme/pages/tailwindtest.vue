<template>
  <div :class="{
      'theme-light': !isDarkMode,
      'theme-dark': isDarkMode,
    }">
  <div>
    {{isDarkMode}}
 <button v-on:click="toggleDarkMode"> my button</button>
  <p>
    Hello world!
  </p>
  </div>
  </div>
</template>

<script>
import {useUiState} from "~/composables";

export default {
  name: 'tailwindtest',
  setup(){
    const {isDarkMode,toggleDarkMode} = useUiState();
    return{
      isDarkMode,
      toggleDarkMode
    }
  }
};
</script>

<style scoped>

</style>
