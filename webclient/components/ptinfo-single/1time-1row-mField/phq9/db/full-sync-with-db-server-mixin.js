import clientSideTable from '~/components/ptinfo-single/1time-1row-mField/phq9/db/client-side/structure/patient-table-of-phq9.js'

export default {
  methods: {
    async mxGetDataFromDb() {
      const phq9Response = await clientSideTable.api().get(clientSideTable.apiUrl)
      if (phq9Response.statusText == 'ok') {
      }
    },
  },
}
