<template>
  <div class="container">
    
    <br>
    <div>
      <div v-if="loggedInUserDetails">
         <img :src="loggedinUser.imageUrl">
        <h1>Welcome {{loggedinUser.fullName}}</h1>
        <h2>Your Email id: {{loggedinUser.email}}</h2>

        <br>
        <button  class="button--grey" v-on:click="logOutUser">Logout</button>

        <a
          :href="'http://localhost/pf/'+loggedInUserDetails.publicUniqueId"
          target="_blank"
          rel="noopener noreferrer"
          class="button--blue"
        >
          Open Profile Page
        </a>
        <br><br>
      </div>
      <!-- loggedInUserDetails = {{loggedInUserDetails}} -->

      <GoogleLogin id="g_id_onload" class="button--grey" auto_select="true" :params="params" :onSuccess="onSuccess" :onFailure="onFailure" v-else>Google Login</GoogleLogin>

      <a
        href="https://savantcare.github.io"
        target="_blank"
        rel="noopener noreferrer"
        class="button--green"
      >
        Documentation
      </a>
      <a
        href="https://github.com/savantcare/emr"
        target="_blank"
        rel="noopener noreferrer"
        class="button--grey"
      >
        GitHub
      </a>
    </div>
  </div>
  
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import GoogleLogin from 'vue-google-login'
import { LoaderPlugin } from 'vue-google-login'
import VueCookies from 'vue-cookies'
import clientSideTableOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

//See the reference link here https://www.npmjs.com/package/vue-google-login
// Created client id from https://console.developers.google.com/
Vue.use(LoaderPlugin, {
        client_id: '709054643834-30j9268npj9tltbhnbdso8etbpkk22g6.apps.googleusercontent.com',
        approval_prompt: '',
  });

  Vue.GoogleAuth.then(auth2 => {
        // console.log(auth2.getLastSignedInAccount())
        // console.log(gapi.auth2.getAuthInstance().signIn())
        // console.log('isSignedIn: ',auth2.isSignedIn.get())
        // console.log('currentUser: ',auth2.currentUser.get())
        const authResponse = auth2.currentUser.get().getAuthResponse()
        if(Object.keys(authResponse).length>0){
          console.log('google login')
        }else{
          console.log('google logout')
          localStorage.removeItem('authorizedUserDetails')
        }
  })

Vue.use(VueCookies)
Vue.use(VueAxios, Axios)

export default {
  name: 'App',
  components: {
    GoogleLogin
  },
  created: function () {
        this.cfGetUserGoogleInfo     
        // console.log('From cookie: ',$cookies.get('loginObj'))
        this.mfResetUserAccessToken()
  },

  //This is testing to get google id_token before expiry
  // mounted() {
  //   this.interval = setInterval(() => {
  //     this.mfResetUserAccessToken()
  //   },5000)
  // },

  computed: {
    cfGetUserGoogleInfo() {
      this.userData = localStorage.getItem('authorizedUserDetails')      
      if(this.userData){
        const objUserData = JSON.parse(this.userData.replace(/\+/g, ' '))
        this.loggedinUser = objUserData
        return this.loggedinUser  
      }else{
        return null
      }    
      
    },
    
  },



  data: function () {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
          client_id: "709054643834-30j9268npj9tltbhnbdso8etbpkk22g6.apps.googleusercontent.com",
          authuser: 0

      },
      // only needed if you want to render the button with the google ui
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      },
      loggedinUser: null,
      commonOrmTableForAllComponents: null,
      loggedInUserDetails: null
    }
  },

  methods: {

      onSuccess(googleUser) { 
          // This only gets the user information: id, name, imageUrl and email
          const profile = googleUser.getBasicProfile()
          const loginObj = {
            googleId: profile.getId(),
            fullName: profile.getName(),
            givenName:profile.getGivenName(),
            familyName:profile.getFamilyName(),
            imageUrl:profile.getImageUrl(),
            email:profile.getEmail()
          }
          this.loggedinUser = loginObj
          //console.log(googleUser.getAuthResponse()) //Get the auth response object from the user's auth session. access_token and so on
          const authResponseData = googleUser.getAuthResponse()
          if(this.loggedinUser){
            let self = this
            Axios({
              method: 'post',
              headers: {
                    'Content-Type': 'application/json',
                  },
              url: 'https://staging.savantcare.com/v3/se/oauth/user.php',
              data: {
                email: this.loggedinUser.email
              }
            }).then(function (response) {
                //get loggedin user's details from scemr database and set into browser cookie
                var userObj = response.data.user_data
                var message = response.data.message
                if(userObj){
                  self.loggedInUserDetails = userObj
                  Vue.$cookies.set('loginObj',userObj)
                  localStorage.setItem('authorizedUserDetails',JSON.stringify(self.loggedinUser))
                }                
            });
          }
      },

      onFailure() {
            
      },
      logOutUser(){
        const auth2 = gapi.auth2.getAuthInstance();    
        auth2.signOut().then(function () {
          auth2.disconnect();  
        });
        if(this.loggedInUserDetails){
            clientSideTableOfCommonForAllComponents.delete(this.loggedInUserDetails.publicUniqueId)
        }
        localStorage.removeItem('authorizedUserDetails')
        this.$cookies.remove("loginObj")
        this.loggedinUser = null
        this.loggedInUserDetails = null
      }, 

      mfResetUserAccessToken(){
         Vue.GoogleAuth.then(auth2 => {
           const isSignedIn = auth2.isSignedIn.get()
           const authResponse = auth2.currentUser.get().getAuthResponse()
           var userObj = $cookies.get('loginObj')
           if(isSignedIn && userObj){
             this.loggedInUserDetails = userObj
             if(this.loggedinUser==null){
               const profile = auth2.currentUser.get().getBasicProfile()
                const loginObj = {
                  googleId: profile.getId(),
                  fullName: profile.getName(),
                  givenName:profile.getGivenName(),
                  familyName:profile.getFamilyName(),
                  imageUrl:profile.getImageUrl(),
                  email:profile.getEmail()
                }
                this.loggedinUser = loginObj
                localStorage.setItem('authorizedUserDetails',JSON.stringify(this.loggedinUser))
             }
             this.authResponse = authResponse
           }else{
             //if isSignedIn = false means google account signed out but if p20 still loggedin then forcefully signout the user
             if(this.loggedInUserDetails){
                this.logOutUser()
             }
           }
         })
      },
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 0.875rem;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 0.75rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>