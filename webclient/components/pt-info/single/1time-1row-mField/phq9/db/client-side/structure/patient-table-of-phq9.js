import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'
import phq9MasterClass from './master-table-of-phq9.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class phq9ForPatientClass extends clientSideTableManage {
  static entity = 'tblPhq9Patient'
  static apiUrl = 'http://localhost:8000/public/api/phq9/v20/'
  static primaryKey = 'clientSideUniqRowId'
  static graphSeries1Unit = 'unit'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueID()),
      patientUUID: this.uid(() => uuidv1()),

      phq9QuestionMasterId: this.number(null),
      optionValueChosenByPatient: this.number(null),

      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),

      tblPhq9MasterLink: this.belongsTo(
        phq9MasterClass,
        'phq9QuestionMasterId',
        'phq9QuestionMasterId'
      ),
    }
  }
}
