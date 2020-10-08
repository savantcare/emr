// Reference implementation
import clientSideTblPatientDiagnosis from './client-side/structure/patient-table-of-diagnosis'
export default {
  methods: {
    async mxGetDataFromDb() {
      const proDiagnosisFromDB = await clientSideTblPatientDiagnosis.api().get(clientSideTblPatientDiagnosis.apiUrl)
      if (proDiagnosisFromDB.ok) {
        console.log("Diagnosis loadded");
      }
    },
  },
}
