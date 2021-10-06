<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <div class="grid-content">
          <h2
            style="text-align: left; cursor: pointer"
          >
            <namePrintSection></namePrintSection> <agePaperNote></agePaperNote>
          </h2>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content" style="vertical-align: middle;display:inline-block;width:45px;">
          <div v-if="isThisFirstAppointmentInLockedOrUnlockedState !== 'yes'">
            <el-button-group class="h1" style="float: left; display: none">
              <el-button
                @click="mfLeftArrowClickedLetUsGoToPrevAppt"
                class="el-icon-arrow-left"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
              <!-- If this note is being compared then do not show the comparison icon -->
              <el-button
                v-if="!isThisNoteBeingCompared"
                class="el-icon-document-copy"
                @click="compareIconClickedInHeaderSoSetUpStateToCompare('prev')"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
            </el-button-group>
          </div>
        </div>
        <div class="grid-content" style="vertical-align: middle;display:inline-block;">
            <b>Appt Date:</b> <span class="header_appt_date">{{ cfGetCurrentAppointmentDate | moment }}</span>
        </div>
        <div class="grid-content" style="vertical-align: middle;display:inline-block;width:45px;">
          <div v-if="isThisLastAppointmentInLockedOrUnlockedState !== 'yes'">
            <el-button-group class="h1" style="display: none">
              <!-- If this note is being compared then do not show the comparison icon -->
              <el-button
                v-if="!isThisNoteBeingCompared"
                class="el-icon-document-copy"
                @click="compareIconClickedInHeaderSoSetUpStateToCompare('next')"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
              <el-button
                class="el-icon-arrow-right"
                style="padding: 3px; color: #c0c4cc; border: none"
                @click="mfRightArrowClickedLetUsGoToNextAppt"
              ></el-button>
            </el-button-group>
          </div>
        </div>
        <span v-if="dblIsSavedNotification" style="color: rgb(103, 194, 58);font-weight: bold;vertical-align: middle;font-size: 0.9rem;">Saved successfully.</span>
      </el-col>

      <el-col :span="7">
        <div class="grid-content" style="text-align: right;">
          <div style="vertical-align: top;display:inline-block;">
            <!-- 
              Data properties that start with _ or $ will not be proxied on the Vue instance 
              because they may conflict with Vue’s internal properties and API methods.

              Ref: https://vuejs.org/v2/api/#data
            -->
            <lockButtonPrintSection v-if="cfGetCurrentAppointmentStatus == 'unlocked'" :_apptId="showNoteForApptId"></lockButtonPrintSection>
            <div v-if="cfGetCurrentAppointmentStatus == 'locked'">
              <div style="vertical-align: middle;display:inline-block;">
                <b>Appt locked on: </b> <span class="header_appt_date">{{ cfGetAppointmentLockedDate | moment }}</span>
              </div>
            </div>
          </div>
          <div style="vertical-align: top;display:inline-block;"><ctSettings></ctSettings></div>
          <div style="vertical-align: top;display:inline-block;">
            <el-button round size="mini" class="btn-map-fullscreen" @click="mfToggleFullScreen" type="primary"
              ><i :class="[fullscreen ? 'el-icon-close' : 'el-icon-full-screen']"></i>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :style="cfGetCssForAnimateToShowPatientDetails">
      <i class="el-icon-caret-top"></i>
      <el-card>
        <patientDetailsPrintSection></patientDetailsPrintSection>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import clientTblOfAppointments from '@/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfLeftSideViewComponents from '@/components/papers/view-appt-note/lhs-split-area/db/client-side/structure/left-hand-side-table-of-components.js'
import clientSideTableOfCommonForAllComponents from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import namePrintSection from './section-3-name.vue'
import patientDetailsPrintSection from './section-3.1-patient-details.vue'
import agePaperNote from '@/components/papers/view-appt-note/lhs-split-area/section-4-age.vue'
import ctSettings from '@/components/papers/view-appt-note/rhs-split-area/header/settings.vue'
import lockButtonPrintSection from '@/components/papers/view-appt-note/rhs-split-area/header/allow-note-lock-button.vue'

// Library
import moment from 'moment'

