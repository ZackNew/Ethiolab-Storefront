<template>
  <SfFooter :column="4" multiple class="footer">
    <SfFooterColumn :title="$t('Order Support')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem class="footer-list-item">
          <router-link
            :to="isAuthenticated ? '/my-account/order-history' : '#'"
            exact
          >
            <SfMenuItem class="sf-footer__menu-item" :label="$t('Order')" />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/policy" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Return and Cancellation')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/policy/shipping" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Shipping Policy')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/policy/warranty-policy" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Warranty Policy')"
            />
          </router-link>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <!-- <SfFooterColumn :title="$t('Departments')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem
          v-for="item in departments"
          :key="item"
          class="footer-list-item"
        >
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
    </SfFooterColumn> -->
    <SfFooterColumn :title="$t('Customer Support')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem class="footer-list-item">
          <router-link to="/pages/contact" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Contact Us')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/pages/helpAndFAQ" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Help and FAQ')"
            />
          </router-link>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Company')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem class="footer-list-item">
          <router-link to="/page/about" exact>
            <SfMenuItem class="sf-footer__menu-item" :label="$t('About Us')" />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/policy/privacy" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Privacy Policy')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/policy/cookie-policy" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Cookie Policy')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/policy/terms-and-conditions" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Terms & Conditions')"
            />
          </router-link>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <!-- <SfFooterColumn :title="$t('Payment & Delivery')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem class="footer-list-item">
          <router-link to="/page/terms" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Purchase terms')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/page/guarantee" exact>
            <SfMenuItem class="sf-footer__menu-item" :label="$t('Guarantee')" />
          </router-link>
        </SfListItem>

        <SfListItem class="footer-list-item">
          <router-link to="/policy" exact>
            <SfMenuItem class="sf-footer__menu-item" :label="$t('Policy')" />
          </router-link>
        </SfListItem>
      </SfList>
    </SfFooterColumn> -->
    <SfFooterColumn :title="$t('Social')" class="footer-column">
      <div class="footer__socials">
        <div v-for="item in socials" :key="item.name">
          <a :href="item.link" target="_blank">
            <SfImage
              class="footer__social-image"
              :src="'/icons/' + item.name + '.svg'"
              :alt="item.name"
              width="32"
              height="32"
            />
          </a>
        </div>
      </div>
    </SfFooterColumn>
    <!-- {{ socials }} -->
  </SfFooter>
</template>

<script>
import {
  SfFooter,
  SfList,
  SfImage,
  SfMenuItem,
  SfInput,
} from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import axios from 'axios';

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
    SfInput,
  },
  data() {
    return {
      socialMedia: {},
      isMobile: false,
      desktopMin: 1024,
    };
  },
  setup() {
    const { isAuthenticated, load: loadUser, user } = useUser();
    (async () => await loadUser())();
    onSSR(async () => {
      await loadUser();
    });
    return {
      isAuthenticated,
    };
  },
  computed: {
    socials() {
      let name_link = [];
      // for (let i in this.socialMedia) {
      //   const j = i.split('_')[0];
      //   name_link.push({ name: j, link: 'nice' });
      // }
      let soci = {
        facebook_address:
          this.$store.state.companyDetails.companyInformation?.facebook_address,
        instagram_address:
          this.$store.state.companyDetails.companyInformation
            ?.instagram_address,
        twitter_address:
          this.$store.state.companyDetails.companyInformation?.twitter_address,
        linkdin_address:
          this.$store.state.companyDetails.companyInformation?.linkdin_address,
        telegram_address:
          this.$store.state.companyDetails.companyInformation?.telegram_address,
        youtube_address:
          this.$store.state.companyDetails.companyInformation?.youtube_address,
      };
      let sm = this.socialMedia;
      Object.keys(soci).forEach((s) => {
        const n = s.split('_')[0];
        name_link.push({ name: n, link: soci[s] });
      });
      return name_link;
    },
  },
  methods: {
    async getScocialMediaLinks() {
      const baseUrl = process.env.GRAPHQL_API;
      const body = {
        query: `query getSocials {
          getCompanyInfos {
            facebook_address
            instagram_address
            linkdin_address
            telegram_address
            twitter_address
            youtube_address
          }
        }`,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const companyScocialMedia = await axios.post(baseUrl, body, options);
      this.socialMedia = companyScocialMedia?.data.data?.getCompanyInfos;
    },
  },
  created() {
    this.getScocialMediaLinks();
  },
};
</script>

<style lang="scss">
.sf-footer__menu-item,
.sf-footer-column__title,
.footer-list-item {
  background-color: inherit;
}
.footer {
  margin-bottom: 3.75rem;
  background-color: var(--c-footer);
  border-top-color: var(--c-bg-primary);
  @include for-desktop {
    margin-bottom: 0;
    padding-top: 0.5;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-xs) 0 0;
  }
}
.sf-footer-column {
  &__title {
    // font-size: 30px;
    font-weight: bold !important;
  }
  // justify-content: space-between;
  background-color: inherit;
}
.sf-footer {
  // background-color: inherit;
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
