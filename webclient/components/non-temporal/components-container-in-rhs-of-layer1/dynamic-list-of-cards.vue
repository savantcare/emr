<template>
  <div>
    <!-- this 10px is the distance between the card and all other 4 sides. -->
    <div style="display: grid; grid-template-columns: repeat(9, 1fr); width: 700px">
      <!-- Following el-card style is set to overflow visible and height 65px. This is because tooltip on appointment slider wasn't fully visible as el-card overflow property by default set to hidden. Also since slider is generating on the fly, it was causing malformation on mouse overing/tooltip. Hence overflow is visible and height set to 65px. -->
      <div style="grid-column: 1/4">
        <ctCorrelate />
      </div>
      <div style="grid-column: 4/7"><ctScBrainDialog /></div>
      <div style="grid-column: 7/9">Pt data timeline</div>
      <div style="grid-column: 9/9"><ctCoding /></div>
      <div style="grid-column: 10/10"><ctSettings></ctSettings></div>
    </div>
    <div>
      <h2>Assessment</h2>

      <ctPaperNoteStructure :_apptId="showNoteForApptId" _entity="diagnosis" />
      <ctPaperNoteStructure :_apptId="showNoteForApptId" _entity="screens" />
      <ctPaperNoteStructure :_apptId="showNoteForApptId" _entity="goals" />
      <h2>Plan</h2>

      <ctPaperNoteStructure :_apptId="showNoteForApptId" _entity="recommendations" />
      <ctPaperNoteStructure :_apptId="showNoteForApptId" _entity="reminders" />
      <ctPaperNoteStructure :_apptId="showNoteForApptId" _entity="plan_comments" />
      <ctPaperNoteStructure :_apptId="showNoteForApptId" _entity="service_statements" />
    </div>
  </div>
  <!--  <div style="margin: 10px"><vitals /></div> -->
</template>
<script>
import ctCorrelate from '@/components/non-temporal/correlate/design-2.vue'
import ctScBrainDialog from '@/components/non-temporal/appt-coding-v2/sc-brain-dialog.vue'

import ctCoding from '@/components/non-temporal/appt-coding-v2/dashboard.vue'
import ctSettings from '@/components/non-temporal/layer-1-left-side-header/settings-component.vue'

import ctPaperNoteStructure from '@/components/def-processors/view/router-for-full-note-time-series.vue'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'

export default {
  components: { ctCorrelate, ctCoding, ctScBrainDialog, ctSettings, ctPaperNoteStructure },
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
