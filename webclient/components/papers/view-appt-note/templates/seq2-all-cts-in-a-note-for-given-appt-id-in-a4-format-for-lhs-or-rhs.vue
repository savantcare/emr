<template>
  <div class="A4">
    <div v-if="(_side === 'left' || _side === 'full') && (patientCurrentApptObj['apptStatus'] == 'cancellation' || patientCurrentApptObj['apptStatus'] == 'late-cancellation')">
      <el-image src="/images/cancelled-appt-left-side.jpg" fit="fill"></el-image>
    </div>
    <div v-else-if="(_side === 'left' || _side === 'full') && patientCurrentApptObj['apptStatus'] == 'no-show'">
      <el-image src="/images/no-show-appt-left-side.jpg" fit="fill"></el-image>
    </div>
    <div v-else-if="_side === 'left' || _side === 'full'">
      
      <!-- Goal: If appt is not locked then do not show "Appt Lock date" -->
      <!--<div v-if="patientCurrentApptObj['apptStatus'] === 'locked'">
        <b>Appt locked:</b>
        {{ cfApptLockDateInHumanReadableFormat }}
      </div>-->
      
      <el-divider class="section-header"><h3>History</h3></el-divider>
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="chief_complaint" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="psych_review_of_system" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="past_psych_history" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="family_history" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="medical_history" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="social_history" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="medical_review_of_system" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="allergies" />
      <el-divider class="section-header"><h3 style="">Objective</h3></el-divider>

      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="examination" />

      <div style="border-bottom: 1px solid #eee; margin: 3px 0; padding: 3px 0">
        <el-row>
          <el-col :span="20" class="sectionHeading"> Vitals </el-col>
        </el-row>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr">
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
      </div>
    </div>
    <div v-else-if="(_side === 'right' || _side === 'full') && (patientCurrentApptObj['apptStatus'] == 'cancellation' || patientCurrentApptObj['apptStatus'] == 'late-cancellation')">
      <el-image src="/images/cancelled-appt-right-side.jpg" fit="fill"></el-image>
    </div>
    <div v-else-if="(_side === 'right' || _side === 'full') && patientCurrentApptObj['apptStatus'] == 'no-show'">
      <el-image src="/images/no-show-appt-right-side.jpg" fit="fill"></el-image>
    </div>
    <div v-else-if="_side === 'right' || _side === 'full'">
      <el-divider class="section-header"><h3>Assessment</h3></el-divider>

      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="diagnosis" />
      <!--<ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="screens" />-->
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="goals" />
      <el-divider class="section-header"><h3>Plan</h3></el-divider>
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="medication_orders" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="recommendations" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="reminders" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="plan_comments" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="service_statements" />
      <el-divider class="section-header"><h3>Others</h3></el-divider>
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="miscellaneous_notes" />
      <ctPaperNoteStructure :_apptId="_showNoteForApptId" _entity="process_notes" />
    </div>
  </div>
</template>

<script>
import ctPaperNoteStructure from '@/components/papers/view-appt-note/templates/seq3-router-for-full-note-time-series.vue'

// init tables
import clientTblOfAppointments from '@/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'
import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/papers/view-appt-note/templates/seq2-all-cts-in-a-note-for-given-appt-id-in-a4-format-for-lhs-or-rhs.vue'

// smaller sections
import headerPaperNote from '../lhs-split-area/section-2-header-arrows-name-comparison.vue'
import agePaperNote from '../lhs-split-area/section-4-age.vue'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      patientCurrentApptObj: {},
      formDef: {},
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
    ctPaperNoteStructure,
  },

  async created() {
    /* This is called everytimes the propID changes in the parent component.
    The parent compone is decide-notes-to-print-and-thier-appt-id*/

    // Goal1 -> If no ID has been sent then return
    if (!this._showNoteForApptId) return

    commonForAllCts.insertOrUpdate({
      data: [{ fieldName: 'patient-current-appt-id', fieldValue: this._showNoteForApptId }],
    })

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
  width: 18cm; /* Default value for this in papercss is 21cm */
  /*height: 29.7cm; */ /* A4 has a size of 29.7 but not setting it so that the note page break does not take extra space */

  /* Goal 2: Give margin and padding */
  margin: 0 auto;
  margin-bottom: 0.5cm;
  padding: 0.1cm 0.5cm 0.5cm 0.5cm; /* In SO/30345808 this is set as 2cm.
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
.section-header.el-divider.el-divider--horizontal {
  background-color: rgb(160, 207, 255);
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}

/* Where ever the section-header class is applied it will look for all H3 inside it and make the color lighter. This is used for the headings in the paper-note for Assessment / plan etc ..
Why was this color chosen? As per https://element.eleme.io/#/en-US/component/color the #303133 is the color of primary text
*/
.section-header h3 {
  color: #333333;
  font-weight: 500;
}
</style>
