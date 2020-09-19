/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */

import objOrm from '~/components/pt-info/single/1t-1row-mField/bm/sub-cts/height/db/client-side/structure/table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      const pro = await objOrm.api().get(objOrm.apiUrl + '?ptUUID=abcd')
      if (pro.ok) {
      }
    },
  },
}
