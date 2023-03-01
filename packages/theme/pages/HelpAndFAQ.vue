<template>
  <div>
    <section class="py-5 2xl:py-10 faq">
      <div class="container px-4 mx-auto">
        <div class="mb-20 text-center">
          <h2 class="mt-8 text-7xl font-bold font-heading text-secondary">
            FAQ&apos;s
          </h2>
        </div>
        <div v-if="loading">
          <Loading />
        </div>
        <div v-else class="max-w-4xl mx-auto">
          <SfAccordion
            transition=""
            open="all"
            showChevron
            v-for="(faq, index) in FAQs"
            :key="faq.id"
            class="mb-4 px-4 lg:px-12 py-8 accordion-bg rounded-2xl"
          >
            <SfAccordionItem header="Clothing" class="rounded-2xl">
              <template #header="{ isOpen, accordionClick }">
                <div
                  @click="accordionClick"
                  :style="{ cursor: 'pointer' }"
                  class="flex justify-between"
                >
                  <div class="flex">
                    <span class="text-xl font-bold w-auto mr-8">{{
                      index + 1
                    }}</span>
                    <h3 class="text-xl font-bold" v-html="faq.question"></h3>
                  </div>
                  <span
                    class="sf-chevron"
                    :class="isOpen ? '' : 'sf-chevron--right'"
                  >
                    <span class="sf-chevron__bar sf-chevron__bar--left" />
                    <span class="sf-chevron__bar sf-chevron__bar--right" />
                  </span>
                </div>
              </template>
              <div class="mt-6 border-l-2 border-gray-50 pl-10 ml-10">
                <p class="mb-5 text-xl" v-html="faq.answer"></p>
                <!-- <p class="mb-2 text-lg">
                  <span
                    class="inline-block mr-6 h-2 w-2 rounded-full bg-blue-500"
                  ></span>
                  <span>Distribution of letters</span>
                </p>
                <p class="text-lg">
                  <span
                    class="inline-block mr-6 h-2 w-2 rounded-full bg-blue-500"
                  ></span>
                  <span>Content here</span>
                </p> -->
              </div>
            </SfAccordionItem>
          </SfAccordion>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { SfAccordion } from '@storefront-ui/vue';
import axios from 'axios';
import Loading from '~/components/Loading';

export default {
  //   name: "Help&FAQ",
  components: {
    SfAccordion,
    Loading,
  },
  created() {
    this.getFAQs();
  },
  data() {
    return {
      FAQs: [],
      loading: false,
    };
  },
  methods: {
    async getFAQs() {
      this.loading = true;
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `query getFAQ {
            getFaqs {
              answer
              id
              question
              isEnabled
            }
          }`,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await axios.post(baseUrl, body, options).then((res) => {
        this.FAQs = res.data.data.getFaqs.filter((faq) => faq.isEnabled);
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.faq,
h2 {
  color: var(--c-text);
}

.faq {
}
.accordion-bg {
  background-color: white;
}
</style>
