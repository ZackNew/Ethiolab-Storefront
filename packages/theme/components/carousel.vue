<template>
  <div class="sf-carousel mx-72">
    <div ref="controls" class="sf-carousel__controls">
      <slot name="prev" v-bind="{ go: () => go('prev') }">
        <!-- <SfArrow
          :aria-label="'previous'"
          data-testid="carousel-prev-button"
          @click="go('prev')"
          class="text-black"
        /> -->
        <svg
          @click="go('prev')"
          class="w-12 h-12 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <!-- <h1 @click="go('prev')">g</h1> -->
      </slot>
      <slot name="next" v-bind="{ go: () => go('next') }">
        <!-- <SfArrow
          :aria-label="'next'"
          class="sf-arrow--right"
          data-testid="carousel-next-button"
          @click="go('next')"
        /> -->
        <!-- <h1 @click="go('next')">f</h1> -->
        <svg
          @click="go('next')"
          class="w-12 h-12 text-secondary -ml-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </slot>
    </div>
    <div class="sf-carousel__wrapper">
      <div ref="glide" class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides sf-carousel__slides">
            <slot />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfCarouselItem, SfArrow } from '@storefront-ui/vue';
import Glide from '@glidejs/glide';
export default {
  name: 'Carousel',
  components: {
    SfArrow,
  },
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      glide: null,
      defaultSettings: {
        type: 'carousel',
        rewind: true,
        perView: 4,
        slidePerPage: true,
        gap: 0,
        breakpoints: {
          1023: {
            perView: 2,
            peek: {
              before: 0,
              after: 50,
            },
          },
        },
      },
    };
  },
  computed: {
    mergedOptions() {
      let breakpoints = { ...this.defaultSettings.breakpoints };
      if (this.settings.breakpoints) {
        breakpoints = { ...breakpoints, ...this.settings.breakpoints };
      }
      return {
        ...this.defaultSettings,
        ...this.settings,
        breakpoints: breakpoints,
      };
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      if (!this.$slots.default) return;
      const glide = new Glide(this.$refs.glide, this.mergedOptions);
      const size = this.$slots.default.filter((slot) => slot.tag).length;
      if (size <= glide.settings.perView) {
        glide.settings.perView = size;
        glide.settings.rewind = false;
        this.$refs.controls.style.display = 'none';
      }
      glide.mount();
      glide.on('run.before', (move) => {
        const { slidePerPage, rewind, type } = this.mergedOptions;
        if (!slidePerPage) return;
        const { perView } = glide.settings;
        if (!perView > 1) return;
        const { direction } = move;
        let page, newIndex;
        switch (direction) {
          case '>':
          case '<':
            page = Math.ceil(glide.index / perView);
            newIndex =
              page * perView + (direction === '>' ? perView : -perView);
            if (newIndex >= size) {
              if (type === 'slider' && !rewind) {
                newIndex = glide.index;
              } else {
                newIndex = 0;
              }
            } else if (newIndex < 0 || newIndex + perView > size) {
              if (type === 'slider' && !rewind) {
                newIndex = glide.index;
              } else {
                newIndex = size - perView;
              }
            }
            move.direction = '=';
            move.steps = newIndex;
        }
      });
      this.glide = glide;
    });
  },
  methods: {
    go(direct) {
      if (!this.glide) return;
      switch (direct) {
        case 'prev':
          this.glide.go('<');
          break;
        case 'next':
          this.glide.go('>');
          break;
      }
    },
  },
};
</script>
<style lang="scss"></style>
