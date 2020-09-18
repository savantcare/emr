// For ref implementation see name/db/table.js
import rowManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class ptPulse extends rowManage {
  static entity = 'pulse'
  static apiUrl = 'http://localhost:3000/pulse'

  static graphSeries1FieldName = 'pulseInBpm'
  static graphSeries1Unit = 'Lbs'

  static fields() {
    return {
      ...super.fields(),

      id: this.uid(() => intUniqueID()),
      uuid: this.uid(() => uuidv1()),

      pulseInBpm: this.number(null), // number type of vuex-orm will also store decimals
      timeOfMeasurement: this.number(null), // refer to /name/db/table.js notes for ROW_END
      notes: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),
    }
  }
}
