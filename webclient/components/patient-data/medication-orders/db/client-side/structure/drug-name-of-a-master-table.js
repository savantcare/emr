// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'

let count = 0
const intUniqueId = () => ++count

export default class drug_name_master extends clientTblManage {
  static entity = 'tblDrugNameMaster'
  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()),
      drugName: this.string(''),
    }
  }
}
