<template>
   <div id="main">
      <div id='left'>
               Wrie A Special Quote
          <div class="notice">NOTICE* If you didn't find what you want on this website, you can mention it here.</div>
          <SfInput label="Your Contact Email" v-model="data.fromEmail" class="form__element "/>
          <SfInput label="Subject" class="form__element " v-model="data.subject"/>

          <SfInput label="Phone Number" class="form__element " v-model="data.fromPhone"/>
          <SfInput label="First Name" class="form__element " v-model="data.firstName"/>

          <SfInput label="Last Name" class="form__element " v-model="data.lastName"/>

           <textarea placeholder="Your special quote." cols="20" class="form__element tarea" v-model="data.msg"></textarea>
           <SfButton class="btn" @click="send">Send !</SfButton>
      </div>
      <div id="middle">
       <div id="or">OR</div>
         
      </div>
      <div id="right">
     
           Request A Quote From A Shopping Cart
          <div class="img_descr"><img src="~/assets/add.jpg" />Add Items To Your Cart</div>
          <div class="img_descr"><img src="~/assets/click.jpg"/>Click Request a quote from the Bottom.</div>
          <div class="img_descr"><img src="~/assets/send.png" />Click send!</div>

      </div>
   </div>
</template>

<script>
  //import {}
  import { SfTabs, SfInput, SfButton, SfTextarea,  } from '@storefront-ui/vue';
  import { useUser, userGetters , useQuote} from '@vue-storefront/vendure';
  import {ref} from '@vue/composition-api';
  export default{
     components: {
            SfTabs,
            SfInput,
            SfButton,
            SfTextarea
           
     },
     setup(){
       const {writeQuote} = useQuote()
       const data = ref({fromEmail:'', subject:'', fromPhone: '',msg: '', location: '', productDescr: '', firstName: '', lastName: '' })
       const send = () => { 
         console.log({data})
         writeQuote({
         isSpecial: true,
         fromEmail: data.value.fromEmail,

          subject: data.value.subject,
          fromPhone: data.value.fromPhone,
          msg: data.value.msg,
          location: data.value.location,
          productDescr: ''
                 })}
       return{data, send}
     }
  }
</script>

<style scoped>
.tarea{
   width: 100%;
   padding-bottom: 10%;
    margin-bottom: 10%;
    border: 1px;
}
.btn{
   width: 100%;
}
.box-order{
   border: 2px grey solid;
}
.notice{
   color: red;
   font-style: italic;
   font-size: 0.7rem;
}
#main{
    display: grid;
    grid-template-columns: 4;
    position: relative;
    left: 8%;
    top: 12%;
   grid-gap: 2%;
}
#right{
   grid-column: 4/4;
   border: 1px;
   border: 1px grey solid;
   padding: 5%;
   background-color: white;
}
#middle{
   grid-column: 2/3;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

 
}
#left{
    grid-column: 1/1;
     border: 1px;
     padding: 0%;
     border: 1px grey solid;
       padding: 5%;
   background-color: white;
}
#or{
   justify-content: center;
   color: black;

   font-weight: bold;
}
img{
   width: 15%;
   display: inline;
}
.img_descr{
   padding-top: 8%;
  
}
</style>