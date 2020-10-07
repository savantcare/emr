<!-- Params
      Goal: Do not show the shadow so doctor can read the view layer.
            modal=false means -> Do now show shadowing layer
  -->
<template>
  <el-drawer
    title="Analysis mode"
    :visible="cfDrawerVisibility"
    direction="ltr"
    :before-close="handleClose"
    :modal="false"
    :close-on-press-escape="true"
    :show-close="true"
    :wrapperClosable="false"
    size="35%"
    :lock-scroll="false"
  >
    <div class="block">
      <div v-for="card in cfArCardsInCsOfVl" :key="card.clientSideUniqRowId" style="margin: 10px">
        <!-- Using https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
        <!--  Why not use keep-alive before <component v-bind:is="card.ctToShow"></component> 
                Sorrounding component with keepAlive does not help. Since previous rendering of rex
                is not hidden. When user types rex 2 times, rex is being displayed 2 times

                The vue inbuilt component <component /> acts as a placeholder for another component and accepts a special :is prop with the name of the component it should render.                
            -->
        <component :is="card.componentToShowObject"></component>
      </div>
      <ctSearchBoxInsideLeftScreenExtension></ctSearchBoxInsideLeftScreenExtension>
    </div>
  </el-drawer>
</template>

<script>
import clientSideTblOfViewCards from '@/components/core/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'
import ctSearchBoxInsideLeftScreenExtension from '@/components/core/search-phrases/call-insert-search-phases-of-components-and-handle-selection.vue'

export default {
  data() {
    return {
      direction: 'ltr',
      dArOfComponentObjectsCached: [],
    }
  },
  components: {
    ctSearchBoxInsideLeftScreenExtension,
  },
  computed: {
    cfDrawerVisibility: {
      get() {
        return this.$store.state.vstObjFeedDrawer.vblIsFeedDrawerVisible
      },
      set(value) {
        this.$store.commit('mtfSetFeedDrawerVisibility', value)
      },
    },
    cfArCardsInCsOfVl() {
      const arOfObjectsFromClientSideDB = clientSideTblOfViewCards
        .query()
        .where('componentCurrentValueForCustomizingViewState', (value) => value > 0)
        .where(
          'identifierOfparentComponentThatIncludedThisSearchComponent',
          'ctSearchBoxInsideLeftScreenExtension'
        )

        .get()

      let componentToShowPath = ''

      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        componentToShowPath = arOfObjectsFromClientSideDB[i]['componentToShowPath']
        if (!this.dArOfComponentObjectsCached[componentToShowPath]) {
          console.log('requring the Ct Obj')

          this.dArOfComponentObjectsCached[componentToShowPath] = require('@/components/' +
            arOfObjectsFromClientSideDB[i]['componentToShowPath']).default
        }

        arOfObjectsFromClientSideDB[i]['componentToShowObject'] = this.dArOfComponentObjectsCached[
          componentToShowPath
        ]
      }

      return arOfObjectsFromClientSideDB
    },
  },
  mounted() {
    // console.log('Drawer ct mounted')
  },
  methods: {
    handleClose(done) {
      // console.log('In the handle close function')
      this.cfDrawerVisibility = false
    },
  },
}
</script>
