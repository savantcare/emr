// Reference implementation
import objOrm from '~/components/pt-info/single/1t-Mrow-mField/phone-numbers/db/client-side/structure/table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // TODO: Need to restrict the load to current patient
      // api is vuex-orm-axios plugin function
      const proNumbersFromDB = await objOrm.api().get(objOrm.apiUrl + '/getAll')
      //   debugger
      if (proNumbersFromDB.ok) {
      }
    },
  },
}
