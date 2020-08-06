/* Master doc is at reference implementation name/db/full-sync-with-db-server-mixin.js
This file has doc unique to this ct */

import orm from '~/cts/spi/1t-1rMf/height/db/orm.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      /*
        I am removing param '1' from url because We need to fetch history of height from orm to show plot points in height graph.
      */
      const pro = await orm.api().get(orm.apiUrl)
      if (pro.ok) {
      }
    },
  },
}
