<template>
  <SfFooter :column="5" multiple class="footer">
    <SfFooterColumn :title="$t('About us')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem class="footer-list-item">
          <router-link to="/page/about" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Who we are')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/page/quality" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Quality in the details')"
            />
          </router-link>
        </SfListItem>
        <!-- <SfListItem class="footer-list-item">
            <router-link to="/page/reviews" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="$t('Customer reviews')"
              />
            </router-link>
          </SfListItem> -->
        <SfListItem class="footer-list-item">
          <router-link to="/pages/helpAndFAQ" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Help & FAQs')"
            />
          </router-link>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Departments')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem
          v-for="item in departments"
          :key="item"
          class="footer-list-item"
        >
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Company')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem class="footer-list-item">
          <router-link to="#" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Privacy Policy')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="#" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Terms & Conditions')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="#" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Cookie Policy')"
            />
          </router-link>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Help')" class="footer-column">
      <SfList class="footer-list">
        <SfListItem class="footer-list-item">
          <router-link to="/page/customer" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Customer service')"
            />
          </router-link>
        </SfListItem>
        <SfListItem class="footer-list-item">
          <router-link to="/pages/contact" exact>
            <SfMenuItem
              class="sf-footer__menu-item"
              :label="$t('Contact us')"
            />
          </router-link>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Payment & Delivery')" class="footer-column">
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
    </SfFooterColumn>
    <SfFooterColumn title="Social" class="footer-column">
      <div class="footer__socials">
        <SfImage
          class="footer__social-image"
          v-for="item in social"
          :key="item"
          :src="'/icons/' + item + '.svg'"
          :alt="item"
          width="32"
          height="32"
        />
      </div>
    </SfFooterColumn>
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
      departments: ['Surgery', 'Medical Imagery', 'General Laboratory'],
      social: ['facebook', 'pinterest', 'google', 'twitter', 'youtube'],
      isMobile: false,
      desktopMin: 1024,
    };
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
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer-column {
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
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style>
