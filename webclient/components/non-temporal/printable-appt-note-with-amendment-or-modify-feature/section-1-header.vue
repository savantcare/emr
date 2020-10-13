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
            <el-button
              class="el-icon-document-copy"
              @click="sendEventToShow2Notes('prev')"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
          </el-button-group>
        </div>
      </div>
    </el-col>
    <el-col :span="16"
      ><div class="grid-content">
        <h1 style="text-align: center">Appt Note (Confidential)</h1>
      </div></el-col
    >
    <el-col :span="4"
      ><div class="grid-content">
        <div v-if="isThisLastAppointmentInLockedOrUnlockedState !== 'yes'">
          <el-button-group class="h1" style="display: none">
            <el-button
              class="el-icon-document-copy"
              @click="sendEventToShow2Notes('next')"
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

export default {
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
    propComparisonNoteApptId: {
      type: Number,
      required: false,
    },
  },
  computed: {
    ifThisNoteBeingCompared() {
      return propComparisonNoteApptId
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
    sendEventToShow2Notes(pCompareWith) {
      console.log('event sent')
      this.$root.$emit(
        'event-from-print-note-header-show-comparison-drawer',
        this.propApptId,
        pCompareWith
      )
    },
    mfLeftArrowClickedLetUsGoToPrevAppt() {
      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] < this.propApptId) {
          const updateState = clientSideTblOfLeftSideViewCards.update({
            clientSideUniqRowId: 2,
            currentDisplayStateOfComponent: 1,
            parametersGivenToComponentBeforeMounting: clientSideArray[i]['clientSideUniqRowId'],
          })
          this.$root.$emit(
            'incoming-event-with-new-value-of-slider',
            clientSideArray[i]['clientSideUniqRowId']
          )
        }
      }
      return
    },
    mfRightArrowClickedLetUsGoToNextAppt() {
      // From appts table find if there is a ID greater then this in the state of locked or unlocked

      /* TODO @raj The followijg query does not work
      Becasue the query does not work I have to run another for loop in line 485
      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .where('clientSideUniqRowId', (value) => parseint(value) > this.propApptId)
        .get()

      */

      const clientSideArray = clientSideTblOfAppointments
        .query()
        .where((record) => {
          return record['apptStatus'] === 'unlocked' || record['apptStatus'] === 'locked'
        })
        .get()

      for (let i = 0; i < clientSideArray.length; i++) {
        if (clientSideArray[i]['clientSideUniqRowId'] > this.propApptId) {
          const updateState = clientSideTblOfLeftSideViewCards.update({
            clientSideUniqRowId: 2,
            currentDisplayStateOfComponent: 1,
            parametersGivenToComponentBeforeMounting: clientSideArray[i]['clientSideUniqRowId'],
          })
          this.$root.$emit(
            'incoming-event-with-new-value-of-slider',
            clientSideArray[i]['clientSideUniqRowId']
          )
        }
      }
      return
    },
  },
}
</script>

<style scoped>
.el-row:hover .h1 {
  display: inline-block !important;
}
</style>
