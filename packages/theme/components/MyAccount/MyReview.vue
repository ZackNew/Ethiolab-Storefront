<template>
  <div class="review-component" v-if="isEnabled">
    <SfNotification
      :visible="this.showNotification"
      persistent=""
      title=""
      message="Your review has been submitted and is awaiting admin approval"
      action=""
      type="info"
    />
    <div class="grid" v-if="!this.showNotification">
      <h4 class="font-weight-bold">
        {{ this.title }}
      </h4>
      <textarea
        class="form-control block w-full/p/55/eba-200-small-centrifuge text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        cols="30"
        rows="5"
        v-model="summary"
        id="exampleFormControlTextarea1"
        placeholder="Your Review"
      ></textarea>
      <div class="grid grid-cols-2 gap-0">
        <div class="flex items-stretch">
          <MyRating value="2" @updateMyRating="updateMyRating" />
          <span class="align-middle my-auto ml-3">{{ rating + '.0' }}</span>
        </div>
        <div class="col-span-1 justify-self-end">
          <SfButton
            class="color-info mt-2"
            @click="this.submitReview"
            v-if="!this.isSubmiting"
            >{{ prompt }}</SfButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//value.number="form.rating"
//aria-disabled="!this.isAuthenticated"
//:link="null"
import { SfButton, SfNotification } from '@storefront-ui/vue';
import { integer } from 'vee-validate/dist/rules';
import MyRating from './MyRating.vue';
import { useUser, userGetters } from '@vue-storefront/vendure';

export default {
  name: 'Review',
  components: {
    SfButton,
    MyRating,
    SfNotification,
  },
  props: {
    productId: integer,
    currentUserHasNoReview: Boolean,
  },
  async created() {
    await this.setValues();
  },
  computed: {
    isEnabled() {
      return this.email !== '' && this.$props.currentUserHasNoReview; // && this.authorName !== '';
    },
    // authorName(){
    //   return this.user.firstName + ' '+ this.user.lastName;
    // }
  },
  setup(props) {
    const { user, isAuthenticated, load } = useUser();
    var previousReviewId = -1;
    var title = 'Add a Review';
    var prompt = 'Submit';
    load();
    return {
      user,
      prompt,
      previousReviewId,
      title,
      isAuthenticated,
    };
  },
  data() {
    return {
      count: 0,
      email: '',
      authorName: '',
      showNotification: false,
      isSubmiting: false,
      summary: '',
      rating: '0',
    };
  },
  watch: {
    user(newIsAuthenticated, oldIsAuthenticated) {
      this.setValues();
    },
  },
  methods: {
    async setValues() {
      if (this.isAuthenticated) {
        // await this.load();
        this.authorName = userGetters.getFullName(this.user);
        // this.email = userGetters.getEmailAddress(this.user.value);
        this.email = userGetters.getEmailAddress(this.user);
        // if(this.$props.myReview["authorLocation"] === this.email){
        //   this.form["summary"]= this.$props.myReview.summary;
        //   this.form["rating"]= this.$props.myReview.rating;
        //   this.previousReviewId= this.$props.myReview.id
        //   this.title= "Edit Your review";
        //   this.prompt= "Edit";
        // }
      }
    },
    // async getReviewIfAny(){
    //   //${this.lineItem.productVariant.id}
    //   var reviewQuery= JSON.stringify({
    //       query:`
    //     query{
    //       product(id: ${this.productId}){
    //         reviews{
    //           items{
    //             summary
    //             authorLocation
    //             rating
    //             id
    //           }
    //         }
    //       }
    //     }
    //   `});
    //   const response = await fetch('http://localhost:3000/shop-api', {
    //       method: 'post',
    //       body: reviewQuery,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': reviewQuery.length
    //       }
    //     });
    //   var reviews= (await response.json()).data.product.reviews.items;
    //   for(var review of reviews){
    //     if(review["authorLocation"] === this.email /*&&
    //         review["authorLocation"] === this.lineItem.productVariant.id*/){
    //       this.prompt= "Edit";
    //       this.title= "Edit your Review";
    //       this.form["summary"]= review["summary"];
    //       this.form["rating"]= review["rating"];
    //       this.previousReviewId = review["id"]
    //       return;
    //     }
    //   }
    // },

    // async getProductId(){
    //   if(this.productId !=-1){
    //     return;
    //   }
    //   var productIdQuery= JSON.stringify({
    //       query:`
    //       query{
    //         productVariant(id: ${this.lineItem.productVariant.id}){
    //           product{
    //             id
    //           }
    //         }
    //       }
    //   `});
    //   const response = await fetch('http://localhost:3000/shop-api', {
    //       method: 'post',
    //       body: productIdQuery,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': productIdQuery.length
    //       }
    //     });
    //   this.productId= (await response.json()).data.productVariant.product.id;
    // },

    async submitReview() {
      if (this.previousReviewId != -1) {
        await this.updateReview();
        return;
      }
      var addReviewMutation = JSON.stringify({
        query: `
        mutation {
          submitProductReview(input: {
            productId: ${this.$props.productId}
            body: ""
            summary: "${this.summary}"
            rating: ${this.rating}
            authorLocation: "${this.email}"
            authorName: "${this.authorName}"
          }) {
            id
            summary
            body
            rating
            authorName
            authorLocation
            createdAt
          }
        }
      `,
      });
      //summary: "${this.lineItem.productVariant.name}"
      // authorLocation: "${this.lineItem.productVariant.id}"
      this.isSubmiting = true;
      let baseUrl = process.env.GRAPHQL_API;
      await fetch(baseUrl, {
        method: 'post',
        body: addReviewMutation,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': addReviewMutation.length,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          // this.previousReviewId= data.data.submitProductReview["id"];
          // this.title= "Edit Your review";
          // this.prompt= "Edit";
          // data.data.submitProductReview["authorName"]= "You";
          //this.$emit('addNewReview', data.data.submitProductReview)
          this.showNotification = true;
        });
      this.isSubmiting = false;
    },

    // async updateReview(){
    //   var updateReviewMutation= JSON.stringify({
    //       query:`
    //         mutation{
    //           updateProductReview(input:{
    //             id: ${this.previousReviewId},
    //             rating: ${this.form["rating"]},
    //             summary: "${this.form["summary"]}"
    //           }){
    //             summary
    //             body
    //             rating
    //             authorName
    //             authorLocation
    //             createdAt
    //             id
    //           }
    //         }
    //       `});
    //   this.isSubmiting= true;
    //   const response = await fetch('http://10.10.20.55:3000/shop-api', {
    //       method: 'post',
    //       body: updateReviewMutation,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': updateReviewMutation.length
    //       }
    //     }).then(r => r.json())
    //       .then((data) > {
    //         data.data.updateProductReview["authorName"]= "You";
    //         this.$emit('updateMyReview', data.data.updateProductReview);
    //         // this.currentReview["summary"]= data["summary"];
    //         // this.currentReview["rating"]= data["summary"];
    //       });
    //   this.isSubmiting= false;
    // },
    updateMyRating(rating) {
      this.rating = '' + rating;
    },
  },
};
</script>
<style>
.review-component {
  width: 100% !important;
}

.sf-button {
  border-radius: 12px !important;
}
</style>
