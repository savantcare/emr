import { Model } from '@vuex-orm/core'
import Diagnosis from './Dx'
import Recommendation from '@/cts/spi/rec/vuex-orm/model.js'

export default class Patient extends Model {
  static entity = 'patients'

  static fields() {
    return {
      id: this.uid(),
      name: this.string(''),
      recommendation: this.hasMany(Recommendation, 'user_id'),
      diagnoses: this.hasMany(Diagnosis, 'uid'),
    }
  }
}
