<!-- Reference implementation -->
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
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm-name.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  props: { firstParam: Number }, // if the name was changed 4 times earlier so the id will not be 1. Hence id needs to come as a prop from the Ct calling this Ct.
  data() {
    return {
      vnIdOfCopiedRowBeingChangedInOrm: 0, // This row is one step ahead of idOfRowBeingChaged
      idOfRowBeingChaged: this.firstParam, // This row is not changed in the ORM. This row is the latest data where ROW_END is in future.
      // Commit ID 96f8655 there used to be a isMounted flag. But that is not needed since this Ct can only be invoked when data in orm has already been loaded
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
      /*
        In V1 this was part of mounted, that is sequential programming
        in V2 this is part of watch, this is "react on state" programming.

        When called first time:
           newIdOfCopiedRowFromOrm = 0 since data section sets that value
           oldIdOfCopiedRowFromOrm is undefined

        When called second time:
           newIdOfCopiedRowFromOrm = 0 since any other function that wants a new row being copied sets it to 0
           oldIdOfCopiedRowFromOrm is the old value of newIdOfCopiedRowFromOrm. Hence previous row that was being edited

      */

      async handler(newIdOfCopiedRowFromOrm, oldIdOfCopiedRowFromOrm) {
        if (newIdOfCopiedRowFromOrm === 0) {
          const arFromOrm = orm.find(this.idOfRowBeingChaged)
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
  methods: {
    async mfOnSubmit() {
      // Since only one valid row is possible there may be other discontinued rows
      const rowToUpsert = orm.find(this.vnIdOfCopiedRowBeingChangedInOrm)
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
      if (response.status === 200) {
        // set ROW_END of row being changed
        await orm.update({
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
        For each field this function is called twice.
        Why is this called twice for each field?
        console.log('When the Ct is first loaded let us see how many times if getField called');
      */
      // let us find out if there is an existing row that is already in change state
      const value = orm.getFieldValue(this.vnIdOfCopiedRowBeingChangedInOrm, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pFieldName) {
      /*
      For reason of this gate see comment for mfGetField in this file
      */
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
