<template>
  <div
    class="chat rounded-xl shadow-lg bg-white max-h-96 overflow-auto no-scrollbar"
    ref="chatContainer"
  >
    <div
      class="sm:visible sm:h-20 sm:w-[20rem] sm:bg-secondary sm:text-white sm:rounded-t sm:flex sm:items-center sm:fixed sm:z-50
      invisible lg:visible h-20 w-[20rem] bg-secondary text-white rounded-t flex items-center fixed z-50"
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
    <div v-if="!isAuthenticated && !isFormOpen" style="margin-top: 100px ; margin-left: 5px ; margin-right: 5px">
      <h3 class="text-lg font-bold mb-4">
        {{ $t('Insert Your Email To Start Chat') }}
      </h3>
      <div>
        <ValidationObserver v-slot="{ handleSubmit }">
        <label class="email-la" for="email">{{ $t('Email Address') }}:</label>
        <ValidationProvider
          name="email"
          rules="required|email"
          v-slot="{ errors }"
          slim
        >
          <input
            name="email"
            v-model="email"
            type="email"
            :label="$t('Email')"
            class="email"
            required
            :valid="!errors[0]"
          />
          <p id= 'error'>{{errors[0]}}</p>
        </ValidationProvider>
        <button class="btn" @click="handleSubmit(startChatting)">
          {{ $t('Start Chat') }}
        </button>
        </ValidationObserver>
      </div>
    </div>
    <div v-else-if="isAuthenticated || email" class="relative">
      <div class="mes my-24" v-if="messages">
        <div class="mx-3" v-for="message in messages" :key="message.id">
          <div
            v-if="!message.isFromAdmin"
            class="bg-[#ecfeff] sm:w-[75%] sm:ml-[24%] sm:my-2 sm:rounded-lg
                    w-[75%] ml-[24%] my-2 rounded-lg"
          >
            <span
              class="sm:inline-block sm:text-right sm:justify-center sm:mt-1 sm:max-w-full sm:break-words
                      inline-block text-right text-[#000000] justify-center mt-1 max-w-full break-words"
              >{{ message.content }}</span
            >
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
            <span
              class="inline-block text-left text-[#000000] justify-center mt-1 max-w-full break-words"
              >{{ message.content }}</span
            >
          </div>
        </div>
      </div>
      <form
        v-if="isFormOpen || isAuthenticated"
        @submit.prevent="sendMessageToAdmin"
        class="sm:flex sm:items-center sm:fixed  sm:visible sm:min-w-full sm:bottom-[70px]
        flex items-center fixed invisible lg:visible min-w-full bottom-[70px]"
      >
        <textarea
          type="text"
          v-model="messageToSend"
          placeholder="write a message"
          rows="2"
          class="sm:min-w-[17.5rem] sm:max-h-[90%] sm:px-2 sm:rounded sm:shadow-md sm:no-scrollbar sm:resize-none
          min-w-[17.5rem] max-h-[90%] h-30 px-2 rounded shadow-md no-scrollbar resize-none"
        
          @keydown.enter.prevent="handleEnterKey"
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
import { ref, inject, provide } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUser } from '@vue-storefront/vendure';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
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
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('email', {
  ...email,
  message: 'Invalid email',
});
export default {
  name: 'messageSideBar',
  props: ['messages'],
  components: {
    SfIcon,
    ValidationProvider,
    ValidationObserver,
    SfInput,
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
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },

  updated() {
    this.scrollToBottom();
  },
    methods: {
      handleEnterKey(event) {
    if (event.shiftKey) {
      this.messageToSend += '\n';
    } else {
      this.sendMessageToAdmin();
    }
  },
     sendMessageToAdmin() {
      setTimeout(() => (this.elementVisible = true), 100);

      setTimeout(() => (this.elementVisible = false), 5000);
      this.$emit('sendMessageToAdmin', this.messageToSend);
      this.messageToSend = '';
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth',
        });
      });
    },
    startChatting() 
    {
        this.$emit('submitt', this.email);
        this.isFormOpen = true;
        this.scrollToBottom();
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
    const errorMessage = ref('');
    const { isAuthenticated, load: loadUser, user } = useUser();
    (async () => await loadUser())();
    return {
      isMessageSideBarOpen,
      email,
      isAuthenticated,
      user,
      errorMessage,
    };
  },
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
  font-family: 'Montserrat', sans-serif;
  color: #3860a7;
}
.email-la {
  font-weight: bold;
  margin-block-start: 100px;
  font-family: 'Montserrat', sans-serif;
  color: #3860a7;
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
#error {
  color: red;
  font-size: 12px;
  margin: 2px;
}
</style>
