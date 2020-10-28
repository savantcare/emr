<template>
  <div>
    <!-- Mount the Cts so I can get the search terms inside the ORM -->

    <!-- core -->
    <initializeClearComponent />

    <!-- combined -->
    <initializeFeedComponent />
    <initializeMapComponent />

    <!-- 1time-eachField-1value/PII -->
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
    <initializePhoneNumberComponent />

    <!-- END -->

    <!-- At one time a set of fields has 1 value -->
    <initializeMseComponent />
    <initializePhq9Component />
    <initializeProsComponent />
    <initializeServiceStatementComponent />
    <initializePastPsychHistoryComponent />
    <initializeMedicalReviewOfSystemsComponent />
    <initializeBloodPressureComponent />
    <initializeBloodSugarComponent />
    <initializeBmComponent />
    <initializeHeightComponent />
    <initializeOxygenSaturationComponent />
    <initializePulseComponent />
    <initializeTemperatureComponent />
    <initializeWaistCircumferenceComponent />
    <initializeWeightComponent />

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

// 1time-eachField-1value/PII
import initializeDobComponent from '@/components/temporal/date-of-birth/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeNameComponent from '@/components/temporal/name/db/client-side/initialize-on-first-load.vue'

// 1time-eachField-1value/body-measurement
import initializeBloodPressureComponent from '@/components/1time-eachField-1value/vital-signs/sub-cts/blood-pressure-levels/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeBloodSugarComponent from '@/components/1time-eachField-1value/vital-signs/sub-cts/blood-sugar-levels/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeBmComponent from '@/components/1time-eachField-1value/vital-signs/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeHeightComponent from '@/components/1time-eachField-1value/vital-signs/sub-cts/height/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeOxygenSaturationComponent from '@/components/1time-eachField-1value/vital-signs/sub-cts/oxygen-saturation/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializePulseComponent from '@/components/1time-eachField-1value/vital-signs/sub-cts/pulse/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeTemperatureComponent from '@/components/1time-eachField-1value/vital-signs/sub-cts/temperature/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeWaistCircumferenceComponent from '@/components/1time-eachField-1value/vital-signs/sub-cts/waist-circumference/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeWeightComponent from '@/components/1time-eachField-1value/vital-signs/sub-cts/weight/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-eachField-1value/others
import initializeMseComponent from '@/components/1time-eachField-1value/mental-status-exam/db/client-side/initialize-on-first-load.vue'
import initializePhq9Component from '@/components/1time-eachField-1value/phq9/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeProsComponent from '@/components/1time-eachField-1value/psych-review-of-systems/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// START: Each field can take multiple values at 1 time in the temporal database
import initializeAllergiesComponent from '@/components/temporal/allergies/db/client-side/initialize-on-first-load.vue'
import initializeChiefComplaintComponent from '~/components/temporal/chief-complaint/db/client-side/initialize-on-first-load.vue'
import initializeFamilyHistoryComponent from '@/components/temporal/family-history/db/client-side/initialize-on-first-load.vue'
import initializeMiscNotesComponent from '~/components/temporal/miscellaneous-notes/db/client-side/initialize-on-first-load.vue'
import initializePlanCommentsComponent from '~/components/temporal/plan-comments/db/client-side/initialize-on-first-load.vue'
import initializeProcessNotesComponent from '~/components/temporal/process-notes/db/client-side/initialize-on-first-load.vue'
import initializeRecComponent from '@/components/temporal/recommendations/db/client-side/initialize-on-first-load.vue'
import initializeRemComponent from '@/components/temporal/reminders/db/client-side/initialize-on-first-load.vue'
// END

import initializeServiceStatementComponent from '@/components/temporal/service-statements/db/client-side/initialize-on-first-load.vue'

import initializePastPsychHistoryComponent from '@/components/1time-eachField-1value/past-psych-history/db/client-side/initialize-on-first-load.vue'

import initializeMedicalReviewOfSystemsComponent from '@/components/1time-eachField-1value/medical-review-of-systems/db/client-side/initialize-on-first-load.vue'

// 1time-Mrow-mField
import initializePhoneNumberComponent from '@/components/temporal/phone-numbers/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeDiagnosisComponent from '@/components/temporal/diagnosis/db/client-side/static-data/insert-into-master-of-search-phrases-ct'

import clientTblOfRightSideCards from '@/components/non-temporal/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'

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
    initializeBloodPressureComponent,
    initializeBloodSugarComponent,
    initializeBmComponent,
    initializeHeightComponent,
    initializeOxygenSaturationComponent,
    initializePulseComponent,
    initializeTemperatureComponent,
    initializeWaistCircumferenceComponent,
    initializeWeightComponent,
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
