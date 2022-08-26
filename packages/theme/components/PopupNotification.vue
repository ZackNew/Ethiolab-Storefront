<template>
  <client-only>
    <SfModal class="modal" title="Request A Quote" @close="togglePopUp" :visible="JSON.parse(enablePopUp)"
             :persistent='false' overlay>
      <img class = 'popup-img' :src='popupContent.preview'  alt ='image'/>
      <template>
        <div class="flex outer-container">
          <div class="lg:p-8 mx-3 my-auto">
            <div class="sf-heading__title uppercase tracking-wide text-5xl text-indigo-500 font-semibold  text-gray-800"
               v-html="popupContent.content.title || 'Title'">
            </div>
            <p class="sf-heading__description text-justify mt-4 max-w-md text-slate-500" v-html="popupContent.content.description || 'kirubel'"></p>
             <div class = 'flex justify-start'>
                <button class="w-2/5  bg-secondary my-5 h-8 text-white rounded-lg">{{popupContent.content.buttonText}}</button>
             </div>
             
            <div class="mt-3">
              <input type="checkbox" v-model="disablePopUp" v-on:change="disablePopUpMethod()">
              <span class="sf-heading__description text-slate-500">Do not show this popup again</span>
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
import {useCms} from "@vue-storefront/vendure";
import {computed} from "@vue/composition-api";

export default {
  name: 'PopupNotification',
  components: {
    SfModal,
  },
  setup() {
    const {enablePopUp, togglePopUp} = useUiState();
    const disablePopUp = ref(false);
    const {getCms} = useCms();
    const popup = getCms.value.filter((item)=>item?.cmsType==='POPUP').map(filteredObj => {
      
      return {
        content:filteredObj.content,
        preview:filteredObj.featuredAsset?.preview
      }
      });
    console.log("pop up *****",popup)
    let contentParsed = JSON.parse(popup[0].content)
    let content = {
      content:contentParsed,
      preview:popup[0].preview
    }
   const popupContent= content
   console.log("pop up content *****",popupContent)
    const {isMobileMenuOpen} = useUiState();
    const disablePopUpMethod = () => {
      if (disablePopUp.value) {
        localStorage.setItem('popup', 'false')
      }
    }
    return {
      enablePopUp,
      togglePopUp,
      disablePopUp,
      disablePopUpMethod,
      isMobileMenuOpen,
      getCms,
      // popup,
      popupContent
    }
  }
}
</script>
<style lang="scss" scoped>
.outer-container{
  align-items: center;
  justify-content: center;
  background-color: transparent;
  // padding: 190px !important;
}
.popup-img{
  width: 100%;
  top:0;
  left:0;
  height: 100%;
  position: absolute;
  z-index:-3423
}
.modal {
  display: flex;
  justify-content: center;
  --modal-index: 3;
  --modal-width: 12;
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
