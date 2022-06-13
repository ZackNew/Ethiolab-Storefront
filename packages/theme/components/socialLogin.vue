<template>
    <!-- google	 -->
  <div class="divHolder">
      <div class="btn-google" v-on:click="SignIn">
        <div class="google-content">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48">
              <defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
            </svg>
          </div>
          <p>Sign in with Google</p>
        </div>
      </div>
    <p>OR</p>
    <!-- facebook	 -->
      <div class="btn-fb" v-on:click="SignInWithFacebook">
        <div class="fb-content">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" >
              <path fill="#FFFFFF" d="M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z"/>
              <path fill="#4267b2" d="M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z"/>
            </svg>
          </div>
          <p>Sign in with Facebook</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'socialLogin',
  methods: {
    async SignIn() {
      this.$auth.loginWith('google').then(async (id_token) => {
       if(id_token) console.log("Token, ", id_token);
       /**/
      
        return;
        const data = JSON.stringify({
          query: `
        {
        mutation Authenticate($token: String!) {
        authenticate(input: {
          google: { token: $token }
        }) {
        ...on CurrentUser {
            id
            identifier
        }
      }
    }
      `
        }, {token:id_token});
        const response = await fetch(
            'http://localhost:3000/shop-api',
            {
              method: 'post',
              body: data,
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
              },
            }
        );
        const characterData = await response.json();
        console.log('ppp',characterData);
      })
    },
    SignInWithFacebook() {
      this.$auth.loginWith('facebook');
    }
  }

};
</script>

<style lang="sass" scoped>
@import url('//fonts.googleapis.com/css?family=Roboto')

*, *::before, *::after
  box-sizing: border-box
.divHolder
  text-align: center
html, body
  width: 100%
  height: 100%
.block-wrap
  display: flex
  justify-content: center
  align-items: center
  flex-wrap: wrap
  height: 100%
  > div
    width: 100%
    text-align: center

.btn-google, .btn-fb
  display: inline-block
  border-radius: 1px
  margin: 12px
  text-decoration: none
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.25)
  transition: background-color .218s, border-color .218s ,box-shadow .218s
  .google-content, .fb-content
    display: flex
    align-items: center
    width: 300px
    height: 50px
    .logo
      padding: 15px
      height: inherit
    svg
      width: 18px
      height: 18px
    p
      width: 100%
      line-height: 1
      letter-spacing: .21px
      text-align: center
      font-weight: 500
      font-family: 'Roboto', sans-serif

.btn-google
  background: #FFF
  &:hover
    box-shadow: 0 0 3px 3px rgba(66,133,244,.3)
  &:active
    background-color: #eee
  .google-content p
    color: #757575
.btn-fb
  padding-top: 1.5px
  background: #4267b2
  &:hover
    box-shadow: 0 0 3px 3px rgba(#3b5998,.3)
  .fb-content p
    color: rgba(white, .87)
</style>
