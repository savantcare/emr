<template>
  <div></div>
</template>
<script>
import objOrm from '../db/client-side/structure/rem-table.js'
import objCommonOrm from '@/components/pt-info/single/1t-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  mounted() {
    console.log('mounted act-on-socket-messages-ct for reminders')

    /*
      This ct is included by gird-ct-design2.vue and timeline-ct.vue
      even when both the ct's (gird-ct-design2.vue and timeline-ct.vue) are on the same page this.$options.sockets only has
      1 of MsgFromSktForRemToAdd and MsgFromSktForRemToDiscontinue
    */
    console.log('The current socket event listeners are', this.$options.sockets)
  },
  sockets: {
    async MsgFromSktForRemToAdd(pData) {
      const pDataArr = JSON.parse(pData)
      console.log(
        'MsgFromSktForRemToAdd received from socket server. The data received is',
        pDataArr
      )

      // if clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange = socketIdInMsgRecdFromServer then return withiout making any changes.

      const socketClientObj = await objCommonOrm.find(1)

      if (
        socketClientObj.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange !==
        pDataArr.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange
      ) {
        const arFromOrm = await objOrm.insert({
          data: {
            vnRowStateInSession: 9, // For meaning of diff values read webclient/cts/core/crud/forms.md
            ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
            description: pDataArr.description,
            uuid: pDataArr.uuid,
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
      }
    },

    MsgFromSktForRemToDiscontinue(pData) {
      const pDataArr = JSON.parse(pData)
      console.log(
        'MsgFromSktForRemToDiscontinue received from socket server. The data received is',
        pDataArr
      )

      objOrm.update({
        where: (record) => record.uuid === pDataArr.uuid,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },

    async MsgFromSktForRemToChange(pData) {
      const pDataArr = JSON.parse(pData)
      console.log(
        'MsgFromSktForRemToChange received from socket server. The data received is',
        pDataArr
      )

      const socketClientObj = await objCommonOrm.find(1)

      if (
        socketClientObj.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange !==
        pDataArr.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange
      ) {
        /**
         * Goal:
         * 1. Update ROW_END as now() of current active reminder
         * 2. Insert new row in orm with new description
         */
        await objOrm.update({
          where: (record) => {
            return record.uuid === pDataArr.uuid && record.vnRowStateInSession === 1
          },
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })

        await objOrm.insert({
          data: {
            ROW_START: Math.floor(Date.now() / 1000),
            description: pDataArr.description,
            uuid: pDataArr.uuid,
          },
        })
      }
    },
  },
  methods: {
    fnSetRowStatus(pPrimaryKeyValue) {
      objOrm.update({
        where: pPrimaryKeyValue,
        data: {
          vnRowStateInSession: 1, // For meaning of diff values read webclient/cts/core/crud/forms.md
        },
      })
    },
  },
}
</script>
