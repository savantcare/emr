<template>
  <div></div>
</template>
<script>
import objOrm from '../db/vuex-orm/orm.js'
export default {
  mounted() {
    console.log('mounted ct-act-on-socket-messages for reminders')
    console.log('The current socket event listeners are', this.$options.sockets)
    /*
      This ct is included by gird-ct-design2.vue and timeline-ct.vue
      even when both the ct's (gird-ct-design2.vue and timeline-ct.vue) are on the same page this.$options.sockets only has 
      1 of MsgFromSktForRemToAdd and MsgFromSktForRemToDiscontinue
    */
  },
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
    MsgFromSktForRemToDiscontinue(pData) {
      console.log(
        'MsgFromSktForRemToDiscontinue received from socket server. The data received is',
        pData
      )

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
