<template>
  <div class="gallery">
    <div class="gallery__stage">
      <div ref="glide" class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li
              v-for="(picture, index) in images"
              :key="'slide-' + index"
              class=""
              @mouseover="startZoom(picture)"
              @mousemove="moveZoom($event, index)"
              @mouseout="removeZoom(index)"
            >
              <slot
                name="big-image"
                v-bind="{
                  enableZoom,
                  picture,
                  index,
                  imageWidth,
                  imageHeight,
                  imageTag,
                  nuxtImgConfig,
                }"
              >
                <SfImage
                  ref="sfGalleryBigImage"
                  class="gallery__big-image"
                  :class="{ 'gallery__big-image--has-zoom': enableZoom }"
                  :src="picture.desktop.url"
                  :alt="picture.alt"
                  :placeholder="picture.placeholder"
                  :width="imageWidth"
                  :height="imageHeight"
                  :image-tag="imageTag"
                  :nuxt-img-config="nuxtImgConfig"
                  @click="$emit('click:stage', { picture, index })"
                />
              </slot>
            </li>
          </ul>
        </div>
      </div>
      <!-- <transition name="sf-fade">
        <div
          ref="outSide"
          :class="{
            'display-none':
              !outsideZoom || !isZoomStarted || (!outsideZoom && !enableZoom),
          }"
          :style="{ width: `${imageWidth}px`, height: `${imageHeight}px` }"
        >
          <slot
            name="outside-zoom"
            v-bind="{
              definedPicture,
              imageWidth,
              imageHeight,
              imageTag,
              nuxtImgConfig,
            }"
          >
            <SfImage
              ref="imgZoom"
              class="gallery__zoom"
              :src="definedPicture.url"
              :width="imageWidth"
              :height="imageHeight"
              :lazy="false"
              :alt="definedPicture.alt"
              :placeholder="definedPicture.placeholder"
              :image-tag="imageTag"
              :nuxt-img-config="nuxtImgConfig"
            />
          </slot>
        </div>
      </transition> -->
    </div>
    <div class="gallery__thumbs">
      <slot name="thumbs" v-bind="{ images, active: activeIndex, go }">
        <SfButton
          v-for="(image, index) in images"
          :key="'img-' + index"
          class="sf-button--pure gallery__item"
          :class="{ 'gallery__item--selected': index === activeIndex }"
          :aria-label="'Image ' + index"
          @click="go(index)"
        >
          <SfImage
            class="gallery__thumb"
            :src="image.mobile.url"
            :alt="image.alt"
            :placeholder="image.placeholder"
            :width="thumbWidth"
            :height="thumbHeight"
            :image-tag="thumbImageTag"
            :nuxt-img-config="thumbNuxtImgConfig"
          />
        </SfButton>
      </slot>
    </div>
  </div>
</template>
<script>
import Glide from '@glidejs/glide';
import { SfImage, SfButton } from '@storefront-ui/vue';

