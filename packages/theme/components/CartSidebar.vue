<template>
  <div>
    <RequestAQuote />
    <div id="cart" class="z-[500]">
      <SfSidebar
        v-e2e="'sidebar-cart'"
        :visible="isCartSidebarOpen"
        :title="$t('My Cart')"
        class="sf-sidebar--right"
        @close="toggleCartSidebar"
      >
        <template #content-top>
          <div style="display: flex; justify-content: space-between">
            <SfProperty
              v-if="totalItems"
              class="sf-property--large cart-summary desktop-only"
              :name="$t('Total items')"
              :value="totalItems"
            />
          </div>
        </template>
        <transition name="sf-fade" mode="out-in">
          <div v-if="totalItems" key="my-cart" class="my-cart">
            <div class="collected-product-list">
              <transition-group name="sf-fade" tag="div">
                <SfCollectedProduct
                  v-for="product in products"
                  v-e2e="'collected-product'"
                  :key="cartGetters.getItemName(product) + 'woman'"
                  :image="cartGetters.getItemImage(product)"
                  :title="cartGetters.getItemName(product)"
                  :regular-price="
                    cartGetters.getItemPrice(product).regular.toLocaleString() +
                    ' ETB'
                  "
                  :stock="99999"
                  @click:remove="removeFromCart({ product })"
                  class="collected-product"
                >
                  <template #configuration>
                    <div class="collected-product__properties">
                      <SfProperty
                        v-for="attribute in cartGetters.getItemOptions(product)"
                        :key="`${attribute.label}-${attribute.value}`"
                        :name="attribute.label"
                        :value="attribute.value"
                      />
                    </div>
                  </template>
                  <template #input>
                    <div class="sf-collected-product__quantity-wrapper">
                      <SfQuantitySelector
                        :disabled="loading"
                        :qty="cartGetters.getItemQty(product)"
                        class="sf-collected-product__quantity-selector"
                        @input="updateCartQuty({ product, quantity: $event })"
                      />
                    </div>
                  </template>
                </SfCollectedProduct>
              </transition-group>
            </div>
          </div>
          <div v-else key="empty-cart" class="empty-cart">
            <div class="empty-cart__banner">
              <SfImage
                :alt="$t('Empty bag')"
                class="empty-cart__image"
                src="/icons/empty-cart.svg"
              />
              <SfHeading
                :title="$t('Your cart is empty')"
                :level="2"
                class="empty-cart__heading"
                :description="$t('Empty')"
              />
            </div>
          </div>
        </transition>
        <template #content-bottom>
          <transition name="sf-fade">
            <div v-if="totalItems">
              <SfProperty
                :name="$t('Subtotal price')"
                class="sf-property--full-width sf-property--large my-cart__total-price"
              >
                <template #value>
                  <SfPrice
                    :regular="totals.subtotal.toLocaleString() + ' ETB'"
                  />
                </template>
              </SfProperty>
              <nuxt-link :to="localePath({ name: 'customer' })">
                <SfButton
                  v-e2e="'go-to-checkout-btn'"
                  class="sf-button--full-width color-secondary"
                  @click="toggleCartSidebar"
                >
                  {{ $t('Go to checkout') }}
                </SfButton>
              </nuxt-link>
              <SfButton
                class="sf-button--full-width color-secondary mt-3"
                @click="toggleQuoteDialog"
                >Request a Quote</SfButton
              >
            </div>
            <div v-else>
              <SfButton
                class="sf-button--full-width color-primary"
                @click="toggleCartSidebar"
                >{{ $t('Go back shopping') }}</SfButton
              >
            </div>
          </transition>
        </template>
      </SfSidebar>
    </div>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfQuantitySelector,
  SfInput,
} from '@storefront-ui/vue';
import { computed, watchEffect, inject } from '@vue/composition-api';
import { useCart, useUser, cartGetters } from '@vue-storefront/vendure';
import { useUiState } from '~/composables';
import { ref } from '@vue/composition-api';
import RequestAQuote from '~/components/RequestAQuote';
export default {
  name: 'Cart',
  components: {
    RequestAQuote,
    SfInput,
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfQuantitySelector,
  },
  setup() {
    const { isCartSidebarOpen, toggleQuoteModal, toggleCartSidebar } =
      useUiState();
    const { cart, removeItem, updateItemQty, loading, setCart } = useCart();
    const showToast = inject('showToast');
    const { isAuthenticated } = useUser();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

    const removeFromCart = (product) => {
      removeItem(product).then((res) => {
        if (cart?.value?.errorCode && cart.value.errorCode != '') {
          showToast(cart.value.message);
          setCart(cart.value.order);
        }
      });
    };

    const updateCartQuty = (params) => {
      const currentCart = cart.value;
      updateItemQty(params).then((res) => {
        if (cart?.value?.errorCode && cart.value.errorCode != '') {
          showToast(cart.value.message);
          setCart(currentCart);
        }
      });
    };

    const toggleQuoteDialog = () => {
      toggleCartSidebar();
      toggleQuoteModal();
    };
    return {
      toggleQuoteDialog,
      loading,
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters,
      removeFromCart,
      updateCartQuty,
    };
  },
};
</script>

<style lang="scss" scoped>
#t-area > textarea {
  height: 20%;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
}
#cart {
  --sidebar-z-index: 500;
  --overlay-z-index: 500;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
.cart-summary {
  margin-top: var(--spacer-xl);
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
</style>
