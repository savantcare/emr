<template>
  <!-- SECTION 5  past psych history -->
  <!-- min-height is set to 53px. This is because there is icon in the el-row which becomes visible on mouse hover on the row and without min-height in el-row it was fluctuating. -->
  <div>
    <el-row type="flex" justify="left" class="ssh3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <el-col :span="9" class="sectionHeading">Past psych history</el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <div v-if="currentApptObj['apptStatus'] === 'locked'">
            <!-- Show area to add addendum -->
            <el-popover placement="right" width="400" v-model="isAddendumPopoverVisible">
              <div style="text-align: right; margin: 0">
                <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
                <el-button
                  v-if="amendmentData.length > 0"
                  type="success"
                  icon="el-icon-check"
                  style="position: absolute; bottom: 15px; right: 15px"
                  size="mini"
                  @click="mfSaveAddendum(amendmentData, 'PastPsychHistory')"
                  circle
                ></el-button>
              </div>
              <el-button
                slot="reference"
                class="el-icon-edit-outline"
                size="mini"
                style="padding: 0px; color: #c0c4cc; border: none; display: none; float: left"
              ></el-button>
            </el-popover>
          </div>
          <div v-else>
            <el-button
              class="el-icon-money"
              size="mini"
              @click="mfOpenMultiEditCtInEditLayer"
              style="padding: 0px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- Goal: Show past psych history -->
    <div :style="cfGetPastPsychHistorytyle">
      <div v-for="row in mfGetArrayOfPastPsychHistory(this.currentApptObj)" :key="`ss-${row.clientSideUniqRowId}`">
        {{ row['tblPastPsychHistoryMasterLink']['pastPsychHistoryCategory'] }}:
        {{ row['fieldValue'] }}
      </div>
    </div>
    <!-- Goal: Show addendum if there is any -->
    <div v-if="cfArOfAddendumForDisplay('PastPsychHistory') && cfArOfAddendumForDisplay('PastPsychHistory').length > 0">
      <h4>Addendum:</h4>
      <div v-for="row in cfArOfAddendumForDisplay('PastPsychHistory')" :key="row.clientSideUniqRowId">
        <div style="margin: 5px 0">
          {{ row.description }}
          <br />
          <span style="font-size: 10px">Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Data tables
import clientSideTblOfAddendums from '~/components/1time-oneField-multiValues/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientSideTblOfPatientPastPsychHistory from '@/components/1time-eachField-1value/past-psych-history/db/client-side/structure/patient-table-of-past-psych-history.js'
import clientSideTblOfMasterPastPsychHistory from '@/components/1time-eachField-1value/past-psych-history/db/client-side/structure/master-table-of-past-psych-history.js'

export default {
  data() {
    return {
      currentApptObj: [],
      debug: false,
      amendmentData: '',
      isAddendumPopoverVisible: false,
    }
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  async mounted() {
    if (!this.propApptId === 0) {
      return
    }
    this.currentApptObj = await clientSideTblOfAppointments.find(this.propApptId)
  },
  methods: {
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit past psych history',
      })
    },
    mfSaveAddendum(pAddendumData, component) {
      clientSideTblOfAddendums.insert({
        data: {
          appointmentId: this.currentApptObj.clientSideUniqRowId,
          component: component,
          description: pAddendumData,
          ROW_START: Math.floor(Date.now()),
        },
      })

      // remove modal value after save
      this.amendmentData = ''
    },
    mfGetArrayOfPastPsychHistory(pApptObj) {
      if (!pApptObj) return
      let arOfObjectsFromClientSideDB = []
      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientPastPsychHistory
          .query()
          .with('tblPastPsychHistoryMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientPastPsychHistory
          .query()
          .with('tblPastPsychHistoryMasterLink')
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },
  },
  computed: {
    cfGetPastPsychHistorytyle() {
      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonSS = {}

      const printableApptNoteComponentCardObj = clientSideTblOfLeftSideViewCards.find(2)

      // Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        // This means that the current note is to the right in the comparison UI
        // Handle the case when the current ID matches with the second param Need to compare with first
        secondaryDuringComparisonApptObj = clientSideTblOfAppointments.find(
          printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        secondaryDuringComparisonSS = this.mfGetArrayOfPastPsychHistory(secondaryDuringComparisonApptObj)
        if (secondaryDuringComparisonSS.length > this.mfGetArrayOfPastPsychHistory(this.currentApptObj).length) {
          return 'border:1px solid #E6A23C'
        } else if (secondaryDuringComparisonSS.length < this.mfGetArrayOfPastPsychHistory(this.currentApptObj).length) {
          return 'border:1px solid #67C23A'
        } else {
          /* The length of MSE on left and right is same. This 90% probability means that they are same. ONLY on right the MSE should be in light grey color.
           There are 2 possibilities this.propApptId appears on left or right.
           this.propApptId is equqal to printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] 
           Hence it will appear on right if:
           this.propApptId is greateer then printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
          */
          if (this.propApptId > printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting'])
            return 'color:grey;'
        }
      } else {
        //
        // Case when this appt is not the 2nd param so it is the first param
        //

        // there may or may not be a second paramters. If no second parameter then there is no comparison to be made
        if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']) {
          // Need to compare with second
          secondaryDuringComparisonApptObj = clientSideTblOfAppointments.find(
            printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']
          )

          secondaryDuringComparisonSS = this.mfGetArrayOfPastPsychHistory(secondaryDuringComparisonApptObj)
          if (secondaryDuringComparisonSS.length > this.mfGetArrayOfPastPsychHistory(this.currentApptObj).length) {
            return 'border:1px solid #E6A23C'
          } else if (
            secondaryDuringComparisonSS.length < this.mfGetArrayOfPastPsychHistory(this.currentApptObj).length
          ) {
            return 'border:1px solid #67C23A'
          } else {
            /* The length of psych ros on left and right is same. This 90% probability means that they are same. On right the psych ros should be in light grey color.
             There are 2 possibilities this.propApptId appears on left or right.
             this.propApptId will appear on right if it is greateer then printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
             */
            if (this.propApptId > printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'])
              return 'color:grey;'
          }
        }
      }
      // Nothing to compare with
    },

    cfArOfAddendumForDisplay() {
      const arFromClientSideTblOfAddendums = clientSideTblOfAddendums
        .query()
        .where('appointmentId', this.propApptId)
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
  },
}
</script>

<style scoped>
.ssh3:hover .el-icon-edit-outline {
  display: inline-block !important;
  position: absolute;
}
.ssh3:hover .el-icon-money {
  display: inline-block !important;
  position: absolute;
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
  color: #606266;
}
</style>
