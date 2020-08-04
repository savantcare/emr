<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          ref="firstName"
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
import fullSyncWithServerDBMixin from '../db/full-sync-with-server-db-mixin'
import ormName from '../db/orm-name.js'
export default {
  mixins: [fullSyncWithServerDBMixin],
  props: ['firstParam'], // if the name was changed 4 times earlier so the id will not be 1. Hence id needs to come as a prop from the Ct calling this Ct.
  data() {
    return {
      isMounted: false,
      vnIdOfCopiedRowFromOrm: 0,
    }
  },
  computed: {
    cfIsButtonEnabled() {
      const arFromOrm = ormName.getValidUniqueUuidNotEmptyRows('firstName')
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
    vnIdOfCopiedRowFromOrm: {
      immediate: true,
      // In V1 this was part of mounted, that is sequential programming
      // in V2 this is part of watch, this is "react on state" programming.
      async handler(newIdOfCopiedRowFromOrm, oldIdOfCopiedRowFromOrm) {
        console.log(
          'vnIdOfCopiedRowFromOrm changed',
          newIdOfCopiedRowFromOrm,
          oldIdOfCopiedRowFromOrm
        )
        if (newIdOfCopiedRowFromOrm === 0) {
          const arFromOrm = ormName.find(this.firstParam)
          const vnExistingRowID = ormName.getChangeRowInEditState(arFromOrm.uuid)
          if (vnExistingRowID === false) {
            // Adding a new blank record. Since this is temporal DB
            this.vnIdOfCopiedRowFromOrm = await this.mfCopyRowToOrm(arFromOrm)
          } else {
            console.log('existing row in change state so no need to copy')
            this.vnIdOfCopiedRowFromOrm = vnExistingRowID
          }
          console.log('creating a row copy')
        }
      },
    },
  },
  async mounted() {
    if (ormName.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    this.isMounted = true
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
      // Step 1/3: delete the row that was created as a copy
      ormName.deleteChangeRowsInEditState()

      // Step 2/3: Set vnIdOfCopiedRowFromOrm as 0 so that "change on state" code can take effect to create a copied row
      this.vnIdOfCopiedRowFromOrm = 0

      // Step 3/3: the fields in the form have existing edited values the fields need to have non edited values
      ormName.arOrmRowsCached = []
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
      const value = ormName.getFieldValue(this.vnIdOfCopiedRowFromOrm, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pFieldName) {
      /*
      For reason of this gate see comment for mfGetField in this file
      */
      if (!this.isMounted) return 'loading'
      const rowStatus = 34 // 3 is copy on client and 4 is changed on client
      ormName.setFieldValue(pEvent, this.vnIdOfCopiedRowFromOrm, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
    // why is row copied and then edited/changed? See rem/cl/c.vue approx line 108
    async mfCopyRowToOrm(pArFromOrm) {
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
      return arFromOrm.ptName[0].id
    },
  },
}
</script>
