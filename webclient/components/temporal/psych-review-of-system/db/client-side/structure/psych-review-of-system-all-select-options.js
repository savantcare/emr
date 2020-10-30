import clientTblManage from '~/components/framework/crud/manage-rows-of-table-in-client-side-orm.js'
import psychReviewOfSystemsForPatientClass from './psych-review-of-system-of-a-patient-table.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class psychReviewOfSystemsAllSelectOptions extends clientTblManage {
  static entity = 'tblpsychReviewOfSystemsAllSelectOptions'

  static apiUrl = 'http://localhost:8000/public/api/psych-review-of-system/v20'

  static primaryKey = 'serviceStatementFieldOptionId'

  static fields() {
    return {
      ...super.fields(),

      serviceStatementFieldOptionId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work This is the unique ID for each service statement
      serviceStatementFieldOptionLabel: this.string(null),
      serviceStatementFieldNameInDb: this.string(null),

      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}
