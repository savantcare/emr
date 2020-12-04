import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import phq9ForPatientClass from './phq9-of-a-patient-table.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class phq9AllSelectOptions extends clientTblManage {
  static entity = 'tblPhq9'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/phq9/v20'

  static primaryKey = 'phq9FieldOptionId'

  static fields() {
    return {
      ...super.fields(),

      phq9FieldOptionId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work This is the unique ID for each service statement
      phq9FieldOptionLabel: this.string(null),
      phq9FieldNameInDb: this.string(null),

      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}
