/* 
Goal:
When this mixin is used by height and weight component the import statement has to be:
1. import mxFullSyncWithDbServer from '../name/db/full-sync-with-db-server-mixin'
2. import mxFullSyncWithDbServer from '../weight/db/full-sync-with-db-server-mixin'

So I need to figure out how to do:
import mxFullSyncWithDbServer from '../' + ctName + 'weight/db/full-sync-with-db-server-mixin'

Known:
1. import statment does not work with variables but require statement works with variables.
2. The following statement works:
const mxFullSyncWithDbServer = require('@/components/1time-eachField-1value/' + 
            this.ctName + 
            '/db/full-sync-with-db-server-mixin').default, 
            // does not give compilation error but at run time the value this.ctName is not available. 
3. parameters can be sent when doing a require.
*/

import moment from 'moment'

import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import clientTbl from '../db/client-side/structure/table.js'
import clientSideTblOfRightSideCards from '~/components/non-temporal/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'

export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      /* This helps stopping race conditions. We do not want to run certain functions till the time data has finished loading.  
          JS is single threaded. But still a function B called After function A can execute before function A ends.
          Ref: https://www.youtube.com/watch?v=8aGhZQkoFbQ
      */
      isMounted: false,
      /* This Ct has 3 flds. This helps deciding which fld to show in orange color.
      Also helps deciding if submit and reset options should be shown */
      dataFldsOfToChangeAndCopiedRowsAreSame: true,
    }
  },
  computed: {
    cfLatestDataRowFromClientTbl() {
      if (!this.isMounted) return ''
      // fnGetRowsToChange will return valid rows where the rowStatus fld ends in 1
      const arFromClientTbl = clientTbl.fnGetRowsToChange()
      if (arFromClientTbl.length) {
        // Goal: Pick up any changed fld value since need to show new value in the view layer with a orange color background.
        const rowtoReturn = arFromClientTbl[0]
        for (const k in this.dataFldsOfToChangeAndCopiedRowsAreSame)
          rowtoReturn[k] = this.dataFldsOfToChangeAndCopiedRowsAreSame[k]
        // return to the template.
        return rowtoReturn
      } else {
        return ''
      }
    },
    /*
      This is required for tab indexing
      if this card is in pos 0 then tab index is set as 1
      if this card is in pos 1 then tab index is set as 101
      So the first card on PresentTimeStateViewLayer will get tabIndex as 1
      So the 2nd card on PresentTimeStateViewLayer will get tabIndex as 101
      So when the user presses tab
        first Card 1 will focus
        2nd the card 2 will focus
      */
    cfPosInArCardsInPtsOfViewLayer() {
      const arFromClientTbl = clientSideTblOfRightSideCards.query().where('name', 'reminders').get()
      return arFromClientTbl['clientSideUniqRowId']
    },
    cfTimeOfMeasurement() {
      return moment(this.cfLatestDataRowFromClientTbl.timeOfMeasurementInMilliseconds).format('MMM YYYY') // parse integer
    },
  },
  async mounted() {
    // Goal: Listen to events from change layer. These events will inform which flds should be in organe color
    let eventName = ['event-from-ct', clientTbl.entity, 'cl-copied-row-diff'].join('-')

    this.$root.$on(eventName, (pFldsWithDiff) => {
      this.dataFldsOfToChangeAndCopiedRowsAreSame = pFldsWithDiff
    })

    eventName = ['event-from-ct', clientTbl.entity, 'cl-copied-row-same'].join('-')
    this.$root.$on(eventName, () => {
      this.dataFldsOfToChangeAndCopiedRowsAreSame = true
    })

    if (clientTbl.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
    /* Goal: Maybe change name was invoked before this and some flds are in change state. I want to find those flds.
      Why doing this in mounted function?
        Finding the diff flds only needs to happen when the Ct is loaded.
        Once loaded it will listen to change events and it will be informed by the change Ct
        that something has changed.
    
    */
    const arFromClientTbl = clientTbl.fnGetRowsToChange()
    if (arFromClientTbl.length) {
      // Goal: Pick up any changed fld value since need to show new value in the view layer with a orange color background.
      const rowtoReturn = arFromClientTbl[0]
      const dnClientSideIdOfCopiedRowBeingChanged = clientTbl.fnGetChangeRowIdInEditState(rowtoReturn.serverSideRowUuid)
      if (dnClientSideIdOfCopiedRowBeingChanged === false) {
      } else {
        this.dataFldsOfToChangeAndCopiedRowsAreSame = clientTbl.fnIsDataFldsOfRowsSame(
          // this fn returns true if data flds are same. Otherwise it returns the array of fields that are different along with the value of the field
          rowtoReturn.clientSideUniqRowId,
          dnClientSideIdOfCopiedRowBeingChanged
        )
      }
      this.isMounted = true
    }
  },
  methods: {
    mfOpenEditCtInEditLayer(pClientSideId, pCtToInvoke) {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: pCtToInvoke,
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
      // TODO: Why do I need to send the row ID since there can only be 1 possibility ?
      const eventName = ['event-from-ct', clientTbl.entity, 'vl-save-this-row'].join('-')
      this.$root.$emit(eventName, this.dataFldsOfToChangeAndCopiedRowsAreSame.dnClientSideIdOfCopiedRowBeingChanged)
    },
    mfSendResetFormEvent() {
      const eventName = ['event-from-ct', clientTbl.entity, 'vl-reset-this-form'].join('-')
      this.$root.$emit(eventName)
    },
  },
}
