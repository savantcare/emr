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
  <el-dialog
    :visible="cfDrawerVisibility"
    :before-close="handleClose"
    :modal="false"
    :close-on-press-escape="true"
    :show-close="true"
    width="80%"
    :lock-scroll="false"
  >
    <div class="block">
      <transition-group name="list" tag="p">
        <div v-for="card in cfArCardsInLeftSideOfViewLayer" :key="card.clientSideUniqRowId" style="margin: 10px">
          <!-- Using https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
          <!--  Why not use keep-alive before <component v-bind:is="card.ctToShow"></component> 
                Sorrounding component with keepAlive does not help. Since previous rendering of rex
                is not hidden. When user types rex 2 times, rex is being displayed 2 times

                The vue inbuilt component <component /> acts as a placeholder for another component and accepts a special :is prop with the name of the component it should render.                
            -->
          <component :is="card.componentToShowObject"></component>
        </div>
      </transition-group>

      <ctSearchBoxInsideRightScreenExtension></ctSearchBoxInsideRightScreenExtension>
    </div>
  </el-dialog>
</template>

<script>
import clientTblOfDynamicCards from '@/components/non-temporal/search-phrases/db/client-side/structure/dynamic-cards-table.js'

import ctSearchBoxInsideRightScreenExtension from '@/components/non-temporal/search-phrases/show-auto-complete-search-box-and-handle-search-selection.vue'
import clientTblOfCommonForAllComponents from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    return {
      dArOfComponentObjectsCached: [],
    }
  },
  components: {
    ctSearchBoxInsideRightScreenExtension,
  },
  computed: {
    cfArCardsInLeftSideOfViewLayer() {
      const arOfObjectsFromClientDB = clientTblOfDynamicCards
        .query()
        .where('currentDisplayStateOfComponent', (value) => value > 0)
        .where('identifierOfparentComponentThatIncludedThisSearchComponent', 'ctSearchBoxInsideRightScreenExtension')
        .get()

      let componentToShowPath = ''

      for (var i = 0; i < arOfObjectsFromClientDB.length; i++) {
        componentToShowPath = arOfObjectsFromClientDB[i]['componentToShowPath']
        if (!this.dArOfComponentObjectsCached[componentToShowPath]) {
          this.dArOfComponentObjectsCached[componentToShowPath] = require('@/components/' +
            arOfObjectsFromClientDB[i]['componentToShowPath']).default
        }

        arOfObjectsFromClientDB[i]['componentToShowObject'] = this.dArOfComponentObjectsCached[componentToShowPath]
      }

      return arOfObjectsFromClientDB
    },

    cfDrawerVisibility() {
      const drawerVisibility = clientTblOfCommonForAllComponents.find('right-screen-extension-drawer-visibility')

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
        data: [{ fieldName: 'right-screen-extension-drawer-visibility', fieldValue: false }],
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
body .rightScreenExtensionDrawer {
  left: unset;
  width: 576px; /* This is 40% of toal width. When we go to product the space distribution is 1.60% to the appt note printable view 2. scBrain 40% */
}

/* Make drawer scrollable */
.el-drawer__body {
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
