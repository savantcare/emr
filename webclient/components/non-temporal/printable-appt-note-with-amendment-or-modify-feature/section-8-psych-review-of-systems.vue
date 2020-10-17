<template>
  <div>
    <!-- SECTION 8 Psych review of systems  -->
    <el-row type="flex" justify="left" class="prosh3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <el-col :span="8" class="sectionHeading">Psych review of systems </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <div v-if="currentApptObj['apptStatus'] === 'locked'">
            <el-popover placement="right" width="400" v-model="isAddendumPopoverVisible">
              <div style="text-align: right; margin: 0">
                <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
                <el-button
                  v-if="amendmentData.length > 0"
                  type="success"
                  icon="el-icon-check"
                  style="position: absolute; bottom: 15px; right: 15px"
                  size="mini"
                  @click="mfSaveAddendum(amendmentData, 'psychReviewOfSystems')"
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
    <div :style="cfGetPsychReviewOfSystemsStyle">
      <div v-for="row in mfGetArOfPsychReviewOfSystems(this.currentApptObj)" :key="`ros - ${row.clientSideUniqRowId}`">
        {{ row['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsCategory'] }}
        {{ row['tblPsychReviewOfSystemsMasterLink']['psychReviewOfSystemsDescription'] }}
      </div>
    </div>
    <div v-if="cfArOfAddendumForDisplay && cfArOfAddendumForDisplay.length > 0">
      <div class="subSectionHeader">Addendum:</div>
      <div v-for="row in cfArOfAddendumForDisplay" :key="row.clientSideUniqRowId">
        <div style="margin: 5px 0">
          {{ row.description }}
          <span style="font-size: 10px; float: right"
            >(Added by {{ row.addedBy }} at {{ row.ROW_START | moment }})</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientSideTblOfAddendums from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfPsychReviewOfSystems from '@/components/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import moment from 'moment'

export default {
  data() {
    return {
      currentApptObj: {},
      debug: false,
      amendmentData: '',
      isAddendumPopoverVisible: false,
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm a')
    },
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
  computed: {
    cfGetPsychReviewOfSystemsStyle() {
      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonPsychReviewOfSystems = {}

      const printableApptNoteComponentCardObj = clientSideTblOfLeftSideViewCards.find(2)

      /* Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
        First comparing this.propApptId with 2nd parameter as that would mean there is a comparison going on.
        If this.propApptId matches the 1st parameter there may or may not be a comparison going on.
      */
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        // This is the case when this.propApptId matches with the second param Need to compare with first
        secondaryDuringComparisonApptObj = clientSideTblOfAppointments.find(
          printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        secondaryDuringComparisonPsychReviewOfSystems = this.mfGetArOfPsychReviewOfSystems(
          secondaryDuringComparisonApptObj
        )
        if (
          secondaryDuringComparisonPsychReviewOfSystems.length >
          this.mfGetArOfPsychReviewOfSystems(this.currentApptObj).length
        ) {
          return 'border:1px solid #E6A23C'
        } else if (
          secondaryDuringComparisonPsychReviewOfSystems.length <
          this.mfGetArOfPsychReviewOfSystems(this.currentApptObj).length
        ) {
          return 'border:1px solid #67C23A'
        } else {
          // The length of psych ros on left and right is same. This 90% probability means that they are same. On right the psych ros should be in light grey color.
          // There are 2 possibilities this.propApptId appears on left or right.
          // this.propApptId will appear on right if it is greateer then printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
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

          secondaryDuringComparisonPsychReviewOfSystems = this.mfGetArOfPsychReviewOfSystems(
            secondaryDuringComparisonApptObj
          )
          if (
            secondaryDuringComparisonPsychReviewOfSystems.length >
            this.mfGetArOfPsychReviewOfSystems(this.currentApptObj).length
          ) {
            return 'border:1px solid #E6A23C'
          } else if (
            secondaryDuringComparisonPsychReviewOfSystems.length <
            this.mfGetArOfPsychReviewOfSystems(this.currentApptObj).length
          ) {
            return 'border:1px solid #67C23A'
          } else {
            // The length of psych ros on left and right is same. This 90% probability means that they are same. On right the psych ros should be in light grey color.
            // There are 2 possibilities this.propApptId appears on left or right.
            // this.propApptId will appear on right if it is greateer then printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
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
        .where('component', 'psychReviewOfSystems')
        .orderBy('ROW_START', 'asc')
        .get()

      return arFromClientSideTblOfAddendums
    },
  },
  methods: {
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit psych review of systems',
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
    mfGetArOfPsychReviewOfSystems(pApptObj) {
      if (!pApptObj) return

      let arOfObjectsFromClientSideDB = []
      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPsychReviewOfSystems
          .query()
          .with('tblPsychReviewOfSystemsMasterLink')
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },
  },
}
</script>

<style scoped>
.prosh3:hover .el-icon-edit-outline {
  display: inline-block !important;
  position: absolute;
}

.prosh3:hover .el-icon-money {
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
  font-weight: bold;
}
.subSectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}
</style>
