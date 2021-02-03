<template>
  <div class="container">
    
    <br>
    <div>
      <div v-if="loggedinUser">
         <img :src="loggedinUser.imageUrl">
        <h1>Welcome {{loggedinUser.fullName}}</h1>
        <h2>Your Email id: {{loggedinUser.email}}</h2>
      </div>
      <br>
      {{loggedinUser}}
      
      
      <h1 class="title">webclient</h1>
      <div class="links">


        <GoogleLogin id="g_id_onload" class="button--grey" auto_select="true" :params="params" :onSuccess="onSuccess" :onFailure="onFailure" v-if="!logoutButton">Google Login</GoogleLogin>
         <!-- <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin> -->
        <button  class="button--grey" v-if="logoutButton" v-on:click="logOutUser">Logout</button>
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
  </div>
  
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import GoogleLogin from 'vue-google-login'
import { LoaderPlugin } from 'vue-google-login';
import VueCookies from 'vue-cookies'

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
        console.log('currentUser: ',auth2.currentUser.get())
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
        this.getUserInfo        
        console.log('From cookie: ',$cookies.get('loginObj'))
        this.resetUserAccessToken()
        
    },

  //This is testing to get google id_token before expiry
  // mounted() {
  //   this.interval = setInterval(() => {
  //     this.resetUserAccessToken()
  //   },5000)
  // },



  computed: {
    getUserInfo() {
      this.userData = localStorage.getItem('authorizedUserDetails')
      
      if(this.userData){
        const objUserData = JSON.parse(this.userData.replace(/\+/g, ' '))
        this.loggedinUser = objUserData
        this.logoutButton = true
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
      logoutButton: false
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
            if(this.loggedinUser){
              localStorage.setItem('authorizedUserDetails',JSON.stringify(this.loggedinUser))
              this.logoutButton = true
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
                const userObj = response.data
                Vue.$cookies.set('loginObj',userObj)
              });
            }

      },

      onFailure() {
            
      },
      logOutUser(){
        const auth2 = gapi.auth2.getAuthInstance();     
        console.log(auth2)   
        auth2.signOut().then(function () {
          auth2.disconnect();  
        });

        localStorage.removeItem('authorizedUserDetails')
        this.$cookies.remove("loginObj")
        this.logoutButton = false
        this.loggedinUser = null
      }, 
      
      resetUserAccessToken(){
         Vue.GoogleAuth.then(auth2 => {
           const isSignedIn = auth2.isSignedIn.get()
           const authResponse = auth2.currentUser.get().getAuthResponse()
           if(isSignedIn){

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
                this.logoutButton = true
             }

             this.authResponse = authResponse
           }else{
             this.logOutUser()
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