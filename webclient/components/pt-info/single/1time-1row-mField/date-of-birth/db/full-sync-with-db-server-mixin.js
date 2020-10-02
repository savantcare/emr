/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */
import clientSideTable from '~/components/pt-info/single/1time-1row-mField/date-of-birth/db/client-side/structure/table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      const pro = await clientSideTable.api().get(clientSideTable.apiUrl + '/bfe041fa-073b-4223-8c69-0540ee678ff8')
      if (pro.ok) {
      }
    },
  },
}
