<!-- Reference implementation -->
<!-- To understand how this works call-insert-search-phases-of-components-and-handle-selection.vue -->
<template></template>

<script>
import clientSideTblOfAppointments from '@/components/ptinfo-single/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'
// This will become dynamic

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601725467558,
        ROW_END: 1601726467558, // This is the time when the appt has been locked. This happens when the row is deleted.
        apptProviderUUID: 1,
        apptStatus: 'locked',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601726577658,
        ROW_END: 1601726667558,
        apptProviderUUID: 1,
        apptStatus: 'no-show',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601727477758,
        ROW_END: 1601726767558,
        apptProviderUUID: 1,
        apptStatus: 'late-cancellation',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601728477858,
        ROW_END: 1601726867558,
        apptProviderUUID: 1,
        apptStatus: 'cancellation',
      },
    })
    clientSideTblOfAppointments.insert({
      data: {
        apptStartMilliSecondsOnCalendar: 1601729677958,
        ROW_END: 1601726967558,
        apptProviderUUID: 1,
        apptStatus: 'un-locked',
      },
    })
  },
}
</script>
