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
        <el-button :disabled="cfHasSomeFieldChanged" type="success" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfHasSomeFieldChanged" type="danger" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import orm from '../db/orm.js'
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'

export default {
  mixins: [mxFullSyncWithDbServer],

  /*  if the name was changed 4 times earlier so the id will not be 1 it will be 5. The id will always be the highest row that is not valid and ends in 1
      I want doctor to be able to type: "change name" though this operates on a row there is only one row.
      When doctor types "change name" the id cannot be passed to this ct. This ct needs to find this id on its own. */
  data() {
    return {
      /* 1. row to change is not same as row being changed. This row is the latest data where ROW_END is in future and row status ends in 1   */
      vnOrmIdOfRowToChange: null,

      /* Why not change the original row? 1. If the user hits reset I cannot go back to the data that the user started with. 2. Server side is temporal DB where the origianl data row is not changed. Only ROW_START and ROW_END are changed. */
      vnOrmIdOfCopiedRowBeingChanged: -1, // This row is one step ahead of vnOrmIdOfRowToChange See Chapter 15 video
    }
  },
  computed: {
    cfHasSomeFieldChanged() {
      if (this.vnOrmIdOfCopiedRowBeingChanged == -1) return true // there is a race condition. This if statement waits for copy to finish
      if (this.vnOrmIdOfCopiedRowBeingChanged === null) return true

      /* Why do I need to have the fields that are being changed? Why not just use the rowStatus field to decide if the row has changed? Better Ux
        The c.vue uses event system  to send a list of fields that have changed to vl */

      const objFieldsComparisonResults = orm.fnCompareRows(
        this.vnOrmIdOfRowToChange,
        this.vnOrmIdOfCopiedRowBeingChanged
      )

      // informing view layer
      if (objFieldsComparisonResults === true) {
        this.$root.$emit('event-from-ct-name-cl-copied-row-same')
      } else {
        objFieldsComparisonResults.vnOrmIdOfCopiedRowBeingChanged = this.vnOrmIdOfCopiedRowBeingChanged
        this.$root.$emit('event-from-ct-name-cl-copied-row-diff', objFieldsComparisonResults)
      }

      // informing the current component
      if (objFieldsComparisonResults === true) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    vnOrmIdOfCopiedRowBeingChanged: {
      // setting this calls this watch when the Ct is first initialized
      immediate: true,
      /*
        In V1 this was part of mounted, that is sequential programming,
        in V2 this is part of watch, this is "act on state" programming.

        When called first time:
           pIdOfCopiedRowBeingChangedInOrmNewVal = null since data section sets that value
           pIdOfCopiedRowBeingChangedInOrmOldval is undefined

        When called second time:
           pIdOfCopiedRowBeingChangedInOrmNewVal = null since any other function that wants a new row being copied sets it to 0
           pIdOfCopiedRowBeingChangedInOrmOldval is the old value of pIdOfCopiedRowBeingChangedInOrmNewVal. Hence previous row that was being edited

      */

      async handler(pIdOfCopiedRowBeingChangedInOrmNewVal, pIdOfCopiedRowBeingChangedInOrmOldval) {
        console.log(
          'pIdOfCopiedRowBeingChangedInOrmNewVal, pIdOfCopiedRowBeingChangedInOrmOldval',
          pIdOfCopiedRowBeingChangedInOrmNewVal,
          pIdOfCopiedRowBeingChangedInOrmOldval
        )

        if (this.vnOrmIdOfRowToChange === null) return // race condition

        if (pIdOfCopiedRowBeingChangedInOrmNewVal === null) {
          /*
              When called first time this.vnOrmIdOfRowToChange is this.firstProp
              When called 2nd time this.vnOrmIdOfRowToChange is the previous row that just got saved.
          */
          const arFromOrm = orm.find(this.vnOrmIdOfRowToChange)
          console.log(arFromOrm, this.vnOrmIdOfRowToChange, orm)
          // For a given UUID there can be only 1 row in edit state.
          const vnExistingChangeRowId = orm.fnGetChangeRowIdInEditState(arFromOrm.uuid)
          if (vnExistingChangeRowId === false) {
            // Adding a new blank record. Since this is temporal DB
            // why is row copied and then edited/changed? See rem/cl/c.vue approx line 108
            this.vnOrmIdOfCopiedRowBeingChanged = await orm.fnCopyRow(arFromOrm.id)
          } else {
            this.vnOrmIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  async created() {
    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
    this.vnOrmIdOfRowToChange = 1
    this.vnOrmIdOfCopiedRowBeingChanged = null
    console.log('end of created function')
  },
  mounted() {
    this.$root.$on('event-from-ct-name-vl-save-this-row', (pRowID) => {
      this.vnOrmIdOfCopiedRowBeingChanged = pRowID
      this.mfOnSubmit()
    })
    this.$root.$on('event-from-ct-name-vl-reset-this-form', () => {
      this.mfOnResetForm()
    })
    console.log('end of mounted function')
  },
  methods: {
    async mfOnSubmit() {
      // Since only one valid row is possible there may be other discontinued rows
      const rowToUpsert = orm.find(this.vnOrmIdOfCopiedRowBeingChanged)
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
          where: this.vnOrmIdOfCopiedRowBeingChanged,
          data: {
            vnRowStateInSession: 34571,
          },
        })
        // After submitting the form since the form to edit is still there I need to create a copied row
        this.vnOrmIdOfRowToChange = this.vnOrmIdOfCopiedRowBeingChanged
        this.vnOrmIdOfCopiedRowBeingChanged = null // the "act on state" logic will get activate see watch vnOrmIdOfCopiedRowBeingChanged
      }
    },
    mfOnResetForm() {
      // Step 1/3: delete the row that was created as a copy
      orm.fnDeleteChangeRowsInEditState()

      // Step 2/3: Set vnOrmIdOfCopiedRowBeingChanged as 0 so that "act on state" code can take effect to create a copied row see watch vnOrmIdOfCopiedRowBeingChanged
      this.vnOrmIdOfCopiedRowBeingChanged = null

      // Step 3/3: the fields in the form have existing edited values the fields need to have non edited values
      orm.arOrmRowsCached = []
    },

    /* Template cannot directly call a ORM function. So first calling a method function
     and that calls the ORM function
     */
    mfGetFieldValue(pFieldName) {
      /*
        For each field this function is called twice.
        TODO: Why is this called twice for each field?
        console.log('When the Ct is first loaded let us see how many times if getField called');
      */
      // let us find out if there is an existing row that is already in change state
      const value = orm.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pFieldName) {
      const rowStatus = 34 // 3 is copy on client and 4 is changed on client
      orm.fnSetFieldValue(pEvent, this.vnOrmIdOfCopiedRowBeingChanged, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/fnPutFieldValueInCache
    },
  },
}
</script>
