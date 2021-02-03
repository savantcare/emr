<template>
  <div>
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); width: 700px">
      <div><ctCorrelate /></div>
      <div><ctScBrainDialog /></div>
      <div><el-button size="mini" round type="primary">Pt data timeline</el-button></div>
      <div><ctCoding /></div>
      <div style="vertical-align: top">
        <!-- 
          Data properties that start with _ or $ will not be proxied on the Vue instance 
          because they may conflict with Vue’s internal properties and API methods.

          Ref: https://vuejs.org/v2/api/#data
        -->
        <lockButtonPrintSection :_apptId="showNoteForApptId"></lockButtonPrintSection>
      </div>
      <div><ctSettings></ctSettings></div>
    </div>
    <div><apptNote _side="right" /></div>
  </div>
</template>
<script>
import ctCorrelate from '@/components/papers/correlate/design-2.vue'
import ctScBrainDialog from '@/components/papers/appt-coding/sc-brain-dialog.vue'

import ctCoding from '@/components/papers/appt-coding/dashboard.vue'
import ctSettings from '@/components/papers/view-appt-note/rhs-split-area/header/settings.vue'

import clientTblOfAppointments from '@/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'
import apptNote from '@/components/papers/view-appt-note/templates/seq1-decide-comparison-or-single-note-and-their-appt-id.vue'

import lockButtonPrintSection from './header/allow-note-lock-button.vue'

export default {
  components: {
    ctCorrelate,
    ctCoding,
    ctScBrainDialog,
    ctSettings,
    apptNote,
    lockButtonPrintSection,
  },
  data() {
    return {
      showNoteForApptId: 0,
    }
  },
  watch: {
    /**
     * Why we use watcher on computed function?
     * -- In line number - 15, need to send unlocked note appointment ID as _apptId props in lockButtonPrintSection component.
     * And In section-19-allow-note-lock.vue page props _apptId accepts only number
     * Hence, I have define a data variable named 'showNoteForApptId' and using computed and watch overwrite that variable
     */
    cf_get_unlocked_note_appt_id: {
      immediate: true,
      handler(pVal) {
        this.showNoteForApptId = pVal
      },
    },
  },
  computed: {
    async cf_get_unlocked_note_appt_id() {
      const apptObj = await clientTblOfAppointments
        .query()
        .where('apptStatus', 'unlocked')
        .orderBy('clientSideUniqRowId', 'desc')
        .get()

      if (apptObj.length === 0) return

      this.showNoteForApptId = apptObj[0]['clientSideUniqRowId']
      return this.showNoteForApptId
    },
  },
}
</script>
