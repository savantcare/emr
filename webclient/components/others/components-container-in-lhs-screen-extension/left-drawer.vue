<!-- Params
      Goal: Do not show the shadow so doctor can read the view layer.
            modal=false means -> Do now show shadowing layer
  -->
<!--
  Why we change drawer size from 40% to 100%?
  -- Previously, drawer width was not fixed. That means, drawer size would be 40% of page width.
  But now, I have fixed the drawer width as 700px, css given on the bottom of page. That means, drawer size should be 100% of drawer width ie; 700px.
  -->

<template>
  <el-drawer
    :visible="cfDrawerVisibility"
    direction="ltr"
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
      <ctSearchBoxInsideLeftScreenExtension></ctSearchBoxInsideLeftScreenExtension>
    </div>
  </el-drawer>
</template>

<script>
import clientSideTblOfViewCards from '@/components/others/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'
import ctSearchBoxInsideLeftScreenExtension from '@/components/others/search-phrases/call-init-of-components-and-handle-search-selection.vue'
import clientSideTableOfCommonForAllComponents from '@/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {
      dArOfComponentObjectsCached: [],
    }
  },
  components: {
    ctSearchBoxInsideLeftScreenExtension,
  },
  computed: {
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
    cfDrawerVisibility() {
      const drawerVisibility = clientSideTableOfCommonForAllComponents.find(
        'leftScreenExtensionDrawerVisibility'
      )

      if (drawerVisibility) {
        if (drawerVisibility['fieldValue'] == 'true') {
          return true
        }
      }

      return false
    },
  },
  mounted() {
    // console.log('Drawer ct mounted')
  },
  methods: {
    handleClose(done) {
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'leftScreenExtensionDrawerVisibility', fieldValue: false }],
      })
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 50 }],
      })

      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-right-side-split-size', fieldValue: 50 }],
      })
    },
  },
}
</script>

<style>
/**
Why I have added the following css?
  1. 'left: unset;' -> Remove overlay from remaining part of the page which is not covered by drawer.
  2. 'width: 700px;' -> The width of drawer should be 50% of page width, ie; 700px. We have developed this software to run on 1400px X 900px.
 */
body .el-drawer__wrapper {
  right: unset;
  width: 490px;
}
</style>