export default {
  data() {
    return {
      dblOnAndOffSwitchToShowPatientDetails: false,
      showNoteForApptId: 0,
      fullscreen: false,
      dblIsSavedNotification: false,
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  props: {
    _apptId: {
      type: Number,
      required: true,
    },
  },
  components: {
    namePrintSection,
    patientDetailsPrintSection,
    agePaperNote,
    ctSettings,
    lockButtonPrintSection,
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
        if (pVal > 0) {
          this.showNoteForApptId = pVal
        }
      },
    },
  },
  mounted() {
    const eventName = 'event-to-set-notification-for-save'
    this.$root.$on(eventName, (pEntity) => {
      this.dblIsSavedNotification = true

      let thisDocument = this
      setTimeout(function(){
        thisDocument.dblIsSavedNotification = false
      }, 3000, thisDocument);
    })
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
    cfGetCssForAnimateToShowPatientDetails() {
      if (this.dblOnAndOffSwitchToShowPatientDetails) {
        return 'max-height: 1000px; margin: 15px 0 10px 0; position:relative; transition: max-height 0.8s, overflow 0.5s 0.5s;'
      } else {
        return 'max-height: 0; margin: 0px; overflow:hidden; border:0; transition: max-height 0.6s, overflow 0s;'
      }
    },
    isThisNoteBeingCompared() {
      const apptNoteComponentObj = clientTblOfLeftSideViewComponents.find(2)
      if (apptNoteComponentObj['secondParameterGivenToComponentBeforeMounting']) {
        return true
      } else {
        return false
      }
    },
    isThisLastAppointmentInLockedOrUnlockedState() {
      const clientSideArray = clientTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] > this._apptId) {
          return 'no'
        }
      }
      return 'yes'
    },
    isThisFirstAppointmentInLockedOrUnlockedState() {
      const clientSideArray = clientTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] < this._apptId) {
          return 'no'
        }
      }
      return 'yes'
    },
    cfGetCurrentAppointmentDate(){
        const patientCurrentApptObj = clientTblOfAppointments.find(this._apptId)

        if(patientCurrentApptObj)
          return patientCurrentApptObj['apptStartMilliSecsOnCalendar']
    },
    cfGetAppointmentLockedDate(){
      const patientCurrentApptObj = clientTblOfAppointments.find(this._apptId)

      if(patientCurrentApptObj)
        return patientCurrentApptObj['ROW_END']
    },
    cfGetCurrentAppointmentStatus(){
        const patientCurrentApptObj = clientTblOfAppointments.find(this._apptId)

        if(patientCurrentApptObj)
          return patientCurrentApptObj['apptStatus']
    }
  },
  methods: {
    mfToggleFullScreen() {
      this.fullscreen = !this.fullscreen

      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'fullscreen', fieldValue: this.fullscreen }],
      })
    },
    mfGetPrevApptId(pApptClientUniqRowId) {
      let secondNoteForComparisonClientUniqRowId = 0
      const clientSideArray = clientTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] < pApptClientUniqRowId) {
          secondNoteForComparisonClientUniqRowId = clientSideArray[i]['clientSideUniqRowId']
        }
      }
      return secondNoteForComparisonClientUniqRowId
    },
    mfGetNextApptId(pApptClientUniqRowId) {
      let secondNoteForComparisonClientUniqRowId = 0
      const clientSideArray = clientTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] > pApptClientUniqRowId) {
          secondNoteForComparisonClientUniqRowId = clientSideArray[i]['clientSideUniqRowId']
        }
      }
      return secondNoteForComparisonClientUniqRowId
    },
    compareIconClickedInHeaderSoSetUpStateToCompare(pCompareWithDirection) {
      let comparisonId = 0

      if (pCompareWithDirection === 'prev') {
        comparisonId = this.mfGetPrevApptId(this._apptId)
      } else {
        comparisonId = this.mfGetNextApptId(this._apptId)
      }

      // This state is picked up by decide-notes-to-print-and-their-appt-id in the same folder. That is the parent of this Ct.
      const updateState = clientTblOfLeftSideViewComponents.update({
        clientSideUniqRowId: 2,
        currentDisplayStateOfComponent: 1,
        firstParameterGivenToComponentBeforeMounting: this._apptId,
        secondParameterGivenToComponentBeforeMounting: comparisonId,
      })
    },
    mfLeftArrowClickedLetUsGoToPrevAppt() {
      // left arrow can be clicked in 2 situations. This is in comparison state or it is not in comparison state.
      // So goal is to replace my value in the state with the new value.
      // Once I do that it will take care of both the above cases.

      const apptNoteComponentObj = clientTblOfLeftSideViewComponents.find(2)

      let prevId = 0
      prevId = this.mfGetPrevApptId(this._apptId)

      if (apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting'] === this._apptId) {
        const updateState = clientTblOfLeftSideViewComponents.update({
          clientSideUniqRowId: 2,
          firstParameterGivenToComponentBeforeMounting: prevId,
        })
      } else {
        // This value is used in seq1-decide-comparison-or-single-note-and-their-appt-id
        const updateState = clientTblOfLeftSideViewComponents.update({
          clientSideUniqRowId: 2,
          secondParameterGivenToComponentBeforeMounting: prevId,
        })
      }
      if (!this.isThisNoteBeingCompared) {
        this.$root.$emit('incoming-event-with-new-value-of-slider', prevId)
      }
    },

    mfRightArrowClickedLetUsGoToNextAppt() {
      const apptNoteComponentObj = clientTblOfLeftSideViewComponents.find(2)
      let nextId = 0
      nextId = this.mfGetNextApptId(this._apptId)

      if (apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting'] === this._apptId) {
        const updateState = clientTblOfLeftSideViewComponents.update({
          clientSideUniqRowId: 2,
          firstParameterGivenToComponentBeforeMounting: nextId,
        })
      } else {
        const updateState = clientTblOfLeftSideViewComponents.update({
          clientSideUniqRowId: 2,
          secondParameterGivenToComponentBeforeMounting: nextId,
        })
      }

      if (!this.isThisNoteBeingCompared) {
        this.$root.$emit('incoming-event-with-new-value-of-slider', nextId)
      }
    },
  },
}
</script>

<style scoped>
.el-row:hover .h1 {
  display: inline-block !important;
}
span.header_appt_date {
    font-size: 0.9rem;
}
</style>
