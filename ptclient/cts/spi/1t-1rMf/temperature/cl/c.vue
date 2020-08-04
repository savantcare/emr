<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="Temperature in Farehnite"
          :value="mfGetFieldValue('temperatureInFarehnite')"
          @input="mfSetFieldValueUsingCache($event, 'temperatureInFarehnite')"
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
import orm from '../db/orm-temperature.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  props: ['firstParam'], // if the name was changed 4 times earlier so the id will not be 1. Hence id needs to come as a prop from the Ct calling this Ct.
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
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('temperatureInFarehnite')
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
      // Since only one valid row is possible there may be other discontinued rows
      // Hence find(1) needs to get improved.
      const rowToUpsert = orm.find(this.vnIdOfCopiedRowBeingChangedInOrm)
      console.log(rowToUpsert)
      const response = await fetch(orm.apiUrl + '/' + rowToUpsert.uuid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
          uuid: rowToUpsert.uuid,
          temperatureInFarehnite: rowToUpsert.temperatureInFarehnite,
          dateOfMeasurement: rowToUpsert.dateOfMeasurement,
          notes: rowToUpsert.notes,
        }),
      })
      console.log(response)
      if (response.status === 200) {
        // set ROW_END of row being changed
        const updateStatus = await orm.update({
          where: (record) => {
            return (
              record.uuid === rowToUpsert.uuid &&
              (record.vnRowStateInSession === 1 /* Came from DB */ ||
              record.vnRowStateInSession ===
                34571 /* Created as copy on client -> Changed -> Requested save -> Send to server -> API Success */ ||
                record.vnRowStateInSession ===
                  24571) /* New -> Changed -> Requested save -> Send to server -> API Success */
            )
          },
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
        console.log(updateStatus)
        /* Goal: Update the value of copied row to success or failure depending on the api response */
        orm.update({
          where: this.vnIdOfCopiedRowBeingChangedInOrm,
          data: {
            vnRowStateInSession: 34571,
          },
        })
        // After submitting the form since the form to edit is still there I need to create a copied row
        this.idOfRowBeingChaged = this.vnIdOfCopiedRowBeingChangedInOrm
        this.vnIdOfCopiedRowBeingChangedInOrm = 0 // the "act on state" logic will get activate see watch vnIdOfCopiedRowBeingChangedInOrm
      }
    },
    mfResetForm() {
      // Step 1/3: delete the row that was created as a copy
      orm.deleteChangeRowsInEditState()

      // Step 2/3: Set vnIdOfCopiedRowBeingChangedInOrm as 0 so that "act on state" code can take effect to create a copied row see watch vnIdOfCopiedRowBeingChangedInOrm
      this.vnIdOfCopiedRowBeingChangedInOrm = 0

      // Step 3/3: the fields in the form have existing edited values the fields need to have non edited values
      orm.arOrmRowsCached = []
    },

    /* Template cannot directly call a ORM function. So first calling a method function
     and that calls the ORM function
     */
    mfGetFieldValue(pFieldName) {
      /*
      Even before Ct is mounted this fn starts getting called for each field.
      Putting a gate here keeps the system optimized
      Without the gate with a debugger statment placed inside getField this function was called 3 times
      even before the data came from the server and got loaded into the ORM.
      */
      if (!this.isMounted) return 'loading'
      // let us find out if there is an existing row that is already in change state
      const value = orm.getFieldValue(this.vnIdOfCopiedRowBeingChangedInOrm, pFieldName)
      console.log(value, this.vnIdOfCopiedRowBeingChangedInOrm, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pFieldName) {
      /*
      For reason of this gate see comment for mfGetField in this file
      */
      if (!this.isMounted) return 'loading'
      const rowStatus = 34 // 3 is copy on client and 4 is changed on client
      orm.setFieldValue(pEvent, this.vnIdOfCopiedRowBeingChangedInOrm, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
    // why is row copied and then edited/changed? See rem/cl/c.vue approx line 108
    async mfCopyRowToOrm(pArFromOrm) {
      const arFromOrm = await orm.insert({
        data: {
          temperatureInFarehnite: pArFromOrm.temperatureInFarehnite,
          dateOfMeasurement: pArFromOrm.dateOfMeasurement,
          notes: pArFromOrm.notes,
          uuid: pArFromOrm.uuid,
          vnRowStateInSession: 3, // For meaning of diff values read cts/core/crus/forms.md
          ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
          // ROW_END: already has a default value inside vuex-orm/rem.js
        },
      })
      return arFromOrm.ptTemperature[0].id
    },
  },
}
</script>
