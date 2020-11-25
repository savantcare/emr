<template>
  <div>
    <el-button type="primary" @click="auth('savantcare')">OAuth Login with github</el-button>Choose a patient
    <br />
    <br />
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

Vue.use(VueAxios, Axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://192.168.0.100', // Your API domain

  providers: {
    savantcare: {
      clientId: '0370b3eb38840b3129ca',
      redirectUri: 'http://192.168.0.100/auth/callback', // Your client app URL
    },
  },
})
export default {
  components: {},
  data: function () {
    return {
      isAuthenticated: false,
      access_token: null,
      response: null,
    }
  },
  methods: {
    auth: function (provider) {
      const data = {
        client_id: 'project20-live',
        response_type: 'code',
        redirect_uri: 'http://192.168.0.102/pf/auth/oauth2_basic/callback',
      }
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
      Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      Axios.post('https://staging.savantcare.com/v3/se/oauth/authorize.php', data, {
        headers: headers,
      })
        .then((response) => (console.log(response)))
        .catch((error) => {
          this.errorMessage = error.message
          console.error('There was an error!', error)
        })
      
    },
  },
}
</script>
