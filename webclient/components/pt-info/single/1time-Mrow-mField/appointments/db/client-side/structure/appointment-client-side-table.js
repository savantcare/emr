// For ref implementation see name/db/structure/table.js
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class tblAppointments extends clientSideTableManage {
  static entity = 'tblAppointments'
  static apiUrl = 'http://localhost:3000/date-of-birth'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueID()),
      serverSideRowUuid: this.uid(() => uuidv1()),

      apptStartMilliSecondsOnCalendar: this.number(2147483647.999999),
      apptProviderUUID: this.string(null),
      apptStatus: this.string(null), // values can be 1. cancelled, 2. late-cancellation, 3. mo-show, 4. not-ready-for-lock, 5. locked, 6. mot-locked

      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),
    }
  }
}
