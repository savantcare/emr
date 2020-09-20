import { Model } from '@vuex-orm/core'
// import Patient from './patient'
export default class Screening extends Model {
  static entity = 'tblScreenings'

  static primaryKey = 'clientSideRowId'

  static fields() {
    return {
      screenUUID: this.attr(null),
      patientUUID: this.string(''),
      screenName: this.string(''),
      scientificName: this.string(''),
      clinicalStudies: this.string(''),
      notes: this.string(''),
      // assignee: this.belongsTo(Patient, 'user_id'),
    }
  }
}
