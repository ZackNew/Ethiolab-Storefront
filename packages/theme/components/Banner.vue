<template>
  <section class="sf-banner" :style="style" v-on="$listeners">
    <!-- <component :is="wrapper" class="sf-banner__wrapper" :link="link">
      <slot name="subtitle" v-bind="{ subtitle }">
        <span
          :class="{ 'display-none': !subtitle }"
          class="sf-banner__subtitle"
        >
          {{ subtitle }}
        </span>
      </slot>
      <slot name="title" v-bind="{ title }">
        <span :class="{ 'display-none': !title }" class="sf-banner__title">
          {{ title }}
        </span>
      </slot>
      <slot name="description" v-bind="{ description }">
        <span
          :class="{ 'display-none': !description }"
          class="sf-banner__description"
        >
          {{ description }}
        </span>
      </slot>
      <slot name="call-to-action" v-bind="{ buttonText }" />
    </component> -->
    <div class="sf-banner__wrapper-desktop" :link="link">
      <!-- <slot name="subtitle" v-bind="{ subtitle }">
        <span
          :class="{ 'display-none': !subtitle }"
          class="sf-banner__subtitle"
        >
          {{ subtitle }}
        </span>
      </slot> -->
      <!-- <slot name="title" v-bind="{ title }">
        <span :class="{ 'display-none': !title }" class="sf-banner__title">
          {{ title }}
        </span>
      </slot> -->
      <slot name="description" v-bind="{ description }">
        <span
          :class="{ 'display-none': !description }"
          class="sf-banner__description"
          v-html="description"
        >
          <!-- {{ description }} -->
        </span>
      </slot>
      <slot name="call-to-action" v-bind="{ buttonText }">
        <SfButton
          v-if="buttonText"
          :link="link"
          class="sf-banner__call-to-action color-secondary hover:bg-white rounded"
          data-testid="banner-cta-button"
          v-on="$listeners"
        >
          {{ buttonText }}
        </SfButton>
      </slot>
    </div>
    <slot name="img-tag" />
  </section>
</template>
<script>
import { SfButton, SfLink } from '@storefront-ui/vue';
export default {
  name: 'SfBanner',
  components: {
    SfButton,
    SfLink,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: null,
    },
    background: {
      type: String,
      default: '',
    },
    image: {
      type: [String, Object],
      default: '',
    },
    imageTag: {
      type: String,
      default: null,
    },
    nuxtImgConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    style() {
      const image = this.image;
      const background = this.background;
      const nuxtImgConvert = (imgUrl) => {
        return `url(${this.$img(imgUrl, this.nuxtImgConfig)})`;
      };
      if (this.imageTag === 'nuxt-img' || this.imageTag === 'nuxt-picture') {
        return {
          '--_banner-background-image': image.mobile
            ? nuxtImgConvert(image.mobile)
            : nuxtImgConvert(image),
          '--_banner-background-desktop-image':
            image.desktop && nuxtImgConvert(image.desktop),
          '--_banner-background-color': background,
        };
      }
      return {
        '--_banner-background-image': image.mobile
          ? `url(${image.mobile})`
          : `url(${image})`,
        '--_banner-background-desktop-image':
          image.desktop && `url(${image.desktop})`,
        '--_banner-background-color': background,
      };
    },
    wrapper() {
      return this.link ? 'SfLink' : 'SfButton';
    },
  },
};
</script>
<style lang="scss" scoped>
// @import '../../helpers';
.sf-banner {
  box-sizing: border-box;
  display: var(--banner-display, flex);
  justify-content: var(--banner-justify-content, flex-start);
  width: var(--banner-width, 100%);
  min-height: var(--banner-height, 21.4375rem);
  @include background(
    --banner-background,
    var(--_banner-background-color, transparent),
    var(--_banner-background-image)
  );
  --banner-background-position: 60%;
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: var(--banner-align-items, flex-start);
    justify-content: var(--banner-wrapper-justify-content, flex-start);
    flex-direction: var(--banner-wrapper-flex-direction, column);
    padding: var(--banner-padding, var(--spacer-xl));
    flex: 0 0 var(--banner-wrapper-width, 100%);
    text-decoration: none;
    &.sf-button,
    &.sf-button:hover,
    &.sf-button:active {
      --button-background: transparent;
      --button-box-shadow-opacity: 0;
    }
    @include for-desktop {
      display: none;
    }
  }
  &__wrapper-desktop {
    display: flex;
    flex-direction: column;
    align-items: var(--banner-align-items, flex-start);
    justify-content: var(--banner-wrapper-justify-content, flex-start);
    flex-direction: var(--banner-wrapper-flex-direction, column);
    padding: var(--banner-padding, var(--spacer-xl));
    flex: 0 0 var(--banner-wrapper-width, 100%);
    text-decoration: none;
    &.sf-button,
    &.sf-button:hover,
    &.sf-button:active {
      --button-background: transparent;
      --button-box-shadow-opacity: 0;
    }
    @include for-mobile {
      display: none;
    }
  }
  &__subtitle {
    margin: var(--banner-subtitle-margin, 0);
    color: var(
      --banner-color,
      var(--banner-subtitle-color, var(--c-dark-variant))
    );
    @include font(
      --banner-subtitle-font,
      var(--font-weight--normal),
      var(--font-size--base),
      1.4,
      var(--font-family--secondary)
    );
    text-transform: var(--banner-subtitle-text-transform, uppercase);
  }
  img,
  &__image {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: inherit;
    min-height: inherit;
    object-fit: cover;
  }
  &__title {
    margin: var(--banner-title-margin, var(--spacer-2xs) 0 0 0);
    color: var(--banner-color, var(--banner-title-color, var(--c-text)));
    @include font(
      --banner-title-font,
      var(--font-weight--normal),
      var(--h2-font-size),
      1.4,
      var(--font-family--secondary)
    );
    text-transform: var(--banner-title-text-transform, uppercase);
  }
  &__description {
    display: var(--banner-description-display, none);
    margin: var(
      --banner-description-margin,
      var(--spacer-sm) 0 var(--spacer-base) 0
    );
    color: var(--banner-color, var(--banner-description-color, var(--c-text)));
    text-align: var(--banner-description-text-align, left);
    @include font(
      --banner-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__call-to-action {
    --button-color: var(--c-light-variant);
    display: var(--banner-display-call-to-action, none);
    text-decoration: none;
    @include font(
      --banner-title-font,
      var(--font-weight--normal),
      var(--h4-font-size),
      1.4,
      var(--font-family--secondary)
    );
  }
  @include for-desktop {
    --banner-background-image: var(
      --_banner-background-desktop-image,
      var(--_banner-background-image)
    );
    --banner-wrapper-width: 50%;
    --banner-description-display: block;
    --banner-display-call-to-action: block;
    --banner-title-margin: var(--spacer-sm) 0 0 0;
    --banner-subtitle-color: var(--c-gray);
    align-items: var(--banner-align-items, center);
    min-height: var(--banner-height, 25rem);
    &__wrapper {
      pointer-events: none;
      & > * {
        pointer-events: initial;
      }
    }
    &__call-to-action {
      --button-padding: var(--spacer-xs) var(--spacer-xl);
      pointer-events: auto;
    }
    &--right {
      --banner-justify-content: flex-end;
    }
  }
}
</style>
