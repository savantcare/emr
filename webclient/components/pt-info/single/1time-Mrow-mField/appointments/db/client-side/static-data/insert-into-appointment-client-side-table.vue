<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template></template>

<script>
import clientSideTblOfAppointments from '@/components/pt-info/single/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
// This will become dynamic

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601726467558,
        apptProviderUUID: 1,
        apptStatus: 'locked',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601726477658,
        apptProviderUUID: 1,
        apptStatus: 'no-show',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601726477758,
        apptProviderUUID: 1,
        apptStatus: 'late-cancellation',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601726477858,
        apptProviderUUID: 1,
        apptStatus: 'cancellation',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601726677958,
        apptProviderUUID: 1,
        apptStatus: 'un-locked',
      },
    })
  },
}
</script>
