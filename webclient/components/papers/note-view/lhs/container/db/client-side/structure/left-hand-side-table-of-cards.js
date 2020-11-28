// For ref implementation see name/db/structure/table.js
import clientTblManage from '~/components/non-temporal/form-manager/crud/manage-rows-of-table-in-client-side-orm.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class leftHandISideViewLayer extends clientTblManage {
  static entity = 'tblLeftSideViewLayerCards'
  static apiUrl = process.env.baseUrlForLumen

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()),
      name: this.string(null),
      componentToShowPath: this.string(null),
      classificationOfComponent: this.string('health'),

      currentDisplayStateOfComponent: this.number(1), // when > 0 it will display. Using v-if since more efficient then v-show
      firstParameterGivenToComponentBeforeMounting: this.number(0),
      secondParameterGivenToComponentBeforeMounting: this.number(0),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000),
    }
  }
}
