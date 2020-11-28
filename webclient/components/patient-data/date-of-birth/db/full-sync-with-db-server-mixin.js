/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */
import clientTbl from '~/components/patient-data/date-of-birth/db/client-side/structure/table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      const pro = await clientTbl.api().get(clientTbl.apiUrl + '?ptUuid=abcd')
      if (pro.ok) {
      }
    },
  },
}
