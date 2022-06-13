<template><div>Please wait Login you in...</div></template>

<script>
import axios from 'axios'
import gql from 'graphql-tag';
import { print } from 'graphql';



export default{

      
      mounted() {
     
     
        function setCookie(name,value,days) {
                let expires = "";
                if (days) {
                    let date = new Date();
                    date.setTime(date.getTime() + (days*24*60*60*1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "")  + expires + "; path=/";
            }
     
        const login = async () =>{
            
                  const addtionalData = await axios.get(`
                  https://graph.facebook.com/v14.0/oauth/access_token?redirect_uri=${encodeURIComponent('http://localhost:3001/login_facebook')}&client_id=980997845873215&client_secret=9bab1bb398d27f2a67ff1708ba83801f&code=${this.$route.query.code}`)
                   
                
                  const accessToken = addtionalData.data.access_token;
                  
                  const mutation = gql`mutation Authenticate($accessToken: String!) {
                                          authenticate(input: {
                                            facebook: { token: $accessToken }
                                          }, rememberMe: true) {
                                          ...on CurrentUser {
                                              id
                                            identifier
                                            channels{
                                              token
                                            }
                                          }
                                        }}`;
       
              
                  const data = await axios.post('http://localhost:3000/shop-api', 
                  {query: print(mutation), variables :{
                    accessToken
                  }});
                 
                  // console.log("code ", JSON.stringify( data.data.data.authenticate.channels[0].token))
                  // localStorage.setItem("etech_token", data.data.data.authenticate.channels[0].token)
                  // setCookie("etech-auth-token",  data.data.data.authenticate.channels[0].token)

                  if(data.headers['etech-auth-token'])  setCookie("etech-auth-token",  data.headers['etech-auth-token'])
                  //  console.log("NERF",JSON.stringify(data.headers) )
                  location.href = 'http://localhost:3001' //redirect
               

        }
        login().catch(e => console.log("NErf Error ", e))
       // console.log('Hello ::1', JSON.stringify(this.$route.query.access_token));
       // console.log("Hello, ::", JSON.stringify(this.$route.query.id_token));
      }
}
</script>