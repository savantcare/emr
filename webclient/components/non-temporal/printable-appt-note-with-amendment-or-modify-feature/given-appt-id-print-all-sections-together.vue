<!-- Each ct to be seperate and get included here. This file is too big TODO +read -->
<template>
  <div class="A4">
    <headerPrintSection :propApptId="propShowNoteForApptId"></headerPrintSection>

    <agePrintSection :propApptId="propShowNoteForApptId"> </agePrintSection>
    <chiefComplaintPrintSection :propApptId="propShowNoteForApptId"> </chiefComplaintPrintSection>

    <!-- SECTION 3 -->
    <b>Appt Date:</b> {{ patientCurrentApptObj['apptStartMilliSecondsOnCalendar'] | moment }}

    <!-- SECTION 4 -->
    <!-- Goal: If appt is not locked then do not show "Appt Lock date" -->
    <div v-if="patientCurrentApptObj['apptStatus'] === 'locked'">
      <b>Appt locked:</b> {{ cfApptLockDateInHumanReadableFormat }}
    </div>
    <vitalsPrintSection :propApptId="propShowNoteForApptId"> </vitalsPrintSection>

    <serviceStatementPrintSection :propApptId="propShowNoteForApptId"></serviceStatementPrintSection>
    <mentalStatusExamPrintSection :propApptId="propShowNoteForApptId"></mentalStatusExamPrintSection>
    <psychReviewOfSystemsPrintSection :propApptId="propShowNoteForApptId"></psychReviewOfSystemsPrintSection>
    <remindersPrintSection :propApptId="propShowNoteForApptId"></remindersPrintSection>

    <recommendationsPrintSection :propApptId="propShowNoteForApptId"></recommendationsPrintSection>
    <medicationsPrintSection :propApptId="propShowNoteForApptId"> </medicationsPrintSection>
    <lockButtonPrintSection :propApptId="propShowNoteForApptId"></lockButtonPrintSection>

    <!-- End of template -->
  </div>
</template>

<script>
import clientSideTblOfAddendums from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'

// init tables
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/non-temporal/printable-appt-note-with-amendment-or-modify-feature/given-appt-id-print-all-sections-together.vue'

// smaller sections
import headerPrintSection from './section-1-header.vue'
import chiefComplaintPrintSection from './section-1-chief-complaint.vue'
import vitalsPrintSection from './section-1-vitals.vue'
import agePrintSection from './section-3-age.vue'
import serviceStatementPrintSection from './section-6-service-statement.vue'
import mentalStatusExamPrintSection from './section-7-mental-status-exam.vue'
import psychReviewOfSystemsPrintSection from './section-8-psych-review-of-systems.vue'
import lockButtonPrintSection from './section-13-allow-note-lock.vue'
import remindersPrintSection from './section-9-reminders.vue'
import recommendationsPrintSection from './section-10-recommendations.vue'
import medicationsPrintSection from './section-11-medications.vue'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      patientCurrentApptObj: {},
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
    serviceStatementPrintSection,
    agePrintSection,
    headerPrintSection,
    mentalStatusExamPrintSection,
    chiefComplaintPrintSection,
    vitalsPrintSection,
    psychReviewOfSystemsPrintSection,
    lockButtonPrintSection,
    remindersPrintSection,
    recommendationsPrintSection,
    medicationsPrintSection,
  },

  async created() {
    // catch event
    let eventName = ['event-from-ct-note-given-appt-id-print-all-sections-together.vue-data-to-show-diff']
    this.$root.$on(eventName, (pUserSelectedApptReminderArray, pClientSideUniqRowId) => {
      if (pClientSideUniqRowId === this.patientCurrentApptObj['clientSideUniqRowId']) return
      this.lastComparisonReminderArrayReceived = pUserSelectedApptReminderArray
    })

    // Goal1 -> Find the appt ID chosen by the user

    if (!this.propShowNoteForApptId) return

    /* Goal: Show green around data that has been added. Red around data that has been deleted */
    // Finding the prev and next appt ID

    // get appt details from appt table
    this.patientCurrentApptObj = await clientSideTblOfAppointments.find(this.propShowNoteForApptId)
  },
  computed: {
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
  methods: {},
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
  height: 29.7cm;

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
  font-weight: bold;
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
