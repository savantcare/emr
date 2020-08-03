import ormRem from '~/cts/spi/Nr1f/rem/db/vuex-orm/rem.js'
export default {
  methods: {
    async getDataFromDBMx() {
      // Need to restrict the load to current patient
      const proRemsFromDB = await ormRem.api().get(ormRem.apiUrl + '/getAll')
      if (proRemsFromDB.ok) {
      }
    },
  },
}
