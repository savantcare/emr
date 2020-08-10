// Reference implementation
import orm from '~/cts/spi/1t-Mr1f/rem/db/vuex-orm/rem.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // TODO: Need to restrict the load to current patient
      // api is vuex-orm-axios plugin function
      const proRemsFromDB = await orm.api().get(orm.apiUrl + '/getAll')
      if (proRemsFromDB.ok) {
      }
    },
  },
}
