<template>
  <client-only>
  <SfModal class="modal" title="Request A Quote" @close="togglePopUp" :visible="JSON.parse(enablePopUp)" :persistent='false' overlay>
    <template #modal-bar>
        <div class="flex">
          <div class="lg:p-8 mx-3 my-auto">
            <div class="uppercase tracking-wide text-5xl text-indigo-500 font-semibold  text-gray-800">{{popup.title }}</div>
            <!-- :<div>get <span class="text-[#a6c76c]">25 %</span> off </div> -->
            <p class="mt-4 max-w-md text-slate-500" v-html="popup.description"></p>
            <div class="mt-3">
              <input type="checkbox" v-model="disablePopUp" v-on:change="disablePopUpMethod()">
              <span class="text-slate-500">Do not show this popup again</span>
            </div>
          </div>
      </div>
    </template>
  </SfModal>
  </client-only>
</template>
<script>
  import {SfModal} from "@storefront-ui/vue";
  import {useUiState} from "~/composables";
  import {ref} from "@nuxtjs/composition-api";
  import {useCms,useFacet} from "@vue-storefront/vendure";
  import {computed} from "@vue/composition-api";
import {onSSR} from "@vue-storefront/core";


  export default {
      name: 'PopupNotification',
    components:{
      SfModal,
    },
    setup(){
      const { enablePopUp,togglePopUp } = useUiState();
      const disablePopUp=ref(false);
      const { isMobileMenuOpen} = useUiState();
      const {search:searchCms,getCms}=useCms();
      const { search, result } = useFacet();

      const popup = computed(()=>JSON.parse(getCms.value.content))
    
      onSSR(async () => {
      await search({ sort: { name: 'DESC' }, take: 8});
      await searchCms('POPUP')
            // console.log("the popup value is ",popup);

      });

      const disablePopUpMethod=()=>{
        if(disablePopUp.value) {
          localStorage.setItem('popup', 'false')
        }
      }
      return {
        enablePopUp,
        togglePopUp,
        disablePopUp,
        disablePopUpMethod,
        isMobileMenuOpen,
        popup
      }
    }
  }
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  --modal-index: 3;
  --modal-width:12;
  --overlay-z-index: 3;
  --modal-content-padding: var(--spacer-xl);
  @media (max-width: 800px) {
    display: none;
  }
&__input,
 .sf-input__label {
   --input-font-size: var(--font-size--base);
   --input-label-font-size: var(--font-size--base);
 }
&__button {
   margin: 0 auto;
 }
&__content {
   font-size: var(--font-size--sm);
   font-weight: var(--font-weight--light);
 }
.sf-scrollable__view-all.sf-button {
  font-weight: var(--font-weight--light);
}
}
</style>
