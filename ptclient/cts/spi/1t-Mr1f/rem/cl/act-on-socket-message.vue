<template>
  <div></div>
</template>
<script>
// import objOrm from '../db/vuex-orm/orm.js'
export default {
  sockets: {
    sktMsgRemAdd(data) {
      console.log('sktAddRem message received from socket server. The data received is', data)
    },
  },
}
</script>
