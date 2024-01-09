<template>
  <div id="category">
    <div
      class="topPosition"
      :class="!isDarkMode ? 'bg-whole_bg' : 'bg-dark_accent'"
    >
      <nav class="sf-breadcrumbs m-4" aria-label="breadcrumbs">
        <ol class="sf-breadcrumbs__list">
          <li class="sf-breadcrumbs__list-item" :aria-current="false">
            <span class="text-black">
              <nuxt-link
                class="sf-breadcrumbs__breadcrumb font-exrathin"
                to="/"
              >
                Home
              </nuxt-link>
            </span>
          </li>
          <li class="sf-breadcrumbs__list-item" :aria-current="false">
            <p class="text-secondary">
              {{ currentCategory !== null ? currentCategory.name : 'Loading' }}
            </p>
          </li>
        </ol>
      </nav>
      <div class="navbar section">
        <div class="navbar__aside desktop-only">
          <LazyHydrate never>
            <!-- <SfHeading 
            :level="3"
            :title="$t('Categories')"
            class="navbar__title text-secondary"
          /> -->
            <h1 class="text-secondary font-bold text-3xl">Categories</h1>
          </LazyHydrate>
        </div>

        <div class="navbar__main">
          <!-- <LazyHydrate on-interaction>
            <SfButton
              class="sf-button--text navbar__filters-button text-secondary"
              :aria-label="$t('Filters')"
              @click="toggleFilterSidebar"
            >
              <SfIcon
                size="24px"
                color="dark-secondary"
                icon="filter2"
                class="navbar__filters-icon"
              />
              {{ $t('Filters') }}
            </SfButton>
          </LazyHydrate> -->

          <div class="navbar__sort desktop-only">
            <span class="navbar__label text-secondary"
              >{{ $t('Sort by') }}:</span
            >
            <LazyHydrate on-interaction>
              <SfSelect
                :style="!isDarkMode ? '' : 'background-color: #182533'"
                :value="sortBy.selected"
                :placeholder="allSortBy"
                class="navbar__select"
                @input="sortAllProducts($event)"
              >
                <SfSelectOption
                  :style="!isDarkMode ? '' : 'background-color: #182533'"
                  v-for="option in sortBy.options"
                  :key="option ? option.id : ''"
                  :value="option ? option.id : ''"
                  class="sort-by__option"
                  >{{ option.value }}</SfSelectOption
                >
              </SfSelect>
            </LazyHydrate>
          </div>

          <div class="navbar__counter">
            <span class="navbar__label desktop-only text-secondary"
              >{{ $t('Products found') }}:
            </span>
            <span class="desktop-only text-secondary font-bold">{{
              allProducts ? allProducts.length : ''
            }}</span>
            <span class="navbar__label smartphone-only text-secondary"
              >{{ allProducts ? allProducts.length : '' }}
              {{ $t('Items') }}</span
            >
          </div>

          <div class="navbar__view">
            <span class="navbar__view-label desktop-only text-secondary">{{
              $t('View')
            }}</span>
            <SfIcon
              v-e2e="'tiles-icon'"
              class="navbar__view-icon"
              :color="isCategoryGridView ? '#b6932f' : 'dark-secondary'"
              icon="tiles"
              size="12px"
              role="button"
              :aria-label="$t('Change to grid view')"
              :aria-pressed="isCategoryGridView"
              @click="changeToCategoryGridView"
            />
            <SfIcon
              v-e2e="'list-icon'"
              class="navbar__view-icon"
              :color="!isCategoryGridView ? '#b6932f' : 'dark-secondary'"
              icon="list"
              size="12px"
              role="button"
              :aria-label="$t('Change to list view')"
              :aria-pressed="!isCategoryGridView"
              @click="changeToCategoryListView"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate when-idle>
          <SfLoader
            :class="{ 'loading--categories': loading }"
            :loading="loading"
          >
            <SfAccordion
              :style="
                !isDarkMode
                  ? 'background-color: #ffffff'
                  : 'background-color: #182533'
              "
              open="all"
              :show-chevron="true"
              class="shadow-md w-80 top-32"
            >
              <SfAccordionItem
                :header="
                  currentCategory !== null ? currentCategory.name : 'Loading...'
                "
                class="categoryAcordion"
              >
                <template>
                  <SfList class="list p-2">
                    <!-- <SfListItem class="list__item">
                      <SfMenuItem :count="cat.count || ''" :label="cat.label">
                        <template #label>
                          <nuxt-link
                            :to="localePath(th.getCatLink(cat))"
                            :class="
                              cat.isCurrent ? 'sidebar--cat-selected' : ''
                            "
                            class="text-secondary"
                          >
                            All
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem> -->
                    <SfListItem
                      class="list__item"
                      v-for="(subCat, j) in subcategories"
                      :key="j"
                    >
                      <SfMenuItem>
                        <template #label>
                          <nuxt-link
                            :to="'/s/' + subCat.slug"
                            class="text-secondary text-xs md:text-lg"
                          >
                            {{ subCat.name }}
                          </nuxt-link>
                        </template>
                      </SfMenuItem>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
              <div class="p-3 hidden md:block border-t-2 border-[#efefef]">
                <!-- :buttonText="adSection.buttonText || 'AD Button'" -->
                <LazyHydrate v-if="adSection">
                  <Banner
                    :title="adSection.title || 'AD Title'"
                    :subtitle="adSection.overview || 'AD Overview'"
                    :description="adSection.description || 'AD Description'"
                    background=""
                    :image="adImage || '/homepage/bannerA.webp'"
                    link="/c/clinical-laboratory"
                  >
                  </Banner>
                </LazyHydrate>
              </div>
            </SfAccordion>
          </SfLoader>
        </LazyHydrate>
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products m-5" v-if="!loading">
          <div v-for="(cat, i) in rawCategoryTree && rawCategoryTree" :key="i">
            <div
              v-if="cat.isCurrent === true && cat.slug === lastSlug"
              class=""
            >
              <div class="rounded-xl bg-light_gray my-4 flex max-h-40">
                <img
                  :src="
                    cat.featuredAsset
                      ? cat.featuredAsset.preview
                      : '/categories/cat2.jpeg'
                  "
                  class="object-cover rounded-r rounded-xl my-auto max-h-40 min-h-40 bg-light max-w-[22%] min-w-[22%]"
                />
                <div class="w-full overflow-auto no-scrollbar">
                  <p
                    class="py-4 ml-4 mr-4 text-secondary text-thin prose"
                    v-html="cat.description || `Category Description`"
                  ></p>
                </div>
                <!-- <div
                  v-html="cat.description || `Category Description`"
                  class="text-white col-span-2 pt-5 overflow-auto max-h-40"
                ></div> -->
                <!-- <p class="text-white col-span-2 pt-5 ">Get the precision calibration tools you need to maintain the accuracy of your process,
                electrical, temperature, pressure, and flow measuring instruments and equipment. In addition, our in-house
                metrology lab will precalibrate an instrument at time of order or recalibrate equipment already owned. 
                Our NIST-traceable calibration services and repairs help you meet your quality, regulatory, 
                and compliance needs.</p> -->
              </div>
            </div>
          </div>

          <LazyHydrate>
            <!-- <CategoryFeature /> -->
            <div v-if="subcategories">
              <h3
                class="text-secondary"
                :style="!isDarkMode ? '' : 'color: white'"
              >
                Featured
              </h3>
              <!-- <div class="grid grid-cols-3 gap-10 mt-10 mb-10" > -->
              <!-- <p>my category {{categoryTree?.value.items[0].label}}</p> -->
              <!-- <div
                v-for="(cat, i) in rawCategoryTree && rawCategoryTree"
                :key="i"
              > -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1 mb-2">
                <div
                  v-for="subCat in subcategories.slice(0, limitSub)"
                  :key="subCat.slug"
                >
                  <div>
                    <nuxt-link :to="`/s/${subCat.slug}`">
                      <img
                        :src="subCat.image"
                        class="w-full md:h-44 xs:h-60 object-cover shadow-xl hover:shadow-2xl transition duration-300 rounded"
                      />
                      <div class="mt-1">
                        <h4
                          :style="!isDarkMode ? '' : 'color: white'"
                          class="text-secondary font-thin text-lg"
                        >
                          {{ subCat.name }}
                        </h4>
                      </div>
                    </nuxt-link>
                  </div>
                </div>
                <button
                  v-if="subcategories && subcategories.length > limitSub"
                  class="text-secondary text-left"
                  @click="increaseSubLimit"
                >
                  Show More +
                </button>
                <!-- </div> -->
                <!-- <div :v-for="sub in value.items">
                                  <div class="max-w-sm rouned overflow-hidden shadow-xl">
                              
                                  <div class="m-4">
                                          <h4 class="">{{sub.label}}</h4>
                                    </div>
                                    <img v-if="sub.featuredAsset" :src="sub.featuredAsset.preview" class="w-full h-32 sm:h-48 object-cover" />
                              </div>
                                   
                      
                            </div> -->
              </div>
              <!-- </div> -->
            </div>

            <!-- categoryTree.value[0]?.items -->
          </LazyHydrate>

          <h3
            class="mt-8 pb-1 mb-1 text-secondary"
            :style="!isDarkMode ? '' : 'color: white'"
          >
            Products Under This Category
          </h3>
          <div>
            <transition-group
              v-if="isCategoryGridView"
              appear
              name="products__slide"
              tag="div"
              class="grid grid-cols-1 md:grid-cols-3 gap-2"
            >
              <div
                v-for="product in allProducts.slice(0, limit)"
                :key="product._id"
              >
                <template>
                  <ProductCard
                    :id="product._id"
                    v-e2e="'category-product-card'"
                    :title="product.name"
                    :image="
                      product.images[0] !== 'undefined'
                        ? product.images[0]
                        : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740'
                    "
                    :imageHeight="290"
                    :imageWidth="500"
                    :regular-price="product.price + ' ETB'"
                    :max-rating="5"
                    :score-rating="product.rating ? product.rating : ''"
                    :variantId="product._variantId"
                    :show-add-to-cart-button="true"
                    :isOrderBased="product.isOrderBased"
                    :isInWishlist="isInWishlist({ product })"
                    :isAddedToCart="isInCart({ product })"
                    :link="localePath(`/v/${product.slug}`)"
                    @click:wishlist="
                      !isInWishlist({ product })
                        ? addItemToWishlist({ product })
                        : removeItemFromWishlist({ product })
                    "
                    @click:add-to-cart="addToCart"
                    class="carousel__item__product mb-5"
                  />
                </template>
              </div>
            </transition-group>
            <transition-group
              v-else
              appear
              name="products__slide"
              tag="div"
              class="products__list"
            >
              <!-- :description="productGetters.getDescription(product)" -->
              <div
                v-for="(product, i) in allProducts"
                :key="product._id"
                class="w-full"
              >
                <template v-if="i < limit">
                  <SfProductCardHorizontal
                    v-e2e="'category-product-card'"
                    :qty="itemQuantity"
                    :title="productGetters.getName(product)"
                    :image="productGetters.getCoverImage(product)"
                    :regular-price="product.price + ' ETB'"
                    :isInWishlist="isInWishlist({ product })"
                    :variantId="product._variantId"
                    class="products__product-card-horizontal"
                    @input="productQuantity[product._id] = $event"
                    @click:wishlist="
                      !isInWishlist({ product })
                        ? addItemToWishlist({ product })
                        : removeItemFromWishlist({ product })
                    "
                    @click:add-to-cart="
                      addItemToCart({
                        product,
                        quantity:
                          Number(productQuantity[product._id]) || itemQuantity,
                      })
                    "
                    :link="localePath(`/v/${productGetters.getSlug(product)}`)"
                  >
                    <template
                      v-if="product.options && product.options.length > 0"
                      #configuration
                    >
                      <div v-for="(option, i) in product.options" :key="i">
                        <p class="text-secondary">{{ option.code }}</p>
                      </div>
                    </template>
                    <template #actions>
                      <SfButton
                        v-if="!isInWishlist({ product })"
                        class="sf-button--text text-secondary desktop-only"
                        style="margin: 0 0 1rem auto; display: block"
                        @click="addItemToWishlist({ product })"
                      >
                        {{ $t('Add to Wishlist') }}
                      </SfButton>
                      <SfButton
                        v-else
                        class="sf-button--text text-secondary desktop-only"
                        style="margin: 0 0 1rem auto; display: block"
                        @click="removeItemFromWishlist({ product })"
                      >
                        {{ $t('Remove from wishlist') }}
                      </SfButton>
                      <SfButton
                        class="sf-button--text text-secondary desktop-only"
                        style="margin: 0 0 1rem auto; display: block"
                        @click="
                          addToCompareList(
                            product._variantId,
                            product._id,
                            productGetters.getCoverImage(product)
                          )
                        "
                      >
                        {{ $t('Add to compare list') }}
                      </SfButton>
                    </template>
                  </SfProductCardHorizontal>
                </template>
              </div>
            </transition-group>
          </div>
          <button
            v-if="allProducts.length > limit"
            class="text-secondary"
            @click="increaseLimit"
          >
            Show More +
          </button>

          <!-- <LazyHydrate on-interaction>
            <SfPagination
              v-if="!loading"
              class="products__pagination desktop-only"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="5"
            />
          </LazyHydrate>

          <div
            v-show="pagination.totalPages > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{
              $t('Show on page')
            }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="pagination.itemsPerPage.toString()"
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
              >
                <SfSelectOption
                  v-for="option in pagination.pageOptions"
                  :key="option"
                  :value="option"
                  class="products__items-per-page__option"
                >
                  {{ option }}
                </SfSelectOption>
              </SfSelect>
            </LazyHydrate>
          </div> -->

          <h3
            v-if="bestSellings && bestSellings.length !== 0"
            class="font-bold text-secondary mt-12 pb-2 mb-10"
          >
            Shop Our Best Sellers
          </h3>

          <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div v-for="product in bestSellings" :key="product._id">
              <ProductCard
                v-e2e="'category-product-card'"
                :title="product.name"
                :image="product.images"
                :imageHeight="290"
                :imageWidth="500"
                :regular-price="product.price.current + ' ETB'"
                :max-rating="5"
                :score-rating="product.rating"
                :show-add-to-cart-button="true"
                :isInWishlist="isInWishlist({ product })"
                :isAddedToCart="isInCart({ product })"
                :link="localePath(`/v/${product.slug}`)"
                @click:wishlist="
                  !isInWishlist({ product })
                    ? addItemToWishlist({ product })
                    : removeItemFromWishlist({ product })
                "
                @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
                class="carousel__item__product mb-5"
              />
              <!-- <a :href="`/v/${i.slug}`">
                <img
                  :src="i.preview"
                  alt=""
                  class="w-full h-32 sm:h-48 object-cover scale-100 hover:scale-75 ease-out duration-300"
                />
              </a>
              <h4 class="text-center m-3">{{ i.name }}</h4>
              <h4 class="text-center m-3">{{ i.priceWithTax }}</h4>
              <button>
                <a :href="`/v/${i.slug}`"> View </a>
              </button>
              <div class="text-center">
              </div> -->
            </div>
          </div>
        </div>
      </SfLoader>
    </div>

    <LazyHydrate when-idle>
      <SfSidebar
        :visible="isFilterSidebarOpen"
        :title="$t('Filters')"
        class="sidebar-filters"
        @close="toggleFilterSidebar"
      >
        <div class="filters desktop-only">
          <div v-for="(facet, i) in facets" :key="i">
            <SfHeading
              :level="4"
              :title="facet.label"
              class="filters__title sf-heading--left"
              :key="`filter-title-${facet.id}`"
            />
            <div>
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.attrName}-${option.value}`"
                :label="
                  option.attrName +
                  `${option.count ? ` (${option.count})` : ''}`
                "
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </div>
          </div>
        </div>
        <SfAccordion class="filters smartphone-only">
          <div v-for="(facet, i) in facets" :key="i">
            <SfAccordionItem
              :key="`filter-title-${facet.id}`"
              :header="facet.label"
              class="filters__accordion-item"
            >
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.id}`"
                :label="option.attrName"
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </SfAccordionItem>
          </div>
        </SfAccordion>
        <template #content-bottom>
          <div class="filters__buttons">
            <SfButton class="sf-button--full-width" @click="applyFilters">{{
              $t('Done')
            }}</SfButton>
            <SfButton
              class="sf-button--full-width filters__button-clear"
              @click="clearFilters"
              >{{ $t('Clear all') }}</SfButton
            >
          </div>
        </template>
      </SfSidebar>
    </LazyHydrate>
  </div>
