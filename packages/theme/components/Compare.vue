<template>
  <div id="compare" :style="`bottom: ${value}; transition: bottom 0.4s;`">
    <button
      @click="toogle"
      class="ml-10 rounded-t bg-light_gray border border-secondary px-4"
    >
      <p class="text-secondary font-bold">Selected Products</p>
    </button>
    <div class="bg-[#e6e6e6] flex justify-between h-14 md:h-24">
      <div class="grid grid-cols-5 gap-3 my-auto ml-[3%]">
        <div
          v-for="image in images"
          :key="image.Vid"
          class="flex mr-[2%] bigger"
        >
          <img
            :src="image.img"
            alt=""
            class="bg-white w-10 h-10 md:w-16 md:h-14 border border-secondary"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#c2c2c2"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 icon rounded-full text-white opacity-90"
            @click="removeCompareList(image.Vid)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div
          v-for="(box, i) in 5 - images.length"
          :key="`A${i}`"
          class="flex mr-[2%]"
        >
          <div
            class="w-10 h-10 md:w-16 md:h-14 bg-white border border-secondary"
          ></div>
        </div>
      </div>
      <button
        class="px-6 bg-secondary rounded h-[45%] text-white font-bold my-auto mr-[5%]"
      >
        compare
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Compare',
  data() {
    return {
      value: '-82px',
    };
  },
  methods: {
    toogle() {
      if (this.value === '-4px') {
        this.value = '-82px';
      } else if (this.value === '-82px') {
        this.value = '-4px';
      }
    },
    removeCompareList(Rid) {
      this.$store.dispatch('compareList/removeCompareList', {
        Vid: Rid,
      });
    },
  },
  computed: {
    images() {
      const images = [];
      this.$store.state.compareList?.productsToCompare.forEach((p) => {
        images.push({ img: p.image, Vid: p.variantID });
      });
      return images;
    },
  },
};
</script>

<style>
#compare {
  left: -5px;
  right: -5px;
}
.bigger {
  position: relative;
}
.bigger img {
  display: block;
  object-fit: cover;
}
.bigger .icon {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
