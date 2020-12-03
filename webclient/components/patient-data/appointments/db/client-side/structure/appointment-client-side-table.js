// For ref implementation see name/db/structure/table.js
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class tblAppointments extends clientTblManage {
  static entity = 'tblAppointments'
  static apiUrl = process.env.baseUrlForLumen + '/date-of-birth'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()),
      serverSideRowUuid: this.uid(() => uuidv1()),

      apptStartMilliSecsOnCalendar: this.number(2147483648000),
      apptProviderUuid: this.string(null),
      apptStatus: this.string(null), // values can be cancelled / late-cancellation /  no-show / not-ready-for-lock / locked / not-locked

      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),
    }
  }
}
