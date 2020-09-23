import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'
import screeningMasterClass from './scr-table-master.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class screeningPatientClass extends clientSideTableManage {
  static entity = 'tblScreeningOfPatient'
  static apiUrl = 'http://localhost:8000/public/api/screeings/v20/'
  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueID()),
      uuid: this.uid(() => uuidv1()),
      ptUUID: this.string(null),
      scrUUID: this.string(null),
      notes: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),

      tblScrMasterData: this.belongsTo(screeningMasterClass, 'scrUUID', 'scrUUID'),
    }
  }
}
