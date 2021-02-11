<template>
  <div>
    <div v-if="!loggedInUuid" class="text-center"><a href="http://localhost"><h1>Please login</h1></a></div>
    <div v-if="loggedInUuid">
      <el-button type="primary" @click="auth('github')">OAuth Login with github</el-button>Choose a patient
      <br />
      <br />
      <a href="/pf/bfe041fa-073b-4223-8c69-0540ee678ff8">TP1: Test patient 1</a>
      <br />
      <br />
      <a href="/pf/01817fb0-c1ef-11ea-a3a5-f36fe4d74da4">TP2: Test patient 2</a>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import Axios from 'axios'
import VueCookies from 'vue-cookies'
import clientSideTableOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

Vue.use(VueCookies)
Vue.use(VueAxios, Axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://192.168.0.100', // Your API domain

  providers: {
    github: {
      clientId: '0370b3eb38840b3129ca',
      redirectUri: 'http://192.168.0.100/auth/callback', // Your client app URL
    },
  },
})
export default {
  components: {},

  created: function(){
    this.getLoggedInUserUniqueId()
    var loggedInUserObj = clientSideTableOfCommonForAllComponents.query().where('fieldName', 'createdUuid').first()
    if(loggedInUserObj){
      this.loggedInUuid = loggedInUserObj.fieldValue
    }
  },

  data: function () {
    return {
      isAuthenticated: this.$auth.isAuthenticated(),
      access_token: null,
      response: null,
      loggedInUuid: null
    }
  },
  methods: {
    auth: function (provider) {
      if (this.$auth.isAuthenticated()) {
        this.$auth.logout()
      }

      this.response = null

      var this_ = this
      this.$auth
        .authenticate(provider)
        .then(function (authResponse) {
          this_.isAuthenticated = this_.$auth.isAuthenticated()

          if (provider === 'github') {
            this_.$http.get('https://api.github.com/user').then(function (response) {
              this_.response = response
              console.log(this_.response)
            })
          }
        })
        .catch(function (err) {
          this_.isAuthenticated = this_.$auth.isAuthenticated()
          this_.response = err
        })
    },

    getLoggedInUserUniqueId() {
      var userObj = $cookies.get('loginObj')
      if(userObj){        
        this.commonOrmTableForAllComponents = clientSideTableOfCommonForAllComponents.insert({
          data: {
            fieldName:'createdUuid',
            fieldValue: userObj.publicUniqueId,
          },
        })
      }   
    }


  },
}
</script>
