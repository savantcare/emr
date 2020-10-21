<template>
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
    <el-col :span="16"
      ><div class="grid-content">
        <h2 style="text-align: center"><namePrintSection></namePrintSection></h2></div
    ></el-col>
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
</template>

<script>
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import namePrintSection from './section-3-name.vue'

export default {
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  components: {
    namePrintSection,
  },
  computed: {
    isThisNoteBeingCompared() {
      const apptNoteComponentObj = clientSideTblOfLeftSideViewCards.find(2)
      if (apptNoteComponentObj['secondParameterGivenToComponentBeforeMounting']) {
        return true
      } else {
        return false
      }
    },
    isThisLastAppointmentInLockedOrUnlockedState() {
      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] > this.propApptId) {
          return 'no'
        }
      }
      return 'yes'
    },
    isThisFirstAppointmentInLockedOrUnlockedState() {
      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] < this.propApptId) {
          return 'no'
        }
      }
      return 'yes'
    },
  },
  methods: {
    mfGetPrevApptId(pApptClientSideUniqRowId) {
      let secondNoteForComparisonClientSideUniqRowId = 0
      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] < pApptClientSideUniqRowId) {
          secondNoteForComparisonClientSideUniqRowId = clientSideArray[i]['clientSideUniqRowId']
        }
      }
      return secondNoteForComparisonClientSideUniqRowId
    },
    mfGetNextApptId(pApptClientSideUniqRowId) {
      let secondNoteForComparisonClientSideUniqRowId = 0
      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] > pApptClientSideUniqRowId) {
          secondNoteForComparisonClientSideUniqRowId = clientSideArray[i]['clientSideUniqRowId']
        }
      }
      return secondNoteForComparisonClientSideUniqRowId
    },
    compareIconClickedInHeaderSoSetUpStateToCompare(pCompareWithDirection) {
      let comparisonId = 0

      if (pCompareWithDirection === 'prev') {
        comparisonId = this.mfGetPrevApptId(this.propApptId)
      } else {
        comparisonId = this.mfGetNextApptId(this.propApptId)
      }

      // This state is picked up by decide-notes-to-print-and-their-appt-id in the same folder. That is the parent of this Ct.
      const updateState = clientSideTblOfLeftSideViewCards.update({
        clientSideUniqRowId: 2,
        currentDisplayStateOfComponent: 1,
        firstParameterGivenToComponentBeforeMounting: this.propApptId,
        secondParameterGivenToComponentBeforeMounting: comparisonId,
      })
    },
    mfLeftArrowClickedLetUsGoToPrevAppt() {
      // left arrow can be clicked in 2 situations. This is in comparison state or it is not in comparison state.
      // So goal is to replace my value in the state with the new value.
      // Once I do that it will take care of both the above cases.

      const apptNoteComponentObj = clientSideTblOfLeftSideViewCards.find(2)

      let prevId = 0
      prevId = this.mfGetPrevApptId(this.propApptId)

      if (apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        const updateState = clientSideTblOfLeftSideViewCards.update({
          clientSideUniqRowId: 2,
          firstParameterGivenToComponentBeforeMounting: prevId,
        })
      } else {
        const updateState = clientSideTblOfLeftSideViewCards.update({
          clientSideUniqRowId: 2,
          secondParameterGivenToComponentBeforeMounting: prevId,
        })
      }
      if (!this.isThisNoteBeingCompared) {
        this.$root.$emit('incoming-event-with-new-value-of-slider', prevId)
      }
    },

    mfRightArrowClickedLetUsGoToNextAppt() {
      const apptNoteComponentObj = clientSideTblOfLeftSideViewCards.find(2)
      let nextId = 0
      nextId = this.mfGetNextApptId(this.propApptId)

      if (apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        const updateState = clientSideTblOfLeftSideViewCards.update({
          clientSideUniqRowId: 2,
          firstParameterGivenToComponentBeforeMounting: nextId,
        })
      } else {
        const updateState = clientSideTblOfLeftSideViewCards.update({
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
