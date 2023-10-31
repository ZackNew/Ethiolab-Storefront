<template>
  <div
    class="chat rounded-xl shadow-lg bg-white max-h-96 overflow-auto no-scrollbar" ref="chatContainer"
    >
    <div
      class="invisible lg:visible h-20 w-[20rem] bg-secondary text-white rounded-t flex items-center fixed z-50"
    >
      <img
        src="Favicon.png"
        alt="logo"
        height="40px"
        width="40px"
        class="bg-white mx-4 my-2 rounded-full"
      />
      <h3 class="font-bold text-[20px] whitespace-nowrap">Ethiolab Support</h3>
    </div>
    <div v-if="!isAuthenticated && !isFormOpen" style="margin-top: 100px">
      <h3 class="text-lg font-bold mb-4">
        {{ $t('Please provide your email to start chatting!!!') }}
      </h3>
      <div>
        <label class="email-la" for="email">{{ $t('Email Address') }}:</label>
        <input
          class="email"
          type="email"
          id="email"
          v-model="email"
          @input="validateEmail"
          required
        />
        <button class="btn" @click="startChatting">
          {{ $t('Start Chatting') }}
        </button>
      </div>
    </div>
    <div v-else-if="isAuthenticated || email" class="relative">
      <div class="mes my-24" v-if="messages">
        <div class="mx-3" v-for="message in messages" :key="message.id">
          <div
            v-if="!message.isFromAdmin"
            class="bg-[#ecfeff] min-h-[50px] w-[75%] ml-[24%] my-2 rounded-lg"
          >
            <span class="text-right text-[#000000] justify-center mt-1">{{
              message.content
            }}</span>
          </div>
          <div v-else class="bg-[#f4f6ff] min-h-[50px] my-2 w-[75%] rounded-lg">
            <SfIcon
              icon="profile"
              size="md"
              color="green-primary"
              viewBox="0 0 24 24"
              :coverage="1"
              class="float-left"
            />
            <span class="text-left text-[#000000] justify-center mt-1">{{
              message.content
            }}</span>
          </div>
          <!-- <div :class="message.isFromAdmin?'text-left':'text-right'" class="bg-[#ecfeff] min-h-[50px] w-[75%] ml-[24%] my-2 rounded-lg">{{message.content}}</div> -->
        </div>
      </div>

                    <!-- <p>dfhdiusfhsd</p> -->
                    <!-- <img
                    src="/spinner.svg"
                    alt="logo"
                    height="40px"
                    width="40px"
                    class="bg-white mx-4 my-2 rounded-full"
                    v-show="elementVisible"
                  /> -->
      <form
        v-if="isFormOpen || isAuthenticated"
        @submit.prevent="sendMessageToAdmin"
        class="flex items-center fixed invisible lg:visible min-w-full bottom-[60px]"
      >
        <input
          type="text"
          v-model="messageToSend"
          placeholder="write a message"
          class="min-w-[17.5rem] h-10 px-4 rounded shadow-md mr-2"
        />
        <button class="sendButton" type="submit">
          <!-- <img class="w-[14%] overflow-hidden" src="sendr.png" alt="send icon" /> -->
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-secondary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useUiState } from '~/composables';
import { ref, inject } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUser } from '@vue-storefront/vendure';
import {
  SfInput,
  SfBadge,
  SfButton,
  SfHeader,
  SfIcon,
  SfImage,
  SfLink,
  SfMenuItem,
  SfOverlay,
  SfSearchBar,
  SfTextarea,
  SfModal,
  SfSidebar,
} from '@storefront-ui/vue';
import { onMounted } from 'vue';
export default {
  name: 'messageSideBar',
  props: ['messages'],
  components: {
    SfIcon,
  },
  data() {
    return {
      messageToSend: '',
      loading: false,
      elementVisible: false,
      isFormOpen: false,
      email: '',
    };
  },
  // mounted() {
  //   this.scrollToBottom();
  // },
  created() {},
  methods: {
    sendMessageToAdmin() {
      setTimeout(() => (this.elementVisible = true), 100);

      setTimeout(() => (this.elementVisible = false), 5000);
      this.$emit('sendMessageToAdmin', this.messageToSend);
      this.messageToSend = '';
    },
    validateEmail() {
      const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

      if (this.email.match(emailPattern)) {
        this.emailError = '';
      } else {
        this.emailError = 'Please enter a valid email address.';
      }
    },
    startChatting() {
      if (this.emailError) {
        console.log('Email is invalid. Please correct it.');
      } else {
        this.$emit('submitt', this.email);
        this.isFormOpen = true;
        console.log('Email is valid. Starting chat...');
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
        this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
  },
  
  setup() {
    const { isMessageSideBarOpen } = useUiState();
    const email = ref('');
    const { isAuthenticated, load: loadUser, user } = useUser();
    (async () => await loadUser())();
    return {
      isMessageSideBarOpen,
      email,
      isAuthenticated,
      user,
      email,
    };
  }
};
</script>

<style scoped>
.sendButton {
  aspect-ratio: 1/1;
}
.no-scrollbar::-webkit-scrollbar {
  width: 30px;
  background-color: none;
  width: 7px;
}
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #acacac;
  border-radius: 100px;
}
.text-lg {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.email-la {
  font-weight: bold;
  margin-block-start: 100px;
}

.email {
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
}
.btn {
  background-color: #3860a7;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3; /* You can adjust the hover color as needed */
}
.mes {
  overflow-y: auto;
  position: relative;
}
.chat {
  overflow-y: hidden;
}
</style>
