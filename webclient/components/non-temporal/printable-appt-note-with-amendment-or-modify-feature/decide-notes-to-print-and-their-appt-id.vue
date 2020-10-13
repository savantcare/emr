<template>
  <div>
    <div v-if="cfNumberOfNotesToCompare > 1">
      <el-drawer :visible.sync="dUidrawerToShowComparisonOf2Notes" direction="ttb" size="90%">
        <el-row>
          <el-col :span="12"
            ><apptNotePrintableView
              :propShowNoteForApptId="firstNoteForComparisonClientSideUniqRowId"
              :propComparisonNoteApptId="secondNoteForComparisonClientSideUniqRowId"
              key="2"
            /> </el-col
          ><el-col :span="12"
            ><apptNotePrintableView
              :propShowNoteForApptId="secondNoteForComparisonClientSideUniqRowId"
              :propComparisonNoteApptId="firstNoteForComparisonClientSideUniqRowId"
              key="5"
          /></el-col>
        </el-row>
      </el-drawer>
    </div>
    <div v-else>
      <apptNotePrintableView :propShowNoteForApptId="firstNoteForComparisonClientSideUniqRowId" />
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
      firstNoteForComparisonClientSideUniqRowId: 0,
      secondNoteForComparisonClientSideUniqRowId: 0,
    }
  },

  components: { apptNotePrintableView },

  mounted: function () {},
  methods: {
    mfGetPrevAppt(pApptClientSideUniqRowId) {
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
    mfGetNextAppt(pApptClientSideUniqRowId) {
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
  },
  computed: {
    cfNumberOfNotesToCompare() {
      let numberOfNotesToCompare = 0
      const apptNoteComponentObj = clientSideTblOfLeftSideViewCards.find(2)
      console.log(apptNoteComponentObj)

      if (apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting']) {
        numberOfNotesToCompare++
        this.firstNoteForComparisonClientSideUniqRowId =
          apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting']
      }
      if (apptNoteComponentObj['secondParameterGivenToComponentBeforeMounting']) {
        numberOfNotesToCompare++
        this.secondNoteForComparisonClientSideUniqRowId =
          apptNoteComponentObj['secondParameterGivenToComponentBeforeMounting']
      }

      if (this.firstNoteForComparisonClientSideUniqRowId > 0) {
      } else {
        const apptObj = clientSideTblOfAppointments
          .query()
          .where('apptStatus', 'locked')
          .orWhere('apptStatus', 'unlocked')
          .orderBy('clientSideUniqRowId', 'desc')
          .get()

        console.log(apptObj)

        const updateState = clientSideTblOfLeftSideViewCards.update({
          clientSideUniqRowId: 2,
          currentDisplayStateOfComponent: 1,
          firstParameterGivenToComponentBeforeMounting: apptObj[0]['clientSideUniqRowId'],
        })

        this.firstNoteForComparisonClientSideUniqRowId = apptObj[0]['clientSideUniqRowId']
      }

      return numberOfNotesToCompare
    },
  },
}
</script>
