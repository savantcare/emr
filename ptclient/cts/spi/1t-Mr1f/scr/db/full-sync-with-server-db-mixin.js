// Master doc is at reference implementation rem/db/full-sync-with-server-db-mixin.js.
//  This file has doc unique to this ct Code synced with ref implementation on 14th sept 2020
import objOrm from '~/cts/spi/1t-Mr1f/scr/db/vuex-orm/orm.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // api is vuex-orm-axios plugin function
      const proScrsFromDB = await objOrm
        .api()
        .get(objOrm.apiUrl + '/getAll?patientUUID=bfe041fa-073b-4223-8c69-0540ee678ff8')
      if (proScrsFromDB.ok) {
      }
    },
  },
}
