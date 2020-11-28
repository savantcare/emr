<!-- Reference implementation -->
<!-- To understand how this works show-auto-complete-search-box-and-handle-search-selection.vue -->
<template></template>

<script>
import clientTblOfAppointments from '@/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'
// This will become dynamic

export default {
  data() {
    return {}
  },
  /**
   * Why we use created() instead of mounted() ?
   * --
   * Problem: In the mounted section of 'section-19-allow-note-lock.vue' file, there is a query to fetch appointment.
   * In this case the query trying to fetch data from appointment table before the load initial data in that table.
   *
   * Solution: On the page load, insert appointment initial data before the mounted hook called.
   *
   * The created hook is run before the mounted hook is run.
   * And in the created hook, nearly everything in the component has been setup. The only thing missing is the DOM.
   *
   * Ref: https://michaelnthiessen.com/call-method-on-page-load/
   */
  created() {
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
