<template>
  <div>
    <div v-if="!loggedInUuid" class="text-center"><a href="http://localhost"><h1>Please login</h1></a></div>
    <div v-else>
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
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

export default {
  components: {},

  created: function(){

    var userObj = $cookies.get('loginObj')
    if(userObj){
      this.loggedInUuid = userObj.publicUniqueId
    }

  },

  data: function () {
    return {
      loggedInUuid: null
    }
  },
  methods: {},
}
</script>
