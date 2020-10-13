// Reference implementation for non numeric hence no graph
<template>
  <div>
    <initializeDateOfBirthComponent />
  </div>
</template>

<script>
import initializeDateOfBirthComponent from '@/components/1time-1row-mField/date-of-birth/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientSideTableForDateOfBirthCt from '~/components/1time-1row-mField/date-of-birth/db/client-side/structure/table.js'

export default {
  components: {
    initializeDateOfBirthComponent,
  },
  async mounted() {
    const proDateOfBirthFromDB = await clientSideTableForDateOfBirthCt
      .api()
      .get(clientSideTableForDateOfBirthCt.apiUrl + '/01817fb0-c1ef-11ea-a3a5-f36fe4d74da4')

    if (proDateOfBirthFromDB.ok) {
    }
  },
}
</script>
