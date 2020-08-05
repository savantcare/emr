/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */
import orm from '~/cts/spi/1t-1rMf/weight/db/orm.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      const pro = await orm.api().get(orm.apiUrl + '/1')
      if (pro.ok) {
      }
    },
  },
}
