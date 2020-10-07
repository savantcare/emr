<!--
Features needed in search 
1. Highlight search term in results 
2. Search for "goal add" when the search list has "add goal" -> vuex-orm-search is able to do this.
3. Deal with wrong spellings -> vuex-orm-search is able to do this.
-->

<template>
  <div style="text-align: center">
    <el-autocomplete
      ref="searchbox"
      v-model="keyword"
      class="inline-input"
      :fetch-suggestions="mfQuerySearchTerms"
      :trigger-on-focus="true"
      :highlight-first-item="true"
      placeholder="Please Input"
      prefix-icon="el-icon-search"
      clearable
      @select="mfHandleSuggestionSelectedByUser"
    >
      <template slot-scope="{ item }"> <div class="value" v-html="item.value"></div> </template
    ></el-autocomplete>
  </div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/others/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components.js'

export default {
  data() {
    return { keyword: '' }
  },
  computed: {
    cfFireWhenActiveTabIdChanges() {
      return this.$store.state.vstObjTabsInCL.vsSelectedTabId
    },
  },
  watch: {
    // Why? el-input has autofocus property but el-autocomplete does not have auto-focus
    // How? Ref: https://stackoverflow.com/questions/43270159/vue-js-2-how-to-watch-store-values-from-vuex
    cfFireWhenActiveTabIdChanges(newTabId, oldTabId) {
      // get the CL selected tab and update the dialog width accoding to the tab width
      const clSelectedTab = this.$store.state.vstObjTabsInCL.arTabs.find(
        (element) => element.id === newTabId
      )
      this.$store.commit('mtfSetTabDialogWidth', clSelectedTab.ctWidthInEditLayer)

      if (newTabId === '0') {
        this.$refs.searchbox.focus()
        this.keyword = '' // when this tab is activated 2nd time the search box will be empty
      }
    },
  },
  methods: {
    // string highlighter function
    searchStrHighlighter(str, findArray) {
      let i
      let regex = []
      for (i = 0; i < findArray.length; i++) {
        regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$&'))
      }
      regex = regex.join('|')
      str = str.replace(new RegExp(regex, 'ig'), function (matched) {
        return '<b>' + matched + '</b>'
      })
      return str
    },

    mfQuerySearchTerms(pQueryString, pCallBack) {
      let arFromClientSideTable = clientSideTblOfCtSearchPhrases
        .query()
        .where('displayLocation', 'edit-layer') // excluding everything where the displayLocation is view layer
        .where('needsRowIdToWork', 'no') // execluding all rows that have scope=row. Since for scope=row i need the row id. Row id is not available in the search box. rowID is only available when clicking on an icon before the row
        .search(pQueryString.trim())
        .get() // trim needs for "goal " to match "goal"

      arFromClientSideTable = arFromClientSideTable.map((result) => {
        let finalStr = ''
        if (pQueryString.length > 0) {
          const strings = pQueryString.split(' ')
          const finderString = []
          strings.forEach((string) => {
            finderString.push(string)
          })
          finalStr = this.searchStrHighlighter(result.value, finderString) // highlight search key word on suggestion list
        } else {
          finalStr = result.value
        }
        result.value = finalStr
        return result
      })
      pCallBack(arFromClientSideTable)
    },
    mfHandleSuggestionSelectedByUser(pSelectedSuggestion) {
      const objAddTab = {
        label: pSelectedSuggestion.value.replace(/(<([^>]+)>)/gi, ''),
        // Here I have to use a variable otherwise webpack gives error. https://stackoverflow.com/questions/57349167/vue-js-dynamic-image-src-with-webpack-require-not-working
        ctToShow: require('@/components/' + pSelectedSuggestion.ctToShow).default,
        id: pSelectedSuggestion.id,
        closable: true,
        ctWidthInEditLayer: pSelectedSuggestion.ctWidthInEditLayer,
      }
      this.$store.commit('mtfAdditionalTabAddOrActivate', objAddTab)
    },
  },
}
</script>
