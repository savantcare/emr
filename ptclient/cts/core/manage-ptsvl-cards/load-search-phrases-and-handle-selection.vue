<template>
  <div id="manage-ptsvl-cards">
    <!-- Mount the Cts so I can get the search terms inside the ORM -->
    <feedSPhrases></feedSPhrases>
    <mapSPhrases></mapSPhrases>
    <clearSPhrases></clearSPhrases>
    <remSPhrases></remSPhrases>
    <nameSPhrases></nameSPhrases>
    <helloWorldC1SPhrases></helloWorldC1SPhrases>
    <helloWorldC2SPhrases></helloWorldC2SPhrases>
    <helloWorldC3SPhrases></helloWorldC3SPhrases>
    <helloWorldC4SPhrases></helloWorldC4SPhrases>
    <helloWorldC5SPhrases></helloWorldC5SPhrases>
    <helloWorldC6SPhrases></helloWorldC6SPhrases>
    <helloWorldC7SPhrases></helloWorldC7SPhrases>
    <helloWorldC8SPhrases></helloWorldC8SPhrases>
    <helloWorldC9SPhrases></helloWorldC9SPhrases>
    <helloWorldC10SPhrases></helloWorldC10SPhrases>
    <el-autocomplete
      v-model="searchKeyword"
      class="inline-input"
      :fetch-suggestions="mfQuerySearchTerms"
      :placeholder="cfSearchBoxPlaceholder"
      style="width: 100%;"
      @select="mfHandleSuggestionSelectedByUser"
    ></el-autocomplete>
  </div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'

// Goal: Get the search terms from each component
import feedSPhrases from '@/cts/core/feed/search-phrases'
import mapSPhrases from '@/cts/core/map/search-phrases'
import clearSPhrases from '@/cts/core/clear/search-phrases'
import nameSPhrases from '@/cts/spi/name/search-phrases'
import remSPhrases from '@/cts/spi/rem/search-phrases'
import helloWorldC1SPhrases from '@/cts/book/c1-hello-world/search-phrases'
import helloWorldC2SPhrases from '@/cts/book/c2-change-layer/search-phrases'
import helloWorldC3SPhrases from '@/cts/book/c3-click-to-invoke/search-phrases'
import helloWorldC4SPhrases from '@/cts/book/c4-orm-model/search-phrases'
import helloWorldC5SPhrases from '@/cts/book/c5-form-field/search-phrases'
import helloWorldC6SPhrases from '@/cts/book/c6-form-to-orm/search-phrases'
import helloWorldC7SPhrases from '@/cts/book/c7-multiple-data-rows/search-phrases'
import helloWorldC8SPhrases from '@/cts/book/c8-reset-form/search-phrases'
import helloWorldC9SPhrases from '@/cts/book/c9-remove-data-rows/search-phrases'
import helloWorldC10SPhrases from '@/cts/book/c10-new-data-in-vl/search-phrases'

export default {
  components: {
    remSPhrases,
    feedSPhrases,
    clearSPhrases,
    mapSPhrases,
    nameSPhrases,
    helloWorldC1SPhrases,
    helloWorldC2SPhrases,
    helloWorldC3SPhrases,
    helloWorldC4SPhrases,
    helloWorldC5SPhrases,
    helloWorldC6SPhrases,
    helloWorldC7SPhrases,
    helloWorldC8SPhrases,
    helloWorldC9SPhrases,
    helloWorldC10SPhrases,
  },
  data() {
    return { searchKeyword: '' }
  },

  computed: {
    cfSearchBoxPlaceholder() {
      let arFromORM = {}
      arFromORM = ormSearchPhrasesOfCt.query().orderBy('usageCountKeptInOrm', 'desc').get()
      const objRowFromORM = arFromORM[0]
      if (objRowFromORM) {
        return 'e.g. ' + objRowFromORM.value
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
        const arFromORM = ormSearchPhrasesOfCt.query().orderBy('usageCountKeptInOrm', 'desc').get()
        pCallBack(arFromORM)
      } else {
        const arFromORM = ormSearchPhrasesOfCt
          .query()
          .search(pQueryString.trim(), {
            // Search comes from vuex-orm plugn https://github.com/vuex-orm/plugin-search#during-query-chain
            keys: ['value'], // If key is not specified it will search all fields https://github.com/vuex-orm/plugin-search#during-query-chain
          })
          .orderBy('usageCountKeptInOrm', 'desc')
          .get() // trim is needed for "goal " to match "goal"
        pCallBack(arFromORM)
      }
    },

    mfHandleSuggestionSelectedByUser(pSelectedSuggestion) {
      // Goal: Add the card in CsVl (Current state in View layer) or tab in CL (Change layer)

      const objCtToAdd = {
        label: pSelectedSuggestion.value,
        // Here I have to use a variable otherwise webpack gives error. https://stackoverflow.com/questions/57349167/vue-js-dynamic-image-src-with-webpack-require-not-working
        ctToShow: require('@/cts/' + pSelectedSuggestion.ctToShow).default,
        id: pSelectedSuggestion.id,
        closable: true,
      }
      if (pSelectedSuggestion.displayLocation === 'ptsvl') {
        // ptsvl -> Current state of view layer
        this.$store.commit('mtfShowCardInCsVl', objCtToAdd)
      } else if (pSelectedSuggestion.displayLocation === 'cl') {
        // Change layer
        this.$store.commit('mtfShowNewFirstTabInCl', objCtToAdd)
      }

      /* Goal: Increase the usageCount of the search term so I can order them better
        Update query ref: https://vuex-orm.org/guide/data/inserting-and-updating.html#updates */
      ormSearchPhrasesOfCt.update({
        where: pSelectedSuggestion.id,
        data: {
          usageCountKeptInOrm: pSelectedSuggestion.usageCountKeptInOrm + 1,
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
