<template>
  <div>
    <clientSideTblOfViewCardsInsertData />
    <!-- this 10px is the distance between the card and all other 4 sides. -->
    <div v-for="card in cfArCardsInCsOfVl" :key="card.clientSideUniqRowId" style="margin: 10px">
      <!-- Using https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
      <!--  Why not use keep-alive before <component v-bind:is="card.ctToShow"></component> 
                Sorrounding component with keepAlive does not help. Since previous rendering of rex
                is not hidden. When user types rex 2 times, rex is being displayed 2 times

                The vue inbuilt component <component /> acts as a placeholder for another component and accepts a special :is prop with the name of the component it should render.                
            -->
      <component :is="card.componentToShowObject"></component>
    </div>
  </div>
</template>
<script>
import clientSideTblOfViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/mts-table.js'
import clientSideTblOfViewCardsInsertData from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/static-data/insert-into-left-side-view-layer-cards.vue'
import clientSideTblCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: { clientSideTblOfViewCardsInsertData },
  data() {
    return {
      dArOfComponentObjectsCached: [], // first dimension is the clientSideUniqRowId and second is the cache of the object
    }
  },
  computed: {
    cfArCardsInCsOfVl() {
      /* Needs following where clauses:
       if type of Ct is Health or Other
       Which user role it is. Since each user role has access to a different set of cards.
       */

      // Goal 1: Find out what classification of Components does the user want to see
      //      debugger
      let vComponentClassificationToShowUser = null
      const arOfObjectsFromCommonForAllComponents = clientSideTblCommonForAllComponents
        .query()
        .where('fieldName', 'classification-of-component-to-show-on-left-hand-side')
        .get()

      if (arOfObjectsFromCommonForAllComponents.length > 0) {
        vComponentClassificationToShowUser = arOfObjectsFromCommonForAllComponents[0]['fieldValue']
      }
      if (!vComponentClassificationToShowUser) vComponentClassificationToShowUser = 'health'

      // Goal 2: Find all components for that classification
      const arOfObjectsFromClientSideDB = clientSideTblOfViewCards
        .query()
        .where('componentCurrentValueForCustomizingViewState', (value) => value > 0)
        .where('classificationOfComponent', vComponentClassificationToShowUser)
        .orWhere('classificationOfComponent', 'commonForHealthAndOther')
        .get()

      // Goal3: Make an array of Ct objects

      let rowId = 0

      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        rowId = arOfObjectsFromClientSideDB[i]['clientSideUniqRowId']

        if (!this.dArOfComponentObjectsCached[rowId]) {
          this.dArOfComponentObjectsCached[rowId] = require('@/components/' +
            arOfObjectsFromClientSideDB[i]['componentToShowPath']).default
        }

        arOfObjectsFromClientSideDB[i]['componentToShowObject'] = this.dArOfComponentObjectsCached[
          rowId
        ]
      }

      return arOfObjectsFromClientSideDB
    },
  },
}
</script>
