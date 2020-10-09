// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/non-temporal/crud/manage-rows-of-table-in-client-side-orm.js'
import serviceStatementsForPatientClass from './patient-table-of-service-statements.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class serviceStatementsMasterClass extends clientSideTableManage {
  static entity = 'tblServiceStatementsMaster'

  static apiUrl = 'http://localhost:8000/public/api/service-statements/v20'

  static primaryKey = 'serviceStatementMasterId'

  static fields() {
    return {
      ...super.fields(),

      serviceStatementMasterId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work This is the unique ID for each service statement
      serviceStatementDescription: this.string(null),
      serviceStatementCategory: this.string(null),

      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.

      /* Q) Why is this relationship needed ?
        Currently this relationship is used at only one place.
        First Place used
        ================
        When all SS are displayed I want to show the selected SS in button primary color.
        So I want to create a big row that has data from master and child
        see add-ct.vue/cfGetMasterRowsOfServiceStatementsGrouped
      */
      tblServiceStatementsForPatientLink: this.hasOne(
        serviceStatementsForPatientClass,
        'serviceStatementMasterId'
      ),
    }
  }
}
