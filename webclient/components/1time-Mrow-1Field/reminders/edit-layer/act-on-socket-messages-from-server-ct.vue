<template>
  <div></div>
</template>
<script>
import clientSideTableOfCommonForAllComponents from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import clientSideTable from '../db/client-side/structure/reminders-of-a-patient-table.js'

export default {
  mounted() {
    console.log('mounted act-on-socket-messages-from-server-ct for reminders')

    /*
      This ct is included by gird-ct-design2.vue and timeline-ct.vue
      even when both the ct's (gird-ct-design2.vue and timeline-ct.vue) are on the same page this.$options.sockets only has
      1 of MsgFromSktForRemToAdd and MsgFromSktForRemToDelete
    */
    console.log('The current socket event listeners are', this.$options.sockets)
  },
  sockets: {
    async MsgFromSktForRemToAdd(pData) {
      const pDataArr = JSON.parse(pData)
      console.log('MsgFromSktForRemToAdd received from socket server. The data received is', pDataArr)

      // if client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change = socketIdInMsgRecdFromServer then return withiout making any changes.

      const socketClientObj = await clientSideTableOfCommonForAllComponents
        .query()
        .where(
          'fieldName',
          'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change'
        )
        .first()

      if (
        socketClientObj.fieldValue !==
        pDataArr['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
      ) {
        const arFromClientSideTable = await clientSideTable.insert({
          data: {
            vnRowStateInSession: 9, // For meaning of diff values read webclient/cts/non-temporal/crud/forms.md
            ROW_START: Math.floor(Date.now()), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
            description: pDataArr.description,
            serverSideRowUuid: pDataArr.serverSideRowUuid,
          },
        })
        if (!arFromClientSideTable) {
          console.log('FATAL ERROR')
        }

        /* Goal: Update primary key from previous insert. This logic allows to show in UI a box around the data with the
      right top corner of the box saying "New rem from socket". So this way the user knows that is happening.
      */
        const clientSidePrimaryKeyValue = arFromClientSideTable.tblRecommendations[0].clientSideUniqRowId
        setTimeout(
          function (scope) {
            scope.fnSetRowStatus(clientSidePrimaryKeyValue)
          },
          2000, // setting timeout of 2 s
          this
        )
      }
    },

    MsgFromSktForRemToDelete(pData) {
      const pDataArr = JSON.parse(pData)
      console.log('MsgFromSktForRemToDelete received from socket server. The data received is', pDataArr)

      clientSideTable.update({
        where: (record) => record.serverSideRowUuid === pDataArr.serverSideRowUuid,
        data: {
          ROW_END: Math.floor(Date.now()),
        },
      })
    },

    async MsgFromSktForRemToChange(pData) {
      const pDataArr = JSON.parse(pData)
      console.log('MsgFromSktForRemToChange received from socket server. The data received is', pDataArr)

      const socketClientObj = await clientSideTableOfCommonForAllComponents
        .query()
        .where(
          'fieldName',
          'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change'
        )
        .first()

      if (
        socketClientObj.fieldValue !==
        pDataArr['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
      ) {
        /**
         * Goal:
         * 1. Update ROW_END as now() of current active recommendation
         * 2. Insert new row in orm with new description
         */
        await clientSideTable.update({
          where: (record) => {
            return record.serverSideRowUuid === pDataArr.serverSideRowUuid && record.vnRowStateInSession === 1
          },
          data: {
            ROW_END: Math.floor(Date.now()),
          },
        })

        await clientSideTable.insert({
          data: {
            ROW_START: Math.floor(Date.now()),
            description: pDataArr.description,
            serverSideRowUuid: pDataArr.serverSideRowUuid,
          },
        })
      }
    },
  },
  methods: {
    fnSetRowStatus(pClientSidePrimaryKeyValue) {
      clientSideTable.update({
        where: pClientSidePrimaryKeyValue,
        data: {
          vnRowStateInSession: 1, // For meaning of diff values read webclient/cts/non-temporal/crud/forms.md
        },
      })
    },
  },
}
</script>
