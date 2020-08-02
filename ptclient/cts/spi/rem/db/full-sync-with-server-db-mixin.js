import ormRem from '@/cts/spi/rem/db/vuex-orm/rem.js'
export default {
  methods: {
    async getDataFromDB() {
      // Need to restrict the load to current patient
      const proRemsFromDB = await ormRem.api().get(ormRem.apiUrl + '/getAll')
      if (proRemsFromDB.ok) {
      }
    },
  },
}
