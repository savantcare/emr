<template>
  <!-- SECTION 9 REMINDERS -->
  <div>
    <el-row
      type="flex"
      justify="left"
      class="remindersh3 sectionHeader"
      style="padding: 0rem; margin: 0rem"
    >
      <el-col :span="8" class="sectionHeading"> Reminders </el-col>
      <el-col :span="2"
        ><div class="grid-content">
          <el-popover placement="right" width="400" v-model="popoverVisible4">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAddendum(amendmentData, 'reminder')"
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
      </el-col>
    </el-row>
    <div :style="cfGetReminderStyle">
      <div v-for="row in cfArOfRemindersForDisplay[0]" :key="row.clientSideUniqRowId">
        {{ row['description'] }}
      </div>
      <br />
      <div
        v-if="
          cfArOfAddendumForDisplay('reminder') && cfArOfAddendumForDisplay('reminder').length > 0
        "
      >
        <h4>Addendum:</h4>
        <div v-for="row in cfArOfAddendumForDisplay('reminder')" :key="row.clientSideUniqRowId">
          <div style="margin: 5px 0">
            {{ row.description }}
            <br />
            <span style="font-size: 10px"
              >Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="debug">
      <hr />
      Debug data. <br />
      Conditions to show a reminder: <br />
      Condition 1: rem was created before the apptlock time(= ROW_END of appt) <br />
      Condition 2: rem was deleted (ROW_END of rem) after the apptlock time(= ROW_END of appt)
      <br />
      <hr />
      <div v-for="rem in cfArOfRemindersForDisplay[1]" :key="rem.clientSideUniqRowId">
        Loop start
        <hr />
        {{ rem }} <br />
        <hr />
        Condition 1: <br />
        Was this reminder created {{ rem['ROW_START'] | moment }} before the appt ended
        {{ patientCurrentApptObj['ROW_END'] | moment }} (Following should be +ve):
        {{ patientCurrentApptObj['ROW_END'] - rem['ROW_START'] }}
        <br />
        <hr />
        Condition 2: Reminder Deleted at: {{ rem['ROW_END'] | moment }} <br />
        Was this reminder deleted {{ rem['ROW_END'] }} after the appt ended
        {{ patientCurrentApptObj['ROW_END'] | moment }} (Following should be +ve):
        {{ rem['ROW_END'] - patientCurrentApptObj['ROW_END'] }}
        <br />
        <hr />
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
      let comparedApptObj = {}
      let comparedPsychReviewOfSystems = {}

      const apptNoteCardObj = clientSideTblOfLeftSideViewCards.find(2)

      // Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
      if (apptNoteCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        // Handle the case when the current ID matches with the second param Need to compare with first
        comparedApptObj = clientSideTblOfAppointments.find(
          apptNoteCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        comparedPsychReviewOfSystems = this.mfGetArOfPsychReviewOfSystems(comparedApptObj)
        if (
          comparedPsychReviewOfSystems.length >
          this.mfGetArOfPsychReviewOfSystems(this.currentApptObj).length
        ) {
          return 'border:1px solid #E6A23C'
        } else if (
          comparedPsychReviewOfSystems.length <
          this.mfGetArOfPsychReviewOfSystems(this.currentApptObj).length
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
        if (apptNoteCardObj['secondParameterGivenToComponentBeforeMounting']) {
          // Need to compare with second
          comparedApptObj = clientSideTblOfAppointments.find(
            apptNoteCardObj['secondParameterGivenToComponentBeforeMounting']
          )

          comparedPsychReviewOfSystems = this.mfGetArOfPsychReviewOfSystems(comparedApptObj)
          if (
            comparedPsychReviewOfSystems.length >
            this.mfGetArOfPsychReviewOfSystems(this.currentApptObj).length
          ) {
            return 'border:1px solid #E6A23C'
          } else if (
            comparedPsychReviewOfSystems.length <
            this.mfGetArOfPsychReviewOfSystems(this.currentApptObj).length
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
        .where('component', 'psychReviewOfSystems')
        .orderBy('ROW_START', 'asc')
        .get()

      console.log(arFromClientSideTblOfAddendums)
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
          .where('ROW_END', (value) => value > this.currentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.currentApptObj['ROW_END'])
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
