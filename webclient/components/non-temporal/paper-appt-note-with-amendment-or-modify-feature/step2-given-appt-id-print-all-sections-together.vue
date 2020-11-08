<template>
  <div class="A4">
    <headerPrintSection :propApptId="propShowNoteForApptId"></headerPrintSection>
    <b>Appt Date:</b> {{ patientCurrentApptObj['apptStartMilliSecondsOnCalendar'] | moment }}

    <agePrintSection :propApptId="propShowNoteForApptId"> </agePrintSection>

    <!-- Goal: If appt is not locked then do not show "Appt Lock date" -->
    <div v-if="patientCurrentApptObj['apptStatus'] === 'locked'">
      <b>Appt locked:</b> {{ cfApptLockDateInHumanReadableFormat }}
    </div>
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="chief_complaint" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="family_history" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="process_notes" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="reminders" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="recommendations" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="plan_comments" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="miscellaneous_notes" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="service_statements" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="psych_review_of_system" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="past_psych_history" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="medical_review_of_system" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="goals" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="allergies" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="diagnosis" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="screens" />
    <ctTimeSeries :propShowNoteForApptId="propShowNoteForApptId" propEntity="mental_status_exam" />
    <lockButtonPrintSection :propApptId="propShowNoteForApptId"></lockButtonPrintSection>
  </div>
</template>

<script>
import clientTblOfAddendums from '~/components/temporal/amendment/db/client-side/structure/amendment-client-side-table.js'

// init tables
import clientTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'

// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/non-temporal/paper-appt-note-with-amendment-or-modify-feature/step2-given-appt-id-print-all-sections-together.vue'

// smaller sections
import headerPrintSection from './section-2-header.vue'
import agePrintSection from './section-4-age.vue'
import vitalsPrintSection from './section-6-vitals.vue'
import medicationsPrintSection from './section-12-medications.vue'

import lockButtonPrintSection from './section-19-allow-note-lock.vue'

import allFormDefinations from '@/components//def-processors/all-form-definations.js'

import ctAddStructure from '@/components//def-processors/change/add-form.vue'

import ctTimeSeries from './step3-swipe-time-series-of-one-ct.vue'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      patientCurrentApptObj: {},
      formDef: {},
      dDebounceCounter: '',
      arrowDirection: 0,
    }
  },
  props: {
    propShowNoteForApptId: {
      type: Number,
      required: true,
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  components: {
    apptNotePrintableView,
    agePrintSection,
    headerPrintSection,
    vitalsPrintSection,
    lockButtonPrintSection,
    medicationsPrintSection,
    ctAddStructure,
    ctTimeSeries,
  },

  async created() {
    /* This is called everytimes the propID changes in the parent component.
    The parent compone is decide-notes-to-print-and-thier-appt-id*/

    // Goal1 -> If no ID has been sent then return
    if (!this.propShowNoteForApptId) return

    // Get appt details from appt table
    this.patientCurrentApptObj = await clientTblOfAppointments.find(this.propShowNoteForApptId)
  },
  computed: {
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
}
</script>

<style scoped>
/*
Style architecture:

A4
H1
H3

*/

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

h1 {
  margin-top: 1rem;
  width: 100%;
  float: none;
  display: flex;
}

h3 {
  border-bottom: 1px solid #dcdfe6;
  margin-top: 1rem;
  width: 100%;
  float: none;
  display: flex;
}

.sectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}

.recommendationsh3:hover .el-icon-edit-outline {
  display: inline-block !important;
  position: absolute;
}

.medicationsh3:hover .el-icon-edit-outline {
  display: inline-block !important;
  position: absolute;
}

.vitalsh3:hover .el-icon-edit-outline {
  position: absolute;
  display: inline-block !important;
}
/* Goal: Content that does not fit on A4 one page should go to 2nd page
Ref:  https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html */
@media print {
  .page-break {
    display: block;
    page-break-before: always;
  }
  size: A4 portrait;
}

@media print {
  .noprint {
    display: none;
  }
  .enable-print {
    display: block;
  }
}
</style>
