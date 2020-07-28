<!--
Features needed in search 
1. Highlight search term in results 
2. Search for "goal add" when the search list has "add goal" -> vuex-orm-search is able to do this.
3. Deal with wrong spellings -> vuex-orm-search is able to do this.
-->

<template>
  <div style="text-align: center;">
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
import ormSearchPhrasesOfCt from '@/cts/core/manage-csvl-cards/orm-search-phrases-of-ct'

export default {
  data() {
    return { keyword: '' }
  },
  computed: {
    cfFireWhenActiveTabIDChanges() {
      return this.$store.state.vstObjTabsInCL.vsSelectedTabId
    },
  },
  watch: {
    // Why? el-input has autofocus property but el-autocomplete does not have auto-focus
    // How? Ref: https://stackoverflow.com/questions/43270159/vue-js-2-how-to-watch-store-values-from-vuex
    cfFireWhenActiveTabIDChanges(newTabID, oldTabID) {
      console.log('New tab id is: ', newTabID)

      // get the CL selected tab and update the dialog width accoding to the tab width
      const clSelectedTab = this.$store.state.vstObjTabsInCL.arTabs.find(
        (element) => element.id === newTabID
      )
      console.log('selected tab: ', clSelectedTab)
      this.$store.commit('mtfSetTabDialogWidth', clSelectedTab.ctWidth)

      if (newTabID === '0') {
        this.$refs.searchbox.focus()
        this.keyword = '' // when this tab is activated 2nd time the search box will be empty
        console.log(`Msg from L2 search ct: Focus changed and keyword empty`)
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
      let arFromORM = ormSearchPhrasesOfCt
        .query()
        .where('layer', 'change')
        .search(pQueryString.trim())
        .get() // trim needs for "goal " to match "goal"
      console.log('search result from orm model', pQueryString, arFromORM)

      arFromORM = arFromORM.map((result) => {
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
      pCallBack(arFromORM)
    },
    mfHandleSuggestionSelectedByUser(pSelectedSuggestion) {
      console.log('Selected suggestion is', pSelectedSuggestion)
      const objAddTab = {
        label: pSelectedSuggestion.value.replace(/(<([^>]+)>)/gi, ''),
        // Here I have to use a variable otherwise webpack gives error. https://stackoverflow.com/questions/57349167/vue-js-dynamic-image-src-with-webpack-require-not-working
        ctToShow: require('@/cts/' + pSelectedSuggestion.ctToShow).default,
        id: pSelectedSuggestion.id,
        closable: true,
        ctWidth: pSelectedSuggestion.ctWidth,
      }
      this.$store.commit('mtfAdditionalTabAddOrActivate', objAddTab)
    },
  },
}
</script>
