<template>
  <div
    class="chat rounded-xl shadow-lg bg-white max-h-96 overflow-auto no-scrollbar"
    v-if="isMessageSideBarOpen"
  >
    <div
      class="invisible lg:visible h-14 max-w-[25%] w-full bg-[#000000] text-white rounded-lg flex items-center fixed"
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
    <div class="mb-14">
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
    </div>

    <!-- <div
     
    > -->
      <!-- <p>dfhdiusfhsd</p> -->
      <!-- <img
        src="/spinner.svg"
        alt="logo"
        height="40px"
        width="40px"
        class="bg-white mx-4 my-2 rounded-full"
        v-show="elementVisible"
      /> -->
      <form @submit.prevent="sendMessageToAdmin"  class="flex items-center fixed invisible lg:visible min-w-full -mb-[6.5rem] bottom-1">  
      <input
        type="text"
        v-model="messageToSend"
        placeholder="write a message"
        class="min-w-[22%] h-12 px-4 rounded-xl shadow-md"
      />
      <button class="sendButton" type="submit">
        <img class="w-[14%]" src="sendr.png" alt="send icon" />
      </button>

    </form>
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
      loading: false,
      elementVisible:false
    };
  },
  created(){
    // setTimeout(() => {
    //     // this.loading = true
    //     setTimeout(() => this.elementVisible = false, 5000)
    //   }, 5000);
  },
  methods: {
    sendMessageToAdmin() {
      setTimeout(() => this.elementVisible = true, 100)

      setTimeout(() => this.elementVisible = false, 5000)
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
.no-scrollbar::-webkit-scrollbar {
  width: 30px;
  background-color: none;
  width: 7px;
}
.no-scrollbar::-webkit-scrollbar-thumb {
  background-color: #acacac;
  border-radius: 100px;
}
</style>
