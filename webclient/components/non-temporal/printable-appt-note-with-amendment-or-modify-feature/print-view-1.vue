<!-- Each ct to be seperate and get included here. This file is too big TODO +read -->
<template>
  <div class="A4">
    <el-row type="flex" justify="space-between">
      <el-col :span="4"
        ><div class="grid-content">
          <el-button-group class="h1" style="float: left; display: none">
            <el-button
              @click="mfLeftArrowClickedLetUsGoToPrevAppt"
              class="el-icon-arrow-left"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
            <el-button
              class="el-icon-document-copy"
              @click="sendEventToShow2Notes"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content">
          <h1 style="text-align: center">Appt Note (Confidential)</h1>
        </div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content">
          <el-button-group class="h1" style="display: none">
            <el-button
              class="el-icon-document-copy"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
            <el-button
              class="el-icon-arrow-right"
              style="padding: 3px; color: #c0c4cc; border: none"
              @click="mfRightArrowClickedLetUsGoToNextAppt"
            ></el-button>
          </el-button-group></div
      ></el-col>
    </el-row>

    <!-- SECTION 1 -->
    <h3 style="padding-top: 20px">Name: Vikas K</h3>

    <!-- SECTION 2 -->
    <h3>Age: 42</h3>

    <!-- SECTION 3 -->
    <h3>Appt Date: {{ cfGetpatientCurrentApptObj }}</h3>
    <div v-if="debug">
      Debug data. <br />
      1) Appt start time is ->
      {{ patientCurrentApptObj['apptStartMilliSecondsOnCalendar'] | moment }}
      <br />
      2) Appt end (lock) time is -> {{ patientCurrentApptObj['ROW_END'] | moment }}
    </div>

    <!-- SECTION 4 -->
    <!-- Goal: If appt is not locked then do not show "Appt Lick date" -->
    <div v-if="patientCurrentApptObj['apptStatus'] === 'locked'">
      <h3>Appt locked: {{ cfApptLockDateInHumanReadableFormat }}</h3>
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
    <serviceStatementPageSection></serviceStatementPageSection>

    <!-- SECTION 6 MENTAL STATUS EXAM-->
    <el-row
      type="flex"
      justify="left"
      class="mseh3"
      style="padding-top: 20px; padding-bottom: 10px; min-height: 53px"
    >
      <el-col :span="8">
        <h3>Mental status exam</h3>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible2">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAmendment(amendmentData, 'mentalStatusExam')"
                circle
              ></el-button>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              size="mini"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            >
            </el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <div v-for="row in cfArOfMentalStatusExamForDisplay" :key="`mse - ${row.clientSideUniqRowId}`">
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamCategory'] }}
      {{ row['tblMentalStatusExamMasterLink']['mentalStatusExamDescription'] }}
    </div>
    <br />
    <div
      v-if="
        cfArOfAmendmentForDisplay('mentalStatusExam') &&
        cfArOfAmendmentForDisplay('mentalStatusExam').length > 0
      "
    >
      <h4>Amendment:</h4>
      <div
        v-for="row in cfArOfAmendmentForDisplay('mentalStatusExam')"
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
    <!-- SECTION 7 Psych review of systems  -->
    <el-row
      type="flex"
      justify="left"
      class="prosh3"
      style="padding-top: 20px; padding-bottom: 10px; min-height: 53px"
    >
      <el-col :span="8">
        <h3>Psych review of systems</h3>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible3">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAmendment(amendmentData, 'psychReviewOfSystems')"
                circle
              ></el-button>
            </div>
            <el-button
              slot="reference"
              class="el-icon-edit-outline"
              size="mini"
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>

    <div
      v-for="row in cfArOfPsychReviewOfSystemsForDisplay"
      :key="`ros - ${row.clientSideUniqRowId}`"
    >
      {{ row['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsCategory'] }}
      {{ row['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsDescription'] }}
    </div>
    <br />
    <div
      v-if="
        cfArOfAmendmentForDisplay('psychReviewOfSystems') &&
        cfArOfAmendmentForDisplay('psychReviewOfSystems').length > 0
      "
    >
      <h4>Amendment:</h4>
      <div
        v-for="row in cfArOfAmendmentForDisplay('psychReviewOfSystems')"
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

    <!-- SECTION 8 REMINDERS -->
    <el-row
      type="flex"
      justify="left"
      class="remindersh3"
      style="padding-top: 20px; padding-bottom: 10px; min-height: 53px"
    >
      <el-col :span="8">
        <h3 class="remindersh3">Reminders</h3>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible4">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAmendment(amendmentData, 'reminder')"
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
    <div :style="cfGetReminderStyle">
      <div v-for="row in cfArOfRemindersForDisplay[0]" :key="row.clientSideUniqRowId">
        {{ row['description'] }}
      </div>
      <br />
      <div
        v-if="
          cfArOfAmendmentForDisplay('reminder') && cfArOfAmendmentForDisplay('reminder').length > 0
        "
      >
        <h4>Amendment:</h4>
        <div v-for="row in cfArOfAmendmentForDisplay('reminder')" :key="row.clientSideUniqRowId">
          <div style="margin: 5px 0">
            {{ row.description }}
            <br />
            <span style="font-size: 10px"
              >Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="debug">
      <hr />
      Debug data. <br />
      Conditions to show a reminder: <br />
      Condition 1: rem was created before the apptlock time(= ROW_END of appt) <br />
      Condition 2: rem was deleted (ROW_END of rem) after the apptlock time(= ROW_END of appt)
      <br />
      <hr />
      <div v-for="rem in cfArOfRemindersForDisplay[1]" :key="rem.clientSideUniqRowId">
        Loop start
        <hr />
        {{ rem }} <br />
        <hr />
        Condition 1: <br />
        Was this reminder created {{ rem['ROW_START'] | moment }} before the appt ended
        {{ patientCurrentApptObj['ROW_END'] | moment }} (Following should be +ve):
        {{ patientCurrentApptObj['ROW_END'] - rem['ROW_START'] }}
        <br />
        <hr />
        Condition 2: Reminder Deleted at: {{ rem['ROW_END'] | moment }} <br />
        Was this reminder deleted {{ rem['ROW_END'] }} after the appt ended
        {{ patientCurrentApptObj['ROW_END'] | moment }} (Following should be +ve):
        {{ rem['ROW_END'] - patientCurrentApptObj['ROW_END'] }}
        <br />
        <hr />
      </div>
    </div>

    <!-- SECTION 9: Recommendations -->
    <el-row
      type="flex"
      justify="left"
      class="recommendationsh3"
      style="padding-top: 20px; padding-bottom: 10px; min-height: 53px"
    >
      <el-col :span="8"> <h3>Recommendations</h3> </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible5">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAmendment(amendmentData, 'recommendations')"
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
        cfArOfAmendmentForDisplay('recommendations') &&
        cfArOfAmendmentForDisplay('recommendations').length > 0
      "
    >
      <h4>Amendment:</h4>
      <div
        v-for="row in cfArOfAmendmentForDisplay('recommendations')"
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
    <!-- SECTION 10: Medications -->
    <el-row
      type="flex"
      justify="left"
      class="medicationsh3"
      style="padding-top: 20px; padding-bottom: 10px; min-height: 53px"
    >
      <el-col :span="8"> <h3>Medications</h3> </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible6">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAmendment(amendmentData, 'medications')"
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
        cfArOfAmendmentForDisplay('medications') &&
        cfArOfAmendmentForDisplay('medications').length > 0
      "
    >
      <h4>Amendment:</h4>
      <div v-for="row in cfArOfAmendmentForDisplay('medications')" :key="row.clientSideUniqRowId">
        <div style="margin: 5px 0">
          {{ row.description }}
          <br />
          <span style="font-size: 10px"
            >Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span
          >
        </div>
      </div>
    </div>

    <!-- SECTION 11 -->
    <el-row
      type="flex"
      justify="left"
      class="vitalsh3"
      style="padding-top: 20px; padding-bottom: 10px; min-height: 53px"
    >
      <el-col :span="8"> <h3>Vitals</h3> </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="visible7">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAmendment(amendmentData, 'vitals')"
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
      v-if="cfArOfAmendmentForDisplay('vitals') && cfArOfAmendmentForDisplay('vitals').length > 0"
    >
      <h4>Amendment:</h4>
      <div v-for="row in cfArOfAmendmentForDisplay('vitals')" :key="row.clientSideUniqRowId">
        <div style="margin: 5px 0">
          {{ row.description }}
          <br />
          <span style="font-size: 10px"
            >Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span
          >
        </div>
      </div>
    </div>

    <!-- SECTION 12 -->
    <div v-if="patientCurrentApptObj['apptStatus'] !== 'locked'">
      <el-button @click="lockButtonClicked" type="primary">Reviewed - Lock the note </el-button>
    </div>

    <!-- End of template -->
  </div>
