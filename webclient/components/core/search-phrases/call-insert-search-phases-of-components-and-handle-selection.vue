<template>
  <div id="manage-ptsvl-cards">
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
    <initializeServiceStatementComponent />

    <!-- 1time-Mrow-mField/others -->
    <initializePhoneNumberComponent />

    <el-autocomplete
      v-model="searchKeyword"
      class="inline-input"
      :fetch-suggestions="mfQuerySearchTerms"
      :placeholder="cfSearchBoxPlaceholder"
      style="width: 100%"
      :highlight-first-item="true"
      @select="mfHandleSuggestionSelectedByUser"
    ></el-autocomplete>
  </div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'

// Goal: Get the search terms from each component

// core
import initializeClearComponent from '@/components/core/clear/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// combined
import initializeFeedComponent from '@/components/pt-info/combined/feed/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeMapComponent from '@/components/pt-info/combined/map/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/PII
import initializeDobComponent from '@/components/pt-info/single/1time-1row-mField/date-of-birth/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeNameComponent from '@/components/pt-info/single/1time-1row-mField/name/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/body-measurement
import initializeBloodPressureComponent from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeBloodSugarComponent from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeBmComponent from '@/components/pt-info/single/1time-1row-mField/bm/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeHeightComponent from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/height/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeOxygenSaturationComponent from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializePulseComponent from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/pulse/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeTemperatureComponent from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/temperature/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeWaistCircumferenceComponent from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeWeightComponent from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/weight/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/others
import initializeMseComponent from '@/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializePhq9Component from '@/components/pt-info/single/1time-1row-mField/phq9/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeProsComponent from '@/components/pt-info/single/1time-1row-mField/psych-review-of-systems/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-Mrow-1Field
import initializeRemComponent from '@/components/pt-info/single/1time-Mrow-1Field/reminder/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import initializeServiceStatementComponent from '@/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/initialize-on-first-load.vue'

// 1time-Mrow-mField
import initializePhoneNumberComponent from '@/components/pt-info/single/1time-Mrow-mField/phone-numbers/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

import clientSideTblOfRightSideCards from '@/components/core/pts-view-layer-cards/db/client-side/structure/pts-table.js'

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
    initializeServiceStatementComponent,

    // 1time-Mrow-mField
    initializePhoneNumberComponent,
  },
  data() {
    return { searchKeyword: '' }
  },

  computed: {
    cfSearchBoxPlaceholder() {
      let arFromClientSideTable = {}
      arFromClientSideTable = clientSideTblOfCtSearchPhrases
        .query()
        .orderBy('usageCountKeptInEditLayerientSideTable', 'desc')
        .get()
      const objRowFromOrm = arFromClientSideTable[0]
      if (objRowFromOrm) {
        return 'e.g. ' + objRowFromOrm.value
      } else {
        return 'e.g. screening'
      }
    },
  },
  mounted() {},
  methods: {
    mfQuerySearchTerms(pQueryString, pCallBack) {
      // pQueryString empty means user did not enter anything
      // to show values in dropdown returning all results
      if (!pQueryString) {
        const arFromClientSideTable = clientSideTblOfCtSearchPhrases
          .query()
          .orderBy('usageCountKeptInEditLayerientSideTable', 'desc')
          .get()
        pCallBack(arFromClientSideTable)
      } else {
        const arFromClientSideTable = clientSideTblOfCtSearchPhrases
          .query()
          .where('needsRowIdToWork', 'no') // For reasons read: search-inside-add-tab-in-cl-ct approx line 78
          .search(pQueryString.trim(), {
            // Search comes from vuex-orm plugn https://github.com/client-side/plugin-search#during-query-chain
            keys: ['value'], // If key is not specified it will search all fields https://github.com/client-side/plugin-search#during-query-chain
          })
          .orderBy('usageCountKeptInEditLayerientSideTable', 'desc')
          .get() // trim is needed for "goal " to match "goal"
        pCallBack(arFromClientSideTable)
      }
    },

    mfHandleSuggestionSelectedByUser(pSelectedSuggestion) {
      // Goal: Add the card in CsVl (Current state in View layer) or tab in CL (Change layer)

      const objCtToAdd = {
        label: pSelectedSuggestion.value,
        // Here I have to use a variable otherwise webpack gives error. https://stackoverflow.com/questions/57349167/vue-js-dynamic-image-src-with-webpack-require-not-working
        ctToShow: require('@/components/' + pSelectedSuggestion.ctToShow).default,
        id: pSelectedSuggestion.id,
        closable: true,
      }
      if (pSelectedSuggestion.displayLocation === 'PresentTimeStateViewLayer') {
        // delete if this card is already existing
        const arFromClientSideTable = clientSideTblOfRightSideCards
          .query()
          .where('name', pSelectedSuggestion.value)
          .get()

        if (arFromClientSideTable.length > 0) {
          if (arFromClientSideTable[0]['clientSideUniqRowId']) {
            clientSideTblOfRightSideCards.delete(arFromClientSideTable[0]['clientSideUniqRowId'])
          }
        }
        // ptsvl -> Current state of view layer
        clientSideTblOfRightSideCards.insert({
          data: {
            name: pSelectedSuggestion.value,
            componentToShowPath: pSelectedSuggestion.ctToShow, // PtsVl -> Present time state - part of - view layer
            componentCurrentValueForCustomizingViewState: 1,
          },
        })
      } else if (pSelectedSuggestion.displayLocation === 'edit-layer') {
        // Change layer
        this.$store.commit('mtfShowNewFirstTabInEditLayer', objCtToAdd)
      }

      /* Goal: Increase the usageCount of the search term so I can order them better
        Update query ref: https://vuex-orm.org/guide/data/inserting-and-updating.html#updates */
      clientSideTblOfCtSearchPhrases.update({
        where: pSelectedSuggestion.id,
        data: {
          usageCountKeptInEditLayerientSideTable:
            pSelectedSuggestion.usageCountKeptInEditLayerientSideTable + 1,
        },
      })

      /* Goal: Once search work is done then the input area needs to be empty */
      this.searchKeyword = ''

      /* Goal: scrolling to top of the search input box */
      const options = {
        container: '#ptsvl',
        easing: 'ease-in',
        offset: 6000, // if offset is negative I do not come on top of search box. Not sure what this means
        force: true,
        cancelable: true,
      }
      this.$scrollTo('#manage-ptsvl-cards', 500, options)
    },
  },
}
</script>
