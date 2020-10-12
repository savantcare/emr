<template>
  <div>
    <el-drawer :visible.sync="dUidrawerToShowComparisonOf2Notes" direction="ttb" size="90%">
      <el-row>
        <el-col :span="12"><apptNotePrintableView propShowNoteForApptId="1" key="2" /> </el-col
        ><el-col :span="12"><apptNotePrintableView propShowNoteForApptId="5" key="5" /></el-col>
      </el-row>
    </el-drawer>

    <div>
      <apptNotePrintableView :propShowNoteForApptId="cfGetApptId" :key="cfGetApptId" />
    </div>
  </div>
</template>

<script>
// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/non-temporal/printable-appt-note-with-amendment-or-modify-feature/given-appt-id-print-all-sections-together.vue'
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

export default {
  data() {
    return {
      dUidrawerToShowComparisonOf2Notes: false,
      apptIdForWhichNoteNeedsToBeShown: 0,
    }
  },

  components: { apptNotePrintableView },

  mounted: function () {
    console.log('defining event')
    this.$root.$on(
      'event-from-print-note-header-show-comparison-drawer',
      (pClientSideUniqRowId) => {
        console.log('event recd')
        this.dUidrawerToShowComparisonOf2Notes = true
      }
    )
  },
  computed: {
    cfGetApptId() {
      // this needs to be in a computed fn since clicking prev or next will change the value in DB and then the note needs to get update

      /* Goal : Get the appointment ID for which the printable note needs to be shown
       Possibilities
       1. parametersGivenToComponentBeforeMounting has a value or has 0
       2. If parametersGivenToComponentBeforeMounting is 0 then take the highest appt ID
      */

      const apptNoteComponentObj = clientSideTblOfLeftSideViewCards.find(2)

      console.log(apptNoteComponentObj)

      let apptIdForWhichNoteNeedsToBeShown = 0
      apptIdForWhichNoteNeedsToBeShown =
        apptNoteComponentObj['parametersGivenToComponentBeforeMounting']

      console.log(apptIdForWhichNoteNeedsToBeShown)

      if (apptIdForWhichNoteNeedsToBeShown > 0) {
      } else {
        const apptObj = clientSideTblOfAppointments
          .query()
          .where('apptStatus', 'locked')
          .orWhere('apptStatus', 'unlocked')
          .orderBy('clientSideUniqRowId', 'desc')
          .get()
        apptIdForWhichNoteNeedsToBeShown = apptObj[0]['clientSideUniqRowId']
        console.log(apptIdForWhichNoteNeedsToBeShown)
      }
      this.apptIdForWhichNoteNeedsToBeShown = apptIdForWhichNoteNeedsToBeShown

      console.log(this.apptIdForWhichNoteNeedsToBeShown)

      if (!this.apptIdForWhichNoteNeedsToBeShown) return 0

      return this.apptIdForWhichNoteNeedsToBeShown
    },
  },
}
</script>
