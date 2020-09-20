import { Model } from '@vuex-orm/core'

export default class Recommendations extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'tblRecommendation'

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static primaryKey = 'clientSideRowId'

  static fields() {
    return {
      uuid: this.attr(null),
      uuidOfRecommendationMadeFor: this.attr(null),
      recommendationDescription: this.attr(null),
      notes: this.attr(null),
      priority: this.number(0),
      isAutoRex: this.number(0),
      autoRecommendationsOrderId: this.number(0),
      recordChangedByUUID: this.attr(null),
      recordChangedFromIPAddress: this.attr(null),
      // Why store time as a number? Since vuex-orm does not understand dates.
      // The data types that vuex-orm understands are given at: https://vuex-orm.org/guide/model/defining-models.html#generic-type
      ROW_START: this.number(0),
      ROW_END: this.number(0),
    }
  }
}
