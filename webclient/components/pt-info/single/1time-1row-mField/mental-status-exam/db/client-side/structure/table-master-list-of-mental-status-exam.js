// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'
import mentalStatusExamForPatientClass from './table-mental-status-exam-of-a-patient.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class mentalStatusExamMasterClass extends clientSideTableManage {
  static entity = 'tblMentalStatusExamMaster'

  static apiUrl = 'http://localhost:8000/public/api/service-statements/v20'

  static primaryKey = 'mentalStatusExamMasterId'

  static fields() {
    return {
      ...super.fields(),

      mentalStatusExamMasterId: this.uid(() => intUniqueID()), // if this is not set then update based on primary key will not work This is the unique ID for each service statement
      mentalStatusExamDescription: this.string(null),
      mentalStatusExamCategory: this.string(null),

      ROW_END: this.number(2147483647.999999), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.

      /* Q) Why is this relationship needed ?
        Currently this relationship is used at only one place.
        First Place used
        ================
        When all SS are displayed I want to show the selected SS in button primary color.
        So I want to create a big row that has data from master and child
        see add-ct.vue/cfGetMasterListOfMentalStatusExamGrouped
      */
      tblMentalStatusExamForPatientLink: this.hasOne(
        mentalStatusExamForPatientClass,
        'mentalStatusExamMasterId'
      ),
    }
  }
}
