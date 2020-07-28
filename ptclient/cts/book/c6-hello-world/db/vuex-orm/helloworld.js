// For docs read
// https://vuex-orm.org/guide/model/defining-models.html
// ptclient/docs/models.md

import rowStatus from '@/cts/core/crud/rowstatus.js'
export default class helloworld extends rowStatus {
  static entity = 'helloworld'
  static fields() {
    return {
      ...super.fields(),
      id: this.uid(),
      msg: this.string(null),
    }
  }
}
