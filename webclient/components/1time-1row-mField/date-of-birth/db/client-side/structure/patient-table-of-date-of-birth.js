// For ref implementation see name/db/structure/table.js
import clientSideTableManage from '~/components/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class dateOfBirthForPatient extends clientSideTableManage {
  static entity = 'tblDateOfBirthForPatient'
  static apiUrl = 'http://localhost:8000/public/api/date-of-birth/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()),
      serverSideRowUuid: this.uid(() => uuidv1()),

      dateOfBirthInMilliseconds: this.number(null), // For date decision see name/db/structure/table.js
      notes: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),
    }
  }
}
