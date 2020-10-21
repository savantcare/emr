<template>
  <!-- SECTION 9 REMINDERS -->
  <div>
    <el-row type="flex" justify="left" class="recommendationsh3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <el-col :span="9" class="sectionHeading">Plan comments</el-col>
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
                  @click="mfSaveAddendum(amendmentData, 'recommendation')"
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
          <div v-else>
            <el-button
              class="el-icon-money"
              size="mini"
              @click="mfOpenMultiEditCtInEditLayer"
              style="padding: 0px; color: #c0c4cc; border: none; display: none"
            ></el-button>
            <el-button
              class="el-icon-circle-plus-outline"
              size="mini"
              @click="mfOpenAddInEditLayer"
              style="padding: 0px; color: #c0c4cc; border: none; display: none"
            ></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div :style="cfGetReminderStyle">
      <div v-for="row in mfGetArOfRecommendations(this.currentApptObj)" :key="row.clientSideUniqRowId">
        {{ row['description'] }}
      </div>
      <br />
      <div v-if="cfArOfAddendumForDisplay && cfArOfAddendumForDisplay.length > 0">
        <h4>Addendum:</h4>
        <div v-for="row in cfArOfAddendumForDisplay" :key="row.clientSideUniqRowId">
          <div style="margin: 5px 0">
            {{ row.description }}
            <br />
            <span style="font-size: 10px">Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientSideTblOfAddendums from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientSideTblOfPatientRecommendations from '@/components/1time-Mrow-1Field/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

import moment from 'moment'

export default {
  data() {
    return {
      currentApptObj: {},
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
    cfGetReminderStyle() {
      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonRecommendations = {}

      const printableApptNoteComponentCardObj = clientSideTblOfLeftSideViewCards.find(2)

      // Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        // Handle the case when the current ID matches with the second param Need to compare with first
        secondaryDuringComparisonApptObj = clientSideTblOfAppointments.find(
          printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        secondaryDuringComparisonRecommendations = this.mfGetArOfRecommendations(secondaryDuringComparisonApptObj)
        if (
          secondaryDuringComparisonRecommendations.length > this.mfGetArOfRecommendations(this.currentApptObj).length
        ) {
          return 'border:1px solid #E6A23C'
        } else if (
          secondaryDuringComparisonRecommendations.length < this.mfGetArOfRecommendations(this.currentApptObj).length
        ) {
          return 'border:1px solid #67C23A'
        } else {
          return ''
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

          secondaryDuringComparisonRecommendations = this.mfGetArOfRecommendations(secondaryDuringComparisonApptObj)
          if (
            secondaryDuringComparisonRecommendations.length > this.mfGetArOfRecommendations(this.currentApptObj).length
          ) {
            return 'border:1px solid #E6A23C'
          } else if (
            secondaryDuringComparisonRecommendations.length < this.mfGetArOfRecommendations(this.currentApptObj).length
          ) {
            return 'border:1px solid #67C23A'
          } else {
            return
          }
        }
      }
      // Nothing to compare with
    },
    cfArOfAddendumForDisplay() {
      const arFromClientSideTblOfAddendums = clientSideTblOfAddendums
        .query()
        .where('appointmentId', this.propApptId)
        .where('component', 'recommendations')
        .orderBy('ROW_START', 'asc')
        .get()

      return arFromClientSideTblOfAddendums
    },
  },
  methods: {
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'multi edit recommendations',
      })
    },
    mfOpenAddInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'add recommendation',
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
    mfGetArOfRecommendations(pApptObj) {
      if (!pApptObj) return

      let arOfObjectsFromClientSideDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientRecommendations
          .query()
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientRecommendations
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      return arOfObjectsFromClientSideDB
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
}
</script>

<style scoped>
.recommendationsh3:hover .el-icon-money {
  display: inline-block !important;
  position: absolute;
}

.recommendationsh3:hover .el-icon-edit-outline {
  display: inline-block !important;
  position: absolute;
}

.recommendationsh3:hover .el-icon-circle-plus-outline {
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
.subSectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}
</style>
