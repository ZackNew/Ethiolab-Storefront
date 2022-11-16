<template>
  <div>
    <SfHeading title="Testimonials" :level="2" />

    <SfCarousel
      class="carousel"
      :settings="{
        perView: 3,
        slidePerPage: false,
        breakpoints: { 1023: { peek: 0, perView: 1 } },
      }"
    >
    <!-- <div v-for="testimony in tes" :key="testimony.id">  -->
      <!-- <p>{{testimony.id}}</p> -->
  <SfCarouselItem
        class="carousel__item" 
      >
        <div
          class="max-w-3xl p-4 ml-2 text-gray-800 rounded-lg shadow testimonial_card" v-for="testimony in testimonials" :key="testimony.id"
        >
 
          <div class="flex flex-col items-center text-center">
            <div
              class="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full"
            >
              <img
                :src= "`${path}${testimony.src}` || ` https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg`"
                alt="img"
                class="object-cover object-center w-full h-full"
              />
            </div>
            <h5 class="font-bold quote">{{ testimony.name }}</h5>
            <p class="text-sm testimonies">{{ testimony.title }}</p>
          </div>
          <div class="h-3 text-3xl text-left quote">“</div>
          <p
            class="px-4 text-center testimonies"
            v-html="testimony.content"
          ></p>
          <div class="h-3 text-3xl text-right quote">”</div>
        </div>
      </SfCarouselItem>
    <!-- </div> -->
    
    </SfCarousel>
    <!-- {{ testimonials }} +++++++++++++++++++++++++
    {{ testimonies }} -->
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import { SfCarousel, SfDivider, SfHeading } from '@storefront-ui/vue';
import { computed, ref, provide , onMounted} from '@vue/composition-api';
import axios from "axios";

export default {
  components: {
    SfCarousel,
    SfHeading,
    SfDivider,
    VueSlickCarousel,
  },
  props: {
    testimonials: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const tes = ref([]);
    const baseUrl = process.env.GRAPHQL_API;
    const path =baseUrl.split("/shop-api")[0]+"/assets/"
    console.log("path value is ", path)
    console.log("the base url i s", baseUrl.split("/shop-api")[0])
    onMounted(() =>{
      // async getTestimonials() {
      
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const body = {
        query: `query{
          getTestimonials{
            id
            name
            pic_location
            msg
            person_position
          }
        }`,
      };
       axios.post(baseUrl, body, options).then((res) => {
        const test = res.data.data.getTestimonials.map((testimony) => {
          console.log("testimony")
          return {
            id: testimony.id,
            name: testimony.name,
            src: testimony.pic_location,
            content: testimony.msg,
            title: testimony.person_position,
          };
        });
        tes.value = test;
        console.log('testimonials MOUNTED', this.testimonials);  
      });
    })
    // }

    return {
      tes,
      path
    }
  },
  data() {
    return {
      model: null,
      reveals: false,
      testimonies: [
        {
          title: 'Universal Hospital',
          name: 'John Person',
          content:
            'I bought an ultrasound from Ethio Lab it is the best ultrasound ever. It is ULTRA SOUND',
        },
        {
          title: 'AMIN Diagnostic',
          name: 'Jane Person',
          content:
            'I bought Magnetic resonance imaging (MRI) from Ethio Lab it is the best MRI ever.Great!!!',
        },
        {
          title: 'ARSHO Laboratories',
          name: 'Jack Person',
          content:
            'I bought a microscope  from Ethio Lab it is the best microscope ever. I can see everything',
        },
        {
          title: 'Universal Hospital',
          name: 'John Person',
          content:
            'I bought an ultrasound from Ethio Lab it is the best ultrasound ever. It is ULTRA SOUND',
        },
        {
          title: 'AMIN Diagonistic',
          name: 'Jane Person',
          content:
            'I bought Magnetic resonance imaging (MRI) from Ethio Lab it is the best MRI ever.Great!!!',
        },
        {
          title: 'ARSHO Labratories',
          name: 'Jack Person',
          content:
            'I bought a microscope  from Ethio Lab it is the best microscope ever. I can see everything',
        },
      ],
      settings: {
        dots: true,
        focusOnSelect: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        touchThreshold: 5,
        centerMode: true,
        centerPadding: '20px',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.testimonial_card {
  background-color: var(--c-accent);
}
.quote {
  color: var(--c-secondary);
}
.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
  // background-color: #edeef8;
}

.testimonies {
  color: var(--c-primary);
  font-family: 'Josefin Sans', sans-serif;
  --font-family--primary: 'Josefin Sans', sans-serif;
}
</style>
