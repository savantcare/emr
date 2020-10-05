// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

import clientSideTblPatientDiagnosis from './patient-table-of-diagnosis'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueId = () => ++count

export default class clientSideTblMasterDiagnosis extends clientSideTableManage {
  static entity = 'tableMasterOfDiagnosis'

  static primaryKey = 'masterDiagnosisId'

  static fields() {
    return {
      ...super.fields(),

      masterDiagnosisId: this.uid(() => intUniqueId()),
      diagnosisName: this.string(null),

      priority: this.number(0),
      ROW_END: this.number(2147483648000),

      linkWithPatient: this.hasOne(clientSideTblPatientDiagnosis, 'masterDiagnosisId'),
    }
  }
}
