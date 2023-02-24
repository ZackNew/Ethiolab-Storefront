<template>
  <div class="">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-9 m-5 relative">
        <h3 class="text-[#717171] font-bold">Categories</h3>
        <hr class="mb-5" />
        <div class="nameLists">
          <div v-for="(item, i) in newList" :key="item.id">
            <nuxt-link :to="`/c/${item.slug}`">
              <h4
                :class="{
                  borderBottomAdded:
                    addBorder && hoveredItem.name === item.name,
                  borderBottomRemoved:
                    !addBorder && hoveredItem.name !== item.name,
                }"
                class="text-secondary text-base mb-1 w-[12rem] truncate text-left mr-10 hover:text-bold"
                @mouseover="hoverInHandler(item, i)"
                @mouseleave="hoverOutHandler"
                @click="$emit('oneClicked')"
              >
                {{ item.name }}
              </h4>
            </nuxt-link>
          </div>
        </div>
        <!-- v-if="(hoveredChildren && hoveredChildren.length > 0)" -->
        <div
          :style="{
            left: left + 'rem',
            visibility:
              (isNameHovered || subHovered) & (hoveredChildren.length > 0)
                ? 'visible'
                : 'hidden',
          }"
          class="min-h-[90%] w-[28rem] bg-[#f5f5f5] absolute top-12 broder border-2 border-[#aaaaaa] z-50"
          @mouseover="(subHovered = true), (addBorder = true)"
          @mouseleave="(subHovered = false), (addBorder = false)"
        >
          <div class="p-3 nameLists">
            <div v-for="child in hoveredChildren" :key="child.id">
              <nuxt-link :to="`/s/${child.slug}`">
                <h4
                  class="text-sm text-[#616161] mb-1 mr-4 hover:text-primary w-[12rem] truncate"
                  @click="$emit('oneClicked')"
                >
                  {{ child.name }}
                </h4>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 flex justify-end">
        <div
          :style="{
            visibility: subHovered || isNameHovered ? 'visible' : 'hidden',
          }"
          class="h-[26rem] bg-white sideImage"
        >
          <img
            class="object-contain w-[100%] max-h-[24rem]"
            :src="hoveredItemImage"
            alt="image"
          />
          <h4 class="text-primary text-base text-center font-bold">
            {{ hoveredItem.name }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['categories'],
  data() {
    return {
      addBorder: false,
      subHovered: false,
      isNameHovered: false,
      hoveredItemImage: null,
      hoveredItem: {},
      hoveredChildren: [],
      left: 0,
    };
  },
  computed: {
    newList() {
      const list = [];
      this.categories.items?.forEach((category) => {
        if (category?.parent?.name === '__root_collection__') {
          list.push(category);
        }
      });
      return list;
    },
  },
  methods: {
    hoverInHandler(item, i) {
      this.addBorder = true;
      this.hoveredItem = item;
      this.isNameHovered = true;
      this.hoveredItemImage = item.featuredAsset?.preview;
      this.hoveredChildren = item.children;
      if (i <= 7) {
        this.left = 11.5;
      } else if (i <= 15) {
        this.left = 27;
      } else if (i <= 23) {
        this.left = 42;
      } else if (i <= 31) {
        this.left = 57;
      }
    },
    hoverOutHandler() {
      this.addBorder = false;
      if (this.subHovered == false) {
        this.isNameHovered = false;
      }
    },
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
.borderBottomAdded {
  border-bottom: 2px solid rgb(164, 164, 164);
}
.borderBottomRemoved {
  border-bottom: 2px solid rgb(255, 255, 255);
}
.borderBottomRemoved:hover {
  border-bottom: 2px solid rgb(162, 162, 162);
}
</style>
