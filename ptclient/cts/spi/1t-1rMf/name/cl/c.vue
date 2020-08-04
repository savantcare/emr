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
import orm from '../db/orm-name.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  props: ['firstParam'], // if the name was changed 4 times earlier so the id will not be 1. Hence id needs to come as a prop from the Ct calling this Ct.
  data() {
    return {
      isMounted: false,
      vnIdOfCopiedRowBeingChangedInOrm: 0,
    }
  },
  computed: {
    cfIsButtonEnabled() {
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('firstName')
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
      // In V1 this was part of mounted, that is sequential programming
      // in V2 this is part of watch, this is "react on state" programming.
      async handler(newIdOfCopiedRowFromOrm, oldIdOfCopiedRowFromOrm) {
        if (newIdOfCopiedRowFromOrm === 0) {
          const arFromOrm = orm.find(this.firstParam)
          const vnExistingRowID = orm.getChangeRowInEditState(arFromOrm.uuid)
          if (vnExistingRowID === false) {
            // Adding a new blank record. Since this is temporal DB
            this.vnIdOfCopiedRowBeingChangedInOrm = await this.mfCopyRowToOrm(arFromOrm)
          } else {
            this.vnIdOfCopiedRowBeingChangedInOrm = vnExistingRowID
          }
        }
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
          firstName: rowToUpsert.firstName,
          middleName: rowToUpsert.middleName,
          lastName: rowToUpsert.lastName,
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
      }
    },
    mfResetForm() {
      // Step 1/3: delete the row that was created as a copy
      orm.deleteChangeRowsInEditState()

      // Step 2/3: Set vnIdOfCopiedRowBeingChangedInOrm as 0 so that "change on state" code can take effect to create a copied row
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
          firstName: pArFromOrm.firstName,
          middleName: pArFromOrm.middleName,
          lastName: pArFromOrm.lastName,
          uuid: pArFromOrm.uuid,
          vnRowStateInSession: 3, // For meaning of diff values read cts/core/crus/forms.md
          ROW_START: Math.floor(Date.now() / 1000), // Ref: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
          // ROW_END: already has a default value inside vuex-orm/rem.js
        },
      })
      return arFromOrm.ptName[0].id
    },
  },
}
</script>
