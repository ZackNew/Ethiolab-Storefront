<template>
  <div class="wrap">
    <SfMegaMenu :visible="isSearchOpen" title="Search results" class="search">
      <transition name="sf-fade" mode="out-in">
        <div
          v-if="result !== null"
          class="search__wrapper-results"
          key="results"
        >
          <!-- <SfMegaMenuColumn
            title="Categories"
            class="sf-mega-menu-column--pined-content-on-mobile search__categories"
          >
            <template #title="{ title }">
              <SfMenuItem :label="title">
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <SfList>
              <template v-for="res in result">
                <SfListItem
                  v-for="category in res._categoriesRef"
                  :key="category.id"
                >
                  <SfMenuItem
                    :label="category.name"
                    :link="localePath(`/c/${category.slug}`)"
                  >
                    <template #mobile-nav-icon> &#8203; </template>
                  </SfMenuItem>
                </SfListItem>
              </template>
            </SfList>
          </SfMegaMenuColumn> -->
          <SfMegaMenuColumn
            title="Product suggestions"
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon> &#8203; </template>
              </SfMenuItem>
            </template>
            <div
              class="results--desktop desktop-only overflow-auto"
              show-text=""
              hide-text=""
            >
              <SfScrollable
                class="results--desktop desktop-only"
                show-text=""
                hide-text=""
              >
                <div class="results-listing">
                  <ProductCard
                    v-for="r in result"
                    :key="r.id"
                    :title="r.name"
                    :image="r.images"
                    :imageHeight="260"
                    :imageWidth="290"
                    :alt="r.name"
                    :regular-price="r.price.current + ' ETB'"
                    :max-rating="5"
                    :score-rating="r.rating"
                    :show-add-to-cart-button="false"
                    :link="localePath(`/v/${r.slug}`)"
                    class="products__product-card mr-2 mb-4"
                  />
                </div>
              </SfScrollable>
            </div>
            <div class="results--mobile smartphone-only">
              <ProductCard
                v-for="r in result"
                :key="r._id"
                class="result-card"
                :regular-price="r.price.current + ' ETB'"
                :score-rating="r.rating"
                :image="r.images"
                :alt="r.name"
                :title="r.name"
                :max-rating="5"
                :imageHeight="198"
                :imageWidth="128"
                :link="localePath(`/v/${r.slug}`)"
              />
            </div>
          </SfMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <SfButton
              class="action-buttons__button color-light"
              @click="$emit('close')"
            >
              Cancel
            </SfButton>
          </div>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage
            :src="'/error/error.svg'"
            class="before-results__picture"
            alt="error"
            loading="lazy"
          />
          <template v-if="term">
            <p class="before-results__paragraph">
              We haven’t found any results for given phrase
            </p>
          </template>
          <template v-else>
            <p class="before-results__paragraph">
              You haven’t searched for items yet
            </p>
            <p class="before-results__paragraph">
              Let’s start now – we’ll help you
            </p>
          </template>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            Go back
          </SfButton>
        </div>
      </transition>
    </SfMegaMenu>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfBanner,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfImage,
} from '@storefront-ui/vue';
import { ref, watch, computed } from '@nuxtjs/composition-api';
import { productGetters } from '@vue-storefront/vendure';
import ProductCard from './ProductCard.vue';

export default {
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfList,
    SfBanner,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SfImage,
    ProductCard,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Array,
    },
    term: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const isSearchOpen = ref(props.visible);
    const products = computed(() => props.result?.value?.data?.items);
    const categories = computed(() => {
      return props.result?.value?.data?.collections;
    });

    watch(
      () => props.visible,
      (newVal) => {
        isSearchOpen.value = newVal;
        if (isSearchOpen.value) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
          emit('removeSearchResults');
        }
      }
    );

    return {
      isSearchOpen,
      productGetters,
      products,
      categories,
    };
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    // max-width: 12400px;
    width: 91%;
    padding: 0;
    margin: 0 auto;
  }
}
.search {
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 1140px;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  background-color: var(--c-accent);
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
    height: auto;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    width: 100%;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    @include for-desktop {
      margin: var(--spacer-sm) 0 var(--spacer-xl);
      flex: 0 0 13.75rem;
    }
  }
  &__categories > .sf-button {
    --menu-item-text-transform: uppercase;
    margin: var(--spacer-sm) var(--spacer-sm) var(--spacer-xl);
    @include for-desktop {
      margin: 0 var(--spacer-sm) var(--spacer-xl) 0;
    }
  }
  &__results {
    flex: 1;
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.results {
  &--desktop {
    --scrollable-max-height: 65vh;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
