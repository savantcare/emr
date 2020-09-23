// Master doc is at reference implementation name/com-mx/change-layer.js. This file has doc unique to this ct
// Code synced with ref implementation on 23rd sept 2020
import clientSideTable from '../db/client-side/structure/table.js'
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'

export default {
  mixins: [mxFullSyncWithDbServer],

  data() {
    return {
      vnOrmIdOfRowToChange: -1,
      vnOrmIdOfCopiedRowBeingChanged: -1,
    }
  },
  computed: {
    cfHasSomeFldChanged() {
      if (this.vnOrmIdOfCopiedRowBeingChanged === -1) return true
      if (this.vnOrmIdOfCopiedRowBeingChanged === null) return true

      const objFldsComparisonResults = clientSideTable.fnIsDataFldsOfRowsSame(
        this.vnOrmIdOfRowToChange,
        this.vnOrmIdOfCopiedRowBeingChanged
      )

      if (objFldsComparisonResults === true) {
        const eventName = ['event-from-ct', clientSideTable.entity, 'cl-copied-row-same'].join('-')
        this.$root.$emit(eventName)
      } else {
        objFldsComparisonResults.vnOrmIdOfCopiedRowBeingChanged = this.vnOrmIdOfCopiedRowBeingChanged
        const eventName = ['event-from-ct', clientSideTable.entity, 'cl-copied-row-diff'].join('-')
        this.$root.$emit(eventName, objFldsComparisonResults)
      }

      if (objFldsComparisonResults === true) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    vnOrmIdOfCopiedRowBeingChanged: {
      async handler(pOrmIdOfCopiedRowBeingChangedNVal, pOrmIdOfCopiedRowBeingChangedOVal) {
        if (this.vnOrmIdOfRowToChange === -1) return

        if (pOrmIdOfCopiedRowBeingChangedNVal === null) {
          const arOrmRowToChange = clientSideTable.find(this.vnOrmIdOfRowToChange)
          const vnExistingChangeRowId = clientSideTable.fnGetChangeRowIdInEditState(arOrmRowToChange.uuid)
          if (vnExistingChangeRowId === false) {
            this.vnOrmIdOfCopiedRowBeingChanged = await clientSideTable.fnCopyRow(arOrmRowToChange.clientSideUniqRowId)
          } else {
            this.vnOrmIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  // Goal: Load the data from DB
  async created() {
    if (clientSideTable.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    const arFromClientSideTable = clientSideTable.fnGetRowsToChange()
    this.vnOrmIdOfRowToChange = arFromClientSideTable[0].clientSideUniqRowId
    this.vnOrmIdOfCopiedRowBeingChanged = null
  },
  mounted() {
    let eventName = ['event-from-ct', clientSideTable.entity, 'vl-save-this-row'].join('-')
    this.$root.$on(eventName, (pRowID) => {
      this.vnOrmIdOfCopiedRowBeingChanged = pRowID
      this.mfOnSubmit()
    })

    eventName = ['event-from-ct', clientSideTable.entity, 'vl-reset-this-form'].join('-')
    this.$root.$on(eventName, () => {
      this.mfOnResetForm()
    })
  },
  methods: {
    async mfOnSubmit() {
      const rowToUpsert = clientSideTable.find(this.vnOrmIdOfCopiedRowBeingChanged)
      const patientUUID = 'bfe041fa-073b-4223-8c69-0540ee678ff8' // sample patient UUID
      const response = await fetch(clientSideTable.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          ptUUID: patientUUID,
          data: {
            ptUUID: rowToUpsert.uuid,
            question1: rowToUpsert.littleInterestOrPleasureInDoingThings,
            question2: rowToUpsert.feelingDownDepressedOrHopeless,
            question3: rowToUpsert.troubleFallingOrStayingAsleep,
            question4: rowToUpsert.feelingTiredOrHavingLittleEnergy,
            question5: rowToUpsert.poorAppetiteOrOvereating,
            question6: rowToUpsert.feelingBadAboutYourself,
            question7: rowToUpsert.troubleConcentratingOnThings,
            question8: rowToUpsert.movingOrSpeakingSoSlowly,
            question9: rowToUpsert.thoughtsThatYouWouldBeBetterOffDead,
            question10: rowToUpsert.ifYouCheckedOffAnyProblems,
            recordChangedByUUID: patientUUID,
            recordChangedFromIPAddress: '',
          },
        }),
      })
      if (response.status === 200) {
        await clientSideTable.update({
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
        clientSideTable.update({
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
      clientSideTable.fnDeleteChangeRowsInEditState()
      this.vnOrmIdOfCopiedRowBeingChanged = null
      clientSideTable.arOrmRowsCached = []
    },
    mfGetCopiedRowBeingChangedFldVal(pFldName) {
      const value = clientSideTable.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFldName)
      return value
    },
    mfGetCopiedRowFldNumericValue(pFieldName) {
      const value = clientSideTable.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      console.log(value, this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      return parseInt(value)
    },
    mfSetCopiedRowBeingChangedFldVal(pEvent, pFldName) {
      const rowStatus = 34
      clientSideTable.fnSetFldValue(
        pEvent,
        this.vnOrmIdOfCopiedRowBeingChanged,
        pFldName,
        rowStatus
      )
      this.$forceUpdate()
    },
  },
}
