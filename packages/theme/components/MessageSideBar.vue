<template>
  <div class="chat rounded-xl shadow-lg bg-white" v-if="isMessageSideBarOpen">
    <div
      class="invisible lg:visible h-14 w-full bg-[#000000] text-white rounded-lg flex items-center"
    >
      <img
        src="Favicon.png"
        alt="logo"
        height="40px"
        width="40px"
        class="bg-white mx-4 my-2 rounded-full"
      />
      <h3 class="font-bold text-base whitespace-nowrap">Ethiolab Support</h3>
    </div>
    <div class="mx-3" v-for="(message, i) of messages" :key="i">
      <div
        v-if="!message.isFromAdmin"
        class="bg-light_gray min-h-[50px] w-[75%] ml-[24%] my-2 rounded-lg"
      >
        <p class="text-right mr-4">{{ message.msg }}</p>
      </div>
      <div v-else class="bg-secondary min-h-[50px] my-2 w-[75%] rounded-lg">
        <p class="text-left ml-4 text-white">{{ message.msg }}</p>
      </div>
    </div>

    <div
      class="mx-4 flex items-center absolute invisible lg:visible min-w-full bottom-1"
    >
      <!-- <p>dfhdiusfhsd</p> -->
      <input
        type="text"
        v-model="messageToSend"
        placeholder="write a message"
        class="min-w-[80%] h-10 px-4 rounded-xl shadow-md"
      />
      <button class="sendButton" @click="sendMessageToAdmin()">
        <img class="w-[90%]" src="sendr.png" alt="send icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { useUiState } from '~/composables';
import { ref } from '@vue/composition-api';

export default {
  name: 'messageSideBar',
  props: ['messages'],
  data() {
    return {
      messageToSend: '',
    };
  },
  methods: {
    sendMessageToAdmin() {
      console.log('emitted', this.messageToSend);
      this.$emit('sendMessageToAdmin', this.messageToSend);
      this.messageToSend = '';
    },
  },
  setup() {
    const { isMessageSideBarOpen } = useUiState();

    return {
      isMessageSideBarOpen,
    };
  },
};
</script>

<style scoped>
.sendButton {
  aspect-ratio: 1/1;
}
</style>
