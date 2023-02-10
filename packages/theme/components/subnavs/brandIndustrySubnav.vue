<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-9 m-5">
      <h3
        v-if="brandsIndustries.hovered === 'Industries'"
        class="text-[#717171] font-bold"
      >
        Industries
      </h3>
      <h3
        v-else-if="brandsIndustries.hovered === 'brands'"
        class="text-[#717171] font-bold"
      >
        Brands
      </h3>
      <hr class="mb-5" />
      <div class="nameLists">
        <div v-for="item in brandsIndustries.items" :key="item.id">
          <nuxt-link
            :to="
              brandsIndustries.hovered == 'Industries'
                ? `/i/${item.name.toLowerCase()}/${item.id}`
                : `/b/${item.name.toLowerCase()}/${item.id}`
            "
          >
            <h4
              class="text-secondary text-base hover:font-bold mb-2 mr-10"
              @mouseover="(hoveredItemImage = item.icon), (hoveredItem = item)"
              @mouseleave="hoveredItemImage = null"
            >
              {{ item.name }}
            </h4>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="col-span-3 float-right">
      <div
        v-if="hoveredItemImage != null"
        class="h-[26.5rem] bg-white sideImage w-full"
      >
        <img
          v-if="hoveredItemImage != null"
          class="object-contain w-[100%] max-h-[24rem]"
          :src="hoveredItemImage.preview"
          alt="image"
        />
        <h4 class="text-primary text-base text-center font-bold">
          {{ hoveredItem.name }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['brandsIndustries'],
  data() {
    return {
      hoveredItemImage: null,
      hoveredItem: '',
    };
  },
};
</script>

<style scoped>
.nameLists {
  display: grid;
  grid-gap: 10px;
  grid-template-rows: repeat(8, minmax(0, 1fr));
  grid-auto-flow: column;
  justify-content: start;
}
hr {
  color: rgb(147, 154, 159);
}
.sideImage {
  box-shadow: 0 1px 2px 1px rgb(153, 153, 153);
}
</style>
