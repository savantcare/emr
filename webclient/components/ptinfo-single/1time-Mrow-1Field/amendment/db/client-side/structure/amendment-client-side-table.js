// For ref implementation see name/db/structure/table.js
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueId = () => ++count

export default class tblAmendment extends clientSideTableManage {
  static entity = 'tblAmendments'
  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()),
      serverSideRowUuid: this.uid(() => uuidv1()),

      appointmentId: this.number(0),
      component: this.string(null),
      description: this.string(''),

      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),
    }
  }
}
