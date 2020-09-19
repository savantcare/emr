// For ref implementation see name/db/structure/table.js
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class ptDateOfBirth extends clientSideTableManage {
  static entity = 'tblDateOfBirth'
  static apiUrl = 'http://localhost:3000/date-of-birth'

  static graphSeries1FieldName = 'dateOfBirthInMilliseconds'
  static graphSeries1Unit = 'Lbs'

  static fields() {
    return {
      ...super.fields(),

      id: this.uid(() => intUniqueID()),
      uuid: this.uid(() => uuidv1()),

      dateOfBirthInMilliseconds: this.number(null), // For date decision see name/db/structure/table.js
      notes: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),
    }
  }
}
