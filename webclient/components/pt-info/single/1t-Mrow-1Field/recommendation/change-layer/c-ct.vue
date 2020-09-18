<!-- Reference implementation for Mr1f (Multiple row 1 field) -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          ref="description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          :value="mfGetCopiedRowBeingChangedFldVal('description')"
          @input="mfSetCopiedRowBeingChangedFldVal($event, 'description')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" plain @click="mfSendDataToServer"
          >Submit firstprop is {{ this.firstProp }}</el-button
        >
      </el-form-item>
    </el-form>

    <!-- Goal: Show history of this row. Since this is a single field hence we are showing the history. If it was multiple fields then we do not show the history -->
    <el-timeline style="padding-inline-start: 20px;">
      <el-timeline-item
        v-for="row in cfTimeLineDataAr"
        :key="row.ROW_START"
        :timestamp="row.createdAt"
        :type="row.type"
      >
        {{ row.description }}
        <!-- The following come on right of the description that comes in the timeline. 
        Since they are part of the same line we do not capitalize the first alphabet. So it is "sending to server"
        and it is not "Sending to server"
        -->
        <span v-if="row.vnRowStateInSession == 345" class="api-response-message el-button--warning"
          >sending to server</span
        >
        <span
          v-if="row.vnRowStateInSession == 34571"
          class="api-response-message el-button--success"
          >saved this session</span
        >
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import objOrm from '../db/client-side/structure/rec-table.js'
import objCommonOrm from '@/components/pt-info/single/1t-1row-mField/common-for-all-components/db/table.js'
export default {
  props: ['firstProp', 'formType'],
  data() {
    return {
      dnOrmUuidOfRowToChange: '',
      dnOrmIdOfRowToChange: this.firstProp,
      dnOrmIdOfCopiedRowBeingChanged: -1,
    }
  },
  computed: {
    cfTimeLineDataAr() {
      const timelineDataArray = []

      const arFromOrm = objOrm
        .query()
        .where('uuid', this.dnOrmUuidOfRowToChange)
        .orderBy('ROW_START', 'desc')
        .get()
      if (arFromOrm.length) {
        let rowInTimeLine = []
        let date = ''
        for (let i = 0; i < arFromOrm.length; i++) {
          rowInTimeLine = {}
          rowInTimeLine.description = arFromOrm[i].description
          date = new Date(arFromOrm[i].ROW_START * 1000)
          rowInTimeLine.createdAt =
            date.toLocaleString('default', { month: 'long' }) +
            '-' +
            date.getDate() +
            '-' +
            date.getFullYear()
          if (
            arFromOrm[i].vnRowStateInSession === 3 ||
            arFromOrm[i].vnRowStateInSession === 34 ||
            arFromOrm[i].vnRowStateInSession === 3456
          ) {
            rowInTimeLine.type = 'warning'
          } else {
            rowInTimeLine.type = ''
          }
          rowInTimeLine.ROW_START = arFromOrm[i].ROW_START
          rowInTimeLine.vnRowStateInSession = arFromOrm[i].vnRowStateInSession

          timelineDataArray.push(rowInTimeLine)
        }
      }
      return timelineDataArray
    },
  },

  watch: {
    firstProp: {
      immediate: true,
      handler(pNVal, pOVal) {
        this.dnOrmIdOfRowToChange = pNVal
        this.dnOrmIdOfCopiedRowBeingChanged = null
      },
    },

    dnOrmIdOfCopiedRowBeingChanged: {
      immediate: true,
      async handler(pNVal, pOVal) {
        if (this.dnOrmIdOfRowToChange === -1) return

        if (pNVal === null) {
          const arOrmRowToChange = objOrm.find(this.dnOrmIdOfRowToChange)
          this.dnOrmUuidOfRowToChange = arOrmRowToChange.uuid
          const vnExistingChangeRowId = objOrm.fnGetChangeRowIdInEditState(arOrmRowToChange.uuid)
          if (vnExistingChangeRowId === false) {
            this.dnOrmIdOfCopiedRowBeingChanged = await objOrm.fnCopyRow(arOrmRowToChange.id)
          } else {
            this.dnOrmIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  methods: {
    async mfCopyRowToOrm(pOrmRowToChange) {
      this.dnOrmIdOfCopiedRowBeingChanged = await objOrm.fnCopyRow(pOrmRowToChange.id)
    },
    mfManageFocus() {
      if (this.$refs.description && this.formType !== 'embedded') {
        const lastElement = this.$refs.description.length
        if (!lastElement) {
          this.$refs.description.focus()
        } else {
          this.$refs.description[lastElement - 1].focus()
        }
      }
    },
    mfGetCopiedRowBeingChangedFldVal(pFldName) {
      return objOrm.fnGetFldValue(this.dnOrmIdOfCopiedRowBeingChanged, pFldName)
    },
    mfSetCopiedRowBeingChangedFldVal(pEvent, pFldName) {
      const rowStatus = 34
      objOrm.fnSetFldValue(pEvent, this.dnOrmIdOfCopiedRowBeingChanged, pFldName, rowStatus)
      this.$forceUpdate()
    },
    async mfSendDataToServer() {
      try {
        await objOrm.update({
          where: this.dnOrmIdOfCopiedRowBeingChanged,
          data: {
            vnRowStateInSession: '345',
          },
        })

        const socketClientObj = await objCommonOrm.find(1)

        const response = await fetch(objOrm.apiUrl + '/' + this.dnOrmUuidOfRowToChange, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            description: this.mfGetCopiedRowBeingChangedFldVal('description'),
            clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange:
              socketClientObj.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange,
          }),
        })

        if (!response.ok) {
          objOrm.update({
            where: this.dnOrmIdOfCopiedRowBeingChanged,
            data: {
              vnRowStateInSession: 3458,
            },
          })
          console.log('Failed to update')
        } else {
          await objOrm.update({
            where: (record) => {
              return (
                record.uuid === this.dnOrmUuidOfRowToChange &&
                (record.vnRowStateInSession === 1 ||
                  record.vnRowStateInSession === 34571 ||
                  record.vnRowStateInSession === 24571)
              )
            },
            data: {
              ROW_END: Math.floor(Date.now() / 1000),
            },
          })
          objOrm.update({
            where: this.dnOrmIdOfCopiedRowBeingChanged,
            data: {
              vnRowStateInSession: 34571,
            },
          })
          console.log('update success')
        }

        this.dnOrmIdOfRowToChange = this.dnOrmIdOfCopiedRowBeingChanged
        this.dnOrmIdOfCopiedRowBeingChanged = null
        this.mfManageFocus()
      } catch (ex) {
        console.log('update error', ex)
      }
      console.log(
        'mfSendDataToServer-> ',
        this.dnOrmUuidOfRowToChange,
        this.mfGetCopiedRowBeingChangedFldVal('description')
      )
    },
  },
}
</script>

<style>
span.api-response-message {
  padding: 0px 8px 3px 8px;
  border-radius: 20px;
  font-size: 12px;
}
</style>
