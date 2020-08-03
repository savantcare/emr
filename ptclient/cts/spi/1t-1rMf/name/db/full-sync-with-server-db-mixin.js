import ormName from '~/cts/spi/1t-1rMf/name/db/orm-name.js'
export default {
  methods: {
    async getDataFromDBMx() {
      // TODO: Load based on patient uuid in the URL
      const proNameFromDB = await ormName.api().get(ormName.apiUrl + '/1')
      if (proNameFromDB.ok) {
      }
    },
  },
}
