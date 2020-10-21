/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */
import clientSideTable from '~/components/1time-eachField-1value/vital-signs/sub-cts/blood-pressure-levels/db/client-side/structure/table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      const pro = await clientSideTable.api().get(clientSideTable.apiUrl + '?ptUuid=abcd')
      if (pro.ok) {
      }
    },
  },
}
