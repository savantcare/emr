/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */
import clientTbl from '~/components/1time-eachField-1value/vital-signs/sub-cts/blood-sugar-levels/db/client-side/structure/table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      if (process.env.loadInitialDataFromServer === true) {
        const pro = await clientTbl.api().get(clientTbl.apiUrl + '?ptUuid=abcd')
        if (pro.ok) {
        }
      }
    },
  },
}
