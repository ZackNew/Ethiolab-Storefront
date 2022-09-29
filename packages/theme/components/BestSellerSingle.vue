<template>
  <div class="max-w-sm rounded overflow-hidden shadow-xl">
    <img :src="image" class="w-full h-32 sm:h-48 object-cover scale-100" />
    <div class="m-4">
      <a :href="`/v/${slug}`">
        <h4>{{ title }}</h4>
      </a>
      <h4>{{ price }}</h4>
    </div>
    <button>
      <a :href="'/v/' + slug">
        {{ $t('View') }}
      </a>
    </button>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {},
  props: ['title', 'image', 'slug', 'price'],
});
</script>

<style scoped></style>
