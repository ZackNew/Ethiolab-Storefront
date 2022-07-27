<template>
  <div>Please wait Login you in...</div>
</template>
<script>
import axios from 'axios'
import gql from 'graphql-tag';
import {print} from 'graphql';


export default {


  mounted() {
    function setCookie(name, value, days) {
      let expires = "";
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    const login = async () => {
      const mutation = gql`mutation Authenticate($code: String!) {
                                          authenticate(input: {
                                            google: { code: $code }
                                          }, rememberMe: true) {
                                          ...on CurrentUser {
                                              id
                                            identifier
                                            channels{
                                              token
                                            }
                                          }
                                        }}`;
      let baseUrl = process.env.GRAPHQL_API
      const data = await axios.post(baseUrl,
          {
            query: print(mutation), variables: {
              code: this.$route.query.code
            }
          });

      // console.log("code ", JSON.stringify( data.data.data.authenticate.channels[0].token))
      // localStorage.setItem("etech_token", data.data.data.authenticate.channels[0].token)
      // setCookie("etech-auth-token",  data.data.data.authenticate.channels[0].token)

      if (data.headers['etech-auth-token']) setCookie("etech-auth-token", data.headers['etech-auth-token'])
      location.href = 'http://localhost:3001'
    }
    login().catch(e => console.error(e))
    // console.log('Hello ::1', JSON.stringify(this.$route.query.access_token));
    // console.log("Hello, ::", JSON.stringify(this.$route.query.id_token));
  }
}

</script>
