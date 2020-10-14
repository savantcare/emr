<!-- Each ct to be seperate and get included here. This file is too big TODO +read -->
<template>
  <div class="A4">
    <headerPrintSection :propApptId="propShowNoteForApptId"></headerPrintSection>

    <namePrintSection :propApptId="propShowNoteForApptId"> </namePrintSection>

    <agePrintSection :propApptId="propShowNoteForApptId"> </agePrintSection>
    <chiefComplaintPrintSection :propApptId="propShowNoteForApptId"> </chiefComplaintPrintSection>

    <!-- SECTION 3 -->
    <b>Appt Date:</b> {{ patientCurrentApptObj['apptStartMilliSecondsOnCalendar'] | moment }}
    <div v-if="debug">
      Debug data. <br />
      1) Appt start time is ->
      {{ patientCurrentApptObj['apptStartMilliSecondsOnCalendar'] | moment }}
      <br />
      2) Appt end (lock) time is -> {{ patientCurrentApptObj['ROW_END'] | moment }}
    </div>

    <!-- SECTION 4 -->
    <!-- Goal: If appt is not locked then do not show "Appt Lock date" -->
    <div v-if="patientCurrentApptObj['apptStatus'] === 'locked'">
      <b>Appt locked:</b> {{ cfApptLockDateInHumanReadableFormat }}
      <div v-if="debug">
        Debug data. <br />
        1) ROW END value for appointments is -> {{ patientCurrentApptObj['ROW_END'] }} <br />
        2) Difference between calendar time and lock time is ->
        {{
          patientCurrentApptObj['ROW_END'] -
          patientCurrentApptObj['apptStartMilliSecondsOnCalendar']
        }}
      </div>
    </div>
    <vitalsPrintSection :propApptId="propShowNoteForApptId"> </vitalsPrintSection>

    <serviceStatementPrintSection
      :propApptId="propShowNoteForApptId"
    ></serviceStatementPrintSection>
    <mentalStatusExamPrintSection
      :propApptId="propShowNoteForApptId"
    ></mentalStatusExamPrintSection>
    <psychReviewOfSystemsPrintSection
      :propApptId="propShowNoteForApptId"
    ></psychReviewOfSystemsPrintSection>
    <remindersPrintSection :propApptId="propShowNoteForApptId"></remindersPrintSection>

    <!-- SECTION 10: Recommendations -->
    <el-row
      type="flex"
      justify="left"
      class="recommendationsh3 sectionHeader"
      style="padding: 0rem; margin: 0rem"
    >
      <el-col :span="8" class="sectionHeading">Recommendations</el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="popoverVisible5">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAddendum(amendmentData, 'recommendations')"
                circle
              ></el-button>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <br />
    <div
      v-if="
        cfArOfAddendumForDisplay('recommendations') &&
        cfArOfAddendumForDisplay('recommendations').length > 0
      "
    >
      <h4>Addendum:</h4>
      <div
        v-for="row in cfArOfAddendumForDisplay('recommendations')"
        :key="row.clientSideUniqRowId"
      >
        <div style="margin: 5px 0">
          {{ row.description }}
          <br />
          <span style="font-size: 10px"
            >Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span
          >
        </div>
      </div>
    </div>
    <!-- SECTION 11: Medications -->
    <el-row
      type="flex"
      justify="left"
      class="medicationsh3 sectionHeader"
      style="padding: 0rem; margin: 0rem"
    >
      <el-col :span="8" class="sectionHeading">Medications</el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="popoverVisible6">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAddendum(amendmentData, 'medications')"
                circle
              ></el-button>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <br />
    <div
      v-if="
        cfArOfAddendumForDisplay('medications') &&
        cfArOfAddendumForDisplay('medications').length > 0
      "
    >
      <h4>Addendum:</h4>
      <div v-for="row in cfArOfAddendumForDisplay('medications')" :key="row.clientSideUniqRowId">
        <div style="margin: 5px 0">
          {{ row.description }}
          <br />
          <span style="font-size: 10px"
            >Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span
          >
        </div>
      </div>
    </div>

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
import namePrintSection from './section-2-name.vue'
import agePrintSection from './section-3-age.vue'
import serviceStatementPrintSection from './section-6-service-statement.vue'
import mentalStatusExamPrintSection from './section-7-mental-status-exam.vue'
import psychReviewOfSystemsPrintSection from './section-8-psych-review-of-systems.vue'
import lockButtonPrintSection from './section-13-allow-note-lock.vue'
import remindersPrintSection from './section-9-reminders.vue'
// Library
import moment from 'moment'

export default {
  data() {
    return {
      patientCurrentApptObj: {},
      debug: false,
      amendmentData: '',
      popoverVisible2: false,
      popoverVisible3: false,
      popoverVisible4: false,
      popoverVisible5: false,
      popoverVisible6: false,
      popoverVisible7: false,
      reminderDataAdded: null,
      drawerToShowComparisonOf2Notes: false,
      lastComparisonReminderArrayReceived: null,
      reminderArray: null,
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
    namePrintSection,
    agePrintSection,
    headerPrintSection,
    mentalStatusExamPrintSection,
    chiefComplaintPrintSection,
    vitalsPrintSection,
    psychReviewOfSystemsPrintSection,
    lockButtonPrintSection,
    remindersPrintSection,
  },
  async created() {
    // catch event
    let eventName = [
      'event-from-ct-note-given-appt-id-print-all-sections-together.vue-data-to-show-diff',
    ]
    this.$root.$on(eventName, (pUserSelectedApptReminderArray, pClientSideUniqRowId) => {
      if (pClientSideUniqRowId === this.patientCurrentApptObj['clientSideUniqRowId']) return
      this.lastComparisonReminderArrayReceived = pUserSelectedApptReminderArray
    })

    // Goal1 -> Find the appt ID chosen by the user

    if (!this.propShowNoteForApptId) return

    /* Goal: Show green around data that has been added. Red around data that has been deleted */
    // Finding the prev and next appt ID

    // get appt details from appt table
    console.log(this.propShowNoteForApptId)
    this.patientCurrentApptObj = await clientSideTblOfAppointments.find(this.propShowNoteForApptId)
  },
  computed: {
    cfArOfAddendumForDisplay() {
      const arFromClientSideTblOfAddendums = clientSideTblOfAddendums
        .query()
        .where('appointmentId', this.propShowNoteForApptId)
        .orderBy('ROW_START', 'asc')
        .get()

      const arAddendums = []
      arFromClientSideTblOfAddendums.forEach((row) => {
        if (typeof arAddendums[row.component] === 'undefined') {
          arAddendums[row.component] = []
        }
        arAddendums[row.component].push(row)
      })

      /**
       * component is computed function parameter
       * ref: https://ednsquare.com/question/how-to-pass-parameters-in-computed-properties-in-vue-js-------MQVlHT
       */
      return (component) => arAddendums[`${component}`]
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
  methods: {
    mfSaveAddendum(pAddendumData, component) {
      clientSideTblOfAddendums.insert({
        data: {
          appointmentId: this.propShowNoteForApptId,
          component: component,
          description: pAddendumData,
          ROW_START: Math.floor(Date.now()),
        },
      })

      // remove modal value after save
      this.amendmentData = ''
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
  font-size: 12px;
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
