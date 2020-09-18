<template>
  <div id="manage-ptsvl-cards">
    <!-- Mount the Cts so I can get the search terms inside the ORM -->
    <feedSPhrases></feedSPhrases>
    <mapSPhrases></mapSPhrases>
    <clearSPhrases></clearSPhrases>
    <remSPhrases></remSPhrases>
    <recSPhrases></recSPhrases>
    <ssSPhrases></ssSPhrases>
    <nameSPhrases></nameSPhrases>
    <weightSPhrases></weightSPhrases>
    <pulseSPhrases></pulseSPhrases>
    <heightSPhrases></heightSPhrases>
    <temperatureSPhrases></temperatureSPhrases>
    <phq9SPhrases></phq9SPhrases>
    <bmSPhrases></bmSPhrases>
    <bloodPressureSPhrases></bloodPressureSPhrases>
    <bloodSugarSPhrases></bloodSugarSPhrases>
    <oxygenSaturationSPhrases></oxygenSaturationSPhrases>
    <waistCircumferenceSPhrases></waistCircumferenceSPhrases>
    <dobSPhrases></dobSPhrases>
    <phoneNumberSPhrases></phoneNumberSPhrases>
    <el-autocomplete
      v-model="searchKeyword"
      class="inline-input"
      :fetch-suggestions="mfQuerySearchTerms"
      :placeholder="cfSearchBoxPlaceholder"
      style="width: 100%;"
      :highlight-first-item="true"
      @select="mfHandleSuggestionSelectedByUser"
    ></el-autocomplete>
  </div>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

import feedSPhrases from '@/components/pt-info/combined/feed/static-data/search-phrases-ct'
import mapSPhrases from '@/components/pt-info/combined/map/static-data/search-phrases-ct'
import clearSPhrases from '@/components/core/clear/static-data/search-phrases-ct'
import nameSPhrases from '@/components/pt-info/single/1t-1row-mField/name/static-data/search-phrases-ct'
import heightSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/sub-cts/height/static-data/search-phrases-ct'
import weightSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/sub-cts/weight/static-data/search-phrases-ct'
import pulseSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/sub-cts/pulse/static-data/search-phrases-ct'
import temperatureSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/sub-cts/temperature/static-data/search-phrases-ct'
import bloodPressureSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-pressure/static-data/search-phrases-ct'
import bloodSugarSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/sub-cts/blood-sugar/static-data/search-phrases-ct'
import waistCircumferenceSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/sub-cts/waist-circumference/static-data/search-phrases-ct'
import oxygenSaturationSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/sub-cts/oxygen-saturation/static-data/search-phrases-ct'
import phq9SPhrases from '@/components/pt-info/single/1t-1row-mField/phq9/static-data/search-phrases-ct'
import bmSPhrases from '@/components/pt-info/single/1t-1row-mField/bm/static-data/search-phrases-ct'
import dobSPhrases from '@/components/pt-info/single/1t-1row-mField/date-of-birth/static-data/search-phrases-ct'
import remSPhrases from '@/components/pt-info/single/1t-Mrow-1Field/reminder/db/client-side/static-data/search-phrases-ct'
import recSPhrases from '@/components/pt-info/single/1t-Mrow-1Field/recommendation/db/client-side/static-data/search-phrases-ct'
import ssSPhrases from '@/components/pt-info/single/1t-Mrow-1Field/service-statement/db/client-side/static-data/search-phrases-ct'
import phoneNumberSPhrases from '@/components/pt-info/single/1t-Mrow-mField/phone-numbers/static-data/search-phrases-ct'

export default {
  components: {
    remSPhrases,
    recSPhrases,
    ssSPhrases,
    feedSPhrases,
    clearSPhrases,
    mapSPhrases,
    nameSPhrases,
    heightSPhrases,
    weightSPhrases,
    pulseSPhrases,
    temperatureSPhrases,
    phq9SPhrases,
    bmSPhrases,
    bloodPressureSPhrases,
    bloodSugarSPhrases,
    waistCircumferenceSPhrases,
    oxygenSaturationSPhrases,
    dobSPhrases,
    phoneNumberSPhrases,
  },
  data() {
    return { searchKeyword: '' }
  },

  computed: {
    cfSearchBoxPlaceholder() {
      let arFromOrm = {}
      arFromOrm = tblSearchPhrasesOfCt.query().orderBy('usageCountKeptInOrm', 'desc').get()
      const objRowFromOrm = arFromOrm[0]
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
      if (!pQueryString) {
        const arFromOrm = tblSearchPhrasesOfCt.query().orderBy('usageCountKeptInOrm', 'desc').get()
        pCallBack(arFromOrm)
      } else {
        const arFromOrm = tblSearchPhrasesOfCt
          .query()
          .where('needsRowIdToWork', 'no')
          .search(pQueryString.trim(), {
            keys: ['value'],
          })
          .orderBy('usageCountKeptInOrm', 'desc')
          .get()
        pCallBack(arFromOrm)
      }
    },

    mfHandleSuggestionSelectedByUser(pSelectedSuggestion) {
      const objCtToAdd = {
        label: pSelectedSuggestion.value,
        ctToShow: require('@/components/' + pSelectedSuggestion.ctToShow).default,
        id: pSelectedSuggestion.id,
        closable: true,
      }
      if (pSelectedSuggestion.displayLocation === 'ptsVl') {
        this.$store.commit('mtfShowCardInCsVl', objCtToAdd)
      } else if (pSelectedSuggestion.displayLocation === 'cl') {
        this.$store.commit('mtfShowNewFirstTabInCl', objCtToAdd)
      }

      tblSearchPhrasesOfCt.update({
        where: pSelectedSuggestion.id,
        data: {
          usageCountKeptInOrm: pSelectedSuggestion.usageCountKeptInOrm + 1,
        },
      })

      this.searchKeyword = ''

      const options = {
        container: '#ptsvl',
        easing: 'ease-in',
        offset: 6000,
        force: true,
        cancelable: true,
      }
      this.$scrollTo('#manage-ptsvl-cards', 500, options)
    },
  },
}
</script>
