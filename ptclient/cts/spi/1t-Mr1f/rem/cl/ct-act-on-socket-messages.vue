<template>
  <div></div>
</template>
<script>
import objOrm from '../db/vuex-orm/orm.js'
export default {
  mounted() {
    console.log('mounted ct-act-on-socket-messages for reminders')

    /*
      This ct is included by gird-ct-design2.vue and timeline-ct.vue
      even when both the ct's (gird-ct-design2.vue and timeline-ct.vue) are on the same page this.$options.sockets only has
      1 of MsgFromSktForRemToAdd and MsgFromSktForRemToDiscontinue
    */
    console.log('The current socket event listeners are', this.$options.sockets)

    /* Ignore message if server sends a socket message that originated from this client */
    console.log('Client id is', this.$socket)
    console.log('Client id is', this.$socket.id)
  },
  sockets: {
    async MsgFromSktForRemToAdd(pData) {
      console.log('MsgFromSktForRemToAdd received from socket server. The data received is', pData)

      const arFromOrm = await objOrm.insert({
        data: {
          vnRowStateInSession: 9, // For meaning of diff values read ptclient/cts/core/crud/forms.md
          ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
          description: pData,
        },
      })
      if (!arFromOrm) {
        console.log('FATAL ERROR')
      }

      /* Goal: Update primary key from previous insert. This logic allows to show in UI a box around the data with the
      right top corner of the box saying "New rem from socket". So this way the user knows that is happening.
      */
      const primaryKeyValue = arFromOrm.rem[0].id
      setTimeout(
        function (scope) {
          scope.fnSetRowStatus(primaryKeyValue)
        },
        1000, // setting timeout of 1 s
        this
      )
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
  methods: {
    fnSetRowStatus(pPrimaryKeyValue) {
      objOrm.update({
        where: pPrimaryKeyValue,
        data: {
          vnRowStateInSession: 1, // For meaning of diff values read ptclient/cts/core/crud/forms.md
        },
      })
    },
  },
}
</script>
