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
  props: { firstProp: Number }, // if the name was changed 4 times earlier so the id will not be 1. Hence id needs to come as a prop from the Ct calling this Ct.
  data() {
    return {
      /*
       1. This row is not changed in the ORM. This row is the latest data where ROW_END is in future.
       2. Assigning the prop to a local variable since the value of vnOrmIdOfRowToChange will change everytime the user hits submit
          Ref: https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow
      */
      vnOrmIdOfRowToChange: this.firstProp,

      /*
        Why not change the original row?
          1. If the user hits reset I cannot go back to the data that the user started with.
          2. Server side is temporal DB where the origianl data row is not changed. Only ROW_START and ROW_END are changed.
      */
      vnOrmIdOfCopiedRowBeingChanged: null, // This row is one step ahead of vnOrmIdOfRowToChange
      /*
        isMounted: false,
        Commit ID 96f8655 there used to be a isMounted flag. But that is not needed since this Ct can only be invoked when data in orm has already been loaded
       */
    }
  },
  computed: {
    cfIsButtonDisabled() {
      /*
      Method 1: Problem -> what if user uses backspace to erase the extra charecters typed
      For this data (name) only 1 row can be valid at one time
          Since a row was copied hence:
            1. 2 rows are valid
            2. Both rows have same UUID
            3. rowStatus for 1st row ends in 1 and rowStaus for the copied row does not end in 1. When first copied the rowStatus is 3
          So this Fn will find that there are 2 Uuid that are valid.
          Both the rows that it finds will have the same Uuid.
          Out of the 2 rows with the same Uuid it will take the row that has a higher id and send that back.

          const fieldToUseToCheckIfEmpty = 'firstName'
          const arFromOrm = orm.getValidUniqueUuidNotEmptyRows(fieldToUseToCheckIfEmpty)
          if (arFromOrm.length === 0) return false
          const strOfNumber = arFromOrm[0].vnRowStateInSession.toString()
          const lastCharecter = strOfNumber.slice(-1)
          // Ref: For the different values of rowStatus see: cts/core/crud/forms.md
          if (lastCharecter === '4' || lastCharecter === '6') {
            // 4 => changed on client 6 => error on client side
            return false
          }
          return true
        },
            */

      if (this.vnOrmIdOfCopiedRowBeingChanged === null) return true // there is a race condition. This if statement waits for copy to finish

      // at first run this.vnOrmIdOfRowToChange is this.firstProp

      /* Problem:
          user does the following:
          1. Clicks on C beside Name and makes a change.
          2. Closes the open tab by clicking on cross.
          3. Clicks on C beside Name again.
          Now this.vnOrmIdOfRowToChange and this.vnOrmIdOfCopiedRowBeingChanged are = 2.

          How to solve this?
          In the view layer it should always display the row that is getting changed.

          Subsequent issue:
          When a field is changed how to show that in view layer?
          The event system needs to send a list of fields that have changed.
      */

      const objFieldsComparisonResults = orm.compareRows(
        this.vnOrmIdOfRowToChange,
        this.vnOrmIdOfCopiedRowBeingChanged
      )

      // informing view layer
      if (objFieldsComparisonResults === true) {
        this.$root.$emit('event-from-ct-name-copied-row-same')
      } else {
        objFieldsComparisonResults.vnOrmIdOfCopiedRowBeingChanged = this.vnOrmIdOfCopiedRowBeingChanged
        this.$root.$emit('event-from-ct-name-copied-row-diff', objFieldsComparisonResults)
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
        In V1 this was part of mounted, that is sequential programming
        in V2 this is part of watch, this is "act on state" programming.

        When called first time:
           pIdOfCopiedRowBeingChangedInOrmNewVal = null since data section sets that value
           pIdOfCopiedRowBeingChangedInOrmOldval is undefined

        When called second time:
           pIdOfCopiedRowBeingChangedInOrmNewVal = null since any other function that wants a new row being copied sets it to 0
           pIdOfCopiedRowBeingChangedInOrmOldval is the old value of pIdOfCopiedRowBeingChangedInOrmNewVal. Hence previous row that was being edited

      */

      async handler(pIdOfCopiedRowBeingChangedInOrmNewVal, pIdOfCopiedRowBeingChangedInOrmOldval) {
        if (pIdOfCopiedRowBeingChangedInOrmNewVal === null) {
          /*
              When called first time this.vnOrmIdOfRowToChange is this.firstProp
              When called 2nd time this.vnOrmIdOfRowToChange is the previous row that just got saved.
          */
          const arFromOrm = orm.find(this.vnOrmIdOfRowToChange)

          // For a given UUID there can be only 1 row in edit state.
          const vnExistingChangeRowId = orm.getChangeRowIdInEditState(arFromOrm.uuid)
          if (vnExistingChangeRowId === false) {
            // Adding a new blank record. Since this is temporal DB
            // why is row copied and then edited/changed? See rem/cl/c.vue approx line 108
            this.vnOrmIdOfCopiedRowBeingChanged = await orm.copyRow(arFromOrm.id)
          } else {
            this.vnOrmIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  /*
    This code is not needed since when I come here I am sure that the data is already inside ORM.
    async mounted() {
      if (orm.query().count() > 0) {
      } else {
        await this.mxGetDataFromDb()
      }
      this.isMounted = true
    },
  */
  mounted() {
    this.$root.$on('event-from-ct-name-vl-save-this-row', (pRowID) => {
      this.vnOrmIdOfCopiedRowBeingChanged = pRowID
      this.mfOnSubmit()
    })
    this.$root.$on('event-from-ct-name-vl-reset-this-form', (pRowID) => {
      this.mfOnResetForm()
    })
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
      orm.deleteChangeRowsInEditState()

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
        Why is this called twice for each field?
        console.log('When the Ct is first loaded let us see how many times if getField called');
      */
      // let us find out if there is an existing row that is already in change state
      const value = orm.getFieldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      return value
    },
    mfSetFieldValueUsingCache(pEvent, pFieldName) {
      /*
      For reason of this gate see comment for mfGetField in this file
      */
      const rowStatus = 34 // 3 is copy on client and 4 is changed on client
      orm.setFieldValue(pEvent, this.vnOrmIdOfCopiedRowBeingChanged, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
  },
}
</script>
