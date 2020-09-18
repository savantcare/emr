// Reference implementation
import objOrm from '~/components/pt-info/single/1t-Mrow-1Field/reminder/db/client-side/structure/rem-table.js'
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
