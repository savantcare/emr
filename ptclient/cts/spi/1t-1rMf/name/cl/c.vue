<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="First name"
          :value="mfGetFieldValue('firstName')"
          @input="mfSetFieldValueUsingCache($event, 'firstName')"
        >
        </el-input>
        <!-- This gives a error in the console 
          Invalid prop: type check failed for prop "value". Expected String, Number, got Boolean with value false.
        -->
        <el-input
          placeholder="Middle name"
          :value="mfGetFieldValue('middleName')"
          @input="mfSetFieldValueUsingCache($event, 'middleName')"
        ></el-input>
        <el-input
          placeholder="Last name"
          :value="mfGetFieldValue('lastName')"
          @input="mfSetFieldValueUsingCache($event, 'lastName')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="mfOnSubmit">Submit</el-button>
        <el-button type="warning" plain @click="mfResetForm">Reset form</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import fullSyncWithServerDBMixin from '../db/full-sync-with-server-db-mixin'
import ormName from '../db/orm-name.js'
export default {
  mixins: [fullSyncWithServerDBMixin],
  props: ['firstParam'], // if the name was changed 4 times earlier so the id will not be 1. Hence id needs to come as a prop from the Ct calling this Ct.
  data() {
    return {
      mounted: false,
      vnIdOfCopiedRowFromOrm: 0,
    }
  },
  async mounted() {
    if (ormName.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    console.log(this.firstParam)
    const pOrmRowId = 1
    const arFromOrm = ormName.find(pOrmRowId)
    const vnExistingRowID = ormName.getChangeRowInEditState(arFromOrm.uuid)
    if (vnExistingRowID === false) {
      // Adding a new blank record. Since this is temporal DB
      this.vnIdOfCopiedRowFromOrm = await this.mfCopyRowToOrm(arFromOrm)
    } else {
      console.log('existing row in change state so no need to copy')
      this.vnIdOfCopiedRowFromOrm = vnExistingRowID
    }
    this.mounted = true
  },
  methods: {
    async mfOnSubmit() {
      // Since only one valid row is possible there may be other discontinued rows
      // Hence find(1) needs to get improved.
      const rowToUpsert = ormName.find(1)
      console.log(rowToUpsert)
      const response = await fetch(ormName.apiUrl + '/' + rowToUpsert.uuid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
          firstName: rowToUpsert.firstName,
          middleName: rowToUpsert.middleName,
          lastName: rowToUpsert.lastName,
        }),
      })
      console.log(response)
    },
    mfResetForm() {
      // The original data is no longer on the client side hence I have to fetch the data from the server
      this.mxGetDataFromDb()
      // the rowStatus has cached the data so I need to remove the cache from row status
      ormName.arOrmRowsCached = []
      // TODO: The form needs to be reinitialized with the data in the state.
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
      if (!this.mounted) return false
      // let us find out if there is an existing row that is already in change state
      const value = ormName.getFieldValue(this.vnIdOfCopiedRowFromOrm, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pFieldName) {
      /*
      For reason of this gate see comment for mfGetField in this file
      */
      if (!this.mounted) return false
      const rowStatus = 24 // 2 is new on client and 4 is changed on client
      ormName.setFieldValue(pEvent, this.vnIdOfCopiedRowFromOrm, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
    // why is row copied and then edited/changed? See rem/cl/c.vue approx line 108
    async mfCopyRowToOrm(pArFromOrm) {
      console.log(ormName)
      const arFromOrm = await ormName.insert({
        data: {
          id: 2,
          firstName: pArFromOrm.firstName,
          middleName: pArFromOrm.middleName,
          lastName: pArFromOrm.lastName,
          uuid: pArFromOrm.uuid,
          vnRowStateInSession: 3, // For meaning of diff values read rem/db/vuex-orm/rems.js:71
          ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
          // ROW_END: already has a default value inside vuex-orm/rem.js
        },
      })
      console.log(arFromOrm)
      return arFromOrm.ptName[0].id
    },
  },
}
</script>
