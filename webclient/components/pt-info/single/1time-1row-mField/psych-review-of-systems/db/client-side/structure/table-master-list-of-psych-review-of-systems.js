// For docs read webclient/docs/models.md
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'
import psychReviewOfSystemsForPatientClass from './table-psych-review-of-systems-of-a-patient.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class psychReviewOfSystemsMasterClass extends clientSideTableManage {
  static entity = 'tblPsychReviewOfSystemsMaster'

  static apiUrl = 'http://localhost:8000/public/api/psych-review-of-systems/v20'

  static primaryKey = 'psychReviewOfSystemsMasterId'

  static fields() {
    return {
      ...super.fields(),

      psychReviewOfSystemsMasterId: this.uid(() => intUniqueID()), // if this is not set then update based on primary key will not work This is the unique ID for each psych review of systems
      psychReviewOfSystemsDescription: this.string(null),
      psychReviewOfSystemsCategory: this.string(null),

      ROW_END: this.number(2147483647.999999), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.

      /* Q) Why is this relationship needed ?
        Currently this relationship is used at only one place.
        First Place used
        ================
        When all SS are displayed I want to show the selected SS in button primary color.
        So I want to create a big row that has data from master and child
        see add-ct.vue/cfGetMasterListOfPsychReviewOfSystemsGrouped
      */
      tblPsychReviewOfSystemsForPatientLink: this.hasOne(
        psychReviewOfSystemsForPatientClass,
        'psychReviewOfSystemsMasterId'
      ),
    }
  }
}
