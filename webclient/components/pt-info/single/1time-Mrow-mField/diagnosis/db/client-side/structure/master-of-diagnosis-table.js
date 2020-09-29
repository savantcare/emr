// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

import clientSideTblPatientDiagnosis from './patient-of-diagnosis-table.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class clientSideTblMasterDiagnosis extends clientSideTableManage {
  static entity = 'tableMasterOfDiagnosis'

  static primaryKey = 'masterDiagnosisId'

  static fields() {
    return {
      ...super.fields(),

      masterDiagnosisId: this.uid(() => intUniqueID()),
      diagnosisName: this.string(null),

      ROW_END: this.number(2147483647.999999),

      linkWithPatient: this.hasOne(
        clientSideTblPatientDiagnosis,
        'masterDiagnosisId'
      ),
    }
  }
}
