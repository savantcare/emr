<template>
  <div id="manage-layer1-right-side-cards">
    <el-card v-html="this.results"></el-card>
    <!-- Mount the Cts so I can get the search terms inside the ORM -->
    <el-autocomplete
      v-model="searchKeyword"
      class="inline-input"
      :fetch-suggestions="mfQuerySearchTerms"
      :placeholder="cfSearchBoxPlaceholder"
      style="width: 100%"
      :highlight-first-item="true"
      @select="mfHandleFectedContentSelectedByUser"
    ></el-autocomplete>
  </div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'
import clientTblOfDynamicCards from '@/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'
import allpostDefs from '@/components/non-temporal/form-manager/all-post-definations-of-p1.js'

export default {
  components: {
    // core
  },
  data() {
    return { searchKeyword: '', results: ''}
  },
  computed: {
    cfSearchBoxPlaceholder() {
      let arFromClientTbl = {}
      arFromClientTbl = clientTblOfCtSearchPhrases.query().orderBy('searchPhraseUsageCount', 'desc').get()
      const objRowFromOrm = arFromClientTbl[0]
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
        const arFromClientTbl = clientTblOfCtSearchPhrases.query().orderBy('searchPhraseUsageCount', 'desc').get()
        pCallBack(arFromClientTbl)
      } else {
        const arFromClientTbl = clientTblOfCtSearchPhrases
          .query()
          .where('needsRowIdToWork', 'no') // For reasons read: search-inside-add-tab-in-cl-ct approx line 78
          .search(pQueryString.trim(), {
            // Search comes from vuex-orm plugn https://github.com/client-side/plugin-search#during-query-chain
            keys: ['value'], // If key is not specified it will search all fields https://github.com/client-side/plugin-search#during-query-chain
          })
          .orderBy('searchPhraseUsageCount', 'desc')
          .get() // trim is needed for "goal " to match "goal"
        pCallBack(arFromClientTbl)
      }
    },
    
    async mfHandleFectedContentSelectedByUser(pSelectedSuggestion){
      
      if (pSelectedSuggestion.displayLocation === 'PresentTimeStateViewLayer') {
        if (typeof pSelectedSuggestion.remoteUrl !== 'undefined') {
          const response = await fetch(pSelectedSuggestion.remoteUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'access-control-allow-origin': '*',
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVSUQiOjE5NzI0LCJpYXQiOjE2MDc2ODAyNDl9.PpTQL8xFj1gIEwyOhhLUm-HJArM_Z_CJ1VnbXQRtvdI',
            }
          }).then(response => response.json())
            .then(data => this.results = data.data);
        } else {
          // Fetch Data from local vuex-orm
          console.log("Fetch Data from local vuex-orm")
        }
        

      }  else if (pSelectedSuggestion.displayLocation === 'edit-layer') {
        // Change layer
        this.$store.commit('mtfShowNewFirstTabInEditLayer', objCtToAdd)
      }
      
    },
    mfHandleSuggestionSelectedByUser(pSelectedSuggestion) {
      // Goal: Add the card in Layer1RightSide (Current state in View layer) or tab in edit layer (Change layer)
      
      const objCtToAdd = {
        label: pSelectedSuggestion.value,
        // Here I have to use a variable otherwise webpack gives error. https://stackoverflow.com/questions/57349167/vue-js-dynamic-image-src-with-webpack-require-not-working
        ctToShow: require('@/components/' + pSelectedSuggestion.ctToShow).default,
        id: pSelectedSuggestion.id,
        closable: true,
      }
      if (pSelectedSuggestion.displayLocation === 'PresentTimeStateViewLayer') {
        // delete if this card is already existing
        const arFromClientTbl = clientTblOfDynamicCards.query().where('name', pSelectedSuggestion.value).get()
        console.log("3 i am mfHandleSuggestionSelectedByUser",arFromClientTbl)
        if (arFromClientTbl.length > 0) {
          if (arFromClientTbl[0]['clientSideUniqRowId']) {
            clientTblOfDynamicCards.delete(arFromClientTbl[0]['clientSideUniqRowId'])
          }
        }

        clientTblOfDynamicCards.insert({
          data: {
            name: pSelectedSuggestion.value,
            componentToShowPath: pSelectedSuggestion.ctToShow,
            currentDisplayStateOfComponent: 1,
            identifierOfparentComponentThatIncludedThisSearchComponent: this.$options._componentTag,
          },
        })
      } else if (pSelectedSuggestion.displayLocation === 'edit-layer') {
        // Change layer
        this.$store.commit('mtfShowNewFirstTabInEditLayer', objCtToAdd)
      }

      /* Goal: Increase the usageCount of the search term so I can order them better
        Update query ref: https://vuex-orm.org/guide/data/inserting-and-updating.html#updates */
      clientTblOfCtSearchPhrases.update({
        where: pSelectedSuggestion.clientSideUniqRowId,
        data: {
          searchPhraseUsageCount: pSelectedSuggestion.searchPhraseUsageCount + 1,
        },
      })

      /* Goal: Once search work is done then the input area needs to be empty */
      this.searchKeyword = ''

      /* Goal: scrolling to top of the search input box */
      const options = {
        container: '#layer1RightSide',
        easing: 'ease-in',
        offset: 6000, // if offset is negative I do not come on top of search box. Not sure what this means
        force: true,
        cancelable: true,
      }
      this.$scrollTo('#manage-layer1-right-side-cards', 500, options)
    },
  },
}
</script>
<style >
.col-md-12 .avatar {
  display: none;
}
.col-md-12 thead {
  display: none;
}
.col-md-12 .ui-sortable tr td:first-child {
  display: none;
}
.col-md-12 a {
  display: none;
}
</style>