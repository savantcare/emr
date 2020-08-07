<!-- Master doc is at reference implementation name/cl/c.vue. This file has doc unique to this ct 
Code synced with ref implementation on 4th august 2020
-->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="Weight in pounds"
          :value="mfGetFieldValue('weightInPounds')"
          @input="mfSetFieldValueUsingCache($event, 'weightInPounds')"
        >
        </el-input>
        <el-date-picker
          :value="mfGetFieldValue('dateOfMeasurement')"
          type="date"
          placeholder="Pick a day"
          :picker-options="pickerOptions"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd"
          @input="mfSetFieldValueUsingCache($event, 'dateOfMeasurement')"
        >
        </el-date-picker>
        <el-input
          placeholder="Notes"
          type="textarea"
          :autosize="{ minRows: 2 }"
          :value="mfGetFieldValue('notes')"
          @input="mfSetFieldValueUsingCache($event, 'notes')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="cfIsButtonDisabled" type="primary" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfIsButtonDisabled" type="warning" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  props: { firstProp: Number },
  data() {
    return {
      vnOrmIdOfRowToChange: this.firstProp,
      vnOrmIdOfCopiedRowBeingChanged: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
    }
  },
  computed: {
    cfIsButtonDisabled() {
      if (this.vnOrmIdOfCopiedRowBeingChanged === null) return true
      if (
        orm.fnIsDataFieldsOfRowSame(this.vnOrmIdOfRowToChange, this.vnOrmIdOfCopiedRowBeingChanged)
      ) {
        this.$root.$emit('event-from-ct-weight-copied-row-same')
        return true
      }
      this.$root.$emit('event-from-ct-weight-copied-row-diff')
      return false
    },
  },
  watch: {
    vnOrmIdOfCopiedRowBeingChanged: {
      immediate: true,
      async handler(pIdOfCopiedRowBeingChangedInOrmNewVal, pIdOfCopiedRowBeingChangedInOrmOldval) {
        if (pIdOfCopiedRowBeingChangedInOrmNewVal === null) {
          const arFromOrm = orm.find(this.vnOrmIdOfRowToChange)
          const vnExistingChangeRowId = orm.fnGetChangeRowIdInEditState(arFromOrm.uuid)
          if (vnExistingChangeRowId === false) {
            this.vnOrmIdOfCopiedRowBeingChanged = await orm.fnCopyRow(arFromOrm.id)
          } else {
            this.vnOrmIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  methods: {
    async mfOnSubmit() {
      const rowToUpsert = orm.find(this.vnOrmIdOfCopiedRowBeingChanged)
      const response = await fetch(orm.apiUrl + '/' + rowToUpsert.uuid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          uuid: rowToUpsert.uuid,
          weightInPounds: rowToUpsert.weightInPounds,
          dateOfMeasurement: rowToUpsert.dateOfMeasurement,
          notes: rowToUpsert.notes,
        }),
      })
      if (response.status === 200) {
        await orm.update({
          where: (record) => {
            return (
              record.uuid === rowToUpsert.uuid &&
              (record.vnRowStateInSession === 1 ||
                record.vnRowStateInSession === 34571 ||
                record.vnRowStateInSession === 24571)
            )
          },
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
        orm.update({
          where: this.vnOrmIdOfCopiedRowBeingChanged,
          data: {
            vnRowStateInSession: 34571,
          },
        })
        this.vnOrmIdOfRowToChange = this.vnOrmIdOfCopiedRowBeingChanged
        this.vnOrmIdOfCopiedRowBeingChanged = null
      }
    },
    mfOnResetForm() {
      orm.fnDeleteChangeRowsInEditState()

      this.vnOrmIdOfCopiedRowBeingChanged = null

      orm.arOrmRowsCached = []
    },
    mfGetFieldValue(pFieldName) {
      const value = orm.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pFieldName) {
      const rowStatus = 34
      orm.fnSetFieldValue(pEvent, this.vnOrmIdOfCopiedRowBeingChanged, pFieldName, rowStatus)
      this.$forceUpdate()
    },
  },
}
</script>
