// Reference implementation for non numeric hence no graph
<template>
  <div>
    <initializeNameComponent />
  </div>
</template>

<script>
import initializeNameComponent from '@/components/1time-1row-mField/name/db/client-side/static-data/insert-into-master-of-search-phrases-ct.vue'
import clientSideTableForNameCt from '~/components/1time-1row-mField/name/db/client-side/structure/table.js'

export default {
  components: {
    initializeNameComponent,
  },
  async mounted() {
    const proNameFromDB = await clientSideTableForNameCt
      .api()
      .get(clientSideTableForNameCt.apiUrl + '/01817fb0-c1ef-11ea-a3a5-f36fe4d74da4')

    if (proNameFromDB.ok) {
    }
  },
}
</script>
