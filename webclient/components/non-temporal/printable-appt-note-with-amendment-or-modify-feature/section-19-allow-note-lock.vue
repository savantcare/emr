<template>
  <!-- SECTION 13 -->
  <div v-if="currentApptObj['apptStatus'] !== 'locked'">
    <br /><br />
    <div style="display: flex; justify-content: center">
      <el-button @click="lockButtonClicked" type="primary">Reviewed - Lock the note </el-button>
    </div>
  </div>
</template>

<script>
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'

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
    this.currentApptObj = await clientTblOfAppointments.find(this.propApptId)
  },

  methods: {
    async lockButtonClicked() {
      console.log('lock button clicked')
      const clientSideUniqRowId = this.currentApptObj['clientSideUniqRowId']
      let arOfObjectsFromClientDB = await clientTblOfAppointments.update({
        where: clientSideUniqRowId,
        data: {
          apptStatus: 'locked',
          ROW_END: Math.floor(Date.now()), // The query sent to server is "delete"
        },
      })

      // In case there are no more appt then insert a appt. This is for testing.
      arOfObjectsFromClientDB = await clientTblOfAppointments.query().where('apptStatus', 'unlocked').get()

      let newAppt = {}

      if (arOfObjectsFromClientDB.length === 0) {
        newAppt = await clientTblOfAppointments.insert({
          data: {
            apptStartMilliSecondsOnCalendar: Math.floor(Date.now()),
            apptProviderUuid: 1,
            apptStatus: 'unlocked',
            ROW_START: Math.floor(Date.now()),
          },
        })
      }

      const newApptObj = newAppt['tblAppointments'][0]

      const newApptId = newApptObj['clientSideUniqRowId']

      // Go to the next appt on the slider
      const updateState = await clientTblOfLeftSideViewCards.update({
        clientSideUniqRowId: 2,
        firstParameterGivenToComponentBeforeMounting: newApptId,
      })
    },
  },
}
</script>

<style scoped></style>
