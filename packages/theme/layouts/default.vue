<template>
  <div
    :class="{
      'theme-light': !isDarkMode,
      'theme-dark': isDarkMode,
    }"
    id="whole"
    :style="
      !isDarkMode ? `background-color: #f0f7fc;` : `background-color: #0e1621;`
    "
    class="block"
  >
    <div :class="!isDarkMode ? `bg-white` : `bg-dark_accent`">
      <LazyHydrate when-visible>
        <Top class="desktop-only" />
      </LazyHydrate>
      <LazyHydrate when-idle>
        <AppHeader />
      </LazyHydrate>
    </div>
    <div class="min-h-screen" id="layout">
      <nuxt :key="$route.fullPath" />
      <client-only><Compare class="bottomright" /></client-only>
      <!-- <client-only><img src="chatr.png" alt="chat image" height="50px" width="50px" class="chatcss" /></client-only> -->

      <!-- 
    <div id="layout" >
      <nuxt :key="$route.fullPath"/> -->

      <ToastVue :show="isToastVisible" :message="toastMessage" />
      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <CategoriesSidebar />
      <LoginModal />
      <Notification />
      <!-- <categories-sidebar /> -->
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
    <div class="hidden lg:block">
      <SfButton
        class="sf-button--pure sf-header__action chatIcon"
        v-if="isMessageSideBarOpen"
        @click="toggleMessageSidebar()"
      >
        <div v-if="isMessageSideBarOpen">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 text-secondary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </SfButton>
      <SfButton
        class="sf-button--pure sf-header__action chatIcon"
        v-if="!isMessageSideBarOpen"
        @click="getChatMessage(true)"
      >
        <div>
          <span
            v-if="unseen !== 0"
            class="bg-red text-white rounded-full float-right"
            >&nbsp;{{ unseen }}&nbsp;</span
          >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 text-secondary -mt-2 float-right"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </div>
      </SfButton>
    </div>
    <MessageSideBar
      v-if="isMessageSideBarOpen"
      class="lg:w-[20rem] lg:right-[2%] lg:bottom-[6%] lg:min-h-[70%] lg:fixed z-[500] hidden lg:block"
      @sendMessageToAdmin="sendMessageToAdmin"
      @submitt="gust"
      :messages="messages"
    />
  </div>
  <!-- </div> -->
</template>

<script>
import ToastVue from '~/components/Toast.vue';
import Compare from '~/components/Compare.vue';
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import Top from '~/components/Top.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import CategoriesSidebar from '~/components/CategoriesSidebar';
import { useCms, useFacet, useUser } from '@vue-storefront/vendure';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import Toast from '~/components/Toast.vue';
import { ref, provide,onUnmounted } from '@vue/composition-api';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import MessageSideBar from '~/components/MessageSideBar.vue';
import { userGetters } from '@vue-storefront/vendure';
import { computed, watch } from '@vue/composition-api';

