<!-- Ref
https://stackoverflow.com/questions/47893905/draw-a-line-in-css-between-fa-icons
-->
<template>
  <div class="content-wrap">
    <clientSideTblOfAppointmentsInsertData />
    <div v-for="appt in cfAllAppointments" :key="appt.clientSideUniqRowId">
      <el-tooltip
        class="item"
        effect="light"
        :content="appt.toolTip"
        placement="top-end"
        :open-delay="500"
      >
        <template v-if="appt.clientSideUniqRowId === dCurrentActiveButtonClientSideRowId">
          <el-button
            :type="dButtonTypes[appt.apptStatus]"
            :class="dIconClass[appt.apptStatus]"
            :plain="false"
            circle
            size="mini"
            icon1
            @click="handleClickEvent(appt.clientSideUniqRowId, appt.apptStatus)"
          ></el-button>
        </template>
        <template v-else>
          <el-button
            :type="dButtonTypes[appt.apptStatus]"
            :class="dIconClass[appt.apptStatus]"
            :plain="true"
            circle
            size="mini"
            icon1
            @click="handleClickEvent(appt.clientSideUniqRowId, appt.apptStatus)"
          ></el-button>
        </template>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import clientSideTblOfMultiStateViewCards from '@/components/core/mts-view-layer-cards/db/client-side/structure/mts-table.js'
import clientSideTblOfAppointmentsInsertData from '@/components/pt-info/single/1time-Mrow-mField/appointments/db/client-side/static-data/insert-into-appointment-client-side-table'
import clientSideTblOfAppointments from '@/components/pt-info/single/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

export default {
  data() {
    return {
      dCurrentActiveButtonClientSideRowId: 0,
      dButtonTypes: [],
      dIconClass: [],
    }
  },
  components: { clientSideTblOfAppointmentsInsertData },
  mounted: function () {
    this.dButtonTypes['late-cancellation'] = 'danger'
    this.dButtonTypes['cancellation'] = 'warning'
    this.dButtonTypes['no-show'] = 'danger'
    this.dButtonTypes['un-locked'] = 'success'
    this.dButtonTypes['locked'] = 'success'

    this.dIconClass['un-locked'] = 'el-icon-unlock'
    this.dIconClass['locked'] = 'el-icon-lock'
  },
  computed: {
    cfAllAppointments() {
      const arOfObjectsFromClientSideDB = clientSideTblOfAppointments.query().get()

      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arOfObjectsFromClientSideDB[i]['toolTip'] =
          'On ' +
          arOfObjectsFromClientSideDB[i]['apptStartMilliSecondsOnCalendar'] +
          ' ' +
          arOfObjectsFromClientSideDB[i]['apptStatus']

        if (arOfObjectsFromClientSideDB[i].apptStatus === 'locked') {
          arOfObjectsFromClientSideDB[i]['toolTip'] =
            arOfObjectsFromClientSideDB[i]['toolTip'] +
            ' by ' +
            arOfObjectsFromClientSideDB[i]['apptProviderUUID']
        }

        if (arOfObjectsFromClientSideDB[i].apptStatus.includes('un-locked')) {
          arOfObjectsFromClientSideDB[i]['toolTip'] =
            arOfObjectsFromClientSideDB[i]['toolTip'] +
            ' Provider: ' +
            arOfObjectsFromClientSideDB[i]['apptProviderUUID']
        }
      }
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    async handleClickEvent(pClientSideRowId, pApptStatus) {
      // Goal: When late-camcellatoon no-show or cancellation then no need to show the PDF
      if (pApptStatus === 'late-cancellation') return
      if (pApptStatus === 'no-show') return
      if (pApptStatus === 'cancellation') return

      // id 2 is 'Appt note' See: insert-into-appointment-client-side-table:22
      const apptNoteComponentVisibilityCurrentValue = clientSideTblOfMultiStateViewCards.find(2)

      // Goal: Keep the button highlighted that has been clicked
      if (
        apptNoteComponentVisibilityCurrentValue['componentCurrentValueForCustomizingViewState'] ===
        pClientSideRowId
      ) {
        // This case is when the button was already active. And clicking it should make it in-active
        this.dCurrentActiveButtonClientSideRowId = 0
      } else {
        // This case is when the button was not active. And clicking it should make it Active
        this.dCurrentActiveButtonClientSideRowId = pClientSideRowId
      }

      // This update will lead to the note card visibility getting toggled
      // Writing this in client Side DB since appt-note-view-in-printable-state component depends on this data.
      const updateState = await clientSideTblOfMultiStateViewCards.update({
        clientSideUniqRowId: 2,
        componentCurrentValueForCustomizingViewState: this.dCurrentActiveButtonClientSideRowId,
      })
    },
  },
}
</script>

<style scoped>
.content-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1em;
  overflow: hidden;
}

.content-wrap::before {
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  left: 0;
  content: '';
  background-color: grey;
  height: 2px;
}

.icon1 {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  font-size: 3rem;
  color: #777;
  border: 2px solid #777777;
  border-radius: 50%;
  padding: 1rem;
  background: #f9f9f9;
  box-shadow: 0 0 0 0.5em #f9f9f9;
}
</style>
