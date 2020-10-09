// Reference implementation
import clientSideTable from '~/components/1time-Mrow-mField/phone-numbers/db/client-side/structure/table.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // TODO: Need to restrict the load to current patient
      // api is vuex-orm-axios plugin function
      const proNumbersFromDB = await clientSideTable.api().get(clientSideTable.apiUrl + '/getAll')
      //   debugger
      if (proNumbersFromDB.ok) {
      }
    },
  },
}
