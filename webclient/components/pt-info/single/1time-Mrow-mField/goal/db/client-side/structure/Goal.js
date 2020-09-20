import { Model } from '@vuex-orm/core'

export default class Goals extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'tblGoal'

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static primaryKey = 'clientSideRowId'

  static fields() {
    return {
      uuid: this.attr(null),
      patientUUID: this.attr(null),
      description: this.attr(null),
      recordChangedByUUID: this.attr(null),
      recordChangedFromIPAddress: this.attr(null),
      score: this.number(0),
      // Why store time as a number? Since vuex-orm does not understand dates.
      // The data types that vuex-orm understands are given at: https://vuex-orm.org/guide/model/defining-models.html#generic-type
      ROW_START: this.number(0),
      ROW_END: this.number(0),
    }
  }
}
