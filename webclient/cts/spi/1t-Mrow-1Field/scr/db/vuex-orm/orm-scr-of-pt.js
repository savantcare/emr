// Master doc is at reference implementation rem/db/vuex-orm/orm.js.
// This file has doc unique to this ct Code synced with ref implementation on 17th sept 2020
// For docs read ptclient/docs/models.md
import rowManage from '~/cts/core/crud/orm-row-manage.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class screening extends rowManage {
  static entity = 'scr'

  // static apiUrl = process.env.baseUrl + '/screening'
  static apiUrl = 'http://localhost:8000/public/api/screeings/v20/'

  static fields() {
    return {
      ...super.fields(),

      id: this.uid(() => intUniqueID()),
      uuid: this.uid(() => uuidv1()),
      ptUUID: this.string(null),
      scrUUID: this.string(null),
      notes: this.string(null),
      scrName: this.string(''),
      scientificName: this.string(null),
      clinicalStudies: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),
    }
  }
}
