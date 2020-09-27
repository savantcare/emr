<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template></template>

<script>
import clientSideTblOfAppointments from '@/components/core/mts-view-layer-header/db/client-side/structure/appointment-client-side-table.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 100,
        apptProviderUUID: 1,
        apptStatus: 'locked',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 200,
        apptProviderUUID: 1,
        apptStatus: 'locked',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 300,
        apptProviderUUID: 1,
        apptStatus: 'locked',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 400,
        apptProviderUUID: 1,
        apptStatus: 'locked',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 500,
        apptProviderUUID: 1,
        apptStatus: 'locked',
      },
    })
  },
}
</script>
