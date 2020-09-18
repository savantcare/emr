// Master doc is at reference implementation rem/db/vuex-orm/rem-table.js.
// This file has doc unique to this ct Code synced with ref implementation on 18th sept 2020

import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class masterScreening extends clientSideTableManage {
  static entity = 'scrMaster'
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
