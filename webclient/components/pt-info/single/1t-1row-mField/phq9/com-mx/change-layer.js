// Master doc is at reference implementation name/com-mx/change-layer.js. This file has doc unique to this ct
// Code synced with ref implementation on 18th august 2020
import objOrm from '../db/client-side/structure/table.js'
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

      const objFldsComparisonResults = objOrm.fnIsDataFldsOfRowsSame(
        this.vnOrmIdOfRowToChange,
        this.vnOrmIdOfCopiedRowBeingChanged
      )

      if (objFldsComparisonResults === true) {
        const eventName = ['event-from-ct', objOrm.entity, 'cl-copied-row-same'].join('-')
        this.$root.$emit(eventName)
      } else {
        objFldsComparisonResults.vnOrmIdOfCopiedRowBeingChanged = this.vnOrmIdOfCopiedRowBeingChanged
        const eventName = ['event-from-ct', objOrm.entity, 'cl-copied-row-diff'].join('-')
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
          const arOrmRowToChange = objOrm.find(this.vnOrmIdOfRowToChange)
          const vnExistingChangeRowId = objOrm.fnGetChangeRowIdInEditState(arOrmRowToChange.uuid)
          if (vnExistingChangeRowId === false) {
            this.vnOrmIdOfCopiedRowBeingChanged = await objOrm.fnCopyRow(arOrmRowToChange.id)
          } else {
            this.vnOrmIdOfCopiedRowBeingChanged = vnExistingChangeRowId
          }
        }
      },
    },
  },
  // Goal: Load the data from DB
  async created() {
    if (objOrm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    const arFromOrm = objOrm.fnGetRowsToChange()
    this.vnOrmIdOfRowToChange = arFromOrm[0].id
    this.vnOrmIdOfCopiedRowBeingChanged = null
  },
  mounted() {
    let eventName = ['event-from-ct', objOrm.entity, 'vl-save-this-row'].join('-')
    this.$root.$on(eventName, (pRowID) => {
      this.vnOrmIdOfCopiedRowBeingChanged = pRowID
      this.mfOnSubmit()
    })

    eventName = ['event-from-ct', objOrm.entity, 'vl-reset-this-form'].join('-')
    this.$root.$on(eventName, () => {
      this.mfOnResetForm()
    })
  },
  methods: {
    async mfOnSubmit() {
      const rowToUpsert = objOrm.find(this.vnOrmIdOfCopiedRowBeingChanged)
      const response = await fetch(objOrm.apiUrl + '/' + rowToUpsert.uuid, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
          uuid: rowToUpsert.uuid,

          littleInterestOrPleasureInDoingThings: rowToUpsert.littleInterestOrPleasureInDoingThings,
          feelingDownDepressedOrHopeless: rowToUpsert.feelingDownDepressedOrHopeless,
          troubleFallingOrStayingAsleep: rowToUpsert.troubleFallingOrStayingAsleep,
          feelingTiredOrHavingLittleEnergy: rowToUpsert.feelingTiredOrHavingLittleEnergy,
          poorAppetiteOrOvereating: rowToUpsert.poorAppetiteOrOvereating,
          feelingBadAboutYourself: rowToUpsert.feelingBadAboutYourself,
          troubleConcentratingOnThings: rowToUpsert.troubleConcentratingOnThings,
          movingOrSpeakingSoSlowly: rowToUpsert.movingOrSpeakingSoSlowly,
          thoughtsThatYouWouldBeBetterOffDead: rowToUpsert.thoughtsThatYouWouldBeBetterOffDead,
          ifYouCheckedOffAnyProblems: rowToUpsert.ifYouCheckedOffAnyProblems,
        }),
      })
      if (response.status === 200) {
        await objOrm.update({
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
        objOrm.update({
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
      objOrm.fnDeleteChangeRowsInEditState()
      this.vnOrmIdOfCopiedRowBeingChanged = null
      objOrm.arOrmRowsCached = []
    },
    mfGetCopiedRowBeingChangedFldVal(pFldName) {
      const value = objOrm.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFldName)
      return value
    },
    mfGetCopiedRowFldNumericValue(pFieldName) {
      const value = objOrm.fnGetFldValue(this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      console.log(value, this.vnOrmIdOfCopiedRowBeingChanged, pFieldName)
      return parseInt(value)
    },
    mfSetCopiedRowBeingChangedFldVal(pEvent, pFldName) {
      const rowStatus = 34
      objOrm.fnSetFldValue(pEvent, this.vnOrmIdOfCopiedRowBeingChanged, pFldName, rowStatus)
      this.$forceUpdate()
    },
  },
}
