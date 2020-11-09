<template>
  <div>
    <initializeGoalComponent />
  </div>
</template>

<script>
import initializeGoalComponent from '@/components/temporal/goals/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientTbl from '~/components/temporal/goals/db/client-side/structure/goals-of-a-patient-table.js'

export default {
  components: {
    initializeGoalComponent,
  },
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      */
    if (process.env.loadInitialDataFromServer === true) {
      const proGoalsFromDB = await clientTbl.api().get(clientTbl.apiUrl)
      if (proGoalsFromDB.ok) {
      }
    }
  },
}
</script>
