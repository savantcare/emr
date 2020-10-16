<template>
  <div>
    <!-- Mount the Cts so I can get the search terms inside the ORM -->

    <!-- core -->
    <initializeClearComponent />

    <!-- combined -->
    <initializeFeedComponent />
    <initializeMapComponent />

    <!-- 1time-1row-mField/PII -->
    <initializeDobComponent />
    <initializeNameComponent />

    <!-- 1time-1row-mField/body-measurement -->
    <initializeBloodPressureComponent />
    <initializeBloodSugarComponent />
    <initializeBmComponent />
    <initializeHeightComponent />
    <initializeOxygenSaturationComponent />
    <initializePulseComponent />
    <initializeTemperatureComponent />
    <initializeWaistCircumferenceComponent />
    <initializeWeightComponent />

    <!-- 1time-1row-mField/others -->
    <initializeMseComponent />
    <initializePhq9Component />
    <initializeProsComponent />

    <!-- 1time-Mrow-1Field/others -->
    <initializeRemComponent />
    <initializeRecComponent />
    <initializeServiceStatementComponent />

    <!-- 1time-Mrow-mField/others -->
    <initializePhoneNumberComponent />
    <initializeDiagnosisComponent />

    <clientSideTblOfAppointmentsInsertData />
  </div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

// Goal: Get the search terms from each component

// core
import initializeClearComponent from '@/components/non-temporal/clear/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// combined
import initializeFeedComponent from '@/components/non-temporal/feed/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeMapComponent from '@/components/non-temporal/map/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/PII
import initializeDobComponent from '@/components/1time-1row-mField/date-of-birth/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeNameComponent from '@/components/1time-1row-mField/name/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/body-measurement
import initializeBloodPressureComponent from '@/components/1time-1row-mField/vital-signs/sub-cts/blood-pressure-levels/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeBloodSugarComponent from '@/components/1time-1row-mField/vital-signs/sub-cts/blood-sugar-levels/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeBmComponent from '@/components/1time-1row-mField/vital-signs/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeHeightComponent from '@/components/1time-1row-mField/vital-signs/sub-cts/height/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeOxygenSaturationComponent from '@/components/1time-1row-mField/vital-signs/sub-cts/oxygen-saturation/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializePulseComponent from '@/components/1time-1row-mField/vital-signs/sub-cts/pulse/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeTemperatureComponent from '@/components/1time-1row-mField/vital-signs/sub-cts/temperature/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeWaistCircumferenceComponent from '@/components/1time-1row-mField/vital-signs/sub-cts/waist-circumference/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeWeightComponent from '@/components/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/others
import initializeMseComponent from '@/components/1time-1row-mField/mental-status-exam/db/client-side/initialize-on-first-load.vue'
import initializePhq9Component from '@/components/1time-1row-mField/phq9/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeProsComponent from '@/components/1time-1row-mField/psych-review-of-systems/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-Mrow-1Field
import initializeRemComponent from '@/components/1time-Mrow-1Field/reminder/db/client-side/initialize-on-first-load.vue'
import initializeRecComponent from '@/components/1time-Mrow-1Field/recommendation/db/client-side/initialize-on-first-load.vue'

import initializeServiceStatementComponent from '@/components/1time-1row-mField/service-statement/db/client-side/initialize-on-first-load.vue'

// 1time-Mrow-mField
import initializePhoneNumberComponent from '@/components/1time-Mrow-mField/phone-numbers/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeDiagnosisComponent from '@/components/1time-Mrow-mField/diagnosis/db/client-side/static-data/insert-into-master-of-search-phrases-ct'

import clientSideTblOfRightSideCards from '@/components/non-temporal/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'

import clientSideTblOfAppointmentsInsertData from '@/components/1time-Mrow-mField/appointments/db/client-side/static-data/insert-into-appointment-client-side-table'

export default {
  components: {
    // core
    initializeClearComponent,

    // combined
    initializeFeedComponent,
    initializeMapComponent,

    // 1time-1row-mField/PII
    initializeDobComponent,
    initializeNameComponent,
    clientSideTblOfAppointmentsInsertData,
    // 1time-1row-mField/body-measurement
    initializeBloodPressureComponent,
    initializeBloodSugarComponent,
    initializeBmComponent,
    initializeHeightComponent,
    initializeOxygenSaturationComponent,
    initializePulseComponent,
    initializeTemperatureComponent,
    initializeWaistCircumferenceComponent,
    initializeWeightComponent,

    // 1time-1row-mField/others
    initializeMseComponent,
    initializePhq9Component,
    initializeProsComponent,

    // 1time-Mrow-1Field
    initializeRemComponent,
    initializeRecComponent,
    initializeServiceStatementComponent,

    // 1time-Mrow-mField
    initializePhoneNumberComponent,
    initializeDiagnosisComponent,
  },
  mounted() {},
  methods: {},
}
</script>
