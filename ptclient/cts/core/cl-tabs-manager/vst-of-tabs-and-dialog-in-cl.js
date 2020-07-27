import ormSearchPhrasesOfCt from '~/cts/core/vl-search/orm-search-phrases-of-ct'

export default {
  state: {
    // #region state
    vblIsdialogHoldingTabsInClVisible: false,
    arTabs: [], // Template has a for loop running on this.
    vsSelectedTabId: '', // arTabs might have 10 tabs. Out of those which tab is active needs to be stored outside the array of 10 tabs
    // #endregion state
    vsDialogWidth: 'small', // set default CL dialog width
  },
  mutations: {
    mtfSetTabDialogVisibility(state, value) {
      state.vblIsdialogHoldingTabsInClVisible = value
    },
    mtfSetTabDialogWidth(state, value) {
      console.log('Dialog width', value)
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
      state.arTabs = [pTab]
      state.vblIsdialogHoldingTabsInClVisible = true
      state.vsSelectedTabId = pTab.id
      state.vsDialogWidth = pTab.ctWidth

      // This is the 2nd tab with the + sign. It is added at the end of the set of tabs.
      // Just like chrome browser add new tab control.
      const objNewTab = {
        label: '+',
        closable: false,
        ctToShow: require('./ct-search-to-add-tab-in-cl').default,
        id: '0',
        ctWidth: 'small', // Provide ct width in CL
      }

      state.arTabs.push(objNewTab)

      console.log('state-> ', state.arTabs)
    },
    async mtfShowNewFirstTabInClFromSearchPhrase(state, pPayload) {
      // Goal: Find out which CT will handle this work
      const arFromORM = await ormSearchPhrasesOfCt.query().search(pPayload.searchTerm).get()
      const objSearchRowFromORM = arFromORM[0]

      // Goal: Create the obj Tab that will be worked upon by for loop in
      // /cts/core/cl-tabs-manager/ctShowAddAndRemoveTabsInDialog.vue: 76
      const tab = {
        label: objSearchRowFromORM.value, // TODO: Should be called vsLabel

        /*
        import and require are similar
        require can use a variable.
        import cannot use a variable. Benefits: webpack optimization
        How optimize? Webpack can remove that module completely if module is not used

        What does .default do?
        Related to webpack and HMR (Hot module reload)
        Ref: https://stackoverflow.com/questions/46215705/why-need-default-after-require-method-in-vue

        */

        ctToShow: require('@/cts/' + objSearchRowFromORM.ctToShowInCL).default,
        ctAbbr: objSearchRowFromORM.ctAbbr, // TODO: Should be called vsCtAbbr
        id: objSearchRowFromORM.id, // This id comes from search phrases UI to Ct. TODO: should be called vnID
        vstPropsToGiveToCt: pPayload.pPropsToGiveToCt, // This holds all the data for the record we want to change in cl
        closable: true, // TODO: Should be called blClosable
        ctWidth: objSearchRowFromORM.ctWidth,
      }

      console.log(tab)

      this.commit('mtfShowNewFirstTabInCl', tab)
    },
  },
}
