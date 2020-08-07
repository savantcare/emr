<!-- Reference implementation 
Why copy the code to other components and not use mixin?
This is the structure and others are supposed to write their own custom code.
-->
<template>
  <div>
    <h5>Name</h5>
    <!-- Passing name of the field so mfTypeOfButton can decide if the field is changed or not -->
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
      v-if="daCopiedRowFldsThatAreDiff"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="daCopiedRowFldsThatAreDiff"
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
      /* This helps stopping race conditions. We do not want to run certain functions till the time data has finished loading.  */
      isMounted: false,
      /* This Ct has 3 fields. This helps deciding which field to show in orange color.
      Also helps deciding if submit and reset options should be shown */
      daCopiedRowFldsThatAreDiff: false,
    }
  },
  computed: {
    cfDataRow() {
      if (!this.isMounted) return ''
      // fnGetRowsToChange will return valid rows where the rowStatus field ends in 1
      const arFromOrm = orm.fnGetRowsToChange('firstName')
      if (arFromOrm.length) {
        // Goal: Pick up any changed fld value since need to show new value in the view layer with a orange color background.
        const rowtoReturn = arFromOrm[0]
        for (const k in this.daCopiedRowFldsThatAreDiff)
          rowtoReturn[k] = this.daCopiedRowFldsThatAreDiff[k]
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
    // Goal: Listen to events from change layer. These events will inform which fields should be in organe color
    this.$root.$on('event-from-ct-name-cl-copied-row-diff', (pFldsWithDiff) => {
      this.daCopiedRowFldsThatAreDiff = pFldsWithDiff
    })
    this.$root.$on('event-from-ct-name-cl-copied-row-same', () => {
      this.daCopiedRowFldsThatAreDiff = false
    })
    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
    /* Goal: Maybe change name was invoked before this and some fields are in change state. I want to find those fields.
      Why doing this in mounted function?
        Finding the diff fields only needs to happen when the Ct is loaded.
        Once loaded it will listen to change events and it will be informed by the change Ct
        that something has changed.
    
    */
    const arFromOrm = orm.fnGetRowsToChange('firstName')
    if (arFromOrm.length) {
      // Goal: Pick up any changed fld value since need to show new value in the view layer with a orange color background.
      const rowtoReturn = arFromOrm[0]
      const vnOrmIdOfCopiedRowBeingChanged = orm.fnGetChangeRowIdInEditState(rowtoReturn.uuid)
      if (vnOrmIdOfCopiedRowBeingChanged === false) {
      } else {
        this.daCopiedRowFldsThatAreDiff = orm.fnIsDataFieldsOfRowSame(
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
      if (!this.daCopiedRowFldsThatAreDiff) return 'default'

      if (pFldName in this.daCopiedRowFldsThatAreDiff) {
        return 'warning'
      }
      return 'default'
    },
    mfSendSubmitEvent() {
      // TODO: Why do I need to send the row ID since there can only be 1 possibility ?
      this.$root.$emit(
        'event-from-ct-name-vl-save-this-row',
        this.daCopiedRowFldsThatAreDiff.vnOrmIdOfCopiedRowBeingChanged
      )
    },
    mfSendResetFormEvent() {
      this.$root.$emit('event-from-ct-name-vl-reset-this-form')
    },
  },
}
</script>
