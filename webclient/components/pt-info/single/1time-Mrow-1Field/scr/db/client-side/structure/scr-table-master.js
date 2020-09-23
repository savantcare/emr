import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'
import screeningPatientClass from './scr-table-patient.js'

let count = 0
const intUniqueID = () => ++count

export default class screeningMasterClass extends clientSideTableManage {
  static entity = 'tblScreeningMaster'
  static apiUrl = 'http://localhost:8000/public/api/screeings/v20/'

  static primaryKey = 'scrUUID'

  static fields() {
    return {
      // ...super.fields(),

      scrUUID: this.uid(() => intUniqueID()),
      scrName: this.string(''),
      scientificName: this.string(null),
      clinicalStudies: this.string(null),

      tblScrPatientData: this.hasOne(screeningPatientClass, 'scrUUID', 'scrUUID'),
    }
  }
}
