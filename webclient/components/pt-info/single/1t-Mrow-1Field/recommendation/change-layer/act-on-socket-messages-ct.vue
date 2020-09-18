<template>
  <div></div>
</template>
<script>
import objOrm from '../db/client-side/structure/rec-table.js'
import objCommonOrm from '@/components/pt-info/single/1t-1row-mField/common-for-all-components/db/table.js'

export default {
  mounted() {
    console.log('mounted act-on-socket-messages-ct for recommendations')

    console.log('The current socket event listeners are', this.$options.sockets)
  },
  sockets: {
    async MsgFromSktForRecToAdd(pData) {
      const pDataArr = JSON.parse(pData)
      console.log(
        'MsgFromSktForRecToAdd received from socket server. The data received is',
        pDataArr
      )

      const socketClientObj = await objCommonOrm.find(1)

      if (
        socketClientObj.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange !==
        pDataArr.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange
      ) {
        const arFromOrm = await objOrm.insert({
          data: {
            vnRowStateInSession: 9,
            ROW_START: Math.floor(Date.now() / 1000),
            description: pDataArr.description,
            uuid: pDataArr.uuid,
          },
        })
        if (!arFromOrm) {
          console.log('FATAL ERROR')
        }

        const primaryKeyValue = arFromOrm.rec[0].id
        setTimeout(
          function (scope) {
            scope.fnSetRowStatus(primaryKeyValue)
          },
          1000,
          this
        )
      }
    },

    MsgFromSktForRecToDiscontinue(pData) {
      const pDataArr = JSON.parse(pData)
      console.log(
        'MsgFromSktForRecToDiscontinue received from socket server. The data received is',
        pDataArr
      )

      objOrm.update({
        where: (record) => record.uuid === pDataArr.uuid,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },

    async MsgFromSktForRecToChange(pData) {
      const pDataArr = JSON.parse(pData)
      console.log(
        'MsgFromSktForRecToChange received from socket server. The data received is',
        pDataArr
      )

      const socketClientObj = await objCommonOrm.find(1)

      if (
        socketClientObj.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange !==
        pDataArr.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange
      ) {
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
          vnRowStateInSession: 1,
        },
      })
    },
  },
}
</script>
