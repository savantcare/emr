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
        <template v-if="appt.clientSideUniqRowId === currentActiveButtonClientSideRowId">
          <el-button
            :type="appt.buttonType"
            :class="appt.iconClass"
            :plain="false"
            circle
            size="mini"
            icon1
            @click="handleClickEvent(appt.clientSideUniqRowId, appt.apptStatus)"
          ></el-button>
        </template>
        <template v-else>
          <el-button
            :type="appt.buttonType"
            :class="appt.iconClass"
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
import clientSideTblOfAppointments from '@/components/core/mts-view-layer-header/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfAppointmentsInsertData from '@/components/core/mts-view-layer-header/db/client-side/static-data/insert-into-appointment-client-side-table.vue'

export default {
  data() {
    return {
      currentActiveButtonClientSideRowId: 0,
    }
  },
  components: { clientSideTblOfAppointmentsInsertData },
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
          arOfObjectsFromClientSideDB[i]['buttonType'] = 'success'
          arOfObjectsFromClientSideDB[i]['toolTip'] =
            arOfObjectsFromClientSideDB[i]['toolTip'] +
            ' by ' +
            arOfObjectsFromClientSideDB[i]['apptProviderUUID']

          arOfObjectsFromClientSideDB[i]['iconClass'] = 'el-icon-lock'
        } else if (arOfObjectsFromClientSideDB[i].apptStatus === 'un-locked') {
          arOfObjectsFromClientSideDB[i]['buttonType'] = 'success'
          arOfObjectsFromClientSideDB[i]['toolTip'] +
            ' Provider: ' +
            arOfObjectsFromClientSideDB[i]['apptProviderUUID']
          arOfObjectsFromClientSideDB[i]['iconClass'] = 'el-icon-unlock'
        } else if (arOfObjectsFromClientSideDB[i].apptStatus === 'late-cancellation') {
          arOfObjectsFromClientSideDB[i]['buttonType'] = 'danger'
        } else if (arOfObjectsFromClientSideDB[i].apptStatus === 'no-show') {
          arOfObjectsFromClientSideDB[i]['buttonType'] = 'danger'
        } else {
          arOfObjectsFromClientSideDB[i]['buttonType'] = 'warning'
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
        this.currentActiveButtonClientSideRowId = 0
      } else {
        // This case is when the button was not active. And clicking it should make it Active
        this.currentActiveButtonClientSideRowId = pClientSideRowId
      }

      // This update will lead to the note card visibility getting toggled
      // Writing this in client Side DB since appt-note-view-in-printable-state component depends on this data.
      const updateState = await clientSideTblOfMultiStateViewCards.update({
        clientSideUniqRowId: 2,
        componentCurrentValueForCustomizingViewState: this.currentActiveButtonClientSideRowId,
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
