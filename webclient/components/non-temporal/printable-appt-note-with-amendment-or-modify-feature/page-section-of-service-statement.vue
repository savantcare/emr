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
          <el-popover placement="right" width="400" v-model="visible1">
            <div style="text-align: right; margin: 0">
              <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
              <el-button
                v-if="amendmentData.length > 0"
                type="success"
                icon="el-icon-check"
                style="position: absolute; bottom: 15px; right: 15px"
                size="mini"
                @click="mfSaveAmendment(amendmentData, 'serviceStatements')"
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
      </el-col>
    </el-row>
    <div v-for="row in cfArOfServiceStatementForDisplay" :key="`ss-${row.clientSideUniqRowId}`">
      {{ row['tblServiceStatementsMasterLink']['serviceStatementCategory'] }}
      {{ row['tblServiceStatementsMasterLink']['serviceStatementDescription'] }}
    </div>
    <br />
    <div
      v-if="
        cfArOfAmendmentForDisplay('serviceStatements') &&
        cfArOfAmendmentForDisplay('serviceStatements').length > 0
      "
    >
      <h4>Amendment:</h4>
      <div
        v-for="row in cfArOfAmendmentForDisplay('serviceStatements')"
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
import clientSideTblOfAmendments from '~/components/1time-Mrow-1Field/amendment/db/client-side/structure/amendment-client-side-table.js'

export default {
  data() {
    return {
      patientCurrentApptObj: [],
      debug: false,
      amendmentData: '',
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      reminderDataAdded: null,
      drawerToShowComparisonOf2Notes: false,
      lastComparisonReminderArrayReceived: null,
      reminderArray: null,
      appointmentIdForThisNote: 0,
    }
  },
  props: {
    propApptStatus: String,
  },

  computed: {
    cfArOfServiceStatementForDisplay() {
      let arOfObjectsFromClientSideDB = []
      if (this.propApptStatus === 'unlocked') {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
          .query()
          .with('tblServiceStatementsMasterLink')
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
          .query()
          .with('tblServiceStatementsMasterLink')
          .where('ROW_END', (value) => value > this.patientCurrentApptObj['ROW_END'])
          .where('ROW_START', (value) => value < this.patientCurrentApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientSideDB
    },
    cfArOfAmendmentForDisplay() {
      const arFromClientSideTblOfAmendments = clientSideTblOfAmendments
        .query()
        .where('appointmentId', this.appointmentIdForThisNote)
        .orderBy('ROW_START', 'asc')
        .get()

      const arAmendments = []
      arFromClientSideTblOfAmendments.forEach((row) => {
        if (typeof arAmendments[row.component] === 'undefined') {
          arAmendments[row.component] = []
        }
        arAmendments[row.component].push(row)
      })

      /**
       * component is computed function parameter
       * ref: https://ednsquare.com/question/how-to-pass-parameters-in-computed-properties-in-vue-js-------MQVlHT
       */
      return (component) => arAmendments[`${component}`]
    },
  },
}
</script>
