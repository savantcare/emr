import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import examinationForPatientClass from './examination-of-a-patient-table.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class examinationAllSelectOptions extends clientTblManage {
  static entity = 'tblexaminationAllSelectOptions'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/examination/v20'

  static primaryKey = 'examinationFieldOptionId'

  static fields() {
    return {
      ...super.fields(),

      examinationFieldOptionId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work This is the unique ID for each service statement
      examinationFieldOptionLabel: this.string(null),
      examinationFieldNameInDb: this.string(null),

      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}
