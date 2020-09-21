// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class serviceStatementsMasterList extends clientSideTableManage {
  static entity = 'tblServiceStatementsMaster'

  static apiUrl = 'http://localhost:8000/public/api/service-statements/v20'

  static primaryKey = 'serviceStatementMasterId'

  static fields() {
    return {
      ...super.fields(),

      serviceStatementMasterId: this.uid(() => intUniqueID()), // if this is not set then update based on primary key will not work This is the unique ID for each service statement
      serviceStatementDescription: this.string(null),
      ROW_END: this.number(2147483647.999999), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}
