<template>
  <div>
    
    <!-- this 10px is the distance between the card and all other 4 sides. -->

    <!--initialize appt computed function -->
    {{cfGetCurrentAppointmentDate}}

    <headerPaperNote :_apptId="patientCurrentAppointmentId" _entity="name" class="header_name_row"> </headerPaperNote>
    
    <topHeaderComponenet></topHeaderComponenet>


  </div>
</template>
<script>
import topHeaderComponenet from '@/components/papers/view-appt-note/lhs-split-area/header/sub-ct-container-design-using-card.vue'
import headerPaperNote from '@/components/papers/view-appt-note/lhs-split-area/section-2-header-arrows-name-comparison.vue'
import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: {
    topHeaderComponenet,
    headerPaperNote,
  },
  data() {
    return {
      patientCurrentAppointmentId: 0,
    }
  },
  computed: {
    cfGetCurrentAppointmentDate(){
      const patientCurrentApptId = commonForAllCts.find('patient-current-appt-id')
      if(patientCurrentApptId){
        this.patientCurrentAppointmentId = parseInt(patientCurrentApptId['fieldValue'])
      }
    }
  },
}
</script>
