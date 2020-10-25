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
    class="leftScreenExtensionDrawer"
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
      <div v-for="card in cfArCardsInLeftSideOfViewLayer" :key="card.clientSideUniqRowId" style="margin: 10px">
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
import clientTblOfViewCards from '@/components/non-temporal/search-phrases/db/client-side/structure/table-of-cards-chosen-by-user-to-display.js'
import ctSearchBoxInsideLeftScreenExtension from '@/components/non-temporal/search-phrases/show-auto-complete-search-box-and-handle-search-selection.vue'
import clientTblOfCommonForAllComponents from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

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
    cfArCardsInLeftSideOfViewLayer() {
      const arOfObjectsFromClientDB = clientTblOfViewCards
        .query()
        .where('currentDisplayStateOfComponent', (value) => value > 0)
        .where('identifierOfparentComponentThatIncludedThisSearchComponent', 'ctSearchBoxInsideLeftScreenExtension')

        .get()

      let componentToShowPath = ''

      for (var i = 0; i < arOfObjectsFromClientDB.length; i++) {
        componentToShowPath = arOfObjectsFromClientDB[i]['componentToShowPath']
        if (!this.dArOfComponentObjectsCached[componentToShowPath]) {
          console.log('requring the Ct Obj')

          this.dArOfComponentObjectsCached[componentToShowPath] = require('@/components/' +
            arOfObjectsFromClientDB[i]['componentToShowPath']).default
        }

        arOfObjectsFromClientDB[i]['componentToShowObject'] = this.dArOfComponentObjectsCached[componentToShowPath]
      }

      return arOfObjectsFromClientDB
    },
    cfDrawerVisibility() {
      const drawerVisibility = clientTblOfCommonForAllComponents.find('left-screen-extension-drawer-visibility')

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
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'left-screen-extension-drawer-visibility', fieldValue: false }],
      })
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 50 }],
      })

      clientTblOfCommonForAllComponents.insertOrUpdate({
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
  2. 'width: 700px;' -> The width of drawer should be 50% of page width, ie; 700px. We have developed this software to run on 1440px X 900px.
 */
body .leftScreenExtensionDrawer {
  right: unset;
  width: 504px; /* This is 35% of total screen widfth of 1440px. Since when we show the left drawer in the analysis mode we give the drawer 35% of the total available space. We give 65 to graphs */
}
</style>
