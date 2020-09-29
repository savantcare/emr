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
      const arOfObjectsFromClientSideDB = clientSideTblOfViewCards
        .query()
        .where('vIfState', (value) => value > 0)
        .get()
      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        if (!arOfObjectsFromClientSideDB[i]['ctToShowObj']) {
          console.log('loading the Ct Obj')
          arOfObjectsFromClientSideDB[i]['ctToShowObj'] = require('@/components/' +
            arOfObjectsFromClientSideDB[i]['ctToShowPath']).default
        }
      }

      return arOfObjectsFromClientSideDB
    },
  },
}
</script>
