<!-- Reference implementation 
Why copy the code to other components and not use mixin?
This is the structure and others are supposed to write their own custom code.
-->
<template>
  <div>
    <h5>Name</h5>
    <!-- Passing name of the fld so mfTypeOfButton can decide if the fld is changed or not -->
    <el-button
      :type="mfTypeOfButton('firstName')"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      >{{ cfDataRow['firstName'] }}</el-button
    >
    <el-button :type="mfTypeOfButton('middleName')" plain>{{ cfDataRow['middleName'] }}</el-button>
    <el-button :type="mfTypeOfButton('lastName')" plain>{{ cfDataRow['lastName'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfDataRow['id'])"
      >C</el-button
    >
    <el-button
      v-if="daIsDataFldsOfRowsSame !== true"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="daIsDataFldsOfRowsSame !== true"
      type="danger"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendResetFormEvent()"
      >R</el-button
    >
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm.js'
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
      daIsDataFldsOfRowsSame: true,
    }
  },
  computed: {
    cfDataRow() {
      if (!this.isMounted) return ''
      // fnGetNonEmptyRowsToChange will return valid rows where the rowStatus fld ends in 1
      const arFromOrm = orm.fnGetNonEmptyRowsToChange('firstName')
      if (arFromOrm.length) {
        // Goal: Pick up any changed fld value since need to show new value in the view layer with a orange color background.
        const rowtoReturn = arFromOrm[0]
        for (const k in this.daIsDataFldsOfRowsSame) rowtoReturn[k] = this.daIsDataFldsOfRowsSame[k]
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
      So the first card on ptsVl will get tabIndex as 1
      So the 2nd card on ptsVl will get tabIndex as 101
      So when the user presses tab
        first Card 1 will focus
        2nd the card 2 will focus
      */
    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arOfCardsInPtsOfVl = this.$store.state.vstObjCardsInPtsOfVl.arOfCardsInPtsOfVl
      const obj = arOfCardsInPtsOfVl.find((x) => x.label === 'name')
      const idx = arOfCardsInPtsOfVl.indexOf(obj)
      return idx
    },
  },
  async mounted() {
    // Goal: Listen to events from change layer. These events will inform which flds should be in organe color
    let eventName = ['event-from-ct', orm.entity, 'cl-copied-row-diff'].join('-')

    this.$root.$on(eventName, (pFldsWithDiff) => {
      this.daIsDataFldsOfRowsSame = pFldsWithDiff
    })

    eventName = ['event-from-ct', orm.entity, 'cl-copied-row-same'].join('-')
    this.$root.$on(eventName, () => {
      this.daIsDataFldsOfRowsSame = true
    })

    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
    /* Goal: Maybe change name was invoked before this and some flds are in change state. I want to find those flds.
      Why doing this in mounted function?
        Finding the diff flds only needs to happen when the Ct is loaded.
        Once loaded it will listen to change events and it will be informed by the change Ct
        that something has changed.
    
    */
    const arFromOrm = orm.fnGetNonEmptyRowsToChange('firstName')
    if (arFromOrm.length) {
      // Goal: Pick up any changed fld value since need to show new value in the view layer with a orange color background.
      const rowtoReturn = arFromOrm[0]
      const vnOrmIdOfCopiedRowBeingChanged = orm.fnGetChangeRowIdInEditState(rowtoReturn.uuid)
      if (vnOrmIdOfCopiedRowBeingChanged === false) {
      } else {
        this.daIsDataFldsOfRowsSame = orm.fnIsDataFldsOfRowsSame(
          // this fn returns true if data flds are same. Otherwise it returns the array of fields that are different along with the value of the field
          rowtoReturn.id,
          vnOrmIdOfCopiedRowBeingChanged
        )
      }
      this.isMounted = true
    }
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'name - change',
      })
    },
    mfTypeOfButton(pFldName) {
      if (this.daIsDataFldsOfRowsSame === true) return 'default'

      if (pFldName in this.daIsDataFldsOfRowsSame) {
        return 'warning'
      }
      return 'default'
    },
    mfSendSubmitEvent() {
      // TODO: Why do I need to send the row ID since there can only be 1 possibility ?
      const eventName = ['event-from-ct', orm.entity, 'vl-save-this-row'].join('-')
      this.$root.$emit(eventName, this.daIsDataFldsOfRowsSame.vnOrmIdOfCopiedRowBeingChanged)
    },
    mfSendResetFormEvent() {
      const eventName = ['event-from-ct', orm.entity, 'vl-reset-this-form'].join('-')
      this.$root.$emit(eventName)
    },
  },
}
</script>
