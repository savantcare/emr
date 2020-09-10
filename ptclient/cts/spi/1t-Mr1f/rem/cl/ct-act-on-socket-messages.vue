<template>
  <div></div>
</template>
<script>
import objOrm from '../db/vuex-orm/orm.js'
export default {
  sockets: {
    MsgFromSktForRemToAdd(pData) {
      console.log('MsgFromSktForRemToAdd received from socket server. The data received is', pData)

      const arFromOrm = objOrm.insert({
        data: {
          vnRowStateInSession: 2, // For meaning of diff values read ptclient/cts/core/crud/forms.md
          ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
          description: pData,
        },
      })
      if (!arFromOrm) {
        console.log('FATAL ERROR')
      }
    },
  },
}
</script>
