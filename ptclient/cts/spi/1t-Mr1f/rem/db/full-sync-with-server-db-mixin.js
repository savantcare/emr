import ormRem from '~/cts/spi/1t-Mr1f/rem/db/vuex-orm/rem.js'
export default {
  methods: {
    async getDataFromDBMx() {
      // Need to restrict the load to current patient
      // api is vuex-orm-axios plugin function
      const proRemsFromDB = await ormRem.api().get(ormRem.apiUrl + '/getAll')
      if (proRemsFromDB.ok) {
      }
    },
  },
}