</template>

<script>
import axios from 'axios';
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty,
} from '@storefront-ui/vue';
import { ref, computed, onMounted, inject } from '@vue/composition-api';
import Banner from '~/components/Banner.vue';
import ProductCard from '~/components/ProductCard.vue';
import {
  useCategory,
  useCart,
  useWishlist,
  productGetters,
  useFacet,
  facetGetters,
  categoryGetters,
} from '@vue-storefront/vendure';
import { useUiHelpers, useUiState } from '~/composables';
import { getTreeWithoutEmptyCategories } from '~/helpers';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import { useCms } from '@vue-storefront/vendure';
import Vue from 'vue';
import CategoryFeature from '~/components/CategoryFeature.vue';
import CryptoJS from 'crypto-js';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  name: 'Category',
  middleware: ['csrf'],
  transition: 'fade',
  setup(props, context) {
    const showToast = inject('showToast');
    const { isDarkMode } = useUiState();
    const productQuantity = ref({});
    const itemQuantity = ref(1);
    const th = useUiHelpers();
    const uiState = useUiState();
    const {
      addItem: addItemToCart,
      isInCart,
      cart,
      setCart,
      load: loadCart,
    } = useCart();
    const { getCms } = useCms();
    const adImage = computed(() => getCms.value[2]?.featuredAsset?.preview);
    const adSection = computed(() =>
      JSON.parse(getCms.value[2]?.content ?? '{}')
    );
    const {
      addItem: addItemToWishlist,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const { result, search, loading } = useFacet();
    const { changeFilters, isFacetColor } = useUiHelpers();
    const { toggleFilterSidebar } = useUiState();

    // TODO: Refactor this to work on path rather than slugs because slug params are undefined so we have to filter them.
    const lastSlug = th.getLastSlugFromParams();

    const addToCart = (e) => {
      loadCart();
      const cartBefore = cart.value;
      addItemToCart({
        product: {
          _variantId: e._variantId,
        },
        quantity: e.quantity,
      }).then((res) => {
        if (cart.value.errorCode && cart.value.errorCode != '') {
          showToast(cart.value.message);
          setCart(cart.value.order);
        } else {
          showToast('Product added to cart!');
        }
      });
    };

    const searchResult = computed(() =>
      facetGetters.getAgnosticSearchResult(result.value)
    );

    const toastShower = (message) => {
      showToast(message);
    };
    const sortBy = computed(() =>
      facetGetters.getSortOptions(searchResult.value)
    );
    const facets = computed(() => facetGetters.getGrouped(searchResult.value));
    const products = computed(() =>
      facetGetters.getProducts(searchResult.value)
    );

    const rawBreadcrumbs = computed(() =>
      facetGetters.getBreadcrumbsFromSlug(searchResult.value, lastSlug)
    );
    const breadcrumbs = computed(() =>
      th.getFormattedBreadcrumbs(rawBreadcrumbs.value)
    );
    // TODO: Refactor this getter
    const rawPagination = computed(() =>
      facetGetters.getPagination(searchResult.value)
    );
    const pagination = computed(() => ({
      page: parseInt(context.root.$route.query.page, 10) || 1,
      ...rawPagination.value,
    }));
    // TODO: Refactor this getter
    const rawCategoryTree = computed(() =>
      searchResult.value?.data?.categories?.map((category) => {
        const tree = facetGetters.getTree(category.collection);
        tree.isCurrent = th.doesUrlIncludesCategory(tree.slug);
        return tree;
      })
    );

    const categoryTree = computed(() =>
      getTreeWithoutEmptyCategories(rawCategoryTree.value).filter(
        (cat) => cat.slug === lastSlug || cat.isCurrent === true
      )
    );
    const categoryTreeMain = computed(() => {
      return categoryTree.value[0]?.label;
    });
    // categoryTree.filter((cat) => cat.slug === lastSlug);
    const activeCategory = computed(() => {
      const items = categoryTree.value;

      if (!items || !items?.length) {
        return '';
      }

      const category = items.find(
        ({ isCurrent, items }) =>
          isCurrent || items.find(({ isCurrent }) => isCurrent)
      );

      return category?.label || items[0].label;
    });
    const selectedFilters = ref({});
    const setSelectedFilters = () => {
      if (!facets.value?.length || Object.keys(selectedFilters.value)?.length)
        return;
      selectedFilters.value = facets.value.reduce(
        (prev, curr) => ({
          ...prev,
          [curr?.id]: curr.options.filter((o) => o.selected).map((o) => o?.id),
        }),
        {}
      );
    };

    onSSR(async () => {
      await search({ ...th.getFacetsFromURL() });
      setSelectedFilters();
    });

    onMounted(() => {
      context.root.$scrollTo(context.root.$el, 2000);
      setSelectedFilters();

      // sort =  localStorage.getItem("sort");
    });

    const isFilterSelected = (facet, option) =>
      (selectedFilters.value.attributes || []).includes(option?.id);

    const selectFilter = (facet, option) => {
      if (!selectedFilters.value.attributes) {
        Vue.set(selectedFilters.value, 'attributes', []);
      }

      if (selectedFilters.value?.attributes.find((f) => f === option?.id)) {
        const filterIndex = selectedFilters.value?.attributes.indexOf(
          option?.id
        );
        if (filterIndex > -1) {
          selectedFilters.value?.attributes?.splice(filterIndex, 1);
        }
        return;
      }

      selectedFilters.value.attributes.push(option?.id);
    };

    const clearFilters = () => {
      toggleFilterSidebar();
      selectedFilters.value = {};
      changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      toggleFilterSidebar();
      changeFilters(selectedFilters.value);
    };

    return {
      adSection,
      adImage,
      isDarkMode,
      ...uiState,
      productQuantity,
      th,
      products,
      categoryTree,
      loading,
      productGetters,
      categoryGetters,
      pagination,
      activeCategory,
      sortBy,
      facets,
      categoryTreeMain,
      breadcrumbs,
      addItemToWishlist,
      removeItemFromWishlist,
      isInWishlist,
      addItemToCart,
      isInCart,
      isFacetColor,
      selectFilter,
      isFilterSelected,
      selectedFilters,
      clearFilters,
      applyFilters,
      cart,
      itemQuantity,
      rawCategoryTree,
      lastSlug,
      toastShower,
      addToCart,
    };
  },
  components: {
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
    CategoryFeature,
    ProductCard,
    Banner,
  },
  methods: {
    increaseLimit() {
      this.limit += 6;
    },
    increaseSubLimit() {
      this.limitSub += 6;
    },
    async getActiveCategory() {
      const slug = this.$route.params.slug_1;
      const body = {
        query: `
        query getCategoriesProducts($slug: String!){
          collection(slug: $slug){
            id
            name
            children{
              name
              slug
              featuredAsset{
                preview
              }
            }
            products{
              id
              name
              slug
              description
              optionGroups{
                code
              }
              featuredAsset{
                preview
              }
              variants{
                id
                price
              }
              collections{
                id
              }
              customFields{
                reviewRating
              }
              variantList {
                items {
                  customFields {
                    showprice
                  }
                }
              }
            }
          }
        }`,
        variables: { slug: slug },
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
      await axios.post('/api/shop', body, options).then((res) => {
        this.currentCategory = res.data.data.data?.collection;
        const products = this.currentCategory?.products?.map((product) => {
          let cref = [];
          product?.collections?.forEach((x) => {
            cref.push(String(x?.id));
          });
          const image = [String(product?.featuredAsset?.preview)];
          const price = product?.variants.map((item) => {
            return {
              price: String(item?.price).slice(0, -2) +
                '.' +
                String(item?.price).slice(-2),
            };
          });
          const itemsWithShowPrice = product?.variantList?.items.map((item) => {
                return{
                  showprice:item?.customFields?.showprice,
                };
          });
          const prod = {
            _id: product?.id,
            _variantId: product?.variants[0]?.id,
            _description: product.description,
            _categoriesRef: cref,
            name: product.name,
            images: image,
            price: price,
            slug: product.slug,
            rating: product?.customFields?.reviewRating,
            isOrderBased: product?.customFields?.is_order_based,
            options: product?.optionGroups,
            itemsWithShowPrice: itemsWithShowPrice,
          };
          return prod ;
        });
        this.allProducts = products;
        let newArray = [];
        if (this.allProducts.length >= 10) {
          newArray = this.allProducts.slice(0, 10);
        } else {
          newArray = this.allProducts
            .concat(this.$store.state.recently.recently)
            .slice(0, 10);
        }
        this.$store.dispatch('recently/setRecentlyViewd', newArray);
        const pbaseUrl = process.env.GRAPHQL_API;
        const poptions = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            authorization: `Bearer ${token}`,
          },
        };
        const pbody = {
          query: `
            query getBestSellerCategory($id:ID!) {
              bestSellersInCategory(id: $id){
                id
                variantId
                description
                collections
                name
                image
                priceWithTax
                sku
                slug
                rating
              }
            }`,
          variables: {
            id: res.data.data.data?.collection?.id,
          },
        };
        axios.post(pbaseUrl, pbody, poptions).then((res) => {
          const produ = res.data.data?.bestSellersInCategory.map((product) => {
            let cref = [];
            product?.collections?.forEach((x) => {
              cref.push(String(x?.id));
            });
            const image =
              process.env.GRAPHQL_API.split('/shop-api')[0] +
              `/assets/${product?.image}`;
            const price =
              String(product?.priceWithTax).slice(0, -2) +
              '.' +
              String(product?.priceWithTax).slice(-2);
            const prod = {
              _id: product?.id,
              _variantId: product?.variantId,
              _description: product?.description,
              _categoriesRef: product?.collections,
              name: product?.name,
              images: image,
              price: {
                original: price,
                current: price,
              },
              slug: product?.slug,
              rating: product?.rating,
            };
            return prod;
          });
          this.bestSellings = produ;
        });
      });
    },
    sortAllProducts(value) {
      if (value === 'NAME_ASC') {
        this.allProducts.sort(this.generateSortFn('name', false, String));
        this.allSortBy = 'Name from A to Z';
      }
      if (value === 'NAME_DESC') {
        this.allProducts.sort(this.generateSortFn('name', true, String));
        this.allSortBy = 'Name from Z to A';
      }
      if (value === 'PRICE_ASC') {
        this.allProducts.sort(this.generateSortFn('price', false, Number));
        this.allSortBy = 'Price from low to high';
      }
      if (value === 'PRICE_DESC') {
        this.allProducts.sort(this.generateSortFn('price', true, Number));
        this.allSortBy = 'Price from high to low';
      }
    },
    generateSortFn(prop, reverse, type) {
      return function (a, b) {
        if (type === String) {
          if (a[prop].toLowerCase() < b[prop].toLowerCase())
            return reverse ? 1 : -1;
          if (a[prop].toLowerCase() > b[prop].toLowerCase())
            return reverse ? -1 : 1;
          return 0;
        }
        if (type === Number) {
          if (Number(a[prop]) < Number(b[prop])) return reverse ? 1 : -1;
          if (Number(a[prop]) > Number(b[prop])) return reverse ? -1 : 1;
          return 0;
        }
      };
    },
    addToCompareList(vid, pid, img) {
      if (
        this.$store.state.compareList?.productsToCompare?.length < 5 &&
        pid !== '' &&
        vid !== ''
      ) {
        if (
          this.$store.state.compareList?.productsToCompare?.filter(
            (e) => e?.productID === pid && e?.variantID === vid
          )?.length === 0
        ) {
          this.toastShower('Added to Compare List');
          this.$store.dispatch('compareList/addToCompareList', {
            product: {
              productID: pid,
              variantID: vid,
              image: img,
            },
          });
        } else {
          this.toastShower('Item is already in the list');
        }
      } else {
        this.toastShower('Limit to Compare Products reached');
      }
    },
  },
  created() {
    this.getActiveCategory();
    this.sort = process.client ? localStorage.getItem('sort') : '';
  },
  data() {
    return {
      limit: 6,
      limitSub: 6,
      allSortBy: 'Select Sorting',
      allProducts: [],
      bestSellings: [],
      currentCategory: null,
      sort: '',
      heightp: 96,
    };
  },
  computed: {
    subcategories() {
      const subs = this.currentCategory?.children.map((sub) => {
        return {
          name: sub?.name,
          slug: sub?.slug,
          image: sub.featuredAsset?.preview || '/categories/empty_image.png',
        };
      });
      return subs;
    },
  },
};
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1250px;
    margin: 0 auto;
  }
}
.main {
  display: flex;
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size-sm);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--light);
      margin: 0;
    }
    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  flex: unset;
  width: 11.875rem;
}

.sidebar {
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
  display: block;
}
.sidebar-filters {
  --overlay-z-index: 3;
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-sm) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
.nobar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
.sticky {
  display: block;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 1;
}
.topPosition {
  z-index: 2;
}
</style>
