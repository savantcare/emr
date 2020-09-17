// This file is structured based on https://github.com/vuex-orm/vuex-orm-examples-nuxt/tree/master/store
import Vue from 'vue'
import Vuex from 'vuex'

import VuexormsearchPhrasesOfCt from '@vuex-orm/plugin-search'
import VuexORM from '@vuex-orm/core'
import axios from 'axios'
import VuexORMAxios from '@vuex-orm/plugin-axios'

// Ref: https://github.com/eldomagan/vuex-orm-localforage#installation
import vstOfTabsAndDialogInClModule from '~/cts/core/manage-cl-tabs/vst-of-tabs-and-dialog-in-cl'

// Full form: Vue State Of Cards In Current state Of View layer Module
import vstOfCardsInPtsOfVlModule from '~/cts/core/manage-ptsvl-cards/vst-of-cards-in-pts-of-vl'

import VueStateOfFeedDrawerModule from '~/cts/core/feed/vue-state-of-feed-drawer'
import VueStateOfMapDrawerModule from '~/cts/core/map/vue-state-of-map-drawer'
import VueStateOfDiscontinuedDrawerModule from '~/cts/core/ct-discontinued-rows/vue-state-of-discontinued-drawer'

import database from '~/store/vuex-orm-register'

// Ref: https://stackoverflow.com/a/62247034
const { v1: uuidv1 } = require('uuid')

VuexORM.use(VuexORMAxios, { axios })
VuexORM.use(VuexormsearchPhrasesOfCt, {
  tokenize: true, // Ref: https://github.com/vuex-orm/plugin-search#configurations needed so "goal add" works when list has "add goal"
  matchAllTokens: true, // needed so "goal add" shows only opyion 1 when list has "add goal" and "multi rate goal"
  threshold: 0.1, // height and weight are very close and need to be distinguished so set thresold to .1
})

Vue.use(uuidv1)

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: () => ({}),
    modules: {
      vstObjTabsInCL: vstOfTabsAndDialogInClModule,

      // Full form: view state object feed drawer
      vstObjFeedDrawer: VueStateOfFeedDrawerModule,
      vstObjMapDrawer: VueStateOfMapDrawerModule,
      vstObjDiscontinuedDrawer: VueStateOfDiscontinuedDrawerModule,

      // Full form: view state object cards in current state of view layer
      vstObjCardsInPtsOfVl: vstOfCardsInPtsOfVlModule,
    },
    plugins: [VuexORM.install(database)],
  })
}

export default createStore
