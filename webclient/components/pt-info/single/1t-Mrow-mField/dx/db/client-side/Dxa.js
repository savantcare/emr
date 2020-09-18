import { Model } from '@vuex-orm/core'
import Dx from '~/components/pt-info/single/1t-Mrow-mField/dx/db/client-side/Dx'

export default class Dxa extends Model {
  static entity = 'dxAssessment'

  static fields() {
    return {
      uuid: this.uid(),
      dxUUID: this.attr(null),
      dx: this.belongsTo(Dx, 'dxUUID'),
      patientUUID: this.attr(null),
      dxAssessment: this.string(null).nullable(),
      recordChangedByUUID: this.attr(null),
      recordChangedFromIPAddress: this.attr(null),
      // Why store time as a number? Since vuex-orm does not understand dates.
      // The data types that vuex-orm understands are given at: https://vuex-orm.org/guide/model/defining-models.html#generic-type
      ROW_START: this.number(0),
      ROW_END: this.number(0),
    }
  }
}
