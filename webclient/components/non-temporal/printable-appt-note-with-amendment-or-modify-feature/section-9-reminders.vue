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
          <el-popover placement="right" width="400" v-model="isAddendumPopoverVisible">
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
      <div v-for="row in mfGetArOfReminders(this.currentApptObj)" :key="row.clientSideUniqRowId">
        {{ row['description'] }}
      </div>
      <br />
      <div v-if="cfArOfAddendumForDisplay && cfArOfAddendumForDisplay.length > 0">
        <h4>Addendum:</h4>
        <div v-for="row in cfArOfAddendumForDisplay" :key="row.clientSideUniqRowId">
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
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientSideTblOfPatientReminders from '@/components/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'

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
    cfGetReminderStyle() {
      return 'border:1px solid #67C23A'
    },
    cfArOfAddendumForDisplay() {
      const arFromClientSideTblOfAddendums = clientSideTblOfAddendums
        .query()
        .where('appointmentId', this.propApptId)
        .where('component', 'reminders')
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
    mfGetArOfReminders(pApptObj) {
      if (!pApptObj) return

      let userSelectedApptReminderArray = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        userSelectedApptReminderArray[0] = clientSideTblOfPatientReminders
          .query()
          .where('ROW_END', 2147483648000)
          .get()
      } else {
        userSelectedApptReminderArray[0] = clientSideTblOfPatientReminders
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }

      // The following line is used for debugging
      if (this.debug) {
        userSelectedApptReminderArray[1] = clientSideTblOfPatientReminders.query().get()
      }

      this.reminderArray = userSelectedApptReminderArray
      return userSelectedApptReminderArray
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
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
