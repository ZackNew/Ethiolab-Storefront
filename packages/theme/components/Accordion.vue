<template>
  <div>
    <button
      @click="toggleAccordion()"
      class="w-[100%] flex items-center justify-between hover:text-primary font-bold text-[130%] text-secondary border-t border-[#dfdfdf]"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
    >
      <h4>
        <slot name="title" />
      </h4>

      <div>
        <svg
          class="transition-all duration-200 transform w-6 h-6"
          :class="{
            'rotate-180': isOpen,
            'rotate-0': !isOpen,
          }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </button>

    <div v-show="isOpen" :id="`collapse${_uid}`">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
