import clientTbl from '../db/client-side/structure/table.js'
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'

export default {
  mixins: [mxFullSyncWithDbServer],

  data() {
    return {
      /* Convention: -1 implies that the system is not ready to have a value. This happens when the DB is still getting loaded.
        null implies that system is ready for pClientIdOfCopiedRowBeingChangedNVal to have a value but does not have a value */

      /*  if the name was changed 4 times before this ct loaded the id will be 5. The id will always be latest data where ROW_END is in future and row status ends in 1
          I want doctor to be able to type: "change name" though this operates on a row there is only one row.
          When doctor types "change name" the id cannot be passed to this ct. This ct needs to find this id on its own. */
      dnClientIdOfRowToChange: -1,

      /* Why not change the original row? 1. If the user hits reset I cannot go back to the data that the user started with. 2. Server side is temporal DB where the origianl data row is not changed. Only ROW_START and ROW_END are changed. */
      dnClientIdOfCopiedRowBeingChanged: -1, // This row is one step ahead of dnClientIdOfRowToChange See Chapter 15 video
    }
  },
  computed: {
    // Goal: Find out which flds have changed and inform 1. the view layer 2. Reviewed and reset button of this Ct.
    cfHasSomeFldChanged() {
      // Following 2 protect against race condition. Since data needs to be loaded inside created function and then the row needs to get copied
      // When the Ct is created dnClientIdOfRowToChange and dnClientIdOfCopiedRowBeingChanged are -1 indicating they are undefined. They need to have a value before this code should execute
      if (this.dnClientIdOfCopiedRowBeingChanged === -1) return true
      if (this.dnClientIdOfCopiedRowBeingChanged === null) return true

      /* Why do I need to have the flds that are being changed? Why not just use the rowStatus fld to decide if the row has changed? Better Ux
        The c.vue uses event system  to send a list of flds that have changed to vl */

      const objFldsComparisonResults = clientTbl.fnIsDataFldsOfRowsSame(
        // return true if all data flds are same. Otherwise returns the array of flds that are diff
        this.dnClientIdOfRowToChange,
        this.dnClientIdOfCopiedRowBeingChanged
      )

      // informing all other Cts
      if (objFldsComparisonResults === true) {
        //        const eventName = 'event-from-ct-' + clientTbl.entity '-cl-copied-row-same'
        const eventName = ['event-from-ct', clientTbl.entity, 'cl-copied-row-same'].join('-')
        this.$root.$emit(eventName)
      } else {
        objFldsComparisonResults.dnClientIdOfCopiedRowBeingChanged = this.dnClientIdOfCopiedRowBeingChanged
        const eventName = ['event-from-ct', clientTbl.entity, 'cl-copied-row-diff'].join('-')
        this.$root.$emit(eventName, objFldsComparisonResults)
      }

      // informing the current component
      if (objFldsComparisonResults === true) {
        return true
      } else {
        return false
      }
    },
    cfTimeLineDataAr() {
      const timelineDataArray = []

      const arFromClientTblData = clientTbl.find(this.dnClientIdOfRowToChange)

      // TODO: timeline of UUID should be base class
      // Insight: to create timeline the uuid will be same but id will be different.
      const arFromClientTbl = clientTbl
        .query()
        .where('serverSideRowUuid', arFromClientTblData.serverSideRowUuid)
        .orderBy('ROW_START', 'desc')
        .get()
      console.log('Time line for uuid', arFromClientTbl)
      if (arFromClientTbl.length) {
        console.log('history array', arFromClientTbl)
        let rowInTimeLine = []
        let date = ''
        for (let i = 0; i < arFromClientTbl.length; i++) {
          rowInTimeLine = {}
          rowInTimeLine.pulseInBpm = arFromClientTbl[i].pulseInBpm
          date = new Date(arFromClientTbl[i].ROW_START)
          rowInTimeLine.createdAt =
            date.toLocaleString('default', { month: 'long' }) + '-' + date.getDate() + '-' + date.getFullYear()
          if (
            arFromClientTbl[i].vnRowStateInSession === 3 ||
            arFromClientTbl[i].vnRowStateInSession === 34 ||
            arFromClientTbl[i].vnRowStateInSession === 3456
          ) {
            rowInTimeLine.type = 'warning' // row is being edited and is not on server
          } else {
            rowInTimeLine.type = ''
          }
          rowInTimeLine.ROW_START = arFromClientTbl[i].ROW_START
          rowInTimeLine.vnRowStateInSession = arFromClientTbl[i].vnRowStateInSession

          timelineDataArray.push(rowInTimeLine)
        }
      }
      return timelineDataArray
    },
  },
  watch: {
    /* Goal: Create a copy of the row to be changed. If a copy is already there then find the id of the copied row.
    By the time this watchFn exits this.dnClientIdOfCopiedRowBeingChanged will have a valid value */
    dnClientIdOfCopiedRowBeingChanged: {
      immediate: true, // setting this calls this watch when the Ct is first initialized
      /*  In V1 this was part of mounted, that is sequential programming,
          In V2 this is part of watch, this is "act on state" programming.

          When called first time:
            pClientIdOfCopiedRowBeingChangedNVal = -1 since data section sets that value
            pClientIdOfCopiedRowBeingChangedOVal is undefined

          When called second time:
            pClientIdOfCopiedRowBeingChangedNVal = null since any other function that wants a new row being copied sets it to null
            pClientIdOfCopiedRowBeingChangedOVal is the old value of pClientIdOfCopiedRowBeingChangedNVal. Hence previous row that was being edited  */

      async handler(pClientIdOfCopiedRowBeingChangedNVal, pClientIdOfCopiedRowBeingChangedOVal) {
        // NVal => New value and OVal => Old Value
        if (this.dnClientIdOfRowToChange === -1) return // Data has not finished loading in the created()

        if (pClientIdOfCopiedRowBeingChangedNVal === null) {
          /* When called first time this.dnClientIdOfRowToChange is assigned in the created event function
              When called 2nd time this.dnClientIdOfRowToChange is the previous row that just got saved. */
          const arFromClientTbl = clientTbl.find(this.dnClientIdOfRowToChange)
          const vnExistingChangeRowId = clientTbl.fnGetChangeRowIdInEditState(arFromClientTbl.serverSideRowUuid) // For a given UUID there can be only 1 row in edit state.
          if (vnExistingChangeRowId === false) {
            // Adding a new blank record. Since this is temporal DB. Why is row copied and then edited/changed? See remcl/edit-design-1.vue approx line 108
            this.dnClientIdOfCopiedRowBeingChanged = await clientTbl.fnCopyRowAndGetCopiedRowId(
              arFromClientTbl.clientSideUniqRowId
            )
          } else {
            this.dnClientIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  // Goal: Load the data from DB
  async created() {
    // additional data initializations that don't depend on the DOM. DOM is only available inside mounted()
    if (clientTbl.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
    const arFromClientTbl = clientTbl.fnGetRowsToChange()
    this.dnClientIdOfRowToChange = arFromClientTbl[0].clientSideUniqRowId
    this.dnClientIdOfCopiedRowBeingChanged = null
    // this fn sometimes ends after the mounted fn.
  },
  // Goal: Set up event listeners so view layer can ask to submit data or reset form
  mounted() {
    // these events are sent from view layer when "S" or "R" buttons are clicked in the VL

    let eventName = ['event-from-ct', clientTbl.entity, 'vl-save-this-row'].join('-')
    // A sample event name is: 'event-from-ct-name-vl-save-this-row'
    this.$root.$on(eventName, (pRowId) => {
      this.dnClientIdOfCopiedRowBeingChanged = pRowId
      this.mfOnReviewed()
    })

    eventName = ['event-from-ct', clientTbl.entity, 'vl-reset-this-form'].join('-')
    this.$root.$on(eventName, () => {
      this.mfOnResetForm()
    })
  },
  methods: {
    async mfOnReviewed() {
      // Since only one valid row is possible there may be other deleted rows
      const rowToUpsert = clientTbl.find(this.dnClientIdOfCopiedRowBeingChanged)
      const response = await fetch(clientTbl.apiUrl + '/' + rowToUpsert.serverSideRowUuid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
          rowToUpsert,
        }),
      })
      if (response.status === 200) {
        // set ROW_END of row being changed
        await clientTbl.update({
          where: (record) => {
            return (
              record.serverSideRowUuid === rowToUpsert.serverSideRowUuid &&
              (record.vnRowStateInSession === 1 /* Came from DB */ ||
                record.vnRowStateInSession ===
                  34571 /* Created as copy on client -> Changed -> Requested save -> Send to server -> API Success */ ||
                record.vnRowStateInSession ===
                  24571) /* New -> Changed -> Requested save -> Send to server -> API Success */
            )
          },
          data: {
            ROW_END: Math.floor(Date.now()), // TODO: Should not divide by 1000
          },
        })
        /* Goal: Update the value of copied row to success or failure depending on the api response */
        clientTbl.update({
          where: this.dnClientIdOfCopiedRowBeingChanged,
          data: {
            vnRowStateInSession: 34571,
          },
        })
        // After submitting the form since the form to edit is still there I need to create a copied row
        this.dnClientIdOfRowToChange = this.dnClientIdOfCopiedRowBeingChanged
        this.dnClientIdOfCopiedRowBeingChanged = null // the "act on state" logic will get activate see watch dnClientIdOfCopiedRowBeingChanged
      }
    },
    mfOnResetForm() {
      // Step 1/3: delete the row that was created as a copy
      clientTbl.fnDeleteChangeRowsInEditState()

      // Step 2/3: Set dnClientIdOfCopiedRowBeingChanged as null so that "act on state" code can take effect to create a copied row see watch dnClientIdOfCopiedRowBeingChanged
      this.dnClientIdOfCopiedRowBeingChanged = null

      // Step 3/3: the flds in the form have existing edited values the flds need to have non edited values
      clientTbl.arOrmRowsCached = []
    },

    /* Template cannot directly call a ORM function. So first calling a method function and that calls the ORM function */
    mfGetCopiedRowBeingChangedFldVal(pFldName) {
      /*
        TODO: Why is this called twice for each fld?
        console.log('When the Ct is first loaded let us see how many times if getfld called');
      */
      // There will always be an existing row that is already in change state
      const value = clientTbl.fnGetFldValue(this.dnClientIdOfCopiedRowBeingChanged, pFldName)
      return value
    },
    mfSetCopiedRowBeingChangedFldVal(pEvent, pFldName) {
      const rowStatus = 34 // 3 is copy on client and 4 is changed on client
      clientTbl.fnSetFldValue(pEvent, this.dnClientIdOfCopiedRowBeingChanged, pFldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/framework/crud/manage-rows-of-table-in-client-side-orm.js:133/fnPutFldValueInCache
    },
  },
}
