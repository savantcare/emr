import ClientSideTblPatientScreening from '~/components/pt-info/single/1time-Mrow-1Field/scr/db/client-side/structure/scr-table-patient.js'
export default {
  methods: {
    async mxGetDataFromDb() {
      // api is vuex-orm-axios plugin function
      const ptUUID = 'bfe041fa-073b-4223-8c69-0540ee678ff8'
      const proScrsFromDB = await ClientSideTblPatientScreening.api().get(ClientSideTblPatientScreening.apiUrl + '' + ptUUID)

      if (proScrsFromDB.isSaved) {
      }
    },
  },
}
