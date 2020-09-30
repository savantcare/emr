<template>
  <div>
    <clientSideTblOfViewCardsInit />
    <div v-for="card in cfArCardsInCsOfVl" :key="card.clientSideUniqRowId" style="margin: 10px">
      <!-- Using https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
      <!--  Why not use keep-alive before <component v-bind:is="card.ctToShow"></component> 
                Sorrounding component with keepAlive does not help. Since previous rendering of rex
                is not hidden. When user types rex 2 times, rex is being displayed 2 times

                The vue inbuilt component <component /> acts as a placeholder for another component and accepts a special :is prop with the name of the component it should render.                
            -->
      <component :is="card.ctToShowObj"></component>
    </div>
  </div>
</template>
<script>
import clientSideTblOfViewCards from '@/components/core/manage-mts-view-layer-cards/db/client-side/structure/table.js'
import clientSideTblOfViewCardsInit from '@/components/core/manage-mts-view-layer-cards/db/client-side/static-data/insert-into-left-side-view-layer-cards.vue'
import clientSideTblCommonForAllComponents from '~/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  components: { clientSideTblOfViewCardsInit },
  data() {
    return {}
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
        .where('fieldName', 'classificationOfComponentToShowOnMultiTimeStateSide')
        .get()

      console.log(arOfObjectsFromCommonForAllComponents)

      if (arOfObjectsFromCommonForAllComponents.length > 0) {
        vComponentClassificationToShowUser = arOfObjectsFromCommonForAllComponents[0]['fieldValue']
      }
      if (!vComponentClassificationToShowUser) vComponentClassificationToShowUser = 'health'

      // Goal 2: Find all components for that classification
      const arOfObjectsFromClientSideDB = clientSideTblOfViewCards
        .query()
        .where('componentCurrentViewState', (value) => value > 0)
        .where('classificationOfComponent', vComponentClassificationToShowUser)
        .orWhere('classificationOfComponent', 'commonForHealthAndOther')
        .get()

      // Goal3: Make an array of Ct objects
      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        if (!arOfObjectsFromClientSideDB[i]['ctToShowObj']) {
          console.log('loading the Ct Obj')
          arOfObjectsFromClientSideDB[i]['ctToShowObj'] = require('@/components/' +
            arOfObjectsFromClientSideDB[i]['componentToShowPath']).default
        }
      }

      return arOfObjectsFromClientSideDB
    },
  },
}
</script>
