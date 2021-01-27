<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="4"
        ><div class="grid-content">
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
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <h2
            style="text-align: center; cursor: pointer"
            @click="dblOnAndOffSwitchToShowPatientDetails = !dblOnAndOffSwitchToShowPatientDetails"
          >
            <namePrintSection></namePrintSection>
          </h2>
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content">
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
import namePrintSection from './section-3-name.vue'
import patientDetailsPrintSection from './section-3.1-patient-details.vue'

export default {
  data() {
    return {
      dblOnAndOffSwitchToShowPatientDetails: false,
    }
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
  },
  computed: {
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
  },
  methods: {
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
</style>
