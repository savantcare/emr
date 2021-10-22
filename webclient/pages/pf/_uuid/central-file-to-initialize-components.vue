<template>
  <div>
    <!-- Mount the Cts so I can get the search terms inside the ORM -->

    <!-- core -->
    <initializeClearComponent />

    <!-- combined -->
    <initializeFeedComponent />
    <initializeMapComponent />

    <!-- temporal/PII -->
    <initializeAppointmentsComponent />
    <initializeDobComponent />
    <initializeNameComponent />

    <!-- START: Each field can take multiple values at 1 time in the temporal database -->
    <initializeAllergiesComponent />
    <initializeChiefComplaintComponent />
    <initializeFamilyHistoryComponent />
    <initializeMedicalHistoryComponent />
    <initializeSocialHistoryComponent />
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
    <initializeExaminationComponent />
    <initializePhq9Component />
    <initializeProsComponent />
    <initializeServiceStatementComponent />
    <initializePastPsychHistoryComponent />
    <initializeMedicalReviewOfSystemsComponent />

    <initializeWeightComponent />
    <initializeHeightComponent />
    <initializePulseComponent />
    <initializeTemperatureComponent />
    <initializeBloodPressureComponent />
    <initializeBloodSugarComponent />
    <initializeWaistCircumferenceComponent />
    <initializeBmiComponent />
    <initializeOxygenSaturationComponent />
    <initializeDiagnosisComponent />
    <initializeMedicationOrderComponent />

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
import initializeAppointmentsComponent from '@/components/patient-data/appointments/db/client-side/initialize-on-first-load.vue'

import initializeDobComponent from '@/components/patient-data/date-of-birth/db/client-side/initialize-on-first-load.vue'
import initializeNameComponent from '@/components/patient-data/name/db/client-side/initialize-on-first-load.vue'

import initializeWeightComponent from '@/components/patient-data/weight/db/client-side/initialize-on-first-load.vue'
import initializeHeightComponent from '@/components/patient-data/height/db/client-side/initialize-on-first-load.vue'
import initializePulseComponent from '@/components/patient-data/pulse/db/client-side/initialize-on-first-load.vue'
import initializeTemperatureComponent from '@/components/patient-data/temperature/db/client-side/initialize-on-first-load.vue'
import initializeBloodPressureComponent from '@/components/patient-data/blood-pressure/db/client-side/initialize-on-first-load.vue'
import initializeBloodSugarComponent from '@/components/patient-data/blood-sugar/db/client-side/initialize-on-first-load.vue'
import initializeWaistCircumferenceComponent from '@/components/patient-data/waist-circumference/db/client-side/initialize-on-first-load.vue'
import initializeBmiComponent from '@/components/patient-data/bmi/db/client-side/initialize-on-first-load.vue'
import initializeOxygenSaturationComponent from '@/components/patient-data/oxygen-saturation/db/client-side/initialize-on-first-load.vue'

// temporal/others
import initializeExaminationComponent from '@/components/patient-data/examination/db/client-side/initialize-on-first-load.vue'
import initializePhq9Component from '@/components/patient-data/phq9/db/client-side/initialize-on-first-load.vue'
import initializeProsComponent from '@/components/patient-data/psych-review-of-system/db/client-side/initialize-on-first-load.vue'

// START: Each field can take multiple values at 1 time in the temporal database
import initializeAllergiesComponent from '@/components/patient-data/allergies/db/client-side/initialize-on-first-load.vue'
import initializeChiefComplaintComponent from '~/components/patient-data/chief-complaint/db/client-side/initialize-on-first-load.vue'
import initializeFamilyHistoryComponent from '@/components/patient-data/family-history/db/client-side/initialize-on-first-load.vue'
import initializeMedicalHistoryComponent from '@/components/patient-data/medical-history/db/client-side/initialize-on-first-load.vue'
import initializeSocialHistoryComponent from '@/components/patient-data/social-history/db/client-side/initialize-on-first-load.vue'
import initializeMiscNotesComponent from '~/components/patient-data/miscellaneous-notes/db/client-side/initialize-on-first-load.vue'
import initializePlanCommentsComponent from '~/components/patient-data/plan-comments/db/client-side/initialize-on-first-load.vue'
import initializeSHComponent from '~/components/patient-data/social-history/db/client-side/initialize-on-first-load.vue'
import initializeProcessNotesComponent from '~/components/patient-data/process-notes/db/client-side/initialize-on-first-load.vue'
import initializeRecComponent from '@/components/patient-data/recommendations/db/client-side/initialize-on-first-load.vue'
import initializeRemComponent from '@/components/patient-data/reminders/db/client-side/initialize-on-first-load.vue'
import initializeGoalComponent from '@/components/patient-data/goals/db/client-side/initialize-on-first-load.vue'

import initializeScreenComponent from '@/components/patient-data/screens/db/client-side/initialize-on-first-load.vue'

// END

import initializeServiceStatementComponent from '@/components/patient-data/service-statements/db/client-side/initialize-on-first-load.vue'

import initializePastPsychHistoryComponent from '@/components/patient-data/past-psych-history/db/client-side/initialize-on-first-load.vue'

import initializeMedicalReviewOfSystemsComponent from '@/components/patient-data/medical-review-of-system/db/client-side/initialize-on-first-load.vue'

// 1time-Mrow-mField
import initializePhoneNumberComponent from '@/components/patient-data/phone-numbers/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeDiagnosisComponent from '@/components/patient-data/diagnosis/db/client-side/initialize-on-first-load.vue'
import initializeMedicationOrderComponent from '@/components/patient-data/medication-orders/db/client-side/initialize-on-first-load.vue'

import clientTblOfDynamicComponents from '@/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'

import clientTblOfAppointmentsInsertData from '@/components/patient-data/appointments/db/client-side/static-data/insert-into-appointment-client-side-table'

export default {
  components: {
    // At one time a field has single value
    initializeServiceStatementComponent,
    initializePastPsychHistoryComponent,
    initializeMedicalReviewOfSystemsComponent,
    initializeDiagnosisComponent,
    initializeMedicationOrderComponent,
    initializeAppointmentsComponent,
    initializeDobComponent,
    initializeNameComponent,
    initializeWeightComponent,
    initializeHeightComponent,
    initializePulseComponent,
    initializeTemperatureComponent,
    initializeBloodPressureComponent,
    initializeBloodSugarComponent,
    initializeWaistCircumferenceComponent,
    initializeBmiComponent,
    initializeOxygenSaturationComponent,

    initializeExaminationComponent,
    initializePhq9Component,
    initializeProsComponent,

    // START: Each field can take multiple values at 1 time in the temporal database
    initializeAllergiesComponent,
    initializeChiefComplaintComponent,
    initializeFamilyHistoryComponent,
    initializeMedicalHistoryComponent,
    initializeSocialHistoryComponent,
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
