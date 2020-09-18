import tblSearchPhrasesOfCt from '~/components/core/search-phrases/db/client-side/search-phrases-of-components-table'

export default {
  state: {
    vblIsdialogHoldingTabsInClVisible: false,
    arTabs: [], // Template has a for loop running on this. // TODO: Can name be more readable
    vsSelectedTabId: '', // arTabs might have 10 tabs. Out of those which tab is active needs to be stored outside the array of 10 tabs
    vsDialogWidth: 'small', // set default CL dialog width // TODO: Can this be removed? Since arTabs already has this.
  },
  mutations: {
    mtfSetTabDialogVisibility(state, value) {
      state.vblIsdialogHoldingTabsInClVisible = value
    },
    mtfSetTabDialogWidth(state, value) {
      state.vsDialogWidth = value
    },
    mtfAdditionalTabAddOrActivate(state, pObjAdditionalTab) {
      /* Two cases are possible:
      1. Tab already exisits: In this case make that tab active.
      2. Tab does not exist: In this case create a new tab
      */

      // Case 1 has happened hence an existing tab needs to be activated
      const checkIfAdditionalTabIsExisting = state.arTabs.filter((currentTab) => {
        // AG: Why not use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        return currentTab.id === pObjAdditionalTab.id
      })

      // Case 2 has happened hence a new tab needs to be added
      if (checkIfAdditionalTabIsExisting.length === 0) {
        // Why splice? Since the "+" sign needs to be the last tab.
        state.arTabs.splice(state.arTabs.length - 1, 0, pObjAdditionalTab)
      }

      // Deciding which tab to make active
      state.vsSelectedTabId = pObjAdditionalTab.id
    },

    mtfSetvsSelectedTabId(state, value) {
      state.vsSelectedTabId = value
    },
    mtfSetArTabs(state, value) {
      state.arTabs = value
    },
    mtfShowNewFirstTabInCl(state, pTab) {
      // instead of = assignement if a push was done then old tabs will still be there.
      state.arTabs = [pTab]
      state.vblIsdialogHoldingTabsInClVisible = true
      state.vsSelectedTabId = pTab.id
      state.vsDialogWidth = pTab.ctWidthInCl // TODO: since each tab has it is this needed seperately.

      // This is the 2nd tab with the + sign. It is added at the end of the set of tabs.
      // Just like chrome browser add new tab control.
      const objNewTab = {
        label: '+',
        closable: false,
        ctToShow: require('./search-inside-add-tab-in-cl-ct').default,
        id: '0',
        ctWidthInCl: 'small', // Provide ct width in CL
      }

      state.arTabs.push(objNewTab)
    },
    async mtfShowNewFirstTabInClFromSearchPhrase(state, pPayload) {
      // Goal 1: Find out which CT will handle this search term
      const arFromOrm = await tblSearchPhrasesOfCt
        .query()
        .where('displayLocation', 'cl')
        .search(pPayload.searchTerm.trim(), {
          threshold: 0.1,
          keys: ['value'], // If key is not specified it will search all fields https://github.com/client-side/plugin-search#during-query-chain
        })
        .get()
      const objSearchRowFromOrm = arFromOrm[0]

      // Goal 2: Create the obj Tab that will be worked upon by for loop in
      // /cts/core/manage-cl-tabs/ctShowAddAndRemoveTabsInDialog.vue: 76
      const tab = {
        label: objSearchRowFromOrm.value, // TODO: Should be called vsLabel

        /*
        import and require are similar
        require can use a variable.
        import cannot use a variable. Benefits: webpack optimization
        How optimize? Webpack can remove that module completely if module is not used

        What does .default do?
        Related to webpack and HMR (Hot module reload)
        Ref: https://stackoverflow.com/questions/46215705/why-need-default-after-require-method-in-vue

        */

        ctToShow: require('@/components/' + objSearchRowFromOrm.ctToShow).default,
        ctAbbr: objSearchRowFromOrm.ctAbbr, // TODO: Should be called vsCtAbbr
        id: objSearchRowFromOrm.id, // This id comes from search phrases UI to Ct. TODO: should be called vnID
        vstPropsToGiveToCt: pPayload.pPropsToGiveToCt, // This holds all the data for the record we want to change in cl
        closable: true, // TODO: Should be called blClosable
        ctWidthInCl: objSearchRowFromOrm.ctWidthInCl,
      }
      this.commit('mtfShowNewFirstTabInCl', tab)
    },
  },
}
