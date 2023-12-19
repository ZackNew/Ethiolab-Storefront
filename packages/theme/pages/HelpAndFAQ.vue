<template>
  <div>
    <section class="py-5 2xl:py-10 faq">
      <div class="container px-4 mx-auto overflow-y-auto">
        <!-- <div class="mb-5 text-center">
          <h3 class="mt-4 text-5xl font-bold font-heading text-secondary">
            FAQ&apos;s
          </h3>
        </div> -->

        <SfContentPages
          title="FAQ"
          @click:change="changeActive"
          :active="activePage"
          class="faqContentPages overflow-y-auto"
        >
          <SfContentPage
            v-for="(category, i) in categories"
            :key="i"
            :title="category"
          >
            <div v-if="loading">
              <Loading />
            </div>
            <div v-else class="max-w-4xl mx-auto">
              <h2 class="mb-4">{{ category }}</h2>
              <SfAccordion
                transition=""
                showChevron
                v-for="(faq, index) in contents"
                :key="faq.id"
                class="mb-4 px-4 lg:px-12 py-8 rounded-2xl darkAccordion"
                :class="isDarkMode ? 'bg-[#182533]' : 'bg-white'"
              >
                <SfAccordionItem header="Clothing" class="test rounded-2xl">
                  <template #header="{ isOpen, accordionClick }">
                    <div
                      @click="accordionClick"
                      :style="{ cursor: 'pointer' }"
                      class="flex justify-between text-base"
                      :class="isDarkMode ? 'bg-[#182533]' : 'bg-white'"
                    >
                      <div class="flex">
                        <span
                          class="text-xl font-sans font-bold w-auto mr-8 prose"
                          :class="isDarkMode ? 'bg-[#182533]' : 'bg-white'"
                          >{{ index + 1 }}</span
                        >
                        <h3 class="text-xl prose" v-html="faq.question"></h3>
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
                  <div class="font-sans mt-3 pl-5 ml-5 prose">
                    <p class="mb-4 text-base" v-html="faq.answer"></p>
                  </div>
                </SfAccordionItem>
              </SfAccordion>
            </div>
          </SfContentPage>
        </SfContentPages>
      </div>
    </section>
  </div>
</template>
<script>
import { SfAccordion, SfContentPages, SfTabs } from '@storefront-ui/vue';
import axios from 'axios';
import { useUiState } from '~/composables';
import Loading from '~/components/Loading';
import CryptoJS from 'crypto-js';

export default {
  middleware: ['csrf'],
  //   name: "Help&FAQ",
  components: {
    SfContentPages,
    SfAccordion,
    SfTabs,
    Loading,
  },
  created() {
    this.getFAQs();
  },
  data() {
    return {
      FAQs: [],
      loading: false,
      categories: [],
      activePage: '',
      contents: [],
    };
  },
  methods: {
    async getFAQs() {
      this.loading = true;
      const body = {
        query: `query getFAQ {
            getFaqs {
              answer
              id
              question
              isEnabled
              tags
              {
                id
                tag
              }
            }
          }`,
        csrfToken: this.$store.state.csrfToken.csrfToken,
      };
      const token = CryptoJS.AES.encrypt(
        this.$store.state.csrfToken.csrfToken,
        'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
      ).toString();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          berta: token,
        },
      };
      await axios.post(process.env.GRAPHQL_API, body, options).then((res) => {
        this.FAQs = res.data.data.getFaqs.filter((faq) => faq.isEnabled);
        this.loading = false;
        res.data.data.getFaqs?.forEach((faq) => {
          faq.tags?.forEach((tag) => {
            !this.categories.includes(tag.tag) && this.categories.push(tag.tag);
          });
        });
        if (this.categories.length > 0) {
          this.activePage = this.categories[0];
          this.contents = this.FAQs.filter((faq) =>
            faq.tags.some((tag) => tag.tag === this.categories[0])
          );
        }
      });
    },
    changeActive(title) {
      this.activePage = title;
      this.contents = this.FAQs.filter((faq) =>
        faq.tags.some((tag) => tag.tag === title)
      );
    },
  },
  setup() {
    const { isDarkMode } = useUiState();
    return {
      isDarkMode,
    };
  },
};
</script>
<style lang="scss" scoped>
.faq,
h2 {
  color: var(--c-text);
}
.accordion-bg {
  background-color: white;
}
</style>
