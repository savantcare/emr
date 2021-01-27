<template>
  <div id="manage-layer1-right-side-cards">
    <!-- Mount the Cts so I can get the search terms inside the ORM -->
    <div v-for="(cardComponent,index) in this.localOrmResult" :key="index">
      <el-card v-for="(skillComponent,index) in cardComponent" :key="index" style="margin: 10px">
        <div style="margin-bottom: 10px">{{index.toUpperCase()}} :</div>
        <!-- Using https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
        <!--  Why not use keep-alive before <component v-bind:is="card.ctToShow"></component> 
                Sorrounding component with keepAlive does not help. Since previous rendering of rex
                is not hidden. When user types rex 2 times, rex is being displayed 2 times
                The vue inbuilt component <component /> acts as a placeholder for another component and accepts a special :is prop with the name of the component it should render.                
        -->
        <el-card
          style="margin-bottom: 23px;margin-right: 13px; float:left"
          v-for="card in skillComponent"
          :key="card.clientSideUniqRowId"
        >{{ card.description }}</el-card>
      </el-card>
    </div>
    <div v-for="(skillComponent,index) in this.remoteDataResult" :key="index">
      <el-card v-html="skillComponent"></el-card>
    </div>
    <el-autocomplete
      v-model="searchKeyword"
      class="inline-input"
      :fetch-suggestions="mfQuerySearchTerms"
      :placeholder="cfSearchBoxPlaceholder"
      style="width: 100%"
      :highlight-first-item="true"
      @select="mfHandleContentOfItemSelectedByUser"
    ></el-autocomplete>
  </div>
</template>

<script>
import clientTblOfCtSearchPhrases from '@/components/non-temporal/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'
import clientTblOfDynamicComponents from '@/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'
import allPatientDataTbls from '@/components/non-temporal/form-manager/all-client-tables.js'
export default {
  components: {
    // core
  },
  data() {
    return { searchKeyword: '', remoteDataResult: [], localOrmResult : [] }
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
    async mfHandleContentOfItemSelectedByUser(pSelectedSuggestion){
      if (pSelectedSuggestion.displayLocation === 'PresentTimeStateViewLayer') {
        if (pSelectedSuggestion.remoteUrl !== '') {
          const response = await fetch(pSelectedSuggestion.remoteUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'access-control-allow-origin': '*',
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVSUQiOjE5NzI0LCJpYXQiOjE2MDc2ODAyNDl9.PpTQL8xFj1gIEwyOhhLUm-HJArM_Z_CJ1VnbXQRtvdI',
            }
          }).then(response => response.json())
            .then(data => this.remoteDataResult.push(data.data));
        } else {
          
          // Fetch Data from local vuex-orm
          const arOfObjectsFromClientDB = allPatientDataTbls[pSelectedSuggestion.value].fnGetPresentUniqueUuidNotEmptyRows(
            ['description']
          )
          
          if (arOfObjectsFromClientDB.length > 0) {   
            this.localOrmResult.push({[pSelectedSuggestion.value]:arOfObjectsFromClientDB});
          }
        }
      }  else if (pSelectedSuggestion.displayLocation === 'edit-layer') {
        const objCtToAdd = {
          label: pSelectedSuggestion.value,
          // Here I have to use a variable otherwise webpack gives error. https://stackoverflow.com/questions/57349167/vue-js-dynamic-image-src-with-webpack-require-not-working
          ctToShow: require('@/components/' + pSelectedSuggestion.ctToShow).default,
          id: pSelectedSuggestion.id,
          closable: true,
        }
        // Change layer
        this.$store.commit('mtfShowNewFirstTabInEditLayer', objCtToAdd)
      }
      /* Goal: Once search work is done then the input area needs to be empty */
      this.searchKeyword = ''
      
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
        const arFromClientTbl = clientTblOfDynamicComponents.query().where('name', pSelectedSuggestion.value).get()

        if (arFromClientTbl.length > 0) {
          if (arFromClientTbl[0]['clientSideUniqRowId']) {
            clientTblOfDynamicComponents.delete(arFromClientTbl[0]['clientSideUniqRowId'])
          }
        }

        clientTblOfDynamicComponents.insert({
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