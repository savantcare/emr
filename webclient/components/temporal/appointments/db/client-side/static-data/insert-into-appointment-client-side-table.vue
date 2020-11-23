<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template></template>

<script>
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'
// This will become dynamic

export default {
  data() {
    return {}
  },
  mounted() {
    clientTblOfAppointments.insert({
      data: {
        apptStartMilliSecsOnCalendar: 1601725467558,
        ROW_END: 1601726467558, // This is the time when the appt has been locked. This happens when the row is deleted.
        apptProviderUuid: 1,
        apptStatus: 'locked',
      },
    })
    clientTblOfAppointments.insert({
      data: {
        apptStartMilliSecsOnCalendar: 1601726577658,
        ROW_END: 1601726667558,
        apptProviderUuid: 1,
        apptStatus: 'no-show',
      },
    })
    clientTblOfAppointments.insert({
      data: {
        apptStartMilliSecsOnCalendar: 1601727477758,
        ROW_END: 1601726767558,
        apptProviderUuid: 1,
        apptStatus: 'late-cancellation',
      },
    })
    clientTblOfAppointments.insert({
      data: {
        apptStartMilliSecsOnCalendar: 1601728477858,
        ROW_END: 1601726867558, // This is the time when the record was deleted.
        apptProviderUuid: 1,
        apptStatus: 'cancellation',
      },
    })
    clientTblOfAppointments.insert({
      data: {
        apptStartMilliSecsOnCalendar: 1601729677958,
        ROW_END: 2147483648000, // unlocked means the record has not been deleted
        apptProviderUuid: 1,
        apptStatus: 'unlocked',
      },
    })
  },
}
</script>
