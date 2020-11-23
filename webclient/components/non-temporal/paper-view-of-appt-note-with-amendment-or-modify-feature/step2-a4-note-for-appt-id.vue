<template>
  <div class="A4">
    <div v-if="_side === 'left' || _side === 'full'">
      <headerPaperNote :_apptId="_showNoteForApptId"></headerPaperNote>
      <b>Appt Date:</b>

      {{ patientCurrentApptObj['apptStartMilliSecsOnCalendar'] | moment }}
      <agePaperNote :_apptId="_showNoteForApptId"></agePaperNote>

      <!-- Goal: If appt is not locked then do not show "Appt Lock date" -->
      <div v-if="patientCurrentApptObj['apptStatus'] === 'locked'">
        <b>Appt locked:</b>
        {{ cfApptLockDateInHumanReadableFormat }}
      </div>

      <h2 style="margin-top: 5px; border-bottom: 1px solid #ddd; padding-bottom: 3px">History</h2>
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="chief_complaint" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="psych_review_of_system" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="past_psych_history" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="family_history" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="medical_review_of_system" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="allergies" />
      <h2 style="margin-top: 5px; border-bottom: 1px solid #ddd; padding-bottom: 3px">Objective</h2>
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="examination" />

      <div style="border-bottom: 1px solid #eee; margin: 3px 0; padding: 3px 0">
        <div @click="dblOnAndOffSwitchToShowContent = !dblOnAndOffSwitchToShowContent" style="cursor: pointer">
          <el-row>
            <el-col :span="20" class="sectionHeading"> Vitals </el-col>
            <el-col :span="4">
              <span style="float: right; font-size: 1rem; margin-right: 10px">
                <i :class="dblOnAndOffSwitchToShowContent ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
              </span>
            </el-col>
          </el-row>
        </div>
        <el-row :style="cfGetCssForAnimateToShowContent">
          <div style="display: grid; grid-template-columns: 1fr 1fr">
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="weight" />
            </div>
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="height" />
            </div>
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="pulse" />
            </div>
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="temperature" />
            </div>
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="blood_pressure" />
            </div>
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="blood_sugar" />
            </div>
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="bmi" />
            </div>
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="oxygen_saturation" />
            </div>
            <div>
              <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="waist_circumference" />
            </div>
          </div>
        </el-row>
      </div>

      <h2 style="margin-top: 5px; border-bottom: 1px solid #ddd; padding-bottom: 3px">Others</h2>
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="miscellaneous_notes" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="process_notes" />
      <lockButtonPrintSection :_apptId="_showNoteForApptId"></lockButtonPrintSection>
    </div>
    <div v-if="_side === 'right' || _side === 'full'">
      <h2 style="margin-top: 5px; border-bottom: 1px solid #ddd; padding-bottom: 3px">Assessment</h2>
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="diagnosis" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="screens" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="goals" />
      <h2 style="margin-top: 5px; border-bottom: 1px solid #ddd; padding-bottom: 3px">Plan</h2>
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="recommendations" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="reminders" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="plan_comments" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="service_statements" />
    </div>
  </div>
</template>

<script>
import ctPaperNoteStructure from '@/components/def-processors/view/router-for-full-note-time-series.vue'

// init tables
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'

// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/non-temporal/paper-view-of-appt-note-with-amendment-or-modify-feature/step2-a4-note-for-appt-id.vue'

// smaller sections
import headerPaperNote from './section-2-header-arrows-name-comparison.vue'
import agePaperNote from './section-4-age.vue'

import lockButtonPrintSection from './section-19-allow-note-lock.vue'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      patientCurrentApptObj: {},
      formDef: {},
      arrowDirection: 0,
      dblOnAndOffSwitchToShowContent: false,
    }
  },
  props: {
    _showNoteForApptId: {
      type: Number,
      required: true,
    },
    _side: {
      type: String,
      required: true,
      default: 'left',
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  components: {
    apptNotePrintableView,
    agePaperNote,
    headerPaperNote,
    lockButtonPrintSection,
    ctPaperNoteStructure,
    ctPaperNoteStructure,
  },

  async created() {
    /* This is called everytimes the propID changes in the parent component.
    The parent compone is decide-notes-to-print-and-thier-appt-id*/

    // Goal1 -> If no ID has been sent then return
    if (!this._showNoteForApptId) return

    // Get appt details from appt table
    this.patientCurrentApptObj = await clientTblOfAppointments.find(this._showNoteForApptId)
  },
  computed: {
    cfGetCssForAnimateToShowContent() {
      if (this.dblOnAndOffSwitchToShowContent) {
        return 'max-height: 1000px; overflow:hidden; transition: max-height 0.6s, overflow 0.6s 0.6s;'
      } else {
        return 'max-height: 0; overflow:hidden; transition: max-height 0.6s, overflow 0s;'
      }
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
}
</script>

<style scoped>
/* Ref:
https://stackoverflow.com/a/30345808
https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html
https://github.com/cognitom/paper-css/blob/master/paper.css
*/
.A4 {
  /* Goal 1: Give dimensions: International standard size of A4 is 210x197mm Ref: https://en.wikipedia.org/wiki/Paper_size */
  width: 17cm; /* Default value for this in papercss is 21cm */
  /*height: 29.7cm; */ /* A4 has a size of 29.7 but not setting it so that the note page break does not take extra space */

  /* Goal 2: Give margin and padding */
  margin: 0 auto;
  margin-bottom: 0.5cm;
  padding: 0.5cm; /* In SO/30345808 this is set as 2cm.
  What is the right printer margin?
  As per https://stackoverflow.com/questions/3503615/what-are-the-minimum-margins-most-printers-can-handle it should be .25" or .39 inches. This A4 stlye given at https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html
  gives .78 inches.
  */

  /* Goal3: Give background color and font size */
  background: white;
  font-size: 0.8rem;
  color: #1f2f3d;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB;

  /* Goal4: Box shadow to give it the look of a page */
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);

  /* Goal5: Give a line break before and after the element */
  display: block;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
</style>
