// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'
import serviceStatementsMasterClass from './table-master-list-of-service-statements.js'
const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class serviceStatementsForPatientClass extends clientSideTableManage {
  static entity = 'tblServiceStatementsOfPatient'

  static apiUrl = 'http://localhost:8000/public/api/service-statements/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueID()), // if this is not set then update based on primary key will not work

      /* This field is used to store the value of tblServiceStatementsMaster/serviceStatementMasterId
         E.g: The  tblServiceStatementsMaster has:
         serviceStatementMasterId  |         serviceStatementDescription    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table serviceStatementMasterId = 2 */
      serviceStatementMasterId: this.uid(() => uuidv1()), // This is service statement ID assigned to this patient coming from master table

      patientUUID: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.

      // https://vuex-orm.org/guide/model/relationships.html#one-to-one-inverse
      serviceStatementsMaster: this.belongsTo(
        serviceStatementsMasterClass,
        'serviceStatementMasterId',
        'serviceStatementMasterId'
      ),
    }
  }
}
