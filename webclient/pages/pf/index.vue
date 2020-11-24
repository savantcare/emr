<template>
  <div>
    <el-button type="primary" @click="auth('savantcare')">OAuth Login</el-button>Choose a patient
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
        client_id: 'superstars-discourseonhttp',
        response_type: 'code',
        redirect_uri: 'https://www.savantcare.com/superstars/auth/oauth2_basic/callback',
      }
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
      Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      Axios.post('https://www.savantcare.com/v3/se/oauth/authorize.php', data, {
        headers: headers,
      })
        .then((response) => (this.articleId = response.data.id))
        .catch((error) => {
          this.errorMessage = error.message
          console.error('There was an error!', error)
        })
    },
  },
}
</script>
