<!-- Master doc is at reference implementation name/vl/table.vue. This file has doc unique to this ct
Code synced with ref implementation on 7th august 2020
-->
<template>
  <div>
    <h5>PHQ9</h5>
    <!--
      Q) Why we are using the vaPhq9QuestionFields variable data from  mixins component at line 56

      Ans) the vaPhq9QuestionFields is is required for both VL and CL components. 
      Due to this we fetched data from mixins component.
      Fetched all the fields with v-for lop and displayed in the template.
     -->
    <span v-for="(question, index) in vaPhq9QuestionFields" :key="index">
      <el-button
        :type="mfTypeOfButton(question.name)"
        plain
        :tabindex="index !== 9 ? cfPosInArCardsInPtsOfVl * 100 + 1 : null"
        >{{ cfDataRow[question.name] }}</el-button
      >
    </span>

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
      v-if="feCopiedRowFldsThatAreDiff"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="feCopiedRowFldsThatAreDiff"
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
import orm from '../db/orm-phq9.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
      feCopiedRowFldsThatAreDiff: false,
    }
  },
  computed: {
    cfDataRow() {
      if (!this.isMounted) return ''
      const arFromOrm = orm.fnGetRowsToChange('littleInterestOrPleasureInDoingThings')
      if (arFromOrm.length) {
        const rowtoReturn = arFromOrm[0]
        for (const k in this.feCopiedRowFldsThatAreDiff)
          rowtoReturn[k] = this.feCopiedRowFldsThatAreDiff[k]
        return rowtoReturn
      } else {
        return ''
      }
    },

    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arOfCardsInPtsOfVl = this.$store.state.vstObjCardsInPtsOfVl.arOfCardsInPtsOfVl
      const obj = arOfCardsInPtsOfVl.find((x) => x.label === 'phq9')
      const idx = arOfCardsInPtsOfVl.indexOf(obj)
      return idx
    },
  },
  async mounted() {
    this.$root.$on('event-from-ct-phq9-cl-copied-row-diff', (pFldsWithDiff) => {
      this.feCopiedRowFldsThatAreDiff = pFldsWithDiff
    })
    this.$root.$on('event-from-ct-phq9-cl-copied-row-same', () => {
      this.feCopiedRowFldsThatAreDiff = false
    })

    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    this.isMounted = true
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'phq9 - change',
      })
    },
    mfTypeOfButton(pFldName) {
      if (!this.feCopiedRowFldsThatAreDiff) return 'default'

      if (pFldName in this.feCopiedRowFldsThatAreDiff) {
        return 'warning'
      }
      return 'default'
    },
    mfSendSubmitEvent() {
      this.$root.$emit(
        'event-from-ct-phq9-vl-save-this-row',
        this.feCopiedRowFldsThatAreDiff.vnOrmIdOfCopiedRowBeingChanged
      )
    },
    mfSendResetFormEvent() {
      this.$root.$emit('event-from-ct-phq9-vl-reset-this-form')
    },
  },
}
</script>
