<template>
  <div id="vl-search">
    <!-- Mount the Cts so I can get the search terms inside the ORM -->
    <feedSPhrases></feedSPhrases>
    <mapSPhrases></mapSPhrases>
    <clearSPhrases></clearSPhrases>
    <remSPhrases></remSPhrases>
    <nameSPhrases></nameSPhrases>
    <helloWorldC1SPhrases></helloWorldC1SPhrases>
    <helloWorldC2SPhrases></helloWorldC2SPhrases>
    <helloWorldC3SPhrases></helloWorldC3SPhrases>
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
import ormSearchPhrasesOfCt from '@/cts/core/vl-search/orm-search-phrases-of-ct'

// Goal: Get the search terms from each component
import feedSPhrases from '@/cts/core/feed/search-phrases'
import mapSPhrases from '@/cts/core/map/search-phrases'
import clearSPhrases from '@/cts/core/clear/search-phrases'
import nameSPhrases from '@/cts/spi/name/search-phrases'
import remSPhrases from '@/cts/spi/rem/search-phrases'
import helloWorldC1SPhrases from '@/cts/spi/c1-hello-world/search-phrases'
import helloWorldC2SPhrases from '@/cts/spi/c2-hello-world/search-phrases'
import helloWorldC3SPhrases from '@/cts/spi/c3-hello-world/search-phrases'

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
  },
  data() {
    return { searchKeyword: '' }
  },

  computed: {
    cfSearchBoxPlaceholder() {
      let arFromORM = {}
      arFromORM = ormSearchPhrasesOfCt.query().orderBy('usageCountKeptInLS', 'desc').get()
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
        const arFromORM = ormSearchPhrasesOfCt.query().orderBy('usageCountKeptInLS', 'desc').get()
        pCallBack(arFromORM)
      } else {
        const arFromORM = ormSearchPhrasesOfCt
          .query()
          .search(pQueryString.trim(), {
            // Search comes from vuex-orm plugn https://github.com/vuex-orm/plugin-search#during-query-chain
            keys: ['value'], // If key is not specified it will search all fields https://github.com/vuex-orm/plugin-search#during-query-chain
          })
          .orderBy('usageCountKeptInLS', 'desc')
          .get() // trim is needed for "goal " to match "goal"
        pCallBack(arFromORM)
      }
    },

    mfHandleSuggestionSelectedByUser(pSelectedSuggestion) {
      // Goal: Add the card in CsVl (Current state in View layer) or tab in CL (Change layer)

      let vsCtToShow = ''

      if (pSelectedSuggestion.layer === 'view') {
        vsCtToShow = pSelectedSuggestion.ctToShowInCsOfVl // Ct to show in current state of view layer
      } else {
        vsCtToShow = pSelectedSuggestion.ctToShowInCL // Ct to show in change layer
      }

      const objCtToAdd = {
        label: pSelectedSuggestion.value,
        // Here I have to use a variable otherwise webpack gives error. https://stackoverflow.com/questions/57349167/vue-js-dynamic-image-src-with-webpack-require-not-working
        ctToShow: require('@/cts/' + vsCtToShow).default,
        id: pSelectedSuggestion.id,
        closable: true,
      }
      if (pSelectedSuggestion.layer === 'view') {
        this.$store.commit('mtfShowCardInCsVl', objCtToAdd)
      } else if (pSelectedSuggestion.layer === 'change') {
        this.$store.commit('mtfShowNewFirstTabInCl', objCtToAdd)
      }

      /* Goal: Increase the usageCount of the search term so I can order them better
        Update query ref: https://vuex-orm.org/guide/data/inserting-and-updating.html#updates */
      ormSearchPhrasesOfCt.update({
        where: pSelectedSuggestion.id,
        data: {
          usageCountKeptInLS: pSelectedSuggestion.usageCountKeptInLS + 1,
        },
      })

      /* Goal: Once search work is done then the input area needs to be empty */
      this.searchKeyword = ''

      /* Goal: scrolling to top of the search input box */
      const options = {
        container: '#csvl',
        easing: 'ease-in',
        offset: 6000, // if offset is negative I do not come on top of search box. Not sure what this means
        force: true,
        cancelable: true,
      }
      this.$scrollTo('#vl-search', 500, options)
    },
  },
}
</script>