</template>

<script>
import clientSideTblOfPatientReminders from '@/components/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'
import clientSideTblOfMentalStatusExam from '@/components/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
import clientSideTblOfPsychReviewOfSystems from '@/components/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'
import clientSideTblOfAmendments from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'

// init tables
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/mts-table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/non-temporal/printable-appt-note-with-amendment-or-modify-feature/print-view-1.vue'

// smaller sections
import serviceStatementPageSection from './page-section-of-service-statement.vue'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      patientCurrentApptObj: [],
      debug: false,
      amendmentData: '',
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      reminderDataAdded: null,
      drawerToShowComparisonOf2Notes: false,
      lastComparisonReminderArrayReceived: null,
      reminderArray: null,
      appointmentIdForThisNote: 0,
    }
  },
  props: ['propShowNoteForApptId'],
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  components: { apptNotePrintableView, serviceStatementPageSection },
  mounted() {
    // catch event
    let eventName = ['event-from-ct-note-print-view-1-data-to-show-diff']
    this.$root.$on(eventName, (pUserSelectedApptReminderArray, pClientSideUniqRowId) => {
      if (pClientSideUniqRowId === this.patientCurrentApptObj['clientSideUniqRowId']) return
      this.lastComparisonReminderArrayReceived = pUserSelectedApptReminderArray
    })
  },
  computed: {
    cfArOfAmendmentForDisplay() {
      const arFromClientSideTblOfAmendments = clientSideTblOfAmendments
        .query()
        .where('appointmentId', this.appointmentIdForThisNote)
        .orderBy('ROW_START', 'asc')
        .get()

      const arAmendments = []
      arFromClientSideTblOfAmendments.forEach((row) => {
        if (typeof arAmendments[row.component] === 'undefined') {
          arAmendments[row.component] = []
        }
        arAmendments[row.component].push(row)
      })

      /**
       * component is computed function parameter
       * ref: https://ednsquare.com/question/how-to-pass-parameters-in-computed-properties-in-vue-js-------MQVlHT
       */
      return (component) => arAmendments[`${component}`]
    },
    async cfGetpatientCurrentApptObj() {
      // Goal1 -> Find the appt ID chosen by the user
      const apptNoteComponentVisibilityCurrentValue = clientSideTblOfLeftSideViewCards.find(2)

      console.log(apptNoteComponentVisibilityCurrentValue)

      let apptIdForWhichNoteNeedsToBeShown = 0

      if (this.propShowNoteForApptId) {
        apptIdForWhichNoteNeedsToBeShown = this.propShowNoteForApptId
      } else {
        apptIdForWhichNoteNeedsToBeShown =
          apptNoteComponentVisibilityCurrentValue['componentCurrentValueForCustomizingViewState']
      }

      console.log(apptIdForWhichNoteNeedsToBeShown)

      this.appointmentIdForThisNote = apptIdForWhichNoteNeedsToBeShown
      /* Goal: Show green around data that has been added. Red around data that has been deleted */
      // Finding the prev and next appt ID

      // get appt details from appt table
      this.patientCurrentApptObj = await clientSideTblOfAppointments.find(
        apptIdForWhichNoteNeedsToBeShown
      )

      console.log(this.patientCurrentApptObj)

      const apptStartMilliSeconds = this.patientCurrentApptObj['apptStartMilliSecondsOnCalendar']
      return moment(apptStartMilliSeconds).format('MMM DD YYYY HH:mm') // parse integer
    },
    cfGetReminderStyle() {
      // send event for others what my reminder array looks like
      this.$root.$emit(
        'event-from-ct-note-print-view-1-data-to-show-diff',
        this.reminderArray,
        this.patientCurrentApptObj['clientSideUniqRowId']
      )

      if (this.lastComparisonReminderArrayReceived === null) return
      if (this.reminderArray === null) return

      if (this.reminderArray[0].length > this.lastComparisonReminderArrayReceived[0].length) {
        return 'border:1px solid #67C23A'
      } else {
        return 'border:1px solid #E6A23C'
      }
    },

    cfArOfRemindersForDisplay() {
      let userSelectedApptReminderArray = []

      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        userSelectedApptReminderArray[0] = clientSideTblOfPatientReminders
          .query()
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        userSelectedApptReminderArray[0] = clientSideTblOfPatientReminders
          .query()
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }

      // The following line is used for debugging
      if (this.debug) {
        userSelectedApptReminderArray[1] = clientSideTblOfPatientReminders.query().get()
      }

      this.reminderArray = userSelectedApptReminderArray
      return userSelectedApptReminderArray
    },
    cfArOfMentalStatusExamForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
          .query()
          .with('tblMentalStatusExamMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
          .query()
          .with('tblMentalStatusExamMasterLink')
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },

    cfArOfPsychReviewOfSystemsForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.patientCurrentApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },

    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
  methods: {
    sendEventToShow2Notes() {
      this.$root.$emit('event-from-ct-note-print-view-1-show-comparison-drawer')
    },
    mfLeftArrowClickedLetUsGoToPrevAppt() {
      const apptIdForWhichNoteNeedsToBeShown = this.patientCurrentApptObj['clientSideUniqRowId']

      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] < apptIdForWhichNoteNeedsToBeShown) {
          const updateState = clientSideTblOfLeftSideViewCards.update({
            clientSideUniqRowId: 2,
            componentCurrentValueForCustomizingViewState: clientSideArray[i]['clientSideUniqRowId'],
          })
        }
      }
      return
    },
    mfRightArrowClickedLetUsGoToNextAppt() {
      // From appts table find if there is a ID greater then this in the state of locked or unlocked

      const apptIdForWhichNoteNeedsToBeShown = this.patientCurrentApptObj['clientSideUniqRowId']

      /* TODO @raj The followijg query does not work
      Becasue the query does not work I have to run another for loop in line 485
      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .where('clientSideUniqRowId', (value) => parseint(value) < apptIdForWhichNoteNeedsToBeShown)
        .get()

      */

      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] > apptIdForWhichNoteNeedsToBeShown) {
          const updateState = clientSideTblOfLeftSideViewCards.update({
            clientSideUniqRowId: 2,
            componentCurrentValueForCustomizingViewState: clientSideArray[i]['clientSideUniqRowId'],
          })
        }
      }
      return
    },

    async lockButtonClicked() {
      console.log('lock button clicked')
      const clientSideUniqRowId = this.patientCurrentApptObj['clientSideUniqRowId']
      let arOfObjectsFromClientSideDB = await clientSideTblOfAppointments.update({
        where: clientSideUniqRowId,
        data: {
          apptStatus: 'locked',
          ROW_END: Math.floor(Date.now()), // The query sent to server is "delete"
        },
      })

      // In case there are no more appt then insert a appt. This is for testing.
      arOfObjectsFromClientSideDB = await clientSideTblOfAppointments
        .query()
        .where('apptStatus', 'unlocked')
        .get()

      if (arOfObjectsFromClientSideDB.length === 0) {
        await clientSideTblOfAppointments.insert({
          data: {
            apptStartMilliSecondsOnCalendar: Math.floor(Date.now()),
            apptProviderUuid: 1,
            apptStatus: 'unlocked',
            ROW_START: Math.floor(Date.now()),
          },
        })
      }
    },
    mfSaveAmendment(pAmendmentData, component) {
      clientSideTblOfAmendments.insert({
        data: {
          appointmentId: this.appointmentIdForThisNote,
          component: component,
          description: pAmendmentData,
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
/* Ref: https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html  
https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html
*/
.A4 {
  background: white;
  width: 21cm;
  height: 29.7cm;
  display: block;
  margin: 0 auto;
  padding: 2cm; /* During print set padding: 2cm. Padding may be dynamic depending on viewport for seeing this on 13" screen of doctor laptops with resolution of 1440x1368 */
  /* What is the right printer margin? 
  As per https://stackoverflow.com/questions/3503615/what-are-the-minimum-margins-most-printers-can-handle it should be .25" or .39 inches. This A4 stlye given at https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html
  gives .78 inches. 
  */
  font-size: 12px;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}

.el-row:hover .h1 {
  display: inline-block !important;
}

.ssh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.mseh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.prosh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.remindersh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.recommendationsh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.medicationsh3:hover .el-icon-edit-outline {
  display: inline-block !important;
}

.vitalsh3:hover .el-icon-edit-outline {
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
