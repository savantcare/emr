// Reference implementation
import clientTbl from '~/components/patient-data/phone-numbers/db/client-side/structure/table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // $fetch use for Load data from the IndexedDB store associated to a model and persist them in the Vuex Store
      await clientTbl.$fetch()
      // TODO: Need to restrict the load to current patient
      // api is vuex-orm-axios plugin function
      const proNumbersFromDB = await clientTbl.api().get(clientTbl.apiUrl + '/getAll')
      //   debugger
      if (proNumbersFromDB.ok) {
      }
    },
  },
}
