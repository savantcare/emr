<!-- Code architecture doc is at reference implementation name/cl/c.vue
In this file only doc unique to this ct is written
 -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="Height in inches"
          :value="mfGetFieldValue('heightInInches')"
          @input="mfSetFieldValueUsingCache($event, 'heightInInches')"
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
        <el-button :disabled="cfIsButtonEnabled" type="primary" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfIsButtonEnabled" type="warning" plain @click="mfResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-server-db-mixin'
import orm from '../db/orm-height.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  props: ['firstParam'],
  data() {
    return {
      isMounted: false,
      vnIdOfCopiedRowBeingChangedInOrm: 0,
      idOfRowBeingChaged: this.firstParam,
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
    cfIsButtonEnabled() {
      if (!this.isMounted) return false
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('heightInInches')
      if (arFromOrm.length === 0) return false
      const strOfNumber = arFromOrm[0].vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return false
      }
      return true
    },
  },
  watch: {
    vnIdOfCopiedRowBeingChangedInOrm: {
      immediate: true,
      // For detailed doc see name/cl/c.vue
      async handler(newIdOfCopiedRowFromOrm, oldIdOfCopiedRowFromOrm) {
        console.log(
          'newIdOfCopiedRowFromOrm, oldIdOfCopiedRowFromOrm',
          'this.idOfRowBeingChaged',
          'this.firstParam',
          newIdOfCopiedRowFromOrm,
          oldIdOfCopiedRowFromOrm,
          this.idOfRowBeingChaged,
          this.firstParam
        )
        if (newIdOfCopiedRowFromOrm === 0) {
          const arFromOrm = orm.find(this.idOfRowBeingChaged)
          const vnExistingRowID = orm.getChangeRowInEditState(arFromOrm.uuid)
          if (vnExistingRowID === false) {
            // Adding a new blank record. Since this is temporal DB
            console.log('adding blank')
            this.vnIdOfCopiedRowBeingChangedInOrm = await this.mfCopyRowToOrm(arFromOrm)
          } else {
            console.log('not adding blank')
            this.vnIdOfCopiedRowBeingChangedInOrm = vnExistingRowID
          }
        }
        console.log('this.vnIdOfCopiedRowBeingChangedInOrm', this.vnIdOfCopiedRowBeingChangedInOrm)
      },
    },
  },
  async mounted() {
    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    this.isMounted = true
  },
  methods: {
    async mfOnSubmit() {
      const rowToUpsert = orm.find(this.vnIdOfCopiedRowBeingChangedInOrm)
      const response = await fetch(orm.apiUrl + '/' + rowToUpsert.uuid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          uuid: rowToUpsert.uuid,
          heightInInches: rowToUpsert.heightInInches,
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
          where: this.vnIdOfCopiedRowBeingChangedInOrm,
          data: {
            vnRowStateInSession: 34571,
          },
        })
        this.idOfRowBeingChaged = this.vnIdOfCopiedRowBeingChangedInOrm
        this.vnIdOfCopiedRowBeingChangedInOrm = 0
      }
    },
    mfResetForm() {
      orm.deleteChangeRowsInEditState()

      this.vnIdOfCopiedRowBeingChangedInOrm = 0

      orm.arOrmRowsCached = []
    },
    mfGetFieldValue(pFieldName) {
      if (!this.isMounted) return 'loading'
      const value = orm.getFieldValue(this.vnIdOfCopiedRowBeingChangedInOrm, pFieldName)
      console.log(value, this.vnIdOfCopiedRowBeingChangedInOrm, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pFieldName) {
      if (!this.isMounted) return 'loading'
      const rowStatus = 34
      orm.setFieldValue(pEvent, this.vnIdOfCopiedRowBeingChangedInOrm, pFieldName, rowStatus)
      this.$forceUpdate()
    },
    async mfCopyRowToOrm(pArFromOrm) {
      const arFromOrm = await orm.insert({
        data: {
          heightInInches: pArFromOrm.heightInInches,
          dateOfMeasurement: pArFromOrm.dateOfMeasurement,
          notes: pArFromOrm.notes,
          uuid: pArFromOrm.uuid,
          vnRowStateInSession: 3,
          ROW_START: Math.floor(Date.now() / 1000),
        },
      })
      return arFromOrm.ptHeight[0].id
    },
  },
}
</script>
