import orm from '~/cts/spi/1t-1rMf/weight/db/orm-weight.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // TODO: Load based on patient uuid in the URL
      const pro = await orm.api().get(orm.apiUrl + '/1')
      if (pro.ok) {
      }
    },
  },
}
