<template>
  <div id="manage-ptsvl-cards">
    <!-- Mount the Cts so I can get the search terms inside the ORM -->

    <!-- core -->
    <insertClearComponentSearchPhrases />

    <!-- combined -->
    <insertFeedComponentSearchPhrases />
    <insertMapComponentSearchPhrases />

    <!-- 1time-1row-mField/PII -->
    <insertDobComponentSearchPhrases />
    <insertNameComponentSearchPhrases />

    <!-- 1time-1row-mField/body-measurement -->
    <insertBloodPressureComponentSearchPhrases />
    <insertBloodSugarComponentSearchPhrases />
    <insertBmComponentSearchPhrases />
    <insertHeightComponentSearchPhrases />
    <insertOxygenSaturationComponentSearchPhrases />
    <insertPulseComponentSearchPhrases />
    <insertTemperatureComponentSearchPhrases />
    <insertWaistCircumferenceComponentSearchPhrases />
    <insertWeightComponentSearchPhrases />

    <!-- 1time-1row-mField/others -->
    <insertMseComponentSearchPhrases />
    <insertPhq9ComponentSearchPhrases />
    <insertProsComponentSearchPhrases />

    <!-- 1time-Mrow-1Field/others -->
    <insertRemComponentSearchPhrases />
    <insertSsComponentSearchPhrases />

    <!-- 1time-Mrow-mField/others -->
    <insertPhoneNumberComponentSearchPhrases />
    <insertDignosisComponentSearchPhrases />

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
import insertClearComponentSearchPhrases from '@/components/core/clear/static-data/insert-into-master-of-search-phrases-ct.vue'

// combined
import insertFeedComponentSearchPhrases from '@/components/pt-info/combined/feed/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertMapComponentSearchPhrases from '@/components/pt-info/combined/map/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/PII
import insertDobComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/date-of-birth/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertNameComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/name/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/body-measurement
import insertBloodPressureComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertBloodSugarComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertBmComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertHeightComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/height/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertOxygenSaturationComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertPulseComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/pulse/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertTemperatureComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/temperature/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertWaistCircumferenceComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertWeightComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/weight/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-1row-mField/others
import insertMseComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertPhq9ComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/phq9/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertProsComponentSearchPhrases from '@/components/pt-info/single/1time-1row-mField/psych-review-of-systems/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-Mrow-1Field
import insertRemComponentSearchPhrases from '@/components/pt-info/single/1time-Mrow-1Field/reminder/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertSsComponentSearchPhrases from '@/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'

// 1time-Mrow-mField
import insertPhoneNumberComponentSearchPhrases from '@/components/pt-info/single/1time-Mrow-mField/phone-numbers/static-data/insert-into-master-of-search-phrases-ct.vue'
import insertDignosisComponentSearchPhrases from '@/components/pt-info/single/1time-Mrow-mField/diagnosis/db/client-side/static-data/search-phrases-ct.vue'

export default {
  components: {
    // core
    insertClearComponentSearchPhrases,

    // combined
    insertFeedComponentSearchPhrases,
    insertMapComponentSearchPhrases,

    // 1time-1row-mField/PII
    insertDobComponentSearchPhrases,
    insertNameComponentSearchPhrases,

    // 1time-1row-mField/body-measurement
    insertBloodPressureComponentSearchPhrases,
    insertBloodSugarComponentSearchPhrases,
    insertBmComponentSearchPhrases,
    insertHeightComponentSearchPhrases,
    insertOxygenSaturationComponentSearchPhrases,
    insertPulseComponentSearchPhrases,
    insertTemperatureComponentSearchPhrases,
    insertWaistCircumferenceComponentSearchPhrases,
    insertWeightComponentSearchPhrases,

    // 1time-1row-mField/others
    insertMseComponentSearchPhrases,
    insertPhq9ComponentSearchPhrases,
    insertProsComponentSearchPhrases,

    // 1time-Mrow-1Field
    insertRemComponentSearchPhrases,
    insertSsComponentSearchPhrases,

    // 1time-Mrow-mField
    insertPhoneNumberComponentSearchPhrases,
    insertDignosisComponentSearchPhrases,
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
        // ptsvl -> Current state of view layer
        this.$store.commit('mtfShowCardInCsVl', objCtToAdd)
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
