import ormName from '~/cts/spi/1rNf/name/db/orm-name.js'
export default {
  methods: {
    async getDataFromDBMx() {
      // check length and only load if its empty
      // Also need to restrict the load to current patient
      const proNameFromDB = await ormName.api().get(ormName.apiUrl + '/1')
      if (proNameFromDB.ok) {
      }
    },
  },
}
