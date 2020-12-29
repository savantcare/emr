<template>
  <div>
    <el-button type="primary" @click="auth('oauth2')">Login with OAuth</el-button>Choose a patient
    <br />
    <br />
    <!-- {{getUserInfo}} -->
    <div class="row text-center" >
      
      <h1 v-if="getUserInfo">Welcome {{getUserInfo.name}}({{getUserInfo.email}})</h1>
    </div>
    <a href="/pf/abcd">TP1: Test patient 1</a>
    <br />
    <br />
    <a href="/pf/efgh">TP2: Test patient 2</a>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import Axios from 'axios'

// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)

Vue.use(VueAxios, Axios)
Vue.use(VueAuthenticate, {
  tokenPath: 'https://staging.savantcare.com/v3/se/oauth/token.php',
  baseUrl: 'https://staging.savantcare.com/v3/se/oauth/authorize.php', // Your API domain
  redirectUri: 'http://localhost/pf', // Your redirectUri domain

  providers: {
    oauth2: {
      name: 'oauth',
      url: null,
      clientId: 'project20-live',
      redirectUri: 'http://localhost/pf',
      authorizationEndpoint: 'https://staging.savantcare.com/v3/se/oauth/authorize.php',
      defaultUrlParams: ['response_type', 'client_id', 'redirect_uri', 'scope', 'state'],
      requiredUrlParams: null,
      optionalUrlParams: null,
      tokenPath: 'code',
      // tokenPath: 'https://staging.savantcare.com/v3/se/oauth/token.php',
      scope: 'openid',
      scopePrefix: null,
      scopeDelimiter: null,
      state: 'f08d76589e990c4e978780550c7a53e294335408cb000486',
      oauthType: '2.0',
      popupOptions: { width: 1366, height: 768 },
      responseType: 'code',
      responseParams: {
        code: 'code',
        clientId: 'clientId',
        redirectUri: 'redirectUri'
      }
    },
  },
})
export default {
  components: {},
  data: function () {
    return {
      isAuthenticated: this.$auth.isAuthenticated(),
      access_token: null,
      userData: null
    }
  },
  computed: {
    getUserInfo() {
      this.userData = localStorage.getItem('userAccessInfo')
      
      if(this.userData){
        const objUserData = JSON.parse(this.userData.replace(/\+/g, ' '))
        console.log('userData',objUserData);
        return objUserData  
      }else{
        return null
      }
       
      
    },
  },
  methods: {
    auth: function (provider) {
      if (this.$auth.isAuthenticated()) {
        //this.$auth.logout()
      }
      this.response = null

      this.$auth.authenticate(provider).then(function (authResponse) {
        // Execute application logic after successful social authentication
        console.log('step3',authResponse);
        Axios({
           method: 'post',
           headers: {
                'Content-Type': 'application/json',
              },
           url: 'https://staging.savantcare.com/v3/se/oauth/getAccessToken.php',
           data: {
              grant_type : "authorization_code",
              code: authResponse.code,
              redirect_uri: "http://localhost/pf",
              client_id: "project20-live",
              client_secret: "testpass"
           }
         }).then(function (response) {
           console.log(response.data);
           localStorage.setItem('userAccessInfo',JSON.stringify(response.data.user_details));
         });
        
      })
      .catch(function (err) {
          console.log('error: ', err);
          // this_.isAuthenticated = this_.$auth.isAuthenticated()
          // this_.response = err
        })

      //testing

      // var this_ = this
      // this.$auth
      //   .authenticate(provider)
      //   .then(function (authResponse) {
      //     this_.isAuthenticated = this_.$auth.isAuthenticated(authResponse)

      //     const loginObjForMy = VueCookies.get('loginObjForMy');
      //     console.log('loginObjForMy',authResponse,loginObjForMy);

      //     // if (provider === 'sc') {
      //     //   this_.$http.get('https://www.savantcare.com/v3/se/oauth/authorize.php').then(function (response) {
      //     //     this_.response = response
      //     //     console.log(this_.response)
      //     //   })
      //     // }
      //   })
      //   .catch(function (err) {
      //     console.log('new error', err);

      //     this_.isAuthenticated = this_.$auth.isAuthenticated()
      //     this_.response = err
      //   })

      //testing
    },
  }
}
</script>

