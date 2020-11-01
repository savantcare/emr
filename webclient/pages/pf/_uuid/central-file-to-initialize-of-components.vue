<template>
  <div>
    <!-- Mount the Cts so I can get the search terms inside the ORM -->

    <!-- core -->
    <initializeClearComponent />

    <!-- combined -->
    <initializeFeedComponent />
    <initializeMapComponent />

    <!-- temporal/PII -->
    <initializeDobComponent />
    <initializeNameComponent />

    <!-- START: Each field can take multiple values at 1 time in the temporal database -->
    <initializeAllergiesComponent />
    <initializeChiefComplaintComponent />
    <initializeFamilyHistoryComponent />
    <initializeMiscNotesComponent />
    <initializePlanCommentsComponent />
    <initializeProcessNotesComponent />
    <initializeRecComponent />
    <initializeRemComponent />
    <initializeGoalComponent />
    <initializeScreenComponent />
    <initializePhoneNumberComponent />

    <!-- END -->

    <!-- At one time a set of fields has 1 value -->
    <initializeMseComponent />
    <initializePhq9Component />
    <initializeProsComponent />
    <initializeServiceStatementComponent />
    <initializePastPsychHistoryComponent />
    <initializeMedicalReviewOfSystemsComponent />

    <!--
    <initializeBloodPressureComponent />
    <initializeBloodSugarComponent />
    <initializeBmComponent />
    <initializeHeightComponent />
    <initializeOxygenSaturationComponent />
    <initializePulseComponent />
    <initializeTemperatureComponent />
    <initializeWaistCircumferenceComponent />
    <initializeWeightComponent />
-->
    <initializeDiagnosisComponent />

    <clientTblOfAppointmentsInsertData />
  </div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

// Goal: Get the search terms from each component

// core
import initializeClearComponent from '@/components/non-temporal/clear/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// combined
import initializeFeedComponent from '@/components/non-temporal/feed/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeMapComponent from '@/components/non-temporal/map/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// temporal/PII
import initializeDobComponent from '@/components/temporal/date-of-birth/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeNameComponent from '@/components/temporal/name/db/client-side/initialize-on-first-load.vue'

// temporal/body-measurement
/*
import initializeBloodPressureComponent from '@/components/temporal/vital-signs/sub-cts/blood-pressure-levels/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeBloodSugarComponent from '@/components/temporal/vital-signs/sub-cts/blood-sugar-levels/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeBmComponent from '@/components/temporal/vital-signs/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeHeightComponent from '@/components/temporal/vital-signs/sub-cts/height/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeOxygenSaturationComponent from '@/components/temporal/vital-signs/sub-cts/oxygen-saturation/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializePulseComponent from '@/components/temporal/vital-signs/sub-cts/pulse/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeTemperatureComponent from '@/components/temporal/vital-signs/sub-cts/temperature/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeWaistCircumferenceComponent from '@/components/temporal/vital-signs/sub-cts/waist-circumference/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeWeightComponent from '@/components/temporal/vital-signs/sub-cts/weight/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
*/

// temporal/others
import initializeMseComponent from '@/components/temporal/mental-status-exam/db/client-side/initialize-on-first-load.vue'
import initializePhq9Component from '@/components/temporal/phq9/db/client-side/initialize-on-first-load.vue'
import initializeProsComponent from '@/components/temporal/psych-review-of-system/db/client-side/initialize-on-first-load.vue'

// START: Each field can take multiple values at 1 time in the temporal database
import initializeAllergiesComponent from '@/components/temporal/allergies/db/client-side/initialize-on-first-load.vue'
import initializeChiefComplaintComponent from '~/components/temporal/chief-complaint/db/client-side/initialize-on-first-load.vue'
import initializeFamilyHistoryComponent from '@/components/temporal/family-history/db/client-side/initialize-on-first-load.vue'
import initializeMiscNotesComponent from '~/components/temporal/miscellaneous-notes/db/client-side/initialize-on-first-load.vue'
import initializePlanCommentsComponent from '~/components/temporal/plan-comments/db/client-side/initialize-on-first-load.vue'
import initializeProcessNotesComponent from '~/components/temporal/process-notes/db/client-side/initialize-on-first-load.vue'
import initializeRecComponent from '@/components/temporal/recommendations/db/client-side/initialize-on-first-load.vue'
import initializeRemComponent from '@/components/temporal/reminders/db/client-side/initialize-on-first-load.vue'
import initializeGoalComponent from '@/components/temporal/goals/db/client-side/initialize-on-first-load.vue'

import initializeScreenComponent from '@/components/temporal/screens/db/client-side/initialize-on-first-load.vue'

// END

import initializeServiceStatementComponent from '@/components/temporal/service-statements/db/client-side/initialize-on-first-load.vue'

import initializePastPsychHistoryComponent from '@/components/temporal/past-psych-history/db/client-side/initialize-on-first-load.vue'

import initializeMedicalReviewOfSystemsComponent from '@/components/temporal/medical-review-of-system/db/client-side/initialize-on-first-load.vue'

// 1time-Mrow-mField
import initializePhoneNumberComponent from '@/components/temporal/phone-numbers/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeDiagnosisComponent from '@/components/temporal/diagnosis/db/client-side/static-data/insert-into-master-of-search-phrases-ct'

import clientTblOfDynamicCards from '@/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'

import clientTblOfAppointmentsInsertData from '@/components/temporal/appointments/db/client-side/static-data/insert-into-appointment-client-side-table'

export default {
  components: {
    // At one time a field has single value
    initializeServiceStatementComponent,
    initializePastPsychHistoryComponent,
    initializeMedicalReviewOfSystemsComponent,
    initializeDiagnosisComponent,
    initializeDobComponent,
    initializeNameComponent,
    /*   initializeBloodPressureComponent,
    initializeBloodSugarComponent,
    initializeBmComponent,
    initializeHeightComponent,
    initializeOxygenSaturationComponent,
    initializePulseComponent,
    initializeTemperatureComponent,
    initializeWaistCircumferenceComponent,
    initializeWeightComponent,
    */
    initializeMseComponent,
    initializePhq9Component,
    initializeProsComponent,

    // START: Each field can take multiple values at 1 time in the temporal database
    initializeAllergiesComponent,
    initializeChiefComplaintComponent,
    initializeFamilyHistoryComponent,
    initializeMiscNotesComponent,
    initializePlanCommentsComponent,
    initializeProcessNotesComponent,
    initializeRecComponent,
    initializeRemComponent,
    initializeGoalComponent,
    initializeScreenComponent,
    initializePhoneNumberComponent,
    // END

    // Non temporal
    clientTblOfAppointmentsInsertData,
    initializeFeedComponent,
    initializeMapComponent,
    initializeClearComponent,
  },
  mounted() {},
  methods: {},
}
</script>
