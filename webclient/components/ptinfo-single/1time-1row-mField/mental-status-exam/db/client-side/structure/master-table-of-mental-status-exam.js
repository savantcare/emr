// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'
import mentalStatusExamForPatientClass from './patient-table-of-mental-status-exam.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class mentalStatusExamMasterClass extends clientSideTableManage {
  static entity = 'tblMentalStatusExamMaster'

  static apiUrl = 'http://localhost:8000/public/api/mental-status-exam/v20'

  static primaryKey = 'mentalStatusExamMasterId'

  static fields() {
    return {
      ...super.fields(),

      mentalStatusExamMasterId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work This is the unique ID for each mental status exam
      mentalStatusExamDescription: this.string(null),
      mentalStatusExamCategory: this.string(null),
      mentalStatusExamFieldType: this.string('bool'),
      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.

      /* Q) Why is this relationship needed ?
        Currently this relationship is used at only one place.
        First Place used
        ================
        When all SS are displayed I want to show the selected SS in button primary color.
        So I want to create a big row that has data from master and child
        see add-ct.vue/cfGetMasterRowsOfMentalStatusExamGrouped
      */
      tblMentalStatusExamForPatientLink: this.hasOne(
        mentalStatusExamForPatientClass,
        'mentalStatusExamMasterId'
      ),
    }
  }
}
