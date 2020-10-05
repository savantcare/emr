// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'
import mentalStatusExamMasterClass from './master-table-of-mental-status-exam.js'
const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueId = () => ++count

export default class mentalStatusExamForPatientClass extends clientSideTableManage {
  static entity = 'tblMentalStatusExamOfPatient'

  static apiUrl = 'http://localhost:8000/public/api/mental-status-exam/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work

      /* This field is used to store the value of tblMentalStatusExamMaster/mentalStatusExamMasterId
         E.g: The  tblMentalStatusExamMaster has:
         mentalStatusExamMasterId  |         mentalStatusExamDescription    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table mentalStatusExamMasterId = 2 */
      mentalStatusExamMasterId: this.uid(() => uuidv1()), // This is mental status exam ID assigned to this patient coming from master table
      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.

      /* Why is this relationship needed?
      First place used
      ================
      In view layer when showing the mental status exam I want to append the category name. The category name is not there in child table. The category name is only there in master table.

      Second place used
      =================

     When displaying the add ct.  if 1 SS of category is already added the other SS of category should not come.
     So after I get the list of all master SS. I find all the SS that have been added in the client and there mentalStatusExamCategory has a max 1 limit
     If found then I remove those extra rows from master.

      add-ct.vue/cfGetMasterRowsOfMentalStatusExamGrouped

      */
      // https://vuex-orm.org/guide/model/relationships.html#one-to-one-inverse
      tblMentalStatusExamMasterLink: this.belongsTo(
        mentalStatusExamMasterClass,
        'mentalStatusExamMasterId',
        'mentalStatusExamMasterId'
      ),
    }
  }
}
