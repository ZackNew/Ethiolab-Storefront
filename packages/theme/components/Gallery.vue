<template>
  <div>
    <div
      class="grid grid-cols-1 md:grid-cols-12 max-h-[550px]"
      style="overflow-y: clip"
    >
      <div class="md:col-span-9">
        <!-- <img
          id="zoomable"
          class="md:col-span-8 md:min-w-[400px] md:max-w-[400px] md:min-h-[600px] md:max-h-[600px] min-w-[355px] max-w-[355px] min-h-[473px] max-h-[473px]"
          :src="bigImage"
          alt="image"
          ref="img"
        />
        <canvas ref="canvas" width="150" height="150"></canvas> -->
        <vue-magnifier :src="bigImage" :src-large="bigImage" />
      </div>

      <div class="md:row-start-1 md:col-span-3">
        <div v-if="images.length > 0" class="">
          <VueSlickCarousel
            v-bind="settings"
            :vertical="!isMobile()"
            :verticalSwiping="!isMobile()"
            ref="carousel"
          >
            <div v-for="(image, i) in images" :key="i">
              <img
                :src="image.preview"
                alt="image"
                class="min-w-[90px] max-w-[90px] min-h-[90px] max-h-[90px] md:min-w-[120px] md:max-w-[120px] md:min-h-[120px] md:max-h-[120px] object-cover mb-3 mx-auto"
                @click="changeBigImage(image.preview)"
              />
            </div>
          </VueSlickCarousel>
          <button @click="showNext" class="text-secondary text-center ml-[45%]">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import VueMagnifier from './Magnify.vue';

export default {
  name: 'Gallery',
  components: {
    VueSlickCarousel,
    VueMagnifier,
  },
  props: {
    images: {
      type: Array,
      default: [],
    },
    display: {
      // type: Object,
      default() {
        return {
          preview:
            'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740',
        };
      },
    },
  },
  data() {
    return {
      bigImage: '',
      settings: {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    };
  },
  methods: {
    showNext() {
      this.$refs.carousel.next();
    },
    changeBigImage(image) {
      this.bigImage = image;
    },
    isMobile() {
      if (process.client) {
        if (screen.width <= 760) {
          return true;
        } else {
          return false;
        }
      }
      return process.client;
    },
    // zoom() {
    //   const canvas = this.$refs.canvas;

    //   const img = this.$refs.img;

    //   const context = canvas.getContext('2d');

    //   const img_boundery = img.getBoundingClientRect();

    //   img.addEventListener('mouseleave', (e) => {
    //     canvas.style.display = 'none';
    //   });

    //   img.addEventListener('mousemove', (e) => {
    //     const x = e.offsetX;

    //     const y = e.offsetY;

    //     // change the "+" to "-"  if you want to limit the circle bound
    //     const new_x = x + img_boundery.x;

    //     // change the "+" to "-"  if you want to limit the circle bound
    //     const new_y = y + img_boundery.y;

    //     canvas.style.display = 'block';

    //     canvas.style.top = new_y + 20 + 'px';

    //     canvas.style.left = new_x + 'px';

    //     context.drawImage(img, x, y, 100, 100, 0, 0, 150, 150);
    //   });
    // },
  },
  mounted() {
    // this.zoom();
    console.log('asferi', this.display);
    this.bigImage = this.display.preview;
  },
};
</script>

<style scoped>
/* .zoomable {
  cursor: none;
} */
canvas {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid black;
  cursor: none;
  border-radius: 5%;
}
</style>
