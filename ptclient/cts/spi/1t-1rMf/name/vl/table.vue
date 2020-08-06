<!-- Reference implementation -->
<template>
  <div>
    <h5>Name</h5>
    <!-- Passing name of the field so mfTypeOfButton can decide if the field is changed or not -->
    <el-button
      :type="mfTypeOfButton('firstName')"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      >{{ cfName['firstName'] }}</el-button
    >
    <el-button :type="mfTypeOfButton('middleName')" plain>{{ cfName['middleName'] }}</el-button>
    <el-button :type="mfTypeOfButton('lastName')" plain>{{ cfName['lastName'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfName['id'])"
      >C</el-button
    >
    <el-button
      v-if="feFldsInCopiedRowThatAreDiff"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="feFldsInCopiedRowThatAreDiff"
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
      /* This helps stopping race conditions. We do not want to run certain functions till the time data has finished loaging.  */
      isMounted: false,
      /* This Ct has 3 fields. This helps deciding which field to show in orange color. 
      Also helps deciding if submit and reset options should be shown 
      The name begins with fe to indicate it comes from a event */
      feFldsInCopiedRowThatAreDiff: false,
    }
  },
  computed: {
    cfName() {
      if (!this.isMounted) return ''
      // fnGetRowsToChange will return valid rows where the rowStatus field ends in 1
      const arFromOrm = orm.fnGetRowsToChange('firstName')
      if (arFromOrm.length) {
        // Goal: Pick up any changed fld value since need to show new value in the view layer with a organe color background.
        const rowtoReturn = arFromOrm[0]
        for (const k in this.feFldsInCopiedRowThatAreDiff)
          rowtoReturn[k] = this.feFldsInCopiedRowThatAreDiff[k]
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
      const arCardsInCsOfVl = this.$store.state.vstObjCardsInCsOfVl.arCardsInCsOfVl
      const obj = arCardsInCsOfVl.find((x) => x.label === 'name')
      const idx = arCardsInCsOfVl.indexOf(obj)
      return idx
    },
  },
  async mounted() {
    this.$root.$on('event-from-ct-name-cl-copied-row-diff', (pFieldsWithDiff) => {
      this.feFldsInCopiedRowThatAreDiff = pFieldsWithDiff
    })
    this.$root.$on('event-from-ct-name-cl-copied-row-same', () => {
      this.feFldsInCopiedRowThatAreDiff = false
    })

    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb() // mixin fns are copied into the ct where the mixin is used.
    }
    this.isMounted = true
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      // TODO: Why do I need to send the row ID since there can only be 1 possibility ?
      const payload = { searchTerm: 'name - change', pPropsToGiveToCt: pOrmId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
    mfTypeOfButton(pFieldName) {
      if (!this.feFldsInCopiedRowThatAreDiff) return 'default'

      if (pFieldName in this.feFldsInCopiedRowThatAreDiff) {
        return 'warning'
      }
      return 'default'
    },
    mfSendSubmitEvent() {
      // TODO: Why do I need to send the row ID since there can only be 1 possibility ?
      this.$root.$emit(
        'event-from-ct-name-vl-save-this-row',
        this.feFldsInCopiedRowThatAreDiff.vnOrmIdOfCopiedRowBeingChanged
      )
    },
    mfSendResetFormEvent() {
      this.$root.$emit('event-from-ct-name-vl-reset-this-form')
    },
  },
}
</script>
