import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import serviceStatementsForPatientClass from './service-statements-of-a-patient-table.js'

const {
  v1: uuidv1,
} = require('~/components/non-temporal/paper-l1-lhs-container/db/client-side/structure/node_modules/uuid')
let count = 0
const intUniqueId = () => ++count

export default class serviceStatementsAllSelectOptions extends clientTblManage {
  static entity = 'tblServiceStatementsAllSelectOptions'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/service-statements/v20'

  static primaryKey = 'serviceStatementFieldOptionId'

  static fields() {
    return {
      ...super.fields(),

      serviceStatementFieldOptionId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work This is the unique ID for each service statement
      serviceStatementFieldOptionLabel: this.string(null),
      serviceStatementFieldNameInDb: this.string(null),

      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}
