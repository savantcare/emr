import clientTblManage from '~/components/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js'
import phq9ForPatientClass from './patient-table-of-phq9.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class phq9MasterClass extends clientTblManage {
  static entity = 'tblPhq9Master'
  static primaryKey = 'phq9QuestionMasterId'
  static graphSeries1Unit = 'unit'

  static fields() {
    return {
      ...super.fields(),

      phq9QuestionMasterId: this.uid(() => intUniqueId()),
      phq9QuestionFullText: this.string(null),

      ROW_END: this.number(2147483648000),

      tblPhq9ForPatientLink: this.hasOne(phq9ForPatientClass, 'phq9QuestionMasterId'),
    }
  }
}
