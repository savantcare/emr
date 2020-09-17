// Master doc is at reference implementation rem/db/vuex-orm/orm.js.
// This file has doc unique to this ct Code synced with ref implementation on 17th sept 2020
// For docs read ptclient/docs/models.md
import rowManage from '~/cts/core/crud/orm-row-manage.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class masterScreening extends rowManage {
  static entity = 'scrMaster'

  // static apiUrl = process.env.baseUrl + '/screening'
  static apiUrl = 'http://localhost:8000/public/api/screeings/v20/'

  static fields() {
    return {
      // ...super.fields(),

      id: this.uid(() => intUniqueID()),
      uuid: this.uid(() => uuidv1()),
      scrName: this.string(''),
      scientificName: this.string(null),
      clinicalStudies: this.string(null),
    }
  }
}
