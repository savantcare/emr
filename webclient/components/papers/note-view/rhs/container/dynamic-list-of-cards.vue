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
import ctSettings from '@/components/papers/note-view/lhs/header/settings-component.vue'

import ctPaperNoteStructure from '@/components/papers/note-view/router-for-full-note-time-series.vue'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'

import apptNote from '@/components/papers/note-view/step1-decide-notes-to-show-and-their-appt-id.vue'

import lockButtonPrintSection from '../../section-19-allow-note-lock.vue'

export default {
  components: {
    ctCorrelate,
    ctCoding,
    ctScBrainDialog,
    ctSettings,
    ctPaperNoteStructure,
    apptNote,
    lockButtonPrintSection,
  },
  computed: {
    dshowNoteForApptId() {
      /*
      const apptObj = clientTblOfAppointments
        .query()
        .where('apptStatus', 'locked')
        .orWhere('apptStatus', 'unlocked')
        .orderBy('clientSideUniqRowId', 'desc')
        .get()

      console.log(apptObj)

      if (apptObj.length === 0) return
      console.log(apptObj)
      this.showNoteForApptId = apptObj[0]['clientSideUniqRowId']
      return this.showNoteForApptId
      */
    },
  },
  data() {
    return {
      showNoteForApptId: 5,
    }
  },
  computed: {},
}
</script>
