<template>
  <!-- SECTION 5  SERVICE STATEMENTS -->
  <!-- min-height is set to 53px. This is because there is icon in the el-row which becomes visible on mouse hover on the row and without min-height in el-row it was fluctuating. -->
  <div>
    <el-row
      type="flex"
      justify="left"
      class="ssh3"
      style="padding-top: 20px; padding-bottom: 10px; min-height: 53px"
    >
      <el-col :span="8">
        <h3>Service statements</h3>
      </el-col>
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
                  @click="mfSaveAddendum(amendmentData, 'serviceStatements')"
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
              style="padding: 3px; color: #c0c4cc; border: none; display: none; float: left"
            ></el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- Goal: Show service statements -->
    <div
      v-for="row in mfGetArrayOfServiceStatements(this.currentApptObj)"
      :key="`ss-${row.clientSideUniqRowId}`"
      :style="cfGetServiceStatementStyle"
    >
      {{ row['tblServiceStatementsMasterLink']['serviceStatementCategory'] }}
      {{ row['tblServiceStatementsMasterLink']['serviceStatementDescription'] }}
    </div>
    <br />

    <!-- Goal: Show addendum if there is any -->
    <div
      v-if="
        cfArOfAddendumForDisplay('serviceStatements') &&
        cfArOfAddendumForDisplay('serviceStatements').length > 0
      "
    >
      <h4>Addendum:</h4>
      <div
        v-for="row in cfArOfAddendumForDisplay('serviceStatements')"
        :key="row.clientSideUniqRowId"
      >
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
</template>

<script>
// Data tables
import clientSideTblOfPatientServiceStatements from '@/components/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'
import clientSideTblOfAddendums from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'

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
    console.log('== FROM SS ==', this.propApptId)
    this.currentApptObj = await clientSideTblOfAppointments.find(this.propApptId)
    console.log(this.currentApptObj)
  },
  methods: {
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit service statement',
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
    mfGetArrayOfServiceStatements(pApptObj) {
      if (!pApptObj) return
      console.log(pApptObj)
      let arOfObjectsFromClientSideDB = []
      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
          .query()
          .with('tblServiceStatementsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
          .query()
          .with('tblServiceStatementsMasterLink')
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },
  },
  computed: {
    cfGetServiceStatementStyle() {
      const apptNoteCardObj = clientSideTblOfLeftSideViewCards.find(2)
      if (apptNoteCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        /* Need to compare with first */
        this.comparedApptObj = clientSideTblOfAppointments.find(
          apptNoteCardObj['firstParameterGivenToComponentBeforeMounting']
        )

        return 'border:1px solid #67C23A'
      } else {
        apptNoteCardObj['firstParameterGivenToComponentBeforeMounting'] === this.propApptId

        // there may or may not be a second paramters
        if (apptNoteCardObj['secondParameterGivenToComponentBeforeMounting']) {
          /* Need to compare with second */
          this.comparedApptObj = clientSideTblOfAppointments.find(
            apptNoteCardObj['secondParameterGivenToComponentBeforeMounting']
          )
          return 'border:1px solid #E6A23C'
        }

        /* Nothing to compare with */
      }
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
}
.ssh3:hover .el-icon-money {
  display: inline-block !important;
}
</style>