export default {
  name: 'Gallery',
  components: {
    SfImage,
    SfButton,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    imageWidth: {
      type: [Number, String],
      default: null,
    },
    imageHeight: {
      type: [Number, String],
      default: null,
    },
    thumbWidth: {
      type: [Number, String],
      default: null,
    },
    thumbHeight: {
      type: [Number, String],
      default: null,
    },
    current: {
      type: Number,
      default: 1,
    },
    sliderOptions: {
      type: Object,
      default() {
        return {
          type: 'slider',
          autoplay: false,
          rewind: false,
          gap: 0,
        };
      },
    },
    outsideZoom: {
      type: Boolean,
      default: false,
    },
    enableZoom: {
      type: Boolean,
      default: false,
    },
    imageTag: {
      type: String,
      default: 'img',
    },
    nuxtImgConfig: {
      type: Object,
      default: () => ({}),
    },
    thumbImageTag: {
      type: String,
      default: 'img',
    },
    thumbNuxtImgConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      positionStatic: {},
      eventHover: {},
      glide: null,
      activeIndex: this.current - 1,
      style: '',
      pictureSelected: this.images[0] || {
        alt: '',
        zoom: '',
        big: {
          url: '',
        },
        desktop: '',
        placeholder: '',
      },
      isZoomStarted: false,
    };
  },
  computed: {
    mapPictures() {
      // map images to handle picture tags with SfImage
      return this.images.map(({ desktop, big }) => ({
        mobile: desktop,
        desktop: big,
      }));
    },
    updatedSliderOptions() {
      return { ...this.sliderOptions, startAt: this.activeIndex };
    },
    definedPicture() {
      const { zoom, big, desktop } = this.pictureSelected;
      const definedPicture = zoom || big || desktop;
      definedPicture ? (definedPicture.alt = this.pictureSelected?.alt) : null;
      definedPicture
        ? (definedPicture.placeholder = this.pictureSelected?.placeholder)
        : null;
      return definedPicture ? definedPicture : '';
    },
  },
  mounted() {
    this.$nextTick(() => {
      // handle slider with swipe and transitions with Glide.js
      // https://glidejs.com/docs/
      // if (this.images.length < 1) return;
      const glide = new Glide(this.$refs.glide, this.updatedSliderOptions);
      this.go(glide.index);
      glide.on('run', () => {
        this.go(glide.index);
      });
      if (!this.$route.query.private) glide.mount();
      if (this.$route.query.private) this.$router.push(this.$route.path);

      this.glide = glide;
    });
  },
  updated() {
    if (this.glide) {
      this.$nextTick(() => {
        this.glide.mount();
      });
    }
  },
  beforeDestroy() {
    if (this.glide) {
      this.glide.destroy();
    }
  },
  methods: {
    positionObject(index) {
      if (this.$refs.sfGalleryBigImage) {
        if (this.outsideZoom) {
          return this.$refs.glide.getBoundingClientRect();
        } else {
          return this.$refs.sfGalleryBigImage[
            index
          ].$el.getBoundingClientRect();
        }
      }
      return '';
    },
    go(index) {
      this.pictureSelected = this.images[index];
      // console.log('xxxxxtttttxxx', index);
      if (!this.glide) return;
      this.activeIndex = index;
      /**
       * Event for current image change (`v-model`)
       * @type {Event}
       */
      this.$emit('click', index + 1);
      if (this.glide) {
        this.glide.go(`=${index}`);
      }
    },
    startZoom() {
      if (this.enableZoom) {
        this.isZoomStarted = true;
      }
    },
    moveZoom($event, index) {
      if (this.enableZoom) {
        this.eventHover = $event;
        if (this.outsideZoom) {
          this.positionStatic = this.positionObject(index);
          this.$refs.outSide.style.cssText = `position: absolute; left: ${
            $event.clientX - this.positionStatic.x
          }px; top: ${$event.clientY - this.positionStatic.y}px; z-index: 1;`;
          this.$refs.imgZoom.$el.children[0].style.cssText = `transform: scale(2); width: 300px; height: auto;`;
          this.$refs.imgZoom.$el.children[0].style.transformOrigin = `${
            $event.clientX - this.positionStatic.x
          }px ${$event.clientY - this.positionStatic.y}px`;
        } else {
          this.positionStatic = this.positionObject(index);
          this.$refs.sfGalleryBigImage[index].$el.children[0].style.cssText =
            'top: 0; transform: scale(2);';
          this.$refs.sfGalleryBigImage[
            index
          ].$el.children[0].style.transformOrigin = `${
            $event.clientX - this.positionStatic.x
          }px ${$event.clientY - this.positionStatic.y}px`;
        }
      }
    },
    removeZoom(index) {
      if (this.enableZoom) {
        this.isZoomStarted = false;
        if (this.outsideZoom) return;
        this.$refs.sfGalleryBigImage[index].$el.children[0].style.transform =
          'scale(1)';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-direction: var(--gallery-flex-direction, column);
  --image-width: var(--gallery-image-width, 100%);
  --image-height: var(--gallery-image-height, 31.25rem);
  @include for-desktop {
    --gallery-image-width: 26.375rem;
    --gallery-image-height: 41.5rem;
  }
  &__thumbs {
    display: var(--gallery-thumbs-display, flex);
    flex: var(--gallery-thumbs-flex);
    flex-direction: var(--gallery-thumbs-flex-direction);
    margin: var(--gallery-thumbs-margin, var(--spacer-xs) 0 0 0);
    order: var(--gallery-thumbs-order);
    overflow: auto;
    --image-width: var(--gallery-thumbs-image-width, 10rem);
    --image-height: var(--gallery-thumbs-image-height, 10rem);
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  &__item {
    display: flex;
    flex: 0 0 var(--gallery-thumb-width, 10rem);
    margin: var(--gallery-item-margin, 0 var(--spacer-xs) 0 0);
    &:last-child {
      --gallery-item-margin: 0;
    }
    opacity: var(--gallery-item-opacity, 0.5);
    transition: var(--gallery-item-transition, opacity 150ms ease-in-out);
    cursor: var(--gallery-item-cursor, pointer);
    &--selected {
      --gallery-item-opacity: 1;
      --gallery-item-cursor: default;
    }
  }
  &__stage {
    position: relative;
    flex: 1;
    max-width: var(--gallery-stage-width, 26.375rem);
  }
  &__zoom {
    position: absolute;
    pointer-events: none;
    width: 12.5rem;
    height: 12.5rem;
    overflow: hidden;
  }
  .glide {
    &__slide {
      flex: 1;
    }
    &__slides {
      margin: 0;
    }
  }
  @include for-desktop {
    --gallery-flex-direction: row;
    --gallery-thumbs-flex: 0 0 var(--gallery-thumb-width, 10rem);
    --gallery-thumbs-flex-direction: column;
    --gallery-thumbs-order: -1;
    --gallery-thumbs-margin: 0 var(--spacer-xs) 0 0;
    --gallery-item-margin: 0 0 var(--spacer-xs) 0;
    &__item {
      &:last-child {
        --gallery-item-margin: 0;
      }
    }
    &__thumbs {
      overflow-y: scroll;
      height: var(--gallery-image-height);
    }
  }
}
</style>