export default {
  name: 'DefaultLayout',
  // middleware: 'themeChecker',
  components: {
    ToastVue,
    Compare,
    CategoriesSidebar,
    LazyHydrate,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
    Toast,
    Top,
    MessageSideBar,
  },
  methods: {},
  setup() {
    const { isMessageSideBarOpen, toggleMessageSidebar } = useUiState();
    const { load: loadUser, user, isAuthenticated } = useUser();
    const messages = ref([]);
    const gustEmail = ref(null);
    const gust = (email) => {
      gustEmail.value = email;
      getChatMessage();
    };
    const getChatMessage = async (toggle=false) => {
      if (isMessageSideBarOpen.value == false && toggle) {
        toggleMessageSidebar();
        ppp();
      }
      let id = [];
      let mes = unseenMessages.value;
      for (let i = 0; i < mes?.length; i++) {
        id.push(mes[i].id);
      }
      if (isAuthenticated.value || gustEmail.value != null) {
        const body = {
          query: `query GetChatMessage($userEmail: String!) {
                  getChatMessage(userEmail: $userEmail) {
                    createdAt
                    id
                    messages {
                      content
                      createdAt
                      id
                      isFromAdmin
                    }
                  }
                }
                `,
          variables: {
            userEmail: isAuthenticated.value
              ? userGetters.getEmailAddress(user.value)
              : gustEmail.value,
          },
        };
        const options = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        };
        await axios.post(process.env.GRAPHQL_API, body, options).then((res) => {
          messages.value = res.data.data.getChatMessage?.messages;
        });
      }
    };
    loadUser();
    const unseen = computed(
      () =>
        messages.value?.filter(
          (mes) => mes.isFromAdmin == true && mes.isSeen == false
        ).length
    );
    const unseenMessages = computed(() =>
      messages.value?.filter(
        (mes) => mes.isFromAdmin == true && mes.isSeen == false
      )
    );
    const sendMessage = async (messageToSend) => {
      const body = {
        query: `mutation SendMessage( $message: String!,$userEmail: String!,$userName: String) {
                  writeChatMessage(
                    input:
                     { userEmail: $userEmail, message: $message, userName: $userName })}
                `,
        variables: {
          message: messageToSend.msg,
          userEmail: messageToSend.userEmail,
          userName: messageToSend.firstName + ' ' + messageToSend.lastName,
        },
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      await axios
        .post(process.env.GRAPHQL_API, body, options)
        .then((res) => {});
    };
    const sendMessageToAdmin = async (messageToSend) => {
      await loadUser();

      const userEmail = isAuthenticated.value
        ? userGetters.getEmailAddress(user.value)
        : gustEmail.value;
      const userFirstName = userGetters.getFirstName(user.value);
      const userLastName = userGetters.getLastName(user.value);
      if (messageToSend.length > 0) {
        await sendMessage({
          msg: messageToSend,
          lastName: userLastName,
          firstName: userFirstName,
          userEmail: userEmail,
        });
      }
    };
    const refreshMessages = async () => {
    if(!isMessageSideBarOpen.value){
      console.log("clearing interval");
      clearInterval(intervalId);
    }
    const data = await getChatMessage();
    };
    let intervalId;
    const ppp = () => {
      intervalId = setInterval(() => {
        refreshMessages();
      }, 2000);
    };


    const { isDarkMode } = useUiState();
    const { search: searchCms } = useCms();
    const { search } = useFacet();
    const isToastVisible = ref(false);
    const toastMessage = ref('');
    function showToast(msg) {
      toastMessage.value = msg;
      isToastVisible.value = true;
      setTimeout(() => {
        closeToast();
      }, 100);
    }
    function closeToast() {
      isToastVisible.value = false;
    }
    provide('closeToast', closeToast);
    provide('showToast', showToast);
    loadUser().then(() => {
      //this.$router.go(0)
    });

    onSSR(async () => {
      await search({ sort: { name: 'DESC' }, take: 8 });
      await searchCms([
        'HERO_SECTION',
        'POPUP',
        'STATIC',
        'ADVERTISEMENT',
        'POLICIES',
        'BIG_SALE',
      ]);
    });
    // onUnmounted(() => clearInterval(intervalId));

    return {
      isAuthenticated,
      isDarkMode,
      isToastVisible,
      showToast,
      toastMessage,
      isMessageSideBarOpen,
      toggleMessageSidebar,
      sendMessageToAdmin,
      unseen,
      getChatMessage,
      unseenMessages,
      messages,
      gust,
      //messagesArray,
    };
  },
  
  created() {
    this.$store.dispatch('companyDetails/setInfo');
  },
};
</script>

<style lang="scss">
@import '../assets/myAccountOverrides.scss';
@import '../assets/overrides.scss';
@import '~@storefront-ui/vue/styles';
@import './assets/styles';
#whole {
  @include for-desktop {
    max-width: 100% !important;
    margin: auto;
  }
}
#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 100% !important;
    margin: auto;
  }
}
.custom-bg {
  background-color: var(--c-secondary) !important;
}
:root {
  --font-family--secondary: 'Roboto' !important;
  --font-family--primary: 'Roboto Slab' !important;
}
.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
// a {
//   text-decoration: none;
//   color: var(--c-link);
//   &:hover {
//     color: var(--c-link-hover);
//   }
// }
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}

.bottomright {
  position: fixed;
  padding: 5px;
  z-index: 500;
}
.chatcss {
  position: fixed;
  z-index: 500;
  top: 90vh;
  left: 95%;
}
.chatIcon {
  position: fixed;
  z-index: 600;
  bottom: 30px;
  right: 20px;
  width: 3%;
  height: 3%;
}
</style>
