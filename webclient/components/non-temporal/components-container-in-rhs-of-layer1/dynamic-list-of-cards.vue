<template>
  <div>
    <!-- this 10px is the distance between the card and all other 4 sides. -->
    <div style="display: grid; grid-template-columns: repeat(9, 1fr); width: 700px">
      <!-- Following el-card style is set to overflow visible and height 65px. This is because tooltip on appointment slider wasn't fully visible as el-card overflow property by default set to hidden. Also since slider is generating on the fly, it was causing malformation on mouse overing/tooltip. Hence overflow is visible and height set to 65px. -->
      <div style="grid-column: 1/4">
        <ctCorrelate />
      </div>
      <div style="grid-column: 4/6"><ctScBrainDialog /></div>
      <div style="grid-column: 6/8"><el-button size="mini" mini round type="primary">Pt data timeline</el-button></div>
      <div style="grid-column: 8/9"><ctCoding /></div>
      <div style="grid-column: 9/10"><ctSettings></ctSettings></div>
    </div>
    <div>
      <apptNote _side="right" />
    </div>
  </div>
</template>
<script>
import ctCorrelate from '@/components/papers/correlate/design-2.vue'
import ctScBrainDialog from '@/components/papers/appt-coding/sc-brain-dialog.vue'

import ctCoding from '@/components/papers/appt-coding/dashboard.vue'
import ctSettings from '@/components/papers/view/left-side-header/settings-component.vue'

import ctPaperNoteStructure from '@/components/def-processors/view/router-for-full-note-time-series.vue'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'

import apptNote from '@/components/papers/view/step1-decide-notes-to-show-and-their-appt-id.vue'

export default {
  components: { ctCorrelate, ctCoding, ctScBrainDialog, ctSettings, ctPaperNoteStructure, apptNote },
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
