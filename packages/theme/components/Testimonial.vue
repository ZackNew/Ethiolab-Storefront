<template>
<div>
   <SfHeading title="Testimonials" :level="2" />
<SfDivider/>
  <SfCarousel class="carousel" :settings="{perView:3,slidePerPage : false,breakpoints: { 1023: { peek: 0, perView: 1 } } }" >
    <SfCarouselItem v-for="(n,i) in testimonies" :key="i" class="carousel__item">
      <div class="max-w-3xl p-4 ml-2 text-gray-800 rounded-lg shadow testimonial_card">
        <div class="mb-2">
          <div class="h-3 text-3xl text-left quote">“</div>
          <p class="px-4 text-center testimonies">
            {{n.content}}
          </p>
          <div class="h-3 text-3xl text-right quote">”</div>
          <div class="flex flex-col items-center text-center">
            <div
                class="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full "
            >
              <img
                  src="https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg"
                  alt="img"
                  class="object-cover object-center w-full h-full"
              />
            </div>
            <h5 class="font-bold quote">{{n.name}}</h5>
            <p class="text-sm testimonies">{{ n.title }}</p>
          </div>
        </div>
      </div>
    </SfCarouselItem>

  </SfCarousel>
</div>
</template>
<script>
import {SfCarousel,SfDivider, SfHeading} from '@storefront-ui/vue';
export default {
  components: {
    SfCarousel,
    SfHeading,
    SfDivider,
  },
  data () {
    return {
      model: null,
      reveals: false,
      testimonies: [
        {
          title: 'Universal Hospital',
          name: 'John Person',
          content: 'I bought an ultrasound from Ethio Lab it is the best ultrasound ever. It is ULTRA SOUND'
        },
        {
          title: 'AMIN Diagnostic',
          name: 'Jane Person',
          content: 'I bought Magnetic resonance imaging (MRI) from Ethio Lab it is the best MRI ever.Great!!!'
        },
        {
          title: 'ARSHO Laboratories',
          name: 'Jack Person',
          content: 'I bought a microscope  from Ethio Lab it is the best microscope ever. I can see everything'
        },
        {
          title: 'Universal Hospital',
          name: 'John Person',
          content: 'I bought an ultrasound from Ethio Lab it is the best ultrasound ever. It is ULTRA SOUND'
        },
        {
          title: 'AMIN Diagonistic',
          name: 'Jane Person',
          content: 'I bought Magnetic resonance imaging (MRI) from Ethio Lab it is the best MRI ever.Great!!!'
        },
        {
          title: 'ARSHO Labratories',
          name: 'Jack Person',
          content: 'I bought a microscope  from Ethio Lab it is the best microscope ever. I can see everything'
        }
      ]
    };
  },
  methods: {

  }
};
</script>
<style lang="scss"  scoped>
.testimonial_card{
  background-color: var(--c-accent);
}
.quote{
  color:var(--c-secondary)
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
}

.testimonies{
  color:var(--c-primary);
}
</style>

