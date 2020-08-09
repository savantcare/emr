/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */

import orm from '~/cts/spi/1t-1rMf/height/db/orm.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      const pro = await orm.api().get(orm.apiUrl + '?ptUUID=abcd')
      if (pro.ok) {
      }
    },
  },
}
