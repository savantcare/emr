// Master doc is at reference implementation name/com-mx/view-layer.js. This file has doc unique to this ct
// Code synced with ref implementation on 18th august 2020

import moment from 'moment'

import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import clientSideTable from '../db/client-side/structure/table.js'
import clientSideTblOfRightSideCards from '~/components/core/manage-pts-view-layer-cards/db/client-side/structure/pts-table.js'

export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
      dataFldsOfToChangeAndCopiedRowsAreSame: true,
    }
  },
  computed: {
    cfLatestDataRowFromClientSideTable() {
      if (!this.isMounted) return ''
      const arFromClientSideTable = clientSideTable.fnGetRowsToChange()
      if (arFromClientSideTable.length) {
        const rowtoReturn = arFromClientSideTable[0]
        for (const k in this.dataFldsOfToChangeAndCopiedRowsAreSame)
          rowtoReturn[k] = this.dataFldsOfToChangeAndCopiedRowsAreSame[k]
        return rowtoReturn
      } else {
        return ''
      }
    },
    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arFromClientSideTable = clientSideTblOfRightSideCards
        .query()
        .where('name', 'reminders')
        .get()
      return arFromClientSideTable['clientSideUniqRowId']
    },
    cfTimeOfMeasurement() {
      return moment(this.cfLatestDataRowFromClientSideTable.timeOfMeasurementInMilliseconds).format(
        'MMM YYYY'
      ) // parse integer
    },
  },
  async mounted() {
    let eventName = ['event-from-ct', clientSideTable.entity, 'cl-copied-row-diff'].join('-')

    this.$root.$on(eventName, (pFldsWithDiff) => {
      this.dataFldsOfToChangeAndCopiedRowsAreSame = pFldsWithDiff
    })

    eventName = ['event-from-ct', clientSideTable.entity, 'cl-copied-row-same'].join('-')
    this.$root.$on(eventName, () => {
      this.dataFldsOfToChangeAndCopiedRowsAreSame = true
    })

    if (clientSideTable.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    const arFromClientSideTable = clientSideTable.fnGetRowsToChange()
    if (arFromClientSideTable.length) {
      const rowtoReturn = arFromClientSideTable[0]
      const vnClientSideIdOfCopiedRowBeingChanged = clientSideTable.fnGetChangeRowIdInEditState(
        rowtoReturn.serverSideRowUuid
      )
      if (vnClientSideIdOfCopiedRowBeingChanged === false) {
      } else {
        this.dataFldsOfToChangeAndCopiedRowsAreSame = clientSideTable.fnIsDataFldsOfRowsSame(
          rowtoReturn.clientSideUniqRowId,
          vnClientSideIdOfCopiedRowBeingChanged
        )
      }
      this.isMounted = true
    }
  },
  methods: {
    mfOpenEditCtInEditLayer(pClientSideId) {
      console.log(pClientSideId)
      const searchString = [clientSideTable.entity, 'change'].join(' - ')
      console.log(searchString)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: searchString,
      })
    },
    mfTypeOfButton(pFldName) {
      if (this.dataFldsOfToChangeAndCopiedRowsAreSame === true) return 'default'

      if (pFldName in this.dataFldsOfToChangeAndCopiedRowsAreSame) {
        return 'warning'
      }
      return 'default'
    },
    mfSendReviewedEvent() {
      const eventName = ['event-from-ct', clientSideTable.entity, 'vl-save-this-row'].join('-')
      this.$root.$emit(
        eventName,
        this.dataFldsOfToChangeAndCopiedRowsAreSame.vnClientSideIdOfCopiedRowBeingChanged
      )
    },
    mfSendResetFormEvent() {
      const eventName = ['event-from-ct', clientSideTable.entity, 'vl-reset-this-form'].join('-')
      this.$root.$emit(eventName)
    },
  },
}
