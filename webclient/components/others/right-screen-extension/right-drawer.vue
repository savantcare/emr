<!-- Params
      Goal: Do not show the shadow so doctor can read the view layer.
            modal=false means -> Do now show shadowing layer
  -->
<template>
  <el-drawer
    title="Work product mode"
    :visible="cfDrawerVisibility"
    direction="rtl"
    :before-close="handleClose"
    :modal="false"
    :close-on-press-escape="true"
    :show-close="true"
    :wrapperClosable="false"
    size="100%"
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

      <ctSearchBoxInsideRightScreenExtension></ctSearchBoxInsideRightScreenExtension>
    </div>
  </el-drawer>
</template>

<script>
import clientSideTblOfViewCards from '@/components/others/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'

import ctSearchBoxInsideRightScreenExtension from '@/components/others/search-phrases/call-insert-search-phases-of-components-and-handle-selection.vue'
import clientSideTableOfCommonForAllComponents from '@/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {
      direction: 'ltr',
      dArOfComponentObjectsCached: [],
    }
  },
  components: {
    ctSearchBoxInsideRightScreenExtension,
  },
  computed: {
    cfArCardsInCsOfVl() {
      const arOfObjectsFromClientSideDB = clientSideTblOfViewCards
        .query()
        .where('componentCurrentValueForCustomizingViewState', (value) => value > 0)
        .where(
          'identifierOfparentComponentThatIncludedThisSearchComponent',
          'ctSearchBoxInsideRightScreenExtension'
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

    cfDrawerVisibility() {
      const arOfObjectsFromCommonForAllComponents = clientSideTableOfCommonForAllComponents
        .query()
        .where('fieldName', 'setRightScreenExtensionDrawerVisibility')
        .get()

      if (arOfObjectsFromCommonForAllComponents.length > 0) {
        if (arOfObjectsFromCommonForAllComponents[0]['fieldValue'] === 'true') {
          return true
        } else {
          return false
        }
      }
    },
  },
  mounted() {
    // console.log('Drawer ct mounted')
  },
  methods: {
    handleClose(done) {
      clientSideTableOfCommonForAllComponents.update({
        where: (record) => record.fieldName === 'setRightScreenExtensionDrawerVisibility',
        data: {
          fieldValue: false,
        },
      })
    },
  },
}
</script>
