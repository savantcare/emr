// Reference implementation
import objOrm from '~/cts/spi/1t-Mrow-1Field/rem/db/vuex-orm/orm.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      /* 
        TODO: Need to restrict the load to current patient
        api is vuex-orm-axios plugin function
        When using json-server backend the code is:
        const proRemsFromDB = await objOrm.api().get(objOrm.apiUrl + '/getAll')
      */
      const proRemsFromDB = await objOrm.api().get(objOrm.apiUrl)
      if (proRemsFromDB.ok) {
      }
    },
  },
}
