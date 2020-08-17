/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */
import objOrm from '~/cts/spi/1t-1rMf/bm/sub-cts/weight/db/orm.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      const pro = await objOrm.api().get(objOrm.apiUrl + '?ptUUID=abcd')
      if (pro.ok) {
      }
    },
  },
}
