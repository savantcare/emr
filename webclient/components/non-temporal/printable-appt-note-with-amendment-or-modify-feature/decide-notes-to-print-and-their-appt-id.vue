<template>
  <div>
    <div v-if="cfNumberOfNotesToCompare.length > 1"></div>

    <div>
      <transition name="slide-fade" mode="out-in">
        <div :key="firstNoteForComparisonClientSideUniqRowId">
          {{ cfNumberOfNotesToCompare }}
          <el-drawer
            :visible.sync="dUidrawerToShowComparisonOf2Notes"
            direction="ttb"
            size="90%"
            @close="handleDrawerClosed()"
          >
            <el-row>
              <el-col :span="12"
                ><apptNotePrintableView
                  :propShowNoteForApptId="lowerValueForComparisonClientSideUniqRowId"
                  :key="lowerValueForComparisonClientSideUniqRowId"
                /> </el-col
              ><el-col :span="12"
                ><apptNotePrintableView
                  :propShowNoteForApptId="higherValueForComparisonClientSideUniqRowId"
                  :key="higherValueForComparisonClientSideUniqRowId"
              /></el-col>
            </el-row>
          </el-drawer>

          <apptNotePrintableView
            :propShowNoteForApptId="firstNoteForComparisonClientSideUniqRowId"
            :key="firstNoteForComparisonClientSideUniqRowId"
          />
        </div>
      </transition>
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
      firstNoteForComparisonClientSideUniqRowId: 0,
      secondNoteForComparisonClientSideUniqRowId: 0,
    }
  },

  components: { apptNotePrintableView },

  mounted: function () {},
  methods: {
    handleDrawerClosed() {
      // Once drawer is closed I need to empty the 2nd param so the prev and next button work properly and do not open the drawer
      const updateState = clientSideTblOfLeftSideViewCards.update({
        clientSideUniqRowId: 2,
        secondParameterGivenToComponentBeforeMounting: 0,
      })
    },
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
    lowerValueForComparisonClientSideUniqRowId() {
      if (
        this.firstNoteForComparisonClientSideUniqRowId >
        this.secondNoteForComparisonClientSideUniqRowId
      )
        return this.secondNoteForComparisonClientSideUniqRowId
      else {
        return this.firstNoteForComparisonClientSideUniqRowId
      }
    },
    higherValueForComparisonClientSideUniqRowId() {
      if (
        this.firstNoteForComparisonClientSideUniqRowId >
        this.secondNoteForComparisonClientSideUniqRowId
      )
        return this.firstNoteForComparisonClientSideUniqRowId
      else {
        return this.secondNoteForComparisonClientSideUniqRowId
      }
    },

    cfNumberOfNotesToCompare() {
      let numberOfNotesToCompare = 0
      const apptNoteComponentObj = clientSideTblOfLeftSideViewCards.find(2)
      console.log(apptNoteComponentObj)

      let noteIDs = new Array()

      if (apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting']) {
        numberOfNotesToCompare++
        this.firstNoteForComparisonClientSideUniqRowId =
          apptNoteComponentObj['firstParameterGivenToComponentBeforeMounting']

        noteIDs.push(this.firstNoteForComparisonClientSideUniqRowId)
      }
      if (apptNoteComponentObj['secondParameterGivenToComponentBeforeMounting']) {
        numberOfNotesToCompare++
        this.secondNoteForComparisonClientSideUniqRowId =
          apptNoteComponentObj['secondParameterGivenToComponentBeforeMounting']
        noteIDs.push(this.firstNoteForComparisonClientSideUniqRowId)
      }

      // If this ct was asked to display itself without the note ID then the high locked or unlockjed note id will be its ID
      if (this.firstNoteForComparisonClientSideUniqRowId > 0) {
      } else {
        const apptObj = clientSideTblOfAppointments
          .query()
          .where('apptStatus', 'locked')
          .orWhere('apptStatus', 'unlocked')
          .orderBy('clientSideUniqRowId', 'desc')
          .get()

        const updateState = clientSideTblOfLeftSideViewCards.update({
          clientSideUniqRowId: 2,
          currentDisplayStateOfComponent: 1,
          firstParameterGivenToComponentBeforeMounting: apptObj[0]['clientSideUniqRowId'],
        })

        this.firstNoteForComparisonClientSideUniqRowId = apptObj[0]['clientSideUniqRowId']
        noteIDs[0] = this.secondNoteForComparisonClientSideUniqRowId
      }

      if (noteIDs.length === 2) this.dUidrawerToShowComparisonOf2Notes = true

      return noteIDs
    },
  },
}
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
