// For ref implementation see name/db/structure/table.js
import clientSideTableManage from '~/components/core/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class leftSideViewLayer extends clientSideTableManage {
  static entity = 'tblLeftSideViewLayer'
  static apiUrl = 'http://localhost:3000/date-of-birth'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueID()),
      name: this.string(null),
      ctToShowPath: this.string(null),
      ctToShowObject: this.string(null),
      vIfState: this.number(1), // when 1 it will display. Using v-if since more efficient then v-show

      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),
    }
  }
}
