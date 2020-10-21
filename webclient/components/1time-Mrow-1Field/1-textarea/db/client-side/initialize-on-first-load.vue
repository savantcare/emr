<template>
  <div></div>
</template>

<script>
import clientSideTable from '~/components/1time-Mrow-1Field/reminders/db/client-side/structure/reminders-of-a-patient-table.js'

export default {
  async mounted() {
    /*
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      */
    const proRemsFromDB = await clientSideTable.api().get(clientSideTable.apiUrl)
    if (proRemsFromDB.ok) {
    }
  },
}
</script>
