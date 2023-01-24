import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';
import * as process from 'process';

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  isDarkMode: false,
  isQuoteModalOpen: false,
  isMessageSideBarOpen: false,
  enablePopUp: !(process.browser && localStorage.getItem('popup')),
});

const useUiState = () => {
  const enablePopUp = computed(() => state.enablePopUp);
  const togglePopUp = () => {
    state.enablePopUp = !state.enablePopUp;
  };
  const isQuoteModalOpen = computed(() => state.isQuoteModalOpen);
  const toggleQuoteModal = () => {
    state.isQuoteModalOpen = !state.isQuoteModalOpen;
  };
  const isDarkMode = computed(() => state.isDarkMode);
  const toggleDarkMode = () => {
    state.isDarkMode = !state.isDarkMode;
  };
  const isMobileMenuOpen = computed(() => state.isMobileMenuOpen);
  const toggleMobileMenu = () => {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    console.log('mobile toogled', state.isMobileMenuOpen);
  };

  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };
  const isMessageSideBarOpen = computed(() => state.isMessageSideBarOpen);
  const toggleMessageSidebar = () => {
    state.isMessageSideBarOpen = !state.isMessageSideBarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const toggleLoginModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const isNewsletterModalOpen = computed(() => state.isNewsletterModalOpen);
  const toggleNewsletterModal = () => {
    state.isNewsletterModalOpen = !state.isNewsletterModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    isDarkMode,
    isQuoteModalOpen,
    isMessageSideBarOpen,
    enablePopUp,
    togglePopUp,
    toggleQuoteModal,
    toggleDarkMode,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleMobileMenu,
    toggleMessageSidebar,
  };
};

export default useUiState;
